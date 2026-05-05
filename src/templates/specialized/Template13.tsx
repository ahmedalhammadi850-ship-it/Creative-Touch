import type { TemplateData } from '../../types/template';
interface Props { data: TemplateData; }

export default function SpecializedTemplate13({ data }: Props) {
  const { title, subtitle, description, phone, email, colors, image } = data;
  const grades = (description || '').split('،').map(s => s.trim()).filter(Boolean);

  return (
    <div id="template-preview" style={{
      width: 360, height: 460,
      background: colors.bg,
      position: 'relative', overflow: 'hidden',
      fontFamily: 'Cairo, sans-serif', direction: 'rtl',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Header stripe */}
      <div style={{
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        padding: '22px 22px 50px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Circles deco */}
        <div style={{ position: 'absolute', top: -40, left: -40, width: 130, height: 130, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'absolute', bottom: -30, right: -30, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />

        <div style={{
          display: 'inline-block',
          background: colors.accent, color: colors.primary,
          fontSize: 9, fontWeight: 900, letterSpacing: '0.1em',
          padding: '3px 12px', borderRadius: 20, marginBottom: 10,
        }}>
          📚 التسجيل مفتوح الآن
        </div>
        <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 900, margin: '0 0 4px', lineHeight: 1.3 }}>{title}</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, margin: 0, fontWeight: 600 }}>{subtitle}</p>
      </div>

      {/* Photo badge */}
      <div style={{
        position: 'absolute', top: 80, left: 20,
        width: 72, height: 72, borderRadius: 16,
        overflow: 'hidden', border: `3px solid ${colors.bg}`,
        boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
        background: `${colors.primary}44`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {image
          ? <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <span style={{ fontSize: 30 }}>🏫</span>}
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '14px 18px 0 18px', marginTop: 10 }}>
        {/* Grades */}
        <p style={{ color: colors.primary, fontSize: 11, fontWeight: 800, marginBottom: 8 }}>المراحل الدراسية المتاحة:</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
          {grades.map((g, i) => (
            <span key={i} style={{
              background: `${colors.primary}15`, color: colors.primary,
              border: `1px solid ${colors.primary}30`,
              borderRadius: 20, padding: '4px 12px',
              fontSize: 11, fontWeight: 700,
            }}>{g}</span>
          ))}
        </div>

        {/* CTA box */}
        <div style={{
          background: `linear-gradient(135deg, ${colors.primary}12, ${colors.accent}18)`,
          border: `1px solid ${colors.primary}25`,
          borderRadius: 14, padding: '12px 16px',
          marginBottom: 12,
        }}>
          <p style={{ color: colors.secondary, fontSize: 11, fontWeight: 700, margin: '0 0 5px' }}>
            🎯 لا تفوّت فرصة التسجيل!
          </p>
          <p style={{ color: '#555', fontSize: 10.5, lineHeight: 1.7, margin: 0 }}>
            سارع بتسجيل طفلك في بيئة تعليمية متكاملة تضمن له مستقبلاً مشرقاً وأسساً أكاديمية قوية
          </p>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        background: colors.primary, padding: '10px 18px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ color: colors.accent, fontSize: 11, fontWeight: 700 }}>📞 {phone}</span>
        <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10 }}>{email}</span>
      </div>
    </div>
  );
}
