import type { TemplateData } from '../../types/template';

interface Props { data: TemplateData; }

export default function CongratsTemplate15({ data }: Props) {
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
        background: colors.bg || '#e2c99a',
      }}
    >
      {/* Warm gradient bg */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(135deg, ${colors.bg || '#eedcb8'} 30%, ${colors.secondary || '#c4924a'} 100%)`,
        zIndex: 0,
      }} />

      {/* Photo — left side, full height */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, bottom: 0,
        width: 190,
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
            flexDirection: 'column', gap: 8, opacity: 0.5,
          }}>
            <div style={{ fontSize: 64 }}>👤</div>
            <span style={{ color: colors.primary, fontSize: 9 }}>صورة العريس</span>
          </div>
        )}
        {/* Right fade */}
        <div style={{
          position: 'absolute', top: 0, right: 0, width: 50, height: '100%',
          background: `linear-gradient(to left, ${colors.bg || '#e2c99a'}, transparent)`,
        }} />
      </div>

      {/* Right text panel */}
      <div style={{
        position: 'absolute',
        top: 0, right: 0, bottom: 0,
        width: 185,
        zIndex: 2,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        padding: '20px 16px 14px 10px',
      }}>
        {/* Top label */}
        <div>
          <p style={{ color: colors.primary, fontSize: 11, fontWeight: 700, margin: '0 0 2px', opacity: 0.8 }}>
            {email || 'أفراح آل باشا'}
          </p>
          <div style={{ height: 1.5, background: colors.primary, opacity: 0.25, marginBottom: 8 }} />
          <p style={{ color: colors.primary, fontSize: 9, margin: 0, opacity: 0.65 }}>
            لفخامة العريس الغالي
          </p>
          <h1 style={{
            color: colors.primary,
            fontSize: 26, fontWeight: 900,
            margin: '2px 0 6px', lineHeight: 1.0,
          }}>{title || 'نسيم باشا'}</h1>
          <p style={{ color: colors.primary, fontSize: 9, margin: 0, lineHeight: 1.5, opacity: 0.75 }}>
            {lines[0] || 'المقيل والزفة والسمرة'}
          </p>
          <p style={{ color: colors.primary, fontSize: 9, margin: '3px 0', opacity: 0.6 }}>
            {subtitle || 'من نجل الشيخ عبدرب باشا'}
          </p>
          <p style={{ color: colors.primary, fontSize: 9, margin: 0, opacity: 0.6 }}>
            {website || '📍 خوالة فوق دوحة باب'}
          </p>
        </div>

        {/* Date badge */}
        <div style={{
          background: colors.primary,
          borderRadius: 3,
          padding: '4px 10px',
          alignSelf: 'flex-start',
          marginTop: 8,
        }}>
          <span style={{ color: colors.accent, fontSize: 11, fontWeight: 800 }}>
            {lines[1] || 'الأحد'}
          </span>
        </div>

        {/* Big date number */}
        <div style={{ marginTop: 'auto' }}>
          <div style={{
            fontSize: 50,
            fontWeight: 900,
            color: colors.primary,
            textShadow: `3px 3px 0 ${colors.accent}bb, 5px 5px 0 rgba(0,0,0,0.1)`,
            letterSpacing: -2,
            lineHeight: 0.9,
            transform: 'perspective(180px) rotateY(6deg)',
            display: 'inline-block',
          }}>
            {dateText}
          </div>
        </div>
      </div>
    </div>
  );
}
