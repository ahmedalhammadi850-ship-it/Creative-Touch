import type { TemplateData } from '../../types/template';

export default function Template29({ data }: { data: TemplateData }) {
  return (
    <div
      id="template-preview"
      className="relative w-[280px] h-[400px] overflow-hidden flex flex-col items-center justify-center"
      style={{ backgroundColor: '#1a0a0e', fontFamily: 'serif' }}
    >
      {/* ---- Pink roses top-left cluster ---- */}
      <svg className="absolute top-0 left-0 pointer-events-none" width="160" height="160" viewBox="0 0 160 160">
        {/* Stems / branches */}
        <path d="M10,150 Q40,100 30,40" stroke="#6a8050" strokeWidth="1.5" fill="none"/>
        <path d="M30,155 Q60,110 55,60" stroke="#5a7040" strokeWidth="1.2" fill="none"/>
        <path d="M0,120 Q25,90 22,50" stroke="#6a8050" strokeWidth="1" fill="none"/>
        {/* Leaves */}
        <ellipse cx="35" cy="80" rx="18" ry="7" fill="#4a7030" opacity="0.7" transform="rotate(-40 35 80)"/>
        <ellipse cx="20" cy="100" rx="15" ry="6" fill="#5a8040" opacity="0.6" transform="rotate(-60 20 100)"/>
        <ellipse cx="55" cy="100" rx="14" ry="6" fill="#4a7030" opacity="0.6" transform="rotate(30 55 100)"/>
        <ellipse cx="15" cy="60" rx="13" ry="5" fill="#5a8040" opacity="0.55" transform="rotate(-25 15 60)"/>
        {/* Big rose center */}
        <circle cx="42" cy="38" r="28" fill="#c03060" opacity="0.25"/>
        <circle cx="42" cy="38" r="22" fill="#d04070" opacity="0.35"/>
        <ellipse cx="30" cy="28" rx="18" ry="15" fill="#e05080" opacity="0.8" transform="rotate(-20 30 28)"/>
        <ellipse cx="52" cy="32" rx="16" ry="13" fill="#d8407a" opacity="0.75" transform="rotate(15 52 32)"/>
        <ellipse cx="40" cy="48" rx="17" ry="12" fill="#e06090" opacity="0.7" transform="rotate(5 40 48)"/>
        <ellipse cx="25" cy="45" rx="14" ry="10" fill="#c83070" opacity="0.65" transform="rotate(-35 25 45)"/>
        <ellipse cx="58" cy="46" rx="13" ry="9" fill="#d04080" opacity="0.65" transform="rotate(40 58 46)"/>
        <circle cx="42" cy="36" r="10" fill="#f090b0" opacity="0.5"/>
        <circle cx="42" cy="36" r="5" fill="#ffc0d0" opacity="0.7"/>
        {/* Medium rose right */}
        <ellipse cx="90" cy="25" rx="15" ry="12" fill="#e05080" opacity="0.75" transform="rotate(10 90 25)"/>
        <ellipse cx="102" cy="30" rx="13" ry="10" fill="#d84078" opacity="0.7" transform="rotate(-15 102 30)"/>
        <ellipse cx="95" cy="38" rx="14" ry="9" fill="#e06090" opacity="0.65" transform="rotate(25 95 38)"/>
        <circle cx="95" cy="28" r="7" fill="#ffa0c0" opacity="0.6"/>
        {/* Small rose left */}
        <ellipse cx="10" cy="45" rx="12" ry="9" fill="#e05888" opacity="0.7" transform="rotate(-30 10 45)"/>
        <ellipse cx="18" cy="52" rx="10" ry="8" fill="#d03870" opacity="0.65" transform="rotate(10 18 52)"/>
        <circle cx="13" cy="45" r="5" fill="#ffb0c8" opacity="0.6"/>
        {/* White small flowers */}
        <circle cx="70" cy="12" r="7" fill="#fff" opacity="0.85"/>
        <circle cx="68" cy="10" r="3" fill="#ffe0e8" opacity="0.9"/>
        <circle cx="115" cy="18" r="5" fill="#fff" opacity="0.8"/>
        <circle cx="125" cy="30" r="4" fill="#fff" opacity="0.75"/>
        <circle cx="80" cy="55" r="4" fill="#fff" opacity="0.7"/>
      </svg>

      {/* ---- Pink roses bottom-right cluster ---- */}
      <svg className="absolute bottom-0 right-0 pointer-events-none" width="150" height="150" viewBox="0 0 150 150">
        <path d="M150,10 Q110,60 120,130" stroke="#6a8050" strokeWidth="1.5" fill="none"/>
        <ellipse cx="118" cy="65" rx="17" ry="7" fill="#4a7030" opacity="0.65" transform="rotate(35 118 65)"/>
        <ellipse cx="130" cy="90" rx="15" ry="6" fill="#5a8040" opacity="0.6" transform="rotate(55 130 90)"/>
        {/* Rose */}
        <ellipse cx="95" cy="100" rx="18" ry="14" fill="#e05080" opacity="0.8" transform="rotate(-15 95 100)"/>
        <ellipse cx="112" cy="108" rx="15" ry="12" fill="#d84078" opacity="0.75" transform="rotate(20 112 108)"/>
        <ellipse cx="100" cy="118" rx="16" ry="11" fill="#e06090" opacity="0.7" transform="rotate(5 100 118)"/>
        <circle cx="105" cy="107" r="9" fill="#ffa0c0" opacity="0.55"/>
        <circle cx="105" cy="107" r="4" fill="#ffd0e0" opacity="0.8"/>
        {/* Second rose */}
        <ellipse cx="128" cy="80" rx="14" ry="11" fill="#c83070" opacity="0.75" transform="rotate(-10 128 80)"/>
        <ellipse cx="138" cy="90" rx="12" ry="9" fill="#d84080" opacity="0.7" transform="rotate(25 138 90)"/>
        <circle cx="133" cy="83" r="6" fill="#ffb0cc" opacity="0.6"/>
        {/* White flowers */}
        <circle cx="78" cy="115" r="6" fill="#fff" opacity="0.85"/>
        <circle cx="77" cy="114" r="2.5" fill="#ffe0e8" opacity="0.9"/>
        <circle cx="140" cy="60" r="5" fill="#fff" opacity="0.8"/>
        <circle cx="70" cy="135" r="4" fill="#fff" opacity="0.75"/>
      </svg>

      {/* ---- Small white flowers top-right ---- */}
      <svg className="absolute top-0 right-0 pointer-events-none" width="90" height="90" viewBox="0 0 90 90">
        <circle cx="70" cy="15" r="8" fill="#fff" opacity="0.8"/>
        <circle cx="69" cy="14" r="4" fill="#ffe0e8" opacity="0.85"/>
        <circle cx="50" cy="8" r="5" fill="#fff" opacity="0.7"/>
        <circle cx="80" cy="35" r="6" fill="#fff" opacity="0.75"/>
        <path d="M85,5 Q70,30 75,60" stroke="#6a8050" strokeWidth="1" fill="none"/>
        <ellipse cx="75" cy="38" rx="10" ry="4" fill="#4a7030" opacity="0.5" transform="rotate(40 75 38)"/>
      </svg>

      {/* ---- Card itself: dark navy with gold geometric border ---- */}
      <div
        className="relative z-10 flex flex-col items-center justify-center"
        style={{
          width: 192,
          height: 256,
          backgroundColor: data.colors.bg,
          border: `2px solid ${data.colors.accent}`,
          boxShadow: `0 0 0 6px rgba(0,0,0,0.5), 0 0 0 8px ${data.colors.accent}55`,
        }}
      >
        {/* Gold geometric corner SVG inside card */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 192 256">
          {/* Corner ornaments */}
          {[[8,8,0],[184,8,90],[8,248,270],[184,248,180]].map(([cx,cy,rot],i) => (
            <g key={i} transform={`translate(${cx},${cy}) rotate(${rot})`}>
              <line x1="0" y1="0" x2="18" y2="0" stroke={data.colors.accent} strokeWidth="1" opacity="0.8"/>
              <line x1="0" y1="0" x2="0" y2="18" stroke={data.colors.accent} strokeWidth="1" opacity="0.8"/>
              <circle cx="0" cy="0" r="2" fill={data.colors.accent} opacity="0.9"/>
            </g>
          ))}
          {/* Top/bottom center ornament */}
          <g transform="translate(96,12)">
            <line x1="-30" y1="0" x2="-8" y2="0" stroke={data.colors.accent} strokeWidth="0.8" opacity="0.7"/>
            <line x1="8" y1="0" x2="30" y2="0" stroke={data.colors.accent} strokeWidth="0.8" opacity="0.7"/>
            <circle cx="0" cy="0" r="3" fill={data.colors.accent} opacity="0.8"/>
          </g>
          <g transform="translate(96,244)">
            <line x1="-30" y1="0" x2="-8" y2="0" stroke={data.colors.accent} strokeWidth="0.8" opacity="0.7"/>
            <line x1="8" y1="0" x2="30" y2="0" stroke={data.colors.accent} strokeWidth="0.8" opacity="0.7"/>
            <circle cx="0" cy="0" r="3" fill={data.colors.accent} opacity="0.8"/>
          </g>
          {/* Geometric lattice sides */}
          {[40,70,100,130,160,190,220].map((y,i) => (
            <g key={i}>
              <rect x="8" y={y} width="6" height="6" fill="none" stroke={data.colors.accent} strokeWidth="0.6" opacity="0.4" transform={`rotate(45 11 ${y+3})`}/>
              <rect x="178" y={y} width="6" height="6" fill="none" stroke={data.colors.accent} strokeWidth="0.6" opacity="0.4" transform={`rotate(45 181 ${y+3})`}/>
            </g>
          ))}
        </svg>

        {/* Card content */}
        <div className="relative z-10 flex flex-col items-center gap-1 px-5">
          <p className="text-[7px] tracking-[0.3em]" style={{ color: data.colors.accent }}>دعوة زفاف</p>
          <div className="w-12 h-px mt-1" style={{ backgroundColor: data.colors.accent, opacity: 0.6 }} />
          <h2 className="text-[26px] font-bold text-center leading-tight mt-2" style={{ color: data.colors.accent }}>
            {data.title}
          </h2>
          <div className="flex items-center gap-2 my-1">
            <div className="h-px w-8" style={{ backgroundColor: data.colors.accent, opacity: 0.5 }} />
            <span className="text-[12px]" style={{ color: data.colors.accent }}>❧</span>
            <div className="h-px w-8" style={{ backgroundColor: data.colors.accent, opacity: 0.5 }} />
          </div>
          <p className="text-[15px] font-bold" style={{ color: data.colors.accent }}>{data.subtitle}</p>
          <div className="w-12 h-px my-2" style={{ backgroundColor: data.colors.accent, opacity: 0.4 }} />
          <p className="text-[8px] text-center leading-relaxed whitespace-pre-line" style={{ color: `${data.colors.accent}cc` }}>
            {data.description}
          </p>
          {data.phone && (
            <p dir="ltr" className="text-[8px] mt-1" style={{ color: `${data.colors.accent}99` }}>{data.phone}</p>
          )}
        </div>
      </div>
    </div>
  );
}
