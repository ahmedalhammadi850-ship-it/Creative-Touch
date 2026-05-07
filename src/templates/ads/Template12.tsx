import type { TemplateData } from '../../types/template';

export default function Template12({ data }: { data: TemplateData }) {
  return (
    <div id="template-preview" style={{
      width: '360px', height: '360px',
      background: `radial-gradient(ellipse at 70% 30%, ${data.colors.primary}cc 0%, ${data.colors.bg} 55%)`,
      direction: 'rtl',
      fontFamily: "'Cairo', sans-serif",
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
    }}>
      {/* Glow circles */}
      <div style={{ position: 'absolute', top: '18%', right: '20%', width: 120, height: 120, borderRadius: '50%', background: `radial-gradient(circle, ${data.colors.accent}55 0%, transparent 60%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '12%', left: '15%', width: 90, height: 90, borderRadius: '50%', background: `radial-gradient(circle, ${data.colors.primary}44 0%, transparent 60%)`, pointerEvents: 'none' }} />

      {/* Animated ring outline */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 290, height: 290, borderRadius: '50%', border: `0.5px solid ${data.colors.primary}33`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 320, height: 320, borderRadius: '50%', border: `0.5px solid ${data.colors.accent}22`, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 30px' }}>
        <div style={{ color: data.colors.accent, fontSize: '8px', letterSpacing: '0.28em', fontWeight: 700, marginBottom: '10px', textShadow: `0 0 12px ${data.colors.accent}` }}>
          ✦ عرض خاص ✦
        </div>
        <div style={{ color: data.colors.secondary, fontSize: '30px', fontWeight: 900, lineHeight: 1.15, marginBottom: '6px', textShadow: `0 0 30px ${data.colors.primary}` }}>
          {data.title}
        </div>
        <div style={{ width: '50px', height: '2px', background: `linear-gradient(to left, transparent, ${data.colors.accent}, transparent)`, margin: '0 auto 8px', boxShadow: `0 0 8px ${data.colors.accent}` }} />
        <div style={{ color: data.colors.secondary, fontSize: '11px', fontWeight: 600, marginBottom: '10px', opacity: 0.85 }}>{data.subtitle}</div>
        <div style={{ color: `${data.colors.secondary}99`, fontSize: '10px', lineHeight: 1.75, marginBottom: '20px' }}>{data.description}</div>
        {data.phone && (
          <div style={{
            display: 'inline-block',
            background: 'transparent',
            border: `1.5px solid ${data.colors.accent}`,
            borderRadius: '30px', padding: '9px 26px',
            boxShadow: `0 0 18px ${data.colors.accent}55, inset 0 0 12px ${data.colors.accent}11`,
            whiteSpace: 'nowrap',
          }}>
            <span style={{ color: data.colors.accent, fontSize: '12px', fontWeight: 800, textShadow: `0 0 10px ${data.colors.accent}`, whiteSpace: 'nowrap' }} dir="ltr">{data.phone}</span>
          </div>
        )}
      </div>
    </div>
  );
}
