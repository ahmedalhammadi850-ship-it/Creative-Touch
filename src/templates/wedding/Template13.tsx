import type { TemplateData } from '../../types/template';

export default function Template13({ data }: { data: TemplateData }) {
  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div id="template-preview" style={{ width: '280px', height: '400px', position: 'relative', overflow: 'hidden', fontFamily: "'Georgia', serif", direction: 'rtl', background: `linear-gradient(165deg, ${data.colors.bg} 0%, ${data.colors.primary}18 100%)` }}>
      {/* Stars */}
      {[[30,40],[60,90],[220,30],[250,70],[140,20],[180,110]].map(([x,y], i) => (
        <div key={i} style={{ position: 'absolute', left: x, top: y, width: i%3===0 ? '3px' : '2px', height: i%3===0 ? '3px' : '2px', borderRadius: '50%', background: data.colors.accent, opacity: 0.5 + (i%3)*0.15 }} />
      ))}

      {/* Center glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '200px', height: '200px', borderRadius: '50%', background: `radial-gradient(circle, ${data.colors.primary}20 0%, transparent 60%)` }} />

      {/* Ornate border */}
      <div style={{ position: 'absolute', inset: '10px', border: `1px solid ${data.colors.primary}33` }} />
      <div style={{ position: 'absolute', inset: '14px', border: `0.5px solid ${data.colors.accent}22` }} />
      {/* Corner dots */}
      {[[10,10],[10,'auto'],[('auto' as unknown as number),10],[('auto' as unknown as number),('auto' as unknown as number)]].map((_, i) => (
        <div key={i} style={{ position: 'absolute', top: i<2?'10px':'auto', bottom: i>=2?'10px':'auto', right: i%2===0?'10px':'auto', left: i%2===1?'10px':'auto', width: '6px', height: '6px', borderRadius: '50%', background: data.colors.accent, opacity: 0.5 }} />
      ))}

      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 20px', textAlign: 'center' }}>
        <div style={{ color: data.colors.accent, fontSize: `${20 + _d}px`, marginBottom: '8px', opacity: 0.85 }}>✦</div>
        <div style={{ color: data.colors.primary, fontSize: `${7 + _d}px`, letterSpacing: '0.22em', marginBottom: '14px', opacity: 0.7 }}>يسعدهم دعوتكم</div>

        <div style={{ color: data.colors.primary, fontSize: `${28 + _d}px`, lineHeight: 1.25, marginBottom: '5px' }}>{data.title}</div>
        <div style={{ color: data.colors.accent, fontSize: `${11 + _d}px`, fontStyle: 'italic', marginBottom: '5px' }}>و</div>
        <div style={{ color: data.colors.primary, fontSize: `${28 + _d}px`, lineHeight: 1.25, marginBottom: '14px' }}>{data.subtitle}</div>

        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginBottom: '14px' }}>
          {[0,1,2].map(i => <div key={i} style={{ width: i===1?'20px':'8px', height: '1.5px', background: data.colors.accent, opacity: 0.6 }} />)}
        </div>

        <div style={{ color: data.colors.secondary, fontSize: `${10 + _d}px`, lineHeight: 2, opacity: 0.75 }}>{data.description}</div>
      </div>
    </div>
  );
}
