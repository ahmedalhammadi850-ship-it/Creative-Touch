import type { TemplateData } from '../../types/template';

export default function Template11({ data }: { data: TemplateData }) {
  const ffs = data.fieldFontSizes ?? {};
  return (
    <div id="template-preview" style={{ width: '340px', height: '220px', position: 'relative', overflow: 'hidden', fontFamily: "'Helvetica Neue', Arial, sans-serif", direction: 'rtl', backgroundColor: data.colors.bg }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '42%', height: '100%', background: `linear-gradient(180deg, ${data.colors.primary}, ${data.colors.secondary})` }} />
      <div style={{ position: 'absolute', top: 0, left: '38%', width: '10%', height: '100%', background: `linear-gradient(to right, ${data.colors.primary}, ${data.colors.bg})`, clipPath: 'polygon(0 0, 100% 0, 60% 100%, 0 100%)' }} />

      <div style={{ position: 'absolute', top: 0, left: 0, width: '42%', height: '100%', padding: '16px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 1 }}>
        <div style={{ width: '52px', height: '52px', borderRadius: '50%', border: `2px solid ${data.colors.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `${data.colors.accent}33` }} />
        </div>
        <div style={{ color: data.colors.accent, fontSize: ffs.company ?? 8, textAlign: 'center', letterSpacing: '0.1em', opacity: 0.9 }}>{data.description}</div>
      </div>

      <div style={{ position: 'absolute', top: 0, right: 0, width: '58%', height: '100%', padding: '16px 18px 16px 8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 1 }}>
        <div>
          <div style={{ color: data.colors.primary, fontSize: ffs.name ?? 22, fontWeight: '900', lineHeight: 1.1 }}>{data.title}</div>
          <div style={{ color: data.colors.secondary, fontSize: ffs.jobTitle ?? 11, marginTop: '3px', opacity: 0.7 }}>{data.subtitle}</div>
        </div>

        <div>
          <div style={{ width: '30px', height: '2px', background: data.colors.primary, marginBottom: '8px', opacity: 0.5 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }} dir="ltr">
            {data.phone && <span style={{ textAlign: 'right', color: data.colors.secondary, fontSize: ffs.contact ?? 9, opacity: 0.65 }}>{data.phone}</span>}
            {data.email && <span style={{ textAlign: 'right', color: data.colors.secondary, fontSize: ffs.contact ?? 9, opacity: 0.65 }}>{data.email}</span>}
            {data.website && <span style={{ textAlign: 'right', color: data.colors.secondary, fontSize: ffs.contact ?? 9, opacity: 0.65 }}>{data.website}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
