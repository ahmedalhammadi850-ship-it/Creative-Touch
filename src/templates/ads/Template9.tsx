import type { TemplateData } from '../../types/template';

export default function Template9({ data }: { data: TemplateData }) {
  const services = (data.description || '').split(/[,،\n]/).map(s => s.trim()).filter(Boolean);

  return (
    <div id="template-preview" style={{
      width: '360px', height: '360px',
      backgroundColor: data.colors.bg,
      direction: 'rtl',
      fontFamily: "'Cairo', 'Helvetica Neue', sans-serif",
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{
        background: `linear-gradient(135deg, ${data.colors.primary} 0%, ${data.colors.secondary} 100%)`,
        padding: '22px 24px 18px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -20, left: -20, width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ color: 'rgba(255,255,255,0.78)', fontSize: '9px', letterSpacing: '0.15em', marginBottom: '5px' }}>عرض حصري</div>
          <div style={{ color: '#fff', fontSize: '21px', fontWeight: 900, lineHeight: 1.2 }}>{data.title}</div>
          <div style={{ color: data.colors.accent, fontSize: '12px', fontWeight: 700, marginTop: '4px' }}>{data.subtitle}</div>
        </div>
      </div>

      <svg width="360" height="14" viewBox="0 0 360 14" style={{ display: 'block', marginTop: '-1px' }}>
        <path d="M0,0 Q45,14 90,7 Q135,0 180,7 Q225,14 270,7 Q315,0 360,7 L360,0 Z" fill={data.colors.secondary} />
      </svg>

      <div style={{ flex: 1, padding: '12px 22px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', marginBottom: '16px' }}>
          {services.slice(0, 4).map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: data.colors.accent, flexShrink: 0 }} />
              <span style={{ color: data.colors.secondary, fontSize: '11px', fontWeight: 600 }}>{s}</span>
            </div>
          ))}
        </div>
        {data.phone && (
          <div style={{
            background: `linear-gradient(135deg, ${data.colors.primary}15, ${data.colors.accent}15)`,
            border: `1.5px solid ${data.colors.primary}33`, borderRadius: '12px',
            padding: '10px 16px', textAlign: 'center',
          }}>
            <div style={{ color: data.colors.primary, fontSize: '9px', fontWeight: 700, marginBottom: '2px' }}>تواصل معنا</div>
            <div style={{ color: data.colors.secondary, fontSize: '13px', fontWeight: 800 }} dir="ltr">{data.phone}</div>
          </div>
        )}
      </div>
    </div>
  );
}
