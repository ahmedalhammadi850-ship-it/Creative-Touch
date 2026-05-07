import type { TemplateData } from '../../types/template';

export default function Template8({ data }: { data: TemplateData }) {
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
    <div id="template-preview" style={{ width: '280px', minHeight: '490px', backgroundColor: data.colors.bg, direction: 'rtl', fontFamily: "'Georgia', serif", position: 'relative', overflow: 'hidden' }}>
      {/* Floral watercolor top */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '90px' }} viewBox="0 0 280 90" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="mw8-g1" cx="20%" cy="20%" r="40%">
            <stop offset="0%" stopColor={data.colors.primary} stopOpacity="0.35" />
            <stop offset="100%" stopColor={data.colors.primary} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="mw8-g2" cx="80%" cy="15%" r="40%">
            <stop offset="0%" stopColor={data.colors.accent} stopOpacity="0.3" />
            <stop offset="100%" stopColor={data.colors.accent} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="280" height="90" fill="url(#mw8-g1)" />
        <rect width="280" height="90" fill="url(#mw8-g2)" />
        {[15,25,140,255,265].map((x, i) => (
          <ellipse key={i} cx={x} cy={i%2===0 ? 14 : 22} rx="8" ry="5" fill={i%2===0 ? data.colors.primary : data.colors.accent} opacity="0.2" transform={`rotate(${i*36} ${x} ${i%2===0 ? 14 : 22})`} />
        ))}
        <circle cx="20" cy="18" r="4" fill={data.colors.primary} opacity="0.35" />
        <circle cx="260" cy="18" r="4" fill={data.colors.accent} opacity="0.35" />
      </svg>

      {/* Floral bottom */}
      <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '60px' }} viewBox="0 0 280 60" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="mw8-gb" cx="50%" cy="100%" r="60%">
            <stop offset="0%" stopColor={data.colors.primary} stopOpacity="0.2" />
            <stop offset="100%" stopColor={data.colors.primary} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="280" height="60" fill="url(#mw8-gb)" />
      </svg>

      {/* Inner border */}
      <div style={{ position: 'absolute', inset: '8px', border: `0.5px solid ${data.colors.primary}33`, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '18px 14px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Bismillah */}
        <div style={{ color: data.colors.primary, fontSize: `${8 * fs}px`, textAlign: 'center', marginBottom: '4px', opacity: 0.85 }}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>

        {/* Badge */}
        <div style={{ padding: '2px 14px', border: `1px solid ${data.colors.primary}66`, color: data.colors.primary, fontSize: `${6.5 * fs}px`, letterSpacing: '0.12em', marginBottom: '6px', background: `${data.colors.primary}0a` }}>
          ✿ {data.eventLabel ?? 'دعوة عرس جماعي'} ✿
        </div>

        {/* Title */}
        <div style={{ color: data.colors.secondary, fontSize: `${13 * fs}px`, fontWeight: 'bold', textAlign: 'center', lineHeight: 1.35, marginBottom: '3px' }}>{data.title}</div>

        {/* Triple dot divider */}
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center', marginBottom: '5px' }}>
          {[0.4,0.7,1,0.7,0.4].map((o, i) => <div key={i} style={{ width: i===2 ? '7px' : '4px', height: i===2 ? '7px' : '4px', borderRadius: '50%', backgroundColor: data.colors.primary, opacity: o }} />)}
        </div>

        {/* Subtitle */}
        <div style={{ color: data.colors.secondary, fontSize: `${7 * fs}px`, textAlign: 'center', lineHeight: 1.7, opacity: 0.75, marginBottom: '10px' }}>{data.subtitle}</div>

        {/* Responsive photo grid */}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridCols}, 1fr)`, gap: '9px', width: '100%' }}>
          {slots.map(i => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div style={{
                width: `${imgSize}px`, height: `${imgSize}px`, borderRadius: '50%',
                border: `2px ${images[i] ? 'solid' : 'dashed'} ${data.colors.primary}${images[i] ? '' : '44'}`,
                overflow: 'hidden',
                boxShadow: images[i] ? `0 2px 10px ${data.colors.primary}33, 0 0 0 3px ${data.colors.bg}, 0 0 0 4.5px ${data.colors.primary}44` : 'none',
                background: images[i] ? 'transparent' : `${data.colors.primary}08`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {images[i]
                  ? <img src={images[i]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: `${data.colors.primary}18` }} />
                }
              </div>
              {couples[i] && (
                <span style={{ color: data.colors.secondary, fontSize: `${6.5 * fs}px`, textAlign: 'center', lineHeight: 1.4, maxWidth: `${imgSize + 10}px`, fontWeight: '600', opacity: images[i] ? 1 : 0.4 }}>
                  {couples[i]}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Footer divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', width: '100%', margin: '10px 0 5px' }}>
          <div style={{ flex: 1, height: '0.5px', background: `${data.colors.primary}55` }} />
          <span style={{ color: data.colors.primary, fontSize: '10px' }}>✿</span>
          <div style={{ flex: 1, height: '0.5px', background: `${data.colors.primary}55` }} />
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
