import type { TemplateData } from '../../types/template';

export default function Template42({ data }: { data: TemplateData }) {
  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[340px] h-[220px]"
      style={{ backgroundColor: data.colors.bg, fontFamily: 'Cairo, sans-serif' }}
    >
      {/* Left color block */}
      <div
        className="absolute top-0 left-0 bottom-0 w-[110px]"
        style={{ background: `linear-gradient(180deg, ${data.colors.primary} 0%, ${data.colors.secondary} 100%)` }}
      />

      {/* Diagonal cut */}
      <svg className="absolute top-0 left-[70px] bottom-0 pointer-events-none" width="60" height="220" viewBox="0 0 60 220" preserveAspectRatio="none">
        <polygon points="0,0 60,0 0,220" fill={data.colors.primary} />
      </svg>

      {/* Left side content */}
      <div className="absolute top-0 left-0 w-[100px] h-full flex flex-col items-center justify-center gap-2 z-10">
        {data.logo && (
          <img src={data.logo} alt="logo" className="w-12 h-12 object-contain rounded-lg" />
        )}
        <div className="w-8 h-[1px]" style={{ background: `${data.colors.accent}88` }} />
      </div>

      {/* Right content */}
      <div className="absolute top-0 right-0 w-[200px] h-full flex flex-col items-center justify-center gap-2 pr-6 pl-2 z-10" dir="rtl">
        <h2 className="font-black leading-tight text-right" style={{ color: data.colors.primary, fontSize: 16 + _d }}>
          {data.description || 'شركة الإبداع التقني'}
        </h2>
        <div className="w-12 h-[2px] rounded self-end" style={{ background: data.colors.accent }} />
        <p className="font-bold text-right opacity-70" style={{ color: data.colors.secondary, fontSize: 10 + _d }}>
          {data.subtitle || 'مدير تقني'}
        </p>
        <div className="flex flex-col gap-1 w-full mt-1">
          {data.website && (
            <p dir="ltr" className="font-bold text-right" style={{ color: data.colors.primary, fontSize: 8.5 + _d }}>{data.website}</p>
          )}
          {data.email && (
            <p dir="ltr" className="text-right opacity-70" style={{ color: data.colors.secondary, fontSize: 8.5 + _d }}>{data.email}</p>
          )}
          {data.phone && (
            <p dir="ltr" className="text-right opacity-70" style={{ color: data.colors.secondary, fontSize: 8.5 + _d }}>{data.phone}</p>
          )}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: data.colors.accent }} />
    </div>
  );
}
