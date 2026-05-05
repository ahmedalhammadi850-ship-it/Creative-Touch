import type { TemplateData } from '../../types/template';

export default function Template12({ data }: { data: TemplateData }) {
  const couples = data.description ? data.description.split('\n').filter(Boolean) : [];
  const images = data.images || [];
  const fs = data.fontSize ?? 1;
  const filledCount = images.filter(Boolean).length;
  const gridCols = filledCount === 0 ? 3 : filledCount === 1 ? 1 : filledCount === 2 ? 2 : 3;
  const imgSize = filledCount === 1 ? 110 : filledCount === 2 ? 90 : 60;
  const slots = filledCount > 0
    ? Array.from({ length: 6 }, (_, i) => i).filter(i => !!images[i])
    : Array.from({ length: 6 }, (_, i) => i);

  return (
    <div id="template-preview" style={{
      width: '280px', minHeight: '500px',
      backgroundColor: '#0a1628',
      direction: 'rtl',
      fontFamily: "'Georgia', 'Times New Roman', serif",
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Damask SVG pattern */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.07, pointerEvents: 'none' }}>
        <defs>
          <pattern id="mw12-damask" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M20,0 C25,5 30,5 30,10 C30,15 25,15 20,20 C15,15 10,15 10,10 C10,5 15,5 20,0Z" fill={data.colors.accent} />
            <path d="M0,20 C5,15 5,10 10,10 C15,10 15,15 20,20 C15,25 15,30 10,30 C5,30 5,25 0,20Z" fill={data.colors.accent} />
            <path d="M40,20 C35,15 35,10 30,10 C25,10 25,15 20,20 C25,25 25,30 30,30 C35,30 35,25 40,20Z" fill={data.colors.accent} />
            <path d="M20,40 C15,35 10,35 10,30 C10,25 15,25 20,20 C25,25 30,25 30,30 C30,35 25,35 20,40Z" fill={data.colors.accent} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mw12-damask)" />
      </svg>

      {/* Gold corner ornaments */}
      {[
        { top: '4px', right: '4px', borderTop: `2px solid ${data.colors.accent}`, borderRight: `2px solid ${data.colors.accent}` },
        { top: '4px', left: '4px', borderTop: `2px solid ${data.colors.accent}`, borderLeft: `2px solid ${data.colors.accent}` },
        { bottom: '4px', right: '4px', borderBottom: `2px solid ${data.colors.accent}`, borderRight: `2px solid ${data.colors.accent}` },
        { bottom: '4px', left: '4px', borderBottom: `2px solid ${data.colors.accent}`, borderLeft: `2px solid ${data.colors.accent}` },
      ].map((s, i) => <div key={i} style={{ position: 'absolute', ...s, width: '18px', height: '18px', zIndex: 3 }} />)}

      <div style={{ position: 'absolute', inset: '8px', border: `0.5px solid ${data.colors.accent}44`, zIndex: 1, pointerEvents: 'none' }} />

      {/* Header */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '22px 20px 14px' }}>
        <div style={{ color: data.colors.accent, fontSize: `${6 * fs}px`, letterSpacing: '0.35em', fontWeight: 400, marginBottom: '4px', opacity: 0.85 }}>
          ✦ {data.eventLabel ?? 'دعوة عرس جماعي'} ✦
        </div>
        <div style={{
          color: data.colors.accent,
          fontSize: `${15 * fs}px`, fontWeight: 700,
          lineHeight: 1.25, textShadow: `0 2px 12px ${data.colors.accent}66`,
          fontFamily: "'Georgia', serif",
        }}>{data.title}</div>
        <div style={{ width: '60px', height: '1px', background: `linear-gradient(to left, transparent, ${data.colors.accent}, transparent)`, margin: '8px auto' }} />
        <div style={{ color: `${data.colors.accent}bb`, fontSize: `${7 * fs}px`, lineHeight: 1.7 }}>{data.subtitle}</div>
      </div>

      {/* Ornament divider */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: '4px', padding: '0 16px', marginBottom: '12px' }}>
        <div style={{ flex: 1, height: '1px', background: `linear-gradient(to left, ${data.colors.accent}88, transparent)` }} />
        <svg width="18" height="18" viewBox="0 0 18 18"><path d="M9,0 L10.5,6 L16,6 L11.5,9.5 L13,16 L9,12.5 L5,16 L6.5,9.5 L2,6 L7.5,6 Z" fill={data.colors.accent} opacity="0.8" /></svg>
        <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, ${data.colors.accent}88, transparent)` }} />
      </div>

      {/* Couple photo grid */}
      <div style={{ position: 'relative', zIndex: 2, padding: '0 14px 12px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridCols}, 1fr)`, gap: '10px' }}>
          {slots.map(i => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
              <div style={{
                width: `${imgSize}px`, height: `${imgSize}px`, borderRadius: '50%',
                border: `2px solid ${data.colors.accent}`,
                boxShadow: images[i] ? `0 0 0 3px #0a162888, 0 0 0 5px ${data.colors.accent}55` : 'none',
                overflow: 'hidden',
                background: images[i] ? 'transparent' : `${data.colors.accent}10`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {images[i]
                  ? <img src={images[i]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <div style={{ width: imgSize * 0.35, height: imgSize * 0.35, borderRadius: '50%', background: `${data.colors.accent}22` }} />
                }
              </div>
              {couples[i] && (
                <span style={{ color: data.colors.accent, fontSize: `${6 * fs}px`, textAlign: 'center', lineHeight: 1.4, fontFamily: "'Georgia', serif", opacity: images[i] ? 1 : 0.45, maxWidth: `${imgSize + 12}px` }}>
                  {couples[i]}
                </span>
              )}
            </div>
          ))}
        </div>

        {(data.phone || data.website) && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', margin: '12px 0 6px' }}>
              <div style={{ flex: 1, height: '1px', background: `${data.colors.accent}44` }} />
              <div style={{ width: '5px', height: '5px', transform: 'rotate(45deg)', background: data.colors.accent, opacity: 0.7 }} />
              <div style={{ flex: 1, height: '1px', background: `${data.colors.accent}44` }} />
            </div>
            <div style={{ textAlign: 'center' }}>
              {data.phone && <div style={{ color: `${data.colors.accent}99`, fontSize: `${6.5 * fs}px` }}>{data.phone}</div>}
              {data.website && <div style={{ color: `${data.colors.accent}99`, fontSize: `${6.5 * fs}px` }}>{data.website}</div>}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
