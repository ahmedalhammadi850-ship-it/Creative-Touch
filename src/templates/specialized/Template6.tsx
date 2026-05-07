import type { TemplateData } from '../../types/template';

export default function SpecializedTemplate6({ data }: { data: TemplateData }) {
  const services = (data.description || '').split('،').map(s => s.trim()).filter(Boolean);
  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div id="template-preview" style={{ width: '360px', height: '360px', position: 'relative', overflow: 'hidden', fontFamily: 'Cairo, sans-serif', direction: 'rtl', background: `linear-gradient(145deg, ${data.colors.primary} 0%, ${data.colors.bg} 50%, ${data.colors.secondary}44 100%)` }}>
      {/* Building silhouette */}
      <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }} height="70" viewBox="0 0 360 70" preserveAspectRatio="none">
        <rect x="20" y="20" width="30" height="50" fill={data.colors.accent} opacity="0.08" />
        <rect x="55" y="10" width="20" height="60" fill={data.colors.accent} opacity="0.08" />
        <rect x="80" y="25" width="25" height="45" fill={data.colors.accent} opacity="0.06" />
        <rect x="260" y="15" width="25" height="55" fill={data.colors.accent} opacity="0.08" />
        <rect x="290" y="5" width="20" height="65" fill={data.colors.accent} opacity="0.1" />
        <rect x="315" y="22" width="30" height="48" fill={data.colors.accent} opacity="0.07" />
      </svg>

      {/* Horizontal accent line */}
      <div style={{ position: 'absolute', top: '48%', left: 0, width: '100%', height: '1px', background: `linear-gradient(to left, transparent, ${data.colors.accent}44, transparent)` }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '24px 22px', height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'inline-block', background: data.colors.accent, color: data.colors.primary, padding: '2px 10px', fontSize: '9px', fontWeight: '800', letterSpacing: '0.1em', borderRadius: '2px', marginBottom: '8px' }}>REAL ESTATE</div>
          <div style={{ color: '#ffffff', fontSize: '24px', fontWeight: '900', lineHeight: 1.1, textShadow: '0 2px 6px rgba(0,0,0,0.3)' }}>{data.title}</div>
          <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px', marginTop: '3px' }}>{data.subtitle}</div>
        </div>

        {/* Services */}
        <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: '7px', alignContent: 'flex-start' }}>
          {(services.length > 0 ? services : ['بيع وشراء', 'إيجار', 'تقييم عقاري', 'استشارات']).map((s, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.20)', border: '1px solid rgba(255,255,255,0.28)', borderRadius: '20px', padding: '4px 12px', color: '#ffffff', fontSize: '11px', fontWeight: '600' }}>{s}</div>
          ))}
        </div>

        {/* CTA bar */}
        <div style={{ background: 'rgba(255,255,255,0.18)', borderRadius: '8px', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid rgba(255,255,255,0.28)' }}>
          <div>
            <div style={{ color: data.colors.accent, fontSize: '9px', fontWeight: '700' }}>تواصل معنا الآن</div>
            {data.phone && <div style={{ color: '#ffffff', fontSize: '14px', fontWeight: '800' }} dir="ltr">{data.phone}</div>}
          </div>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: data.colors.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🏠</div>
        </div>
      </div>
    </div>
  );
}
