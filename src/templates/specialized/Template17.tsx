import type { TemplateData } from '../../types/template';
interface Props { data: TemplateData; }

export default function SpecializedTemplate17({ data }: Props) {
  const { title, subtitle, description, phone, email, website, colors, image, fontSize } = data;
  const features = (description || '').split('،').map(s => s.trim()).filter(Boolean);
  const fs = fontSize || 14;

  const featureIcons = ['🏆', '📚', '🔬', '🎨', '🌐', '⚽'];

  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div id="template-preview" style={{
      width: 360, height: 520,
      background: '#fff',
      position: 'relative', overflow: 'hidden',
      fontFamily: 'Cairo, sans-serif', direction: 'rtl',
      display: 'flex', flexDirection: 'column',
      boxShadow: '0 0 0 1px #e5e7eb',
    }}>

      {/* ── PHOTO HERO BANNER ── */}
      <div style={{
        position: 'relative', height: 170, flexShrink: 0, overflow: 'hidden',
        background: `linear-gradient(145deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
      }}>
        {image && (
          <img src={image} alt="" style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', opacity: 0.35,
          }} />
        )}
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(to top, ${colors.primary}ee 0%, transparent 60%)`,
        }} />

        {/* Floating badge top-right */}
        <div style={{
          position: 'absolute', top: 14, left: 14,
          background: colors.accent, color: colors.primary,
          borderRadius: 20, padding: '5px 14px',
          fontSize: 10 + _d, fontWeight: 900,
          boxShadow: '0 3px 12px rgba(0,0,0,0.25)',
        }}>
          🎓 التسجيل مفتوح
        </div>

        {/* Logo circle */}
        <div style={{
          position: 'absolute', top: 14, right: 14,
          width: 56, height: 56, borderRadius: 16,
          background: 'rgba(255,255,255,0.25)',
          border: '2px solid rgba(255,255,255,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 26 + _d,
        }}>
          🏫
        </div>

        {/* School name on banner */}
        <div style={{ position: 'absolute', bottom: 14, right: 14, left: 14 }}>
          <h1 style={{
            color: '#fff', fontSize: fs + 6, fontWeight: 900,
            margin: 0, lineHeight: 1.2, textShadow: '0 2px 8px rgba(0,0,0,0.4)',
          }}>{title}</h1>
          <p style={{
            color: 'rgba(255,255,255,0.85)', fontSize: fs - 2, fontWeight: 600,
            margin: '4px 0 0', textShadow: '0 1px 4px rgba(0,0,0,0.4)',
          }}>{subtitle}</p>
        </div>
      </div>

      {/* ── ACCENT STRIPE ── */}
      <div style={{
        height: 5, flexShrink: 0,
        background: `linear-gradient(to left, ${colors.accent}, ${colors.primary}, ${colors.accent})`,
      }} />

      {/* ── FEATURES SECTION ── */}
      <div style={{ flex: 1, padding: '14px 16px 0' }}>
        <p style={{
          color: colors.primary, fontSize: fs - 2, fontWeight: 800,
          margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{ display: 'inline-block', width: 14, height: 3, background: colors.accent, borderRadius: 2 }} />
          مزايا ومميزات مدرستنا
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {features.slice(0, 6).map((f, i) => (
            <div key={i} style={{
              background: i % 2 === 0 ? `${colors.primary}0d` : `${colors.accent}18`,
              border: `1px solid ${i % 2 === 0 ? colors.primary : colors.accent}22`,
              borderRadius: 12, padding: '9px 10px',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ fontSize: 16 + _d, lineHeight: 1, flexShrink: 0 }}>{featureIcons[i] || '✅'}</span>
              <span style={{ color: '#1a1a2e', fontSize: fs - 3.5, fontWeight: 700, lineHeight: 1.4 }}>{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── MOTIVATIONAL TAGLINE ── */}
      <div style={{ padding: '10px 16px 0' }}>
        <div style={{
          background: `linear-gradient(135deg, ${colors.primary}18, ${colors.secondary}12)`,
          borderRadius: 12, padding: '9px 14px', textAlign: 'center',
          border: `1px solid ${colors.primary}20`,
        }}>
          <p style={{ color: colors.primary, fontSize: fs - 3, fontWeight: 800, margin: 0, lineHeight: 1.6 }}>
            💡 نبني شخصية ونُشعل موهبة — انضم إلى عائلتنا المتميزة
          </p>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div style={{
        margin: '10px 12px 12px',
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        borderRadius: 16, padding: '11px 18px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div>
          <p style={{ color: colors.accent, fontSize: fs - 2, fontWeight: 800, margin: 0 }}>📞 {phone}</p>
          {website && <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: fs - 4, margin: '2px 0 0' }}>🌐 {website}</p>}
        </div>
        <div style={{
          background: colors.accent, color: colors.primary,
          borderRadius: 10, padding: '6px 14px',
          fontSize: fs - 2, fontWeight: 900,
        }}>
          سجّل الآن ←
        </div>
      </div>

    </div>
  );
}
