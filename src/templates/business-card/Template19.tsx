import type { TemplateData } from '../../types/template';

export default function Template19({ data }: { data: TemplateData }) {
  const ffs = data.fieldFontSizes ?? {};
  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[340px] h-[220px] flex flex-col justify-center shadow-sm"
      style={{ background: `linear-gradient(120deg, ${data.colors.primary} 0%, ${data.colors.secondary} 100%)` }}
    >
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: `repeating-linear-gradient(45deg, ${data.colors.accent} 0, ${data.colors.accent} 1px, transparent 0, transparent 50%)`, backgroundSize: '12px 12px' }}
      />

      <div className="absolute top-4 right-4 w-16 h-16 rounded-full opacity-20" style={{ border: `2px solid ${data.colors.accent}` }} />
      <div className="absolute top-8 right-8 w-8 h-8 rounded-full opacity-20" style={{ border: `2px solid ${data.colors.accent}` }} />

      <div className="z-10 flex flex-col gap-3 p-5">
        <div>
          <h2 className="font-bold" style={{ color: data.colors.accent, fontSize: (ffs.name ?? 20) + _d }}>{data.title}</h2>
          <p className="mt-0.5 opacity-80" style={{ color: data.colors.accent, fontSize: (ffs.jobTitle ?? 10) + _d }}>{data.subtitle}</p>
        </div>
        <div>
          <div className="w-full h-px mb-3 opacity-30" style={{ backgroundColor: data.colors.accent }} />
          <p className="mb-2 opacity-80" style={{ color: data.colors.accent, fontSize: (ffs.company ?? 9) + _d }}>{data.description}</p>
          <div className="flex flex-col gap-0.5">
            {data.phone && <p dir="ltr" className="opacity-75" style={{ color: data.colors.accent, fontSize: (ffs.contact ?? 9) + _d }}>{data.phone}</p>}
            {data.email && <p dir="ltr" className="opacity-75" style={{ color: data.colors.accent, fontSize: (ffs.contact ?? 9) + _d }}>{data.email}</p>}
            {data.website && <p dir="ltr" className="opacity-75" style={{ color: data.colors.accent, fontSize: (ffs.contact ?? 9) + _d }}>{data.website}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
