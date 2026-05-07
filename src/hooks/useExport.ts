import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

const resourceCache = new Map<string, string>();

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

async function fetchAsBase64(url: string): Promise<string> {
  if (resourceCache.has(url)) return resourceCache.get(url)!;
  try {
    const response = await fetch(url);
    const blob = await response.blob();
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

function pxToMm(px: number): number {
  return (px / 96) * 25.4;
}

/**
 * Trigger a file download that works across all platforms:
 *   - Desktop (Chrome/Firefox/Edge): blob URL + <a download>
 *   - Android Chrome: blob URL + <a download>
 *   - iOS Safari: open data URI in new tab (user taps Share → Save to Files)
 */
function triggerDownload(data: string | Blob, filename: string, mimeType: string) {
  if (isIOS()) {
    // iOS Safari blocks <a download> on blob/data URLs.
    // Best UX: open the file in a new tab — user can then tap Share → Save to Files / AirDrop.
    let dataUri: string;
    if (typeof data === 'string') {
      dataUri = data; // already a data URI
    } else {
      // Convert blob to data URI
      const reader = new FileReader();
      reader.readAsDataURL(data);
      reader.onloadend = () => {
        const uri = reader.result as string;
        const w = window.open('', '_blank');
        if (w) {
          w.document.write(
            `<!DOCTYPE html><html><head><title>${filename}</title><meta name="viewport" content="width=device-width"></head>` +
            `<body style="margin:0;padding:0;background:#000">` +
            `<iframe src="${uri}" style="width:100vw;height:100vh;border:none"></iframe>` +
            `</body></html>`
          );
          w.document.close();
        }
      };
      return;
    }
    const w = window.open('', '_blank');
    if (w) {
      w.document.write(
        `<!DOCTYPE html><html><head><title>${filename}</title><meta name="viewport" content="width=device-width"></head>` +
        `<body style="margin:0;padding:0;background:#000">` +
        `<iframe src="${dataUri}" style="width:100vw;height:100vh;border:none"></iframe>` +
        `</body></html>`
      );
      w.document.close();
    }
  } else {
    // Android + Desktop: blob URL download
    const blob = typeof data === 'string'
      ? new Blob([Uint8Array.from(atob(data.split(',')[1] ?? ''), c => c.charCodeAt(0))], { type: mimeType })
      : data;
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

async function captureElement(el: HTMLElement): Promise<string> {
  await document.fonts.ready;
  const fontEmbedCSS = await buildFontEmbedCSS();

  // Use offsetWidth/offsetHeight — NOT getBoundingClientRect — to get the
  // NATURAL pixel size before any CSS transform (scale) is applied.
  const naturalWidth = el.offsetWidth;
  const naturalHeight = el.offsetHeight;

  // Lower pixel ratio on mobile to avoid exceeding canvas memory limits.
  const pixelRatio = isMobile() ? 2 : 3;

  const options = {
    pixelRatio,
    cacheBust: true,
    width: naturalWidth,
    height: naturalHeight,
    fontEmbedCSS: fontEmbedCSS || undefined,
    skipAutoScale: true,
    style: {
      overflow: 'hidden',
      transform: 'none',        // remove inherited scale from editor preview
      transformOrigin: 'top left',
    },
  };

  // Run 2 warm-up passes (loads remote resources into cache), then final capture
  await toPng(el, options).catch(() => null);
  await toPng(el, options).catch(() => null);
  const rawDataUrl = await toPng(el, options);

  // Paint onto a clean white canvas so background is always solid
  const img = new Image();
  img.src = rawDataUrl;
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = reject;
  });

  const cw = naturalWidth * pixelRatio;
  const ch = naturalHeight * pixelRatio;
  const canvas = document.createElement('canvas');
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, cw, ch);
  ctx.drawImage(img, 0, 0, cw, ch, 0, 0, cw, ch);

  return canvas.toDataURL('image/png');
}

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

      if (isIOS()) {
        // iOS: embed in new tab as iframe so user can Save to Files
        const dataUri = pdf.output('datauristring');
        triggerDownload(dataUri, filename, 'application/pdf');
      } else if (isAndroid()) {
        // Android: blob URL + <a download> — works in Chrome
        const blob = pdf.output('blob');
        triggerDownload(blob, filename, 'application/pdf');
      } else {
        // Desktop
        pdf.save(filename);
      }

      return { ok: true };
    } catch (e) {
      console.error('PDF export failed', e);
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
      triggerDownload(blob, filename, 'image/png');

      return { ok: true };
    } catch (e) {
      console.error('PNG export failed', e);
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
