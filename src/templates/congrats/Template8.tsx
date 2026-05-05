import type { TemplateData } from '../../types/template';

interface Props { data: TemplateData; }

export default function CongratsTemplate8({ data }: Props) {
  const { title, subtitle, description, email, website, colors, image } = data;
  const lines = (description || '').split('\n').filter(Boolean);

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
      {/* Left text panel */}
      <div style={{
        width: 200,
        height: '100%',
        background: colors.primary,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 18px',
        zIndex: 2,
        flexShrink: 0,
      }}>
        {/* SVG decorations inside left panel */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 200 460">
          {/* Subtle dot grid */}
          {Array.from({ length: 4 }).map((_, row) =>
            Array.from({ length: 3 }).map((_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={20 + col * 30}
                cy={380 + row * 20}
                r="1.5"
                fill="#ffffff"
                opacity="0.15"
              />
            ))
          )}
          {/* Top accent line */}
          <line x1="18" y1="56" x2="182" y2="56" stroke={colors.accent} strokeWidth="1" opacity="0.5"/>
          {/* Diamond accent */}
          <polygon points="100,22 107,30 100,38 93,30" fill={colors.accent}/>
          {/* Bottom separator */}
          <line x1="18" y1="395" x2="182" y2="395" stroke={colors.accent} strokeWidth="0.5" opacity="0.4"/>
        </svg>

        {/* Top badge */}
        <div style={{
          textAlign: 'center',
          paddingBottom: 16,
          paddingTop: 6,
          position: 'relative',
          zIndex: 1,
        }}>
          <p style={{
            color: '#ffffff',
            fontSize: 9,
            fontWeight: 700,
            margin: 0,
            letterSpacing: 3,
            opacity: 0.7,
          }}>WEDDING CARD</p>
        </div>

        {/* Main text */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8, position: 'relative', zIndex: 1 }}>
          <h1 style={{
            color: '#ffffff',
            fontSize: 38,
            fontWeight: 900,
            margin: 0,
            lineHeight: 1.0,
          }}>{title || 'عمار'}</h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ height: 2, width: 24, background: colors.accent }} />
            <div style={{ height: 2, width: 10, background: '#ffffff44' }} />
          </div>

          <p style={{ color: '#ffffffbb', fontSize: 10, margin: 0 }}>يتشرف بدعوتكم</p>

          <p style={{
            color: '#ffffffee',
            fontSize: 13,
            fontWeight: 700,
            margin: '0 0 4px',
            lineHeight: 1.4,
          }}>{subtitle || 'الوالد عبد الله علي'}</p>

          {/* Event tag */}
          <div style={{
            background: colors.accent,
            padding: '5px 12px',
            display: 'inline-block',
            width: 'fit-content',
            borderRadius: 2,
          }}>
            <span style={{ color: colors.primary, fontSize: 12, fontWeight: 900 }}>
              {lines[0] || 'المقيل والزفة'}
            </span>
          </div>

          {/* Date / details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 2 }}>
            {(lines.length > 1 ? lines.slice(1) : ['yom Al-Ahad', '2 - 7 - 2023']).map((l, i) => (
              <p key={i} style={{
                color: i === 1 ? colors.accent : '#ffffffcc',
                fontSize: i === 1 ? 16 : 10,
                fontWeight: i === 1 ? 900 : 500,
                margin: 0,
              }}>{l}</p>
            ))}
            {website && (
              <p style={{ color: '#ffffffaa', fontSize: 9, margin: '2px 0 0' }}>📍 {website}</p>
            )}
          </div>
        </div>

        {/* From footer */}
        {email && (
          <div style={{
            paddingTop: 10,
            borderTop: '1px solid rgba(255,255,255,0.15)',
            position: 'relative',
            zIndex: 1,
          }}>
            <p style={{ color: colors.accent, fontSize: 9, margin: 0, fontWeight: 700 }}>{email}</p>
          </div>
        )}
      </div>

      {/* Diagonal accent strip */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 193,
        width: 20,
        height: '100%',
        zIndex: 3,
        pointerEvents: 'none',
      }}>
        <svg width="20" height="460" viewBox="0 0 20 460">
          <polygon points="0,0 20,0 20,460 0,460" fill={colors.accent}/>
          <polygon points="0,0 12,0 20,460 8,460" fill="#ffffff" opacity="0.2"/>
        </svg>
      </div>

      {/* Right photo panel */}
      <div style={{
        flex: 1,
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(160deg, ${colors.primary}22, ${colors.bg || '#f0f4fa'})`,
      }}>
        {image ? (
          <img
            src={image}
            alt="صورة"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top center',
              display: 'block',
            }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 8,
            background: `linear-gradient(160deg, ${colors.primary}18, ${colors.accent}18)`,
          }}>
            <div style={{ fontSize: 56, opacity: 0.5 }}>👤</div>
            <span style={{ color: `${colors.primary}66`, fontSize: 10, textAlign: 'center' }}>
              ارفع صورة<br/>من الشريط الجانبي
            </span>
          </div>
        )}

        {/* Decorative circles on photo */}
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 140 460">
          <circle cx="120" cy="40" r="30" fill="none" stroke={colors.primary} strokeWidth="1" opacity="0.2"/>
          <circle cx="110" cy="420" r="25" fill="none" stroke={colors.accent} strokeWidth="0.8" opacity="0.25"/>
        </svg>
      </div>
    </div>
  );
}
