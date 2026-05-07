import type { TemplateData } from '../../types/template';

export default function Template1({ data }: { data: TemplateData }) {
  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[280px] h-[400px] flex flex-col items-center justify-center p-8 text-center shadow-sm"
      style={{ backgroundColor: data.colors.bg }}
    >
      <div className="absolute inset-3 border" style={{ borderColor: data.colors.primary, opacity: 0.8 }} />
      <div className="absolute inset-4 border" style={{ borderColor: data.colors.accent, opacity: 0.5 }} />

      <div className="z-10 mb-8 mt-4 tracking-widest font-serif" style={{ color: data.colors.secondary, fontSize: 12 + _d }}>
        دعوة زفاف
      </div>

      <div className="z-10 flex flex-col items-center justify-center flex-1 w-full gap-4">
        <h2 className="font-serif text-center w-full" style={{ color: data.colors.primary, fontSize: 30 + _d }}>{data.title}</h2>
        <span className="font-serif italic" style={{ color: data.colors.accent, fontSize: 20 + _d }}>و</span>
        <h2 className="font-serif text-center w-full" style={{ color: data.colors.primary, fontSize: 30 + _d }}>{data.subtitle}</h2>
      </div>

      <div className="z-10 mt-8 mb-4 max-w-[200px]">
        <div className="w-12 h-px mx-auto mb-4" style={{ backgroundColor: data.colors.primary }} />
        <p className="leading-relaxed font-serif text-center" style={{ color: data.colors.secondary, fontSize: 12 + _d }}>{data.description}</p>
      </div>
    </div>
  );
}
