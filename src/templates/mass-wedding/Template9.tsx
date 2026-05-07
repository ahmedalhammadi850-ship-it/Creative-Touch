import type { TemplateData } from '../../types/template';

export default function Template9({ data }: { data: TemplateData }) {
  const couples = data.description ? data.description.split('\n').filter(Boolean) : [];
  const images = data.images || [];
  const fs = (data.fontSize ?? 21) / 21;

  const filledCount = images.filter(Boolean).length;
  const gridCols = filledCount === 0 ? 3 : filledCount === 1 ? 1 : filledCount === 2 ? 2 : 3;
  const imgSize = filledCount === 1 ? 120 : filledCount === 2 ? 96 : 62;
  const slots = filledCount > 0
    ? Array.from({ length: 6 }, (_, i) => i).filter(i => !!images[i])
    : Array.from({ length: 6 }, (_, i) => i);

  return (
    <div id="template-preview" style={{
      width: '280px', minHeight: '490px',
      backgroundColor: data.colors.bg,
      direction: 'rtl',
      fontFamily: "'Cairo', 'Helvetica Neue', sans-serif",
      position: 'relative', overflow: 'hidden',
    }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        <defs>
          <pattern id="mw9-dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="0.7" fill={data.colors.primary} opacity="0.12" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mw9-dots)" />
      </svg>

      <div style={{
        background: `linear-gradient(140deg, ${data.colors.primary} 0%, ${data.colors.secondary} 100%)`,
        padding: '20px 18px 16px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
        <div style={{ position: 'absolute', bottom: -30, left: -10, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '20px', padding: '2px 10px', marginBottom: '8px' }}>
            <span style={{ color: '#fff', fontSize: `${5.5 * fs}px`, letterSpacing: '0.22em', fontWeight: 600 }}>
              {data.eventLabel ?? 'دعوة عرس جماعي'}
            </span>
          </div>
          <div style={{ color: '#fff', fontSize: `${14 * fs}px`, fontWeight: 900, lineHeight: 1.25, textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>{data.title}</div>
          <div style={{ color: 'rgba(255,255,255,0.82)', fontSize: `${7 * fs}px`, marginTop: '5px', lineHeight: 1.7 }}>{data.subtitle}</div>
        </div>
      </div>

      <div style={{ height: '3px', background: `linear-gradient(to left, ${data.colors.accent}, ${data.colors.primary}, ${data.colors.accent})` }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '14px 14px 10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '12px' }}>
          <div style={{ flex: 1, height: '1px', background: `${data.colors.primary}22` }} />
          {[0, 1, 2].map(k => <div key={k} style={{ width: k === 1 ? 6 : 4, height: k === 1 ? 6 : 4, borderRadius: '50%', background: k === 1 ? data.colors.accent : `${data.colors.primary}55` }} />)}
          <div style={{ flex: 1, height: '1px', background: `${data.colors.primary}22` }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridCols}, 1fr)`, gap: '10px', width: '100%' }}>
          {slots.map(i => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
              <div style={{
                width: `${imgSize}px`, height: `${imgSize}px`, borderRadius: '50%',
                border: `2px ${images[i] ? 'solid' : 'dashed'} ${data.colors.primary}${images[i] ? '' : '44'}`,
                overflow: 'hidden',
                boxShadow: images[i] ? `0 4px 12px ${data.colors.primary}33, 0 0 0 3px ${data.colors.bg}, 0 0 0 5px ${data.colors.primary}22` : 'none',
                background: images[i] ? 'transparent' : `${data.colors.primary}08`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {images[i]
                  ? <img src={images[i]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: `${data.colors.primary}22` }} />
                }
              </div>
              {couples[i] && (
                <span style={{ color: data.colors.secondary, fontSize: `${6.5 * fs}px`, textAlign: 'center', lineHeight: 1.4, maxWidth: `${imgSize + 10}px`, fontWeight: 700, opacity: images[i] ? 1 : 0.5 }}>
                  {couples[i]}
                </span>
              )}
            </div>
          ))}
        </div>

        {(data.phone || data.website) && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '12px 0 6px' }}>
              <div style={{ flex: 1, height: '1px', background: `${data.colors.primary}22` }} />
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: data.colors.accent }} />
              <div style={{ flex: 1, height: '1px', background: `${data.colors.primary}22` }} />
            </div>
            <div style={{ textAlign: 'center' }}>
              {data.phone && <div style={{ color: data.colors.secondary, fontSize: `${7 * fs}px`, opacity: 0.75 }}>{data.phone}</div>}
              {data.website && <div style={{ color: data.colors.secondary, fontSize: `${7 * fs}px`, opacity: 0.75 }}>{data.website}</div>}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
