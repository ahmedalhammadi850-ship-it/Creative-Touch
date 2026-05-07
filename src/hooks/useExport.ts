import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

/* ─────────────────── platform detection ─────────────────── */

export function isIOS(): boolean {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
}

function isAndroid(): boolean {
  return /Android/i.test(navigator.userAgent);
}

export function isMobile(): boolean {
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
      reader.onloadend = () => {
        resourceCache.set(url, reader.result as string);
        resolve(reader.result as string);
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
    const cssText = await (
      await fetch('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=block')
    ).text();
    const urls = [...new Set(
      [...cssText.matchAll(/url\((https:\/\/fonts\.gstatic\.com[^)]+)\)/g)].map(m => m[1])
    )];
    let css = cssText;
    await Promise.all(urls.map(async u => {
      const b = await fetchAsBase64(u);
      if (b) css = css.replaceAll(u, b);
    }));
    cachedFontCSS = css;
    return css;
  } catch {
    cachedFontCSS = '';
    return '';
  }
}

/* ─────────────────────── px → mm ───────────────────────── */

function pxToMm(px: number): number {
  return (px / 96) * 25.4;
}

/* ──────────────────── download helpers ─────────────────── */

/**
 * Android / Desktop: standard blob-URL anchor download.
 */
function downloadBlob(blob: Blob, filename: string) {
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

/**
 * iOS Safari:
 *  - `window.open()` MUST be called synchronously from a user-gesture handler,
 *    BEFORE any `await`. The caller is responsible for opening the window and
 *    passing it here.
 *  - We then navigate the already-open window to the PDF data URI so iOS can
 *    display it natively (user can Share → Save to Files / AirDrop).
 */
function showPdfInIOSWindow(iosWin: Window, pdfDataUri: string) {
  try {
    iosWin.document.open();
    iosWin.document.write(
      '<!DOCTYPE html><html><head>' +
      '<meta name="viewport" content="width=device-width,initial-scale=1">' +
      '<title>PDF</title>' +
      '<style>body{margin:0;background:#000;height:100vh;overflow:hidden}' +
      'iframe{width:100vw;height:100vh;border:none}</style>' +
      '</head><body>' +
      `<iframe src="${pdfDataUri}"></iframe>` +
      '</body></html>'
    );
    iosWin.document.close();
  } catch {
    // Fallback: navigate directly to data URI
    iosWin.location.href = pdfDataUri;
  }
}

/* ──────────────────── capture: MOBILE ──────────────────── */
/**
 * Clones #export-target into a position:fixed wrapper appended to document.body
 * — completely outside the scaled (.editor-template-preview) container.
 * html2canvas captures it at its natural size with no transform distortion.
 *
 * Key options:
 *   allowTaint: true  → cross-origin images are drawn (canvas will be "tainted"
 *                        but modern Android Chrome still allows toDataURL())
 *   useCORS: true     → attempt CORS fetch first so canvas stays clean if server
 *                        sends the right headers
 */
async function captureElementMobile(el: HTMLElement): Promise<string> {
  await document.fonts.ready;

  const naturalW = el.offsetWidth;
  const naturalH = el.offsetHeight;

  // Off-screen wrapper — position:fixed keeps it outside any ancestor transforms
  const wrapper = document.createElement('div');
  wrapper.style.cssText =
    `position:fixed;top:-${naturalH + 400}px;left:0;` +
    `width:${naturalW}px;height:${naturalH}px;` +
    `overflow:hidden;z-index:-9999;pointer-events:none;` +
    `background:#fff;transform:none;transform-origin:top left;`;

  const clone = el.cloneNode(true) as HTMLElement;
  clone.style.cssText =
    `width:${naturalW}px;height:${naturalH}px;` +
    `transform:none;transform-origin:top left;` +
    `position:relative;overflow:hidden;margin:0;padding:0;`;

  wrapper.appendChild(clone);
  document.body.appendChild(wrapper);

  // Small delay to let the browser paint the clone before capturing
  await new Promise(r => setTimeout(r, 120));

  try {
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      allowTaint: true,       // include cross-origin images even if canvas gets tainted
      backgroundColor: '#ffffff',
      width: naturalW,
      height: naturalH,
      imageTimeout: 15000,   // wait up to 15s for images to load
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

  // Stamp onto white canvas for a guaranteed solid background
  const img = new Image();
  img.src = raw;
  await new Promise<void>((res, rej) => { img.onload = () => res(); img.onerror = rej; });

  const cw = naturalW * 3;
  const ch = naturalH * 3;
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
  return isMobile() ? captureElementMobile(el) : captureElementDesktop(el);
}

/* ──────────────────── exported hook ────────────────────── */

export function useExport() {
  /**
   * @param iosWindow  A Window reference opened synchronously BEFORE calling
   *                   this function — required on iOS because window.open()
   *                   is blocked after an `await` (popup blocker kicks in).
   *                   Pass null/undefined on Android & Desktop.
   */
  const exportAsPdf = async (
    iosWindow?: Window | null
  ): Promise<{ ok: boolean; error?: string }> => {
    const el = document.getElementById('export-target');
    if (!el) return { ok: false, error: 'export-target not found' };

    try {
      const png = await captureElement(el);

      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const wMm = pxToMm(w);
      const hMm = pxToMm(h);

      const pdf = new jsPDF({
        unit: 'mm',
        format: [Math.min(wMm, hMm), Math.max(wMm, hMm)],
        orientation: wMm >= hMm ? 'landscape' : 'portrait',
        compress: false,
      });

      pdf.addImage(png, 'PNG', 0, 0, wMm, hMm, undefined, 'NONE');

      const filename = `creative-touch-${Date.now()}.pdf`;

      if (isIOS()) {
        const dataUri = pdf.output('datauristring');
        if (iosWindow && !iosWindow.closed) {
          showPdfInIOSWindow(iosWindow, dataUri);
        } else {
          // Fallback if window was blocked: navigate current tab to data URI
          // (user presses back to return to app)
          window.location.href = dataUri;
        }
      } else if (isMobile()) {
        // Android
        downloadBlob(pdf.output('blob'), filename);
      } else {
        // Desktop
        pdf.save(filename);
      }

      return { ok: true };
    } catch (e) {
      console.error('PDF export failed:', e);
      // If iOS window was opened but export failed, close it to avoid blank tab
      if (iosWindow && !iosWindow.closed) iosWindow.close();
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
    capturePreview,
    isMobileDevice: isMobile(),
    isIOSDevice: isIOS(),
  };
}
