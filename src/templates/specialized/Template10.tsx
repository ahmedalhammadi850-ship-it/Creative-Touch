import type { TemplateData } from '../../types/template';

interface Props { data: TemplateData; }

export default function SpecializedTemplate10({ data }: Props) {
  const { title, subtitle, description, phone, colors } = data;
  const services = (description || '').split(/[،,\n]/).map(s => s.trim()).filter(Boolean);

  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div id="template-preview" style={{
      width: 360, height: 360,
      background: colors.bg,
      position: 'relative', overflow: 'hidden',
      fontFamily: "'Cairo', sans-serif", direction: 'rtl',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }}>
      <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: `radial-gradient(circle, ${colors.primary}55 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -30, left: -30, width: 140, height: 140, borderRadius: '50%', background: `radial-gradient(circle, ${colors.accent}33 0%, transparent 65%)`, pointerEvents: 'none' }} />

      <div style={{ height: '3px', background: `linear-gradient(to left, ${colors.accent}, ${colors.primary}, ${colors.secondary})` }} />

      <div style={{ padding: '16px 22px 10px', position: 'relative', zIndex: 1 }}>
        <div style={{ color: colors.accent, fontSize: `${8 + _d}px`, letterSpacing: '0.22em', fontWeight: 700, marginBottom: '6px' }}>✦ خدمات متميزة ✦</div>
        <div style={{ color: colors.secondary, fontSize: `${20 + _d}px`, fontWeight: 900, lineHeight: 1.25, textShadow: `0 0 20px ${colors.primary}66`, marginBottom: '3px' }}>{title}</div>
        <div style={{ color: colors.primary, fontSize: `${10 + _d}px`, opacity: 0.85, marginBottom: '14px' }}>{subtitle}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {services.slice(0, 5).map((s, i) => (
            <span key={i} style={{
              background: `${colors.primary}25`,
              color: i % 2 === 0 ? colors.secondary : colors.accent,
              border: `1px solid ${i % 2 === 0 ? colors.primary : colors.accent}55`,
              borderRadius: '20px', padding: '4px 12px',
              fontSize: `${10 + _d}px`, fontWeight: 600,
            }}>{s}</span>
          ))}
        </div>
      </div>

      {phone && (
        <div style={{
          margin: '0 16px 16px',
          background: `linear-gradient(135deg, ${colors.primary}33, ${colors.accent}22)`,
          border: `1px solid ${colors.primary}66`,
          borderRadius: '12px', padding: '10px 18px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          position: 'relative', zIndex: 1,
        }}>
          <span style={{ color: colors.accent, fontSize: `${9 + _d}px`, fontWeight: 700 }}>تواصل الآن</span>
          <span style={{ color: colors.secondary, fontSize: `${13 + _d}px`, fontWeight: 800 }} dir="ltr">{phone}</span>
        </div>
      )}
    </div>
  );
}
