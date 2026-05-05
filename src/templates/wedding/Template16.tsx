import type { TemplateData } from '../../types/template';

export default function Template16({ data }: { data: TemplateData }) {
  return (
    <div id="template-preview" style={{
      width: '280px', height: '400px',
      backgroundColor: data.colors.bg,
      direction: 'rtl',
      fontFamily: "'Georgia', serif",
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    }}>
      {Array.from({ length: 20 }, (_, i) => ({
        x: (i * 71 + 18) % 262,
        y: (i * 57 + 12) % 374,
        r: i % 4 === 0 ? 1.4 : 0.75,
        o: 0.28 + (i % 3) * 0.13,
      })).map((s, i) => (
        <div key={i} style={{ position: 'absolute', left: s.x, top: s.y, width: s.r * 2, height: s.r * 2, borderRadius: '50%', background: data.colors.accent, opacity: s.o }} />
      ))}

      <div style={{ position: 'absolute', top: '28%', left: '50%', transform: 'translate(-50%, -50%)', width: 200, height: 200, borderRadius: '50%', background: `radial-gradient(circle, ${data.colors.primary}44 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: '10px', border: `1px solid ${data.colors.accent}33` }} />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 26px' }}>
        <div style={{ color: data.colors.accent, fontSize: '16px', marginBottom: '10px', opacity: 0.8 }}>✦</div>
        <div style={{ color: data.colors.accent, fontSize: '6.5px', letterSpacing: '0.3em', marginBottom: '14px', opacity: 0.8 }}>دعوة زفاف</div>

        <div style={{ color: data.colors.secondary, fontSize: '30px', fontWeight: 700, lineHeight: 1.2, marginBottom: '6px', textShadow: `0 0 20px ${data.colors.primary}66` }}>
          {data.title}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '8px 0', justifyContent: 'center' }}>
          <div style={{ width: '22px', height: '0.5px', background: `${data.colors.accent}88` }} />
          <span style={{ color: data.colors.accent, fontSize: '14px', opacity: 0.8 }}>❧</span>
          <div style={{ width: '22px', height: '0.5px', background: `${data.colors.accent}88` }} />
        </div>

        <div style={{ color: data.colors.secondary, fontSize: '30px', fontWeight: 700, lineHeight: 1.2, marginBottom: '14px', textShadow: `0 0 20px ${data.colors.primary}66` }}>
          {data.subtitle}
        </div>

        <div style={{ width: '46px', height: '1px', background: `linear-gradient(to left, transparent, ${data.colors.accent}, transparent)`, margin: '0 auto 12px' }} />
        <div style={{ color: `${data.colors.secondary}bb`, fontSize: '9px', lineHeight: 2.1, letterSpacing: '0.03em' }}>
          {data.description}
        </div>
      </div>
    </div>
  );
}
