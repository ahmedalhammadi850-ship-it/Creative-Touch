import type { TemplateData } from '../../types/template';

interface Props { data: TemplateData; }

export default function CongratsTemplate27({ data }: Props) {
  const { title, subtitle, description, email, colors, image } = data;
  const lines = (description || '').split('\n').filter(Boolean);

  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div id="template-preview" style={{
      width: 360, height: 460,
      background: '#050918',
      position: 'relative', overflow: 'hidden',
      fontFamily: "'Cairo', sans-serif", direction: 'rtl',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      {/* Damask pattern */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.05, pointerEvents: 'none' }}>
        <defs>
          <pattern id="cg27-damask" width="44" height="44" patternUnits="userSpaceOnUse">
            <path d="M22,2 C26,7 30,7 30,12 C30,17 26,17 22,22 C18,17 14,17 14,12 C14,7 18,7 22,2Z" fill={colors.accent} />
            <path d="M2,22 C7,18 7,14 12,14 C17,14 17,18 22,22 C17,26 17,30 12,30 C7,30 7,26 2,22Z" fill={colors.accent} />
            <path d="M42,22 C37,18 37,14 32,14 C27,14 27,18 22,22 C27,26 27,30 32,30 C37,30 37,26 42,22Z" fill={colors.accent} />
            <path d="M22,42 C18,37 14,37 14,32 C14,27 18,27 22,22 C26,27 30,27 30,32 C30,37 26,37 22,42Z" fill={colors.accent} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cg27-damask)" />
      </svg>

      {/* Gold frame */}
      <div style={{ position: 'absolute', inset: '7px', border: `1px solid ${colors.accent}55`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: '11px', border: `0.5px solid ${colors.accent}22`, pointerEvents: 'none' }} />

      {/* Corner diamonds */}
      {[
        { top: '5px', right: '5px' }, { top: '5px', left: '5px' },
        { bottom: '5px', right: '5px' }, { bottom: '5px', left: '5px' },
      ].map((pos, i) => (
        <div key={i} style={{ position: 'absolute', ...pos, width: '10px', height: '10px', transform: 'rotate(45deg)', background: `${colors.accent}cc`, boxShadow: `0 0 6px ${colors.accent}` }} />
      ))}

      {/* Center glow */}
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 250, height: 250, borderRadius: '50%', background: `radial-gradient(circle, ${colors.primary}55 0%, transparent 65%)`, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '26px 26px 0', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          width: '90px', height: '90px', borderRadius: '50%',
          border: `2.5px solid ${colors.accent}`,
          boxShadow: `0 0 0 5px ${colors.accent}22, 0 6px 22px rgba(0,0,0,0.5)`,
          overflow: 'hidden', marginBottom: '14px',
          background: `${colors.primary}55`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {image
            ? <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
            : <span style={{ fontSize: '30px', opacity: 0.5 }}>👤</span>
          }
        </div>

        <div style={{ color: colors.accent, fontSize: '7px', letterSpacing: '0.3em', fontWeight: 600, marginBottom: '8px', textShadow: `0 0 8px ${colors.accent}` }}>
          ✦ ألف مبروك ✦
        </div>
        <div style={{ color: colors.accent, fontSize: '30px', fontWeight: 900, lineHeight: 1.2, textShadow: `0 0 20px ${colors.accent}88`, marginBottom: '4px' }}>{title}</div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '8px 0', justifyContent: 'center', width: '100%' }}>
          <div style={{ flex: 1, height: '0.5px', background: `linear-gradient(to left, ${colors.accent}88, transparent)` }} />
          <svg width="10" height="10" viewBox="0 0 10 10"><path d="M5,0 L6,3.5 L10,5 L6,6.5 L5,10 L4,6.5 L0,5 L4,3.5 Z" fill={colors.accent} /></svg>
          <div style={{ flex: 1, height: '0.5px', background: `linear-gradient(to right, ${colors.accent}88, transparent)` }} />
        </div>

        <div style={{ color: `${colors.accent}cc`, fontSize: '11px', fontWeight: 600, marginBottom: '10px' }}>{subtitle}</div>

        {lines.map((line, i) => (
          <div key={i} style={{ color: `${colors.accent}88`, fontSize: '10px', lineHeight: 1.85 }}>{line}</div>
        ))}

        {email && (
          <div style={{ marginTop: '12px', background: `${colors.accent}15`, border: `1px solid ${colors.accent}44`, borderRadius: '20px', padding: '4px 14px' }}>
            <span style={{ color: colors.accent, fontSize: '9px', fontWeight: 700, textShadow: `0 0 6px ${colors.accent}` }}>{email}</span>
          </div>
        )}
      </div>
    </div>
  );
}
