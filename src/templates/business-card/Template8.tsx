import type { TemplateData } from '../../types/template';
interface Props { data: TemplateData; }

export default function BusinessCardTemplate8({ data }: Props) {
  const { title, subtitle, phone, email, website, colors, image } = data;
  const ffs = data.fieldFontSizes ?? {};
  const _d = (data.fontSize ?? 16) - 16;
  return (
    <div id="template-preview" style={{
      width: 340, height: 220, position: 'relative', overflow: 'hidden',
      fontFamily: 'Cairo, sans-serif', direction: 'rtl',
      background: colors.bg || '#f5f5f5', display: 'flex',
    }}>
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, width: 195,
        background: `linear-gradient(160deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)',
        zIndex: 0,
      }} />

      <div style={{
        position: 'absolute', top: 0, right: 175, bottom: 0, width: 14,
        background: colors.accent,
        clipPath: 'polygon(70% 0%, 100% 0%, 30% 100%, 0% 100%)',
        zIndex: 1, opacity: 0.9,
      }} />

      <div style={{
        width: 175, flexShrink: 0, zIndex: 2,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '16px 14px 16px 20px', gap: 5,
      }}>
        <h1 style={{ color: colors.primary, fontSize: (ffs.name ?? 19) + _d, fontWeight: 900, margin: 0, lineHeight: 1.1 }}>{title || 'أحمد محمد'}</h1>
        <p style={{ color: colors.secondary, fontSize: (ffs.jobTitle ?? 10) + _d, fontWeight: 700, margin: 0 }}>{subtitle || 'مدير مبيعات'}</p>
        <div style={{ width: 30, height: 2, background: colors.accent, borderRadius: 1 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 2 }}>
          {[
            phone || '+966 50 000 0000',
            email || 'email@domain.com',
            website || 'www.domain.com',
          ].map((v, i) => (
            <p key={i} style={{ color: '#555', fontSize: (ffs.contact ?? 8.5) + _d, margin: 0 }}>{v}</p>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          width: 82, height: 82, borderRadius: '50%',
          border: `3px solid ${colors.accent}`,
          overflow: 'hidden',
          background: 'rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 4px 20px rgba(0,0,0,0.2)`,
        }}>
          {image ? (
            <img src={image} alt="صورة" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
          ) : (
            <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
              <circle cx="23" cy="16" r="9" fill="rgba(255,255,255,0.5)" />
              <ellipse cx="23" cy="39" rx="16" ry="9" fill="rgba(255,255,255,0.5)" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
