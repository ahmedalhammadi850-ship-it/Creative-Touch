import type { TemplateData } from '../../types/template';
interface Props { data: TemplateData; }

export default function SpecializedTemplate14({ data }: Props) {
  const { title, subtitle, description, phone, email, colors, image, fontSize } = data;
  const grades = (description || '').split('،').map(s => s.trim()).filter(Boolean);
  const fs = fontSize || 14;

  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div id="template-preview" style={{
      width: 360, height: 460,
      background: '#ffffff',
      position: 'relative', overflow: 'hidden',
      fontFamily: 'Cairo, sans-serif', direction: 'rtl',
    }}>
      {/* Right colored panel */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '52%', height: '100%',
        background: `linear-gradient(170deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
      }} />
      {/* Diagonal divider strip */}
      <div style={{
        position: 'absolute', top: 0, right: '48%',
        width: 60, height: '100%',
        background: `linear-gradient(170deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        clipPath: 'polygon(60% 0, 100% 0, 40% 100%, 0% 100%)',
      }} />

      {/* Deco circles on right */}
      <div style={{ position: 'absolute', top: -30, right: -30, width: 130, height: 130, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
      <div style={{ position: 'absolute', bottom: 40, right: 10, width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

      {/* Photo — on right panel */}
      <div style={{
        position: 'absolute', top: 28, right: 22,
        width: 96, height: 96, borderRadius: 20,
        overflow: 'hidden', zIndex: 3,
        border: `3px solid ${colors.accent}`,
        boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
        background: 'rgba(255,255,255,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {image
          ? <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <span style={{ fontSize: 40 + _d }}>🏫</span>}
      </div>

      {/* Badge */}
      <div style={{
        position: 'absolute', top: 138, right: 22, zIndex: 3,
        background: colors.accent, color: colors.primary,
        borderRadius: 20, padding: '4px 12px',
        fontSize: 10 + _d, fontWeight: 900,
        boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
      }}>
        ✅ مقاعد محدودة
      </div>

      {/* Left content — WHITE background guaranteed */}
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,
        zIndex: 4, padding: '24px 20px 18px 20px',
        display: 'flex', flexDirection: 'column',
        pointerEvents: 'none',
      }}>
        <div style={{ maxWidth: '48%' }}>
          {/* Label badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            background: colors.primary, color: '#fff',
            borderRadius: 20, padding: '3px 10px', marginBottom: 8,
            fontSize: 9 + _d, fontWeight: 900,
          }}>
            📝 باب التسجيل
          </div>

          {/* Title — always dark on white */}
          <h1 style={{
            color: '#1a1a2e', fontSize: fs + 5, fontWeight: 900,
            margin: '0 0 5px', lineHeight: 1.25,
          }}>{title}</h1>
          <p style={{
            color: '#444', fontSize: fs - 2, fontWeight: 600,
            margin: '0 0 14px', lineHeight: 1.6,
          }}>{subtitle}</p>

          {/* Grades list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {grades.slice(0, 4).map((g, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: colors.primary, flexShrink: 0 }} />
                <span style={{ color: '#333', fontSize: fs - 3, fontWeight: 700 }}>{g}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom urgency box */}
        <div style={{ marginTop: 'auto' }}>
          <div style={{
            background: `${colors.primary}14`,
            borderRight: `3px solid ${colors.primary}`,
            borderRadius: '4px 10px 10px 4px',
            padding: '9px 12px', marginBottom: 10,
          }}>
            <p style={{ color: '#1a1a2e', fontSize: fs - 3, fontWeight: 700, margin: 0, lineHeight: 1.7 }}>
              🌟 سجّل الآن وامنح طفلك تعليماً يليق بطموحاته
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{
              background: colors.primary, color: '#fff',
              borderRadius: 10, padding: '6px 13px',
              fontSize: fs - 3, fontWeight: 700,
            }}>📞 {phone}</span>
            <span style={{ color: '#666', fontSize: fs - 4 }}>{email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
