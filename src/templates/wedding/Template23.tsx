import type { TemplateData } from '../../types/template';

export default function Template23({ data }: { data: TemplateData }) {
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[280px] h-[400px] flex flex-col items-center"
      style={{ backgroundColor: '#f8f4ef', fontFamily: 'serif' }}
    >
      {/* Top floral cluster */}
      <svg className="absolute top-0 left-0 w-full" viewBox="0 0 280 130" style={{ height: 130 }}>
        {/* Rose petals top-left */}
        <ellipse cx="30" cy="20" rx="22" ry="14" fill="#fff" opacity="0.95" transform="rotate(-30 30 20)"/>
        <ellipse cx="55" cy="10" rx="20" ry="13" fill="#f9f0e8" opacity="0.95" transform="rotate(15 55 10)"/>
        <ellipse cx="10" cy="45" rx="18" ry="12" fill="#fff" opacity="0.9" transform="rotate(-60 10 45)"/>
        <ellipse cx="80" cy="18" rx="16" ry="10" fill="#f5ece0" opacity="0.9" transform="rotate(40 80 18)"/>
        <ellipse cx="38" cy="50" rx="14" ry="9" fill="#fff" opacity="0.85" transform="rotate(-10 38 50)"/>
        {/* Rose center */}
        <circle cx="40" cy="28" r="10" fill="#f0ddd0" opacity="0.9"/>
        <circle cx="40" cy="28" r="6" fill="#e8cdbf" opacity="0.9"/>
        <circle cx="40" cy="28" r="3" fill="#d4b0a0" opacity="0.95"/>
        {/* Leaves */}
        <ellipse cx="70" cy="55" rx="18" ry="7" fill="#c8d8b0" opacity="0.7" transform="rotate(35 70 55)"/>
        <ellipse cx="15" cy="65" rx="16" ry="6" fill="#b8cc98" opacity="0.65" transform="rotate(-40 15 65)"/>
        {/* Top-right flowers */}
        <ellipse cx="240" cy="15" rx="20" ry="13" fill="#fff" opacity="0.95" transform="rotate(25 240 15)"/>
        <ellipse cx="265" cy="30" rx="18" ry="12" fill="#f9f0e8" opacity="0.9" transform="rotate(-20 265 30)"/>
        <ellipse cx="250" cy="45" rx="15" ry="9" fill="#fff" opacity="0.85" transform="rotate(50 250 45)"/>
        <circle cx="252" cy="22" r="9" fill="#f0ddd0" opacity="0.9"/>
        <circle cx="252" cy="22" r="5" fill="#e0c8b8" opacity="0.95"/>
        <ellipse cx="210" cy="50" rx="17" ry="6" fill="#c8d8b0" opacity="0.65" transform="rotate(-35 210 50)"/>
        <ellipse cx="270" cy="60" rx="14" ry="5" fill="#b8cc98" opacity="0.6" transform="rotate(30 270 60)"/>
        {/* Gold line decorative */}
        <line x1="85" y1="72" x2="195" y2="72" stroke={data.colors.accent} strokeWidth="0.8" opacity="0.5"/>
      </svg>

      {/* Bottom floral cluster */}
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 280 120" style={{ height: 120 }}>
        <ellipse cx="30" cy="100" rx="22" ry="14" fill="#fff" opacity="0.9" transform="rotate(30 30 100)"/>
        <ellipse cx="60" cy="115" rx="18" ry="12" fill="#f9f0e8" opacity="0.9" transform="rotate(-15 60 115)"/>
        <ellipse cx="12" cy="80" rx="16" ry="10" fill="#fff" opacity="0.85" transform="rotate(55 12 80)"/>
        <circle cx="38" cy="98" r="9" fill="#f0ddd0" opacity="0.9"/>
        <circle cx="38" cy="98" r="5" fill="#e0c8b8" opacity="0.95"/>
        <ellipse cx="20" cy="60" rx="16" ry="6" fill="#c8d8b0" opacity="0.65" transform="rotate(40 20 60)"/>
        <ellipse cx="75" cy="108" rx="14" ry="5" fill="#b8cc98" opacity="0.6" transform="rotate(-30 75 108)"/>
        {/* Right bottom */}
        <ellipse cx="248" cy="105" rx="22" ry="14" fill="#fff" opacity="0.9" transform="rotate(-25 248 105)"/>
        <ellipse cx="270" cy="90" rx="18" ry="12" fill="#f9f0e8" opacity="0.9" transform="rotate(20 270 90)"/>
        <ellipse cx="225" cy="118" rx="16" ry="10" fill="#fff" opacity="0.85" transform="rotate(45 225 118)"/>
        <circle cx="250" cy="95" r="9" fill="#f0ddd0" opacity="0.9"/>
        <circle cx="250" cy="95" r="5" fill="#e0c8b8" opacity="0.95"/>
        <ellipse cx="210" cy="75" rx="16" ry="6" fill="#c8d8b0" opacity="0.65" transform="rotate(-40 210 75)"/>
        <line x1="85" y1="48" x2="195" y2="48" stroke={data.colors.accent} strokeWidth="0.8" opacity="0.5"/>
      </svg>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-8 py-6 gap-2 mt-6">
        {/* Header */}
        <p className="text-[10px] tracking-[0.3em]" style={{ color: data.colors.secondary }}>✦ دعوة زفاف ✦</p>
        <div className="w-20 h-px mt-1 mb-2" style={{ backgroundColor: data.colors.accent }} />

        {/* Main content */}
        <div className="text-center space-y-1">
          <p className="text-[11px]" style={{ color: data.colors.secondary }}>يسعدنا دعوتكم لحضور</p>
          <p className="text-[11px] font-bold" style={{ color: data.colors.secondary }}>حفل زفاف</p>
        </div>

        <div className="text-center mt-2">
          <h2 className="text-[28px] font-bold leading-tight" style={{ color: data.colors.primary }}>{data.title}</h2>
          <p className="text-[16px] mt-0.5" style={{ color: data.colors.secondary }}>{data.subtitle}</p>
        </div>

        <div className="w-16 h-px my-2" style={{ backgroundColor: data.colors.accent }} />

        <p className="text-[10px] text-center leading-relaxed whitespace-pre-line px-4" style={{ color: data.colors.secondary }}>
          {data.description}
        </p>

        {/* QR placeholder — only shows if email is set */}
        {data.email && (
          <div className="mt-2 border-2 rounded p-1" style={{ borderColor: data.colors.accent }}>
            <div className="grid grid-cols-3 gap-px" style={{ width: 36, height: 36 }}>
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-sm"
                  style={{ backgroundColor: [0,2,6,8,4].includes(i) ? data.colors.primary : 'transparent', width: 10, height: 10 }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="mt-2 text-[9px] tracking-widest" style={{ color: data.colors.accent }}>✦ ألف مبروك ✦</div>

        {data.phone && (
          <p className="text-[9px] mt-1" dir="ltr" style={{ color: data.colors.secondary }}>{data.phone}</p>
        )}
      </div>
    </div>
  );
}
