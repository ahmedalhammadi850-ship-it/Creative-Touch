import type { TemplateData } from '../../types/template';

export default function Template12({ data }: { data: TemplateData }) {
  return (
    <div id="template-preview" style={{ width: '280px', height: '400px', position: 'relative', overflow: 'hidden', fontFamily: "'Georgia', serif", direction: 'rtl', backgroundColor: data.colors.bg }}>
      {/* Botanical leaf top-right */}
      <svg style={{ position: 'absolute', top: 0, right: 0 }} width="110" height="100" viewBox="0 0 110 100">
        <path d="M110,0 Q80,10 70,30 Q60,50 80,70 Q90,50 100,25 Z" fill={data.colors.primary} opacity="0.18" />
        <path d="M110,0 Q90,5 85,20 Q80,35 95,50 Q100,30 108,12 Z" fill={data.colors.accent} opacity="0.15" />
        <line x1="110" y1="0" x2="82" y2="55" stroke={data.colors.primary} strokeWidth="0.8" opacity="0.2" />
      </svg>

      {/* Bottom-left botanical */}
      <svg style={{ position: 'absolute', bottom: 0, left: 0 }} width="100" height="90" viewBox="0 0 100 90">
        <path d="M0,90 Q20,70 30,55 Q40,40 25,20 Q10,45 5,65 Z" fill={data.colors.primary} opacity="0.15" />
        <path d="M0,90 Q15,75 22,62 Q28,50 18,35 Q8,55 2,72 Z" fill={data.colors.accent} opacity="0.12" />
        <line x1="0" y1="90" x2="28" y2="35" stroke={data.colors.primary} strokeWidth="0.8" opacity="0.18" />
      </svg>

      {/* Inner frame */}
      <div style={{ position: 'absolute', inset: '12px', border: `0.5px solid ${data.colors.primary}44`, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '20px 18px', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: data.colors.primary, fontSize: '7.5px', letterSpacing: '0.2em', marginBottom: '12px', opacity: 0.7 }}>🌿 دعوة زفاف 🌿</div>

        <div style={{ color: data.colors.primary, fontSize: '28px', fontWeight: 'bold', textAlign: 'center', lineHeight: 1.2, marginBottom: '6px' }}>{data.title}</div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '6px 0' }}>
          <div style={{ flex: 1, height: '0.5px', background: `${data.colors.primary}55` }} />
          <span style={{ color: data.colors.accent, fontSize: '14px' }}>♡</span>
          <div style={{ flex: 1, height: '0.5px', background: `${data.colors.primary}55` }} />
        </div>

        <div style={{ color: data.colors.primary, fontSize: '28px', fontWeight: 'bold', textAlign: 'center', lineHeight: 1.2, marginBottom: '14px' }}>{data.subtitle}</div>

        <div style={{ width: '60px', height: '1px', background: `linear-gradient(to left, transparent, ${data.colors.primary}, transparent)`, marginBottom: '12px' }} />

        <div style={{ color: data.colors.secondary, fontSize: '10px', textAlign: 'center', lineHeight: 1.9, opacity: 0.8 }}>{data.description}</div>
      </div>
    </div>
  );
}
