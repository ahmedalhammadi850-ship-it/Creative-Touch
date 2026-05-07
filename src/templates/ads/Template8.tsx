import type { TemplateData } from '../../types/template';

export default function Template8({ data }: { data: TemplateData }) {
  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div id="template-preview" style={{
      width: '360px', height: '360px',
      background: `linear-gradient(135deg, ${data.colors.primary} 0%, ${data.colors.secondary} 100%)`,
      direction: 'rtl',
      fontFamily: "'Cairo', 'Helvetica Neue', sans-serif",
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ position: 'absolute', top: -50, right: -50, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
      <div style={{ position: 'absolute', bottom: -40, left: -40, width: 170, height: 170, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

      <div style={{
        position: 'absolute', top: '16px', left: '16px',
        background: data.colors.accent,
        borderRadius: '50%', width: '58px', height: '58px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 4px 20px ${data.colors.accent}66`,
      }}>
        <span style={{ color: data.colors.primary, fontSize: '8px', fontWeight: 900, textAlign: 'center', lineHeight: 1.2 }}>عرض<br/>محدود</span>
      </div>

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 28px' }}>
        <div style={{ color: data.colors.accent, fontSize: '56px', fontWeight: 900, lineHeight: 1, textShadow: `0 4px 20px ${data.colors.accent}55`, marginBottom: '4px' }}>
          {data.title}
        </div>
        <div style={{ color: '#fff', fontSize: '14px', fontWeight: 700, marginBottom: '8px', opacity: 0.95 }}>{data.subtitle}</div>
        <div style={{ width: '46px', height: '2px', background: data.colors.accent, margin: '0 auto 10px', borderRadius: '1px' }} />
        <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '11px', lineHeight: 1.65, marginBottom: '18px', maxWidth: '240px' }}>{data.description}</div>
        {data.phone && (
          <div style={{
            display: 'inline-block',
            background: data.colors.accent, color: data.colors.primary,
            padding: '9px 22px', borderRadius: '28px',
            fontSize: '11px', fontWeight: 800,
            boxShadow: `0 4px 16px ${data.colors.accent}55`,
            whiteSpace: 'nowrap',
          }}>
            <span dir="ltr" style={{ whiteSpace: 'nowrap' }}>{data.phone}</span>
          </div>
        )}
      </div>
    </div>
  );
}
