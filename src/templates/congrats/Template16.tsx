import type { TemplateData } from '../../types/template';

interface Props { data: TemplateData; }

export default function CongratsTemplate16({ data }: Props) {
  const { title, subtitle, description, email, website, colors, image } = data;
  const lines = (description || '').split('\n').filter(Boolean);
  const dateText = lines[2] || '2.7.2023';

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
        background: colors.bg || '#dfc498',
      }}
    >
      {/* Background gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 30% 0%, ${colors.bg || '#f0ddb8'} 0%, ${colors.secondary || '#b88c50'} 100%)`,
        zIndex: 0,
      }} />

      {/* Top header strip */}
      <div style={{
        position: 'relative', zIndex: 2,
        textAlign: 'center',
        padding: '14px 30px 8px',
      }}>
        <p style={{ color: colors.primary, fontSize: 13, fontWeight: 700, margin: '0 0 2px' }}>
          {email || 'أفراح آل باشا'}
        </p>
        <h1 style={{
          color: colors.primary,
          fontSize: 24, fontWeight: 900,
          margin: '0 0 2px', lineHeight: 1.1,
        }}>{title || 'نسيم فضل باشا'}</h1>
        <p style={{ color: colors.primary, fontSize: 9, margin: 0, opacity: 0.7, lineHeight: 1.5 }}>
          {lines[0] || 'المقيل والسمرة - من نجل الشيخ عبدرب باشا'}
        </p>
        <p style={{ color: colors.primary, fontSize: 9, margin: '1px 0 0', opacity: 0.6 }}>
          {website || '📍 خوالة فوق دوحة باب'}
        </p>

        {/* Date pill */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: colors.primary,
          borderRadius: 4,
          padding: '3px 14px',
          marginTop: 8,
        }}>
          <span style={{ color: colors.accent, fontSize: 11, fontWeight: 800 }}>
            {lines[1] || 'الأحد'}
          </span>
          <span style={{ color: '#ffffff55', fontSize: 10 }}>|</span>
          <span style={{ color: colors.accent, fontSize: 11, fontWeight: 800 }}>
            {dateText}
          </span>
        </div>
      </div>

      {/* Full-body photo — centered, takes lower 2/3 */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-55%)',
        width: 220,
        height: 295,
        zIndex: 1,
        overflow: 'hidden',
      }}>
        {image ? (
          <img src={image} alt="صورة"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: 8, opacity: 0.45,
          }}>
            <div style={{ fontSize: 76 }}>👤</div>
            <span style={{ color: colors.primary, fontSize: 9 }}>ارفع صورة كاملة</span>
          </div>
        )}
        {/* Bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 30,
          background: `linear-gradient(to top, ${colors.bg || '#dfc498'}, transparent)`,
        }} />
      </div>

      {/* Big 3D date — bottom right corner */}
      <div style={{
        position: 'absolute',
        bottom: 10,
        left: 8,
        zIndex: 4,
      }}>
        <div style={{
          fontSize: 52,
          fontWeight: 900,
          color: colors.primary,
          textShadow: `
            2px 2px 0 ${colors.accent},
            4px 4px 0 ${colors.accent}99,
            6px 6px 0 rgba(0,0,0,0.12)
          `,
          letterSpacing: -2,
          lineHeight: 0.9,
          transform: 'perspective(200px) rotateY(8deg) skewY(-1deg)',
          display: 'inline-block',
        }}>
          {dateText}
        </div>
      </div>

      {/* App watermark bottom-right */}
      <div style={{ position: 'absolute', bottom: 10, right: 10, zIndex: 4 }}>
        <p style={{ color: `${colors.primary}44`, fontSize: 8, margin: 0, fontStyle: 'italic' }}>
          {subtitle || 'تفضلي'}
        </p>
      </div>

      {/* Subtle SVG corner ornaments */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 3 }} viewBox="0 0 360 460">
        <g opacity="0.25">
          <path d="M0,0 L22,0 M0,0 L0,22" stroke={colors.primary} strokeWidth="2.5" fill="none"/>
          <path d="M360,0 L338,0 M360,0 L360,22" stroke={colors.primary} strokeWidth="2.5" fill="none"/>
          <path d="M0,460 L22,460 M0,460 L0,438" stroke={colors.primary} strokeWidth="2.5" fill="none"/>
          <path d="M360,460 L338,460 M360,460 L360,438" stroke={colors.primary} strokeWidth="2.5" fill="none"/>
        </g>
      </svg>
    </div>
  );
}
