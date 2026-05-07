import type { TemplateData } from '../../types/template';

export default function Template22({ data }: { data: TemplateData }) {
  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[280px] h-[400px] flex"
      style={{ backgroundColor: data.colors.bg }}
    >
      <div className="w-2 flex-shrink-0" style={{ backgroundColor: data.colors.primary }} />
      <div className="w-1 flex-shrink-0 ml-[2px]" style={{ backgroundColor: data.colors.accent }} />

      <div className="flex-1 flex flex-col justify-between p-5 pr-4">
        <div>
          <div className="tracking-[0.25em]" style={{ color: data.colors.accent, fontSize: 8 + _d }}>دعـوة زفـاف</div>
          <div className="w-10 h-px mt-2" style={{ backgroundColor: data.colors.accent }} />
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="font-serif leading-tight" style={{ color: data.colors.primary, fontSize: 36 + _d }}>{data.title}</h2>
          <p className="font-serif italic" style={{ color: data.colors.secondary, fontSize: 16 + _d }}>{data.subtitle}</p>
          <div className="w-full h-px my-1" style={{ backgroundColor: `${data.colors.primary}33` }} />
          <p className="leading-relaxed whitespace-pre-line" style={{ color: data.colors.secondary, fontSize: 10 + _d }}>{data.description}</p>
        </div>

        <div className="tracking-widest" style={{ color: data.colors.accent, fontSize: 8 + _d }}>
          ✦ ألف مبروك ✦
        </div>
      </div>
    </div>
  );
}
