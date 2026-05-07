import type { TemplateData } from '../../types/template';

interface Props { data: TemplateData; }

export default function CongratsTemplate12({ data }: Props) {
  const { title, subtitle, description, email, website, colors, image } = data;
  const lines = (description || '').split('\n').filter(Boolean);

  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div
      id="template-preview"
      style={{
        width: 360,
        height: 460,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Cairo, sans-serif',
        direction: 'rtl',
        background: colors.bg || '#c8a84b',
      }}
    >
      {/* Full background photo */}
      {image ? (
        <img src={image} alt="صورة"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'top center',
            zIndex: 0,
          }} />
      ) : (
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(160deg, ${colors.bg || '#c8a84b'} 0%, ${colors.secondary} 60%, ${colors.primary} 100%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: 8, zIndex: 0,
        }}>
          <div style={{ fontSize: 72 + _d, opacity: 0.4 }}>👤</div>
          <span style={{ color: '#ffffff66', fontSize: 10 + _d }}>ارفع صورة لتملأ الخلفية</span>
        </div>
      )}

      {/* Top dark gradient for text */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 120,
        background: `linear-gradient(to bottom, ${colors.primary}e0 0%, transparent 100%)`,
        zIndex: 1,
      }} />

      {/* Bottom dark gradient */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 200,
        background: `linear-gradient(to top, ${colors.primary}f5 0%, ${colors.primary}aa 50%, transparent 100%)`,
        zIndex: 1,
      }} />

      {/* SVG decorative frame */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }} viewBox="0 0 360 460">
        {/* Top border lines */}
        <line x1="16" y1="16" x2="344" y2="16" stroke={colors.accent} strokeWidth="1.5" opacity="0.7"/>
        <line x1="16" y1="22" x2="344" y2="22" stroke={colors.accent} strokeWidth="0.5" opacity="0.4"/>
        {/* Bottom border lines */}
        <line x1="16" y1="444" x2="344" y2="444" stroke={colors.accent} strokeWidth="1.5" opacity="0.7"/>
        <line x1="16" y1="438" x2="344" y2="438" stroke={colors.accent} strokeWidth="0.5" opacity="0.4"/>
        {/* Corner ornaments */}
        {[[16,16],[344,16],[16,444],[344,444]].map(([cx,cy],i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="4" fill={colors.accent} opacity="0.9"/>
            <circle cx={cx} cy={cy} r="7" fill="none" stroke={colors.accent} strokeWidth="0.8" opacity="0.5"/>
          </g>
        ))}
        {/* Center ornament top */}
        <g transform="translate(180,16)">
          <polygon points="0,-9 6,0 0,9 -6,0" fill={colors.accent}/>
          <line x1="-40" y1="0" x2="-10" y2="0" stroke={colors.accent} strokeWidth="0.8" opacity="0.6"/>
          <line x1="10" y1="0" x2="40" y2="0" stroke={colors.accent} strokeWidth="0.8" opacity="0.6"/>
        </g>
      </svg>

      {/* Top text area */}
      <div style={{
        position: 'absolute', top: 26, left: 0, right: 0,
        textAlign: 'center', zIndex: 3,
        padding: '0 30px',
      }}>
        <p style={{ color: colors.accent, fontSize: 11 + _d, margin: 0, fontWeight: 700, letterSpacing: 2 }}>
          {email || 'أفراح آل باشا'}
        </p>
      </div>

      {/* Bottom text area */}
      <div style={{
        position: 'absolute', bottom: 22, left: 0, right: 0,
        textAlign: 'center', zIndex: 3,
        padding: '0 24px',
        display: 'flex', flexDirection: 'column', gap: 5,
      }}>
        {/* Name — large calligraphy style */}
        <div style={{
          background: `${colors.primary}cc`,
          borderTop: `2px solid ${colors.accent}`,
          borderBottom: `2px solid ${colors.accent}`,
          padding: '4px 0',
          marginBottom: 4,
        }}>
          <h1 style={{
            color: colors.accent,
            fontSize: 38 + _d, fontWeight: 900,
            margin: 0, lineHeight: 1.0,
            textShadow: `0 2px 12px ${colors.accent}66`,
          }}>{title || 'نسيد باشا'}</h1>
        </div>

        <p style={{ color: '#ffffffcc', fontSize: 10 + _d, margin: 0 }}>
          {subtitle || 'من قِبَل الشيخ عصام باشا'}
        </p>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 2 }}>
          {[
            { label: 'المكان', value: website || lines[0] || 'حوالة فوق شركة جلب' },
            { label: 'الأحد', value: lines[1] || '2023-7-2' },
          ].map((item, i) => (
            <div key={i} style={{
              flex: 1,
              background: `${colors.primary}aa`,
              borderRadius: 3,
              padding: '4px 8px',
              border: `1px solid ${colors.accent}44`,
            }}>
              <p style={{ color: colors.accent, fontSize: 9 + _d, fontWeight: 700, margin: '0 0 2px' }}>{item.label}</p>
              <p style={{ color: '#ffffffdd', fontSize: 9 + _d, margin: 0 }}>{item.value}</p>
            </div>
          ))}
        </div>

        <p style={{ color: colors.accent, fontSize: 12 + _d, fontWeight: 900, margin: '4px 0 0', letterSpacing: 1 }}>
          {lines[2] || 'المقيل والزفة والسمرة'}
        </p>
      </div>
    </div>
  );
}
