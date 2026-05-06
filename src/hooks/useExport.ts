import html2canvas from 'html2canvas';

export function useExport() {
  const exportAsPng = async () => {
    const el = document.getElementById('export-target');
    if (!el) return;
    try {
      await document.fonts.ready;
      const canvas = await html2canvas(el, {
        useCORS: true,
        scale: 4,
        allowTaint: false,
        logging: false,
        backgroundColor: null,
        imageTimeout: 15000,
        removeContainer: true,
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
