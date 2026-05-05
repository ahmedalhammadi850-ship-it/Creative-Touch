import type { TemplateData } from '../../types/template';

export default function Template21({ data }: { data: TemplateData }) {
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
        <div className="text-4xl" style={{ color: data.colors.accent }}>✿</div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 flex items-end justify-center pb-4">
        <div className="text-4xl rotate-180" style={{ color: data.colors.accent }}>✿</div>
      </div>

      <div className="z-10 flex flex-col items-center gap-4 px-6">
        <p className="text-[9px] tracking-widest" style={{ color: data.colors.secondary }}>بكل الفرح والسرور</p>
        <h2 className="text-3xl font-serif" style={{ color: data.colors.primary }}>{data.title}</h2>
        <div className="flex items-center gap-3 w-full">
          <div className="flex-1 h-px" style={{ backgroundColor: data.colors.accent }} />
          <span className="text-sm font-serif italic" style={{ color: data.colors.accent }}>و</span>
          <div className="flex-1 h-px" style={{ backgroundColor: data.colors.accent }} />
        </div>
        <h2 className="text-3xl font-serif" style={{ color: data.colors.primary }}>{data.subtitle}</h2>
        <p className="text-[10px] leading-relaxed mt-2 whitespace-pre-line" style={{ color: data.colors.secondary }}>{data.description}</p>
      </div>
    </div>
  );
}
