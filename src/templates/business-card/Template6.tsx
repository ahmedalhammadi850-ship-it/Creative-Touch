import type { TemplateData } from '../../types/template';
interface Props { data: TemplateData; }

export default function BusinessCardTemplate6({ data }: Props) {
  const { title, subtitle, phone, email, website, colors, image } = data;
  return (
    <div id="template-preview" style={{
      width: 340, height: 220, position: 'relative', overflow: 'hidden',
      fontFamily: 'Cairo, sans-serif', direction: 'rtl',
      background: colors.bg || '#ffffff',
    }}>
      {/* SVG decorative top block */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 90, pointerEvents: 'none' }} viewBox="0 0 340 90">
        <polygon points="0,0 340,0 340,65 270,90 0,90" fill={colors.primary}/>
        <line x1="0" y1="72" x2="258" y2="72" stroke={colors.accent} strokeWidth="1" opacity="0.5"/>
        <polygon points="310,6 320,12 310,18 300,12" fill={colors.accent} opacity="0.8"/>
        <line x1="250" y1="12" x2="294" y2="12" stroke={colors.accent} strokeWidth="0.8" opacity="0.5"/>
      </svg>

      {/* Top text on colored area */}
      <div style={{ position: 'relative', zIndex: 2, padding: '14px 22px 0' }}>
        <h1 style={{ color: '#ffffff', fontSize: 22, fontWeight: 900, margin: 0, lineHeight: 1.0 }}>{title || 'أحمد محمد'}</h1>
        <p style={{ color: colors.accent, fontSize: 10, fontWeight: 700, margin: '3px 0 0', letterSpacing: 1 }}>{subtitle || 'مستشار قانوني'}</p>
      </div>

      {/* Photo circle — overlapping */}
      <div style={{
        position: 'absolute', top: 18, left: 18, zIndex: 3,
        width: 65, height: 65, borderRadius: '50%',
        border: `3px solid ${colors.accent}`,
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${colors.primary}55, ${colors.secondary}44)`,
        boxShadow: `0 4px 16px rgba(0,0,0,0.25)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {image ? (
          <img src={image} alt="صورة" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
        ) : (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ opacity: 0.6 }}>
            <circle cx="16" cy="11" r="6" fill={colors.accent} />
            <ellipse cx="16" cy="27" rx="11" ry="6" fill={colors.accent} />
          </svg>
        )}
      </div>

      {/* Bottom info */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '10px 22px 14px',
        zIndex: 2,
      }}>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          {phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <svg width="8" height="8" viewBox="0 0 8 8" fill={colors.primary}><rect x="1" y="1" width="6" height="6" rx="1"/></svg>
              <span style={{ color: colors.secondary, fontSize: 9, fontWeight: 600 }}>{phone}</span>
            </div>
          )}
          {email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <svg width="8" height="8" viewBox="0 0 8 8" fill={colors.accent}><rect x="1" y="2" width="6" height="4" rx="1"/><path d="M1 2.5l3 2 3-2" stroke="#fff" strokeWidth="0.7" fill="none"/></svg>
              <span style={{ color: colors.secondary, fontSize: 9, fontWeight: 600 }}>{email}</span>
            </div>
          )}
          {website && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke={colors.primary} strokeWidth="0.8"><circle cx="4" cy="4" r="3"/><ellipse cx="4" cy="4" rx="1.5" ry="3"/><line x1="1" y1="4" x2="7" y2="4"/></svg>
              <span style={{ color: colors.secondary, fontSize: 9, fontWeight: 600 }}>{website}</span>
            </div>
          )}
        </div>
        <div style={{ height: 3, background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`, marginTop: 8, borderRadius: 2 }} />
      </div>
    </div>
  );
}
