import type { TemplateData } from '../../types/template';

export default function Template3({ data }: { data: TemplateData }) {
  const ffs = data.fieldFontSizes ?? {};
  const _d = (data.fontSize ?? 16) - 16;
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[340px] h-[220px] p-6 shadow-sm flex items-center justify-between"
      style={{
        background: `linear-gradient(135deg, ${data.colors.primary}, ${data.colors.secondary})`,
        color: data.colors.bg
      }}
    >
      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20"
        style={{ backgroundColor: data.colors.accent }}
      />
      <div
        className="absolute -bottom-16 -left-10 w-48 h-48 rounded-full border-[10px] opacity-20"
        style={{ borderColor: data.colors.accent }}
      />

      <div className="z-10 flex-1 pl-4">
        <h2 className="font-black mb-1" style={{ fontSize: (ffs.name ?? 24) + _d }}>{data.title}</h2>
        <p className="opacity-90 font-medium" style={{ fontSize: (ffs.jobTitle ?? 12) + _d }}>{data.subtitle}</p>
        <div className="mt-4 w-8 h-1 rounded" style={{ backgroundColor: data.colors.accent }} />
        <p className="mt-3 font-bold opacity-90" style={{ fontSize: (ffs.company ?? 12) + _d }}>{data.description}</p>
      </div>

      <div className="z-10 space-y-1.5 text-left border-l pl-3" style={{ borderColor: `${data.colors.bg}40` }}>
        {data.phone && <p dir="ltr" style={{ fontSize: (ffs.contact ?? 9) + _d }}>{data.phone}</p>}
        {data.email && <p dir="ltr" style={{ fontSize: (ffs.contact ?? 9) + _d }}>{data.email}</p>}
        {data.website && <p dir="ltr" style={{ fontSize: (ffs.contact ?? 9) + _d }}>{data.website}</p>}
      </div>
    </div>
  );
}
