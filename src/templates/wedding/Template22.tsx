import type { TemplateData } from '../../types/template';

export default function Template22({ data }: { data: TemplateData }) {
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[280px] h-[400px] flex"
      style={{ backgroundColor: data.colors.bg }}
    >
      <div
        className="w-2 flex-shrink-0"
        style={{ backgroundColor: data.colors.primary }}
      />
      <div
        className="w-1 flex-shrink-0 ml-[2px]"
        style={{ backgroundColor: data.colors.accent }}
      />

      <div className="flex-1 flex flex-col justify-between p-5 pr-4">
        <div>
          <div className="text-[8px] tracking-[0.25em]" style={{ color: data.colors.accent }}>دعـوة زفـاف</div>
          <div className="w-10 h-px mt-2" style={{ backgroundColor: data.colors.accent }} />
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-4xl font-serif leading-tight" style={{ color: data.colors.primary }}>{data.title}</h2>
          <p className="text-base font-serif italic" style={{ color: data.colors.secondary }}>{data.subtitle}</p>
          <div className="w-full h-px my-1" style={{ backgroundColor: `${data.colors.primary}33` }} />
          <p className="text-[10px] leading-relaxed whitespace-pre-line" style={{ color: data.colors.secondary }}>{data.description}</p>
        </div>

        <div className="text-[8px] tracking-widest" style={{ color: data.colors.accent }}>
          ✦ ألف مبروك ✦
        </div>
      </div>
    </div>
  );
}
