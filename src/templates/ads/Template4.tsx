import type { TemplateData } from '../../types/template';

export default function Template4({ data }: { data: TemplateData }) {
  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[360px] h-[360px] flex items-center justify-center p-6"
      style={{ background: `linear-gradient(135deg, ${data.colors.bg}, ${data.colors.secondary})` }}
    >
      <div
        className="absolute w-[320px] h-[320px] rounded-full border-[1px] opacity-30"
        style={{ borderColor: data.colors.primary }}
      />
      <div
        className="absolute w-[300px] h-[300px] rounded-full border-[4px] opacity-20"
        style={{ borderColor: data.colors.accent }}
      />
      <div
        className="z-10 text-center w-full max-w-[280px] p-6 rounded-full aspect-square flex flex-col justify-center items-center shadow-lg border border-white/50"
        style={{ background: 'rgba(255,255,255,0.55)' }}
      >
        <h2 className="font-bold mb-2 font-serif" style={{ color: data.colors.primary, fontSize: 30 + _d }}>{data.title}</h2>
        <div className="w-8 h-0.5 mx-auto mb-3" style={{ backgroundColor: data.colors.accent }} />
        <p className="font-medium mb-3 uppercase tracking-wider" style={{ color: data.colors.primary, fontSize: 14 + _d }}>{data.subtitle}</p>
        <p className="mb-4 leading-relaxed px-4 opacity-90" style={{ color: data.colors.primary, fontSize: 12 + _d }}>{data.description}</p>
        {data.phone && (
          <p dir="ltr" className="font-bold mt-2" style={{ color: data.colors.primary, fontSize: 14 + _d }}>{data.phone}</p>
        )}
      </div>
    </div>
  );
}
