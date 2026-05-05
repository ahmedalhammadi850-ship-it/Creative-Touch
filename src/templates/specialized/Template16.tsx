import type { TemplateData } from '../../types/template';
interface Props { data: TemplateData; }

export default function SpecializedTemplate16({ data }: Props) {
  const { title, subtitle, description, phone, email, colors, image } = data;
  const features = (description || '').split('،').map(s => s.trim()).filter(Boolean);
  const featureIcons = ['🎓', '🏅', '🔬', '🎭', '🌐', '💡', '📖', '🤸'];
  const featureColors = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#06b6d4', '#8b5cf6'];

  return (
    <div id="template-preview" style={{
      width: 360, height: 460,
      background: colors.bg,
      position: 'relative', overflow: 'hidden',
      fontFamily: 'Cairo, sans-serif', direction: 'rtl',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Decorative background shapes */}
      <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: `${colors.primary}12` }} />
      <div style={{ position: 'absolute', bottom: 60, left: -40, width: 150, height: 150, borderRadius: '50%', background: `${colors.accent}15` }} />

      {/* Hero top */}
      <div style={{ padding: '22px 20px 14px', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16, flexShrink: 0,
            overflow: 'hidden',
            border: `2px solid ${colors.primary}`,
            background: `${colors.primary}15`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {image
              ? <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <span style={{ fontSize: 28 }}>🏫</span>}
          </div>
          <div>
            <h1 style={{ color: colors.primary, fontSize: 18, fontWeight: 900, margin: 0, lineHeight: 1.2 }}>{title}</h1>
            <p style={{ color: colors.secondary, fontSize: 11, margin: '3px 0 0', fontWeight: 700 }}>{subtitle}</p>
          </div>
        </div>

        {/* Headline */}
        <div style={{
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
          borderRadius: 14, padding: '10px 16px', marginBottom: 4,
        }}>
          <p style={{ color: '#fff', fontSize: 12, fontWeight: 800, margin: 0, textAlign: 'center', lineHeight: 1.5 }}>
            🌟 لماذا تختار مدرستنا؟ اكتشف الفرق!
          </p>
        </div>
      </div>

      {/* Features list */}
      <div style={{ flex: 1, padding: '0 14px', overflow: 'hidden', zIndex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {features.slice(0, 5).map((f, i) => (
            <div key={i} style={{
              background: '#fff',
              borderRadius: 12, padding: '9px 14px',
              display: 'flex', alignItems: 'center', gap: 10,
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
              border: `1px solid ${featureColors[i % featureColors.length]}20`,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                background: `${featureColors[i % featureColors.length]}18`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16,
              }}>
                {featureIcons[i] || '✅'}
              </div>
              <span style={{ color: '#2d2d2d', fontSize: 11, fontWeight: 700, flex: 1 }}>{f}</span>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: featureColors[i % featureColors.length], flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </div>

      {/* Motivational tagline */}
      <div style={{ padding: '10px 14px 0', zIndex: 1 }}>
        <p style={{
          color: colors.primary, fontSize: 10.5, fontWeight: 800,
          textAlign: 'center', margin: 0,
          background: `${colors.accent}30`, borderRadius: 10, padding: '6px 12px',
        }}>
          💪 سجّل اليوم — أماكن محدودة لأبنائنا المتميزين
        </p>
      </div>

      {/* Footer */}
      <div style={{
        margin: 10,
        background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
        borderRadius: 14, padding: '10px 18px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 1,
      }}>
        <span style={{ color: colors.accent, fontSize: 11, fontWeight: 800 }}>📞 {phone}</span>
        <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 10 }}>{email}</span>
      </div>
    </div>
  );
}
