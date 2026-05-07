import type { TemplateData } from '../../types/template';

export default function SpecializedTemplate7({ data }: { data: TemplateData }) {
  const services = (data.description || '').split('،').map(s => s.trim()).filter(Boolean);
  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div id="template-preview" style={{ width: '360px', height: '360px', position: 'relative', overflow: 'hidden', fontFamily: 'Cairo, sans-serif', direction: 'rtl', backgroundColor: data.colors.bg }}>
      {/* Top colored band */}
      <div style={{ height: '80px', background: `linear-gradient(135deg, ${data.colors.primary}, ${data.colors.secondary})`, position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: '-20px', right: '20px', width: '50px', height: '50px', borderRadius: '50%', background: data.colors.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.12)' }}>
          <span style={{ fontSize: '22px' }}>📚</span>
        </div>
        {/* Wavy bottom */}
        <svg style={{ position: 'absolute', bottom: '-1px', left: 0, width: '100%' }} height="22" viewBox="0 0 360 22" preserveAspectRatio="none">
          <path d="M0,10 Q45,0 90,10 Q135,20 180,10 Q225,0 270,10 Q315,20 360,10 L360,22 L0,22 Z" fill={data.colors.bg} />
        </svg>
      </div>

      <div style={{ position: 'relative', zIndex: 1, padding: '28px 22px 18px', display: 'flex', flexDirection: 'column', height: 'calc(100% - 80px)' }}>
        {/* Title area */}
        <div style={{ marginBottom: '14px' }}>
          <div style={{ color: data.colors.primary, fontSize: '22px', fontWeight: '900', lineHeight: 1.1 }}>{data.title}</div>
          <div style={{ color: data.colors.accent, fontSize: '11px', fontWeight: '700', marginTop: '2px' }}>{data.subtitle}</div>
        </div>

        {/* Courses/services list */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '7px' }}>
          {(services.length > 0 ? services : ['دورات مكثفة', 'مناهج معتمدة', 'شهادات دولية', 'مدربون متخصصون']).slice(0,4).map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 10px', borderRadius: '6px', background: i%2===0 ? `${data.colors.primary}0e` : `${data.colors.accent}0e` }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: i%2===0 ? `${data.colors.primary}22` : `${data.colors.accent}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', flexShrink: 0 }}>{['📖','✏️','🎓','💡'][i]}</div>
              <span style={{ color: data.colors.secondary, fontSize: '11px', fontWeight: '600' }}>{s}</span>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        {data.phone && (
          <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '10px', borderTop: `1px solid ${data.colors.primary}22`, paddingTop: '10px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ color: data.colors.primary, fontSize: '9px', opacity: 0.65 }}>سجّل الآن</div>
              <div style={{ color: data.colors.primary, fontSize: '14px', fontWeight: '800' }} dir="ltr">{data.phone}</div>
            </div>
            <div style={{ background: `linear-gradient(135deg, ${data.colors.primary}, ${data.colors.accent})`, borderRadius: '8px', padding: '8px 14px', color: '#fff', fontSize: '11px', fontWeight: '700', whiteSpace: 'nowrap' }}>ابدأ الآن</div>
          </div>
        )}
      </div>
    </div>
  );
}
