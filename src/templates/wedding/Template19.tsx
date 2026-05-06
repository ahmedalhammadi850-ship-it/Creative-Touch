import type { TemplateData } from '../../types/template';

export default function Template19({ data }: { data: TemplateData }) {
  return (
    <div id="template-preview" style={{
      width: '280px', height: '400px',
      backgroundColor: data.colors.bg,
      direction: 'rtl',
      fontFamily: "'Georgia', 'Times New Roman', serif",
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Watercolor-like blobs */}
      <div style={{ position: 'absolute', top: -30, right: -20, width: 180, height: 180, borderRadius: '40% 60% 55% 45%', background: `radial-gradient(circle, ${data.colors.primary}33 0%, ${data.colors.primary}12 55%, transparent 75%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -20, left: -20, width: 160, height: 160, borderRadius: '55% 45% 40% 60%', background: `radial-gradient(circle, ${data.colors.accent}28 0%, ${data.colors.accent}0d 55%, transparent 75%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '40%', right: -10, width: 120, height: 120, borderRadius: '50%', background: `radial-gradient(circle, ${data.colors.secondary}1a 0%, transparent 70%)`, pointerEvents: 'none' }} />

      {/* Thin frame */}
      <div style={{ position: 'absolute', inset: '10px', border: `0.5px solid ${data.colors.primary}33`, pointerEvents: 'none' }} />

      {/* Floral top sprigs */}
      <svg style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '180px' }} viewBox="0 0 180 40" preserveAspectRatio="none">
        <path d="M90,38 Q70,20 50,22 Q30,24 20,10" stroke={data.colors.primary} strokeWidth="0.8" fill="none" opacity="0.4" />
        <path d="M90,38 Q110,20 130,22 Q150,24 160,10" stroke={data.colors.primary} strokeWidth="0.8" fill="none" opacity="0.4" />
        {[{x:50,y:22},{x:35,y:16},{x:20,y:10},{x:130,y:22},{x:145,y:16},{x:160,y:10}].map((p,i) => (
          <ellipse key={i} cx={p.x} cy={p.y} rx="5" ry="3.5" fill={i<3?data.colors.primary:data.colors.accent} opacity="0.4" transform={`rotate(${i*15-20} ${p.x} ${p.y})`} />
        ))}
        <ellipse cx="90" cy="36" rx="5" ry="3.5" fill={data.colors.accent} opacity="0.5" />
      </svg>

      {/* Bottom mirror */}
      <svg style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%) scaleY(-1)', width: '180px' }} viewBox="0 0 180 40" preserveAspectRatio="none">
        <path d="M90,38 Q70,20 50,22 Q30,24 20,10" stroke={data.colors.primary} strokeWidth="0.8" fill="none" opacity="0.3" />
        <path d="M90,38 Q110,20 130,22 Q150,24 160,10" stroke={data.colors.primary} strokeWidth="0.8" fill="none" opacity="0.3" />
        {[{x:50,y:22},{x:130,y:22}].map((p,i) => (
          <ellipse key={i} cx={p.x} cy={p.y} rx="5" ry="3.5" fill={data.colors.accent} opacity="0.3" />
        ))}
      </svg>

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 28px' }}>
        <div style={{ color: data.colors.primary, fontSize: '7px', letterSpacing: '0.3em', marginBottom: '18px', opacity: 0.65 }}>دعوة زفاف</div>
        <div style={{ color: data.colors.secondary, fontSize: '28px', fontWeight: 700, lineHeight: 1.25 }}>{data.title}</div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '9px 0', justifyContent: 'center' }}>
          <div style={{ width: '25px', height: '0.5px', background: `${data.colors.primary}88` }} />
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: data.colors.accent, opacity: 0.85 }} />
          <div style={{ width: '25px', height: '0.5px', background: `${data.colors.primary}88` }} />
        </div>

        <div style={{ color: data.colors.secondary, fontSize: '28px', fontWeight: 700, lineHeight: 1.25, marginBottom: '14px' }}>{data.subtitle}</div>
        <div style={{ width: '40px', height: '1.5px', background: `linear-gradient(to left, transparent, ${data.colors.accent}, transparent)`, margin: '0 auto 12px', opacity: 0.9 }} />
        <div style={{ color: `${data.colors.secondary}99`, fontSize: '9.5px', lineHeight: 1.9, letterSpacing: '0.02em' }}>{data.description}</div>
      </div>
    </div>
  );
}
