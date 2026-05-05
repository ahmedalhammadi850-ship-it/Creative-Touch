import type { TemplateData } from '../../types/template';
interface Props { data: TemplateData; }

export default function WeddingTemplate8({ data }: Props) {
  const { title, subtitle, description, email, website, colors, image } = data;
  const lines = (description || '').split('\n').filter(Boolean);
  return (
    <div id="template-preview" style={{
      width: 280, height: 400, position: 'relative', overflow: 'hidden',
      fontFamily: 'Cairo, sans-serif', direction: 'rtl',
      background: colors.bg || '#ffffff', display: 'flex',
    }}>
      {/* Left accent bar */}
      <div style={{ width: 7, background: `linear-gradient(to bottom, ${colors.accent}, ${colors.primary}, ${colors.secondary})`, flexShrink: 0 }} />

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top photo half */}
        <div style={{ height: 180, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
          {image ? (
            <img src={image} alt="صورة" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${colors.primary}44, ${colors.secondary}55)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontSize: 50, opacity: 0.4 }}>💍</div>
              <span style={{ color: `${colors.primary}88`, fontSize: 10 }}>صورة الزفاف</span>
            </div>
          )}
          {/* Bottom wave */}
          <svg style={{ position: 'absolute', bottom: -1, left: 0, width: '100%', height: 28, pointerEvents: 'none' }} viewBox="0 0 273 28" preserveAspectRatio="none">
            <path d="M0,28 Q68,0 137,14 Q205,28 273,0 L273,28 Z" fill={colors.bg || '#ffffff'}/>
          </svg>
          {/* WEDDING tag */}
          <div style={{
            position: 'absolute', top: 12, right: 12,
            background: colors.primary, borderRadius: 3, padding: '3px 10px',
          }}>
            <span style={{ color: colors.accent, fontSize: 8, fontWeight: 800, letterSpacing: 2 }}>WEDDING</span>
          </div>
        </div>

        {/* Bottom text */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '8px 18px 14px', gap: 6 }}>
          <p style={{ color: '#aaa', fontSize: 9, margin: 0, textAlign: 'center' }}>{email || 'يتشرف بدعوتكم'}</p>
          <h1 style={{ color: colors.primary, fontSize: 22, fontWeight: 900, margin: 0, textAlign: 'center', lineHeight: 1.0 }}>{title || 'عمر'}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
            <div style={{ flex: 1, height: 1, background: colors.accent, opacity: 0.4 }} />
            <span style={{ color: colors.accent, fontSize: 12 }}>✦</span>
            <div style={{ flex: 1, height: 1, background: colors.accent, opacity: 0.4 }} />
          </div>
          <p style={{ color: colors.secondary, fontSize: 14, fontWeight: 800, margin: 0, textAlign: 'center' }}>{subtitle || '& أميرة'}</p>

          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            {[
              { label: 'التاريخ', val: lines[1] || '28 - 7 - 2025' },
              { label: 'المناسبة', val: lines[0] || 'حفل الزفاف' },
            ].map((item, i) => (
              <div key={i} style={{
                flex: 1, background: i === 0 ? `${colors.primary}0d` : `${colors.accent}0d`,
                borderRadius: 6, padding: '5px 8px', textAlign: 'center',
                border: `1px solid ${i === 0 ? colors.primary : colors.accent}22`,
              }}>
                <p style={{ color: '#aaa', fontSize: 7, margin: '0 0 2px', letterSpacing: 1 }}>{item.label}</p>
                <p style={{ color: i === 0 ? colors.primary : colors.secondary, fontSize: 10, fontWeight: 800, margin: 0 }}>{item.val}</p>
              </div>
            ))}
          </div>

          {website && <p style={{ color: '#bbb', fontSize: 8.5, margin: '2px 0 0', textAlign: 'center' }}>📍 {website}</p>}
        </div>
      </div>
    </div>
  );
}
