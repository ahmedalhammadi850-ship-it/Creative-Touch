import { toPng } from 'html-to-image';

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

export function useExport() {
  const exportAsPng = async () => {
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

      // First call: primes the internal resource cache (fonts, images, stylesheets).
      // This is a known requirement of html-to-image — the second call produces
      // the correctly-rendered output.
      await toPng(original, options).catch(() => null);

      // Second call: the real capture.
      const rawDataUrl = await toPng(original, options);

      // Post-process: draw the raw output onto a canvas cropped to exact element
      // dimensions. This acts as a guaranteed overflow:hidden clip, fixing the
      // SVG foreignObject bug in Chromium where overflow:hidden on child elements
      // doesn't clip absolute-positioned descendants during html-to-image capture.
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

      // Draw only the exact card area — crops any bleed from overflow
      ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);

      const finalDataUrl = canvas.toDataURL('image/png', 1);

      const link = document.createElement('a');
      link.download = `creative-touch-${Date.now()}.png`;
      link.href = finalDataUrl;
      link.click();
    } catch (e) {
      console.error('Export failed', e);
    }
  };

  return { exportAsPng };
}
