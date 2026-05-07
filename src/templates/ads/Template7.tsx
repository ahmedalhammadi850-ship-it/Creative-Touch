import type { TemplateData } from '../../types/template';

export default function Template7({ data }: { data: TemplateData }) {
  return (
    <div id="template-preview" style={{ width: '360px', height: '360px', position: 'relative', overflow: 'hidden', fontFamily: "'Helvetica Neue', Arial, sans-serif", direction: 'rtl', background: `linear-gradient(160deg, ${data.colors.bg} 0%, ${data.colors.primary}22 100%)` }}>
      {/* Large circle bg */}
      <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '300px', height: '300px', borderRadius: '50%', border: `1.5px solid ${data.colors.primary}22` }} />
      <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '220px', height: '220px', borderRadius: '50%', border: `1px solid ${data.colors.accent}33` }} />
      <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '200px', height: '200px', borderRadius: '50%', background: `${data.colors.primary}12` }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '30px 28px', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', textAlign: 'center' }}>
        {/* Stars rating */}
        <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', color: data.colors.accent, fontSize: '16px' }}>
          {[0,1,2,3,4].map(i => <span key={i}>★</span>)}
        </div>

        {/* Main content */}
        <div>
          <div style={{ color: data.colors.primary, fontSize: '13px', fontWeight: '600', marginBottom: '8px', opacity: 0.7 }}>{data.subtitle}</div>
          <div style={{ color: data.colors.primary, fontSize: '30px', fontWeight: '900', lineHeight: 1.1, marginBottom: '10px' }}>{data.title}</div>
          <div style={{ width: '60px', height: '3px', background: `linear-gradient(to left, ${data.colors.accent}, ${data.colors.primary})`, borderRadius: '2px', margin: '0 auto 12px' }} />
          <div style={{ color: data.colors.secondary, fontSize: '12px', lineHeight: 1.7, maxWidth: '260px', opacity: 0.8 }}>{data.description}</div>
        </div>

        {/* CTA button */}
        {data.phone && (
          <div style={{ background: `linear-gradient(135deg, ${data.colors.primary}, ${data.colors.secondary})`, color: '#ffffff', padding: '10px 28px', borderRadius: '30px', fontSize: '13px', fontWeight: '800', boxShadow: `0 4px 16px ${data.colors.primary}44`, whiteSpace: 'nowrap' }} dir="ltr">
            {data.phone}
          </div>
        )}
      </div>
    </div>
  );
}
