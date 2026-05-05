import type { TemplateData } from '../../types/template';

interface Props { data: TemplateData; }

export default function CongratsTemplate7({ data }: Props) {
  const { title, subtitle, description, email, website, colors, image } = data;
  const lines = (description || '').split('\n').filter(Boolean);

  const r = 90;
  const cx = 180;
  const cy = 170;

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
        background: `linear-gradient(170deg, ${colors.bg || '#1a1a2e'} 0%, ${colors.secondary} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* SVG arabesque circle frame + decorations */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }} viewBox="0 0 360 460">
        <defs>
          <clipPath id="circleClip7">
            <circle cx={cx} cy={cy} r={r - 4} />
          </clipPath>
        </defs>

        {/* Outer glow ring */}
        <circle cx={cx} cy={cy} r={r + 16} fill="none" stroke={colors.accent} strokeWidth="0.5" opacity="0.3" strokeDasharray="4 6"/>
        <circle cx={cx} cy={cy} r={r + 8} fill="none" stroke={colors.accent} strokeWidth="0.8" opacity="0.5" strokeDasharray="2 4"/>
        {/* Main circle border */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={colors.accent} strokeWidth="2.5"/>
        <circle cx={cx} cy={cy} r={r - 6} fill="none" stroke={colors.accent} strokeWidth="0.6" opacity="0.5"/>

        {/* Ornamental petals around circle */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const px = cx + (r + 4) * Math.cos(angle);
          const py = cy + (r + 4) * Math.sin(angle);
          return <circle key={i} cx={px} cy={py} r="3.5" fill={colors.accent} opacity={i % 3 === 0 ? 0.9 : 0.4}/>;
        })}

        {/* Top diamond ornament */}
        <polygon points={`${cx},${cy - r - 24} ${cx + 8},${cy - r - 14} ${cx},${cy - r - 4} ${cx - 8},${cy - r - 14}`}
          fill={colors.accent} opacity="0.9"/>

        {/* Side ornamental lines */}
        <line x1="20" y1={cy} x2={cx - r - 20} y2={cy} stroke={colors.accent} strokeWidth="1" opacity="0.6"/>
        <line x1="20" y1={cy - 5} x2={cx - r - 30} y2={cy - 5} stroke={colors.accent} strokeWidth="0.4" opacity="0.4"/>
        <line x1={cx + r + 20} y1={cy} x2="340" y2={cy} stroke={colors.accent} strokeWidth="1" opacity="0.6"/>
        <line x1={cx + r + 30} y1={cy - 5} x2="340" y2={cy - 5} stroke={colors.accent} strokeWidth="0.4" opacity="0.4"/>

        {/* Corner dots */}
        {[20, 340].map((x, i) => [80, 380].map((y, j) => (
          <polygon key={`${i}-${j}`}
            points={`${x},${y - 6} ${x + 5},${y} ${x},${y + 6} ${x - 5},${y}`}
            fill={colors.accent} opacity="0.5"/>
        )))}

        {/* Bottom ornament */}
        <g transform={`translate(${cx}, 390)`}>
          <line x1="-50" y1="0" x2="-12" y2="0" stroke={colors.accent} strokeWidth="1" opacity="0.6"/>
          <polygon points="0,-5 6,0 0,5 -6,0" fill={colors.accent}/>
          <line x1="12" y1="0" x2="50" y2="0" stroke={colors.accent} strokeWidth="1" opacity="0.6"/>
        </g>

        {/* Photo clipped to circle (rendered via foreignObject approach) */}
        {image && (
          <image
            href={image}
            x={cx - r + 4} y={cy - r + 4}
            width={(r - 4) * 2} height={(r - 4) * 2}
            clipPath="url(#circleClip7)"
            preserveAspectRatio="xMidYMin slice"
          />
        )}

        {/* Placeholder if no image */}
        {!image && (
          <g>
            <circle cx={cx} cy={cy} r={r - 4} fill={`${colors.primary}44`}/>
            <text x={cx} y={cy - 8} textAnchor="middle" fontSize="36" fill={`${colors.accent}88`}>👤</text>
            <text x={cx} y={cy + 20} textAnchor="middle" fontSize="9" fill={`${colors.accent}66`}>ارفع صورة</text>
          </g>
        )}
      </svg>

      {/* Top text */}
      <div style={{
        position: 'absolute', top: 18, left: 0, right: 0,
        textAlign: 'center', zIndex: 3,
      }}>
        <p style={{ color: colors.accent, fontSize: 10, margin: 0, letterSpacing: 2, fontWeight: 700 }}>
          ✦ بمناسبة الزفاف الميمون ✦
        </p>
      </div>

      {/* Name below circle */}
      <div style={{
        position: 'absolute',
        top: cy + r + 20,
        left: 0, right: 0,
        textAlign: 'center',
        zIndex: 3,
        padding: '0 30px',
      }}>
        <h1 style={{
          color: '#ffffff',
          fontSize: 30, fontWeight: 900,
          margin: '0 0 4px', lineHeight: 1.1,
          textShadow: `0 2px 16px ${colors.primary}`,
        }}>{title || 'محمد'}</h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', margin: '6px 0' }}>
          <div style={{ height: 1, width: 40, background: colors.accent }} />
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: colors.accent }} />
          <div style={{ height: 1, width: 40, background: colors.accent }} />
        </div>

        <p style={{ color: '#ffffffaa', fontSize: 11, margin: '0 0 4px' }}>
          {subtitle || 'يتشرف الوالد بالدعوة'}
        </p>

        {lines.length > 0 && (
          <div style={{
            background: colors.accent,
            borderRadius: 3,
            padding: '4px 16px',
            display: 'inline-block',
            margin: '6px 0',
          }}>
            <span style={{ color: colors.bg || '#1a1a2e', fontSize: 11, fontWeight: 900 }}>
              {lines[0]}
            </span>
          </div>
        )}

        <p style={{ color: colors.accent, fontSize: 15, fontWeight: 900, margin: '4px 0 0' }}>
          {lines[1] || '28 - 7 - 2025'}
        </p>

        {website && <p style={{ color: '#ffffff88', fontSize: 10, margin: '2px 0 0' }}>📍 {website}</p>}
        {email && <p style={{ color: colors.accent, fontSize: 9, margin: '4px 0 0', fontWeight: 600 }}>{email}</p>}
      </div>
    </div>
  );
}
