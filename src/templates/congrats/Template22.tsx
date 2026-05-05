import type { TemplateData } from '../../types/template';

export default function CongratsTemplate22({ data }: { data: TemplateData }) {
  const { title, subtitle, description, colors, image } = data;
  const lines = (description || '').split('\n').filter(Boolean);
  return (
    <div id="template-preview" style={{ width: '360px', height: '460px', position: 'relative', overflow: 'hidden', fontFamily: 'Cairo, sans-serif', direction: 'rtl', backgroundColor: colors.bg }}>
      {/* Parchment texture pattern */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.05 }}>
        <defs>
          <pattern id="ct22-lines" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
            <line x1="0" y1="0" x2="0" y2="20" stroke={colors.primary} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ct22-lines)" />
      </svg>

      {/* Vintage frame border */}
      <div style={{ position: 'absolute', inset: '6px', border: `2px solid ${colors.primary}55` }} />
      <div style={{ position: 'absolute', inset: '10px', border: `0.5px solid ${colors.accent}44` }} />
      {/* Corner ornaments */}
      {[{top:'6px',right:'6px'},{top:'6px',left:'6px'},{bottom:'6px',right:'6px'},{bottom:'6px',left:'6px'}].map((pos,i) => (
        <div key={i} style={{ position: 'absolute', ...pos, width: '16px', height: '16px' }}>
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path d="M0,0 L8,0 M0,0 L0,8" stroke={colors.accent} strokeWidth="1.5" opacity="0.6" fill="none" transform={i===1?'scale(-1,1) translate(-16,0)':i===2?'scale(1,-1) translate(0,-16)':i===3?'scale(-1,-1) translate(-16,-16)':''} />
            <circle cx="0" cy="0" r="2" fill={colors.accent} opacity="0.5" transform={i===1?'translate(16,0)':i===2?'translate(0,16)':i===3?'translate(16,16)':''} />
          </svg>
        </div>
      ))}

      <div style={{ position: 'relative', zIndex: 1, padding: '22px 20px', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Photo */}
        <div style={{ width: '100px', height: '100px', borderRadius: '4px', overflow: 'hidden', border: `2px solid ${colors.primary}66`, boxShadow: `4px 4px 0 ${colors.primary}33`, marginBottom: '12px' }}>
          {image
            ? <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <div style={{ width: '100%', height: '100%', background: `linear-gradient(180deg, ${colors.secondary}77, ${colors.bg})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '38px' }}>🎖️</div>
          }
        </div>

        {/* Ornate heading */}
        <div style={{ color: colors.accent, fontSize: '11px', textAlign: 'center', letterSpacing: '0.14em', marginBottom: '4px' }}>— تقديم أحر التهاني —</div>
        <h1 style={{ color: colors.primary, fontSize: '28px', fontWeight: '900', textAlign: 'center', margin: '4px 0', lineHeight: 1.2 }}>{title}</h1>
        <p style={{ color: colors.secondary, fontSize: '11px', textAlign: 'center', margin: '2px 0 10px', opacity: 0.75 }}>{subtitle}</p>

        {/* Serif divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '80%', marginBottom: '12px' }}>
          <div style={{ flex: 1, height: '1px', background: `linear-gradient(to left, ${colors.primary}66, transparent)` }} />
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7,1 Q9,5 13,7 Q9,9 7,13 Q5,9 1,7 Q5,5 7,1 Z" fill={colors.accent} opacity="0.7" /></svg>
          <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, ${colors.primary}66, transparent)` }} />
        </div>

        {/* Body text */}
        <div style={{ textAlign: 'center' }}>
          {lines.length > 0 ? lines.map((l, i) => (
            <p key={i} style={{ color: colors.secondary, fontSize: '11px', margin: '0 0 4px', lineHeight: 1.7 }}>{l}</p>
          )) : (
            <>
              <p style={{ color: colors.secondary, fontSize: '11px', margin: '0 0 4px', lineHeight: 1.7 }}>بمناسبة هذا الإنجاز المبارك</p>
              <p style={{ color: colors.primary, fontSize: '13px', fontWeight: '700', margin: 0 }}>ألف ألف مبروك</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
