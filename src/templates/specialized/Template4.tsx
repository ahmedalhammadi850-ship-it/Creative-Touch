import type { TemplateData } from '../../types/template';

interface Props { data: TemplateData; }

export default function SpecializedTemplate4({ data }: Props) {
  const { title, subtitle, description, phone, colors } = data;
  const bullets = (description || '').split('،').map(s => s.trim()).filter(Boolean);
  const bulletList = bullets.length >= 2 ? bullets : [
    'خصم الأخوة', 'خصم الثقات', 'خصم حفظة القرآن', 'خصم القوات المسلحة'
  ];

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
        background: colors.bg || '#e8f4f8',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Decorative wave top */}
      <div style={{
        position: 'absolute', top: -30, right: -40,
        width: 200, height: 160,
        borderRadius: '50%',
        background: `${colors.primary}22`,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: -50, right: 60,
        width: 140, height: 140,
        borderRadius: '50%',
        background: `${colors.secondary}18`,
        pointerEvents: 'none',
      }} />

      {/* Top header */}
      <div style={{
        background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
        padding: '12px 16px',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ color: '#fff', fontSize: 18, fontWeight: 900 }}>{title || 'أكاديمية المستقبل'}</div>
            <div style={{ color: colors.accent, fontSize: 10, fontWeight: 600 }}>{subtitle || 'الدولية'}</div>
          </div>
          {/* Logo circle */}
          <div style={{
            width: 48, height: 48,
            borderRadius: '50%',
            background: colors.accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22,
            boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
          }}>🎓</div>
        </div>
      </div>

      {/* Main content area */}
      <div style={{ display: 'flex', flex: 1, padding: '12px 16px', gap: 12 }}>
        {/* Left: text */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* Announcement tag */}
          <div style={{
            background: `${colors.primary}18`,
            border: `1px solid ${colors.primary}44`,
            borderRadius: 20,
            padding: '2px 10px',
            display: 'inline-block',
            marginBottom: 8,
            width: 'fit-content',
          }}>
            <span style={{ color: colors.primary, fontSize: 10, fontWeight: 700 }}>هل تبحث لأبنائك</span>
          </div>

          <p style={{
            color: '#1a1a1a',
            fontSize: 13,
            fontWeight: 700,
            margin: '0 0 10px',
            lineHeight: 1.5,
          }}>
            عن مدرسة مناسبة<br/>
            <span style={{ color: colors.primary }}>هادفة وبكفاءة عالية؟</span>
          </p>

          {/* Bullet list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {bulletList.slice(0, 4).map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: 6, height: 6,
                  borderRadius: '50%',
                  background: colors.accent,
                  flexShrink: 0,
                }} />
                <span style={{ color: '#444', fontSize: 11, fontWeight: 600 }}>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: highlight box */}
        <div style={{
          width: 120,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          justifyContent: 'center',
        }}>
          {/* Person silhouette area */}
          <div style={{
            width: '100%',
            height: 100,
            borderRadius: 12,
            background: `linear-gradient(160deg, ${colors.primary}22, ${colors.secondary}33)`,
            border: `2px solid ${colors.primary}33`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 48,
          }}>🧒</div>

          {/* Highlight callout */}
          <div style={{
            background: colors.accent,
            borderRadius: 10,
            padding: '6px 8px',
            textAlign: 'center',
          }}>
            <span style={{ color: colors.primary, fontSize: 9, fontWeight: 900, lineHeight: 1.3 }}>
              الخيار الأنسب<br/>لأبنائك
            </span>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{
        background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{ color: '#ffffff', fontSize: 13, fontWeight: 700 }}>
          {phone || '0778761241'}
        </span>
        <button style={{
          background: colors.accent,
          color: colors.primary,
          border: 'none',
          borderRadius: 20,
          padding: '5px 18px',
          fontSize: 11,
          fontWeight: 900,
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}>سجل الآن</button>
      </div>
    </div>
  );
}
