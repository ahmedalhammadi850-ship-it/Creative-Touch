import type { TemplateData } from '../../types/template';

export default function Template6({ data }: { data: TemplateData }) {
  const couples = data.description ? data.description.split('\n').filter(Boolean) : [];
  const images = data.images || [];
  const visible = Array.from({ length: 6 }, (_, i) => i).filter(i => !!images[i]);
  const hasPhotos = visible.length > 0;
  const slots = hasPhotos ? visible : Array.from({ length: 6 }, (_, i) => i);

  return (
    <div id="template-preview" style={{ width: '280px', minHeight: '490px', backgroundColor: data.colors.bg, direction: 'rtl', fontFamily: "'Georgia', serif", position: 'relative', overflow: 'hidden' }}>
      {/* Emerald radial glow */}
      <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '200px', height: '200px', borderRadius: '50%', background: `radial-gradient(circle, ${data.colors.primary}50 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '160px', height: '160px', borderRadius: '50%', background: `radial-gradient(circle, ${data.colors.accent}30 0%, transparent 65%)`, pointerEvents: 'none' }} />

      {/* Hexagon pattern background */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06 }}>
        <defs>
          <pattern id="mw6-hex" width="24" height="28" patternUnits="userSpaceOnUse">
            <polygon points="12,2 22,7 22,21 12,26 2,21 2,7" fill="none" stroke={data.colors.primary} strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mw6-hex)" />
      </svg>

      {/* Left gold stripe */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '4px', height: '100%', background: `linear-gradient(to bottom, transparent, ${data.colors.accent}, ${data.colors.primary}, ${data.colors.accent}, transparent)` }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '20px 16px 14px' }}>
        {/* Top label */}
        <div style={{ textAlign: 'center', marginBottom: '6px' }}>
          <span style={{ color: data.colors.accent, fontSize: '7px', letterSpacing: '0.18em', display: 'block' }}>✦ مهرجان الفرح الجماعي ✦</span>
        </div>

        {/* Ornament divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
          <div style={{ flex: 1, height: '1px', background: `linear-gradient(to left, ${data.colors.accent}aa, transparent)` }} />
          <svg width="16" height="8" viewBox="0 0 16 8"><path d="M8,4 Q5,1 2,4 Q5,7 8,4 Q11,1 14,4 Q11,7 8,4 Z" fill={data.colors.accent} opacity="0.7" /></svg>
          <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, ${data.colors.accent}aa, transparent)` }} />
        </div>

        {/* Title */}
        <div style={{ color: data.colors.accent, fontSize: '13px', fontWeight: 'bold', textAlign: 'center', lineHeight: 1.35, marginBottom: '4px' }}>{data.title}</div>
        <div style={{ color: data.colors.secondary, fontSize: '7px', textAlign: 'center', lineHeight: 1.7, opacity: 0.8, marginBottom: '10px' }}>{data.subtitle}</div>

        {/* Second divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
          <div style={{ flex: 1, height: '0.5px', background: `${data.colors.primary}66` }} />
          <div style={{ width: '5px', height: '5px', transform: 'rotate(45deg)', background: data.colors.accent, opacity: 0.7 }} />
          <div style={{ flex: 1, height: '0.5px', background: `${data.colors.primary}66` }} />
        </div>

        {/* Photo grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', width: '100%' }}>
          {slots.map(i => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              {/* Hexagonal-ish frame */}
              <div style={{
                width: '62px', height: '62px',
                clipPath: 'polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)',
                border: `2px ${images[i] ? 'solid' : 'dashed'} ${data.colors.accent}${images[i] ? '' : '44'}`,
                overflow: 'hidden',
                background: images[i] ? 'transparent' : `${data.colors.primary}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {images[i]
                  ? <img src={images[i]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <div style={{ width: '22px', height: '22px', clipPath: 'polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)', background: `${data.colors.accent}22` }} />
                }
              </div>
              {couples[i] && (
                <span style={{ color: data.colors.secondary, fontSize: '6.5px', textAlign: 'center', lineHeight: 1.4, maxWidth: '72px', fontWeight: '600', opacity: images[i] ? 1 : 0.45 }}>
                  {couples[i]}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Bottom divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', width: '100%', margin: '12px 0 6px' }}>
          <div style={{ flex: 1, height: '0.5px', background: `${data.colors.primary}55` }} />
          <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6,0 L7.5,4.5 L12,6 L7.5,7.5 L6,12 L4.5,7.5 L0,6 L4.5,4.5 Z" fill={data.colors.accent} opacity="0.6" /></svg>
          <div style={{ flex: 1, height: '0.5px', background: `${data.colors.primary}55` }} />
        </div>

        {(data.phone || data.website) && (
          <div style={{ textAlign: 'center', lineHeight: 1.9 }}>
            {data.phone && <div style={{ color: data.colors.secondary, fontSize: '7px', opacity: 0.7 }}>{data.phone}</div>}
            {data.website && <div style={{ color: data.colors.secondary, fontSize: '7px', opacity: 0.7 }}>{data.website}</div>}
          </div>
        )}
      </div>
    </div>
  );
}
