import type { TemplateData } from '../../types/template';

export default function Template17({ data }: { data: TemplateData }) {
  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div id="template-preview" style={{
      width: '280px', height: '400px',
      backgroundColor: data.colors.bg,
      direction: 'rtl',
      fontFamily: "'Georgia', 'Times New Roman', serif",
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '80px', pointerEvents: 'none' }} viewBox="0 0 280 80" preserveAspectRatio="xMidYMid slice">
        <ellipse cx="140" cy="-10" rx="120" ry="60" fill={data.colors.primary} opacity="0.14" />
        <ellipse cx="30" cy="22" rx="38" ry="16" fill={data.colors.primary} opacity="0.1" transform="rotate(-20 30 22)" />
        <ellipse cx="250" cy="16" rx="38" ry="16" fill={data.colors.secondary} opacity="0.1" transform="rotate(20 250 16)" />
        <ellipse cx="85" cy="4" rx="22" ry="9" fill={data.colors.accent} opacity="0.18" transform="rotate(-10 85 4)" />
        <ellipse cx="198" cy="4" rx="22" ry="9" fill={data.colors.accent} opacity="0.18" transform="rotate(10 198 4)" />
      </svg>
      <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '70px', pointerEvents: 'none' }} viewBox="0 0 280 70" preserveAspectRatio="xMidYMid slice">
        <ellipse cx="140" cy="80" rx="120" ry="55" fill={data.colors.primary} opacity="0.11" />
        <ellipse cx="40" cy="60" rx="38" ry="16" fill={data.colors.secondary} opacity="0.1" transform="rotate(20 40 60)" />
        <ellipse cx="242" cy="56" rx="38" ry="16" fill={data.colors.primary} opacity="0.1" transform="rotate(-20 242 56)" />
      </svg>

      <div style={{ position: 'absolute', inset: '10px', border: `1px solid ${data.colors.primary}44` }} />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 28px' }}>
        <div style={{ color: data.colors.primary, fontSize: `${15 + _d}px`, marginBottom: '10px', opacity: 0.55 }}>⁂</div>
        <div style={{ color: data.colors.primary, fontSize: `${7 + _d}px`, letterSpacing: '0.3em', marginBottom: '14px', opacity: 0.65 }}>دعوة زفاف</div>

        <div style={{ color: data.colors.secondary, fontSize: `${28 + _d}px`, fontWeight: 700, lineHeight: 1.25 }}>{data.title}</div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '10px 0', justifyContent: 'center' }}>
          <div style={{ flex: 1, height: '1px', background: `${data.colors.primary}66` }} />
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: data.colors.accent }} />
          <div style={{ flex: 1, height: '1px', background: `${data.colors.primary}66` }} />
        </div>

        <div style={{ color: data.colors.secondary, fontSize: `${28 + _d}px`, fontWeight: 700, lineHeight: 1.25, marginBottom: '16px' }}>{data.subtitle}</div>
        <div style={{ width: '38px', height: '2px', background: data.colors.accent, margin: '0 auto 14px', borderRadius: '1px' }} />
        <div style={{ color: data.colors.secondary, fontSize: `${9 + _d}px`, lineHeight: 1.95, opacity: 0.8 }}>{data.description}</div>
      </div>
    </div>
  );
}
