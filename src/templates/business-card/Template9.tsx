import type { TemplateData } from '../../types/template';

export default function Template9({ data }: { data: TemplateData }) {
  return (
    <div id="template-preview" style={{ width: '340px', height: '220px', position: 'relative', overflow: 'hidden', fontFamily: "'Helvetica Neue', Arial, sans-serif", direction: 'rtl', background: `linear-gradient(135deg, ${data.colors.primary} 0%, ${data.colors.secondary} 100%)` }}>
      {/* Diagonal white slash */}
      <div style={{ position: 'absolute', top: 0, left: '-20%', width: '55%', height: '100%', background: 'rgba(255,255,255,0.07)', transform: 'skewX(-12deg)', pointerEvents: 'none' }} />
      {/* Circle accent */}
      <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '160px', height: '160px', borderRadius: '50%', border: `2px solid ${data.colors.accent}33` }} />
      <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '100px', height: '100px', borderRadius: '50%', background: `${data.colors.accent}15` }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, padding: '22px 24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ color: data.colors.accent, fontSize: '10px', letterSpacing: '0.2em', marginBottom: '4px', opacity: 0.85 }}>{data.description}</div>
          <div style={{ color: '#ffffff', fontSize: '24px', fontWeight: '800', lineHeight: 1.1 }}>{data.title}</div>
          <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px', marginTop: '3px' }}>{data.subtitle}</div>
        </div>
        <div style={{ display: 'flex', gap: '14px', flexDirection: 'column' }}>
          <div style={{ width: '40px', height: '2px', background: data.colors.accent, borderRadius: '1px' }} />
          <div style={{ display: 'flex', gap: '10px', flexDirection: 'column', fontSize: '9px', color: 'rgba(255,255,255,0.7)' }} dir="ltr">
            {data.phone && <span style={{ textAlign: 'right' }}>{data.phone}</span>}
            {data.email && <span style={{ textAlign: 'right' }}>{data.email}</span>}
            {data.website && <span style={{ textAlign: 'right' }}>{data.website}</span>}
          </div>
        </div>
      </div>

      {/* Right accent bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '5px', height: '100%', background: data.colors.accent }} />
    </div>
  );
}
