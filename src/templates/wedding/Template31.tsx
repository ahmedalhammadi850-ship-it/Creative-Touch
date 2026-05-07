import type { TemplateData } from '../../types/template';

export default function Template31({ data }: { data: TemplateData }) {
  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div
      id="template-preview"
      className="relative w-[280px] h-[400px] overflow-hidden flex flex-col items-center justify-center"
      style={{ fontFamily: 'serif' }}
    >
      {/* ---- Pastel gradient background: teal top → pink/lavender bottom ---- */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(160deg, #a8d8e0 0%, #c8e8f0 30%, #e8d0e8 65%, #f8d0d8 100%)' }}
      />
      {/* Soft light overlay */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.45) 0%, transparent 70%)' }} />

      {/* ---- Watercolor roses top-left ---- */}
      <svg className="absolute top-0 left-0 pointer-events-none" width="120" height="130" viewBox="0 0 120 130">
        <path d="M0,120 Q30,80 20,30" stroke="#8ab060" strokeWidth="1.5" fill="none" opacity="0.7"/>
        <ellipse cx="22" cy="65" rx="18" ry="7" fill="#7aaa50" opacity="0.45" transform="rotate(-35 22 65)"/>
        <ellipse cx="10" cy="88" rx="15" ry="6" fill="#8ab060" opacity="0.4" transform="rotate(-55 10 88)"/>
        {/* Roses */}
        <circle cx="32" cy="28" r="22" fill="#f08090" opacity="0.2"/>
        <ellipse cx="24" cy="20" rx="15" ry="12" fill="#f08090" opacity="0.65"/>
        <ellipse cx="40" cy="24" rx="14" ry="11" fill="#e07080" opacity="0.6"/>
        <ellipse cx="32" cy="35" rx="15" ry="10" fill="#f090a0" opacity="0.55"/>
        <ellipse cx="18" cy="32" rx="12" ry="9" fill="#e07888" opacity="0.5"/>
        <circle cx="32" cy="24" r="7" fill="#ffc0c8" opacity="0.6"/>
        <circle cx="32" cy="24" r="3.5" fill="#ffe0e8" opacity="0.8"/>
        {/* Smaller rose */}
        <ellipse cx="72" cy="18" rx="11" ry="9" fill="#f090a8" opacity="0.6"/>
        <ellipse cx="82" cy="22" rx="10" ry="8" fill="#e08098" opacity="0.55"/>
        <circle cx="76" cy="20" r="5" fill="#ffc0d0" opacity="0.6"/>
        {/* White blossoms */}
        <circle cx="58" cy="8" r="7" fill="#fff" opacity="0.8"/>
        <circle cx="57" cy="7" r="3" fill="#ffe8f0" opacity="0.85"/>
        <circle cx="96" cy="8" r="5" fill="#fff" opacity="0.75"/>
      </svg>

      {/* ---- Watercolor roses top-right ---- */}
      <svg className="absolute top-0 right-0 pointer-events-none" width="120" height="130" viewBox="0 0 120 130">
        <path d="M120,120 Q90,80 100,30" stroke="#8ab060" strokeWidth="1.5" fill="none" opacity="0.7"/>
        <ellipse cx="98" cy="65" rx="18" ry="7" fill="#7aaa50" opacity="0.45" transform="rotate(35 98 65)"/>
        <ellipse cx="110" cy="88" rx="15" ry="6" fill="#8ab060" opacity="0.4" transform="rotate(55 110 88)"/>
        <circle cx="88" cy="28" r="22" fill="#f08090" opacity="0.2"/>
        <ellipse cx="80" cy="20" rx="15" ry="12" fill="#f08090" opacity="0.65"/>
        <ellipse cx="96" cy="24" rx="14" ry="11" fill="#e07080" opacity="0.6"/>
        <ellipse cx="88" cy="35" rx="15" ry="10" fill="#f090a0" opacity="0.55"/>
        <circle cx="88" cy="24" r="7" fill="#ffc0c8" opacity="0.6"/>
        <circle cx="88" cy="24" r="3.5" fill="#ffe0e8" opacity="0.8"/>
        <circle cx="62" cy="8" r="7" fill="#fff" opacity="0.8"/>
        <circle cx="22" cy="8" r="5" fill="#fff" opacity="0.75"/>
        <ellipse cx="46" cy="18" rx="11" ry="9" fill="#f090a8" opacity="0.55"/>
        <circle cx="44" cy="20" r="5" fill="#ffc0d0" opacity="0.55"/>
      </svg>

      {/* ---- Gold diamond / rhombus frame ---- */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 280 400">
        {/* Outer diamond */}
        <path d="M140,18 L265,200 L140,382 L15,200 Z"
          fill="none" stroke={data.colors.accent} strokeWidth="1.5" opacity="0.8"/>
        {/* Inner diamond */}
        <path d="M140,38 L248,200 L140,362 L32,200 Z"
          fill="none" stroke={data.colors.accent} strokeWidth="0.8" opacity="0.5"/>
        {/* Corner accents of diamond */}
        {[[140,18],[265,200],[140,382],[15,200]].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r="4" fill={data.colors.accent} opacity="0.8"/>
        ))}
        {/* Mid-edge ornaments */}
        {[[140,28],[256,200],[140,372],[24,200]].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r="2" fill={data.colors.accent} opacity="0.6"/>
        ))}
        {/* Horizontal divider line */}
        <line x1="65" y1="220" x2="215" y2="220" stroke={data.colors.accent} strokeWidth="0.8" opacity="0.5"/>
        <circle cx="140" cy="220" r="2.5" fill={data.colors.accent} opacity="0.6"/>
      </svg>

      {/* ---- Main content inside diamond ---- */}
      <div className="relative z-10 flex flex-col items-center gap-1.5 px-14 mt-2">
        <p className="text-[8px] tracking-[0.3em] text-center" style={{ color: '#5a4a3a' }}>دعوة زفاف</p>
        <div className="w-10 h-px" style={{ backgroundColor: data.colors.accent, opacity: 0.7 }} />

        <h2 className="text-[28px] font-bold text-center leading-tight mt-1" style={{ color: data.colors.primary }}>
          {data.title}
        </h2>
        <div className="flex items-center gap-2">
          <div className="h-px w-7" style={{ backgroundColor: data.colors.accent, opacity: 0.7 }} />
          <span style={{ color: data.colors.accent, fontSize: 13 + _d }}>❧</span>
          <div className="h-px w-7" style={{ backgroundColor: data.colors.accent, opacity: 0.7 }} />
        </div>
        <p className="text-[16px] font-bold" style={{ color: data.colors.secondary }}>{data.subtitle}</p>

        <div className="w-10 h-px my-1" style={{ backgroundColor: data.colors.accent, opacity: 0.5 }} />

        <p className="text-[9px] text-center leading-relaxed whitespace-pre-line" style={{ color: '#4a3a2a' }}>
          {data.description}
        </p>

        {data.phone && (
          <p dir="ltr" className="text-[9px] mt-1 font-medium" style={{ color: '#4a3a2a' }}>{data.phone}</p>
        )}
        {data.website && (
          <p className="text-[8px]" style={{ color: '#5a4a3a' }}>{data.website}</p>
        )}

        <p className="text-[8px] tracking-widest mt-1" style={{ color: data.colors.accent }}>✦ دعوة زفاف ✦</p>
      </div>
    </div>
  );
}
