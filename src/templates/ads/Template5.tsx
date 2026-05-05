import type { TemplateData } from '../../types/template';

export default function Template5({ data }: { data: TemplateData }) {
  return (
    <div id="template-preview" style={{ width: '360px', height: '360px', position: 'relative', overflow: 'hidden', fontFamily: "'Helvetica Neue', Arial, sans-serif", direction: 'rtl', backgroundColor: data.colors.bg }}>
      {/* Diagonal split background */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '55%', background: `linear-gradient(145deg, ${data.colors.primary}, ${data.colors.secondary})` }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50%', background: data.colors.bg }} />
      {/* Diagonal separator */}
      <div style={{ position: 'absolute', top: '42%', left: 0, width: '100%', height: '80px', background: `linear-gradient(145deg, ${data.colors.primary} 49%, ${data.colors.bg} 51%)` }} />

      {/* Accent circles */}
      <div style={{ position: 'absolute', top: '-30px', left: '-30px', width: '140px', height: '140px', borderRadius: '50%', background: `${data.colors.accent}22` }} />
      <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', width: '100px', height: '100px', borderRadius: '50%', border: `2px dashed ${data.colors.primary}44` }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '28px 24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {/* Tag label */}
        <div style={{ display: 'inline-flex', alignSelf: 'flex-start', background: data.colors.accent, color: data.colors.primary, padding: '3px 12px', borderRadius: '2px', fontSize: '10px', fontWeight: '800', letterSpacing: '0.08em' }}>
          عرض محدود
        </div>

        {/* Main title */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#ffffff', fontSize: '32px', fontWeight: '900', lineHeight: 1.05, textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>{data.title}</div>
          <div style={{ color: data.colors.accent, fontSize: '15px', fontWeight: '700', marginTop: '4px' }}>{data.subtitle}</div>
        </div>

        {/* Bottom info card */}
        <div style={{ background: 'rgba(255,255,255,0.07)', border: `1px solid ${data.colors.primary}44`, borderRadius: '6px', padding: '12px 16px' }}>
          <div style={{ color: data.colors.secondary, fontSize: '11px', lineHeight: 1.6, marginBottom: '8px' }}>{data.description}</div>
          {data.phone && (
            <div style={{ display: 'inline-block', background: data.colors.accent, color: data.colors.bg, padding: '6px 18px', borderRadius: '4px', fontSize: '12px', fontWeight: '800' }} dir="ltr">{data.phone}</div>
          )}
        </div>
      </div>
    </div>
  );
}
