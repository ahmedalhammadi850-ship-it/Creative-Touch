import type { TemplateData } from '../../types/template';

interface Props { data: TemplateData; }

export default function CongratsTemplate4({ data }: Props) {
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
        display: 'flex',
      }}
    >
      {/* Left photo panel */}
      <div style={{
        width: 160,
        height: '100%',
        position: 'relative',
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
            background: `linear-gradient(160deg, ${colors.primary}88, ${colors.secondary}),
              repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.02) 10px, rgba(255,255,255,0.02) 20px)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: 8,
          }}>
            <div style={{ fontSize: 56 + _d }}>👤</div>
            <span style={{ color: '#ffffff55', fontSize: 9 + _d, textAlign: 'center', padding: '0 8px' }}>
              ارفع صورة<br/>من الشريط
            </span>
          </div>
        )}
        {/* Thin fade to right only for blending edge */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: 20, height: '100%',
          background: `linear-gradient(to left, ${colors.secondary}, transparent)`,
        }} />

        {/* WEDDING label over photo */}
        <div style={{
          position: 'absolute', top: 16, right: 0,
          background: colors.secondary,
          padding: '3px 10px 3px 16px',
        }}>
          <span style={{ color: colors.accent, fontSize: 10 + _d, fontWeight: 900, letterSpacing: 2 }}>WEDDING</span>
        </div>
        <div style={{
          position: 'absolute', top: 34, right: 0,
          background: colors.secondary + 'bb',
          padding: '2px 10px 2px 16px',
        }}>
          <span style={{ color: '#ffffffaa', fontSize: 9 + _d, letterSpacing: 1 }}>{title || 'بسم'}</span>
        </div>
      </div>

      {/* Right text panel */}
      <div style={{
        flex: 1,
        background: colors.secondary,
        display: 'flex',
        flexDirection: 'column',
        padding: '16px 14px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(circle at 80% 20%, ${colors.primary}22 0%, transparent 50%)`,
          pointerEvents: 'none',
        }} />

        {/* Calligraphy ornament */}
        <div style={{
          textAlign: 'center',
          fontSize: 11 + _d,
          color: colors.accent,
          marginBottom: 4,
          opacity: 0.9,
          letterSpacing: 2,
        }}>✦ ✦ ✦ ✦ ✦</div>

        <p style={{ color: '#ffffffaa', fontSize: 10 + _d, margin: '0 0 2px', textAlign: 'center' }}>بمناسبة زفاف نجلنا</p>

        <h1 style={{
          color: colors.accent,
          fontSize: 28 + _d,
          fontWeight: 900,
          margin: '4px 0',
          textAlign: 'center',
          lineHeight: 1.1,
          textShadow: `0 0 20px ${colors.accent}55`,
        }}>{title || 'باسم'}</h1>

        <div style={{
          width: '80%', height: 1,
          background: `linear-gradient(to right, transparent, ${colors.accent}, transparent)`,
          margin: '8px auto',
        }} />

        <p style={{ color: '#ffffffbb', fontSize: 10 + _d, margin: '0 0 2px', textAlign: 'center' }}>يتشرف</p>
        <p style={{
          color: '#ffffffe0',
          fontSize: 12 + _d,
          fontWeight: 700,
          textAlign: 'center',
          margin: '0 0 10px',
          lineHeight: 1.4,
        }}>{subtitle || 'الوالد والعائلة الكريمة'}</p>

        <p style={{ color: '#ffffffaa', fontSize: 10 + _d, margin: '0 0 8px', textAlign: 'center' }}>بدعوتكم لحضور</p>

        {/* Event type highlight */}
        <div style={{
          background: colors.accent,
          borderRadius: 4,
          padding: '4px 12px',
          textAlign: 'center',
          marginBottom: 8,
        }}>
          <span style={{ color: colors.secondary, fontSize: 12 + _d, fontWeight: 900 }}>
            {lines[0] || 'المقيل والزفة والسمرة'}
          </span>
        </div>

        {/* Details */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'center' }}>
          {(lines.length > 1 ? lines.slice(1) : ['يوم الأربعاء', '28-7-2021']).map((line, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              {i === 0 && (
                <p style={{ color: '#ffffffaa', fontSize: 9 + _d, margin: '0 0 2px' }}>يوم</p>
              )}
              <p style={{
                color: i === 1 ? colors.accent : '#ffffffee',
                fontSize: i === 1 ? 18 : 12,
                fontWeight: i === 1 ? 900 : 600,
                margin: 0,
              }}>{line}</p>
            </div>
          ))}

          {website && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center', marginTop: 4 }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: colors.accent }} />
              <p style={{ color: '#ffffffcc', fontSize: 10 + _d, margin: 0 }}>{website}</p>
            </div>
          )}
        </div>

        {/* From */}
        {email && (
          <div style={{
            marginTop: 8,
            borderTop: `1px solid ${colors.accent}33`,
            paddingTop: 6,
            textAlign: 'center',
          }}>
            <p style={{ color: colors.accent, fontSize: 9 + _d, margin: 0, fontWeight: 600 }}>{email}</p>
          </div>
        )}
      </div>
    </div>
  );
}
