import type { TemplateData } from '../../types/template';

export default function Template21({ data }: { data: TemplateData }) {
  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[280px] h-[400px] flex flex-col items-center justify-center text-center"
      style={{ backgroundColor: data.colors.bg }}
    >
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${data.colors.primary}44 0%, transparent 70%)` }}
      />

      <div className="absolute top-0 left-0 right-0 h-24 flex items-start justify-center pt-4">
        <div style={{ color: data.colors.accent, fontSize: 36 + _d }}>✿</div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 flex items-end justify-center pb-4">
        <div className="rotate-180" style={{ color: data.colors.accent, fontSize: 36 + _d }}>✿</div>
      </div>

      <div className="z-10 flex flex-col items-center gap-4 px-6">
        <p className="tracking-widest" style={{ color: data.colors.secondary, fontSize: 9 + _d }}>بكل الفرح والسرور</p>
        <h2 className="font-serif" style={{ color: data.colors.primary, fontSize: 30 + _d }}>{data.title}</h2>
        <div className="flex items-center gap-3 w-full">
          <div className="flex-1 h-px" style={{ backgroundColor: data.colors.accent }} />
          <span className="font-serif italic" style={{ color: data.colors.accent, fontSize: 14 + _d }}>و</span>
          <div className="flex-1 h-px" style={{ backgroundColor: data.colors.accent }} />
        </div>
        <h2 className="font-serif" style={{ color: data.colors.primary, fontSize: 30 + _d }}>{data.subtitle}</h2>
        <p className="leading-relaxed mt-2 whitespace-pre-line" style={{ color: data.colors.secondary, fontSize: 10 + _d }}>{data.description}</p>
      </div>
    </div>
  );
}
