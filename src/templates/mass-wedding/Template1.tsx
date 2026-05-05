import type { TemplateData } from '../../types/template';

export default function Template1({ data }: { data: TemplateData }) {
  const couples = data.description ? data.description.split('\n').filter(Boolean) : [];
  const images = data.images || [];

  return (
    <div
      id="template-preview"
      style={{
        width: '280px',
        minHeight: '490px',
        backgroundColor: data.colors.bg,
        direction: 'rtl',
        fontFamily: "'Georgia', 'Times New Roman', serif",
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background subtle diamond pattern */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="mw1-diamond" width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M11,1 L21,11 L11,21 L1,11 Z" fill={data.colors.primary} opacity="0.05" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mw1-diamond)" />
      </svg>

      {/* Corner arabesque decorations */}
      <svg style={{ position: 'absolute', top: 0, right: 0 }} width="70" height="70" viewBox="0 0 70 70">
        <path d="M70,0 Q50,0 50,20 Q50,40 30,40 Q10,40 10,60 Q0,65 0,70 L0,0 Z" fill={data.colors.primary} opacity="0.13" />
        <path d="M70,0 Q45,5 45,25 Q45,45 25,45 Q8,50 0,70" stroke={data.colors.primary} strokeWidth="0.7" fill="none" opacity="0.65" />
        <circle cx="62" cy="8" r="2.5" fill={data.colors.primary} opacity="0.5" />
        <circle cx="48" cy="22" r="1.8" fill={data.colors.primary} opacity="0.5" />
        <circle cx="34" cy="36" r="1.8" fill={data.colors.primary} opacity="0.5" />
        <circle cx="18" cy="52" r="2.5" fill={data.colors.primary} opacity="0.5" />
      </svg>
      <svg style={{ position: 'absolute', top: 0, left: 0, transform: 'scaleX(-1)' }} width="70" height="70" viewBox="0 0 70 70">
        <path d="M70,0 Q50,0 50,20 Q50,40 30,40 Q10,40 10,60 Q0,65 0,70 L0,0 Z" fill={data.colors.primary} opacity="0.13" />
        <path d="M70,0 Q45,5 45,25 Q45,45 25,45 Q8,50 0,70" stroke={data.colors.primary} strokeWidth="0.7" fill="none" opacity="0.65" />
        <circle cx="62" cy="8" r="2.5" fill={data.colors.primary} opacity="0.5" />
        <circle cx="18" cy="52" r="2.5" fill={data.colors.primary} opacity="0.5" />
      </svg>
      <svg style={{ position: 'absolute', bottom: 0, right: 0, transform: 'scaleY(-1)' }} width="70" height="70" viewBox="0 0 70 70">
        <path d="M70,0 Q50,0 50,20 Q50,40 30,40 Q10,40 10,60 Q0,65 0,70 L0,0 Z" fill={data.colors.primary} opacity="0.13" />
        <circle cx="62" cy="8" r="2.5" fill={data.colors.primary} opacity="0.5" />
      </svg>
      <svg style={{ position: 'absolute', bottom: 0, left: 0, transform: 'scale(-1,-1)' }} width="70" height="70" viewBox="0 0 70 70">
        <path d="M70,0 Q50,0 50,20 Q50,40 30,40 Q10,40 10,60 Q0,65 0,70 L0,0 Z" fill={data.colors.primary} opacity="0.13" />
        <circle cx="62" cy="8" r="2.5" fill={data.colors.primary} opacity="0.5" />
      </svg>

      {/* Outer border */}
      <div style={{ position: 'absolute', inset: '6px', border: `1px solid ${data.colors.primary}`, opacity: 0.4, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: '8px', border: `0.5px solid ${data.colors.primary}`, opacity: 0.2, pointerEvents: 'none' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, padding: '18px 16px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Bismillah */}
        <div style={{ color: data.colors.primary, fontSize: '9px', textAlign: 'center', marginBottom: '3px', opacity: 0.9 }}>
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </div>

        {/* Top divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', width: '100%' }}>
          <div style={{ flex: 1, height: '1px', background: `linear-gradient(to left, ${data.colors.primary}aa, transparent)` }} />
          <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6,0 L7.5,4.5 L12,6 L7.5,7.5 L6,12 L4.5,7.5 L0,6 L4.5,4.5 Z" fill={data.colors.primary} opacity="0.8" /></svg>
          <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, ${data.colors.primary}aa, transparent)` }} />
        </div>

        {/* Event label */}
        <div style={{ color: data.colors.primary, fontSize: '7px', letterSpacing: '0.1em', marginBottom: '4px', opacity: 0.8 }}>
          دعوة عرس جماعي
        </div>

        {/* Event title */}
        <div style={{ color: data.colors.accent, fontSize: '12.5px', fontWeight: 'bold', textAlign: 'center', lineHeight: 1.35, marginBottom: '4px' }}>
          {data.title}
        </div>

        {/* Subtitle */}
        <div style={{ color: data.colors.secondary, fontSize: '7px', textAlign: 'center', lineHeight: 1.7, marginBottom: '8px', opacity: 0.85 }}>
          {data.subtitle}
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', width: '100%', marginBottom: '10px' }}>
          <div style={{ flex: 1, height: '0.5px', background: `linear-gradient(to left, ${data.colors.primary}88, transparent)` }} />
          <span style={{ color: data.colors.primary, fontSize: '9px' }}>❋</span>
          <div style={{ flex: 1, height: '0.5px', background: `linear-gradient(to right, ${data.colors.primary}88, transparent)` }} />
        </div>

        {/* Photos grid — placeholders until photos added */}
        {(() => {
          const visible = Array.from({ length: 6 }, (_, i) => i).filter(i => !!images[i]);
          const hasPhotos = visible.length > 0;
          const slots = hasPhotos ? visible : Array.from({ length: 6 }, (_, i) => i);
          return (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', width: '100%' }}>
              {slots.map(i => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                  <div style={{
                    width: '62px', height: '62px', borderRadius: '50%',
                    border: `2.5px ${images[i] ? 'solid' : 'dashed'} ${data.colors.primary}${images[i] ? '' : '55'}`,
                    boxShadow: images[i] ? `0 0 0 1.5px ${data.colors.bg}, 0 0 0 3px ${data.colors.primary}44` : 'none',
                    overflow: 'hidden', flexShrink: 0,
                    background: images[i] ? 'transparent' : `${data.colors.primary}0a`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {images[i]
                      ? <img src={images[i]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: `${data.colors.primary}20`, border: `1px solid ${data.colors.primary}33` }} />
                    }
                  </div>
                  {couples[i] && (
                    <span style={{ color: data.colors.secondary, fontSize: '6.5px', textAlign: 'center', lineHeight: 1.4, maxWidth: '72px', fontWeight: '600', opacity: images[i] ? 1 : 0.5 }}>
                      {couples[i]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          );
        })()}

        {/* Bottom divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', width: '100%', margin: '10px 0 6px' }}>
          <div style={{ flex: 1, height: '0.5px', background: `linear-gradient(to left, ${data.colors.primary}88, transparent)` }} />
          <svg width="14" height="8" viewBox="0 0 14 8"><path d="M7,4 Q4,1 1,4 Q4,7 7,4 Q10,1 13,4 Q10,7 7,4 Z" fill={data.colors.primary} opacity="0.55" /></svg>
          <div style={{ flex: 1, height: '0.5px', background: `linear-gradient(to right, ${data.colors.primary}88, transparent)` }} />
        </div>

        {/* Footer */}
        {(data.phone || data.website) && (
          <div style={{ textAlign: 'center', lineHeight: 1.8 }}>
            {data.phone && <div style={{ color: data.colors.secondary, fontSize: '7px', opacity: 0.75 }}>{data.phone}</div>}
            {data.website && <div style={{ color: data.colors.secondary, fontSize: '7px', opacity: 0.75 }}>{data.website}</div>}
          </div>
        )}
      </div>
    </div>
  );
}
