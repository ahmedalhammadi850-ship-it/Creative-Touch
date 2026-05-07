import type { TemplateData } from '../../types/template';

export default function Template30({ data }: { data: TemplateData }) {
  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div
      id="template-preview"
      className="relative w-[280px] h-[400px] overflow-hidden flex flex-col items-center"
      style={{ backgroundColor: '#f2ead8', fontFamily: 'serif' }}
    >
      {/* ---- Outer gold border ---- */}
      <div className="absolute inset-2" style={{ border: `1.5px solid ${data.colors.accent}`, opacity: 0.7 }} />
      <div className="absolute inset-[7px]" style={{ border: `0.5px solid ${data.colors.accent}`, opacity: 0.4 }} />

      {/* ---- Theater curtains LEFT ---- */}
      <svg className="absolute top-0 left-0 pointer-events-none" width="90" height="320" viewBox="0 0 90 320">
        {/* Main curtain drape */}
        <path d="M0,0 Q30,30 20,80 Q10,130 35,160 Q50,185 30,220 Q15,250 40,280 L40,320 L0,320 Z"
          fill={data.colors.primary} opacity="0.85"/>
        <path d="M0,0 Q20,25 12,75 Q5,120 25,155 Q38,178 22,215 Q10,245 32,275 L32,320 L0,320 Z"
          fill={data.colors.secondary} opacity="0.5"/>
        {/* Curtain fold highlights */}
        <path d="M15,0 Q35,35 28,85 Q20,135 42,165 Q55,188 38,225" stroke="#fff" strokeWidth="1" fill="none" opacity="0.2"/>
        {/* Gold rope tie-back */}
        <ellipse cx="30" cy="165" rx="14" ry="8" fill={data.colors.accent} opacity="0.7"/>
        <ellipse cx="30" cy="165" rx="8" ry="5" fill={data.colors.accent} opacity="0.9"/>
        <circle cx="30" cy="165" r="4" fill="#f0d060" opacity="0.95"/>
        {/* Tassel */}
        <line x1="30" y1="172" x2="28" y2="192" stroke={data.colors.accent} strokeWidth="1.5" opacity="0.8"/>
        <line x1="30" y1="172" x2="30" y2="194" stroke={data.colors.accent} strokeWidth="1.5" opacity="0.8"/>
        <line x1="30" y1="172" x2="32" y2="192" stroke={data.colors.accent} strokeWidth="1.5" opacity="0.8"/>
        <ellipse cx="30" cy="195" rx="5" ry="3" fill={data.colors.accent} opacity="0.7"/>
        {/* Top decorative fold scallops */}
        <path d="M0,0 Q10,15 20,0 Q30,15 40,0 Q50,15 60,0 Q70,15 80,0 Q85,15 90,0" stroke={data.colors.accent} strokeWidth="1.5" fill={data.colors.primary} opacity="0.9"/>
      </svg>

      {/* ---- Theater curtains RIGHT ---- */}
      <svg className="absolute top-0 right-0 pointer-events-none" width="90" height="320" viewBox="0 0 90 320">
        <path d="M90,0 Q60,30 70,80 Q80,130 55,160 Q40,185 60,220 Q75,250 50,280 L50,320 L90,320 Z"
          fill={data.colors.primary} opacity="0.85"/>
        <path d="M90,0 Q70,25 78,75 Q85,120 65,155 Q52,178 68,215 Q80,245 58,275 L58,320 L90,320 Z"
          fill={data.colors.secondary} opacity="0.5"/>
        <path d="M75,0 Q55,35 62,85 Q70,135 48,165 Q35,188 52,225" stroke="#fff" strokeWidth="1" fill="none" opacity="0.2"/>
        {/* Gold rope tie-back */}
        <ellipse cx="60" cy="165" rx="14" ry="8" fill={data.colors.accent} opacity="0.7"/>
        <ellipse cx="60" cy="165" rx="8" ry="5" fill={data.colors.accent} opacity="0.9"/>
        <circle cx="60" cy="165" r="4" fill="#f0d060" opacity="0.95"/>
        {/* Tassel */}
        <line x1="60" y1="172" x2="58" y2="192" stroke={data.colors.accent} strokeWidth="1.5" opacity="0.8"/>
        <line x1="60" y1="172" x2="60" y2="194" stroke={data.colors.accent} strokeWidth="1.5" opacity="0.8"/>
        <line x1="60" y1="172" x2="62" y2="192" stroke={data.colors.accent} strokeWidth="1.5" opacity="0.8"/>
        <ellipse cx="60" cy="195" rx="5" ry="3" fill={data.colors.accent} opacity="0.7"/>
        {/* Top scallops */}
        <path d="M0,0 Q10,15 20,0 Q30,15 40,0 Q50,15 60,0 Q70,15 80,0 Q85,15 90,0" stroke={data.colors.accent} strokeWidth="1.5" fill={data.colors.primary} opacity="0.9"/>
      </svg>

      {/* ---- Arch top ornament ---- */}
      <svg className="absolute top-3 left-0 w-full pointer-events-none" viewBox="0 0 280 60" style={{ height: 60 }}>
        <path d="M70,55 Q70,15 140,10 Q210,15 210,55" stroke={data.colors.accent} strokeWidth="1.5" fill="none" opacity="0.7"/>
        <path d="M80,55 Q80,22 140,18 Q200,22 200,55" stroke={data.colors.accent} strokeWidth="0.7" fill="none" opacity="0.4"/>
        <circle cx="140" cy="10" r="4" fill={data.colors.accent} opacity="0.8"/>
        {/* Hanging chandelier tip */}
        <line x1="140" y1="14" x2="140" y2="30" stroke={data.colors.accent} strokeWidth="0.8" opacity="0.6"/>
        <circle cx="140" cy="32" r="3" fill={data.colors.accent} opacity="0.7"/>
      </svg>

      {/* ---- Main text content ---- */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-10 gap-2 mt-10">
        <p className="text-[8px] tracking-[0.25em] text-center" style={{ color: data.colors.secondary }}>يسعدنا دعوتكم لحضور</p>

        <div className="flex items-center gap-2 w-full">
          <div className="flex-1 h-px" style={{ backgroundColor: data.colors.accent, opacity: 0.5 }} />
          <span style={{ color: data.colors.accent, fontSize: 10 + _d }}>✦</span>
          <div className="flex-1 h-px" style={{ backgroundColor: data.colors.accent, opacity: 0.5 }} />
        </div>

        <h2 className="text-[28px] font-bold text-center leading-tight" style={{ color: data.colors.primary }}>{data.title}</h2>
        <p className="text-[14px] text-center" style={{ color: data.colors.secondary }}>{data.subtitle}</p>

        <div className="flex items-center gap-2 w-full">
          <div className="flex-1 h-px" style={{ backgroundColor: data.colors.accent, opacity: 0.4 }} />
          <span style={{ color: data.colors.accent, fontSize: 8 + _d }}>❀</span>
          <div className="flex-1 h-px" style={{ backgroundColor: data.colors.accent, opacity: 0.4 }} />
        </div>

        <p className="text-[10px] text-center leading-relaxed whitespace-pre-line" style={{ color: data.colors.secondary }}>
          {data.description}
        </p>

        {/* Date block */}
        {data.phone && (
          <div className="border py-1.5 px-5 mt-1" style={{ borderColor: data.colors.accent }}>
            <p className="text-[13px] font-bold tracking-wider text-center" dir="ltr" style={{ color: data.colors.primary }}>{data.phone}</p>
          </div>
        )}
        {data.website && (
          <p className="text-[9px] text-center mt-1" style={{ color: data.colors.secondary }}>{data.website}</p>
        )}
      </div>

      {/* ---- Bottom floral arrangement ---- */}
      <svg className="absolute bottom-0 left-0 w-full pointer-events-none" viewBox="0 0 280 90" style={{ height: 90 }}>
        {/* Stems */}
        <path d="M60,90 Q80,60 70,30" stroke="#6a8050" strokeWidth="1.5" fill="none" opacity="0.8"/>
        <path d="M100,90 Q110,55 105,20" stroke="#6a8050" strokeWidth="1.2" fill="none" opacity="0.7"/>
        <path d="M140,90 Q140,60 140,25" stroke="#6a8050" strokeWidth="1.3" fill="none" opacity="0.75"/>
        <path d="M180,90 Q170,55 175,20" stroke="#6a8050" strokeWidth="1.2" fill="none" opacity="0.7"/>
        <path d="M220,90 Q200,60 210,30" stroke="#6a8050" strokeWidth="1.5" fill="none" opacity="0.8"/>
        {/* Leaves */}
        <ellipse cx="65" cy="55" rx="16" ry="6" fill="#5a8040" opacity="0.55" transform="rotate(-40 65 55)"/>
        <ellipse cx="178" cy="55" rx="16" ry="6" fill="#5a8040" opacity="0.55" transform="rotate(40 178 55)"/>
        <ellipse cx="112" cy="45" rx="13" ry="5" fill="#4a7030" opacity="0.5" transform="rotate(-20 112 45)"/>
        <ellipse cx="168" cy="45" rx="13" ry="5" fill="#4a7030" opacity="0.5" transform="rotate(20 168 45)"/>
        {/* Roses */}
        <circle cx="70" cy="30" r="14" fill={data.colors.primary} opacity="0.25"/>
        <ellipse cx="64" cy="25" rx="11" ry="9" fill={data.colors.primary} opacity="0.7"/>
        <ellipse cx="76" cy="28" rx="10" ry="8" fill={data.colors.secondary} opacity="0.6"/>
        <ellipse cx="70" cy="36" rx="11" ry="7" fill={data.colors.primary} opacity="0.65"/>
        <circle cx="70" cy="28" r="5" fill={data.colors.accent} opacity="0.5"/>
        {/* Center flower */}
        <circle cx="140" cy="22" r="13" fill={data.colors.primary} opacity="0.2"/>
        <ellipse cx="133" cy="18" rx="11" ry="8" fill={data.colors.primary} opacity="0.65"/>
        <ellipse cx="147" cy="20" rx="10" ry="8" fill={data.colors.secondary} opacity="0.6"/>
        <ellipse cx="140" cy="28" rx="11" ry="7" fill={data.colors.primary} opacity="0.6"/>
        <circle cx="140" cy="20" r="5" fill={data.colors.accent} opacity="0.5"/>
        {/* Right rose */}
        <circle cx="210" cy="30" r="14" fill={data.colors.primary} opacity="0.25"/>
        <ellipse cx="204" cy="25" rx="11" ry="9" fill={data.colors.primary} opacity="0.7"/>
        <ellipse cx="216" cy="28" rx="10" ry="8" fill={data.colors.secondary} opacity="0.6"/>
        <ellipse cx="210" cy="36" rx="11" ry="7" fill={data.colors.primary} opacity="0.65"/>
        <circle cx="210" cy="28" r="5" fill={data.colors.accent} opacity="0.5"/>
        {/* Small buds */}
        <circle cx="105" cy="18" r="7" fill={data.colors.primary} opacity="0.6"/>
        <circle cx="105" cy="18" r="3" fill={data.colors.accent} opacity="0.5"/>
        <circle cx="175" cy="18" r="7" fill={data.colors.primary} opacity="0.6"/>
        <circle cx="175" cy="18" r="3" fill={data.colors.accent} opacity="0.5"/>
        {/* White small flowers scattered */}
        <circle cx="90" cy="25" r="4" fill="#fff" opacity="0.8"/>
        <circle cx="125" cy="40" r="3" fill="#fff" opacity="0.75"/>
        <circle cx="155" cy="40" r="3" fill="#fff" opacity="0.75"/>
        <circle cx="190" cy="25" r="4" fill="#fff" opacity="0.8"/>
        <circle cx="50" cy="40" r="3" fill="#fff" opacity="0.7"/>
        <circle cx="230" cy="40" r="3" fill="#fff" opacity="0.7"/>
      </svg>
    </div>
  );
}
