import type { TemplateData } from '../../types/template';

export default function Template15({ data }: { data: TemplateData }) {
  const ffs = data.fieldFontSizes ?? {};
  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div id="template-preview" style={{
      width: '340px', height: '220px',
      backgroundColor: '#0a0a0a',
      direction: 'rtl',
      fontFamily: "'Cairo', sans-serif",
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.12 }}>
        <defs>
          <pattern id="bc15-diamond" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="12" height="12" fill={data.colors.accent} opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bc15-diamond)" />
      </svg>

      <div style={{ position: 'absolute', top: '50%', right: -30, transform: 'translateY(-50%)', width: 140, height: 140, borderRadius: '50%', background: `radial-gradient(circle, ${data.colors.accent}44 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: '20%', bottom: '20%', width: '3px', background: `linear-gradient(to bottom, transparent, ${data.colors.accent}, transparent)` }} />

      {[
        { top: '8px', right: '8px', borderTop: `1.5px solid ${data.colors.accent}`, borderRight: `1.5px solid ${data.colors.accent}` },
        { bottom: '8px', left: '8px', borderBottom: `1.5px solid ${data.colors.accent}`, borderLeft: `1.5px solid ${data.colors.accent}` },
      ].map((s, i) => <div key={i} style={{ position: 'absolute', ...s, width: '14px', height: '14px' }} />)}

      <div style={{ position: 'relative', zIndex: 1, padding: '0 22px' }}>
        <div style={{ color: data.colors.accent, fontSize: '6px', letterSpacing: '0.32em', marginBottom: '8px', opacity: 0.8 }}>✦ بطاقة أعمال ✦</div>
        <div style={{ color: '#fff', fontSize: (ffs.name ?? 22) + _d, fontWeight: 900, lineHeight: 1.1, marginBottom: '3px', textShadow: `0 0 20px ${data.colors.accent}66` }}>{data.title}</div>
        <div style={{ color: data.colors.accent, fontSize: (ffs.jobTitle ?? 9.5) + _d, fontWeight: 700, marginBottom: '10px' }}>{data.subtitle}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {data.phone && <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: (ffs.contact ?? 7.5) + _d }} dir="ltr">{data.phone}</span>}
          {data.email && <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: (ffs.contact ?? 7.5) + _d }} dir="ltr">{data.email}</span>}
          {data.website && <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: (ffs.contact ?? 7.5) + _d }} dir="ltr">{data.website}</span>}
        </div>
      </div>
    </div>
  );
}
