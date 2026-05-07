import type { TemplateData } from '../../types/template';

interface Props { data: TemplateData; }

export default function CongratsTemplate1({ data }: Props) {
  const { title, subtitle, description, email, colors, image } = data;
  const lines = (description || '').split('\n').filter(Boolean);

  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div
      id="template-preview"
      style={{
        width: 360,
        height: 460,
        background: colors.primary,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Cairo, sans-serif',
        direction: 'rtl',
        display: 'flex',
      }}
    >
      {/* Decorative dots pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(circle, ${colors.accent}22 1px, transparent 1px)`,
        backgroundSize: '20px 20px',
        pointerEvents: 'none',
      }} />

      {/* Photo area — left side */}
      <div style={{
        width: 160,
        height: '100%',
        position: 'relative',
        flexShrink: 0,
        overflow: 'hidden',
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
            background: `linear-gradient(180deg, ${colors.secondary}88, ${colors.primary})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: 8,
          }}>
            <div style={{ fontSize: 48 + _d }}>👤</div>
            <span style={{ color: '#ffffff88', fontSize: 10 + _d, textAlign: 'center', padding: '0 8px' }}>
              ارفع صورة<br/>من الشريط الجانبي
            </span>
          </div>
        )}
        {/* Thin fade to right only for blending edge */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: 50, height: '100%',
          background: `linear-gradient(to left, ${colors.primary}, transparent)`,
        }} />
      </div>

      {/* Right text content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '16px 14px 16px 8px',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Calligraphy ornament */}
        <div style={{
          textAlign: 'center',
          fontSize: 28 + _d,
          marginBottom: 6,
          opacity: 0.85,
        }}>☪️</div>

        <p style={{
          color: '#ffffffcc',
          fontSize: 11 + _d,
          margin: '0 0 4px',
          fontWeight: 500,
          textAlign: 'center',
        }}>نهديها ونزفها</p>

        {/* Name */}
        <h1 style={{
          color: colors.accent,
          fontSize: 24 + _d,
          fontWeight: 900,
          margin: '4px 0',
          textAlign: 'center',
          lineHeight: 1.2,
          textShadow: `0 2px 8px ${colors.accent}55`,
        }}>{title || 'عبد العزيز'}</h1>

        <p style={{
          color: '#ffffffbb',
          fontSize: 11 + _d,
          margin: '2px 0 10px',
          textAlign: 'center',
          fontWeight: 600,
        }}>{subtitle || 'يتشرف الوالد'}</p>

        {/* Decorative divider */}
        <div style={{
          width: '70%', height: 1,
          background: `linear-gradient(to right, transparent, ${colors.accent}, transparent)`,
          margin: '0 auto 10px',
        }} />

        {/* Event details */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {lines.length > 0 ? lines.map((line, i) => (
            <p key={i} style={{
              color: '#ffffffdd',
              fontSize: 11 + _d,
              margin: 0,
              textAlign: 'center',
              lineHeight: 1.5,
            }}>{line}</p>
          )) : (
            <>
              <p style={{ color: '#ffffffdd', fontSize: 11 + _d, margin: 0, textAlign: 'center' }}>وذلك بمناسبة زفافه الميمون</p>
              <p style={{ color: colors.accent, fontSize: 13 + _d, margin: 0, textAlign: 'center', fontWeight: 700 }}>ألف ألف مبروك</p>
              <p style={{ color: '#ffffffaa', fontSize: 11 + _d, margin: 0, textAlign: 'center' }}>ودام الله السرور</p>
            </>
          )}
        </div>

        {/* Extra text / from */}
        {email && (
          <div style={{
            marginTop: 10,
            background: `${colors.accent}22`,
            borderRadius: 8,
            padding: '4px 8px',
            border: `1px solid ${colors.accent}44`,
          }}>
            <p style={{ color: colors.accent, fontSize: 10 + _d, margin: 0, textAlign: 'center', fontWeight: 600 }}>{email}</p>
          </div>
        )}
      </div>
    </div>
  );
}
