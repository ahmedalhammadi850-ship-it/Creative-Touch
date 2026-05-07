import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

/* ─────────────────────────── platform helpers ────────────────────────── */

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
  return (
    isIOS() ||
    isAndroid() ||
    /Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent)
  );
}

/* ─────────────────────── desktop font-embed helpers ─────────────────── */

const resourceCache = new Map<string, string>();

async function fetchAsBase64(url: string): Promise<string> {
  if (resourceCache.has(url)) return resourceCache.get(url)!;
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const b64 = reader.result as string;
        resourceCache.set(url, b64);
        resolve(b64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return '';
  }
}

let cachedFontCSS: string | null = null;

async function buildFontEmbedCSS(): Promise<string> {
  if (cachedFontCSS !== null) return cachedFontCSS;
  try {
    const googleFontUrl =
      'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=block';
    const cssResp = await fetch(googleFontUrl);
    if (!cssResp.ok) throw new Error('Google Fonts CSS unavailable');
    let css = await cssResp.text();
    const matches = [...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com[^)]+)\)/g)];
    const uniqueUrls = [...new Set(matches.map(m => m[1]))];
    await Promise.all(
      uniqueUrls.map(async url => {
        const b64 = await fetchAsBase64(url);
        if (b64) css = css.replaceAll(url, b64);
      })
    );
    cachedFontCSS = css;
    return css;
  } catch {
    cachedFontCSS = '';
    return '';
  }
}

/* ─────────────────────────── px → mm ────────────────────────────────── */

function pxToMm(px: number): number {
  return (px / 96) * 25.4;
}

/* ──────────────────────────── download logic ─────────────────────────── */

/**
 * Triggers a file download cross-platform:
 *  - iOS Safari : opens in new tab (blob URL) → user taps Share → Save to Files
 *  - Android / Desktop : <a download> with blob URL
 */
function triggerDownload(blob: Blob, filename: string) {
  if (isIOS()) {
    // iOS Safari: <a download> is blocked. Open blob URL in new tab instead.
    const url = URL.createObjectURL(blob);
    const w = window.open(url, '_blank');
    if (!w) {
      // Popup blocked — fall back to inline link
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  } else {
    // Android & Desktop
    const url = URL.createObjectURL(blob);
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

/* ───────────────────────────── capture logic ─────────────────────────── */

/**
 * MOBILE: use html2canvas — handles transforms, CORS images, and Arabic fonts
 * natively without any extra HTTP requests. Much more stable on mobile.
 */
async function captureElementMobile(el: HTMLElement): Promise<string> {
  await document.fonts.ready;

  const naturalWidth = el.offsetWidth;
  const naturalHeight = el.offsetHeight;

  // Temporarily clear the CSS transform so html2canvas sees the element at
  // its natural size (the editor applies scale(0.72) on mobile which would
  // otherwise distort the output).
  const originalTransform = el.style.transform;
  const originalTransformOrigin = el.style.transformOrigin;
  el.style.transform = 'none';
  el.style.transformOrigin = 'top left';

  try {
    const canvas = await html2canvas(el, {
      scale: 2,               // 2× resolution — good quality without crashing
      useCORS: true,          // allow cross-origin images (template backgrounds)
      allowTaint: false,
      backgroundColor: '#ffffff',
      width: naturalWidth,
      height: naturalHeight,
      windowWidth: naturalWidth,
      windowHeight: naturalHeight,
      logging: false,
    });

    return canvas.toDataURL('image/png');
  } finally {
    // Always restore the transform
    el.style.transform = originalTransform;
    el.style.transformOrigin = originalTransformOrigin;
  }
}

/**
 * DESKTOP: use html-to-image with full font embedding for crisp output.
 */
async function captureElementDesktop(el: HTMLElement): Promise<string> {
  await document.fonts.ready;
  const fontEmbedCSS = await buildFontEmbedCSS();

  const naturalWidth = el.offsetWidth;
  const naturalHeight = el.offsetHeight;

  const options = {
    pixelRatio: 3,
    cacheBust: true,
    width: naturalWidth,
    height: naturalHeight,
    fontEmbedCSS: fontEmbedCSS || undefined,
    skipAutoScale: true,
    style: {
      overflow: 'hidden',
      transform: 'none',
      transformOrigin: 'top left',
    },
  };

  // Two warm-up passes to load remote resources into cache
  await toPng(el, options).catch(() => null);
  await toPng(el, options).catch(() => null);
  const rawDataUrl = await toPng(el, options);

  // Stamp onto white canvas for solid background
  const img = new Image();
  img.src = rawDataUrl;
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = reject;
  });

  const cw = naturalWidth * 3;
  const ch = naturalHeight * 3;
  const canvas = document.createElement('canvas');
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, cw, ch);
  ctx.drawImage(img, 0, 0, cw, ch, 0, 0, cw, ch);

  return canvas.toDataURL('image/png');
}

async function captureElement(el: HTMLElement): Promise<string> {
  return isMobile()
    ? captureElementMobile(el)
    : captureElementDesktop(el);
}

/* ──────────────────────────── exported hook ──────────────────────────── */

export function useExport() {
  const exportAsPdf = async (): Promise<{ ok: boolean; error?: string }> => {
    const el = document.getElementById('export-target');
    if (!el) return { ok: false, error: 'export-target not found' };

    try {
      const pngDataUrl = await captureElement(el);

      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const wMm = pxToMm(w);
      const hMm = pxToMm(h);
      const landscape = wMm >= hMm;

      const pdf = new jsPDF({
        unit: 'mm',
        format: [Math.min(wMm, hMm), Math.max(wMm, hMm)],
        orientation: landscape ? 'landscape' : 'portrait',
        compress: false,
      });

      pdf.addImage(pngDataUrl, 'PNG', 0, 0, wMm, hMm, undefined, 'NONE');

      const filename = `creative-touch-${Date.now()}.pdf`;
      const pdfBlob = pdf.output('blob');

      if (isMobile()) {
        triggerDownload(pdfBlob, filename);
      } else {
        pdf.save(filename);
      }

      return { ok: true };
    } catch (e) {
      console.error('PDF export failed:', e);
      return { ok: false, error: String(e) };
    }
  };

  const exportAsPng = async (): Promise<{ ok: boolean; error?: string }> => {
    const el = document.getElementById('export-target');
    if (!el) return { ok: false, error: 'export-target not found' };

    try {
      const pngDataUrl = await captureElement(el);
      const filename = `creative-touch-${Date.now()}.png`;
      const res = await fetch(pngDataUrl);
      const blob = await res.blob();
      triggerDownload(blob, filename);
      return { ok: true };
    } catch (e) {
      console.error('PNG export failed:', e);
      return { ok: false, error: String(e) };
    }
  };

  const capturePreview = async (): Promise<string | null> => {
    const el = document.getElementById('export-target');
    if (!el) return null;
    try {
      return await captureElement(el);
    } catch {
      return null;
    }
  };

  return {
    exportAsPdf,
    exportAsPng,
    capturePreview,
    isMobileDevice: isMobile(),
    isIOSDevice: isIOS(),
  };
}
