import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

const CAIRO_FONTS: { url: string; weight: string }[] = [
  {
    url: 'https://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvalIhTp2mxdt0UX8.woff2',
    weight: '400',
  },
  {
    url: 'https://fonts.gstatic.com/s/cairo/v28/SLXVc1nY6HkvamImBO-ef8Ik1pM.woff2',
    weight: '700',
  },
  {
    url: 'https://fonts.gstatic.com/s/cairo/v28/SLXVc1nY6HkvamImBO-ef8Ik1pM.woff2',
    weight: '900',
  },
];

const fontCache = new Map<string, string>();

async function fetchFontAsBase64(url: string): Promise<string> {
  if (fontCache.has(url)) return fontCache.get(url)!;
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        fontCache.set(url, base64);
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return '';
  }
}

async function buildFontEmbedCSS(): Promise<string> {
  const results = await Promise.all(
    CAIRO_FONTS.map(async ({ url, weight }) => {
      const b64 = await fetchFontAsBase64(url);
      if (!b64) return '';
      return `
        @font-face {
          font-family: 'Cairo';
          src: url(${b64}) format('woff2');
          font-weight: ${weight};
          font-style: normal;
        }
      `;
    })
  );
  return results.join('\n');
}

// CSS pixels are always 1/96 inch — correct at any device pixel ratio
function pxToMm(px: number): number {
  return (px / 96) * 25.4;
}

export function useExport() {
  const exportAsPdf = async () => {
    const original = document.getElementById('export-target');
    if (!original) return;

    try {
      await document.fonts.ready;

      const fontEmbedCSS = await buildFontEmbedCSS();

      const rect = original.getBoundingClientRect();
      const elementWidth = Math.round(rect.width);
      const elementHeight = Math.round(rect.height);
      const pixelRatio = 3;
      const canvasWidth = elementWidth * pixelRatio;
      const canvasHeight = elementHeight * pixelRatio;

      const options = {
        pixelRatio,
        cacheBust: true,
        width: elementWidth,
        height: elementHeight,
        fontEmbedCSS: fontEmbedCSS || undefined,
      };

      // Call 1 & 2: prime html-to-image's internal resource cache.
      // The library requires at least two calls for all fonts/images/stylesheets
      // to be fully inlined — the second call is the accurate one.
      await toPng(original, options).catch(() => null);
      await toPng(original, options).catch(() => null);

      // Call 3: the definitive capture.
      const rawDataUrl = await toPng(original, options);

      // Load the raw image so we can inspect its natural pixel dimensions.
      const img = new Image();
      img.src = rawDataUrl;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
      });

      // Create a canvas exactly matching the card size (pixelRatio applied).
      // Fill with white first so any transparent pixels in the source render
      // correctly in the PDF instead of showing jsPDF's default transparent/white.
      const canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      const ctx = canvas.getContext('2d')!;

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Draw the captured image at its natural canvas size — this simultaneously
      // copies and clips the output to the exact card bounds, eliminating any
      // overflow bleed caused by the SVG foreignObject overflow:hidden bug.
      ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);

      const pngDataUrl = canvas.toDataURL('image/png');

      // Build PDF page sized exactly to the card dimensions in mm.
      // Do NOT pass orientation — with a custom format array jsPDF uses
      // the dimensions as-is, and passing orientation can swap width/height
      // in some versions when they don't match the named orientation.
      const widthMm = pxToMm(elementWidth);
      const heightMm = pxToMm(elementHeight);

      const pdf = new jsPDF({
        unit: 'mm',
        format: [widthMm, heightMm],
        compress: false, // no additional compression — preserve image data exactly
      });

      // Embed with 'NONE' compression: lossless, no zlib overhead on the image data
      pdf.addImage(pngDataUrl, 'PNG', 0, 0, widthMm, heightMm, undefined, 'NONE');

      pdf.save(`creative-touch-${Date.now()}.pdf`);
    } catch (e) {
      console.error('PDF export failed', e);
    }
  };

  const capturePreview = async (): Promise<string | null> => {
    const original = document.getElementById('export-target');
    if (!original) return null;
    try {
      await document.fonts.ready;
      const fontEmbedCSS = await buildFontEmbedCSS();
      const rect = original.getBoundingClientRect();
      const elementWidth = Math.round(rect.width);
      const elementHeight = Math.round(rect.height);
      const pixelRatio = 3;
      const canvasWidth = elementWidth * pixelRatio;
      const canvasHeight = elementHeight * pixelRatio;
      const options = { pixelRatio, cacheBust: true, width: elementWidth, height: elementHeight, fontEmbedCSS: fontEmbedCSS || undefined };
      await toPng(original, options).catch(() => null);
      await toPng(original, options).catch(() => null);
      const rawDataUrl = await toPng(original, options);
      const img = new Image();
      img.src = rawDataUrl;
      await new Promise<void>((resolve, reject) => { img.onload = () => resolve(); img.onerror = reject; });
      const canvas = document.createElement('canvas');
      canvas.width = canvasWidth; canvas.height = canvasHeight;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);
      return canvas.toDataURL('image/png');
    } catch { return null; }
  };

  return { exportAsPdf, capturePreview };
}
