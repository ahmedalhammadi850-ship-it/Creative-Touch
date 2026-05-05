import type { TemplateData } from '../../types/template';

export default function Template2({ data }: { data: TemplateData }) {
  const couples = data.description ? data.description.split('\n').filter(Boolean) : [];
  const images = data.images || [];
  const fs = data.fontSize ?? 1;

  const filledCount = images.filter(Boolean).length;
  const gridCols = filledCount === 0 ? 3 : filledCount === 1 ? 1 : filledCount === 2 ? 2 : 3;
  const imgW = filledCount === 1 ? 120 : filledCount === 2 ? 96 : 62;
  const imgH = Math.round(imgW * 1.1);
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
      {/* Watercolor blobs top */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '130px' }} viewBox="0 0 280 130" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="mw2-tl" cx="15%" cy="15%" r="45%">
            <stop offset="0%" stopColor={data.colors.primary} stopOpacity="0.28" />
            <stop offset="100%" stopColor={data.colors.primary} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="mw2-tr" cx="85%" cy="15%" r="45%">
            <stop offset="0%" stopColor={data.colors.accent} stopOpacity="0.22" />
            <stop offset="100%" stopColor={data.colors.accent} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="mw2-tc" cx="50%" cy="5%" r="40%">
            <stop offset="0%" stopColor={data.colors.primary} stopOpacity="0.12" />
            <stop offset="100%" stopColor={data.colors.primary} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="280" height="130" fill="url(#mw2-tl)" />
        <rect width="280" height="130" fill="url(#mw2-tr)" />
        <rect width="280" height="130" fill="url(#mw2-tc)" />
        {[0,60,120,180,240,300].map((a, i) => (
          <ellipse key={i}
            cx={20 + 12 * Math.cos(a * Math.PI/180)}
            cy={20 + 12 * Math.sin(a * Math.PI/180)}
            rx="7" ry="4"
            fill={data.colors.primary} opacity="0.18"
            transform={`rotate(${a} ${20 + 12 * Math.cos(a * Math.PI/180)} ${20 + 12 * Math.sin(a * Math.PI/180)})`}
          />
        ))}
        <circle cx="20" cy="20" r="5" fill={data.colors.primary} opacity="0.3" />
        {[0,60,120,180,240,300].map((a, i) => (
          <ellipse key={i}
            cx={260 + 12 * Math.cos(a * Math.PI/180)}
            cy={20 + 12 * Math.sin(a * Math.PI/180)}
            rx="7" ry="4"
            fill={data.colors.accent} opacity="0.18"
            transform={`rotate(${a} ${260 + 12 * Math.cos(a * Math.PI/180)} ${20 + 12 * Math.sin(a * Math.PI/180)})`}
          />
        ))}
        <circle cx="260" cy="20" r="5" fill={data.colors.accent} opacity="0.3" />
        {[{x:60,y:12,c:0},{x:100,y:8,c:1},{x:140,y:5,c:0},{x:180,y:10,c:1},{x:220,y:8,c:0}].map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3.5" fill={p.c ? data.colors.accent : data.colors.primary} opacity="0.18" />
        ))}
        <ellipse cx="40" cy="55" rx="12" ry="5" fill="#a3d977" opacity="0.22" transform="rotate(-35 40 55)" />
        <ellipse cx="240" cy="55" rx="12" ry="5" fill="#a3d977" opacity="0.22" transform="rotate(35 240 55)" />
        <ellipse cx="130" cy="18" rx="10" ry="4" fill="#a3d977" opacity="0.18" transform="rotate(10 130 18)" />
      </svg>

      {/* Watercolor blobs bottom */}
      <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '70px' }} viewBox="0 0 280 70" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="mw2-bl" cx="15%" cy="85%" r="50%">
            <stop offset="0%" stopColor={data.colors.accent} stopOpacity="0.2" />
            <stop offset="100%" stopColor={data.colors.accent} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="mw2-br" cx="85%" cy="85%" r="50%">
            <stop offset="0%" stopColor={data.colors.primary} stopOpacity="0.2" />
            <stop offset="100%" stopColor={data.colors.primary} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="280" height="70" fill="url(#mw2-bl)" />
        <rect width="280" height="70" fill="url(#mw2-br)" />
        <ellipse cx="25" cy="55" rx="14" ry="6" fill="#a3d977" opacity="0.22" transform="rotate(-20 25 55)" />
        <ellipse cx="255" cy="55" rx="14" ry="6" fill="#a3d977" opacity="0.22" transform="rotate(20 255 55)" />
      </svg>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, padding: '20px 14px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Event label badge */}
        <div style={{
          padding: '2px 12px',
          border: `1px solid ${data.colors.primary}`,
          color: data.colors.primary,
          fontSize: `${6.5 * fs}px`,
          letterSpacing: '0.12em',
          marginBottom: '5px',
          background: `${data.colors.primary}0a`,
        }}>
          ✿ دعوة عرس جماعي ✿
        </div>

        {/* Event title */}
        <div style={{ color: data.colors.secondary, fontSize: `${13 * fs}px`, fontWeight: 'bold', textAlign: 'center', lineHeight: 1.35, marginBottom: '4px' }}>
          {data.title}
        </div>

        {/* Accent underline */}
        <div style={{ display: 'flex', gap: '3px', marginBottom: '5px' }}>
          <div style={{ width: '18px', height: '2px', backgroundColor: data.colors.primary }} />
          <div style={{ width: '7px', height: '2px', backgroundColor: data.colors.accent }} />
          <div style={{ width: '18px', height: '2px', backgroundColor: data.colors.primary }} />
        </div>

        {/* Subtitle */}
        <div style={{ color: data.colors.secondary, fontSize: `${7 * fs}px`, textAlign: 'center', lineHeight: 1.7, opacity: 0.75, marginBottom: '10px' }}>
          {data.subtitle}
        </div>

        {/* Thin divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', width: '100%', marginBottom: '10px' }}>
          <div style={{ flex: 1, height: '0.5px', backgroundColor: `${data.colors.primary}55` }} />
          <span style={{ color: data.colors.primary, fontSize: '10px' }}>❀</span>
          <div style={{ flex: 1, height: '0.5px', backgroundColor: `${data.colors.primary}55` }} />
        </div>

        {/* Responsive photos grid */}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridCols}, 1fr)`, gap: '9px', width: '100%' }}>
          {slots.map(i => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
              <div style={{ position: 'relative' }}>
                {images[i] && <>
                  <svg style={{ position: 'absolute', top: '-4px', right: '-4px', zIndex: 1 }} width="14" height="14" viewBox="0 0 14 14">
                    <circle cx="7" cy="7" r="4" fill={data.colors.primary} opacity="0.3" />
                    <circle cx="7" cy="7" r="2" fill={data.colors.accent} opacity="0.5" />
                  </svg>
                  <svg style={{ position: 'absolute', top: '-4px', left: '-4px', zIndex: 1 }} width="14" height="14" viewBox="0 0 14 14">
                    <circle cx="7" cy="7" r="4" fill={data.colors.primary} opacity="0.3" />
                    <circle cx="7" cy="7" r="2" fill={data.colors.accent} opacity="0.5" />
                  </svg>
                </>}
                <div style={{
                  width: `${imgW}px`, height: `${imgH}px`, borderRadius: '8px',
                  border: `1.5px ${images[i] ? 'solid' : 'dashed'} ${data.colors.primary}${images[i] ? '' : '44'}`,
                  overflow: 'hidden',
                  background: images[i] ? 'transparent' : `${data.colors.primary}08`,
                  boxShadow: images[i] ? `0 2px 8px ${data.colors.primary}22` : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {images[i]
                    ? <img src={images[i]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <div style={{ width: '24px', height: '24px', borderRadius: '4px', background: `${data.colors.primary}18`, border: `1px solid ${data.colors.primary}30` }} />
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', width: '100%', margin: '10px 0 6px' }}>
          <div style={{ flex: 1, height: '0.5px', backgroundColor: `${data.colors.primary}44` }} />
          <svg width="14" height="8" viewBox="0 0 14 8"><path d="M7,4 Q4,1 1,4 Q4,7 7,4 Q10,1 13,4 Q10,7 7,4 Z" fill={data.colors.primary} opacity="0.5" /></svg>
          <div style={{ flex: 1, height: '0.5px', backgroundColor: `${data.colors.primary}44` }} />
        </div>

        {/* Footer */}
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
