import type { TemplateData } from '../../types/template';

interface Props { data: TemplateData; }

export default function CongratsTemplate2({ data }: Props) {
  const { title, subtitle, description, website, email, colors, image } = data;
  const lines = (description || '').split('\n').filter(Boolean);

  return (
    <div
      id="template-preview"
      style={{
        width: 360,
        height: 460,
        background: colors.bg || '#0a0a0a',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Cairo, sans-serif',
        direction: 'rtl',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Subtle background texture */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 80% 20%, ${colors.primary}33 0%, transparent 60%)`,
        pointerEvents: 'none',
      }} />

      {/* Top section */}
      <div style={{ display: 'flex', height: 280, position: 'relative' }}>
        {/* Left text */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '20px 10px 20px 16px',
          zIndex: 1,
        }}>
          {/* Ornament */}
          <div style={{ fontSize: 22, marginBottom: 8, opacity: 0.9 }}>✦ ✦ ✦</div>

          <p style={{
            color: '#ffffffaa',
            fontSize: 12,
            margin: '0 0 4px',
            fontWeight: 500,
          }}>سروراً وابتهاجاً بزفاف</p>

          <h1 style={{
            color: colors.accent,
            fontSize: 32,
            fontWeight: 900,
            margin: '4px 0',
            lineHeight: 1.1,
            textShadow: `0 0 20px ${colors.accent}66`,
          }}>{title || 'سامح'}</h1>

          <div style={{
            width: '60%', height: 1,
            background: `linear-gradient(to right, ${colors.accent}, transparent)`,
            margin: '8px 0',
          }} />

          <p style={{ color: '#ffffffaa', fontSize: 11, margin: '0 0 2px' }}>يتشرف الوالد</p>
          <p style={{
            color: '#ffffffee',
            fontSize: 14,
            fontWeight: 700,
            margin: '0 0 10px',
          }}>{subtitle || 'أحمد سعيد الحاج'}</p>

          <p style={{ color: '#ffffff88', fontSize: 11, margin: '0 0 6px' }}>بدعوتكم لحضور</p>

          {/* Event type badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {(lines.length > 0 ? lines.slice(0, 2) : ['المقيل والزفة']).map((line, i) => (
              <div key={i} style={{
                background: colors.accent,
                color: colors.bg || '#000',
                borderRadius: 4,
                padding: '3px 10px',
                fontSize: 11,
                fontWeight: 700,
              }}>{line}</div>
            ))}
          </div>
        </div>

        {/* Right photo */}
        <div style={{
          width: 155,
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
        }}>
          {image ? (
            <img
              src={image}
              alt="صورة"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
            />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              background: `linear-gradient(180deg, ${colors.primary}66, ${colors.bg || '#111'})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: 6,
            }}>
              <div style={{ fontSize: 52 }}>👤</div>
              <span style={{ color: '#ffffff55', fontSize: 9, textAlign: 'center' }}>ارفع صورة</span>
            </div>
          )}
          {/* Thin fade left for edge blend only */}
          <div style={{
            position: 'absolute', top: 0, left: 0,
            width: 16, height: '100%',
            background: `linear-gradient(to right, ${colors.bg || '#0a0a0a'}, transparent)`,
          }} />
        </div>
      </div>

      {/* Bottom info */}
      <div style={{
        flex: 1,
        borderTop: `1px solid ${colors.accent}33`,
        padding: '14px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        position: 'relative',
        zIndex: 1,
      }}>
        {lines.length > 2 ? lines.slice(2).map((line, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: colors.accent, flexShrink: 0 }} />
            <p style={{ color: '#ffffffcc', fontSize: 12, margin: 0 }}>{line}</p>
          </div>
        )) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: colors.accent, flexShrink: 0 }} />
              <p style={{ color: '#ffffffcc', fontSize: 12, margin: 0 }}>الجمعة 29.08.2025</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: colors.accent, flexShrink: 0 }} />
              <p style={{ color: '#ffffffcc', fontSize: 12, margin: 0 }}>{website || 'المخا - مدينة الكهرباء'}</p>
            </div>
          </>
        )}
        {email && (
          <p style={{ color: colors.accent, fontSize: 11, margin: '4px 0 0', fontWeight: 700 }}>{email}</p>
        )}
      </div>
    </div>
  );
}
