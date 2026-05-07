import type { TemplateData } from '../../types/template';

export default function Template15({ data }: { data: TemplateData }) {
  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div id="template-preview" style={{
      width: '280px', height: '400px',
      backgroundColor: data.colors.bg,
      direction: 'rtl',
      fontFamily: "'Georgia', 'Times New Roman', serif",
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ position: 'absolute', inset: '8px', border: `0.5px solid ${data.colors.primary}44` }} />
      {([
        { top: '6px', right: '6px', borderTop: `1.5px solid ${data.colors.accent}`, borderRight: `1.5px solid ${data.colors.accent}` },
        { top: '6px', left: '6px', borderTop: `1.5px solid ${data.colors.accent}`, borderLeft: `1.5px solid ${data.colors.accent}` },
        { bottom: '6px', right: '6px', borderBottom: `1.5px solid ${data.colors.accent}`, borderRight: `1.5px solid ${data.colors.accent}` },
        { bottom: '6px', left: '6px', borderBottom: `1.5px solid ${data.colors.accent}`, borderLeft: `1.5px solid ${data.colors.accent}` },
      ] as React.CSSProperties[]).map((pos, i) => (
        <div key={i} style={{ position: 'absolute', ...pos, width: '14px', height: '14px' }} />
      ))}

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 30px' }}>
        <div style={{ color: data.colors.secondary, fontSize: `${7 + _d}px`, letterSpacing: '0.35em', marginBottom: '20px', opacity: 0.55, fontWeight: 400 }}>
          دعوة زفاف
        </div>
        <div style={{ color: data.colors.primary, fontSize: `${28 + _d}px`, fontWeight: 300, lineHeight: 1.2, letterSpacing: '0.04em' }}>{data.title}</div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '12px auto', width: '120px', justifyContent: 'center' }}>
          <div style={{ flex: 1, height: '1px', background: `linear-gradient(to left, ${data.colors.primary}88, transparent)` }} />
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path d="M6,0 L7,4 L12,4 L8,7 L9,12 L6,9 L3,12 L4,7 L0,4 L5,4 Z" fill={data.colors.accent} opacity="0.75" />
          </svg>
          <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, ${data.colors.primary}88, transparent)` }} />
        </div>

        <div style={{ color: data.colors.primary, fontSize: `${28 + _d}px`, fontWeight: 300, lineHeight: 1.2, letterSpacing: '0.04em', marginBottom: '22px' }}>{data.subtitle}</div>

        <div style={{ width: '34px', height: '1px', background: data.colors.accent, margin: '0 auto 16px', opacity: 0.8 }} />
        <div style={{ color: data.colors.secondary, fontSize: `${9 + _d}px`, lineHeight: 1.9, opacity: 0.72, letterSpacing: '0.02em' }}>
          {data.description}
        </div>
      </div>
    </div>
  );
}
