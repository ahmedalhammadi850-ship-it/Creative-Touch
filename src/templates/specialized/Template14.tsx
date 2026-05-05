import type { TemplateData } from '../../types/template';
interface Props { data: TemplateData; }

export default function SpecializedTemplate14({ data }: Props) {
  const { title, subtitle, description, phone, email, colors, image } = data;
  const grades = (description || '').split('،').map(s => s.trim()).filter(Boolean);

  return (
    <div id="template-preview" style={{
      width: 360, height: 460,
      background: colors.bg,
      position: 'relative', overflow: 'hidden',
      fontFamily: 'Cairo, sans-serif', direction: 'rtl',
    }}>
      {/* Full bleed diagonal split */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '55%', height: '100%',
        background: `linear-gradient(180deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)',
      }} />

      {/* Deco circles */}
      <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', zIndex: 1 }} />
      <div style={{ position: 'absolute', bottom: 60, right: 10, width: 80, height: 80, borderRadius: '50%', background: `${colors.accent}22`, zIndex: 1 }} />

      {/* Photo */}
      <div style={{
        position: 'absolute', top: 30, right: 28, zIndex: 2,
        width: 100, height: 100, borderRadius: 20,
        overflow: 'hidden',
        border: `3px solid ${colors.accent}`,
        boxShadow: '0 6px 24px rgba(0,0,0,0.25)',
        background: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {image
          ? <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <span style={{ fontSize: 44 }}>🏫</span>}
      </div>

      {/* Badge */}
      <div style={{
        position: 'absolute', top: 145, right: 28, zIndex: 2,
        background: colors.accent, color: colors.primary,
        borderRadius: 20, padding: '4px 14px',
        fontSize: 10, fontWeight: 900,
      }}>
        ✅ مقاعد محدودة
      </div>

      {/* Left content */}
      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 3, padding: '28px 18px 18px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
        <div style={{ maxWidth: '50%' }}>
          <p style={{ color: colors.primary, fontSize: 10, fontWeight: 800, margin: '0 0 6px', background: `${colors.primary}15`, display: 'inline-block', padding: '3px 10px', borderRadius: 20 }}>
            📝 باب التسجيل
          </p>
          <h1 style={{ color: colors.primary, fontSize: 19, fontWeight: 900, margin: '0 0 4px', lineHeight: 1.3 }}>{title}</h1>
          <p style={{ color: colors.secondary, fontSize: 10.5, margin: '0 0 12px', fontWeight: 600 }}>{subtitle}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {grades.slice(0, 4).map((g, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: colors.primary, flexShrink: 0 }} />
                <span style={{ color: '#444', fontSize: 10.5, fontWeight: 600 }}>{g}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom urgency */}
        <div style={{ marginTop: 'auto' }}>
          <div style={{
            background: `${colors.primary}12`,
            borderRight: `3px solid ${colors.primary}`,
            borderRadius: '0 10px 10px 0',
            padding: '10px 12px',
            marginBottom: 10,
          }}>
            <p style={{ color: colors.primary, fontSize: 10.5, fontWeight: 700, margin: 0, lineHeight: 1.7 }}>
              سجّل الآن وامنح طفلك تعليماً يليق بطموحاته 🌟
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ background: colors.primary, color: '#fff', borderRadius: 10, padding: '6px 14px', fontSize: 11, fontWeight: 700 }}>📞 {phone}</span>
            <span style={{ color: '#888', fontSize: 10 }}>{email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
