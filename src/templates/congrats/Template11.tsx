import type { TemplateData } from '../../types/template';

interface Props { data: TemplateData; }

export default function CongratsTemplate11({ data }: Props) {
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
        background: colors.bg || '#0d2240',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Photo section — top 55% */}
      <div style={{
        height: 255,
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        {image ? (
          <img src={image} alt="صورة"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            background: `linear-gradient(160deg, ${colors.primary}55, ${colors.secondary}88)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8,
          }}>
            <div style={{ display: 'flex', gap: 30, opacity: 0.6 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 52 }}>👤</div>
                <p style={{ color: '#ffffff88', fontSize: 9, margin: 0 }}>الأول</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 52 }}>👤</div>
                <p style={{ color: '#ffffff88', fontSize: 9, margin: 0 }}>الثاني</p>
              </div>
            </div>
            <span style={{ color: '#ffffff55', fontSize: 10 }}>ارفع صورة العريسين</span>
          </div>
        )}

        {/* Gradient overlay bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
          background: `linear-gradient(to top, ${colors.bg || '#0d2240'} 0%, transparent 100%)`,
        }} />

        {/* Top label */}
        <div style={{
          position: 'absolute', top: 12, right: 0, left: 0,
          display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6,
        }}>
          <div style={{ height: 1, flex: 1, maxWidth: 40, background: colors.accent, marginRight: 10, opacity: 0.7 }} />
          <p style={{ color: '#ffffff', fontSize: 10, fontWeight: 700, margin: 0, letterSpacing: 1 }}>
            {email || 'أفراح المعلوم'}
          </p>
          <div style={{ height: 1, flex: 1, maxWidth: 40, background: colors.accent, marginLeft: 10, opacity: 0.7 }} />
        </div>
      </div>

      {/* Text section — bottom 45% */}
      <div style={{
        flex: 1,
        display: 'flex', flexDirection: 'column',
        padding: '10px 24px 16px',
        position: 'relative', zIndex: 1,
      }}>
        {/* SVG top arabesque */}
        <svg style={{ position: 'absolute', top: -10, left: 0, right: 0, width: '100%', height: 30, pointerEvents: 'none' }} viewBox="0 0 360 30">
          <g transform="translate(180,15)">
            {Array.from({ length: 7 }).map((_, i) => {
              const x = (i - 3) * 40;
              return <polygon key={i} points={`${x},0 ${x+5},-7 ${x+10},0 ${x+5},7`} fill={colors.accent} opacity={i === 3 ? 1 : 0.35}/>;
            })}
            <line x1="-140" y1="0" x2="-28" y2="0" stroke={colors.accent} strokeWidth="0.8" opacity="0.4"/>
            <line x1="28" y1="0" x2="140" y2="0" stroke={colors.accent} strokeWidth="0.8" opacity="0.4"/>
          </g>
        </svg>

        <p style={{ color: colors.accent, fontSize: 10, margin: '14px 0 4px', textAlign: 'center', fontWeight: 700 }}>
          نهديها للعرسان
        </p>

        <h1 style={{
          color: '#ffffff',
          fontSize: 26, fontWeight: 900,
          margin: '0 0 4px', lineHeight: 1.1,
          textAlign: 'center',
        }}>{title || 'محمد & هيثم'}</h1>

        <p style={{ color: '#ffffffaa', fontSize: 10, margin: '0 0 6px', textAlign: 'center' }}>
          {subtitle || 'بمناسبة زفافهم الميمون'}
        </p>

        <div style={{
          textAlign: 'center',
          background: `${colors.primary}88`,
          borderRadius: 3,
          padding: '3px 16px',
          marginBottom: 6,
          display: 'inline-block',
          alignSelf: 'center',
        }}>
          <p style={{ color: colors.accent, fontSize: 11, fontWeight: 700, margin: 0 }}>
            {lines[0] || 'فألف ألف مبروك وبالرفاء والبنين'}
          </p>
        </div>

        <p style={{ color: '#ffffffaa', fontSize: 10, margin: '0 0 4px', textAlign: 'center' }}>
          {lines[1] || 'تهنئة خاصة من'}
        </p>

        {/* From company / sponsor */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: '#ffffff11',
          borderRadius: 4,
          padding: '6px 12px',
          border: `1px solid ${colors.accent}33`,
          marginTop: 'auto',
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: colors.accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span style={{ fontSize: 14 }}>💊</span>
          </div>
          <div>
            <p style={{ color: '#ffffff', fontSize: 12, fontWeight: 900, margin: 0 }}>
              {lines[2] || website || 'الراعي الرسمي'}
            </p>
            <p style={{ color: colors.accent, fontSize: 9, margin: 0 }}>
              {lines[3] || email || ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
