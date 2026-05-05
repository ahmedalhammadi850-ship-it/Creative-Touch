import type { TemplateData } from '../../types/template';

export default function Template6({ data }: { data: TemplateData }) {
  const services = data.description ? data.description.split('،').map(s => s.trim()).filter(Boolean) : [];
  return (
    <div id="template-preview" style={{ width: '360px', height: '360px', position: 'relative', overflow: 'hidden', fontFamily: "'Helvetica Neue', Arial, sans-serif", direction: 'rtl', backgroundColor: data.colors.bg }}>
      {/* Vertical left bar */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '8px', height: '100%', background: `linear-gradient(to bottom, ${data.colors.accent}, ${data.colors.primary})` }} />

      {/* Background grid lines */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04 }}>
        <defs>
          <pattern id="ad6-grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke={data.colors.primary} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ad6-grid)" />
      </svg>

      {/* Decorative corner */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100px', height: '100px' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '60px', height: '60px', background: `${data.colors.primary}18`, borderRadius: '0 60px 0 0' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, padding: '28px 36px 28px 28px', height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ marginBottom: '18px' }}>
          <div style={{ color: data.colors.accent, fontSize: '9px', letterSpacing: '0.2em', marginBottom: '4px' }}>خدماتنا المميزة</div>
          <div style={{ color: data.colors.primary, fontSize: '26px', fontWeight: '900', lineHeight: 1.1 }}>{data.title}</div>
          <div style={{ width: '40px', height: '3px', background: data.colors.accent, borderRadius: '2px', marginTop: '6px' }} />
        </div>

        {/* Subtitle */}
        <div style={{ color: data.colors.secondary, fontSize: '12px', marginBottom: '16px', opacity: 0.8 }}>{data.subtitle}</div>

        {/* Service list */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {(services.length > 0 ? services : ['خدمة شاملة ومتكاملة', 'أسعار مناسبة', 'فريق محترف']).map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: data.colors.accent, flexShrink: 0 }} />
              <span style={{ color: data.colors.secondary, fontSize: '12px', opacity: 0.85 }}>{s}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        {data.phone && (
          <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: `1px solid ${data.colors.primary}22` }}>
            <div style={{ color: data.colors.accent, fontSize: '10px', marginBottom: '4px' }}>تواصل معنا</div>
            <div style={{ color: data.colors.primary, fontSize: '15px', fontWeight: '800' }} dir="ltr">{data.phone}</div>
          </div>
        )}
      </div>
    </div>
  );
}
