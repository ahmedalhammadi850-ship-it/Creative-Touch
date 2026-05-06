import type { TemplateData } from '../../types/template';

export default function Template41({ data }: { data: TemplateData }) {
  const _d = (data.fontSize ?? 16) - 16;
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[340px] h-[220px]"
      style={{ background: `linear-gradient(135deg, ${data.colors.primary} 0%, ${data.colors.secondary} 100%)`, fontFamily: 'Cairo, sans-serif' }}
    >
      {/* Corner decorations */}
      <svg className="absolute top-0 left-0 pointer-events-none" width="90" height="90" viewBox="0 0 90 90">
        <circle cx="0" cy="0" r="70" fill="none" stroke={data.colors.accent} strokeWidth="1.5" opacity="0.3" />
        <circle cx="0" cy="0" r="50" fill="none" stroke={data.colors.accent} strokeWidth="1" opacity="0.2" />
      </svg>
      <svg className="absolute bottom-0 right-0 pointer-events-none" width="90" height="90" viewBox="0 0 90 90">
        <circle cx="90" cy="90" r="70" fill="none" stroke={data.colors.accent} strokeWidth="1.5" opacity="0.3" />
        <circle cx="90" cy="90" r="50" fill="none" stroke={data.colors.accent} strokeWidth="1" opacity="0.2" />
      </svg>

      {/* Accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: data.colors.accent }} />
      <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: data.colors.accent }} />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-2 px-8">
        {/* Logo image or letter avatar */}
        {data.logo && (
          <img src={data.logo} alt="logo" className="w-14 h-14 object-contain rounded-xl mb-1" />
        )}

        {/* Company name */}
        <h2 className="font-black text-center leading-tight" style={{ color: '#ffffff', textShadow: '0 2px 8px rgba(0,0,0,0.3)', fontSize: 18 + _d }}>
          {data.description || 'شركة الإبداع التقني'}
        </h2>

        {/* Divider */}
        <div className="w-16 h-[1.5px] rounded" style={{ background: data.colors.accent }} />

        {/* Tagline */}
        <p className="font-semibold text-center opacity-80" style={{ color: '#ffffff', fontSize: 10 + _d }}>
          {data.subtitle || 'مدير تقني'}
        </p>

        {/* Contact row */}
        <div className="flex items-center gap-4 mt-1">
          {data.website && (
            <p dir="ltr" className="font-bold opacity-90" style={{ color: data.colors.accent, fontSize: 9 + _d }}>{data.website}</p>
          )}
          {data.phone && (
            <p dir="ltr" className="font-bold opacity-90" style={{ color: '#ffffffcc', fontSize: 9 + _d }}>{data.phone}</p>
          )}
        </div>
      </div>
    </div>
  );
}
