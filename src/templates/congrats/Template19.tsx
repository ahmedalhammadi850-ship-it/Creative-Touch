import type { TemplateData } from '../../types/template';

interface Props { data: TemplateData; }

export default function CongratsTemplate19({ data }: Props) {
  const { title, subtitle, description, email, website, colors, image } = data;
  const lines = (description || '').split('\n').filter(Boolean);
  const nameChars = (title || 'محمد').split('');

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
        background: colors.bg || '#f8f8f8',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top color block */}
      <div style={{
        height: 240,
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        {/* Geometric shapes */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 360 240">
          <circle cx="320" cy="-20" r="100" fill="#ffffff" opacity="0.05"/>
          <circle cx="320" cy="-20" r="70" fill="#ffffff" opacity="0.06"/>
          <polygon points="0,240 80,140 160,240" fill="#ffffff" opacity="0.04"/>
          <polygon points="200,240 300,100 360,240" fill="#ffffff" opacity="0.04"/>
          <line x1="0" y1="200" x2="360" y2="200" stroke={colors.accent} strokeWidth="0.5" opacity="0.3"/>
        </svg>

        {/* Photo — angled clip */}
        {image && (
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            clipPath: 'polygon(0 0, 55% 0, 45% 100%, 0 100%)',
            overflow: 'hidden',
          }}>
            <img src={image} alt="صورة"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: `linear-gradient(to right, transparent 60%, ${colors.primary})`,
            }} />
          </div>
        )}

        {!image && (
          <div style={{
            position: 'absolute', top: 20, right: 20,
            width: 80, height: 80, borderRadius: '50%',
            background: '#ffffff22',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 36 + _d,
          }}>👤</div>
        )}

        {/* Text on color block */}
        <div style={{
          position: 'absolute',
          top: 0, right: 0, bottom: 0,
          width: image ? '60%' : '100%',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '20px 20px 20px 10px',
          zIndex: 2,
        }}>
          <p style={{ color: colors.accent, fontSize: 9 + _d, margin: '0 0 4px', letterSpacing: 3, fontWeight: 700 }}>
            WEDDING · {new Date().getFullYear()}
          </p>
          <h1 style={{
            color: '#ffffff',
            fontSize: 38 + _d, fontWeight: 900,
            margin: '0 0 6px', lineHeight: 1.0,
            textShadow: '0 2px 20px rgba(0,0,0,0.3)',
          }}>{title || 'محمد'}</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10 + _d, margin: 0, lineHeight: 1.5 }}>
            {subtitle || 'يتشرف الوالد بالدعوة'}
          </p>
        </div>
      </div>

      {/* White content area */}
      <div style={{
        flex: 1,
        background: colors.bg || '#f8f8f8',
        padding: '20px 24px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        position: 'relative',
      }}>
        {/* Accent strip on right edge */}
        <div style={{
          position: 'absolute', top: 0, left: 0, bottom: 0, width: 4,
          background: `linear-gradient(to bottom, ${colors.primary}, ${colors.accent})`,
        }} />

        {/* Event info */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          paddingRight: 14,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, fontSize: 18 + _d,
          }}>🎊</div>
          <div>
            <p style={{ color: colors.primary, fontSize: 13 + _d, fontWeight: 800, margin: 0 }}>
              {lines[0] || 'المقيل والزفة والسمرة'}
            </p>
            <p style={{ color: '#888', fontSize: 10 + _d, margin: '2px 0 0' }}>
              {email || 'أفراح آل الحاج'}
            </p>
          </div>
        </div>

        <div style={{ height: 1, background: '#eee' }} />

        {/* Date & Location */}
        <div style={{ display: 'flex', gap: 10, paddingRight: 14 }}>
          <div style={{
            flex: 1, background: `${colors.primary}0d`, borderRadius: 8,
            padding: '8px 12px', border: `1px solid ${colors.primary}22`,
          }}>
            <p style={{ color: '#888', fontSize: 8 + _d, margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: 1 }}>التاريخ</p>
            <p style={{ color: colors.primary, fontSize: 14 + _d, fontWeight: 900, margin: 0 }}>
              {lines[1] || '28 - 7 - 2025'}
            </p>
          </div>
          <div style={{
            flex: 1, background: `${colors.accent}0d`, borderRadius: 8,
            padding: '8px 12px', border: `1px solid ${colors.accent}33`,
          }}>
            <p style={{ color: '#888', fontSize: 8 + _d, margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: 1 }}>المكان</p>
            <p style={{ color: colors.secondary, fontSize: 10 + _d, fontWeight: 700, margin: 0, lineHeight: 1.3 }}>
              {website || 'قاعة الأفراح'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
