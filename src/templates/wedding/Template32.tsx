import type { TemplateData } from '../../types/template';

export default function Template32({ data }: { data: TemplateData }) {
  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div
      id="template-preview"
      className="relative w-[280px] h-[400px] overflow-hidden flex flex-col items-center"
      style={{ backgroundColor: '#faf8f4', fontFamily: 'serif' }}
    >
      {/* Thin elegant border */}
      <div className="absolute inset-2" style={{ border: `1px solid ${data.colors.accent}`, opacity: 0.5 }} />

      {/* ---- Floral top corner decorations ---- */}
      <svg className="absolute top-0 left-0 pointer-events-none" width="80" height="80" viewBox="0 0 80 80">
        <path d="M0,0 Q35,15 30,60" stroke="#a8b890" strokeWidth="1.2" fill="none" opacity="0.6"/>
        <ellipse cx="28" cy="30" rx="14" ry="5" fill="#90a870" opacity="0.35" transform="rotate(-35 28 30)"/>
        <ellipse cx="18" cy="50" rx="12" ry="5" fill="#a8b890" opacity="0.3" transform="rotate(-55 18 50)"/>
        <circle cx="32" cy="14" r="9" fill={data.colors.accent} opacity="0.25"/>
        <circle cx="32" cy="14" r="5" fill={data.colors.accent} opacity="0.35"/>
        <circle cx="50" cy="8" r="6" fill={data.colors.primary} opacity="0.2"/>
        <circle cx="14" cy="22" r="7" fill={data.colors.accent} opacity="0.2"/>
      </svg>
      <svg className="absolute top-0 right-0 pointer-events-none" width="80" height="80" viewBox="0 0 80 80">
        <path d="M80,0 Q45,15 50,60" stroke="#a8b890" strokeWidth="1.2" fill="none" opacity="0.6"/>
        <ellipse cx="52" cy="30" rx="14" ry="5" fill="#90a870" opacity="0.35" transform="rotate(35 52 30)"/>
        <ellipse cx="62" cy="50" rx="12" ry="5" fill="#a8b890" opacity="0.3" transform="rotate(55 62 50)"/>
        <circle cx="48" cy="14" r="9" fill={data.colors.accent} opacity="0.25"/>
        <circle cx="48" cy="14" r="5" fill={data.colors.accent} opacity="0.35"/>
        <circle cx="30" cy="8" r="6" fill={data.colors.primary} opacity="0.2"/>
        <circle cx="66" cy="22" r="7" fill={data.colors.accent} opacity="0.2"/>
      </svg>

      {/* ---- Illustrated Arabic couple (SVG art) ---- */}
      <svg
        className="absolute pointer-events-none"
        style={{ bottom: 0, left: 0, width: '100%', height: 200 }}
        viewBox="0 0 280 200"
        preserveAspectRatio="xMidYMax meet"
      >
        {/* Ground / shadow */}
        <ellipse cx="140" cy="195" rx="90" ry="6" fill={data.colors.primary} opacity="0.08"/>

        {/* ===== GROOM (right) ===== */}
        {/* Thobe body */}
        <path d="M168,90 Q155,120 150,200 L195,200 Q192,120 182,90 Z" fill="#f0ece4" stroke="#d0c8b8" strokeWidth="0.8"/>
        {/* Bisht (cloak) */}
        <path d="M165,92 Q148,130 145,200 L155,200 Q158,145 170,110 Z" fill={data.colors.primary} opacity="0.6"/>
        <path d="M182,92 Q198,130 200,200 L190,200 Q188,145 176,110 Z" fill={data.colors.primary} opacity="0.5"/>
        {/* Neck */}
        <rect x="172" y="75" width="10" height="18" rx="3" fill="#d4a888"/>
        {/* Head */}
        <ellipse cx="177" cy="65" rx="15" ry="18" fill="#d4a888"/>
        {/* Shmagh (headdress) */}
        <path d="M162,58 Q163,40 177,38 Q191,40 192,58 Q190,52 177,50 Q164,52 162,58 Z" fill="#f0f0f0"/>
        <path d="M162,58 Q158,70 162,75 Q163,62 177,60 Q191,62 192,75 Q196,70 192,58 Z" fill="#f0f0f0"/>
        {/* Shmagh red pattern */}
        <path d="M162,58 Q163,42 177,40 Q191,42 192,58" fill="none" stroke="#c83030" strokeWidth="1.5" opacity="0.5"/>
        {/* Agal (black rope) */}
        <ellipse cx="177" cy="58" rx="14" ry="5" fill="none" stroke="#1a1a1a" strokeWidth="2.5"/>
        {/* Face features */}
        <ellipse cx="172" cy="67" rx="2" ry="2.5" fill="#8a5a3a"/>
        <ellipse cx="182" cy="67" rx="2" ry="2.5" fill="#8a5a3a"/>
        <path d="M173,73 Q177,76 181,73" stroke="#8a5a3a" strokeWidth="1" fill="none"/>
        {/* Arms */}
        <path d="M168,100 Q155,118 152,140" stroke="#f0ece4" strokeWidth="8" strokeLinecap="round" fill="none"/>
        <path d="M182,100 Q195,118 198,140" stroke="#f0ece4" strokeWidth="8" strokeLinecap="round" fill="none"/>

        {/* ===== BRIDE (left) ===== */}
        {/* Dress */}
        <path d="M98,95 Q88,130 82,200 L130,200 Q126,130 116,95 Z" fill="#fff8f0" stroke="#e8d8c8" strokeWidth="0.8"/>
        {/* Dress details */}
        <path d="M107,95 L107,200" stroke="#f0d8c0" strokeWidth="0.5" opacity="0.6"/>
        {/* Hijab / veil */}
        <path d="M95,82 Q90,75 92,65 Q92,50 107,48 Q122,50 122,65 Q124,75 119,82 Q115,88 107,88 Q99,88 95,82 Z"
          fill="#f5f0e8"/>
        <path d="M92,78 Q80,90 78,110 Q82,100 95,96 Z" fill="#f5f0e8" opacity="0.9"/>
        <path d="M122,78 Q134,90 136,110 Q132,100 119,96 Z" fill="#f5f0e8" opacity="0.9"/>
        {/* Face */}
        <ellipse cx="107" cy="67" rx="13" ry="15" fill="#e8c8a8"/>
        {/* Eyes */}
        <ellipse cx="102" cy="65" rx="2" ry="2.5" fill="#5a3520"/>
        <ellipse cx="112" cy="65" rx="2" ry="2.5" fill="#5a3520"/>
        {/* Lips */}
        <path d="M103,72 Q107,75 111,72" stroke="#c07060" strokeWidth="1.2" fill="none"/>
        {/* Floral hair ornament */}
        <circle cx="115" cy="53" r="5" fill={data.colors.primary} opacity="0.5"/>
        <circle cx="115" cy="53" r="2.5" fill={data.colors.accent} opacity="0.7"/>
        {/* Arms */}
        <path d="M100,102 Q90,120 88,142" stroke="#f0e8d8" strokeWidth="8" strokeLinecap="round" fill="none"/>
        <path d="M114,102 Q124,120 126,142" stroke="#f0e8d8" strokeWidth="8" strokeLinecap="round" fill="none"/>

        {/* Holding hands */}
        <ellipse cx="138" cy="150" rx="10" ry="5" fill="#d4a888" opacity="0.5" transform="rotate(-20 138 150)"/>
        <line x1="126" y1="145" x2="150" y2="148" stroke="#d4a888" strokeWidth="5" strokeLinecap="round" opacity="0.6"/>
      </svg>

      {/* ---- Top content ---- */}
      <div className="relative z-10 flex flex-col items-center pt-6 px-8 gap-1.5">
        {/* Small header text */}
        <p className="text-[8px] tracking-[0.25em]" style={{ color: data.colors.secondary }}>بسم الله الرحمن الرحيم</p>
        <div className="flex items-center gap-2 w-full mt-1">
          <div className="flex-1 h-px" style={{ backgroundColor: data.colors.accent, opacity: 0.5 }} />
          <span style={{ color: data.colors.accent, fontSize: 9 + _d }}>✿</span>
          <div className="flex-1 h-px" style={{ backgroundColor: data.colors.accent, opacity: 0.5 }} />
        </div>

        {/* Main names */}
        <h2 className="text-[32px] font-bold leading-tight text-center mt-1" style={{ color: data.colors.primary }}>
          {data.title}
        </h2>
        <div className="flex items-center gap-2">
          <div className="h-px w-6" style={{ backgroundColor: data.colors.accent, opacity: 0.6 }} />
          <p className="text-[12px] font-medium" style={{ color: data.colors.secondary }}>{data.subtitle}</p>
          <div className="h-px w-6" style={{ backgroundColor: data.colors.accent, opacity: 0.6 }} />
        </div>

        <div className="w-12 h-px my-1" style={{ backgroundColor: data.colors.accent, opacity: 0.4 }} />

        <p className="text-[9px] text-center leading-relaxed" style={{ color: data.colors.secondary }}>
          {data.description?.split('\n')[0]}
        </p>

        {/* Date + Location info row */}
        {(data.phone || data.website) && (
          <div className="flex items-start gap-4 mt-1">
            {data.phone && (
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full border flex items-center justify-center mb-0.5" style={{ borderColor: data.colors.accent }}>
                  <svg width="12" height="12" viewBox="0 0 12 12"><rect x="1" y="1" width="10" height="9" rx="1" fill="none" stroke={data.colors.accent} strokeWidth="1"/><line x1="1" y1="3" x2="11" y2="3" stroke={data.colors.accent} strokeWidth="0.8"/><circle cx="4" cy="6.5" r="0.7" fill={data.colors.accent}/><circle cx="6" cy="6.5" r="0.7" fill={data.colors.accent}/><circle cx="8" cy="6.5" r="0.7" fill={data.colors.accent}/></svg>
                </div>
                <p className="text-[8px] text-center" style={{ color: data.colors.secondary }}>{data.phone}</p>
              </div>
            )}
            {data.website && (
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full border flex items-center justify-center mb-0.5" style={{ borderColor: data.colors.accent }}>
                  <svg width="12" height="12" viewBox="0 0 12 12"><circle cx="6" cy="6" r="5" fill="none" stroke={data.colors.accent} strokeWidth="1"/><line x1="1" y1="6" x2="11" y2="6" stroke={data.colors.accent} strokeWidth="0.7"/><path d="M4,1.5 Q5,6 4,10.5" stroke={data.colors.accent} strokeWidth="0.7" fill="none"/><path d="M8,1.5 Q7,6 8,10.5" stroke={data.colors.accent} strokeWidth="0.7" fill="none"/></svg>
                </div>
                <p className="text-[8px] text-center" style={{ color: data.colors.secondary }}>{data.website}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
