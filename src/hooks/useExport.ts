import html2canvas from 'html2canvas';

async function loadCairoFont() {
  const font = new FontFace(
    'Cairo',
    "url('https://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvalIhTp2mxdt0UX8.woff2') format('woff2')",
    { weight: '400 900', style: 'normal', display: 'swap' }
  );
  try {
    const loaded = await font.load();
    document.fonts.add(loaded);
  } catch {
    // font already loaded via stylesheet
  }
}

export function useExport() {
  const exportAsPng = async () => {
    const el = document.getElementById('export-target');
    if (!el) return;

    try {
      // 1. Ensure Cairo font is loaded
      await loadCairoFont();
      await document.fonts.ready;

      // 2. Small delay to let any async rendering finish
      await new Promise(resolve => setTimeout(resolve, 200));

      const rect = el.getBoundingClientRect();

      // 3. Capture with optimal settings
      const canvas = await html2canvas(el, {
        useCORS: true,
        allowTaint: true,
        scale: 3,
        backgroundColor: null,
        logging: false,
        imageTimeout: 20000,
        removeContainer: false,
        windowWidth: Math.ceil(rect.width),
        windowHeight: Math.ceil(rect.height),
        x: 0,
        y: 0,
        scrollX: 0,
        scrollY: 0,
        foreignObjectRendering: false,
        onclone: (clonedDoc) => {
          // Ensure Cairo font is applied to all text in cloned document
          const style = clonedDoc.createElement('style');
          style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap');
            * { font-family: 'Cairo', 'Arial', sans-serif !important; }
          `;
          clonedDoc.head.appendChild(style);

          // Replace blur filters with compatible alternatives
          clonedDoc.querySelectorAll<HTMLElement>('[style*="blur"]').forEach(el => {
            el.style.filter = el.style.filter.replace(/blur\([^)]+\)/g, 'blur(0px)');
            el.style.opacity = '0';
          });

          // Replace backdrop-filter (not supported)
          clonedDoc.querySelectorAll<HTMLElement>('[style*="backdrop"]').forEach(el => {
            el.style.backdropFilter = 'none';
            el.style.webkitBackdropFilter = 'none';
          });
        },
      });

      const link = document.createElement('a');
      link.download = 'template-hq.png';
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (e) {
      console.error('Export failed', e);
    }
  };

  return { exportAsPng };
}
