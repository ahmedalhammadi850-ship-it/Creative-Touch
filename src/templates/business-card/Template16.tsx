import type { TemplateData } from '../../types/template';

export default function Template16({ data }: { data: TemplateData }) {
  return (
    <div id="template-preview" style={{
      width: '340px', height: '220px',
      background: `linear-gradient(135deg, ${data.colors.bg} 0%, #fff 50%, ${data.colors.bg} 100%)`,
      direction: 'rtl',
      fontFamily: "'Cairo', sans-serif",
      position: 'relative', overflow: 'hidden',
      display: 'flex',
    }}>
      {/* Marble veins */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.08 }}>
        <path d="M0,60 Q80,30 160,80 Q240,130 340,60" stroke={data.colors.primary} strokeWidth="2" fill="none" />
        <path d="M0,110 Q70,90 140,130 Q220,170 340,100" stroke={data.colors.primary} strokeWidth="1.5" fill="none" />
        <path d="M50,0 Q90,60 80,120 Q70,180 110,220" stroke={data.colors.primary} strokeWidth="1" fill="none" />
        <path d="M200,0 Q230,50 220,110 Q210,170 250,220" stroke={data.colors.accent} strokeWidth="1" fill="none" />
      </svg>

      {/* Left colored column */}
      <div style={{
        width: '8px', background: `linear-gradient(to bottom, ${data.colors.primary}, ${data.colors.accent})`, flexShrink: 0,
      }} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '16px 20px 16px 16px', position: 'relative', zIndex: 1 }}>
        <div style={{ color: data.colors.primary, fontSize: '6px', letterSpacing: '0.28em', marginBottom: '7px', opacity: 0.55 }}>BUSINESS CARD</div>
        <div style={{ color: data.colors.secondary, fontSize: '23px', fontWeight: 900, lineHeight: 1.1, marginBottom: '4px', textShadow: `0 1px 6px ${data.colors.primary}22` }}>{data.title}</div>
        <div style={{ color: data.colors.primary, fontSize: '10px', fontWeight: 700, marginBottom: '11px' }}>{data.subtitle}</div>
        <div style={{ width: '38px', height: '2px', background: `linear-gradient(to left, ${data.colors.accent}, ${data.colors.primary})`, borderRadius: '1px', marginBottom: '10px' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {data.phone && <span style={{ color: data.colors.secondary, fontSize: '7.5px', opacity: 0.75 }} dir="ltr">{data.phone}</span>}
          {data.email && <span style={{ color: data.colors.secondary, fontSize: '7.5px', opacity: 0.65 }} dir="ltr">{data.email}</span>}
          {data.website && <span style={{ color: data.colors.secondary, fontSize: '7.5px', opacity: 0.65 }} dir="ltr">{data.website}</span>}
        </div>
      </div>

      {/* Right accent circle */}
      <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '50px', height: '50px', borderRadius: '50%', border: `1.5px solid ${data.colors.accent}66`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: `${data.colors.primary}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: data.colors.primary, fontSize: '14px', fontWeight: 900 }}>{data.title?.charAt(0) || 'أ'}</span>
        </div>
      </div>
    </div>
  );
}
