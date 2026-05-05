import type { TemplateData } from '../../types/template';

interface Props { data: TemplateData; }

export default function SpecializedTemplate1({ data }: Props) {
  const { title, subtitle, description, phone, colors } = data;
  const services = (description || '').split('،').map(s => s.trim()).filter(Boolean);

  return (
    <div
      id="template-preview"
      style={{
        width: 360,
        height: 360,
        background: colors.primary,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Cairo, sans-serif',
        direction: 'rtl',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Dotted decorative circles */}
      <div style={{
        position: 'absolute', bottom: -40, left: -40,
        width: 180, height: 180,
        borderRadius: '50%',
        border: `2px dashed ${colors.accent}33`,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -20, left: -20,
        width: 120, height: 120,
        borderRadius: '50%',
        border: `2px dashed ${colors.accent}55`,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: -30, right: -30,
        width: 140, height: 140,
        borderRadius: '50%',
        border: `2px dashed ${colors.accent}33`,
        pointerEvents: 'none',
      }} />

      {/* Top text area */}
      <div style={{ padding: '20px 20px 0', zIndex: 1 }}>
        <h2 style={{
          color: '#ffffff',
          fontSize: 22,
          fontWeight: 900,
          margin: 0,
          lineHeight: 1.3,
        }}>{title || 'رعاية كاملة...'}</h2>
        <p style={{
          color: colors.accent,
          fontSize: 14,
          margin: '6px 0 14px',
          fontWeight: 600,
        }}>{subtitle || 'خدمة متكاملة بأسلوب حديث'}</p>

        {/* Service tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {(services.length > 0 ? services : ['تنظيف وتلميع', 'تبييض', 'حشوات']).map((s, i) => (
            <span key={i} style={{
              background: '#ffffff22',
              color: '#ffffff',
              border: '1px solid #ffffff44',
              borderRadius: 20,
              padding: '3px 12px',
              fontSize: 11,
              fontWeight: 600,
              backdropFilter: 'blur(4px)',
            }}>{s}</span>
          ))}
        </div>
      </div>

      {/* Image area with badge */}
      <div style={{ position: 'relative', flex: 1, margin: '12px 0 0' }}>
        {/* Rounded image placeholder */}
        <div style={{
          position: 'absolute',
          bottom: 0, right: 0,
          width: 220, height: 190,
          background: `linear-gradient(135deg, ${colors.secondary}cc, ${colors.primary}99)`,
          borderRadius: '80px 80px 0 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <div style={{
            width: 80, height: 80,
            borderRadius: '50%',
            background: '#ffffff22',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 36,
          }}>🏥</div>
        </div>

        {/* Badge */}
        <div style={{
          position: 'absolute',
          bottom: 80, left: 20,
          width: 64, height: 64,
          borderRadius: '50%',
          background: colors.accent,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        }}>
          <span style={{ color: colors.primary, fontSize: 9, fontWeight: 900, textAlign: 'center', lineHeight: 1.2 }}>بادر<br/>بالحجز</span>
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{
        background: '#ffffff',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
      }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: colors.primary }}>
          احجز الآن | {phone || '+0123 456 789'}
        </span>
      </div>
    </div>
  );
}
