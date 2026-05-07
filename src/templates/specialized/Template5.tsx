import type { TemplateData } from '../../types/template';

export default function SpecializedTemplate5({ data }: { data: TemplateData }) {
  const services = (data.description || '').split('،').map(s => s.trim()).filter(Boolean);
  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div id="template-preview" style={{ width: '360px', height: '360px', position: 'relative', overflow: 'hidden', fontFamily: 'Cairo, sans-serif', direction: 'rtl', backgroundColor: data.colors.bg }}>
      {/* Soft pastel top arc */}
      <div style={{ position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)', width: '300px', height: '200px', borderRadius: '50%', background: `radial-gradient(ellipse, ${data.colors.primary}35 0%, transparent 65%)` }} />

      {/* Sparkle accents */}
      {[[40,30],[300,50],[60,280],[310,300]].map(([x,y],i) => (
        <svg key={i} style={{ position: 'absolute', left: x, top: y }} width="12" height="12" viewBox="0 0 12 12">
          <path d="M6,0 L7,5 L12,6 L7,7 L6,12 L5,7 L0,6 L5,5 Z" fill={data.colors.accent} opacity="0.45" />
        </svg>
      ))}

      {/* Thin border frame */}
      <div style={{ position: 'absolute', inset: '8px', border: `1px solid ${data.colors.primary}22`, borderRadius: '8px', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '24px 20px', height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Logo area */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
          <div>
            <div style={{ color: data.colors.primary, fontSize: '22px', fontWeight: '900', lineHeight: 1.1 }}>{data.title}</div>
            <div style={{ color: data.colors.accent, fontSize: '11px', fontWeight: '700', marginTop: '2px' }}>{data.subtitle}</div>
          </div>
          <div style={{ width: '54px', height: '54px', borderRadius: '50%', background: `linear-gradient(135deg, ${data.colors.primary}33, ${data.colors.accent}44)`, border: `2px solid ${data.colors.primary}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>✂️</div>
        </div>

        {/* Pink divider */}
        <div style={{ height: '2px', background: `linear-gradient(to left, transparent, ${data.colors.primary}, ${data.colors.accent}, transparent)`, marginBottom: '14px' }} />

        {/* Services */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', flex: 1 }}>
          {(services.length > 0 ? services : ['قص وتصفيف', 'صبغ شعر', 'عناية بالبشرة', 'مانيكير']).slice(0,4).map((s, i) => (
            <div key={i} style={{ background: `${data.colors.primary}12`, borderRadius: '8px', padding: '8px 10px', border: `1px solid ${data.colors.primary}22`, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: data.colors.accent, flexShrink: 0 }} />
              <span style={{ color: data.colors.secondary, fontSize: '10px', fontWeight: '600' }}>{s}</span>
            </div>
          ))}
        </div>

        {/* Phone CTA */}
        {data.phone && (
          <div style={{ marginTop: '14px', background: `linear-gradient(135deg, ${data.colors.primary}, ${data.colors.accent})`, borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
            <div style={{ color: '#fff', fontSize: '13px', fontWeight: '800' }} dir="ltr">{data.phone}</div>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '9px', marginTop: '2px' }}>احجزي موعدك الآن</div>
          </div>
        )}
      </div>
    </div>
  );
}
