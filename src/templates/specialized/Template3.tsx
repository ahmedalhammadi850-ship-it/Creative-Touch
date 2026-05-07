import type { TemplateData } from '../../types/template';

interface Props { data: TemplateData; }

export default function SpecializedTemplate3({ data }: Props) {
  const { title, subtitle, description, phone, colors } = data;
  const features = (description || '').split('،').map(s => s.trim()).filter(Boolean);
  const featureList = features.length >= 2 ? features : [
    'قاعات دراسية واسعة ومكيفة',
    'دوام الطلاب منفصل عن الطالبات',
    'أسعار مخففة وبالتقسيط',
  ];

  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div
      id="template-preview"
      style={{
        width: 360,
        height: 360,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Cairo, sans-serif',
        direction: 'rtl',
        background: `linear-gradient(160deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top row: year badge + circles */}
      <div style={{ display: 'flex', alignItems: 'flex-start', padding: '16px 16px 0', gap: 10 }}>
        {/* Year badge */}
        <div style={{
          background: colors.accent,
          borderRadius: 12,
          padding: '6px 12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minWidth: 56,
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        }}>
          <span style={{ color: colors.primary, fontSize: 18 + _d, fontWeight: 900, lineHeight: 1 }}>2025</span>
          <span style={{ color: colors.primary, fontSize: 8 + _d, fontWeight: 700 }}>للعام الدراسي</span>
        </div>

        {/* Title */}
        <div style={{ flex: 1 }}>
          <h2 style={{
            color: '#ffffff',
            fontSize: 20 + _d,
            fontWeight: 900,
            margin: 0,
            lineHeight: 1.3,
            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}>{title || 'مركز التعليمي'}</h2>
          <p style={{ color: '#ffffffcc', fontSize: 11 + _d, margin: '4px 0 0', fontWeight: 500 }}>
            {subtitle || 'نعلن عن بدء التسجيل'}
          </p>
        </div>
      </div>

      {/* Main content: photo circles + features */}
      <div style={{ display: 'flex', flex: 1, padding: '10px 16px', gap: 12 }}>
        {/* Features list */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
          {featureList.slice(0, 3).map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 20, height: 20,
                borderRadius: '50%',
                background: colors.accent,
                color: colors.primary,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 8 + _d, fontWeight: 900, flexShrink: 0,
              }}>0{i + 1}</div>
              <span style={{ color: '#fff', fontSize: 11 + _d, fontWeight: 600, lineHeight: 1.3 }}>{f}</span>
            </div>
          ))}
        </div>

        {/* Photo circles stack */}
        <div style={{ width: 150, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          {/* Large top circle */}
          <div style={{
            width: 110, height: 110,
            borderRadius: '50%',
            background: '#ffffff30',
            border: '3px solid #ffffff66',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 44 + _d,
          }}>👨‍🎓</div>

          {/* Small bottom circle */}
          <div style={{
            width: 64, height: 64,
            borderRadius: '50%',
            background: colors.accent + '33',
            border: `2px solid ${colors.accent}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24 + _d,
          }}>👩‍🎓</div>
        </div>
      </div>

      {/* Subjects grid */}
      <div style={{
        margin: '0 16px 10px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 6,
      }}>
        {['الرياضيات', 'العلوم', 'الإنجليزي', 'الفيزياء'].map((s, i) => (
          <div key={i} style={{
            background: '#ffffff30',
            borderRadius: 8,
            padding: '4px 8px',
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <span style={{ fontSize: 10 + _d, color: colors.accent }}>📚</span>
            <span style={{ color: '#fff', fontSize: 10 + _d, fontWeight: 700 }}>{s}</span>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{
        background: '#00000055',
        padding: '8px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ color: colors.accent, fontSize: 12 + _d, fontWeight: 700 }}>{phone || '07826560604'}</span>
        <button style={{
          background: colors.accent,
          color: colors.primary,
          border: 'none',
          borderRadius: 20,
          padding: '4px 14px',
          fontSize: 11 + _d,
          fontWeight: 900,
          cursor: 'pointer',
        }}>سجل الآن</button>
      </div>
    </div>
  );
}
