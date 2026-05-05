import type { TemplateData } from '../../types/template';

interface Props { data: TemplateData; }

export default function CongratsTemplate5({ data }: Props) {
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
        background: colors.bg || '#f5f0e8',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* SVG arabesque border frame */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }} viewBox="0 0 360 460">
        {/* Outer border */}
        <rect x="8" y="8" width="344" height="444" fill="none" stroke={colors.accent} strokeWidth="1.5" />
        <rect x="14" y="14" width="332" height="432" fill="none" stroke={colors.accent} strokeWidth="0.5" />
        {/* Corner ornaments */}
        {[[14,14],[346,14],[14,446],[346,446]].map(([cx,cy], i) => (
          <g key={i} transform={`translate(${cx},${cy}) rotate(${[0,90,270,180][i]})`}>
            <path d="M0,0 L16,0 M0,0 L0,16" stroke={colors.accent} strokeWidth="2" fill="none"/>
            <circle cx="0" cy="0" r="3" fill={colors.accent}/>
            <path d="M4,0 Q8,4 4,8" stroke={colors.accent} strokeWidth="0.8" fill="none"/>
          </g>
        ))}
        {/* Top center ornament */}
        <g transform="translate(180,8)">
          <polygon points="0,-6 4,0 0,6 -4,0" fill={colors.accent}/>
          <line x1="-30" y1="0" x2="-8" y2="0" stroke={colors.accent} strokeWidth="0.8"/>
          <line x1="8" y1="0" x2="30" y2="0" stroke={colors.accent} strokeWidth="0.8"/>
        </g>
        {/* Bottom center ornament */}
        <g transform="translate(180,452)">
          <polygon points="0,-6 4,0 0,6 -4,0" fill={colors.accent}/>
          <line x1="-30" y1="0" x2="-8" y2="0" stroke={colors.accent} strokeWidth="0.8"/>
          <line x1="8" y1="0" x2="30" y2="0" stroke={colors.accent} strokeWidth="0.8"/>
        </g>
      </svg>

      {/* Top ribbon */}
      <div style={{
        background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
        height: 42,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', zIndex: 1,
        margin: '22px 22px 0',
      }}>
        <span style={{ color: colors.accent, fontSize: 13, fontWeight: 900, letterSpacing: 2 }}>
          ✦ بطاقة تهنئة ✦
        </span>
      </div>

      {/* Main content */}
      <div style={{ display: 'flex', flex: 1, padding: '0 22px', position: 'relative', zIndex: 1 }}>
        {/* Text side */}
        <div style={{
          flex: 1,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '16px 12px 16px 0',
          gap: 8,
        }}>
          <p style={{ color: colors.primary, fontSize: 10, margin: 0, fontWeight: 600, letterSpacing: 1 }}>
            بمناسبة زفاف نجلنا
          </p>
          <h1 style={{
            color: colors.primary,
            fontSize: 30, fontWeight: 900,
            margin: '4px 0', lineHeight: 1.1,
          }}>{title || 'أحمد'}</h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '2px 0' }}>
            <div style={{ height: 1, flex: 1, background: colors.accent }} />
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: colors.accent }} />
            <div style={{ height: 1, flex: 1, background: colors.accent }} />
          </div>

          <p style={{ color: '#555', fontSize: 11, margin: 0, fontWeight: 500 }}>يتشرف الوالد</p>
          <p style={{ color: colors.secondary, fontSize: 13, fontWeight: 700, margin: '0 0 6px', lineHeight: 1.3 }}>
            {subtitle || 'محمد بن علي'}
          </p>

          <div style={{
            background: colors.primary,
            borderRadius: 3,
            padding: '5px 10px',
            display: 'inline-block',
          }}>
            <span style={{ color: colors.accent, fontSize: 11, fontWeight: 700 }}>
              {lines[0] || 'المقيل والزفة والسمرة'}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 4 }}>
            {(lines.length > 1 ? lines.slice(1) : ['يوم الجمعة', '1 محرم 1447']).map((l, i) => (
              <p key={i} style={{
                color: i === 0 ? '#666' : colors.primary,
                fontSize: i === 0 ? 10 : 13,
                fontWeight: i === 0 ? 500 : 700,
                margin: 0,
              }}>{l}</p>
            ))}
            {website && (
              <p style={{ color: '#888', fontSize: 10, margin: '2px 0 0' }}>📍 {website}</p>
            )}
          </div>

          {email && (
            <div style={{
              marginTop: 6,
              borderTop: `1px solid ${colors.accent}55`,
              paddingTop: 6,
            }}>
              <p style={{ color: colors.primary, fontSize: 9, margin: 0, fontWeight: 600 }}>{email}</p>
            </div>
          )}
        </div>

        {/* Photo side */}
        <div style={{
          width: 130,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '16px 0',
          flexShrink: 0,
        }}>
          {/* Decorative photo frame */}
          <div style={{ position: 'relative', width: 110, height: 140 }}>
            {/* Outer gold frame */}
            <div style={{
              position: 'absolute', inset: -4,
              border: `2px solid ${colors.accent}`,
              borderRadius: 2,
            }} />
            <div style={{
              position: 'absolute', inset: -8,
              border: `1px solid ${colors.accent}55`,
              borderRadius: 2,
            }} />
            {/* Photo */}
            <div style={{
              width: '100%', height: '100%',
              overflow: 'hidden', borderRadius: 2,
              background: `linear-gradient(160deg, ${colors.primary}22, ${colors.secondary}33)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {image ? (
                <img src={image} alt="صورة"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 36 }}>👤</div>
                  <span style={{ color: `${colors.primary}88`, fontSize: 8 }}>ارفع صورة</span>
                </div>
              )}
            </div>
            {/* Corner decorations on photo */}
            {[[0,0],[1,0],[0,1],[1,1]].map(([r,b], i) => (
              <div key={i} style={{
                position: 'absolute',
                top: r ? undefined : -2, bottom: r ? -2 : undefined,
                right: b ? undefined : -2, left: b ? -2 : undefined,
                width: 10, height: 10,
                borderTop: r ? 'none' : `2px solid ${colors.accent}`,
                borderBottom: r ? `2px solid ${colors.accent}` : 'none',
                borderRight: b ? 'none' : `2px solid ${colors.accent}`,
                borderLeft: b ? `2px solid ${colors.accent}` : 'none',
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
        height: 32,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 22px 22px',
        position: 'relative', zIndex: 1,
      }}>
        <span style={{ color: colors.accent, fontSize: 10, fontWeight: 600 }}>
          ألف مبروك ودامت الأفراح
        </span>
      </div>
    </div>
  );
}
