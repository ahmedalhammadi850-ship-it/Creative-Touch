import type { TemplateData } from '../../types/template';
interface Props { data: TemplateData; }

export default function SpecializedTemplate18({ data }: Props) {
  const { title, subtitle, description, phone, email, website, colors, image, fontSize } = data;
  const features = (description || '').split('،').map(s => s.trim()).filter(Boolean);
  const fs = fontSize || 14;

  const pillColors = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#06b6d4', '#8b5cf6'];

  return (
    <div id="template-preview" style={{
      width: 360, height: 520,
      background: colors.bg,
      position: 'relative', overflow: 'hidden',
      fontFamily: 'Cairo, sans-serif', direction: 'rtl',
      display: 'flex', flexDirection: 'column',
    }}>

      {/* ── BACKGROUND DECORATION ── */}
      <div style={{ position: 'absolute', top: -80, left: -80, width: 260, height: 260, borderRadius: '50%', background: `${colors.primary}10`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 80, right: -60, width: 200, height: 200, borderRadius: '50%', background: `${colors.accent}14`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 220, left: -40, width: 140, height: 140, borderRadius: '50%', background: `${colors.secondary}0c`, pointerEvents: 'none' }} />

      {/* ── TOP HEADER ── */}
      <div style={{
        padding: '20px 20px 16px',
        display: 'flex', alignItems: 'center', gap: 14,
        position: 'relative', zIndex: 1, flexShrink: 0,
      }}>
        {/* Photo */}
        <div style={{
          width: 70, height: 70, borderRadius: 20, flexShrink: 0, overflow: 'hidden',
          border: `3px solid ${colors.primary}`,
          boxShadow: `0 6px 20px ${colors.primary}30`,
          background: `${colors.primary}20`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {image
            ? <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <span style={{ fontSize: 32 }}>🏫</span>}
        </div>

        <div style={{ flex: 1 }}>
          <h1 style={{
            color: colors.primary, fontSize: fs + 4, fontWeight: 900,
            margin: 0, lineHeight: 1.2,
          }}>{title}</h1>
          <p style={{
            color: '#555', fontSize: fs - 3, fontWeight: 600,
            margin: '4px 0 0', lineHeight: 1.5,
          }}>{subtitle}</p>
        </div>

        {/* Star badge */}
        <div style={{
          flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center',
          background: colors.accent, color: colors.primary,
          width: 46, height: 46, borderRadius: 14,
          justifyContent: 'center',
          boxShadow: `0 4px 14px ${colors.accent}44`,
        }}>
          <span style={{ fontSize: 18 }}>⭐</span>
          <span style={{ fontSize: 8, fontWeight: 900 }}>مميز</span>
        </div>
      </div>

      {/* ── GRADIENT DIVIDER ── */}
      <div style={{
        height: 4, margin: '0 16px',
        background: `linear-gradient(to left, transparent, ${colors.primary}, ${colors.accent}, ${colors.primary}, transparent)`,
        borderRadius: 2, flexShrink: 0,
      }} />

      {/* ── HEADLINE CARD ── */}
      <div style={{
        margin: '12px 16px 0', padding: '12px 16px',
        background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
        borderRadius: 16, zIndex: 1, flexShrink: 0,
      }}>
        <p style={{
          color: '#fff', fontSize: fs - 1, fontWeight: 800,
          margin: 0, textAlign: 'center', lineHeight: 1.6,
        }}>
          🌟 لماذا تختار مدرستنا؟ — الجودة في كل خطوة
        </p>
      </div>

      {/* ── FEATURES ── */}
      <div style={{ flex: 1, padding: '12px 16px 0', zIndex: 1, overflow: 'hidden' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {features.slice(0, 5).map((f, i) => (
            <div key={i} style={{
              background: '#fff',
              borderRadius: 14, padding: '10px 14px',
              display: 'flex', alignItems: 'center', gap: 12,
              boxShadow: `0 2px 12px rgba(0,0,0,0.06)`,
              border: `1px solid ${pillColors[i % pillColors.length]}18`,
            }}>
              <div style={{
                width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                background: `${pillColors[i % pillColors.length]}18`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: 18 }}>
                  {['🎓','📖','🧪','🎨','💻','⚽'][i] || '✅'}
                </span>
              </div>
              <span style={{ color: '#1a1a2e', fontSize: fs - 2.5, fontWeight: 700, flex: 1, lineHeight: 1.4 }}>{f}</span>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: pillColors[i % pillColors.length], flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA + CONTACT ── */}
      <div style={{ padding: '10px 16px 14px', zIndex: 1, flexShrink: 0 }}>
        <div style={{
          background: `${colors.primary}12`,
          borderRadius: 12, padding: '8px 14px',
          textAlign: 'center', marginBottom: 10,
          border: `1px solid ${colors.primary}20`,
        }}>
          <p style={{ color: colors.primary, fontSize: fs - 3, fontWeight: 800, margin: 0 }}>
            💪 سجّل اليوم — أماكن محدودة للطلاب المتميزين
          </p>
        </div>

        <div style={{
          display: 'flex', gap: 10, alignItems: 'center',
        }}>
          <div style={{
            flex: 1, background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            borderRadius: 12, padding: '9px 14px',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ color: colors.accent, fontSize: fs - 2, fontWeight: 800 }}>📞 {phone}</span>
          </div>
          <div style={{
            background: colors.accent, color: colors.primary,
            borderRadius: 12, padding: '9px 14px',
            fontSize: fs - 2, fontWeight: 900,
          }}>
            سجّل ←
          </div>
        </div>

        {website && (
          <p style={{ color: '#888', fontSize: fs - 4, textAlign: 'center', margin: '6px 0 0' }}>
            🌐 {website}
          </p>
        )}
      </div>

    </div>
  );
}
