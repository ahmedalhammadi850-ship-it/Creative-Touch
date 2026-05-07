import type { TemplateData } from '../../types/template';

export default function Template20({ data }: { data: TemplateData }) {
  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[280px] h-[400px] flex flex-col items-center justify-between p-6 text-center"
      style={{ backgroundColor: data.colors.bg }}
    >
      <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${data.colors.primary}22 0%, transparent 60%)` }} />
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: `linear-gradient(0deg, ${data.colors.primary}33 0%, transparent 100%)` }} />
      <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: data.colors.accent }} />
      <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: data.colors.accent }} />

      <div className="z-10 flex flex-col items-center gap-1 pt-2">
        <div className="tracking-[0.3em] uppercase" style={{ color: data.colors.accent, fontSize: 9 + _d }}>Wedding Invitation</div>
        <div className="w-16 h-px mt-1" style={{ backgroundColor: data.colors.accent }} />
      </div>

      <div className="z-10 flex flex-col items-center gap-3">
        <h2 className="font-serif" style={{ color: data.colors.primary, fontSize: 36 + _d }}>{data.title}</h2>
        <div className="font-serif italic" style={{ color: data.colors.accent, fontSize: 24 + _d }}>✦ & ✦</div>
        <h2 className="font-serif" style={{ color: data.colors.primary, fontSize: 36 + _d }}>{data.subtitle}</h2>
      </div>

      <div className="z-10 flex flex-col items-center gap-2 pb-2">
        <div className="w-16 h-px" style={{ backgroundColor: data.colors.accent }} />
        <p className="leading-relaxed whitespace-pre-line" style={{ color: data.colors.secondary, fontSize: 10 + _d }}>{data.description}</p>
      </div>
    </div>
  );
}
