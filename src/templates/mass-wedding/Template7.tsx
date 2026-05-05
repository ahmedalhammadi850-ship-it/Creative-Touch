import type { TemplateData } from '../../types/template';

export default function Template7({ data }: { data: TemplateData }) {
  const couples = data.description ? data.description.split('\n').filter(Boolean) : [];
  const images = data.images || [];
  const fs = data.fontSize ?? 1;

  const filledCount = images.filter(Boolean).length;
  const gridCols = filledCount === 0 ? 3 : filledCount === 1 ? 1 : filledCount === 2 ? 2 : 3;
  const imgW = filledCount === 1 ? 120 : filledCount === 2 ? 96 : 60;
  const imgH = Math.round(imgW * 1.1);
  const slots = filledCount > 0
    ? Array.from({ length: 6 }, (_, i) => i).filter(i => !!images[i])
    : Array.from({ length: 6 }, (_, i) => i);

  return (
    <div id="template-preview" style={{ width: '280px', minHeight: '490px', backgroundColor: data.colors.bg, direction: 'rtl', fontFamily: "'Helvetica Neue', Arial, sans-serif", position: 'relative', overflow: 'hidden' }}>
      {/* Diagonal color strip */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '120px', background: `linear-gradient(160deg, ${data.colors.primary} 0%, ${data.colors.secondary} 60%, transparent 100%)`, opacity: 0.9 }} />

      {/* Circle decorations */}
      <div style={{ position: 'absolute', top: '-30px', left: '-30px', width: '110px', height: '110px', borderRadius: '50%', border: `1.5px solid ${data.colors.accent}30` }} />
      <div style={{ position: 'absolute', top: '-15px', left: '-15px', width: '80px', height: '80px', borderRadius: '50%', border: `1px solid ${data.colors.accent}50` }} />
      <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', width: '100px', height: '100px', borderRadius: '50%', border: `1.5px solid ${data.colors.primary}30` }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '18px 16px 14px' }}>
        {/* Header on colored strip */}
        <div style={{ textAlign: 'center', marginBottom: '14px' }}>
          <div style={{ color: data.colors.accent, fontSize: `${6.5 * fs}px`, letterSpacing: '0.2em', marginBottom: '5px', opacity: 0.9 }}>{data.eventLabel ?? 'دعوة عرس جماعي'}</div>
          <div style={{ color: '#ffffff', fontSize: `${14 * fs}px`, fontWeight: '800', lineHeight: 1.3, marginBottom: '3px', textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>{data.title}</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', margin: '6px 0' }}>
            {[0,1,2].map(k => <div key={k} style={{ width: k===1 ? '20px' : '8px', height: '2px', backgroundColor: data.colors.accent, borderRadius: '1px' }} />)}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: `${7 * fs}px`, lineHeight: 1.7 }}>{data.subtitle}</div>
        </div>

        {/* Section label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
          <div style={{ flex: 1, height: '1px', background: `linear-gradient(to left, ${data.colors.primary}88, transparent)` }} />
          <span style={{ color: data.colors.primary, fontSize: '7.5px' }}>◆</span>
          <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, ${data.colors.primary}88, transparent)` }} />
        </div>

        {/* Responsive photo grid */}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridCols}, 1fr)`, gap: '8px', width: '100%' }}>
          {slots.map(i => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div style={{
                width: `${imgW}px`, height: `${imgH}px`,
                borderRadius: `${Math.round(imgW * 0.5)}px ${Math.round(imgW * 0.5)}px 8px 8px`,
                border: `1.5px ${images[i] ? 'solid' : 'dashed'} ${data.colors.primary}${images[i] ? '' : '44'}`,
                overflow: 'hidden',
                boxShadow: images[i] ? `0 3px 10px ${data.colors.primary}33` : 'none',
                background: images[i] ? 'transparent' : `${data.colors.primary}08`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {images[i]
                  ? <img src={images[i]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: `${data.colors.primary}18`, border: `1px solid ${data.colors.primary}30` }} />
                }
              </div>
              {couples[i] && (
                <span style={{ color: data.colors.secondary, fontSize: `${6 * fs}px`, textAlign: 'center', lineHeight: 1.4, maxWidth: `${imgW + 10}px`, fontWeight: '600', opacity: images[i] ? 1 : 0.45 }}>
                  {couples[i]}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', margin: '12px 0 6px' }}>
          <div style={{ flex: 1, height: '1px', background: `linear-gradient(to left, ${data.colors.primary}77, transparent)` }} />
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: data.colors.primary, opacity: 0.6 }} />
          <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, ${data.colors.primary}77, transparent)` }} />
        </div>
        {(data.phone || data.website) && (
          <div style={{ textAlign: 'center' }}>
            {data.phone && <div style={{ color: data.colors.secondary, fontSize: `${7 * fs}px`, opacity: 0.65 }}>{data.phone}</div>}
            {data.website && <div style={{ color: data.colors.secondary, fontSize: `${7 * fs}px`, opacity: 0.65 }}>{data.website}</div>}
          </div>
        )}
      </div>
    </div>
  );
}
