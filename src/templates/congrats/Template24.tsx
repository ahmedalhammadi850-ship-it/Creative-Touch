import type { TemplateData } from '../../types/template';

interface Props { data: TemplateData; }

export default function CongratsTemplate24({ data }: Props) {
  const { title, subtitle, description, email, colors, image } = data;
  const lines = (description || '').split('\n').filter(Boolean);

  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div id="template-preview" style={{
      width: 360, height: 460,
      background: `linear-gradient(145deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
      position: 'relative', overflow: 'hidden',
      fontFamily: "'Cairo', sans-serif", direction: 'rtl',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      {Array.from({ length: 20 }, (_, i) => ({
        x: (i * 67 + 20) % 334,
        y: (i * 43 + 30) % 424,
        size: 3 + (i % 3) * 2,
        opacity: 0.18 + (i % 4) * 0.1,
      })).map((d, i) => (
        <div key={i} style={{
          position: 'absolute', left: d.x, top: d.y,
          width: d.size, height: d.size,
          borderRadius: i % 2 === 0 ? '50%' : '2px',
          transform: `rotate(${i * 22}deg)`,
          background: i % 3 === 0 ? colors.accent : i % 3 === 1 ? '#fff' : colors.primary,
          opacity: d.opacity,
        }} />
      ))}

      <div style={{ position: 'absolute', top: '28%', left: '50%', transform: 'translate(-50%,-50%)', width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.11) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ marginTop: '24px', marginBottom: '14px', position: 'relative', zIndex: 1 }}>
        <div style={{
          width: '108px', height: '108px', borderRadius: '50%',
          border: `3px solid ${colors.accent}`,
          boxShadow: `0 0 0 5px ${colors.accent}33, 0 8px 24px rgba(0,0,0,0.3)`,
          overflow: 'hidden', background: `${colors.primary}66`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {image
            ? <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
            : <span style={{ fontSize: '34px', opacity: 0.55 }}>👤</span>
          }
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 24px', flex: 1 }}>
        <div style={{ color: colors.accent, fontSize: '8px', letterSpacing: '0.25em', fontWeight: 700, marginBottom: '8px' }}>✨ ألف مبروك ✨</div>
        <div style={{ color: '#fff', fontSize: '30px', fontWeight: 900, lineHeight: 1.2, textShadow: '0 4px 16px rgba(0,0,0,0.3)', marginBottom: '4px' }}>{title}</div>
        <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '11px', fontWeight: 600, marginBottom: '12px' }}>{subtitle}</div>
        <div style={{ width: '46px', height: '1px', background: `linear-gradient(to left, transparent, ${colors.accent}, transparent)`, margin: '0 auto 12px' }} />
        {lines.map((line, i) => (
          <div key={i} style={{ color: 'rgba(255,255,255,0.87)', fontSize: '10.5px', lineHeight: 1.85, fontWeight: i === 0 ? 700 : 400 }}>{line}</div>
        ))}
        {email && (
          <div style={{ marginTop: '12px', background: 'rgba(255,255,255,0.15)', borderRadius: '20px', padding: '4px 14px', display: 'inline-block' }}>
            <span style={{ color: colors.accent, fontSize: '9px', fontWeight: 700 }}>{email}</span>
          </div>
        )}
      </div>
    </div>
  );
}
