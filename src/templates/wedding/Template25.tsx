import type { TemplateData } from '../../types/template';

export default function Template25({ data }: { data: TemplateData }) {
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[280px] h-[400px] flex flex-col items-center"
      style={{ backgroundColor: data.colors.bg, fontFamily: 'serif' }}
    >
      {/* Outer gold border */}
      <div className="absolute inset-2" style={{ border: `1.5px solid ${data.colors.accent}`, opacity: 0.7 }} />
      <div className="absolute inset-3.5" style={{ border: `0.5px solid ${data.colors.accent}`, opacity: 0.4 }} />

      {/* Top Islamic arch ornament */}
      <svg className="absolute top-5 left-0 w-full" viewBox="0 0 280 120" style={{ height: 120 }}>
        {/* Arch shape */}
        <path d="M60,115 L60,50 Q60,10 140,10 Q220,10 220,50 L220,115 Z" fill="none" stroke={data.colors.accent} strokeWidth="1.5" opacity="0.8"/>
        {/* Inner arch */}
        <path d="M75,115 L75,55 Q75,25 140,25 Q205,25 205,55 L205,115 Z" fill="none" stroke={data.colors.accent} strokeWidth="0.8" opacity="0.5"/>
        {/* Top ornament of arch */}
        <circle cx="140" cy="10" r="5" fill={data.colors.accent} opacity="0.9"/>
        {/* Corner floral motifs */}
        {[70, 210].map((cx, i) => (
          <g key={i}>
            <circle cx={cx} cy="50" r="6" fill="none" stroke={data.colors.accent} strokeWidth="0.8" opacity="0.6"/>
            <circle cx={cx} cy="50" r="2" fill={data.colors.accent} opacity="0.8"/>
          </g>
        ))}
        {/* Geometric pattern dots along arch */}
        {Array.from({ length: 9 }).map((_, i) => {
          const angle = (i / 8) * Math.PI;
          const r = 65;
          const cx = 140 + r * Math.cos(Math.PI - angle);
          const cy = 60 - r * Math.abs(Math.sin(angle));
          return <circle key={i} cx={cx} cy={cy} r="1.5" fill={data.colors.accent} opacity="0.7"/>;
        })}
        {/* Bismillah area */}
        <text x="140" y="72" textAnchor="middle" fontSize="9" fill={data.colors.accent} opacity="0.9" fontFamily="serif">
          بسم الله الرحمن الرحيم
        </text>
      </svg>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-8 mt-20">
        {/* Names */}
        <h2 className="text-[32px] font-bold text-center leading-tight" style={{ color: data.colors.accent }}>{data.title}</h2>
        <div className="flex items-center gap-3 mt-1">
          <div className="h-px w-10" style={{ backgroundColor: data.colors.accent, opacity: 0.6 }} />
          <span className="text-[12px]" style={{ color: data.colors.accent }}>❧</span>
          <div className="h-px w-10" style={{ backgroundColor: data.colors.accent, opacity: 0.6 }} />
        </div>
        <p className="text-[16px] mt-1 font-medium" style={{ color: data.colors.accent }}>{data.subtitle}</p>

        <div className="w-24 h-px my-3" style={{ backgroundColor: data.colors.accent, opacity: 0.5 }} />

        <p className="text-[10px] text-center leading-relaxed whitespace-pre-line" style={{ color: `${data.colors.accent}cc` }}>
          {data.description}
        </p>

        {data.phone && (
          <div className="mt-3 px-3 py-1 border" style={{ borderColor: `${data.colors.accent}50` }}>
            <p className="text-[9px]" dir="ltr" style={{ color: data.colors.accent }}>{data.phone}</p>
          </div>
        )}

        <p className="text-[9px] tracking-widest mt-4" style={{ color: data.colors.accent }}>✦ بارك الله لهما ✦</p>
      </div>

      {/* Bottom ornament */}
      <svg className="absolute bottom-5 left-0 w-full" viewBox="0 0 280 50" style={{ height: 50 }}>
        <path d="M40,25 L240,25" stroke={data.colors.accent} strokeWidth="0.8" opacity="0.5"/>
        <path d="M60,15 Q140,5 220,15" stroke={data.colors.accent} strokeWidth="0.8" fill="none" opacity="0.4"/>
        <path d="M60,35 Q140,45 220,35" stroke={data.colors.accent} strokeWidth="0.8" fill="none" opacity="0.4"/>
        <circle cx="140" cy="25" r="4" fill={data.colors.accent} opacity="0.6"/>
        <circle cx="110" cy="25" r="2" fill={data.colors.accent} opacity="0.4"/>
        <circle cx="170" cy="25" r="2" fill={data.colors.accent} opacity="0.4"/>
        <circle cx="85" cy="25" r="1.5" fill={data.colors.accent} opacity="0.3"/>
        <circle cx="195" cy="25" r="1.5" fill={data.colors.accent} opacity="0.3"/>
      </svg>

      {/* Corner geometric ornaments */}
      {[
        { x: 8, y: 8, rx: false, ry: false },
        { x: 272, y: 8, rx: true, ry: false },
        { x: 8, y: 392, rx: false, ry: true },
        { x: 272, y: 392, rx: true, ry: true },
      ].map((c, i) => (
        <svg key={i} className="absolute" style={{ left: c.rx ? 'auto' : c.x, right: c.rx ? 280 - c.x : 'auto', top: c.ry ? 'auto' : c.y, bottom: c.ry ? 400 - c.y : 'auto' }} width="20" height="20" viewBox="0 0 20 20">
          <rect x="2" y="2" width="16" height="16" fill="none" stroke={data.colors.accent} strokeWidth="0.8" opacity="0.5"/>
          <circle cx="10" cy="10" r="2" fill={data.colors.accent} opacity="0.6"/>
        </svg>
      ))}
    </div>
  );
}
