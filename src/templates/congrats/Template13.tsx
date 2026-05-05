import type { TemplateData } from '../../types/template';

interface Props { data: TemplateData; }

export default function CongratsTemplate13({ data }: Props) {
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
        background: colors.bg || '#d4b896',
      }}
    >
      {/* Sand texture gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 50% 0%, ${colors.bg || '#e8d5b7'} 0%, ${colors.secondary || '#c4a07a'} 100%)`,
        zIndex: 0,
      }} />

      {/* Top text area */}
      <div style={{
        position: 'relative', zIndex: 2,
        textAlign: 'center',
        padding: '18px 24px 0',
      }}>
        <p style={{ color: colors.primary, fontSize: 11, margin: '0 0 3px', fontWeight: 600, opacity: 0.8 }}>
          {email || 'أفراح آل باشا'}
        </p>
        <h1 style={{
          color: colors.primary,
          fontSize: 26, fontWeight: 900,
          margin: '0 0 3px', lineHeight: 1.1,
        }}>{title || 'نسيم فضل باشا'}</h1>
        <p style={{ color: colors.primary, fontSize: 10, margin: '0 0 4px', opacity: 0.75, lineHeight: 1.4 }}>
          {lines[0] || 'المقيل والسمرة - من نجل الشيخ عبدرب باشا'}
        </p>
        <p style={{ color: colors.primary, fontSize: 9, margin: 0, opacity: 0.65 }}>
          {website || 'خوالة فوق دوحة باب'}
        </p>

        {/* Date badge */}
        <div style={{
          display: 'inline-block',
          background: colors.primary,
          borderRadius: 3,
          padding: '3px 16px',
          marginTop: 8,
        }}>
          <span style={{ color: colors.accent, fontSize: 11, fontWeight: 800 }}>
            {lines[1] || 'الأحد'} &nbsp; {dateText}
          </span>
        </div>
      </div>

      {/* Full-body photo — center */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 240,
        height: 310,
        zIndex: 1,
        overflow: 'hidden',
      }}>
        {image ? (
          <img src={image} alt="صورة"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
            gap: 8, opacity: 0.5,
          }}>
            <div style={{ fontSize: 72 }}>👤</div>
            <span style={{ color: colors.primary, fontSize: 10 }}>ارفع صورة كاملة</span>
          </div>
        )}
      </div>

      {/* 3D Date at bottom-right */}
      <div style={{
        position: 'absolute',
        bottom: 8,
        left: 10,
        zIndex: 3,
        lineHeight: 0.85,
      }}>
        <div style={{
          fontSize: 48,
          fontWeight: 900,
          color: colors.primary,
          textShadow: `3px 3px 0 ${colors.accent}, 5px 5px 0 rgba(0,0,0,0.15)`,
          letterSpacing: -1,
          transform: 'perspective(200px) rotateY(8deg)',
          display: 'inline-block',
        }}>
          {dateText}
        </div>
      </div>

      {/* Watermark bottom right */}
      <div style={{
        position: 'absolute', bottom: 10, right: 12, zIndex: 3,
      }}>
        <p style={{ color: `${colors.primary}55`, fontSize: 8, margin: 0, fontStyle: 'italic' }}>
          {subtitle || 'تفضلي'}
        </p>
      </div>
    </div>
  );
}
