import type { TemplateData } from '../../types/template';

interface Props { data: TemplateData; }

export default function CongratsTemplate6({ data }: Props) {
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
        background: colors.bg || '#111',
      }}
    >
      {/* Full background photo */}
      {image ? (
        <img src={image} alt="صورة"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'top center',
            zIndex: 0,
          }} />
      ) : (
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(160deg, ${colors.primary}66 0%, ${colors.secondary}99 100%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: 8, zIndex: 0,
        }}>
          <div style={{ fontSize: 64 + _d, opacity: 0.5 }}>👤</div>
          <span style={{ color: '#ffffff55', fontSize: 11 + _d }}>ارفع صورة لتملأ الخلفية كاملة</span>
        </div>
      )}

      {/* Right overlay panel */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: 200, height: '100%',
        background: `linear-gradient(100deg, ${colors.primary}f0 60%, ${colors.primary}00 100%)`,
        zIndex: 1,
      }} />

      {/* SVG geometric decorations */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 2, pointerEvents: 'none' }} viewBox="0 0 360 460">
        {/* Top-left geometric lines */}
        <line x1="0" y1="60" x2="160" y2="60" stroke={colors.accent} strokeWidth="1" opacity="0.6"/>
        <line x1="0" y1="64" x2="120" y2="64" stroke={colors.accent} strokeWidth="0.4" opacity="0.4"/>
        {/* Bottom-left geometric lines */}
        <line x1="0" y1="400" x2="180" y2="400" stroke={colors.accent} strokeWidth="1" opacity="0.6"/>
        <line x1="0" y1="396" x2="140" y2="396" stroke={colors.accent} strokeWidth="0.4" opacity="0.4"/>
        {/* Right side dots */}
        {[80, 120, 160, 200, 220].map((y, i) => (
          <circle key={i} cx={320 + (i % 2) * 10} cy={y} r="2" fill={colors.accent} opacity="0.4"/>
        ))}
        {/* Diamond at top */}
        <polygon points="30,20 38,30 30,40 22,30" fill="none" stroke={colors.accent} strokeWidth="1" opacity="0.7"/>
        <polygon points="30,24 34,30 30,36 26,30" fill={colors.accent} opacity="0.3"/>
      </svg>

      {/* Text content — left side */}
      <div style={{
        position: 'absolute', top: 0, right: 160, left: 0, bottom: 0,
        zIndex: 3,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '20px 16px 20px 20px',
        gap: 8,
      }}>
        <p style={{ color: colors.accent, fontSize: 10 + _d, margin: 0, fontWeight: 700, letterSpacing: 2 }}>
          ✦ WEDDING ✦
        </p>

        <h1 style={{
          color: '#ffffff',
          fontSize: 34 + _d, fontWeight: 900,
          margin: '4px 0', lineHeight: 1.0,
          textShadow: '0 2px 12px rgba(0,0,0,0.5)',
        }}>{title || 'سامح'}</h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ width: 30, height: 1.5, background: colors.accent }} />
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: colors.accent }} />
        </div>

        <p style={{ color: '#ffffffcc', fontSize: 10 + _d, margin: 0 }}>يتشرف الوالد</p>
        <p style={{ color: colors.accent, fontSize: 13 + _d, fontWeight: 700, margin: '0 0 6px', lineHeight: 1.3 }}>
          {subtitle || 'أحمد سعيد'}
        </p>

        <p style={{ color: '#ffffffaa', fontSize: 10 + _d, margin: '0 0 4px' }}>بدعوتكم لحضور</p>

        <div style={{
          background: colors.accent,
          padding: '4px 10px',
          borderRadius: 2,
          display: 'inline-block',
          width: 'fit-content',
        }}>
          <span style={{ color: colors.primary, fontSize: 11 + _d, fontWeight: 900 }}>
            {lines[0] || 'المقيل والزفة'}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 4 }}>
          {(lines.length > 1 ? lines.slice(1) : ['الجمعة', '28 - 7 - 2025']).map((l, i) => (
            <p key={i} style={{
              color: i === 1 ? colors.accent : '#ffffffdd',
              fontSize: i === 1 ? 16 : 11,
              fontWeight: i === 1 ? 900 : 500,
              margin: 0,
            }}>{l}</p>
          ))}
          {website && (
            <p style={{ color: '#ffffffaa', fontSize: 10 + _d, margin: '4px 0 0' }}>📍 {website}</p>
          )}
        </div>

        {email && (
          <div style={{
            marginTop: 'auto',
            paddingTop: 8,
            borderTop: `1px solid ${colors.accent}44`,
          }}>
            <p style={{ color: colors.accent, fontSize: 9 + _d, margin: 0, fontWeight: 600 }}>{email}</p>
          </div>
        )}
      </div>
    </div>
  );
}
