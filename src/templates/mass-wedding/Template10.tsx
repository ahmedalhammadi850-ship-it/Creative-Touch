import type { TemplateData } from '../../types/template';

export default function Template10({ data }: { data: TemplateData }) {
  const couples = data.description ? data.description.split('\n').filter(Boolean) : [];
  const images = data.images || [];
  const fs = data.fontSize ?? 1;

  const filledCount = images.filter(Boolean).length;
  const gridCols = filledCount === 0 ? 3 : filledCount === 1 ? 1 : filledCount === 2 ? 2 : 3;
  const imgW = filledCount === 1 ? 120 : filledCount === 2 ? 96 : 62;
  const imgH = Math.round(imgW * 1.15);
  const slots = filledCount > 0
    ? Array.from({ length: 6 }, (_, i) => i).filter(i => !!images[i])
    : Array.from({ length: 6 }, (_, i) => i);

  const starPositions = [
    { x: 15, y: 12 }, { x: 240, y: 8 }, { x: 258, y: 30 }, { x: 22, y: 35 },
    { x: 130, y: 5 }, { x: 52, y: 18 }, { x: 218, y: 22 }, { x: 140, y: 120 },
    { x: 10, y: 200 }, { x: 265, y: 150 }, { x: 80, y: 280 }, { x: 200, y: 310 },
  ];

  return (
    <div id="template-preview" style={{
      width: '280px', minHeight: '490px',
      backgroundColor: data.colors.bg,
      direction: 'rtl',
      fontFamily: "'Cairo', 'Helvetica Neue', sans-serif",
      position: 'relative', overflow: 'hidden',
    }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        {starPositions.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={i % 3 === 0 ? 1.5 : 0.9} fill={data.colors.accent} opacity={0.45 + (i % 3) * 0.15} />
        ))}
        {Array.from({ length: 18 }, (_, i) => ({ x: (i * 67 + 30) % 262, y: (i * 89 + 50) % 460 })).map((s, i) => (
          <circle key={`s${i}`} cx={s.x} cy={s.y} r="0.65" fill={data.colors.accent} opacity="0.2" />
        ))}
      </svg>

      <div style={{ position: 'absolute', top: -50, left: '50%', transform: 'translateX(-50%)', width: 200, height: 200, borderRadius: '50%', background: `radial-gradient(circle, ${data.colors.primary}55 0%, transparent 65%)`, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '22px 16px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', width: '100%' }}>
          <div style={{ flex: 1, height: '1px', background: `linear-gradient(to left, ${data.colors.accent}99, transparent)` }} />
          <span style={{ color: data.colors.accent, fontSize: `${6 * fs}px`, letterSpacing: '0.2em', fontWeight: 600 }}>{data.eventLabel ?? 'دعوة عرس جماعي'}</span>
          <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, ${data.colors.accent}99, transparent)` }} />
        </div>

        <div style={{ color: data.colors.accent, fontSize: `${14 * fs}px`, fontWeight: 900, textAlign: 'center', lineHeight: 1.3, marginBottom: '5px', textShadow: `0 0 20px ${data.colors.accent}55` }}>
          {data.title}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', margin: '6px 0' }}>
          <div style={{ width: '28px', height: '1px', background: `${data.colors.primary}aa` }} />
          <div style={{ width: '6px', height: '6px', transform: 'rotate(45deg)', background: data.colors.accent, opacity: 0.8 }} />
          <div style={{ width: '28px', height: '1px', background: `${data.colors.primary}aa` }} />
        </div>

        <div style={{ color: data.colors.secondary, fontSize: `${7 * fs}px`, textAlign: 'center', lineHeight: 1.7, marginBottom: '14px', opacity: 0.8 }}>
          {data.subtitle}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridCols}, 1fr)`, gap: '8px', width: '100%' }}>
          {slots.map(i => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div style={{ position: 'relative' }}>
                {images[i] && [
                  { top: '-3px', right: '-3px' as const, borderTop: `2px solid ${data.colors.accent}`, borderRight: `2px solid ${data.colors.accent}` },
                  { top: '-3px', left: '-3px' as const, borderTop: `2px solid ${data.colors.accent}`, borderLeft: `2px solid ${data.colors.accent}` },
                  { bottom: '-3px', right: '-3px' as const, borderBottom: `2px solid ${data.colors.accent}`, borderRight: `2px solid ${data.colors.accent}` },
                  { bottom: '-3px', left: '-3px' as const, borderBottom: `2px solid ${data.colors.accent}`, borderLeft: `2px solid ${data.colors.accent}` },
                ].map((s, ci) => <div key={ci} style={{ position: 'absolute', ...s, width: '8px', height: '8px', zIndex: 2 }} />)}
                <div style={{
                  width: `${imgW}px`, height: `${imgH}px`,
                  border: `1px ${images[i] ? 'solid' : 'dashed'} ${data.colors.primary}${images[i] ? 'aa' : '44'}`,
                  overflow: 'hidden',
                  background: images[i] ? 'transparent' : `${data.colors.primary}15`,
                  boxShadow: images[i] ? `0 4px 16px ${data.colors.primary}66` : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {images[i] ? <img src={images[i]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '18px', height: '24px', background: `${data.colors.primary}22` }} />}
                </div>
              </div>
              {couples[i] && <span style={{ color: data.colors.accent, fontSize: `${6 * fs}px`, textAlign: 'center', lineHeight: 1.4, maxWidth: `${imgW + 8}px`, fontWeight: 700, opacity: images[i] ? 1 : 0.4 }}>{couples[i]}</span>}
            </div>
          ))}
        </div>

        {(data.phone || data.website) && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '12px 0 6px', width: '100%' }}>
              <div style={{ flex: 1, height: '1px', background: `${data.colors.primary}55` }} />
              <svg width="10" height="10" viewBox="0 0 10 10"><path d="M5,0 L6.5,3.5 L10,5 L6.5,6.5 L5,10 L3.5,6.5 L0,5 L3.5,3.5 Z" fill={data.colors.accent} opacity="0.7" /></svg>
              <div style={{ flex: 1, height: '1px', background: `${data.colors.primary}55` }} />
            </div>
            <div style={{ textAlign: 'center' }}>
              {data.phone && <div style={{ color: data.colors.secondary, fontSize: `${7 * fs}px`, opacity: 0.7 }}>{data.phone}</div>}
              {data.website && <div style={{ color: data.colors.secondary, fontSize: `${7 * fs}px`, opacity: 0.7 }}>{data.website}</div>}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
