import type { TemplateData } from '../../types/template';

interface Props { data: TemplateData; }

export default function CongratsTemplate26({ data }: Props) {
  const { title, subtitle, description, email, colors, image } = data;
  const lines = (description || '').split('\n').filter(Boolean);

  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div id="template-preview" style={{
      width: 360, height: 460,
      background: colors.bg,
      position: 'relative', overflow: 'hidden',
      fontFamily: "'Georgia', serif", direction: 'rtl',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      {Array.from({ length: 15 }, (_, i) => ({
        x: (i * 83 + 25) % 342,
        y: (i * 61 + 40) % 424,
      })).map((s, i) => (
        <div key={i} style={{ position: 'absolute', left: s.x, top: s.y, width: i % 4 === 0 ? 2 : 1, height: i % 4 === 0 ? 2 : 1, borderRadius: '50%', background: colors.accent, opacity: 0.32 }} />
      ))}

      <div style={{ position: 'absolute', inset: '8px', border: `1px solid ${colors.accent}33` }} />
      <div style={{ position: 'absolute', inset: '12px', border: `0.5px solid ${colors.primary}33` }} />

      {([
        { top: '6px', right: '6px', borderTop: `1.5px solid ${colors.accent}`, borderRight: `1.5px solid ${colors.accent}` },
        { top: '6px', left: '6px', borderTop: `1.5px solid ${colors.accent}`, borderLeft: `1.5px solid ${colors.accent}` },
        { bottom: '6px', right: '6px', borderBottom: `1.5px solid ${colors.accent}`, borderRight: `1.5px solid ${colors.accent}` },
        { bottom: '6px', left: '6px', borderBottom: `1.5px solid ${colors.accent}`, borderLeft: `1.5px solid ${colors.accent}` },
      ] as React.CSSProperties[]).map((pos, i) => (
        <div key={i} style={{ position: 'absolute', ...pos, width: '18px', height: '18px' }} />
      ))}

      <div style={{ position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)', width: 200, height: 200, borderRadius: '50%', background: `radial-gradient(circle, ${colors.primary}44 0%, transparent 65%)`, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '22px 28px 0' }}>
        <div style={{
          width: '88px', height: '88px', borderRadius: '50%',
          border: `2px solid ${colors.accent}88`,
          boxShadow: `0 0 0 4px ${colors.accent}22, 0 6px 20px rgba(0,0,0,0.4)`,
          overflow: 'hidden', margin: '0 auto 14px',
          background: `${colors.primary}55`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {image
            ? <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
            : <span style={{ fontSize: '28px', opacity: 0.48 }}>👤</span>
          }
        </div>

        <div style={{ color: colors.accent, fontSize: '7px', letterSpacing: '0.28em', fontWeight: 600, marginBottom: '8px', opacity: 0.85 }}>تهانينا القلبية</div>
        <div style={{ color: colors.secondary, fontSize: '28px', fontWeight: 700, lineHeight: 1.2, marginBottom: '4px', textShadow: `0 0 20px ${colors.primary}88` }}>
          {title}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '8px 0 10px', justifyContent: 'center' }}>
          <div style={{ width: '28px', height: '0.5px', background: `linear-gradient(to left, ${colors.accent}99, transparent)` }} />
          <svg width="10" height="10" viewBox="0 0 10 10"><path d="M5,0 L6,3.5 L10,5 L6,6.5 L5,10 L4,6.5 L0,5 L4,3.5 Z" fill={colors.accent} opacity="0.7" /></svg>
          <div style={{ width: '28px', height: '0.5px', background: `linear-gradient(to right, ${colors.accent}99, transparent)` }} />
        </div>

        <div style={{ color: `${colors.secondary}99`, fontSize: '10px', fontWeight: 600, marginBottom: '10px' }}>{subtitle}</div>

        {lines.map((line, i) => (
          <div key={i} style={{ color: `${colors.secondary}bb`, fontSize: '10px', lineHeight: 1.9 }}>{line}</div>
        ))}

        {email && (
          <div style={{ marginTop: '12px', background: `${colors.accent}15`, border: `1px solid ${colors.accent}33`, borderRadius: '20px', padding: '4px 14px', display: 'inline-block' }}>
            <span style={{ color: colors.accent, fontSize: '9px', fontWeight: 600 }}>{email}</span>
          </div>
        )}
      </div>
    </div>
  );
}
