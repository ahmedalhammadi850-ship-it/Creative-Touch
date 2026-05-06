import type { TemplateData } from '../../types/template';

export default function Template14({ data }: { data: TemplateData }) {
  const ffs = data.fieldFontSizes ?? {};
  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div id="template-preview" style={{
      width: '340px', height: '220px',
      backgroundColor: data.colors.bg,
      direction: 'rtl',
      fontFamily: "'Cairo', 'Helvetica Neue', sans-serif",
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        <defs>
          <pattern id="bc14-grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M28,0 L0,0 L0,28" fill="none" stroke={data.colors.primary} strokeWidth="0.3" opacity="0.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bc14-grid)" />
      </svg>

      <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: `radial-gradient(circle, ${data.colors.primary}55 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -20, left: -20, width: 90, height: 90, borderRadius: '50%', background: `radial-gradient(circle, ${data.colors.accent}33 0%, transparent 65%)`, pointerEvents: 'none' }} />

      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(to left, transparent, ${data.colors.accent}, ${data.colors.primary}, transparent)` }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(to left, transparent, ${data.colors.primary}88, transparent)` }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '0 26px' }}>
        <div style={{ color: data.colors.accent, fontSize: '6px', letterSpacing: '0.3em', fontWeight: 700, marginBottom: '9px', opacity: 0.9 }}>BUSINESS CARD</div>
        <div style={{ color: data.colors.secondary, fontSize: (ffs.name ?? 22) + _d, fontWeight: 900, lineHeight: 1.1, marginBottom: '4px', textShadow: `0 0 14px ${data.colors.primary}88` }}>{data.title}</div>
        <div style={{ color: data.colors.primary, fontSize: (ffs.jobTitle ?? 10) + _d, fontWeight: 600, marginBottom: '12px' }}>{data.subtitle}</div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          {data.phone && <span style={{ color: data.colors.accent, fontSize: (ffs.contact ?? 7.5) + _d, fontWeight: 600 }} dir="ltr">{data.phone}</span>}
          {data.email && <span style={{ color: data.colors.secondary, fontSize: (ffs.contact ?? 7.5) + _d, opacity: 0.65 }} dir="ltr">{data.email}</span>}
          {data.website && <span style={{ color: data.colors.secondary, fontSize: (ffs.contact ?? 7.5) + _d, opacity: 0.65 }} dir="ltr">{data.website}</span>}
        </div>
      </div>
    </div>
  );
}
