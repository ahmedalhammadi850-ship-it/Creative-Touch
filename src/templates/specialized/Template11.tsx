import type { TemplateData } from '../../types/template';

interface Props { data: TemplateData; }

export default function SpecializedTemplate11({ data }: Props) {
  const { title, subtitle, description, phone, colors } = data;
  const services = (description || '').split(/[،,\n]/).map(s => s.trim()).filter(Boolean);

  return (
    <div id="template-preview" style={{
      width: 360, height: 360,
      background: `rgba(255,255,255,0.04)`,
      backdropFilter: 'blur(12px)',
      backgroundColor: colors.bg,
      position: 'relative', overflow: 'hidden',
      fontFamily: "'Cairo', sans-serif", direction: 'rtl',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
    }}>
      {/* Glassmorphism blobs */}
      <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: `${colors.primary}44`, filter: 'blur(30px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -30, left: -30, width: 170, height: 170, borderRadius: '50%', background: `${colors.accent}33`, filter: 'blur(28px)', pointerEvents: 'none' }} />

      {/* Glass card */}
      <div style={{
        position: 'relative', zIndex: 1,
        background: 'rgba(255,255,255,0.08)',
        border: `1px solid rgba(255,255,255,0.18)`,
        borderRadius: '16px',
        padding: '22px 24px',
        width: '300px',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      }}>
        <div style={{ color: colors.accent, fontSize: '7.5px', letterSpacing: '0.22em', fontWeight: 700, marginBottom: '7px', opacity: 0.9 }}>✦ خدمات متميزة ✦</div>
        <div style={{ color: '#fff', fontSize: '18px', fontWeight: 900, lineHeight: 1.25, marginBottom: '3px', textShadow: `0 0 14px ${colors.primary}` }}>{title}</div>
        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '10px', marginBottom: '14px' }}>{subtitle}</div>
        <div style={{ height: '1px', background: `linear-gradient(to left, transparent, ${colors.accent}88, transparent)`, marginBottom: '12px' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
          {services.slice(0, 4).map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '6px', height: '6px', transform: 'rotate(45deg)', background: colors.accent, flexShrink: 0 }} />
              <span style={{ color: 'rgba(255,255,255,0.88)', fontSize: '11px', fontWeight: 600 }}>{s}</span>
            </div>
          ))}
        </div>
        {phone && (
          <div style={{
            background: `linear-gradient(135deg, ${colors.primary}88, ${colors.accent}66)`,
            border: `1px solid ${colors.accent}66`,
            borderRadius: '10px', padding: '9px 14px', textAlign: 'center',
          }}>
            <span style={{ color: '#fff', fontSize: '12px', fontWeight: 800, textShadow: `0 0 8px ${colors.accent}` }} dir="ltr">{phone}</span>
          </div>
        )}
      </div>
    </div>
  );
}
