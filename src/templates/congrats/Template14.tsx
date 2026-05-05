import type { TemplateData } from '../../types/template';

interface Props { data: TemplateData; }

export default function CongratsTemplate14({ data }: Props) {
  const { title, subtitle, description, email, website, colors, image } = data;
  const lines = (description || '').split('\n').filter(Boolean);
  const dateText = lines[2] || '28.7.2025';

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
        background: `linear-gradient(170deg, ${colors.bg || '#e8d5b7'} 0%, ${colors.secondary || '#c9a87a'} 100%)`,
      }}
    >
      {/* Subtle vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(0,0,0,0.15) 100%)',
        zIndex: 0,
      }} />

      {/* Top info strip */}
      <div style={{
        position: 'relative', zIndex: 2,
        background: colors.primary,
        padding: '10px 20px',
        textAlign: 'center',
      }}>
        <p style={{ color: colors.accent, fontSize: 12, margin: 0, fontWeight: 700 }}>
          {email || 'أفراح آل القيسي'}
        </p>
      </div>

      {/* Name block */}
      <div style={{
        position: 'relative', zIndex: 2,
        textAlign: 'center',
        padding: '12px 24px 0',
      }}>
        <p style={{ color: colors.primary, fontSize: 10, margin: '0 0 2px', opacity: 0.7 }}>
          لفخامة العريس الغالي
        </p>
        <h1 style={{
          color: colors.primary,
          fontSize: 28, fontWeight: 900,
          margin: '0 0 4px', lineHeight: 1.0,
        }}>{title || 'سامي باشا'}</h1>
        <p style={{ color: colors.primary, fontSize: 10, margin: 0, opacity: 0.7, lineHeight: 1.4 }}>
          {lines[0] || 'المقيل والزفة والسمرة - من نجل الشيخ'}
        </p>
        <p style={{ color: colors.primary, fontSize: 9, margin: '2px 0 0', opacity: 0.6 }}>
          {website || '📍 قاعة الأفراح - المدينة'}
        </p>
      </div>

      {/* Photo — right-aligned full body */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        right: 20,
        width: 200,
        height: 290,
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
            gap: 8, opacity: 0.4,
          }}>
            <div style={{ fontSize: 68 }}>👤</div>
            <span style={{ color: colors.primary, fontSize: 9 }}>صورة كاملة</span>
          </div>
        )}
        {/* Left fade */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: 40, height: '100%',
          background: `linear-gradient(to right, ${colors.bg || '#e8d5b7'}, transparent)`,
        }} />
      </div>

      {/* Big 3D date — bottom left */}
      <div style={{
        position: 'absolute',
        bottom: 14,
        left: 12,
        zIndex: 3,
      }}>
        <div style={{
          fontSize: 44,
          fontWeight: 900,
          color: colors.primary,
          textShadow: `2px 2px 0 ${colors.accent}cc, 4px 4px 0 rgba(0,0,0,0.2)`,
          letterSpacing: -2,
          transform: 'perspective(200px) rotateY(10deg)',
          display: 'inline-block',
          lineHeight: 1,
        }}>
          {dateText}
        </div>
        <p style={{ color: `${colors.primary}88`, fontSize: 9, margin: '2px 0 0' }}>
          {lines[1] || 'الأحد'}
        </p>
      </div>

      {/* Watermark */}
      <div style={{ position: 'absolute', bottom: 10, right: 12, zIndex: 3 }}>
        <p style={{ color: `${colors.primary}44`, fontSize: 8, margin: 0, fontStyle: 'italic' }}>
          {subtitle || 'تفضلي'}
        </p>
      </div>
    </div>
  );
}
