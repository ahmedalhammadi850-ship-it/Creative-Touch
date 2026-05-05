import type { TemplateData } from '../../types/template';

export default function Template11({ data }: { data: TemplateData }) {
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
    <div id="template-preview" style={{
      width: '280px', minHeight: '490px',
      backgroundColor: data.colors.bg,
      direction: 'rtl',
      fontFamily: "'Cairo', 'Helvetica Neue', sans-serif",
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: `radial-gradient(circle, ${data.colors.primary}35 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -40, left: -40, width: 160, height: 160, borderRadius: '50%', background: `radial-gradient(circle, ${data.colors.accent}20 0%, transparent 70%)`, pointerEvents: 'none' }} />

      <div style={{ position: 'relative' }}>
        <div style={{
          background: `linear-gradient(135deg, ${data.colors.primary} 0%, ${data.colors.accent}cc 100%)`,
          padding: '24px 18px 28px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -15, right: -15, width: 70, height: 70, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,0.15)', borderRadius: '14px', padding: '2px 10px', marginBottom: '8px' }}>
              <span style={{ color: '#fff', fontSize: `${5.5 * fs}px`, fontWeight: 700, letterSpacing: '0.18em' }}>{data.eventLabel ?? 'دعوة عرس جماعي'}</span>
            </div>
            <div style={{ color: '#fff', fontSize: `${14 * fs}px`, fontWeight: 900, lineHeight: 1.3, textShadow: '0 2px 8px rgba(0,0,0,0.3)', marginBottom: '4px' }}>{data.title}</div>
            <div style={{ color: 'rgba(255,255,255,0.88)', fontSize: `${7 * fs}px`, lineHeight: 1.7 }}>{data.subtitle}</div>
          </div>
        </div>
        <svg style={{ display: 'block', marginTop: '-1px' }} width="280" height="14" viewBox="0 0 280 14">
          <path d="M0,0 Q35,14 70,7 Q105,0 140,7 Q175,14 210,7 Q245,0 280,7 L280,0 Z" fill={data.colors.primary} opacity="0.35" />
          <path d="M0,3 Q35,14 70,7 Q105,0 140,7 Q175,14 210,7 Q245,0 280,7 L280,0 L0,0 Z" fill={data.colors.accent} opacity="0.2" />
        </svg>
      </div>

      <div style={{ position: 'relative', zIndex: 1, padding: '6px 14px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '12px' }}>
          <div style={{ flex: 1, height: '1px', background: `${data.colors.primary}33` }} />
          <div style={{ width: '5px', height: '5px', background: data.colors.accent, borderRadius: '50%' }} />
          <div style={{ width: '8px', height: '8px', background: data.colors.primary, borderRadius: '50%' }} />
          <div style={{ width: '5px', height: '5px', background: data.colors.accent, borderRadius: '50%' }} />
          <div style={{ flex: 1, height: '1px', background: `${data.colors.primary}33` }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridCols}, 1fr)`, gap: '10px', width: '100%' }}>
          {slots.map(i => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
              <div style={{
                width: `${imgSize}px`, height: `${imgSize}px`, borderRadius: '50%',
                border: `2.5px ${images[i] ? 'solid' : 'dashed'} ${data.colors.primary}${images[i] ? '' : '44'}`,
                overflow: 'hidden',
                boxShadow: images[i] ? `0 3px 12px ${data.colors.primary}44, 0 0 0 3px ${data.colors.bg}, 0 0 0 5px ${data.colors.accent}44` : 'none',
                background: images[i] ? 'transparent' : `${data.colors.primary}08`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {images[i] ? <img src={images[i]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: `${data.colors.primary}22` }} />}
              </div>
              {couples[i] && <span style={{ color: data.colors.secondary, fontSize: `${6.5 * fs}px`, textAlign: 'center', lineHeight: 1.4, maxWidth: `${imgSize + 10}px`, fontWeight: 700, opacity: images[i] ? 1 : 0.45 }}>{couples[i]}</span>}
            </div>
          ))}
        </div>

        {(data.phone || data.website) && (
          <>
            <div style={{ height: '1px', background: `linear-gradient(to left, transparent, ${data.colors.primary}55, transparent)`, margin: '12px 0 6px' }} />
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
