import type { TemplateData } from '../../types/template';

export default function Template2({ data }: { data: TemplateData }) {
  const ffs = data.fieldFontSizes ?? {};
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[340px] h-[220px] flex shadow-sm"
      style={{ backgroundColor: data.colors.bg }}
    >
      <div
        className="w-4 h-full shrink-0"
        style={{ backgroundColor: data.colors.primary }}
      />

      <div className="flex flex-col justify-center flex-1 p-6">
        <div className="border-b-2 pb-3 mb-3" style={{ borderColor: data.colors.accent }}>
          <h2 className="font-bold" style={{ color: data.colors.primary, fontSize: ffs.name ?? 20 }}>{data.title}</h2>
          <p className="font-medium" style={{ color: data.colors.secondary, fontSize: ffs.jobTitle ?? 12 }}>{data.subtitle}</p>
        </div>

        <p className="font-bold mb-4" style={{ color: data.colors.primary, fontSize: ffs.company ?? 12 }}>{data.description}</p>

        <div className="space-y-1" style={{ color: data.colors.secondary }}>
          {data.phone && <p dir="ltr" className="text-right" style={{ fontSize: ffs.contact ?? 10 }}>{data.phone}</p>}
          {data.email && <p dir="ltr" className="text-right" style={{ fontSize: ffs.contact ?? 10 }}>{data.email}</p>}
          {data.website && <p dir="ltr" className="text-right" style={{ fontSize: ffs.contact ?? 10 }}>{data.website}</p>}
        </div>
      </div>
    </div>
  );
}
