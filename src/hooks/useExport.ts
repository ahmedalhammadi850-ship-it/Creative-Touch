import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

/* ─────────────────── platform detection ─────────────────── */

function isIOS(): boolean {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
}

function isAndroid(): boolean {
  return /Android/i.test(navigator.userAgent);
}

function isMobile(): boolean {
  return isIOS() || isAndroid() || /Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}

/* ─────────────── desktop: font-embed helpers ────────────── */

const resourceCache = new Map<string, string>();

async function fetchAsBase64(url: string): Promise<string> {
  if (resourceCache.has(url)) return resourceCache.get(url)!;
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => { resourceCache.set(url, reader.result as string); resolve(reader.result as string); };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch { return ''; }
}

let cachedFontCSS: string | null = null;
async function buildFontEmbedCSS(): Promise<string> {
  if (cachedFontCSS !== null) return cachedFontCSS;
  try {
    const css0 = await (await fetch(
      'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=block'
    )).text();
    const urls = [...new Set([...css0.matchAll(/url\((https:\/\/fonts\.gstatic\.com[^)]+)\)/g)].map(m => m[1]))];
    let css = css0;
    await Promise.all(urls.map(async u => { const b = await fetchAsBase64(u); if (b) css = css.replaceAll(u, b); }));
    cachedFontCSS = css;
    return css;
  } catch { cachedFontCSS = ''; return ''; }
}

/* ─────────────────────── px → mm ───────────────────────── */

function pxToMm(px: number): number { return (px / 96) * 25.4; }

/* ──────────────────── download helpers ─────────────────── */

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  if (isIOS()) {
    // iOS Safari blocks <a download> — open blob in new tab; user saves via Share → Save to Files
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  } else {
    // Android + Desktop
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }
}

/* ──────────────────── capture: MOBILE ──────────────────── */
/**
 * Clones the element into a position:fixed wrapper appended directly to
 * document.body — completely outside any scaled/transformed ancestor.
 * html2canvas then sees it at its natural size with no transform distortion.
 */
async function captureElementMobile(el: HTMLElement): Promise<string> {
  await document.fonts.ready;

  const naturalW = el.offsetWidth;
  const naturalH = el.offsetHeight;

  // Wrapper: fixed off-screen so it doesn't affect layout or scroll
  const wrapper = document.createElement('div');
  wrapper.style.cssText = [
    'position:fixed',
    `top:-${naturalH + 200}px`,
    'left:0',
    `width:${naturalW}px`,
    `height:${naturalH}px`,
    'overflow:hidden',
    'z-index:-9999',
    'pointer-events:none',
    'background:#fff',
    'transform:none',
    'transform-origin:top left',
  ].join(';');

  // Clone without any inline transforms
  const clone = el.cloneNode(true) as HTMLElement;
  clone.style.cssText = [
    `width:${naturalW}px`,
    `height:${naturalH}px`,
    'transform:none',
    'transform-origin:top left',
    'position:relative',
    'overflow:hidden',
    'margin:0',
    'padding:0',
  ].join(';');

  wrapper.appendChild(clone);
  document.body.appendChild(wrapper);

  try {
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      width: naturalW,
      height: naturalH,
      windowWidth: naturalW,
      windowHeight: naturalH,
      logging: false,
    });
    return canvas.toDataURL('image/png');
  } finally {
    if (document.body.contains(wrapper)) document.body.removeChild(wrapper);
  }
}

/* ──────────────────── capture: DESKTOP ─────────────────── */

async function captureElementDesktop(el: HTMLElement): Promise<string> {
  await document.fonts.ready;
  const fontEmbedCSS = await buildFontEmbedCSS();

  const naturalW = el.offsetWidth;
  const naturalH = el.offsetHeight;

  const opts = {
    pixelRatio: 3,
    cacheBust: true,
    width: naturalW,
    height: naturalH,
    fontEmbedCSS: fontEmbedCSS || undefined,
    skipAutoScale: true,
    style: { overflow: 'hidden', transform: 'none', transformOrigin: 'top left' },
  };

  // Two warm-up passes to load remote images/fonts into cache
  await toPng(el, opts).catch(() => null);
  await toPng(el, opts).catch(() => null);
  const raw = await toPng(el, opts);

  // Stamp onto white canvas for solid background
  const img = new Image();
  img.src = raw;
  await new Promise<void>((res, rej) => { img.onload = () => res(); img.onerror = rej; });

  const cw = naturalW * 3, ch = naturalH * 3;
  const canvas = document.createElement('canvas');
  canvas.width = cw; canvas.height = ch;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, cw, ch);
  ctx.drawImage(img, 0, 0, cw, ch, 0, 0, cw, ch);
  return canvas.toDataURL('image/png');
}

async function captureElement(el: HTMLElement): Promise<string> {
  return isMobile() ? captureElementMobile(el) : captureElementDesktop(el);
}

/* ──────────────────── exported hook ────────────────────── */

export function useExport() {
  const exportAsPdf = async (): Promise<{ ok: boolean; error?: string }> => {
    const el = document.getElementById('export-target');
    if (!el) return { ok: false, error: 'export-target not found' };

    try {
      const png = await captureElement(el);

      const w = el.offsetWidth, h = el.offsetHeight;
      const wMm = pxToMm(w), hMm = pxToMm(h);

      const pdf = new jsPDF({
        unit: 'mm',
        format: [Math.min(wMm, hMm), Math.max(wMm, hMm)],
        orientation: wMm >= hMm ? 'landscape' : 'portrait',
        compress: false,
      });

      pdf.addImage(png, 'PNG', 0, 0, wMm, hMm, undefined, 'NONE');

      const filename = `creative-touch-${Date.now()}.pdf`;

      if (isMobile()) {
        triggerDownload(pdf.output('blob'), filename);
      } else {
        pdf.save(filename);
      }

      return { ok: true };
    } catch (e) {
      console.error('PDF export failed:', e);
      return { ok: false, error: String(e) };
    }
  };

  const capturePreview = async (): Promise<string | null> => {
    const el = document.getElementById('export-target');
    if (!el) return null;
    try { return await captureElement(el); }
    catch { return null; }
  };

  return {
    exportAsPdf,
    capturePreview,
    isMobileDevice: isMobile(),
    isIOSDevice: isIOS(),
  };
}
