import { toPng } from 'html-to-image';

// Cache for the base64 font to avoid re-fetching
let cachedFontBase64: string | null = null;

async function getCairoBase64(): Promise<string> {
  if (cachedFontBase64) return cachedFontBase64;
  try {
    const response = await fetch('https://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvalIhTp2mxdt0UX8.woff2');
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        cachedFontBase64 = base64;
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (err) {
    console.error('Font fetch failed', err);
    return '';
  }
}

export function useExport() {
  const exportAsPng = async () => {
    const original = document.getElementById('export-target');
    if (!original) return;

    try {
      const fontBase64 = await getCairoBase64();
      await document.fonts.ready;

      // Isolated Export Logic
      const dataUrl = await toPng(original, {
        pixelRatio: 3,
        quality: 1,
        backgroundColor: 'transparent',
        cacheBust: true,
        fontEmbedCSS: fontBase64 ? `
          @font-face {
            font-family: 'Cairo';
            src: url(${fontBase64}) format('woff2');
            font-weight: 400;
          }
          @font-face {
            font-family: 'Cairo';
            src: url(${fontBase64}) format('woff2');
            font-weight: 700;
          }
          * {
            -webkit-font-smoothing: antialiased;
            text-rendering: optimizeLegibility;
            letter-spacing: 0 !important;
            word-spacing: 0 !important;
          }
        ` : undefined,
        style: {
          transform: 'none',
          left: '0',
          top: '0',
          margin: '0',
        }
      });

      const link = document.createElement('a');
      link.download = `creative-touch-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error('High-precision export failed', e);
    }
  };

  return { exportAsPng };
}
