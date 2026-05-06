import html2canvas from 'html2canvas';

let cairoFontFaceCSS: string | null = null;

async function ensureCairoFont(): Promise<string> {
  if (cairoFontFaceCSS) return cairoFontFaceCSS;
  try {
    const urls = [
      'https://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvalIhTp2mxdt0UX8.woff2',
    ];
    const fetchedFaces: string[] = [];
    for (const url of urls) {
      try {
        const resp = await fetch(url, { mode: 'cors' });
        if (!resp.ok) continue;
        const blob = await resp.blob();
        const dataUri: string = await new Promise((res) => {
          const r = new FileReader();
          r.onload = () => res(r.result as string);
          r.readAsDataURL(blob);
        });
        fetchedFaces.push(`
          @font-face {
            font-family: 'Cairo';
            src: url('${dataUri}') format('woff2');
            font-weight: 100 900;
            font-style: normal;
          }
        `);
        break;
      } catch {}
    }
    if (fetchedFaces.length > 0) {
      cairoFontFaceCSS = fetchedFaces.join('\n');
    } else {
      cairoFontFaceCSS = "/* cairo font fetch failed */";
    }
  } catch {
    cairoFontFaceCSS = "/* cairo font fetch failed */";
  }
  return cairoFontFaceCSS;
}

export function useExport() {
  const exportAsPng = async () => {
    const el = document.getElementById('export-target');
    if (!el) return;

    try {
      // 1. Wait for fonts already in page to load
      await document.fonts.ready;

      // 2. Fetch Cairo as base64 so html2canvas can use it
      const fontFaceCSS = await ensureCairoFont();

      // 3. Small delay for any pending renders
      await new Promise(resolve => setTimeout(resolve, 300));

      const rect = el.getBoundingClientRect();

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
        scrollX: 0,
        scrollY: 0,
        foreignObjectRendering: false,
        onclone: (_clonedDoc, clonedEl) => {
          const doc = clonedEl.ownerDocument;

          // Inject Cairo font-face + fix all Arabic rendering issues
          const style = doc.createElement('style');
          style.textContent = `
            ${fontFaceCSS}
            * {
              font-family: 'Cairo', 'Tahoma', 'Arial', sans-serif !important;
              letter-spacing: 0 !important;
              word-spacing: 0 !important;
              -webkit-font-smoothing: antialiased !important;
              text-rendering: optimizeLegibility !important;
            }
          `;
          doc.head.appendChild(style);

          // Strip backdrop-filter from all elements (not supported by html2canvas)
          doc.querySelectorAll<HTMLElement>('*').forEach(el => {
            const s = el.style;
            if (s.backdropFilter || (s as any).webkitBackdropFilter) {
              s.backdropFilter = 'none';
              (s as any).webkitBackdropFilter = 'none';
              // If the element was semi-transparent glass, give it a solid-ish bg
              if (!s.backgroundColor || s.backgroundColor === 'transparent') {
                s.backgroundColor = 'rgba(255,255,255,0.12)';
              }
            }
            // Strip filter:blur() from decorative elements, keep other filters (e.g. drop-shadow if any)
            if (s.filter && s.filter.includes('blur')) {
              s.filter = 'none';
              // Hide purely decorative blur orbs
              if (s.opacity !== '0') s.opacity = '0.35';
            }
          });

          // Also strip Tailwind backdrop-blur classes by computed style
          doc.querySelectorAll<HTMLElement>('[class*="backdrop"]').forEach(el => {
            el.style.backdropFilter = 'none';
            (el.style as any).webkitBackdropFilter = 'none';
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
