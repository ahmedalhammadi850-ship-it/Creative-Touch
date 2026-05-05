import type { TemplateData } from '../../types/template';

export default function CongratsTemplate21({ data }: { data: TemplateData }) {
  const { title, subtitle, description, colors, image } = data;
  const lines = (description || '').split('\n').filter(Boolean);
  return (
    <div id="template-preview" style={{ width: '360px', height: '460px', position: 'relative', overflow: 'hidden', fontFamily: 'Cairo, sans-serif', direction: 'rtl', background: `linear-gradient(155deg, ${colors.primary} 0%, ${colors.secondary} 100%)` }}>
      {/* Confetti dots */}
      {[[30,40],[80,20],[150,15],[220,35],[300,25],[320,80],[40,100],[290,120]].map(([x,y],i) => (
        <div key={i} style={{ position: 'absolute', left: x, top: y, width: i%3===0?'8px':'5px', height: i%3===0?'8px':'5px', borderRadius: i%2===0?'50%':'2px', background: [colors.accent,'#fff','rgba(255,255,255,0.6)'][i%3], opacity: 0.7, transform: `rotate(${i*40}deg)` }} />
      ))}

      {/* Big star */}
      <svg style={{ position: 'absolute', top: '10px', left: '10px', opacity: 0.15 }} width="60" height="60" viewBox="0 0 60 60">
        <path d="M30,5 L36,22 L55,22 L40,33 L46,50 L30,40 L14,50 L20,33 L5,22 L24,22 Z" fill={colors.accent} />
      </svg>
      <svg style={{ position: 'absolute', bottom: '30px', right: '10px', opacity: 0.12 }} width="50" height="50" viewBox="0 0 50 50">
        <path d="M25,4 L30,18 L45,18 L33,27 L38,41 L25,33 L12,41 L17,27 L5,18 L20,18 Z" fill={colors.accent} />
      </svg>

      {/* Photo area */}
      <div style={{ position: 'relative', margin: '22px auto 0', width: '120px', height: '120px', borderRadius: '50%', border: `4px solid ${colors.accent}`, overflow: 'hidden', boxShadow: `0 0 0 4px ${colors.primary}, 0 0 0 7px ${colors.accent}55` }}>
        {image
          ? <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <div style={{ width: '100%', height: '100%', background: `linear-gradient(180deg, ${colors.secondary}88, ${colors.primary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '44px' }}>🏅</div>
        }
      </div>

      {/* Content */}
      <div style={{ padding: '16px 22px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ color: colors.accent, fontSize: '10px', letterSpacing: '0.15em', marginBottom: '4px' }}>✦ تهانينا ✦</div>
        <h1 style={{ color: '#ffffff', fontSize: '30px', fontWeight: '900', margin: '4px 0', textShadow: `0 2px 10px ${colors.primary}88` }}>{title}</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', margin: '2px 0 10px' }}>{subtitle}</p>
        <div style={{ width: '60%', height: '2px', background: `linear-gradient(to right, transparent, ${colors.accent}, transparent)`, margin: '0 auto 12px' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {lines.length > 0 ? lines.map((l, i) => (
            <p key={i} style={{ color: 'rgba(255,255,255,0.9)', fontSize: '11px', margin: 0, lineHeight: 1.6 }}>{l}</p>
          )) : (
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '12px', margin: 0 }}>ألف مبروك وعقبال المزيد</p>
          )}
        </div>
      </div>
    </div>
  );
}
