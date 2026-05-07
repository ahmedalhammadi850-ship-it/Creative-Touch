import type { TemplateData } from '../../types/template';

export default function Template10({ data }: { data: TemplateData }) {
  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div id="template-preview" style={{
      width: '360px', height: '360px',
      backgroundColor: data.colors.bg,
      direction: 'rtl',
      fontFamily: "'Cairo', 'Helvetica Neue', sans-serif",
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
    }}>
      <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: `radial-gradient(circle, ${data.colors.primary}55 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -40, left: -40, width: 160, height: 160, borderRadius: '50%', background: `radial-gradient(circle, ${data.colors.accent}33 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        <defs>
          <pattern id="ads10-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24,0 L0,0 L0,24" fill="none" stroke={data.colors.primary} strokeWidth="0.25" opacity="0.22" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ads10-grid)" />
      </svg>

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 30px' }}>
        <div style={{ display: 'inline-block', background: `${data.colors.primary}33`, border: `1px solid ${data.colors.primary}88`, borderRadius: '20px', padding: '3px 14px', marginBottom: '14px' }}>
          <span style={{ color: data.colors.accent, fontSize: `${9 + _d}px`, letterSpacing: '0.2em', fontWeight: 700 }}>عرض خاص</span>
        </div>

        <div style={{ color: data.colors.secondary, fontSize: `${26 + _d}px`, fontWeight: 900, lineHeight: 1.2, marginBottom: '8px', textShadow: `0 0 30px ${data.colors.secondary}44` }}>
          {data.title}
        </div>

        <div style={{ width: '58px', height: '2px', background: data.colors.accent, margin: '0 auto 8px', boxShadow: `0 0 8px ${data.colors.accent}`, borderRadius: '1px' }} />

        <div style={{ color: data.colors.primary, fontSize: `${12 + _d}px`, fontWeight: 700, marginBottom: '10px' }}>{data.subtitle}</div>
        <div style={{ color: `${data.colors.secondary}bb`, fontSize: `${10 + _d}px`, lineHeight: 1.7, marginBottom: '20px' }}>{data.description}</div>

        {data.phone && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: `linear-gradient(135deg, ${data.colors.primary}, ${data.colors.accent}88)`,
            border: `1px solid ${data.colors.primary}`,
            borderRadius: '30px', padding: '9px 24px',
            boxShadow: `0 4px 20px ${data.colors.primary}55`,
            whiteSpace: 'nowrap',
          }}>
            <span style={{ color: '#fff', fontSize: `${11 + _d}px`, fontWeight: 700, whiteSpace: 'nowrap' }} dir="ltr">{data.phone}</span>
          </div>
        )}
      </div>
    </div>
  );
}
