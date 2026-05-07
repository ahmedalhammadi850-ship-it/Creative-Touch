import type { TemplateData } from '../../types/template';

interface Props { data: TemplateData; }

export default function SpecializedTemplate9({ data }: Props) {
  const { title, subtitle, description, phone, colors } = data;
  const services = (description || '').split(/[،,\n]/).map(s => s.trim()).filter(Boolean);

  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div id="template-preview" style={{
      width: 360, height: 360,
      background: colors.bg,
      position: 'relative', overflow: 'hidden',
      fontFamily: "'Cairo', sans-serif", direction: 'rtl',
      display: 'flex',
    }}>
      <div style={{
        width: '140px', flexShrink: 0,
        background: `linear-gradient(160deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        padding: '20px 14px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', bottom: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ color: colors.accent, fontSize: '6px', letterSpacing: '0.2em', marginBottom: '6px', fontWeight: 700 }}>خدماتنا</div>
          <div style={{ color: '#fff', fontSize: '15px', fontWeight: 900, lineHeight: 1.3, marginBottom: '7px' }}>{title}</div>
          <div style={{ width: '28px', height: '2px', background: colors.accent, borderRadius: '1px', marginBottom: '7px' }} />
          <div style={{ color: 'rgba(255,255,255,0.78)', fontSize: '9px', lineHeight: 1.6 }}>{subtitle}</div>
        </div>
        {phone && (
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ color: colors.accent, fontSize: '7px', fontWeight: 700, marginBottom: '2px' }}>اتصل بنا</div>
            <div style={{ color: '#fff', fontSize: '9px', fontWeight: 700 }} dir="ltr">{phone}</div>
          </div>
        )}
      </div>

      <div style={{ flex: 1, padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
        <div style={{ color: colors.primary, fontSize: '8px', letterSpacing: '0.15em', fontWeight: 700, marginBottom: '4px' }}>قائمة الخدمات</div>
        {services.slice(0, 5).map((s, i) => (
          <div key={i} style={{
            padding: '7px 10px',
            background: i % 2 === 0 ? `${colors.primary}10` : `${colors.accent}10`,
            borderRight: `3px solid ${i % 2 === 0 ? colors.primary : colors.accent}`,
            borderRadius: '0 6px 6px 0',
          }}>
            <span style={{ color: colors.secondary, fontSize: '10px', fontWeight: 600 }}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
