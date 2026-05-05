import type { TemplateData } from '../../types/template';

interface Props { data: TemplateData; }

export default function CongratsTemplate9({ data }: Props) {
  const { title, subtitle, description, email, website, colors, image } = data;
  const lines = (description || '').split('\n').filter(Boolean);

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
        background: colors.bg || '#f2ead8',
      }}
    >
      {/* Background texture pattern */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} viewBox="0 0 360 460">
        {/* Subtle diagonal lines */}
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={i} x1={i * 30 - 60} y1="0" x2={i * 30} y2="460" stroke={colors.accent} strokeWidth="0.3" opacity="0.15"/>
        ))}
        {/* Ornate top border */}
        <rect x="10" y="10" width="340" height="440" fill="none" stroke={colors.accent} strokeWidth="1.5" opacity="0.6"/>
        <rect x="16" y="16" width="328" height="428" fill="none" stroke={colors.accent} strokeWidth="0.5" opacity="0.35"/>
        {/* Corner diamonds */}
        {[[10,10],[350,10],[10,450],[350,450]].map(([cx, cy], i) => (
          <polygon key={i} points={`${cx},${cy-7} ${cx+5},${cy} ${cx},${cy+7} ${cx-5},${cy}`}
            fill={colors.accent} opacity="0.8"/>
        ))}
        {/* Top ornament */}
        <g transform="translate(180, 10)">
          <line x1="-50" y1="0" x2="-14" y2="0" stroke={colors.accent} strokeWidth="1" opacity="0.7"/>
          <polygon points="0,-8 7,0 0,8 -7,0" fill={colors.accent}/>
          <line x1="14" y1="0" x2="50" y2="0" stroke={colors.accent} strokeWidth="1" opacity="0.7"/>
        </g>
        {/* Bottom ornament */}
        <g transform="translate(180, 450)">
          <line x1="-50" y1="0" x2="-14" y2="0" stroke={colors.accent} strokeWidth="1" opacity="0.7"/>
          <polygon points="0,-8 7,0 0,8 -7,0" fill={colors.accent}/>
          <line x1="14" y1="0" x2="50" y2="0" stroke={colors.accent} strokeWidth="1" opacity="0.7"/>
        </g>
      </svg>

      {/* Header — "الف مبروك" style */}
      <div style={{
        position: 'relative', zIndex: 1,
        textAlign: 'center',
        padding: '22px 30px 8px',
      }}>
        <h2 style={{
          color: colors.primary,
          fontSize: 28,
          fontWeight: 900,
          margin: 0,
          lineHeight: 1.1,
          textShadow: `1px 1px 0 ${colors.accent}55`,
        }}>الف مبروك</h2>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, margin: '4px 0',
        }}>
          <div style={{ flex: 1, height: 1, background: colors.accent, opacity: 0.6 }} />
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: colors.accent }} />
          <div style={{ flex: 1, height: 1, background: colors.accent, opacity: 0.6 }} />
        </div>
        <p style={{ color: colors.primary, fontSize: 10, margin: 0, opacity: 0.75, letterSpacing: 1 }}>
          {email || 'أفراح آل القيسي'}
        </p>
      </div>

      {/* Content row: text + photo */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex',
        flex: 1,
        padding: '8px 22px',
        gap: 12,
        height: 290,
      }}>
        {/* Text block */}
        <div style={{
          flex: 1,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          gap: 6,
        }}>
          <p style={{ color: colors.primary, fontSize: 10, margin: 0, fontWeight: 600 }}>
            لفخامة العريس الغالي
          </p>
          <h1 style={{
            color: colors.primary,
            fontSize: 36, fontWeight: 900,
            margin: '2px 0', lineHeight: 1.0,
          }}>{title || 'محمد'}</h1>

          <p style={{ color: colors.secondary, fontSize: 12, fontWeight: 700, margin: '2px 0' }}>
            {subtitle || 'حمود القيسي'}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ height: 1.5, flex: 1, background: colors.accent, opacity: 0.5 }} />
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: colors.accent }} />
          </div>

          <p style={{ color: '#777', fontSize: 10, margin: 0 }}>تهنئة خاصة مقدمة من</p>
          <p style={{ color: colors.primary, fontSize: 11, fontWeight: 700, margin: 0, lineHeight: 1.4 }}>
            {lines[0] || 'العائلة الكريمة'}
          </p>

          {lines.slice(1).map((l, i) => (
            <p key={i} style={{ color: i === 1 ? colors.primary : '#888', fontSize: i === 1 ? 13 : 10, fontWeight: i === 1 ? 800 : 400, margin: 0 }}>{l}</p>
          ))}

          {website && (
            <p style={{ color: '#888', fontSize: 9, margin: '2px 0 0' }}>📍 {website}</p>
          )}
        </div>

        {/* Photo */}
        <div style={{ width: 115, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            width: 110, height: 220,
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 4,
            background: `linear-gradient(180deg, ${colors.primary}22, ${colors.accent}33)`,
            border: `2px solid ${colors.accent}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {image ? (
              <img src={image} alt="صورة"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 44 }}>👤</div>
                <span style={{ color: `${colors.primary}77`, fontSize: 8 }}>صورة</span>
              </div>
            )}
            {/* Photo frame corners */}
            <div style={{ position: 'absolute', top: -1, right: -1, width: 12, height: 12, borderTop: `3px solid ${colors.accent}`, borderRight: `3px solid ${colors.accent}` }} />
            <div style={{ position: 'absolute', top: -1, left: -1, width: 12, height: 12, borderTop: `3px solid ${colors.accent}`, borderLeft: `3px solid ${colors.accent}` }} />
            <div style={{ position: 'absolute', bottom: -1, right: -1, width: 12, height: 12, borderBottom: `3px solid ${colors.accent}`, borderRight: `3px solid ${colors.accent}` }} />
            <div style={{ position: 'absolute', bottom: -1, left: -1, width: 12, height: 12, borderBottom: `3px solid ${colors.accent}`, borderLeft: `3px solid ${colors.accent}` }} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: 'relative', zIndex: 1,
        margin: '0 22px 22px',
        textAlign: 'center',
        borderTop: `1px solid ${colors.accent}55`,
        paddingTop: 8,
      }}>
        <p style={{
          color: colors.primary,
          fontSize: 14,
          fontWeight: 900,
          margin: 0,
          letterSpacing: 1,
        }}>دامت أيامكم عامرة بالمسرات</p>
      </div>
    </div>
  );
}
