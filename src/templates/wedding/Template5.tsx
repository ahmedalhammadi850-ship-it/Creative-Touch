import type { TemplateData } from '../../types/template';
interface Props { data: TemplateData; }

export default function WeddingTemplate5({ data }: Props) {
  const { title, subtitle, description, email, website, colors, image } = data;
  const lines = (description || '').split('\n').filter(Boolean);
  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div id="template-preview" style={{
      width: 280, height: 400, position: 'relative', overflow: 'hidden',
      fontFamily: 'Cairo, sans-serif', direction: 'rtl',
      background: colors.bg || '#fff8f0', display: 'flex', flexDirection: 'column',
    }}>
      {/* SVG floral top decoration */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 120, pointerEvents: 'none', zIndex: 1 }} viewBox="0 0 280 120">
        {/* Soft gradient arc */}
        <path d="M0,0 Q140,80 280,0 L280,20 Q140,100 0,20 Z" fill={colors.primary} opacity="0.9"/>
        <path d="M0,0 Q140,60 280,0 L280,8 Q140,68 0,8 Z" fill={colors.accent} opacity="0.5"/>
        {/* Floral motifs */}
        {[50,140,230].map((cx, i) => (
          <g key={i} transform={`translate(${cx},16)`}>
            {[0,60,120,180,240,300].map((a, j) => {
              const rad = (a * Math.PI) / 180;
              return <ellipse key={j} cx={Math.cos(rad)*7} cy={Math.sin(rad)*7} rx="4" ry="2.5"
                fill={colors.accent} opacity="0.7" transform={`rotate(${a}, ${Math.cos(rad)*7}, ${Math.sin(rad)*7})`}/>;
            })}
            <circle cx="0" cy="0" r="3" fill="#ffffff" opacity="0.8"/>
          </g>
        ))}
      </svg>

      {/* Photo */}
      <div style={{ height: 150, position: 'relative', flexShrink: 0 }}>
        {image ? (
          <img src={image} alt="صورة" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: `linear-gradient(160deg, ${colors.primary}33, ${colors.accent}22)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: 44 + _d, opacity: 0.4 }}>💍</div>
            <span style={{ color: `${colors.primary}88`, fontSize: 10 + _d }}>صورة الزفاف</span>
          </div>
        )}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, background: `linear-gradient(to top, ${colors.bg || '#fff8f0'}, transparent)` }} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '8px 20px 16px', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, width: '100%' }}>
          <div style={{ flex: 1, height: 1, background: colors.accent, opacity: 0.5 }} />
          <span style={{ color: colors.accent, fontSize: 12 + _d }}>✿</span>
          <div style={{ flex: 1, height: 1, background: colors.accent, opacity: 0.5 }} />
        </div>

        <p style={{ color: colors.primary, fontSize: 10 + _d, margin: 0, fontWeight: 600, textAlign: 'center' }}>
          {email || 'يتشرف بدعوتكم لحضور'}
        </p>
        <h1 style={{ color: colors.primary, fontSize: 24 + _d, fontWeight: 900, margin: 0, textAlign: 'center', lineHeight: 1.1 }}>{title || 'حفل زفاف'}</h1>
        <p style={{ color: colors.secondary, fontSize: 12 + _d, fontWeight: 700, margin: 0, textAlign: 'center' }}>{subtitle || 'علي & فاطمة'}</p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, width: '100%' }}>
          <div style={{ flex: 1, height: 1, background: colors.accent, opacity: 0.3 }} />
          <span style={{ color: colors.accent, fontSize: 10 + _d }}>💫</span>
          <div style={{ flex: 1, height: 1, background: colors.accent, opacity: 0.3 }} />
        </div>

        {lines.map((l, i) => (
          <p key={i} style={{ color: i === 1 ? colors.primary : '#777', fontSize: i === 1 ? 14 : 10, fontWeight: i === 1 ? 800 : 400, margin: 0, textAlign: 'center' }}>{l}</p>
        ))}
        {website && <p style={{ color: '#999', fontSize: 9 + _d, margin: '2px 0 0', textAlign: 'center' }}>📍 {website}</p>}
      </div>

      {/* Bottom SVG wave */}
      <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 24, pointerEvents: 'none' }} viewBox="0 0 280 24">
        <path d="M0,24 Q70,0 140,12 Q210,24 280,0 L280,24 Z" fill={colors.primary} opacity="0.8"/>
      </svg>
    </div>
  );
}
