import type { TemplateData } from '../../types/template';

export default function Template27({ data }: { data: TemplateData }) {
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[280px] h-[400px] flex flex-col items-center"
      style={{ backgroundColor: '#fff9f9', fontFamily: 'serif' }}
    >
      {/* Watercolor floral top corners */}
      <svg className="absolute top-0 left-0" width="100" height="110" viewBox="0 0 100 110">
        {/* Stems */}
        <path d="M10,100 Q30,65 20,20" stroke="#b8c8a0" strokeWidth="1.3" fill="none"/>
        <path d="M25,108 Q40,70 35,30" stroke="#c8b8b0" strokeWidth="1" fill="none"/>
        {/* Blossoms */}
        <circle cx="20" cy="20" r="10" fill={data.colors.primary} opacity="0.25"/>
        <circle cx="20" cy="20" r="5" fill={data.colors.primary} opacity="0.35"/>
        <circle cx="35" cy="30" r="8" fill={data.colors.accent} opacity="0.3"/>
        <circle cx="12" cy="40" r="7" fill={data.colors.primary} opacity="0.2"/>
        {/* Leaves */}
        <ellipse cx="30" cy="50" rx="14" ry="6" fill="#b8d4a0" opacity="0.4" transform="rotate(40 30 50)"/>
        <ellipse cx="8" cy="65" rx="12" ry="5" fill="#a8c890" opacity="0.35" transform="rotate(-30 8 65)"/>
        <ellipse cx="40" cy="75" rx="10" ry="4" fill="#c0d8a8" opacity="0.3" transform="rotate(55 40 75)"/>
        {/* Small flower dots */}
        <circle cx="45" cy="40" r="4" fill={data.colors.accent} opacity="0.4"/>
        <circle cx="5" cy="80" r="4" fill={data.colors.primary} opacity="0.25"/>
      </svg>

      <svg className="absolute top-0 right-0" width="100" height="110" viewBox="0 0 100 110">
        <path d="M90,100 Q70,65 80,20" stroke="#b8c8a0" strokeWidth="1.3" fill="none"/>
        <path d="M75,108 Q60,70 65,30" stroke="#c8b8b0" strokeWidth="1" fill="none"/>
        <circle cx="80" cy="20" r="10" fill={data.colors.primary} opacity="0.25"/>
        <circle cx="80" cy="20" r="5" fill={data.colors.primary} opacity="0.35"/>
        <circle cx="65" cy="30" r="8" fill={data.colors.accent} opacity="0.3"/>
        <circle cx="88" cy="40" r="7" fill={data.colors.primary} opacity="0.2"/>
        <ellipse cx="70" cy="50" rx="14" ry="6" fill="#b8d4a0" opacity="0.4" transform="rotate(-40 70 50)"/>
        <ellipse cx="92" cy="65" rx="12" ry="5" fill="#a8c890" opacity="0.35" transform="rotate(30 92 65)"/>
        <ellipse cx="60" cy="75" rx="10" ry="4" fill="#c0d8a8" opacity="0.3" transform="rotate(-55 60 75)"/>
        <circle cx="55" cy="40" r="4" fill={data.colors.accent} opacity="0.4"/>
        <circle cx="95" cy="80" r="4" fill={data.colors.primary} opacity="0.25"/>
      </svg>

      {/* Bottom floral corners */}
      <svg className="absolute bottom-0 left-0" width="90" height="100" viewBox="0 0 90 100">
        <path d="M10,5 Q25,40 15,90" stroke="#b8c8a0" strokeWidth="1.2" fill="none"/>
        <circle cx="15" cy="80" r="9" fill={data.colors.primary} opacity="0.2"/>
        <circle cx="8" cy="60" r="7" fill={data.colors.accent} opacity="0.25"/>
        <ellipse cx="28" cy="55" rx="12" ry="5" fill="#b8d4a0" opacity="0.35" transform="rotate(40 28 55)"/>
        <ellipse cx="5" cy="40" rx="10" ry="4" fill="#a8c890" opacity="0.3" transform="rotate(-25 5 40)"/>
      </svg>
      <svg className="absolute bottom-0 right-0" width="90" height="100" viewBox="0 0 90 100">
        <path d="M80,5 Q65,40 75,90" stroke="#b8c8a0" strokeWidth="1.2" fill="none"/>
        <circle cx="75" cy="80" r="9" fill={data.colors.primary} opacity="0.2"/>
        <circle cx="82" cy="60" r="7" fill={data.colors.accent} opacity="0.25"/>
        <ellipse cx="62" cy="55" rx="12" ry="5" fill="#b8d4a0" opacity="0.35" transform="rotate(-40 62 55)"/>
        <ellipse cx="85" cy="40" rx="10" ry="4" fill="#a8c890" opacity="0.3" transform="rotate(25 85 40)"/>
      </svg>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-8 gap-2 mt-4">
        <p className="text-[9px] tracking-[0.25em]" style={{ color: data.colors.secondary }}>يسعدنا دعوتكم</p>
        <p className="text-[10px] font-semibold" style={{ color: data.colors.secondary }}>لحضور حفل زفاف</p>

        <div className="flex items-center gap-2 w-full">
          <div className="flex-1 h-px" style={{ backgroundColor: data.colors.accent, opacity: 0.5 }} />
          <span style={{ color: data.colors.accent, fontSize: 12 }}>✿</span>
          <div className="flex-1 h-px" style={{ backgroundColor: data.colors.accent, opacity: 0.5 }} />
        </div>

        {/* Names with ring icon */}
        <div className="flex items-center justify-center gap-3 mt-1">
          <h2 className="text-[28px] font-bold" style={{ color: data.colors.primary }}>{data.title}</h2>
          <div className="flex flex-col items-center">
            {/* Interlocked rings SVG */}
            <svg width="28" height="22" viewBox="0 0 28 22">
              <circle cx="10" cy="11" r="8" fill="none" stroke={data.colors.accent} strokeWidth="2"/>
              <circle cx="18" cy="11" r="8" fill="none" stroke={data.colors.primary} strokeWidth="2"/>
            </svg>
          </div>
          <p className="text-[28px] font-bold" style={{ color: data.colors.secondary }}>{data.subtitle}</p>
        </div>

        <div className="w-14 h-px" style={{ backgroundColor: data.colors.accent, opacity: 0.5 }} />

        <p className="text-[10px] text-center leading-relaxed whitespace-pre-line" style={{ color: data.colors.secondary }}>
          {data.description}
        </p>

        {/* Date / Time row */}
        {data.phone && (
          <div className="flex items-center gap-3 mt-1 border-t pt-2 w-full justify-center" style={{ borderColor: `${data.colors.accent}40` }}>
            <div className="text-center">
              <p className="text-[7px] uppercase tracking-wider" style={{ color: data.colors.accent }}>التاريخ</p>
              <p className="text-[11px] font-bold" style={{ color: data.colors.primary }}>{data.phone}</p>
            </div>
            {data.website && (
              <>
                <div className="w-px h-8" style={{ backgroundColor: data.colors.accent, opacity: 0.3 }} />
                <div className="text-center">
                  <p className="text-[7px] uppercase tracking-wider" style={{ color: data.colors.accent }}>المكان</p>
                  <p className="text-[10px] font-bold" style={{ color: data.colors.primary }}>{data.website}</p>
                </div>
              </>
            )}
          </div>
        )}

        <p className="text-[9px] tracking-widest mt-1" style={{ color: data.colors.accent }}>✦ ألف مبروك ✦</p>
      </div>
    </div>
  );
}
