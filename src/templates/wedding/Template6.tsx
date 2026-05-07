import type { TemplateData } from '../../types/template';
interface Props { data: TemplateData; }

export default function WeddingTemplate6({ data }: Props) {
  const { title, subtitle, description, email, website, colors, image } = data;
  const lines = (description || '').split('\n').filter(Boolean);
  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div id="template-preview" style={{
      width: 280, height: 400, position: 'relative', overflow: 'hidden',
      fontFamily: 'Cairo, sans-serif', direction: 'rtl',
      background: colors.bg || '#0c1a2e',
    }}>
      {/* Full photo bg */}
      {image ? (
        <img src={image} alt="صورة" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', zIndex: 0 }} />
      ) : (
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(160deg, ${colors.primary}55, ${colors.bg || '#0c1a2e'})`, zIndex: 0 }} />
      )}

      {/* Dark overlay */}
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${colors.bg || '#0c1a2e'}f5 0%, ${colors.bg || '#0c1a2e'}99 40%, transparent 80%)`, zIndex: 1 }} />

      {/* SVG border frame */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 2, pointerEvents: 'none' }} viewBox="0 0 280 400">
        <rect x="12" y="12" width="256" height="376" fill="none" stroke={colors.accent} strokeWidth="1.2" opacity="0.6"/>
        <rect x="18" y="18" width="244" height="364" fill="none" stroke={colors.accent} strokeWidth="0.4" opacity="0.3"/>
        {/* Corner flowers */}
        {[[12,12],[268,12],[12,388],[268,388]].map(([cx,cy],i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="5" fill={colors.accent} opacity="0.8"/>
            <circle cx={cx} cy={cy} r="8" fill="none" stroke={colors.accent} strokeWidth="0.6" opacity="0.4"/>
          </g>
        ))}
        {/* Center top ornament */}
        <g transform="translate(140,12)">
          <polygon points="0,-7 5,0 0,7 -5,0" fill={colors.accent}/>
          <line x1="-35" y1="0" x2="-9" y2="0" stroke={colors.accent} strokeWidth="0.8" opacity="0.6"/>
          <line x1="9" y1="0" x2="35" y2="0" stroke={colors.accent} strokeWidth="0.8" opacity="0.6"/>
        </g>
        <g transform="translate(140,388)">
          <polygon points="0,-7 5,0 0,7 -5,0" fill={colors.accent}/>
          <line x1="-35" y1="0" x2="-9" y2="0" stroke={colors.accent} strokeWidth="0.8" opacity="0.6"/>
          <line x1="9" y1="0" x2="35" y2="0" stroke={colors.accent} strokeWidth="0.8" opacity="0.6"/>
        </g>
      </svg>

      {/* Text at bottom */}
      <div style={{
        position: 'absolute', bottom: 22, left: 0, right: 0,
        zIndex: 3, textAlign: 'center', padding: '0 28px',
        display: 'flex', flexDirection: 'column', gap: 5,
      }}>
        <p style={{ color: colors.accent, fontSize: 9 + _d, margin: 0, letterSpacing: 2, fontWeight: 700 }}>{email || '✦ دعوة زفاف ✦'}</p>
        <h1 style={{ color: '#ffffff', fontSize: 24 + _d, fontWeight: 900, margin: 0, lineHeight: 1.0, textShadow: `0 2px 12px ${colors.primary}` }}>{title || 'عبدالله'}</h1>
        <p style={{ color: colors.accent, fontSize: 13 + _d, fontWeight: 700, margin: 0 }}>{subtitle || '& نورة'}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${colors.accent}88)` }} />
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: colors.accent }} />
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${colors.accent}88)` }} />
        </div>
        {lines.map((l, i) => (
          <p key={i} style={{ color: i === 1 ? colors.accent : 'rgba(255,255,255,0.75)', fontSize: i === 1 ? 14 : 9, fontWeight: i === 1 ? 900 : 400, margin: 0 }}>{l}</p>
        ))}
        {website && <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 9 + _d, margin: '2px 0 0' }}>📍 {website}</p>}
      </div>
    </div>
  );
}
