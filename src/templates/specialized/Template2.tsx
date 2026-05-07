import type { TemplateData } from '../../types/template';

interface Props { data: TemplateData; }

export default function SpecializedTemplate2({ data }: Props) {
  const { title, subtitle, description, phone, email, website, colors } = data;
  const services = (description || '').split('،').map(s => s.trim()).filter(Boolean);
  const serviceList = services.length >= 3 ? services : [
    'الخدمة الأولى', 'الخدمة الثانية', 'الخدمة الثالثة', 'الخدمة الرابعة', 'الخدمة الخامسة'
  ];

  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div
      id="template-preview"
      style={{
        width: 360,
        height: 360,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Cairo, sans-serif',
        direction: 'rtl',
        background: colors.bg || '#f0f4ff',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top gradient header */}
      <div style={{
        background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
        padding: '14px 16px 20px',
        position: 'relative',
      }}>
        {/* Logo area */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{
            width: 44, height: 44,
            borderRadius: '50%',
            background: colors.accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 900, fontSize: 14 + _d, color: colors.primary,
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          }}>
            {(title || 'DC').slice(0, 2).toUpperCase()}
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ color: '#fff', fontSize: 11 + _d, fontWeight: 700, opacity: 0.9 }}>{website || 'CLINIC'}</div>
            <div style={{ color: colors.accent, fontSize: 9 + _d, fontWeight: 600 }}>{email || 'CENTER'}</div>
          </div>
        </div>

        {/* Decorative hearts */}
        <div style={{ position: 'absolute', top: 10, left: 70, fontSize: 18 + _d, opacity: 0.6 }}>💛</div>
        <div style={{ position: 'absolute', top: 5, left: 40, fontSize: 12 + _d, opacity: 0.4 }}>💛</div>

        <h2 style={{
          color: '#ffffff',
          fontSize: 16 + _d,
          fontWeight: 900,
          margin: 0,
          lineHeight: 1.4,
        }}>
          هدفنا أن تكون <span style={{ color: colors.accent, fontSize: 20 + _d }}>{subtitle || 'ابتسامتك'}</span> مثالية
        </h2>
      </div>

      {/* Content area */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Services list */}
        <div style={{ flex: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {serviceList.slice(0, 5).map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 22, height: 22,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9 + _d, fontWeight: 900, flexShrink: 0,
              }}>
                0{i + 1}
              </div>
              <span style={{ fontSize: 12 + _d, fontWeight: 600, color: '#1a1a1a' }}>{s}</span>
            </div>
          ))}
        </div>

        {/* Circle image */}
        <div style={{
          width: 130, display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '8px 8px 8px 0',
        }}>
          <div style={{
            width: 110, height: 110,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${colors.primary}33, ${colors.secondary}55)`,
            border: `3px solid ${colors.primary}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 40 + _d,
            boxShadow: `0 4px 20px ${colors.primary}44`,
          }}>
            🦷
          </div>
        </div>
      </div>

      {/* Bottom contact bar */}
      <div style={{
        background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
        padding: '8px 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
      }}>
        <span style={{ color: '#fff', fontSize: 10 + _d, fontWeight: 600 }}>{title || 'Dream Clinic'}</span>
        <span style={{ color: colors.accent, fontSize: 11 + _d, fontWeight: 700 }}>{phone || '+90 535 081 96 31'}</span>
        <span style={{ color: '#fff', fontSize: 10 + _d, opacity: 0.8 }}>{email || '@clinic'}</span>
      </div>
    </div>
  );
}
