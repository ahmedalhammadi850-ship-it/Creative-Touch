import type { TemplateData } from '../../types/template';

export default function CongratsTemplate23({ data }: { data: TemplateData }) {
  const { title, subtitle, description, colors, image } = data;
  const lines = (description || '').split('\n').filter(Boolean);
  return (
    <div id="template-preview" style={{ width: '360px', height: '460px', position: 'relative', overflow: 'hidden', fontFamily: 'Cairo, sans-serif', direction: 'rtl', backgroundColor: colors.bg }}>
      {/* Top full-bleed photo */}
      <div style={{ height: '190px', position: 'relative', overflow: 'hidden', background: `linear-gradient(160deg, ${colors.primary}22, ${colors.secondary}33)` }}>
        {image
          ? <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px', background: `linear-gradient(160deg, ${colors.primary}22, ${colors.secondary}44)` }}>🥇</div>
        }
        {/* Gradient overlay */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: `linear-gradient(to top, ${colors.bg}, transparent)` }} />
      </div>

      {/* Gold name strip */}
      <div style={{ background: `linear-gradient(to left, ${colors.primary}, ${colors.secondary})`, padding: '10px 22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ color: '#ffffff', fontSize: '26px', fontWeight: '900', margin: 0, textAlign: 'center', lineHeight: 1.2, textShadow: '0 1px 6px rgba(0,0,0,0.25)' }}>{title}</h1>
      </div>

      {/* Subtitle */}
      <div style={{ textAlign: 'center', padding: '8px 20px 0', color: colors.secondary, fontSize: '11px', opacity: 0.75 }}>{subtitle}</div>

      {/* Divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '10px 22px' }}>
        <div style={{ flex: 1, height: '1px', background: `${colors.primary}44` }} />
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: colors.accent, opacity: 0.7 }} />
        <div style={{ flex: 1, height: '1px', background: `${colors.primary}44` }} />
      </div>

      {/* Body */}
      <div style={{ padding: '0 22px 16px', textAlign: 'center' }}>
        {lines.length > 0 ? lines.map((l, i) => (
          <p key={i} style={{ color: colors.secondary, fontSize: '11.5px', margin: '0 0 5px', lineHeight: 1.7 }}>{l}</p>
        )) : (
          <>
            <p style={{ color: colors.secondary, fontSize: '11.5px', margin: '0 0 5px', lineHeight: 1.7 }}>نهنئ الغالي</p>
            <p style={{ color: colors.primary, fontSize: '14px', fontWeight: '800', margin: '0 0 5px' }}>ألف مبروك</p>
            <p style={{ color: colors.secondary, fontSize: '11px', margin: 0, opacity: 0.7 }}>بارك الله في مسيرتك</p>
          </>
        )}
      </div>
    </div>
  );
}
