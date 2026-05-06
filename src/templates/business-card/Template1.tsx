import type { TemplateData } from '../../types/template';

export default function Template1({ data }: { data: TemplateData }) {
  const ffs = data.fieldFontSizes ?? {};
  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[340px] h-[220px] flex flex-col justify-between p-6 shadow-sm"
      style={{ backgroundColor: data.colors.bg, color: data.colors.accent }}
    >
      <div
        className="absolute top-0 right-0 w-16 h-16 opacity-50"
        style={{ background: `linear-gradient(135deg, transparent 50%, ${data.colors.accent} 50%)` }}
      />
      <div
        className="absolute bottom-0 left-0 w-16 h-16 opacity-50"
        style={{ background: `linear-gradient(-45deg, transparent 50%, ${data.colors.accent} 50%)` }}
      />

      <div className="z-10 mt-2">
        <h2 className="font-bold tracking-wide" style={{ color: data.colors.primary, fontSize: (ffs.name ?? 24) + _d }}>{data.title}</h2>
        <p className="opacity-90 mt-1" style={{ color: data.colors.secondary, fontSize: (ffs.jobTitle ?? 14) + _d }}>{data.subtitle}</p>
      </div>

      <div className="z-10 space-y-1 mt-auto">
        <p className="font-bold mb-2" style={{ fontSize: (ffs.company ?? 10) + _d }}>{data.description}</p>
        {data.phone && <p dir="ltr" className="text-right opacity-80" style={{ fontSize: (ffs.contact ?? 10) + _d }}>{data.phone}</p>}
        {data.email && <p dir="ltr" className="text-right opacity-80" style={{ fontSize: (ffs.contact ?? 10) + _d }}>{data.email}</p>}
        {data.website && <p dir="ltr" className="text-right opacity-80" style={{ fontSize: (ffs.contact ?? 10) + _d }}>{data.website}</p>}
      </div>
    </div>
  );
}
