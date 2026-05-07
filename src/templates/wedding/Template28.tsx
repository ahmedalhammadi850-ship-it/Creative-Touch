import type { TemplateData } from '../../types/template';

export default function Template28({ data }: { data: TemplateData }) {
  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[280px] h-[400px] flex flex-col items-center"
      style={{ backgroundColor: '#f6fbfc', fontFamily: 'serif' }}
    >
      {/* Teal/blue watercolor botanical top */}
      <svg className="absolute top-0 left-0 w-full" viewBox="0 0 280 140" style={{ height: 140 }}>
        {/* Eucalyptus-style leaves */}
        <path d="M0,0 Q40,30 20,80" stroke={data.colors.primary} strokeWidth="1.5" fill="none" opacity="0.5"/>
        <ellipse cx="22" cy="30" rx="16" ry="7" fill={data.colors.primary} opacity="0.2" transform="rotate(-40 22 30)"/>
        <ellipse cx="14" cy="50" rx="14" ry="6" fill={data.colors.accent} opacity="0.2" transform="rotate(-55 14 50)"/>
        <ellipse cx="24" cy="68" rx="13" ry="5" fill={data.colors.primary} opacity="0.18" transform="rotate(-35 24 68)"/>
        {/* Blossoms left */}
        <circle cx="35" cy="20" r="8" fill={data.colors.accent} opacity="0.22"/>
        <circle cx="35" cy="20" r="4" fill={data.colors.accent} opacity="0.3"/>
        <circle cx="55" cy="10" r="7" fill={data.colors.primary} opacity="0.18"/>
        <circle cx="50" cy="35" r="5" fill={data.colors.accent} opacity="0.2"/>
        {/* Right botanical */}
        <path d="M280,0 Q240,35 260,85" stroke={data.colors.primary} strokeWidth="1.5" fill="none" opacity="0.5"/>
        <ellipse cx="258" cy="32" rx="16" ry="7" fill={data.colors.primary} opacity="0.2" transform="rotate(40 258 32)"/>
        <ellipse cx="266" cy="52" rx="14" ry="6" fill={data.colors.accent} opacity="0.2" transform="rotate(55 266 52)"/>
        <ellipse cx="256" cy="70" rx="13" ry="5" fill={data.colors.primary} opacity="0.18" transform="rotate(35 256 70)"/>
        <circle cx="245" cy="18" r="8" fill={data.colors.accent} opacity="0.22"/>
        <circle cx="245" cy="18" r="4" fill={data.colors.accent} opacity="0.3"/>
        <circle cx="225" cy="10" r="7" fill={data.colors.primary} opacity="0.18"/>
        <circle cx="230" cy="38" r="5" fill={data.colors.accent} opacity="0.2"/>
        {/* Top center branches */}
        <path d="M110,0 Q140,20 140,50" stroke={data.colors.primary} strokeWidth="1" fill="none" opacity="0.3"/>
        <path d="M170,0 Q140,20 140,50" stroke={data.colors.primary} strokeWidth="1" fill="none" opacity="0.3"/>
        <circle cx="110" cy="5" r="5" fill={data.colors.accent} opacity="0.2"/>
        <circle cx="170" cy="5" r="5" fill={data.colors.accent} opacity="0.2"/>
      </svg>

      {/* Logo / Monogram area */}
      <div className="relative z-10 mt-8 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full border-2 flex items-center justify-center" style={{ borderColor: data.colors.primary }}>
          <span className="text-[20px] font-bold" style={{ color: data.colors.primary }}>
            {data.title?.charAt(0)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-8 gap-2 mt-3 flex-1">
        <p className="text-[9px] tracking-[0.3em]" style={{ color: data.colors.secondary }}>Wedding Invitation</p>
        <p className="text-[9px] tracking-[0.25em]" style={{ color: data.colors.primary }}>دعوة زفاف</p>

        <div className="flex items-center gap-2 w-full mt-1">
          <div className="flex-1 h-px" style={{ backgroundColor: data.colors.primary, opacity: 0.3 }} />
          <span style={{ color: data.colors.primary, fontSize: 10 + _d, opacity: 0.6 }}>❀</span>
          <div className="flex-1 h-px" style={{ backgroundColor: data.colors.primary, opacity: 0.3 }} />
        </div>

        <h2 className="text-[26px] font-bold text-center leading-tight mt-1" style={{ color: data.colors.primary }}>{data.title}</h2>
        <p className="text-[14px] font-medium text-center" style={{ color: data.colors.secondary }}>{data.subtitle}</p>

        <div className="w-12 h-px my-1" style={{ backgroundColor: data.colors.accent, opacity: 0.6 }} />

        <p className="text-[10px] text-center leading-relaxed whitespace-pre-line" style={{ color: data.colors.secondary }}>
          {data.description}
        </p>

        {/* Date / Info row */}
        {data.phone && (
          <div className="flex items-center justify-center gap-4 mt-2 text-center">
            <div>
              <p className="text-[7px] uppercase tracking-widest" style={{ color: data.colors.primary }}>SUN</p>
              <p className="text-[20px] font-black leading-none" style={{ color: data.colors.primary }}>{data.phone.substring(0, 2)}</p>
              <p className="text-[7px]" style={{ color: data.colors.secondary }}>2025</p>
            </div>
          </div>
        )}

        {data.website && (
          <p className="text-[9px] mt-1" style={{ color: data.colors.secondary }}>{data.website}</p>
        )}

        <p className="text-[9px] tracking-widest mt-auto mb-3" style={{ color: data.colors.primary }}>✦ ألف مبروك ✦</p>
      </div>

      {/* Bottom botanical */}
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 280 80" style={{ height: 80 }}>
        <path d="M0,80 Q30,50 20,20" stroke={data.colors.primary} strokeWidth="1.2" fill="none" opacity="0.4"/>
        <ellipse cx="16" cy="40" rx="13" ry="5" fill={data.colors.accent} opacity="0.18" transform="rotate(-40 16 40)"/>
        <ellipse cx="22" cy="58" rx="11" ry="5" fill={data.colors.primary} opacity="0.15" transform="rotate(-55 22 58)"/>
        <path d="M280,80 Q250,50 260,20" stroke={data.colors.primary} strokeWidth="1.2" fill="none" opacity="0.4"/>
        <ellipse cx="264" cy="40" rx="13" ry="5" fill={data.colors.accent} opacity="0.18" transform="rotate(40 264 40)"/>
        <ellipse cx="258" cy="58" rx="11" ry="5" fill={data.colors.primary} opacity="0.15" transform="rotate(55 258 58)"/>
        <path d="M85,70 L195,70" stroke={data.colors.primary} strokeWidth="0.6" opacity="0.25" />
      </svg>
    </div>
  );
}
