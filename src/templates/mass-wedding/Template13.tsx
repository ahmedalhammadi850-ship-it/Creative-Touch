import type { TemplateData } from '../../types/template';

export default function Template13({ data }: { data: TemplateData }) {
  const couples = data.description ? data.description.split('\n').filter(Boolean) : [];
  const images = data.images || [];
  const fs = (data.fontSize ?? 21) / 21;
  const filledCount = images.filter(Boolean).length;
  const gridCols = filledCount === 0 ? 3 : filledCount === 1 ? 1 : filledCount === 2 ? 2 : 3;
  const imgSize = filledCount === 1 ? 108 : filledCount === 2 ? 88 : 58;
  const slots = filledCount > 0
    ? Array.from({ length: 6 }, (_, i) => i).filter(i => !!images[i])
    : Array.from({ length: 6 }, (_, i) => i);

  const hexPath = (s: number) => {
    const r = s / 2;
    const pts = Array.from({ length: 6 }, (_, k) => {
      const a = (Math.PI / 3) * k - Math.PI / 6;
      return `${r + r * Math.cos(a)},${r + r * Math.sin(a)}`;
    });
    return `M${pts.join('L')}Z`;
  };

  return (
    <div id="template-preview" style={{
      width: '280px', minHeight: '500px',
      backgroundColor: data.colors.bg,
      direction: 'rtl',
      fontFamily: "'Cairo', 'Helvetica Neue', sans-serif",
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Marble-like bg texture */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06, pointerEvents: 'none' }}>
        <defs>
          <filter id="mw13-blur"><feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="4" result="noise" /><feColorMatrix type="saturate" values="0" /></filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#mw13-blur)" fill={data.colors.primary} />
      </svg>

      {/* Rose gold accent bar top */}
      <div style={{ height: '3px', background: `linear-gradient(to left, transparent, ${data.colors.accent}, ${data.colors.primary}, ${data.colors.accent}, transparent)` }} />

      {/* Header */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '18px 20px 10px' }}>
        <div style={{ color: data.colors.primary, fontSize: `${6 * fs}px`, letterSpacing: '0.3em', fontWeight: 600, marginBottom: '6px', opacity: 0.6 }}>
          {data.eventLabel ?? 'دعوة عرس جماعي'}
        </div>
        <div style={{ color: data.colors.secondary, fontSize: `${15 * fs}px`, fontWeight: 900, lineHeight: 1.2 }}>{data.title}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '7px 0', justifyContent: 'center' }}>
          <div style={{ flex: 1, height: '0.5px', background: `linear-gradient(to left, ${data.colors.accent}aa, transparent)` }} />
          <div style={{ width: '7px', height: '7px', transform: 'rotate(45deg)', background: data.colors.accent, boxShadow: `0 0 6px ${data.colors.accent}88` }} />
          <div style={{ flex: 1, height: '0.5px', background: `linear-gradient(to right, ${data.colors.accent}aa, transparent)` }} />
        </div>
        <div style={{ color: data.colors.secondary, fontSize: `${7 * fs}px`, opacity: 0.7, lineHeight: 1.7 }}>{data.subtitle}</div>
      </div>

      {/* Hexagonal photo grid */}
      <div style={{ position: 'relative', zIndex: 1, padding: '8px 14px 10px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridCols}, 1fr)`, gap: '10px' }}>
          {slots.map(i => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
              <div style={{ position: 'relative', width: `${imgSize}px`, height: `${imgSize}px` }}>
                <svg
                  width={imgSize} height={imgSize}
                  viewBox={`0 0 ${imgSize} ${imgSize}`}
                  style={{ position: 'absolute', top: 0, left: 0 }}
                >
                  <defs>
                    <clipPath id={`hex-clip-mw13-${i}`}>
                      <path d={hexPath(imgSize)} />
                    </clipPath>
                  </defs>
                  {images[i] ? (
                    <image
                      href={images[i]}
                      x="0" y="0"
                      width={imgSize} height={imgSize}
                      preserveAspectRatio="xMidYMid slice"
                      clipPath={`url(#hex-clip-mw13-${i})`}
                    />
                  ) : (
                    <path d={hexPath(imgSize)} fill={`${data.colors.primary}15`} stroke={`${data.colors.primary}44`} strokeWidth="1" strokeDasharray="3 2" />
                  )}
                  <path
                    d={hexPath(imgSize)}
                    fill="none"
                    stroke={data.colors.accent}
                    strokeWidth={images[i] ? '2' : '1'}
                    opacity={images[i] ? 1 : 0.4}
                  />
                </svg>
              </div>
              {couples[i] && (
                <span style={{ color: data.colors.primary, fontSize: `${6 * fs}px`, textAlign: 'center', lineHeight: 1.4, fontWeight: 700, opacity: images[i] ? 1 : 0.45, maxWidth: `${imgSize + 10}px` }}>
                  {couples[i]}
                </span>
              )}
            </div>
          ))}
        </div>

        {(data.phone || data.website) && (
          <>
            <div style={{ height: '1px', background: `linear-gradient(to left, transparent, ${data.colors.accent}77, transparent)`, margin: '12px 0 6px' }} />
            <div style={{ textAlign: 'center' }}>
              {data.phone && <div style={{ color: data.colors.secondary, fontSize: `${6.5 * fs}px`, opacity: 0.7 }}>{data.phone}</div>}
              {data.website && <div style={{ color: data.colors.secondary, fontSize: `${6.5 * fs}px`, opacity: 0.7 }}>{data.website}</div>}
            </div>
          </>
        )}
      </div>

      <div style={{ height: '3px', background: `linear-gradient(to right, transparent, ${data.colors.accent}, ${data.colors.primary}, ${data.colors.accent}, transparent)` }} />
    </div>
  );
}
