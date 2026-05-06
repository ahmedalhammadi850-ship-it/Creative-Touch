import type { TemplateData } from '../../types/template';

export default function Template18({ data }: { data: TemplateData }) {
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[340px] h-[220px] flex flex-row shadow-sm"
      style={{ backgroundColor: data.colors.bg }}
    >
      <div
        className="w-20 flex-shrink-0 flex flex-col items-center justify-center gap-3"
        style={{ backgroundColor: data.colors.primary }}
      >
        <div className="w-8 h-px" style={{ backgroundColor: data.colors.accent }} />
        <div className="text-[7px] tracking-widest rotate-0" style={{ color: data.colors.accent }}>✦</div>
      </div>

      <div className="flex-1 flex flex-col justify-between p-5 pr-5">
        <div>
          <h2 className="text-lg font-bold leading-tight" style={{ color: data.colors.primary }}>{data.title}</h2>
          <p className="text-[10px] mt-0.5 tracking-wide" style={{ color: data.colors.accent }}>{data.subtitle}</p>
          <div className="w-full h-px mt-2" style={{ backgroundColor: `${data.colors.primary}33` }} />
        </div>

        <p className="text-[9px] leading-relaxed" style={{ color: data.colors.secondary }}>{data.description}</p>

        <div className="flex flex-col gap-0.5">
          {data.phone && <p dir="ltr" className="text-[9px]" style={{ color: data.colors.secondary }}>{data.phone}</p>}
          {data.email && <p dir="ltr" className="text-[9px]" style={{ color: data.colors.secondary }}>{data.email}</p>}
          {data.website && <p dir="ltr" className="text-[9px]" style={{ color: data.colors.secondary }}>{data.website}</p>}
        </div>
      </div>
    </div>
  );
}
