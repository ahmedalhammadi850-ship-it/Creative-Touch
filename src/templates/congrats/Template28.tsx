import type { TemplateData } from '../../types/template';

interface Props { data: TemplateData; }

export default function CongratsTemplate28({ data }: Props) {
  const { title, subtitle, description, email, colors, image } = data;
  const lines = (description || '').split('\n').filter(Boolean);

  return (
    <div id="template-preview" style={{
      width: 360, height: 460,
      background: colors.bg,
      position: 'relative', overflow: 'hidden',
      fontFamily: "'Cairo', sans-serif", direction: 'rtl',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Bold color header */}
      <div style={{
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        height: '160px', position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end',
        paddingBottom: '28px',
      }}>
        {/* Circle decorations */}
        <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'absolute', top: -10, left: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ color: colors.accent, fontSize: '7px', letterSpacing: '0.26em', fontWeight: 700, marginBottom: '5px', opacity: 0.9 }}>✦ تهنئة خاصة ✦</div>
          <div style={{ color: '#fff', fontSize: '9px', fontWeight: 400, opacity: 0.75 }}>{subtitle}</div>
        </div>

        {/* Circular photo - overlapping */}
        <div style={{
          position: 'absolute', bottom: '-32px', left: '50%', transform: 'translateX(-50%)',
          width: '74px', height: '74px', borderRadius: '50%',
          border: `3px solid ${colors.bg}`,
          boxShadow: `0 4px 18px rgba(0,0,0,0.3)`,
          overflow: 'hidden',
          background: `${colors.primary}88`,
          zIndex: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {image
            ? <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
            : <span style={{ fontSize: '26px', opacity: 0.5 }}>👤</span>
          }
        </div>
      </div>

      {/* Wave divider — taller and more visible */}
      <svg width="360" height="36" viewBox="0 0 360 36" style={{ display: 'block', background: colors.bg, marginTop: '-1px', flexShrink: 0 }}>
        <path d="M0,0 Q45,28 90,14 Q135,0 180,14 Q225,28 270,14 Q315,0 360,14 L360,0 Z" fill={`${colors.primary}`} />
        <path d="M0,0 Q45,22 90,11 Q135,0 180,11 Q225,22 270,11 Q315,0 360,11 L360,0 Z" fill={colors.secondary} />
      </svg>

      {/* Accent line below photo circle */}
      <div style={{
        marginTop: '-4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        flexShrink: 0,
        paddingBottom: 4,
      }}>
        <div style={{ width: 60, height: 2, background: `linear-gradient(to left, ${colors.accent}, transparent)`, borderRadius: 2 }} />
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: colors.accent, boxShadow: `0 0 6px ${colors.accent}88` }} />
        <div style={{ width: 60, height: 2, background: `linear-gradient(to right, ${colors.accent}, transparent)`, borderRadius: 2 }} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '28px 26px 18px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ color: colors.secondary, fontSize: '28px', fontWeight: 900, lineHeight: 1.2, marginBottom: '6px' }}>{title}</div>
        <div style={{ width: '46px', height: '2px', background: `linear-gradient(to left, transparent, ${colors.accent}, transparent)`, margin: '0 auto 12px', borderRadius: '1px' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%', flex: 1 }}>
          {lines.map((line, i) => (
            <div key={i} style={{ color: `${colors.secondary}cc`, fontSize: '10.5px', lineHeight: 1.75, fontWeight: i === 0 ? 700 : 400 }}>{line}</div>
          ))}
        </div>

        {email && (
          <div style={{
            marginTop: '14px', width: '100%',
            background: `linear-gradient(135deg, ${colors.primary}22, ${colors.accent}15)`,
            border: `1px solid ${colors.primary}44`,
            borderRadius: '12px', padding: '9px 16px',
            display: 'flex', justifyContent: 'center',
          }}>
            <span style={{ color: colors.primary, fontSize: '10px', fontWeight: 700 }}>{email}</span>
          </div>
        )}
      </div>
    </div>
  );
}
