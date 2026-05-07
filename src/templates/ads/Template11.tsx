import type { TemplateData } from '../../types/template';

export default function Template11({ data }: { data: TemplateData }) {
  const services = (data.description || '').split(/[,،\n]/).map(s => s.trim()).filter(Boolean);

  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div id="template-preview" style={{
      width: '360px', height: '360px',
      backgroundColor: data.colors.bg,
      direction: 'rtl',
      fontFamily: "'Cairo', sans-serif",
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
    }}>
      {/* Geometric hexagon grid bg */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.07 }}>
        <defs>
          <pattern id="ads11-hex" width="40" height="46" patternUnits="userSpaceOnUse">
            <polygon points="20,2 38,12 38,34 20,44 2,34 2,12" fill="none" stroke={data.colors.primary} strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ads11-hex)" />
      </svg>

      {/* Bold diagonal accent */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: 0, height: 0, borderStyle: 'solid', borderWidth: '0 80px 80px 0', borderColor: `transparent ${data.colors.primary}33 transparent transparent`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: 0, height: 0, borderStyle: 'solid', borderWidth: '80px 0 0 80px', borderColor: `transparent transparent transparent ${data.colors.accent}22`, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 28px', width: '100%' }}>
        <div style={{ display: 'inline-block', background: `${data.colors.primary}22`, border: `1px solid ${data.colors.primary}66`, borderRadius: '4px', padding: '3px 14px', marginBottom: '12px' }}>
          <span style={{ color: data.colors.primary, fontSize: `${9 + _d}px`, letterSpacing: '0.18em', fontWeight: 700 }}>خدمات احترافية</span>
        </div>

        <div style={{ color: data.colors.secondary, fontSize: `${26 + _d}px`, fontWeight: 900, lineHeight: 1.2, marginBottom: '6px' }}>{data.title}</div>
        <div style={{ color: data.colors.primary, fontSize: `${11 + _d}px`, fontWeight: 700, marginBottom: '14px' }}>{data.subtitle}</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px', textAlign: 'right', marginBottom: '16px' }}>
          {services.slice(0, 4).map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 8px', background: `${data.colors.primary}12`, borderRadius: '6px' }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: data.colors.accent, flexShrink: 0 }} />
              <span style={{ color: data.colors.secondary, fontSize: `${10 + _d}px`, fontWeight: 600 }}>{s}</span>
            </div>
          ))}
        </div>

        {data.phone && (
          <div style={{
            display: 'inline-flex', gap: '6px', alignItems: 'center',
            background: `linear-gradient(135deg, ${data.colors.primary}, ${data.colors.secondary})`,
            borderRadius: '30px', padding: '9px 26px',
            boxShadow: `0 4px 18px ${data.colors.primary}55`,
            whiteSpace: 'nowrap',
          }}>
            <span style={{ color: '#fff', fontSize: `${12 + _d}px`, fontWeight: 800, whiteSpace: 'nowrap' }} dir="ltr">{data.phone}</span>
          </div>
        )}
      </div>
    </div>
  );
}
