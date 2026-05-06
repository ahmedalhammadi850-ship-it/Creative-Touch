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

// Convert screen pixels (at 96 DPI) to mm for jsPDF
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
        quality: 1,
        backgroundColor: undefined,
        cacheBust: true,
        width: elementWidth,
        height: elementHeight,
        fontEmbedCSS: fontEmbedCSS || undefined,
      };

      // First call primes the internal resource cache (known html-to-image requirement)
      await toPng(original, options).catch(() => null);

      // Second call produces the correctly-rendered output
      const rawDataUrl = await toPng(original, options);

      // Crop to exact card bounds via canvas — fixes SVG foreignObject overflow:hidden bug
      const img = new Image();
      img.src = rawDataUrl;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
      });

      const canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);

      const pngDataUrl = canvas.toDataURL('image/png', 1);

      // PDF page sized exactly to the card in mm (96 DPI screen reference)
      const widthMm = pxToMm(elementWidth);
      const heightMm = pxToMm(elementHeight);

      const pdf = new jsPDF({
        orientation: widthMm > heightMm ? 'landscape' : 'portrait',
        unit: 'mm',
        format: [widthMm, heightMm],
        compress: true,
      });

      // Embed the captured image filling the entire PDF page
      pdf.addImage(pngDataUrl, 'PNG', 0, 0, widthMm, heightMm, undefined, 'FAST');

      pdf.save(`creative-touch-${Date.now()}.pdf`);
    } catch (e) {
      console.error('PDF export failed', e);
    }
  };

  return { exportAsPdf };
}
