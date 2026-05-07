import type { TemplateData } from '../../types/template';

export default function Template2({ data }: { data: TemplateData }) {
  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[360px] h-[360px] flex"
    >
      <div
        className="w-5/12 h-full flex flex-col justify-center items-center text-center p-4 relative z-10 shadow-xl"
        style={{ backgroundColor: data.colors.primary, color: data.colors.bg }}
      >
        <h2 className="font-black leading-tight drop-shadow-md" style={{ fontSize: 30 + _d }}>{data.title}</h2>
      </div>

      <div
        className="w-7/12 h-full flex flex-col justify-center p-6 relative"
        style={{ backgroundColor: data.colors.bg }}
      >
        <div
          className="absolute -right-12 -bottom-12 w-32 h-32 rounded-full opacity-10"
          style={{ backgroundColor: data.colors.secondary }}
        />
        <p className="font-bold mb-3 z-10" style={{ color: data.colors.secondary, fontSize: 20 + _d }}>{data.subtitle}</p>
        <p className="leading-relaxed mb-6 z-10" style={{ color: data.colors.primary, fontSize: 14 + _d }}>{data.description}</p>
        {data.phone && (
          <div className="mt-auto pt-4 border-t-2 z-10 flex flex-col gap-1" style={{ borderColor: data.colors.accent }}>
            <span className="font-bold uppercase" style={{ color: data.colors.secondary, fontSize: 12 + _d }}>للتواصل</span>
            <span dir="ltr" className="text-right font-bold" style={{ color: data.colors.primary, fontSize: 18 + _d }}>{data.phone}</span>
          </div>
        )}
      </div>
    </div>
  );
}
