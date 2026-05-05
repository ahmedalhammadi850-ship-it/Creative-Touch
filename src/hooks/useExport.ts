import html2canvas from 'html2canvas';

export function useExport() {
  const exportAsPng = async () => {
    const el = document.getElementById('template-preview');
    if (!el) return;
    try {
      const canvas = await html2canvas(el, { useCORS: true, scale: 2 });
      const link = document.createElement('a');
      link.download = 'template.png';
      link.href = canvas.toDataURL();
      link.click();
    } catch (e) {
      console.error('Export failed', e);
    }
  };
  
  return { exportAsPng };
}
