import type { TemplateData } from '../../types/template';
interface Props { data: TemplateData; }

export default function BusinessCardTemplate5({ data }: Props) {
  const { title, subtitle, phone, email, website, colors, image } = data;
  const ffs = data.fieldFontSizes ?? {};
  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div id="template-preview" style={{
      width: 340, height: 220, position: 'relative', overflow: 'hidden',
      fontFamily: 'Cairo, sans-serif', direction: 'rtl',
      background: colors.bg || '#0d0d0d', display: 'flex',
    }}>
      <div style={{ width: 6, background: `linear-gradient(to bottom, ${colors.accent}, ${colors.primary})`, flexShrink: 0 }} />

      <div style={{
        width: 120, flexShrink: 0, position: 'relative', overflow: 'hidden',
        background: `linear-gradient(135deg, ${colors.primary}44, ${colors.secondary}66)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {image ? (
          <img src={image} alt="صورة" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
        ) : (
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" style={{ opacity: 0.5 }}>
              <circle cx="22" cy="16" r="9" fill={colors.accent} fillOpacity="0.8" />
              <ellipse cx="22" cy="38" rx="16" ry="9" fill={colors.accent} fillOpacity="0.8" />
            </svg>
          </div>
        )}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          background: `linear-gradient(to left, ${colors.bg || '#0d0d0d'} 0%, transparent 50%)`,
        }} />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '18px 20px 18px 10px', gap: 5 }}>
        <div style={{ display: 'flex', gap: 4, marginBottom: 2 }}>
          {[0,1,2].map(i => <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: i === 0 ? colors.accent : `${colors.accent}44` }} />)}
        </div>

        <h1 style={{ color: '#ffffff', fontSize: (ffs.name ?? 22) + _d, fontWeight: 900, margin: 0, lineHeight: 1.0 }}>{title || 'أحمد محمد'}</h1>
        <p style={{ color: colors.accent, fontSize: (ffs.jobTitle ?? 11) + _d, fontWeight: 700, margin: 0 }}>{subtitle || 'مدير تنفيذي'}</p>

        <div style={{ height: 1, background: `linear-gradient(to left, ${colors.accent}55, transparent)`, margin: '4px 0' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {[
            { label: 'T', val: phone || '+966 50 000 0000' },
            { label: 'E', val: email || 'info@company.com' },
            { label: 'W', val: website || 'www.company.com' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ color: colors.accent, fontSize: 7, fontWeight: 800, width: 10, flexShrink: 0 }}>{item.label}</span>
              <p style={{ color: '#cccccc', fontSize: (ffs.contact ?? 9) + _d, margin: 0 }}>{item.val}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
