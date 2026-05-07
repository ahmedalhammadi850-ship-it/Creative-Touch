import type { TemplateData } from '../../types/template';
interface Props { data: TemplateData; }

export default function WeddingTemplate7({ data }: Props) {
  const { title, subtitle, description, email, website, colors, image } = data;
  const lines = (description || '').split('\n').filter(Boolean);
  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div id="template-preview" style={{
      width: 280, height: 400, position: 'relative', overflow: 'hidden',
      fontFamily: 'Cairo, sans-serif', direction: 'rtl',
      background: colors.bg || '#f8f4ef', display: 'flex', flexDirection: 'column',
    }}>
      {/* Top colored block */}
      <div style={{
        height: 130, background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
        position: 'relative', flexShrink: 0, overflow: 'hidden',
      }}>
        {image && <img src={image} alt="صورة" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', opacity: 0.35 }} />}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 280 130">
          <circle cx="240" cy="20" r="60" fill="#ffffff" opacity="0.05"/>
          <polygon points="0,130 60,80 120,130" fill="#ffffff" opacity="0.04"/>
        </svg>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 40, background: `linear-gradient(to top, ${colors.bg || '#f8f4ef'}, transparent)` }} />
        {/* Photo circle */}
        <div style={{
          position: 'absolute', bottom: -30, left: '50%', transform: 'translateX(-50%)',
          width: 72, height: 72, borderRadius: '50%',
          border: `3px solid ${colors.accent}`,
          overflow: 'hidden',
          background: `linear-gradient(135deg, ${colors.primary}44, ${colors.secondary}66)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 4px 20px rgba(0,0,0,0.2)`,
          zIndex: 2,
        }}>
          {image ? <img src={image} alt="صورة" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} /> : <div style={{ fontSize: 30 + _d, opacity: 0.6 }}>💍</div>}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '42px 20px 16px', gap: 7 }}>
        <p style={{ color: colors.primary, fontSize: 9 + _d, margin: 0, letterSpacing: 2, fontWeight: 600 }}>
          {email || 'دعوة زفاف كريمة'}
        </p>
        <h1 style={{ color: colors.primary, fontSize: 22 + _d, fontWeight: 900, margin: 0, textAlign: 'center', lineHeight: 1.1 }}>{title || 'خالد'}</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
          <div style={{ flex: 1, height: 1.5, background: `linear-gradient(to right, transparent, ${colors.accent})` }} />
          <span style={{ color: colors.accent, fontSize: 14 + _d }}>♥</span>
          <div style={{ flex: 1, height: 1.5, background: `linear-gradient(to left, transparent, ${colors.accent})` }} />
        </div>
        <p style={{ color: colors.secondary, fontSize: 14 + _d, fontWeight: 700, margin: 0, textAlign: 'center' }}>{subtitle || '& سارة'}</p>

        <div style={{
          background: `${colors.primary}11`, borderRadius: 8, padding: '8px 16px',
          border: `1px solid ${colors.accent}44`, width: '100%', textAlign: 'center', marginTop: 4,
        }}>
          <p style={{ color: colors.primary, fontSize: 11 + _d, fontWeight: 700, margin: 0 }}>{lines[0] || 'حفل الزفاف والعشاء'}</p>
        </div>

        {lines.slice(1).map((l, i) => (
          <p key={i} style={{ color: i === 0 ? '#888' : colors.primary, fontSize: i === 0 ? 9 : 15, fontWeight: i === 0 ? 400 : 900, margin: 0, textAlign: 'center' }}>{l}</p>
        ))}
        {website && <p style={{ color: '#aaa', fontSize: 9 + _d, margin: '2px 0 0', textAlign: 'center' }}>📍 {website}</p>}
      </div>

      {/* Bottom bar */}
      <div style={{ height: 5, background: `linear-gradient(to right, ${colors.primary}, ${colors.accent}, ${colors.secondary})` }} />
    </div>
  );
}
