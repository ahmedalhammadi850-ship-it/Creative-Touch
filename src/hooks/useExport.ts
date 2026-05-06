import { toPng } from 'html-to-image';

export function useExport() {
  const exportAsPng = async () => {
    const el = document.getElementById('export-target');
    if (!el) return;

    try {
      // 1. Wait for everything to be ready
      await document.fonts.ready;
      await new Promise(resolve => setTimeout(resolve, 500));

      // 2. Export with high quality
      const dataUrl = await toPng(el, {
        quality: 1.0,
        pixelRatio: 3, // High DPI for crisp text
        skipFonts: false,
        backgroundColor: 'transparent',
        cacheBust: true,
        style: {
          // Force layout stabilization during export
          transform: 'scale(1)',
          transformOrigin: 'top left',
        },
        fontEmbedCSS: `
          @font-face {
            font-family: 'Cairo';
            font-style: normal;
            font-weight: 400;
            src: url(https://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvalIhTp2mxdt0UX8.woff2) format('woff2');
          }
          @font-face {
            font-family: 'Cairo';
            font-style: normal;
            font-weight: 700;
            src: url(https://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvalIhTp2mxdt0UX8.woff2) format('woff2');
          }
        `
      });

      // 3. Trigger download
      const link = document.createElement('a');
      link.download = `template-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();

    } catch (e) {
      console.error('Export failed', e);
    }
  };

  return { exportAsPng };
}
