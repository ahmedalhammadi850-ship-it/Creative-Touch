import type { TemplateData } from '../../types/template';

export default function Template13({ data }: { data: TemplateData }) {
  return (
    <div id="template-preview" style={{
      width: '340px', height: '220px',
      backgroundColor: data.colors.bg,
      direction: 'rtl',
      fontFamily: "'Cairo', 'Helvetica Neue', sans-serif",
      position: 'relative', overflow: 'hidden',
      display: 'flex',
    }}>
      <div style={{
        width: '130px', flexShrink: 0,
        background: `linear-gradient(160deg, ${data.colors.primary} 0%, ${data.colors.secondary} 100%)`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
        <div style={{ position: 'absolute', bottom: -15, left: -15, width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 10px' }}>
          <div style={{ width: '28px', height: '1.5px', background: `${data.colors.accent}`, margin: '0 auto 6px' }} />
          <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '7px', letterSpacing: '0.1em' }}>محترف</div>
        </div>
      </div>

      <div style={{ flex: 1, padding: '18px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: data.colors.bg }}>
        <div style={{ width: '28px', height: '2.5px', background: data.colors.accent, marginBottom: '9px', borderRadius: '2px' }} />
        <div style={{ color: data.colors.secondary, fontSize: '19px', fontWeight: 900, lineHeight: 1.15, marginBottom: '3px' }}>{data.title}</div>
        <div style={{ color: data.colors.primary, fontSize: '9px', fontWeight: 700, marginBottom: '9px', opacity: 0.9 }}>{data.subtitle}</div>
        <div style={{ color: data.colors.secondary, fontSize: '8px', opacity: 0.55, marginBottom: '8px' }}>{data.description}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {data.phone && <span style={{ color: data.colors.primary, fontSize: '7.5px', opacity: 0.85, fontWeight: 600 }} dir="ltr">{data.phone}</span>}
          {data.email && <span style={{ color: data.colors.primary, fontSize: '7.5px', opacity: 0.7 }} dir="ltr">{data.email}</span>}
          {data.website && <span style={{ color: data.colors.primary, fontSize: '7.5px', opacity: 0.7 }} dir="ltr">{data.website}</span>}
        </div>
      </div>
    </div>
  );
}
