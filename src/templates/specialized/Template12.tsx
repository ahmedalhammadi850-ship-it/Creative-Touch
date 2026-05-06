import type { TemplateData } from '../../types/template';

interface Props { data: TemplateData; }

export default function SpecializedTemplate12({ data }: Props) {
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
      {/* Neon gradient top strip */}
      <div style={{ height: '4px', background: `linear-gradient(to left, ${colors.accent}, ${colors.primary}, ${colors.secondary})`, boxShadow: `0 2px 12px ${colors.primary}88` }} />

      {/* Glow effects */}
      <div style={{ position: 'absolute', top: -30, right: '30%', width: 180, height: 180, borderRadius: '50%', background: `radial-gradient(circle, ${colors.primary}55 0%, ${colors.primary}22 50%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -20, left: '20%', width: 140, height: 140, borderRadius: '50%', background: `radial-gradient(circle, ${colors.accent}44 0%, ${colors.accent}18 50%, transparent 70%)`, pointerEvents: 'none' }} />

      <div style={{ flex: 1, padding: '16px 22px 14px', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ color: colors.accent, fontSize: '8px', letterSpacing: '0.2em', fontWeight: 700, marginBottom: '6px', textShadow: `0 0 10px ${colors.accent}` }}>
          ★ خدماتنا ★
        </div>
        <div style={{ color: colors.secondary, fontSize: '22px', fontWeight: 900, lineHeight: 1.2, marginBottom: '3px', textShadow: `0 0 20px ${colors.primary}88` }}>{title}</div>
        <div style={{ color: `${colors.secondary}aa`, fontSize: '10px', marginBottom: '14px' }}>{subtitle}</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px', flex: 1 }}>
          {services.slice(0, 4).map((s, i) => (
            <div key={i} style={{
              padding: '9px 11px',
              background: `linear-gradient(135deg, ${colors.primary}18, ${colors.accent}10)`,
              border: `1px solid ${i % 2 === 0 ? colors.primary : colors.accent}44`,
              borderRadius: '10px',
              display: 'flex', alignItems: 'center', gap: '7px',
              boxShadow: `0 0 8px ${i % 2 === 0 ? colors.primary : colors.accent}22`,
            }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: i % 2 === 0 ? colors.primary : colors.accent, boxShadow: `0 0 6px ${i % 2 === 0 ? colors.primary : colors.accent}`, flexShrink: 0 }} />
              <span style={{ color: colors.secondary, fontSize: '10px', fontWeight: 600 }}>{s}</span>
            </div>
          ))}
        </div>

        {phone && (
          <div style={{
            marginTop: '12px',
            background: `linear-gradient(135deg, ${colors.primary}44, ${colors.accent}22)`,
            border: `1px solid ${colors.accent}66`,
            borderRadius: '10px', padding: '10px 16px', textAlign: 'center',
            boxShadow: `0 0 16px ${colors.primary}44`,
          }}>
            <span style={{ color: colors.accent, fontSize: '13px', fontWeight: 800, textShadow: `0 0 8px ${colors.accent}88` }} dir="ltr">{phone}</span>
          </div>
        )}
      </div>
    </div>
  );
}
