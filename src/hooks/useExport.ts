import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

const resourceCache = new Map<string, string>();

function isMobile(): boolean {
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}

function isIOS(): boolean {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
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

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  if (isIOS()) {
    // iOS Safari: open in new tab — user can long-press to save
    window.open(url, '_blank');
    setTimeout(() => URL.revokeObjectURL(url), 30000);
  } else {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }
}

async function captureElement(el: HTMLElement): Promise<string> {
  await document.fonts.ready;
  const fontEmbedCSS = await buildFontEmbedCSS();

  // Use offsetWidth/offsetHeight to get NATURAL dimensions
  // (getBoundingClientRect includes CSS transform scale which distorts the output)
  const naturalWidth = el.offsetWidth;
  const naturalHeight = el.offsetHeight;

  // Lower pixelRatio on mobile to stay within canvas memory limits
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
      transform: 'none',          // strip any inherited CSS transform
      transformOrigin: 'top left',
    },
  };

  // Run twice to warm up image cache, then capture final result
  await toPng(el, options).catch(() => null);
  await toPng(el, options).catch(() => null);
  const rawDataUrl = await toPng(el, options);

  // Stamp onto a clean canvas to guarantee white background
  const img = new Image();
  img.src = rawDataUrl;
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = reject;
  });

  const canvasWidth = naturalWidth * pixelRatio;
  const canvasHeight = naturalHeight * pixelRatio;
  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);

  return canvas.toDataURL('image/png');
}

export function useExport() {
  const exportAsPdf = async (): Promise<{ ok: boolean; error?: string }> => {
    const el = document.getElementById('export-target');
    if (!el) return { ok: false, error: 'export-target not found' };

    try {
      const pngDataUrl = await captureElement(el);

      const naturalWidth = el.offsetWidth;
      const naturalHeight = el.offsetHeight;
      const widthMm = pxToMm(naturalWidth);
      const heightMm = pxToMm(naturalHeight);
      const isLandscape = widthMm >= heightMm;
      const orientation = isLandscape ? 'landscape' : 'portrait';
      const formatArr: [number, number] = [
        Math.min(widthMm, heightMm),
        Math.max(widthMm, heightMm),
      ];

      const pdf = new jsPDF({
        unit: 'mm',
        format: formatArr,
        orientation,
        compress: false,
      });

      pdf.addImage(pngDataUrl, 'PNG', 0, 0, widthMm, heightMm, undefined, 'NONE');

      const filename = `creative-touch-${Date.now()}.pdf`;

      if (isMobile()) {
        // On mobile: use blob download for Android, new tab for iOS
        const pdfBlob = pdf.output('blob');
        downloadBlob(pdfBlob, filename);
      } else {
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

      // Convert data URL to blob for reliable mobile download
      const res = await fetch(pngDataUrl);
      const blob = await res.blob();
      downloadBlob(blob, filename);

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

  return { exportAsPdf, exportAsPng, capturePreview, isMobileDevice: isMobile() };
}
