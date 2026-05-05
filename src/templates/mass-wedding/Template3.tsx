import type { TemplateData } from '../../types/template';

export default function Template3({ data }: { data: TemplateData }) {
  const couples = data.description ? data.description.split('\n').filter(Boolean) : [];
  const images = data.images || [];
  const fs = data.fontSize ?? 1;

  const filledCount = images.filter(Boolean).length;
  const gridCols = filledCount === 0 ? 3 : filledCount === 1 ? 1 : filledCount === 2 ? 2 : 3;
  const imgSize = filledCount === 1 ? 120 : filledCount === 2 ? 96 : 60;
  const ringSize1 = imgSize + 12;
  const ringSize2 = imgSize + 6;
  const slots = filledCount > 0
    ? Array.from({ length: 6 }, (_, i) => i).filter(i => !!images[i])
    : Array.from({ length: 6 }, (_, i) => i);

  return (
    <div
      id="template-preview"
      style={{
        width: '280px',
        minHeight: '490px',
        backgroundColor: data.colors.bg,
        direction: 'rtl',
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Geometric grid lines background */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <pattern id="mw3-grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M28,0 L0,0 L0,28" fill="none" stroke={data.colors.primary} strokeWidth="0.3" opacity="0.15" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mw3-grid)" />
      </svg>

      {/* Glow orbs */}
      <div style={{
        position: 'absolute', top: '-40px', right: '-40px',
        width: '160px', height: '160px', borderRadius: '50%',
        background: `radial-gradient(circle, ${data.colors.primary}40 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-30px', left: '-30px',
        width: '130px', height: '130px', borderRadius: '50%',
        background: `radial-gradient(circle, ${data.colors.accent}30 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Top accent bar */}
      <div style={{ height: '3px', background: `linear-gradient(to left, transparent, ${data.colors.accent}, ${data.colors.primary}, ${data.colors.accent}, transparent)` }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, padding: '16px 16px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Event label */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          padding: '2px 10px', marginBottom: '8px',
          border: `1px solid ${data.colors.primary}66`,
          background: `${data.colors.primary}15`,
          borderRadius: '2px',
        }}>
          <div style={{ width: '16px', height: '1px', background: data.colors.primary }} />
          <span style={{ color: data.colors.primary, fontSize: `${6.5 * fs}px`, letterSpacing: '0.18em' }}>{data.eventLabel ?? 'دعوة عرس جماعي'}</span>
          <div style={{ width: '16px', height: '1px', background: data.colors.primary }} />
        </div>

        {/* Event title */}
        <div style={{
          color: data.colors.accent,
          fontSize: `${14 * fs}px`, fontWeight: '800',
          textAlign: 'center', lineHeight: 1.3,
          marginBottom: '3px',
          letterSpacing: '-0.01em',
          textShadow: `0 0 20px ${data.colors.accent}55`,
        }}>
          {data.title}
        </div>

        {/* Subtitle */}
        <div style={{ color: data.colors.secondary, fontSize: `${7 * fs}px`, textAlign: 'center', lineHeight: 1.7, marginBottom: '10px', opacity: 0.7, letterSpacing: '0.04em' }}>
          {data.subtitle}
        </div>

        {/* Geometric divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', width: '100%', marginBottom: '10px' }}>
          <div style={{ flex: 1, height: '1px', background: `linear-gradient(to left, ${data.colors.primary}aa, transparent)` }} />
          <svg width="10" height="10" viewBox="0 0 10 10">
            <rect x="2" y="2" width="6" height="6" fill="none" stroke={data.colors.primary} strokeWidth="1" transform="rotate(45 5 5)" opacity="0.8" />
            <rect x="4" y="4" width="2" height="2" fill={data.colors.primary} transform="rotate(45 5 5)" opacity="0.8" />
          </svg>
          <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, ${data.colors.primary}aa, transparent)` }} />
        </div>

        {/* Responsive photos grid with glow rings */}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridCols}, 1fr)`, gap: '10px', width: '100%', marginBottom: '10px' }}>
          {slots.map(i => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', width: `${ringSize1}px`, height: `${ringSize1}px`, borderRadius: '50%', border: `1px solid ${data.colors.primary}`, opacity: 0.2 }} />
                <div style={{ position: 'absolute', width: `${ringSize2}px`, height: `${ringSize2}px`, borderRadius: '50%', border: `1px solid ${data.colors.primary}`, opacity: 0.35 }} />
                <div style={{
                  width: `${imgSize}px`, height: `${imgSize}px`, borderRadius: '50%',
                  border: `2px ${images[i] ? 'solid' : 'dashed'} ${data.colors.primary}${images[i] ? '' : '55'}`,
                  overflow: 'hidden',
                  boxShadow: images[i] ? `0 0 10px ${data.colors.primary}44, inset 0 0 4px ${data.colors.primary}22` : 'none',
                  background: images[i] ? 'transparent' : `${data.colors.primary}08`,
                  flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {images[i]
                    ? <img src={images[i]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: `${data.colors.primary}22` }} />
                  }
                </div>
                {images[i] && <div style={{ position: 'absolute', top: '2px', right: '2px', width: '6px', height: '6px', borderRadius: '50%', background: data.colors.accent, boxShadow: `0 0 4px ${data.colors.accent}` }} />}
              </div>
              {couples[i] && (
                <span style={{ color: data.colors.secondary, fontSize: `${6.5 * fs}px`, textAlign: 'center', lineHeight: 1.4, maxWidth: `${imgSize + 12}px`, fontWeight: '600', letterSpacing: '0.02em', opacity: images[i] ? 1 : 0.45 }}>
                  {couples[i]}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Bottom geometric divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', width: '100%', marginBottom: '6px' }}>
          <div style={{ flex: 1, height: '1px', background: `linear-gradient(to left, ${data.colors.primary}66, transparent)` }} />
          <svg width="16" height="4" viewBox="0 0 16 4">
            <rect x="0" y="1" width="4" height="2" fill={data.colors.primary} opacity="0.6" />
            <rect x="6" y="0" width="4" height="4" fill={data.colors.primary} opacity="0.8" />
            <rect x="12" y="1" width="4" height="2" fill={data.colors.primary} opacity="0.6" />
          </svg>
          <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, ${data.colors.primary}66, transparent)` }} />
        </div>

        {/* Footer */}
        {(data.phone || data.website) && (
          <div style={{ textAlign: 'center', lineHeight: 1.9 }}>
            {data.phone && <div style={{ color: data.colors.secondary, fontSize: `${7 * fs}px`, opacity: 0.6, letterSpacing: '0.04em' }}>{data.phone}</div>}
            {data.website && <div style={{ color: data.colors.secondary, fontSize: `${7 * fs}px`, opacity: 0.6, letterSpacing: '0.04em' }}>{data.website}</div>}
          </div>
        )}
      </div>

      {/* Bottom accent bar */}
      <div style={{ height: '3px', background: `linear-gradient(to right, transparent, ${data.colors.accent}, ${data.colors.primary}, ${data.colors.accent}, transparent)` }} />
    </div>
  );
}
