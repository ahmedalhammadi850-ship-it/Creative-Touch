import type { TemplateData } from '../../types/template';

export default function Template24({ data }: { data: TemplateData }) {
  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[280px] h-[400px] flex flex-col items-center"
      style={{ backgroundColor: '#fdfaf7', fontFamily: 'serif' }}
    >
      {/* Thin border frame */}
      <div className="absolute inset-2 border pointer-events-none" style={{ borderColor: `${data.colors.accent}60` }} />
      <div className="absolute inset-3 border pointer-events-none" style={{ borderColor: `${data.colors.accent}30` }} />

      {/* Top floral circle frame */}
      <div className="relative mt-8 flex-shrink-0" style={{ width: 100, height: 100 }}>
        <svg viewBox="0 0 100 100" width="100" height="100" className="absolute inset-0">
          {/* Floral wreath */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const r = 44;
            const cx = 50 + r * Math.cos(angle);
            const cy = 50 + r * Math.sin(angle);
            return (
              <g key={i} transform={`translate(${cx},${cy}) rotate(${(i / 12) * 360})`}>
                <ellipse rx="7" ry="4" fill={i % 3 === 0 ? data.colors.primary : i % 3 === 1 ? data.colors.accent : '#d4f0c0'} opacity="0.8" />
              </g>
            );
          })}
          {/* Circle border */}
          <circle cx="50" cy="50" r="36" fill="none" stroke={data.colors.accent} strokeWidth="1.5" opacity="0.5"/>
          {/* Photo area */}
          <circle cx="50" cy="50" r="34" fill={data.colors.bg} />
        </svg>
        {/* Photo or initials */}
        {data.image ? (
          <img
            src={data.image}
            alt="صورة"
            className="absolute rounded-full object-cover"
            style={{ inset: '16px' }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[20px] font-bold" style={{ color: data.colors.primary }}>
              {data.title?.charAt(0)}{data.subtitle?.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-2 mt-3 px-8 w-full">
        <div className="flex-1 h-px" style={{ backgroundColor: data.colors.accent, opacity: 0.5 }} />
        <span className="text-[10px]" style={{ color: data.colors.accent }}>✿</span>
        <div className="flex-1 h-px" style={{ backgroundColor: data.colors.accent, opacity: 0.5 }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-8 py-3 gap-2 flex-1">
        <p className="text-[9px] tracking-[0.25em]" style={{ color: data.colors.secondary }}>دعوة كريمة</p>

        <div className="text-center">
          <h2 className="text-[26px] font-bold leading-tight" style={{ color: data.colors.primary }}>{data.title}</h2>
          <p className="text-[13px] mt-0.5 font-medium" style={{ color: data.colors.secondary }}>{data.subtitle}</p>
        </div>

        <div className="flex items-center gap-2 w-full px-4">
          <div className="flex-1 h-px" style={{ backgroundColor: data.colors.accent, opacity: 0.4 }} />
          <span className="text-[8px]" style={{ color: data.colors.accent }}>❀</span>
          <div className="flex-1 h-px" style={{ backgroundColor: data.colors.accent, opacity: 0.4 }} />
        </div>

        <p className="text-[10px] text-center leading-relaxed whitespace-pre-line" style={{ color: data.colors.secondary }}>
          {data.description}
        </p>

        <div className="mt-auto pb-2 text-center">
          {data.phone && (
            <p className="text-[9px]" dir="ltr" style={{ color: data.colors.secondary }}>{data.phone}</p>
          )}
          {data.website && (
            <p className="text-[9px]" style={{ color: data.colors.accent }}>{data.website}</p>
          )}
          <p className="text-[9px] tracking-widest mt-2" style={{ color: data.colors.accent }}>✦ ألف مبروك ✦</p>
        </div>
      </div>

      {/* Bottom floral corner decorations */}
      <svg className="absolute bottom-3 left-3" width="40" height="40" viewBox="0 0 40 40">
        <ellipse cx="8" cy="32" rx="12" ry="7" fill={data.colors.accent} opacity="0.3" transform="rotate(-40 8 32)"/>
        <ellipse cx="18" cy="38" rx="10" ry="6" fill={data.colors.primary} opacity="0.2" transform="rotate(10 18 38)"/>
        <ellipse cx="5" cy="20" rx="9" ry="5" fill={data.colors.accent} opacity="0.25" transform="rotate(-60 5 20)"/>
      </svg>
      <svg className="absolute bottom-3 right-3" width="40" height="40" viewBox="0 0 40 40">
        <ellipse cx="32" cy="32" rx="12" ry="7" fill={data.colors.accent} opacity="0.3" transform="rotate(40 32 32)"/>
        <ellipse cx="22" cy="38" rx="10" ry="6" fill={data.colors.primary} opacity="0.2" transform="rotate(-10 22 38)"/>
        <ellipse cx="35" cy="20" rx="9" ry="5" fill={data.colors.accent} opacity="0.25" transform="rotate(60 35 20)"/>
      </svg>
    </div>
  );
}
