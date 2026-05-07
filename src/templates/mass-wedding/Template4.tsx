import type { TemplateData } from '../../types/template';

export default function Template4({ data }: { data: TemplateData }) {
  const couples = data.description ? data.description.split('\n').filter(Boolean) : [];
  const images = data.images || [];
  const fs = (data.fontSize ?? 21) / 21;

  const filledCount = images.filter(Boolean).length;
  const gridCols = filledCount === 0 ? 3 : filledCount === 1 ? 1 : filledCount === 2 ? 2 : 3;
  const imgW = filledCount === 1 ? 120 : filledCount === 2 ? 96 : 62;
  const imgH = Math.round(imgW * 1.13);
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
        fontFamily: "'Georgia', serif",
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Rich gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(160deg, ${data.colors.primary}28 0%, transparent 50%, ${data.colors.accent}18 100%)`,
        pointerEvents: 'none',
      }} />

      {/* Diagonal stripe texture */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <pattern id="mw4-stripe" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="12" stroke={data.colors.primary} strokeWidth="0.4" opacity="0.07" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mw4-stripe)" />
      </svg>

      {/* Corner ornaments */}
      <svg style={{ position: 'absolute', top: 0, right: 0 }} width="60" height="60" viewBox="0 0 60 60">
        <path d="M60,0 L60,60 L0,0 Z" fill={data.colors.primary} opacity="0.12" />
        <path d="M60,0 L60,25 M60,0 L35,0" stroke={data.colors.primary} strokeWidth="1.5" opacity="0.5" />
        <path d="M60,0 L60,18 M60,0 L42,0" stroke={data.colors.accent} strokeWidth="0.5" opacity="0.7" />
        <circle cx="54" cy="6" r="2" fill={data.colors.accent} opacity="0.7" />
      </svg>
      <svg style={{ position: 'absolute', top: 0, left: 0, transform: 'scaleX(-1)' }} width="60" height="60" viewBox="0 0 60 60">
        <path d="M60,0 L60,60 L0,0 Z" fill={data.colors.primary} opacity="0.12" />
        <path d="M60,0 L60,25 M60,0 L35,0" stroke={data.colors.primary} strokeWidth="1.5" opacity="0.5" />
        <circle cx="54" cy="6" r="2" fill={data.colors.accent} opacity="0.7" />
      </svg>
      <svg style={{ position: 'absolute', bottom: 0, right: 0, transform: 'scaleY(-1)' }} width="60" height="60" viewBox="0 0 60 60">
        <path d="M60,0 L60,60 L0,0 Z" fill={data.colors.primary} opacity="0.12" />
        <circle cx="54" cy="6" r="2" fill={data.colors.accent} opacity="0.7" />
      </svg>
      <svg style={{ position: 'absolute', bottom: 0, left: 0, transform: 'scale(-1,-1)' }} width="60" height="60" viewBox="0 0 60 60">
        <path d="M60,0 L60,60 L0,0 Z" fill={data.colors.primary} opacity="0.12" />
        <circle cx="54" cy="6" r="2" fill={data.colors.accent} opacity="0.7" />
      </svg>

      {/* Double border */}
      <div style={{ position: 'absolute', inset: '5px', border: `1.5px solid ${data.colors.primary}`, opacity: 0.3, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: '8px', border: `0.5px solid ${data.colors.primary}`, opacity: 0.15, pointerEvents: 'none' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, padding: '18px 14px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Header tag */}
        <div style={{
          padding: '3px 16px', marginBottom: '6px',
          background: `linear-gradient(to left, ${data.colors.primary}22, ${data.colors.accent}33, ${data.colors.primary}22)`,
          border: `1px solid ${data.colors.primary}55`,
        }}>
          <span style={{ color: data.colors.primary, fontSize: `${6.5 * fs}px`, letterSpacing: '0.15em' }}>✦ {data.eventLabel ?? 'دعوة عرس جماعي'} ✦</span>
        </div>

        {/* Event title */}
        <div style={{
          color: data.colors.secondary, fontSize: `${13 * fs}px`, fontWeight: 'bold',
          textAlign: 'center', lineHeight: 1.35, marginBottom: '4px',
        }}>
          {data.title}
        </div>

        {/* Gold accent lines */}
        <div style={{ display: 'flex', gap: '3px', alignItems: 'center', marginBottom: '5px' }}>
          <div style={{ width: '24px', height: '1.5px', background: `linear-gradient(to right, transparent, ${data.colors.primary})` }} />
          <div style={{ width: '6px', height: '6px', transform: 'rotate(45deg)', border: `1.5px solid ${data.colors.primary}`, opacity: 0.8 }} />
          <div style={{ width: '24px', height: '1.5px', background: `linear-gradient(to left, transparent, ${data.colors.primary})` }} />
        </div>

        {/* Subtitle */}
        <div style={{ color: data.colors.secondary, fontSize: `${7 * fs}px`, textAlign: 'center', lineHeight: 1.7, opacity: 0.75, marginBottom: '10px' }}>
          {data.subtitle}
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', width: '100%', marginBottom: '10px' }}>
          <div style={{ flex: 1, height: '1px', background: `linear-gradient(to left, ${data.colors.primary}99, transparent)` }} />
          <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6,0 L7.5,4.5 L12,6 L7.5,7.5 L6,12 L4.5,7.5 L0,6 L4.5,4.5 Z" fill={data.colors.primary} opacity="0.8" /></svg>
          <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, ${data.colors.primary}99, transparent)` }} />
        </div>

        {/* Responsive photos — portrait style */}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridCols}, 1fr)`, gap: '8px', width: '100%', marginBottom: '10px' }}>
          {slots.map(i => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div style={{ position: 'relative' }}>
                {[
                  { top: '-2px', right: '-2px', borderTop: `2px solid ${data.colors.accent}${images[i] ? '' : '44'}`, borderRight: `2px solid ${data.colors.accent}${images[i] ? '' : '44'}`, width: '8px', height: '8px' },
                  { top: '-2px', left: '-2px', borderTop: `2px solid ${data.colors.accent}${images[i] ? '' : '44'}`, borderLeft: `2px solid ${data.colors.accent}${images[i] ? '' : '44'}`, width: '8px', height: '8px' },
                  { bottom: '-2px', right: '-2px', borderBottom: `2px solid ${data.colors.accent}${images[i] ? '' : '44'}`, borderRight: `2px solid ${data.colors.accent}${images[i] ? '' : '44'}`, width: '8px', height: '8px' },
                  { bottom: '-2px', left: '-2px', borderBottom: `2px solid ${data.colors.accent}${images[i] ? '' : '44'}`, borderLeft: `2px solid ${data.colors.accent}${images[i] ? '' : '44'}`, width: '8px', height: '8px' },
                ].map((s, ci) => (
                  <div key={ci} style={{ position: 'absolute', ...s as React.CSSProperties, zIndex: 2 }} />
                ))}
                <div style={{
                  width: `${imgW}px`, height: `${imgH}px`,
                  border: `1px ${images[i] ? 'solid' : 'dashed'} ${data.colors.primary}${images[i] ? '88' : '44'}`,
                  overflow: 'hidden',
                  background: images[i] ? 'transparent' : `${data.colors.primary}08`,
                  boxShadow: images[i] ? `2px 2px 8px ${data.colors.primary}33` : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {images[i]
                    ? <img src={images[i]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <div style={{ width: '20px', height: '26px', background: `${data.colors.primary}18`, border: `1px solid ${data.colors.primary}25` }} />
                  }
                </div>
              </div>
              {couples[i] && (
                <span style={{ color: data.colors.secondary, fontSize: `${6.5 * fs}px`, textAlign: 'center', lineHeight: 1.4, maxWidth: `${imgW + 10}px`, fontWeight: '600', opacity: images[i] ? 1 : 0.45 }}>
                  {couples[i]}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Bottom divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', width: '100%', marginBottom: '6px' }}>
          <div style={{ flex: 1, height: '1px', background: `linear-gradient(to left, ${data.colors.primary}88, transparent)` }} />
          <svg width="14" height="8" viewBox="0 0 14 8"><path d="M7,4 Q4,1 1,4 Q4,7 7,4 Q10,1 13,4 Q10,7 7,4 Z" fill={data.colors.primary} opacity="0.6" /></svg>
          <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, ${data.colors.primary}88, transparent)` }} />
        </div>

        {(data.phone || data.website) && (
          <div style={{ textAlign: 'center', lineHeight: 1.9 }}>
            {data.phone && <div style={{ color: data.colors.secondary, fontSize: `${7 * fs}px`, opacity: 0.7 }}>{data.phone}</div>}
            {data.website && <div style={{ color: data.colors.secondary, fontSize: `${7 * fs}px`, opacity: 0.7 }}>{data.website}</div>}
          </div>
        )}
      </div>
    </div>
  );
}
