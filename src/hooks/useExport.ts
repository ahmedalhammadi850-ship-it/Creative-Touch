import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

const resourceCache = new Map<string, string>();

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

async function captureElement(el: HTMLElement): Promise<string> {
  await document.fonts.ready;
  const fontEmbedCSS = await buildFontEmbedCSS();

  const rect = el.getBoundingClientRect();
  const elementWidth = Math.round(rect.width);
  const elementHeight = Math.round(rect.height);
  const pixelRatio = 3;

  const options = {
    pixelRatio,
    cacheBust: true,
    width: elementWidth,
    height: elementHeight,
    fontEmbedCSS: fontEmbedCSS || undefined,
    skipAutoScale: false,
    style: {
      overflow: 'hidden',
    },
  };

  await toPng(el, options).catch(() => null);
  await toPng(el, options).catch(() => null);
  const rawDataUrl = await toPng(el, options);

  const img = new Image();
  img.src = rawDataUrl;
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = reject;
  });

  const canvasWidth = elementWidth * pixelRatio;
  const canvasHeight = elementHeight * pixelRatio;
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
  const exportAsPdf = async () => {
    const el = document.getElementById('export-target');
    if (!el) return;

    try {
      const pngDataUrl = await captureElement(el);

      const rect = el.getBoundingClientRect();
      const widthMm = pxToMm(Math.round(rect.width));
      const heightMm = pxToMm(Math.round(rect.height));
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
      pdf.save(`creative-touch-${Date.now()}.pdf`);
    } catch (e) {
      console.error('PDF export failed', e);
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

  return { exportAsPdf, capturePreview };
}
