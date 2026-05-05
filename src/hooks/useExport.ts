import html2canvas from 'html2canvas';

export function useExport() {
  const exportAsPng = async () => {
    const el = document.getElementById('export-target');
    if (!el) return;
    try {
      await document.fonts.ready;
      const canvas = await html2canvas(el, {
        useCORS: true,
        scale: 2,
        allowTaint: false,
        logging: false,
      });
      const link = document.createElement('a');
      link.download = 'template.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e) {
      console.error('Export failed', e);
    }
  };
  
  return { exportAsPng };
}
