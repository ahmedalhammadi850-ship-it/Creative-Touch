import type { TemplateData } from '../../types/template';

export default function Template26({ data }: { data: TemplateData }) {
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[280px] h-[400px] flex flex-col items-center"
      style={{ backgroundColor: '#faf8f5', fontFamily: 'serif' }}
    >
      {/* Subtle watercolor background blobs */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 280 400">
        <ellipse cx="20" cy="80" rx="55" ry="40" fill={data.colors.accent} opacity="0.08"/>
        <ellipse cx="260" cy="100" rx="50" ry="35" fill={data.colors.primary} opacity="0.06"/>
        <ellipse cx="140" cy="380" rx="90" ry="35" fill={data.colors.accent} opacity="0.08"/>
        <ellipse cx="30" cy="330" rx="40" ry="30" fill={data.colors.primary} opacity="0.05"/>
        <ellipse cx="260" cy="320" rx="45" ry="32" fill={data.colors.accent} opacity="0.07"/>
      </svg>

      {/* Top leaf sprigs */}
      <svg className="absolute top-0 left-0" width="80" height="90" viewBox="0 0 80 90">
        <path d="M5,85 Q25,50 15,10" stroke={data.colors.primary} strokeWidth="1.2" fill="none" opacity="0.4"/>
        <ellipse cx="18" cy="35" rx="12" ry="6" fill={data.colors.primary} opacity="0.25" transform="rotate(-30 18 35)"/>
        <ellipse cx="10" cy="55" rx="11" ry="5" fill={data.colors.accent} opacity="0.3" transform="rotate(-50 10 55)"/>
        <ellipse cx="22" cy="20" rx="10" ry="5" fill={data.colors.primary} opacity="0.2" transform="rotate(-10 22 20)"/>
      </svg>
      <svg className="absolute top-0 right-0" width="80" height="90" viewBox="0 0 80 90">
        <path d="M75,85 Q55,50 65,10" stroke={data.colors.primary} strokeWidth="1.2" fill="none" opacity="0.4"/>
        <ellipse cx="62" cy="35" rx="12" ry="6" fill={data.colors.primary} opacity="0.25" transform="rotate(30 62 35)"/>
        <ellipse cx="70" cy="55" rx="11" ry="5" fill={data.colors.accent} opacity="0.3" transform="rotate(50 70 55)"/>
        <ellipse cx="58" cy="20" rx="10" ry="5" fill={data.colors.primary} opacity="0.2" transform="rotate(10 58 20)"/>
      </svg>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 py-8 gap-3">
        {/* Small header */}
        <div className="text-center">
          <p className="text-[9px] tracking-[0.3em] uppercase" style={{ color: data.colors.secondary }}>دعوة زفاف</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="h-px flex-1" style={{ backgroundColor: data.colors.accent, opacity: 0.5 }} />
            <span style={{ color: data.colors.accent, fontSize: 12 }}>✿</span>
            <div className="h-px flex-1" style={{ backgroundColor: data.colors.accent, opacity: 0.5 }} />
          </div>
        </div>

        {/* Large names — big Arabic calligraphy style */}
        <div className="text-center">
          <h2
            className="font-bold leading-none"
            style={{ color: data.colors.primary, fontSize: 42, letterSpacing: '-0.02em' }}
          >
            {data.title}
          </h2>
          <div className="flex items-center justify-center gap-3 my-2">
            <div className="h-px w-8" style={{ backgroundColor: data.colors.accent, opacity: 0.6 }} />
            <span className="text-[16px]" style={{ color: data.colors.accent }}>و</span>
            <div className="h-px w-8" style={{ backgroundColor: data.colors.accent, opacity: 0.6 }} />
          </div>
          <p className="font-bold" style={{ color: data.colors.secondary, fontSize: 36, letterSpacing: '-0.02em' }}>{data.subtitle}</p>
        </div>

        <div className="w-16 h-px" style={{ backgroundColor: data.colors.accent, opacity: 0.5 }} />

        <p className="text-[10px] text-center leading-relaxed whitespace-pre-line" style={{ color: data.colors.secondary }}>
          {data.description}
        </p>

        {data.phone && (
          <p className="text-[9px]" dir="ltr" style={{ color: data.colors.secondary }}>{data.phone}</p>
        )}

        <p className="text-[9px] tracking-widest" style={{ color: data.colors.accent }}>✦ بارك الله لهما ✦</p>
      </div>

      {/* Bottom leaf sprigs */}
      <svg className="absolute bottom-0 left-0" width="80" height="80" viewBox="0 0 80 80">
        <path d="M5,10 Q30,40 15,75" stroke={data.colors.primary} strokeWidth="1.2" fill="none" opacity="0.4"/>
        <ellipse cx="18" cy="50" rx="12" ry="6" fill={data.colors.primary} opacity="0.25" transform="rotate(30 18 50)"/>
        <ellipse cx="10" cy="30" rx="10" ry="5" fill={data.colors.accent} opacity="0.3" transform="rotate(50 10 30)"/>
      </svg>
      <svg className="absolute bottom-0 right-0" width="80" height="80" viewBox="0 0 80 80">
        <path d="M75,10 Q50,40 65,75" stroke={data.colors.primary} strokeWidth="1.2" fill="none" opacity="0.4"/>
        <ellipse cx="62" cy="50" rx="12" ry="6" fill={data.colors.primary} opacity="0.25" transform="rotate(-30 62 50)"/>
        <ellipse cx="70" cy="30" rx="10" ry="5" fill={data.colors.accent} opacity="0.3" transform="rotate(-50 70 30)"/>
      </svg>
    </div>
  );
}
