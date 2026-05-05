import type { TemplateData } from '../../types/template';

export default function Template19({ data }: { data: TemplateData }) {
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[340px] h-[220px] flex flex-col justify-between shadow-sm"
      style={{ background: `linear-gradient(120deg, ${data.colors.primary} 0%, ${data.colors.secondary} 100%)` }}
    >
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: `repeating-linear-gradient(45deg, ${data.colors.accent} 0, ${data.colors.accent} 1px, transparent 0, transparent 50%)`, backgroundSize: '12px 12px' }}
      />

      <div className="absolute top-4 right-4 w-16 h-16 rounded-full opacity-20" style={{ border: `2px solid ${data.colors.accent}` }} />
      <div className="absolute top-8 right-8 w-8 h-8 rounded-full opacity-20" style={{ border: `2px solid ${data.colors.accent}` }} />

      <div className="z-10 p-5 pb-2">
        <h2 className="text-xl font-bold" style={{ color: data.colors.accent }}>{data.title}</h2>
        <p className="text-[10px] mt-0.5 opacity-80" style={{ color: data.colors.accent }}>{data.subtitle}</p>
      </div>

      <div className="z-10 px-5 pb-5">
        <div className="w-full h-px mb-3 opacity-30" style={{ backgroundColor: data.colors.accent }} />
        <p className="text-[9px] mb-2 opacity-80" style={{ color: data.colors.accent }}>{data.description}</p>
        <div className="flex flex-col gap-0.5">
          {data.phone && <p dir="ltr" className="text-[9px] opacity-75" style={{ color: data.colors.accent }}>{data.phone}</p>}
          {data.email && <p dir="ltr" className="text-[9px] opacity-75" style={{ color: data.colors.accent }}>{data.email}</p>}
          {data.website && <p dir="ltr" className="text-[9px] opacity-75" style={{ color: data.colors.accent }}>{data.website}</p>}
        </div>
      </div>
    </div>
  );
}
