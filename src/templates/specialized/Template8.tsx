import type { TemplateData } from '../../types/template';

interface Props { data: TemplateData; }

export default function SpecializedTemplate8({ data }: Props) {
  const { title, subtitle, description, phone, colors } = data;
  const services = (description || '').split(/[،,\n]/).map(s => s.trim()).filter(Boolean);

  return (
    <div id="template-preview" style={{
      width: 360, height: 360,
      background: colors.bg,
      position: 'relative', overflow: 'hidden',
      fontFamily: "'Cairo', sans-serif", direction: 'rtl',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        padding: '18px 20px 16px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -15, right: -15, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ color: colors.accent, fontSize: '8px', letterSpacing: '0.15em', marginBottom: '4px', fontWeight: 700 }}>خدمات احترافية</div>
          <div style={{ color: '#fff', fontSize: '18px', fontWeight: 900, lineHeight: 1.25 }}>{title}</div>
          <div style={{ color: 'rgba(255,255,255,0.82)', fontSize: '10px', marginTop: '3px' }}>{subtitle}</div>
        </div>
      </div>
      <svg width="360" height="13" viewBox="0 0 360 13" style={{ display: 'block', marginTop: '-1px' }}>
        <path d={`M0,0 ${Array.from({ length: 18 }, (_, i) => `Q${i * 20 + 10},13 ${(i + 1) * 20},0`).join(' ')} L360,0 Z`} fill={colors.secondary} />
      </svg>

      <div style={{ flex: 1, padding: '10px 20px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {services.slice(0, 5).map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '20px', height: '20px', borderRadius: '50%',
                background: `${colors.primary}18`, border: `1.5px solid ${colors.primary}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: colors.accent }} />
              </div>
              <span style={{ color: colors.secondary, fontSize: '11px', fontWeight: 600 }}>{s}</span>
            </div>
          ))}
        </div>
        {phone && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            borderRadius: '10px', padding: '10px 16px',
            boxShadow: `0 4px 16px ${colors.primary}44`,
          }}>
            <span style={{ color: '#fff', fontSize: '12px', fontWeight: 800 }} dir="ltr">{phone}</span>
          </div>
        )}
      </div>
    </div>
  );
}
