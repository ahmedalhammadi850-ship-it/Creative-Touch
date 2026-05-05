import type { TemplateData } from '../../types/template';

export default function Template5({ data }: { data: TemplateData }) {
  const couples = data.description ? data.description.split('\n').filter(Boolean) : [];
  const images = data.images || [];
  const fs = data.fontSize ?? 1;

  const filledCount = images.filter(Boolean).length;
  const gridCols = filledCount === 0 ? 3 : filledCount === 1 ? 1 : filledCount === 2 ? 2 : 3;
  const imgSize = filledCount === 1 ? 120 : filledCount === 2 ? 96 : 62;
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
      {/* Subtle dot pattern */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <pattern id="mw5-dots" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="8" cy="8" r="0.7" fill={data.colors.primary} opacity="0.12" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mw5-dots)" />
      </svg>

      {/* Top color block header */}
      <div style={{
        position: 'relative',
        background: `linear-gradient(135deg, ${data.colors.primary} 0%, ${data.colors.secondary} 100%)`,
        padding: '18px 16px 20px',
        marginBottom: '0',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-20px', left: '-20px',
          width: '100px', height: '100px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-30px', right: '-10px',
          width: '120px', height: '120px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{
            display: 'inline-block',
            padding: '1px 10px', marginBottom: '6px',
            border: `1px solid ${data.colors.accent}88`,
            color: data.colors.accent,
            fontSize: `${6.5 * fs}px`, letterSpacing: '0.15em',
          }}>
            {data.eventLabel ?? 'دعوة عرس جماعي'}
          </div>

          <div style={{
            color: '#ffffff', fontSize: `${14 * fs}px`, fontWeight: '800',
            lineHeight: 1.3, marginBottom: '4px',
            textShadow: '0 1px 4px rgba(0,0,0,0.3)',
          }}>
            {data.title}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '3px', marginBottom: '5px' }}>
            <div style={{ width: '20px', height: '1.5px', backgroundColor: data.colors.accent }} />
            <div style={{ width: '6px', height: '6px', transform: 'rotate(45deg)', backgroundColor: data.colors.accent, marginTop: '-2px' }} />
            <div style={{ width: '20px', height: '1.5px', backgroundColor: data.colors.accent }} />
          </div>

          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: `${7 * fs}px`, lineHeight: 1.7, letterSpacing: '0.03em' }}>
            {data.subtitle}
          </div>
        </div>
      </div>

      {/* Scallop connector */}
      <svg style={{ display: 'block', marginTop: '-1px' }} width="280" height="14" viewBox="0 0 280 14">
        <path d={`M0,0 ${Array.from({length: 14}, (_, i) => `Q${i*20+10},14 ${(i+1)*20},0`).join(' ')} L280,0 Z`}
          fill={data.colors.secondary} />
        <path d={`M0,0 ${Array.from({length: 14}, (_, i) => `Q${i*20+10},14 ${(i+1)*20},0`).join(' ')}`}
          stroke={data.colors.accent} strokeWidth="0.5" fill="none" opacity="0.5" />
      </svg>

      {/* Body content */}
      <div style={{ position: 'relative', zIndex: 1, padding: '10px 14px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Responsive photos grid */}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridCols}, 1fr)`, gap: '10px', width: '100%', marginBottom: '10px' }}>
          {slots.map(i => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
              <div style={{
                width: `${imgSize}px`, height: `${imgSize}px`, borderRadius: '50%',
                overflow: 'hidden',
                boxShadow: images[i]
                  ? `0 4px 12px ${data.colors.primary}44, 0 0 0 2.5px ${data.colors.bg}, 0 0 0 4px ${data.colors.primary}`
                  : `0 0 0 2.5px ${data.colors.bg}, 0 0 0 4px ${data.colors.primary}44`,
                flexShrink: 0,
                background: images[i] ? 'transparent' : `${data.colors.primary}08`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {images[i]
                  ? <img src={images[i]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: `1.5px dashed ${data.colors.primary}55` }} />
                }
              </div>
              {couples[i] && (
                <div style={{ textAlign: 'center', maxWidth: `${imgSize + 10}px` }}>
                  <div style={{ width: '20px', height: '1.5px', backgroundColor: `${data.colors.accent}${images[i] ? '' : '44'}`, margin: '0 auto 2px' }} />
                  <span style={{ color: data.colors.secondary === '#ffffff' ? '#333' : data.colors.secondary, fontSize: `${6.5 * fs}px`, fontWeight: '700', lineHeight: 1.4, opacity: images[i] ? 1 : 0.4 }}>
                    {couples[i]}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer block */}
        {(data.phone || data.website) && (
          <>
            <div style={{ width: '100%', height: '1px', background: `linear-gradient(to left, transparent, ${data.colors.primary}55, transparent)`, marginBottom: '6px' }} />
            <div style={{ textAlign: 'center', lineHeight: 1.9 }}>
              {data.phone && <div style={{ color: data.colors.secondary === '#ffffff' ? '#555' : data.colors.secondary, fontSize: `${7 * fs}px`, opacity: 0.7 }}>{data.phone}</div>}
              {data.website && <div style={{ color: data.colors.secondary === '#ffffff' ? '#555' : data.colors.secondary, fontSize: `${7 * fs}px`, opacity: 0.7 }}>{data.website}</div>}
            </div>
          </>
        )}
      </div>

      {/* Bottom color strip */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '4px',
        background: `linear-gradient(to left, ${data.colors.secondary}, ${data.colors.primary}, ${data.colors.accent}, ${data.colors.primary}, ${data.colors.secondary})`,
      }} />
    </div>
  );
}
