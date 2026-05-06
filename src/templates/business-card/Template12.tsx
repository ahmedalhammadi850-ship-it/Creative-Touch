import type { TemplateData } from '../../types/template';

export default function Template12({ data }: { data: TemplateData }) {
  const ffs = data.fieldFontSizes ?? {};
  const _d = (data.fontSize ?? 16) - 16;
  const cornerStyle = (pos: React.CSSProperties): React.CSSProperties => ({
    position: 'absolute', width: '16px', height: '16px', ...pos,
  });

  return (
    <div id="template-preview" style={{
      width: '340px', height: '220px',
      backgroundColor: data.colors.bg,
      direction: 'rtl',
      fontFamily: "'Cairo', 'Helvetica Neue', sans-serif",
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }}>
      <div style={{ position: 'absolute', inset: '6px', border: `1px solid ${data.colors.accent}88` }} />
      <div style={{ position: 'absolute', inset: '10px', border: `0.5px solid ${data.colors.primary}22` }} />

      {([
        { top: '4px', right: '4px', borderTop: `2px solid ${data.colors.accent}`, borderRight: `2px solid ${data.colors.accent}` },
        { top: '4px', left: '4px', borderTop: `2px solid ${data.colors.accent}`, borderLeft: `2px solid ${data.colors.accent}` },
        { bottom: '4px', right: '4px', borderBottom: `2px solid ${data.colors.accent}`, borderRight: `2px solid ${data.colors.accent}` },
        { bottom: '4px', left: '4px', borderBottom: `2px solid ${data.colors.accent}`, borderLeft: `2px solid ${data.colors.accent}` },
      ] as React.CSSProperties[]).map((pos, i) => (
        <div key={i} style={cornerStyle(pos)} />
      ))}

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '16px 28px' }}>
        <div style={{ color: data.colors.primary, fontSize: '6px', letterSpacing: '0.32em', marginBottom: '8px', opacity: 0.6, fontWeight: 600 }}>بطاقة أعمال</div>
        <div style={{ color: data.colors.secondary, fontSize: (ffs.name ?? 22) + _d, fontWeight: 900, lineHeight: 1.15 }}>{data.title}</div>
        <div style={{ width: '36px', height: '1.5px', background: `linear-gradient(to left, transparent, ${data.colors.accent}, transparent)`, margin: '7px auto' }} />
        <div style={{ color: data.colors.primary, fontSize: (ffs.jobTitle ?? 10) + _d, fontWeight: 600, marginBottom: '8px', opacity: 0.85 }}>{data.subtitle}</div>
        <div style={{ color: data.colors.secondary, fontSize: (ffs.company ?? 8) + _d, opacity: 0.55, marginBottom: '10px' }}>{data.description}</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {data.phone && <span style={{ color: data.colors.primary, fontSize: (ffs.contact ?? 7) + _d, opacity: 0.8 }} dir="ltr">{data.phone}</span>}
          {data.email && <span style={{ color: data.colors.primary, fontSize: (ffs.contact ?? 7) + _d, opacity: 0.8 }} dir="ltr">{data.email}</span>}
          {data.website && <span style={{ color: data.colors.primary, fontSize: (ffs.contact ?? 7) + _d, opacity: 0.8 }} dir="ltr">{data.website}</span>}
        </div>
      </div>
    </div>
  );
}
