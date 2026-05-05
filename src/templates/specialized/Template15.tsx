import type { TemplateData } from '../../types/template';
interface Props { data: TemplateData; }

export default function SpecializedTemplate15({ data }: Props) {
  const { title, subtitle, description, phone, email, colors, image } = data;
  const features = (description || '').split('،').map(s => s.trim()).filter(Boolean);
  const featureIcons = ['🏆', '📚', '🧪', '🎨', '⚽', '💻', '🎓', '🤝'];

  return (
    <div id="template-preview" style={{
      width: 360, height: 460,
      background: colors.bg,
      position: 'relative', overflow: 'hidden',
      fontFamily: 'Cairo, sans-serif', direction: 'rtl',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Top gradient header */}
      <div style={{
        background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
        padding: '18px 20px 16px',
        display: 'flex', alignItems: 'center', gap: 14,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -20, left: -20, width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{
          width: 52, height: 52, borderRadius: 14, flexShrink: 0,
          overflow: 'hidden', border: `2px solid ${colors.accent}`,
          background: '#ffffff22',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {image
            ? <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <span style={{ fontSize: 26 }}>🏫</span>}
        </div>
        <div style={{ flex: 1, zIndex: 1 }}>
          <h1 style={{ color: '#fff', fontSize: 16, fontWeight: 900, margin: 0 }}>{title}</h1>
          <p style={{ color: colors.accent, fontSize: 10.5, margin: '3px 0 0', fontWeight: 700 }}>{subtitle}</p>
        </div>
        <div style={{
          background: colors.accent, color: colors.primary,
          borderRadius: 20, padding: '4px 10px',
          fontSize: 9, fontWeight: 900, whiteSpace: 'nowrap', zIndex: 1,
        }}>🌟 مزايانا</div>
      </div>

      {/* Features grid */}
      <div style={{ flex: 1, padding: '12px 14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, overflow: 'hidden' }}>
        {features.slice(0, 6).map((f, i) => (
          <div key={i} style={{
            background: '#fff',
            border: `1px solid ${colors.primary}18`,
            borderRadius: 12, padding: '10px 12px',
            display: 'flex', alignItems: 'flex-start', gap: 8,
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}>
            <span style={{ fontSize: 18, lineHeight: 1, flexShrink: 0 }}>{featureIcons[i] || '✅'}</span>
            <span style={{ color: '#333', fontSize: 10.5, fontWeight: 700, lineHeight: 1.5 }}>{f}</span>
          </div>
        ))}
      </div>

      {/* Tagline */}
      <div style={{
        margin: '0 14px 8px',
        background: `linear-gradient(135deg, ${colors.primary}18, ${colors.accent}20)`,
        borderRadius: 12, padding: '8px 14px', textAlign: 'center',
        border: `1px solid ${colors.primary}20`,
      }}>
        <p style={{ color: colors.primary, fontSize: 10.5, fontWeight: 800, margin: 0 }}>
          ✨ انضم إلى عائلتنا — حيث يتفوق أبناؤنا ويُبدعون
        </p>
      </div>

      {/* Footer */}
      <div style={{
        background: colors.primary, padding: '9px 18px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ color: colors.accent, fontSize: 11, fontWeight: 700 }}>📞 {phone}</span>
        <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10 }}>{email}</span>
      </div>
    </div>
  );
}
