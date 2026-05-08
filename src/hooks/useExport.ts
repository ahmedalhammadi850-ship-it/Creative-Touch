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
    const cssRes = await fetch(
      'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=block',
      { mode: 'cors' }
    );
    const cssText = await cssRes.text();
    const urls = [...new Set(
      [...cssText.matchAll(/url\((https:\/\/fonts\.gstatic\.com[^)]+)\)/g)].map(m => m[1])
    )];
    let css = cssText;
    await Promise.all(urls.map(async u => {
      const b = await fetchAsBase64(u);
      if (b) css = css.replaceAll(u, b);
    }));
    // Strip any remaining external url() refs that couldn't be inlined
    // so they don't trigger SecurityError when cloned into SVG
    css = css.replace(/url\(https?:\/\/[^)]+\)/g, '');
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
 * Mobile capture using html-to-image (SVG-based) to avoid the html2canvas
 * RTL text-mirroring bug on mobile browsers.
 *
 * html2canvas renders Arabic text mirrored on mobile because it mishandles
 * the RTL canvas text direction. html-to-image uses SVG foreignObject which
 * preserves RTL text correctly.
 *
 * html2canvas is kept only as a last-resort fallback.
 */
async function captureElementMobile(el: HTMLElement): Promise<string> {
  await document.fonts.ready;

  const naturalW = el.offsetWidth;
  const naturalH = el.offsetHeight;

  // Temporarily reset any ancestor transform so html-to-image sees the
  // element at its natural size and position.
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

  // Preserve the RTL direction on the clone so text renders correctly
  clone.setAttribute('dir', el.getAttribute('dir') || 'rtl');

  wrapper.appendChild(clone);
  document.body.appendChild(wrapper);

  // Let the browser paint the clone
  await new Promise(r => setTimeout(r, 150));

  // Pre-fetch font CSS so html-to-image never touches document.styleSheets
  // (cross-origin sheets throw SecurityError when cssRules is accessed)
  const fontEmbedCSS = await buildFontEmbedCSS();

  try {
    // Primary: html-to-image preserves RTL text direction correctly
    const opts = {
      pixelRatio: 2,
      cacheBust: true,
      width: naturalW,
      height: naturalH,
      skipAutoScale: true,
      // Providing fontEmbedCSS makes html-to-image skip its own
      // stylesheet iteration, preventing the cssRules SecurityError
      fontEmbedCSS: fontEmbedCSS || '',
      style: {
        overflow: 'hidden',
        transform: 'none',
        transformOrigin: 'top left',
        direction: 'rtl',
      } as Partial<CSSStyleDeclaration>,
    };

    // Two warm-up passes so fonts/images are cached
    await toPng(clone, opts).catch(() => null);
    const png = await toPng(clone, opts);

    // Stamp onto white canvas for a solid background
    const img = new Image();
    img.src = png;
    await new Promise<void>((res, rej) => { img.onload = () => res(); img.onerror = rej; });

    const canvas = document.createElement('canvas');
    canvas.width = naturalW * 2;
    canvas.height = naturalH * 2;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/png');

  } catch (primaryErr) {
    console.warn('html-to-image failed on mobile, falling back to html2canvas:', primaryErr);

    // Fallback: html2canvas (may have RTL issues on some browsers)
    try {
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        width: naturalW,
        height: naturalH,
        imageTimeout: 15000,
        logging: false,
      });
      return canvas.toDataURL('image/png');
    } finally {
      // wrapper is removed in the outer finally
    }
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
  ): Promise<{ ok: boolean; blobUrl?: string; error?: string }> => {
    const el = document.getElementById('export-target');
    if (!el) return { ok: false, error: 'export-target not found' };

    /* ── safe stylesheet pre-fetch to avoid SecurityError ── */
    const _safeSheets = (() => {
      try {
        for (const sheet of Array.from(document.styleSheets)) {
          try { void (sheet.cssRules || sheet.rules); } catch { /* cross-origin — skip */ }
        }
      } catch { /* styleSheets inaccessible — skip */ }
    })();
    void _safeSheets;

    /* ── inline Tailwind notification helper ── */
    function showPdfNotification(blobUrl: string) {
      const existing = document.getElementById('pdf-export-notification');
      if (existing) existing.remove();

      /* inject slide-in keyframes once */
      if (!document.getElementById('pdf-toast-style')) {
        const kf = document.createElement('style');
        kf.id = 'pdf-toast-style';
        kf.textContent =
          '@keyframes pdfSlideIn{from{opacity:0;transform:translateX(-50%) translateY(-20px)}' +
          'to{opacity:1;transform:translateX(-50%) translateY(0)}}';
        document.head.appendChild(kf);
      }

      /* dismiss helper — fades out then removes */
      function dismiss() {
        toast.style.transition = 'opacity 0.25s ease';
        toast.style.opacity = '0';
        setTimeout(() => { if (document.body.contains(toast)) toast.remove(); }, 260);
      }

      /* root element — Tailwind classes (scanned by JIT via src/**\/*.ts) */
      const toast = document.createElement('div');
      toast.id = 'pdf-export-notification';
      toast.setAttribute('dir', 'rtl');
      toast.className =
        'fixed top-4 left-1/2 -translate-x-1/2 z-[99999] ' +
        'flex items-center gap-3 px-5 py-3.5 ' +
        'bg-white rounded-lg shadow-2xl border border-gray-100 ' +
        'cursor-pointer select-none min-w-[280px] max-w-[90vw]';
      toast.style.animation = 'pdfSlideIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both';

      /* red PDF icon */
      const iconWrap = document.createElement('div');
      iconWrap.className =
        'flex-shrink-0 w-11 h-11 bg-red-500 rounded-lg flex items-center justify-center';
      iconWrap.innerHTML =
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" ' +
        'stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>' +
        '<polyline points="14 2 14 8 20 8"/>' +
        '<line x1="9" y1="13" x2="15" y2="13"/>' +
        '<line x1="9" y1="17" x2="15" y2="17"/>' +
        '</svg>';

      /* text block */
      const textWrap = document.createElement('div');
      textWrap.className = 'flex-1 text-right';
      textWrap.innerHTML =
        '<p class="font-bold text-sm text-gray-900 leading-tight" ' +
        'style="font-family:Cairo,sans-serif;">ملف PDF جاهز</p>' +
        '<p class="text-xs text-gray-500 mt-0.5" ' +
        'style="font-family:Cairo,sans-serif;">تم تجهيز ملف PDF بنجاح. اضغط هنا لفتحه</p>';

      toast.appendChild(iconWrap);
      toast.appendChild(textWrap);

      /* click → open + dismiss */
      toast.addEventListener('click', () => {
        window.open(blobUrl, '_blank');
        dismiss();
      });

      document.body.appendChild(toast);

      /* auto-dismiss after 8 s */
      setTimeout(dismiss, 8000);
    }

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

      /* build blob + URL for notification (works on all platforms) */
      const pdfBlob = pdf.output('blob');
      const pdfBlobUrl = URL.createObjectURL(pdfBlob);

      if (isIOS()) {
        const dataUri = pdf.output('datauristring');
        if (iosWindow && !iosWindow.closed) {
          showPdfInIOSWindow(iosWindow, dataUri);
        } else {
          window.location.href = dataUri;
        }
        /* show notification on iOS too */
        showPdfNotification(pdfBlobUrl);
      } else if (isMobile()) {
        /* Android: show notification — user taps to open */
        showPdfNotification(pdfBlobUrl);
      } else {
        /* Desktop: auto-download + notification */
        downloadBlob(pdfBlob, filename);
        showPdfNotification(pdfBlobUrl);
      }

      return { ok: true, blobUrl: pdfBlobUrl };
    } catch (e) {
      console.error('PDF export failed:', e);
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
