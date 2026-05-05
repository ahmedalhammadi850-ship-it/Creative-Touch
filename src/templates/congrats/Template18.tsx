import type { TemplateData } from '../../types/template';

interface Props { data: TemplateData; }

export default function CongratsTemplate18({ data }: Props) {
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
        background: colors.bg || '#08080f',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Neon grid lines */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} viewBox="0 0 360 460">
        {/* Horizontal lines */}
        {[80, 160, 240, 320, 400].map((y, i) => (
          <line key={`h${i}`} x1="0" y1={y} x2="360" y2={y} stroke={colors.primary} strokeWidth="0.4" opacity="0.25"/>
        ))}
        {/* Vertical lines */}
        {[60, 120, 180, 240, 300].map((x, i) => (
          <line key={`v${i}`} x1={x} y1="0" x2={x} y2="460" stroke={colors.primary} strokeWidth="0.4" opacity="0.25"/>
        ))}
        {/* Neon glow circle behind photo area */}
        <circle cx="180" cy="155" r="95" fill="none" stroke={colors.accent} strokeWidth="1" opacity="0.4"/>
        <circle cx="180" cy="155" r="102" fill="none" stroke={colors.accent} strokeWidth="0.3" opacity="0.2"/>
        {/* Corner accent marks */}
        <path d="M10,10 L40,10 M10,10 L10,40" stroke={colors.accent} strokeWidth="2" fill="none" opacity="0.7"/>
        <path d="M350,10 L320,10 M350,10 L350,40" stroke={colors.accent} strokeWidth="2" fill="none" opacity="0.7"/>
        <path d="M10,450 L40,450 M10,450 L10,420" stroke={colors.accent} strokeWidth="2" fill="none" opacity="0.7"/>
        <path d="M350,450 L320,450 M350,450 L350,420" stroke={colors.accent} strokeWidth="2" fill="none" opacity="0.7"/>
      </svg>

      {/* Neon glow blobs */}
      <div style={{ position: 'absolute', top: 60, right: 40, width: 120, height: 120, borderRadius: '50%', background: `${colors.primary}33`, filter: 'blur(40px)', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: 80, left: 30, width: 100, height: 100, borderRadius: '50%', background: `${colors.secondary}44`, filter: 'blur(35px)', zIndex: 0 }} />

      {/* Photo circle with neon ring */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'center', marginTop: 28 }}>
        <div style={{
          width: 130, height: 130, borderRadius: '50%',
          position: 'relative',
          background: `conic-gradient(${colors.accent}, ${colors.primary}, ${colors.secondary}, ${colors.accent})`,
          padding: 3,
          boxShadow: `0 0 24px ${colors.accent}88, 0 0 60px ${colors.primary}44`,
        }}>
          <div style={{
            width: '100%', height: '100%', borderRadius: '50%',
            overflow: 'hidden',
            background: colors.bg || '#08080f',
          }}>
            {image ? (
              <img src={image} alt="صورة"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
            ) : (
              <div style={{
                width: '100%', height: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 48,
              }}>👤</div>
            )}
          </div>
        </div>
      </div>

      {/* Text content */}
      <div style={{
        position: 'relative', zIndex: 2,
        textAlign: 'center',
        padding: '16px 30px 0',
        flex: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 6,
      }}>
        <p style={{ color: `${colors.accent}99`, fontSize: 10, margin: 0, letterSpacing: 3, fontWeight: 600 }}>
          WEDDING INVITATION
        </p>

        <h1 style={{
          color: '#ffffff',
          fontSize: 34, fontWeight: 900,
          margin: '2px 0',
          textShadow: `0 0 30px ${colors.accent}88`,
          lineHeight: 1.0,
        }}>{title || 'أحمد'}</h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%' }}>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${colors.accent}88)` }} />
          <div style={{
            width: 6, height: 6, borderRadius: '50%',
            background: colors.accent,
            boxShadow: `0 0 8px ${colors.accent}`,
          }} />
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${colors.accent}88)` }} />
        </div>

        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 10, margin: 0 }}>
          {subtitle || 'يتشرف الوالد'}
        </p>

        <div style={{
          background: `linear-gradient(90deg, ${colors.primary}00, ${colors.primary}88, ${colors.primary}00)`,
          border: `1px solid ${colors.accent}55`,
          borderRadius: 6,
          padding: '6px 20px',
          width: '100%',
        }}>
          <p style={{ color: colors.accent, fontSize: 12, fontWeight: 800, margin: 0 }}>
            {lines[0] || 'المقيل والزفة والسمرة'}
          </p>
        </div>

        <p style={{
          color: colors.accent, fontSize: 18, fontWeight: 900, margin: '2px 0 0',
          textShadow: `0 0 15px ${colors.accent}99`,
        }}>
          {lines[1] || '28 - 7 - 2025'}
        </p>

        {website && <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 9, margin: 0 }}>📍 {website}</p>}
        {email && <p style={{ color: `${colors.accent}88`, fontSize: 9, margin: '2px 0 0', fontWeight: 600 }}>{email}</p>}
      </div>

      {/* Bottom neon bar */}
      <div style={{
        height: 3,
        background: `linear-gradient(90deg, ${colors.secondary}, ${colors.accent}, ${colors.primary})`,
        boxShadow: `0 0 12px ${colors.accent}`,
        position: 'relative', zIndex: 2,
        marginTop: 16,
      }} />
    </div>
  );
}
