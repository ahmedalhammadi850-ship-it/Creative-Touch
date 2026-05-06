import type { TemplateData } from '../../types/template';
interface Props { data: TemplateData; }

export default function BusinessCardTemplate7({ data }: Props) {
  const { title, subtitle, phone, email, website, colors, image } = data;
  const ffs = data.fieldFontSizes ?? {};
  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div id="template-preview" style={{
      width: 340, height: 220, position: 'relative', overflow: 'hidden',
      fontFamily: 'Cairo, sans-serif', direction: 'rtl',
      background: `linear-gradient(135deg, ${colors.bg || '#1a0533'} 0%, ${colors.secondary} 100%)`,
    }}>
      <div style={{ position: 'absolute', top: -30, right: -30, width: 160, height: 160, borderRadius: '50%', background: `radial-gradient(circle, ${colors.primary}66 0%, ${colors.primary}22 55%, transparent 75%)`, zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: -20, left: -20, width: 130, height: 130, borderRadius: '50%', background: `radial-gradient(circle, ${colors.accent}44 0%, ${colors.accent}18 55%, transparent 75%)`, zIndex: 0 }} />

      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.12, pointerEvents: 'none' }} viewBox="0 0 340 220">
        {[40,80,120,160,200].map((y,i) => <line key={`h${i}`} x1="0" y1={y} x2="340" y2={y} stroke={colors.accent} strokeWidth="0.5"/>)}
        {[60,120,180,240,300].map((x,i) => <line key={`v${i}`} x1={x} y1="0" x2={x} y2="220" stroke={colors.accent} strokeWidth="0.5"/>)}
      </svg>

      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 300, height: 170,
        background: 'rgba(255,255,255,0.10)',
        border: '1px solid rgba(255,255,255,0.18)',
        borderRadius: 12,
        display: 'flex', alignItems: 'center',
        padding: '0 20px', gap: 16,
        zIndex: 2,
      }}>
        <div style={{
          width: 68, height: 68, borderRadius: '50%', flexShrink: 0,
          border: `2px solid ${colors.accent}`,
          boxShadow: `0 0 16px ${colors.accent}66`,
          overflow: 'hidden',
          background: `${colors.primary}66`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {image ? (
            <img src={image} alt="صورة" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
          ) : (
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
              <circle cx="19" cy="13" r="8" fill={colors.accent} fillOpacity="0.75" />
              <ellipse cx="19" cy="34" rx="14" ry="8" fill={colors.accent} fillOpacity="0.75" />
            </svg>
          )}
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: colors.accent, boxShadow: `0 0 10px ${colors.accent}`, marginBottom: 4 }} />
          <h1 style={{ color: '#ffffff', fontSize: (ffs.name ?? 20) + _d, fontWeight: 900, margin: 0, lineHeight: 1.0 }}>{title || 'أحمد محمد'}</h1>
          <p style={{ color: colors.accent, fontSize: (ffs.jobTitle ?? 10) + _d, margin: 0 }}>{subtitle || 'مطور برمجيات'}</p>
          <div style={{ height: 1, background: `linear-gradient(to left, transparent, ${colors.accent}66)`, margin: '3px 0' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[phone || '+966 50 000 0000', email || 'email@domain.com', website || 'website.com'].map((v,i) => (
              <p key={i} style={{ color: 'rgba(255,255,255,0.6)', fontSize: (ffs.contact ?? 8.5) + _d, margin: 0 }}>{v}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
