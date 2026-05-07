import type { TemplateData } from '../../types/template';

interface Props { data: TemplateData; }

export default function CongratsTemplate20({ data }: Props) {
  const { title, subtitle, description, email, website, colors, image } = data;
  const lines = (description || '').split('\n').filter(Boolean);

  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div
      id="template-preview"
      style={{
        width: 360,
        height: 460,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Cairo, sans-serif',
        direction: 'rtl',
        background: colors.bg || '#ffffff',
        display: 'flex',
      }}
    >
      {/* Left accent bar */}
      <div style={{
        width: 8,
        background: `linear-gradient(to bottom, ${colors.accent}, ${colors.primary}, ${colors.secondary})`,
        flexShrink: 0,
        boxShadow: `2px 0 20px ${colors.primary}33`,
      }} />

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* Top section: photo + title */}
        <div style={{ display: 'flex', height: 200, position: 'relative', overflow: 'hidden' }}>
          {/* Photo full background top half */}
          {image ? (
            <img src={image} alt="صورة" style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'top center',
              zIndex: 0,
            }} />
          ) : (
            <div style={{
              position: 'absolute', inset: 0,
              background: `linear-gradient(135deg, ${colors.primary}22, ${colors.secondary}33)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 0,
            }}>
              <div style={{ textAlign: 'center', opacity: 0.5 }}>
                <div style={{ fontSize: 56 + _d }}>👤</div>
                <span style={{ color: colors.primary, fontSize: 10 + _d }}>ارفع صورة</span>
              </div>
            </div>
          )}

          {/* Dark gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(to top, ${colors.primary}f0 0%, ${colors.primary}55 50%, transparent 100%)`,
            zIndex: 1,
          }} />

          {/* Name on photo */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '12px 20px',
            zIndex: 2,
          }}>
            <p style={{ color: colors.accent, fontSize: 9 + _d, margin: '0 0 2px', letterSpacing: 3, fontWeight: 700 }}>
              WEDDING INVITATION
            </p>
            <h1 style={{
              color: '#ffffff',
              fontSize: 36 + _d, fontWeight: 900,
              margin: 0, lineHeight: 1.0,
              textShadow: '0 2px 12px rgba(0,0,0,0.4)',
            }}>{title || 'سامح'}</h1>
          </div>
        </div>

        {/* Bottom info section */}
        <div style={{
          flex: 1,
          background: colors.bg || '#ffffff',
          padding: '16px 20px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          position: 'relative',
        }}>
          {/* Decorative top wave/line */}
          <svg style={{ position: 'absolute', top: -1, left: 0, right: 0, width: '100%', height: 10, pointerEvents: 'none' }} viewBox="0 0 352 10" preserveAspectRatio="none">
            <path d="M0,0 Q88,10 176,5 Q264,0 352,8 L352,0 Z" fill={colors.primary}/>
          </svg>

          <p style={{ color: '#666', fontSize: 10 + _d, margin: 0 }}>
            {subtitle || 'يتشرف الوالد بالدعوة الكريمة'}
          </p>

          {/* Event badge */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: `linear-gradient(90deg, ${colors.primary}15, ${colors.accent}15)`,
            borderRadius: 8, padding: '8px 14px',
            border: `1px solid ${colors.primary}22`,
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
              flexShrink: 0,
            }} />
            <p style={{ color: colors.primary, fontSize: 13 + _d, fontWeight: 800, margin: 0 }}>
              {lines[0] || 'المقيل والزفة والسمرة'}
            </p>
          </div>

          {/* Details row */}
          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { icon: '📅', label: 'التاريخ', val: lines[1] || '28 - 7 - 2025' },
              { icon: '📍', label: 'المكان', val: website || 'قاعة الأفراح' },
            ].map((item, i) => (
              <div key={i} style={{
                flex: 1,
                background: i === 0 ? `${colors.primary}0a` : `${colors.accent}0a`,
                borderRadius: 8, padding: '7px 10px',
                border: `1px solid ${i === 0 ? colors.primary : colors.accent}22`,
              }}>
                <p style={{ fontSize: 14 + _d, margin: '0 0 2px' }}>{item.icon}</p>
                <p style={{ color: '#999', fontSize: 8 + _d, margin: '0 0 2px', letterSpacing: 1 }}>{item.label}</p>
                <p style={{ color: i === 0 ? colors.primary : colors.secondary, fontSize: 11 + _d, fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
                  {item.val}
                </p>
              </div>
            ))}
          </div>

          {/* From line */}
          <div style={{
            marginTop: 'auto',
            paddingTop: 8, borderTop: '1px solid #eee',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <p style={{ color: '#aaa', fontSize: 9 + _d, margin: 0 }}>
              {email || 'أفراح آل الحاج'}
            </p>
            <div style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
              borderRadius: 20, padding: '4px 14px',
            }}>
              <p style={{ color: '#fff', fontSize: 9 + _d, fontWeight: 800, margin: 0 }}>تهنئة</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
