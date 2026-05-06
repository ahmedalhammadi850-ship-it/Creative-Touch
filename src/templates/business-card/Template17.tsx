import type { TemplateData } from '../../types/template';

export default function Template17({ data }: { data: TemplateData }) {
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[340px] h-[220px] flex flex-col justify-between p-6 shadow-sm"
      style={{ background: `linear-gradient(135deg, ${data.colors.bg} 0%, ${data.colors.primary}22 100%)` }}
    >
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20 -translate-y-8 translate-x-8"
        style={{ backgroundColor: data.colors.primary }}
      />
      <div
        className="absolute bottom-0 left-0 w-20 h-20 rounded-full opacity-15 translate-y-6 -translate-x-6"
        style={{ backgroundColor: data.colors.accent }}
      />

      <div className="z-10 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold" style={{ color: data.colors.primary }}>{data.title}</h2>
          <p className="text-xs mt-0.5 opacity-80" style={{ color: data.colors.secondary }}>{data.subtitle}</p>
        </div>
      </div>

      <div className="z-10">
        <p className="text-[10px] font-medium mb-2 opacity-70" style={{ color: data.colors.secondary }}>{data.description}</p>
        <div className="flex flex-col gap-0.5">
          {data.phone && <p dir="ltr" className="text-[9px] opacity-75" style={{ color: data.colors.secondary }}>{data.phone}</p>}
          {data.email && <p dir="ltr" className="text-[9px] opacity-75" style={{ color: data.colors.secondary }}>{data.email}</p>}
          {data.website && <p dir="ltr" className="text-[9px] opacity-75" style={{ color: data.colors.secondary }}>{data.website}</p>}
        </div>
        <div className="mt-2 h-0.5 w-12 rounded" style={{ backgroundColor: data.colors.accent }} />
      </div>
    </div>
  );
}
