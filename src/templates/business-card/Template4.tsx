import type { TemplateData } from '../../types/template';

export default function Template4({ data }: { data: TemplateData }) {
  const ffs = data.fieldFontSizes ?? {};
  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[340px] h-[220px] shadow-sm flex flex-col items-center justify-center p-8 text-center"
      style={{ backgroundColor: data.colors.bg, color: data.colors.primary }}
    >
      <div className="w-full border-t mb-2" style={{ borderColor: data.colors.accent }} />
      <div className="w-full border-t mb-6" style={{ borderColor: data.colors.accent }} />

      <h2 className="font-bold font-serif mb-1" style={{ fontSize: (ffs.name ?? 20) + _d }}>{data.title}</h2>
      <p className="tracking-widest uppercase mb-4" style={{ color: data.colors.secondary, fontSize: (ffs.jobTitle ?? 12) + _d }}>{data.subtitle}</p>

      <p className="font-bold mb-3" style={{ fontSize: (ffs.company ?? 10) + _d }}>{data.description}</p>

      <div className="flex gap-3 justify-center w-full" style={{ color: data.colors.secondary }}>
        {data.phone && <span dir="ltr" style={{ fontSize: (ffs.contact ?? 8) + _d }}>{data.phone}</span>}
        {data.email && <span dir="ltr" style={{ fontSize: (ffs.contact ?? 8) + _d }}>{data.email}</span>}
        {data.website && <span dir="ltr" style={{ fontSize: (ffs.contact ?? 8) + _d }}>{data.website}</span>}
      </div>

      <div className="w-full border-t mt-6 mb-2" style={{ borderColor: data.colors.accent }} />
      <div className="w-full border-t" style={{ borderColor: data.colors.accent }} />
    </div>
  );
}
