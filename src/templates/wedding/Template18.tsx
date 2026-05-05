import type { TemplateData } from '../../types/template';

export default function Template18({ data }: { data: TemplateData }) {
  return (
    <div id="template-preview" style={{
      width: '280px', height: '400px',
      backgroundColor: '#0a1020',
      direction: 'rtl',
      fontFamily: "'Georgia', 'Times New Roman', serif",
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Damask overlay */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06, pointerEvents: 'none' }}>
        <defs>
          <pattern id="w18-damask" width="36" height="36" patternUnits="userSpaceOnUse">
            <circle cx="18" cy="18" r="6" fill={data.colors.accent} />
            <path d="M18,0 L20,12 L32,12 L22,20 L26,32 L18,24 L10,32 L14,20 L4,12 L16,12 Z" fill={data.colors.accent} opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#w18-damask)" />
      </svg>

      {/* Gold borders */}
      <div style={{ position: 'absolute', inset: '6px', border: `1px solid ${data.colors.accent}55`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: '10px', border: `0.5px solid ${data.colors.accent}22`, pointerEvents: 'none' }} />

      {/* Corner stars */}
      {[
        { top: '4px', right: '4px' },
        { top: '4px', left: '4px' },
        { bottom: '4px', right: '4px' },
        { bottom: '4px', left: '4px' },
      ].map((pos, i) => (
        <svg key={i} style={{ position: 'absolute', ...pos }} width="12" height="12" viewBox="0 0 12 12">
          <path d="M6,0 L7,4 L12,6 L7,8 L6,12 L5,8 L0,6 L5,4 Z" fill={data.colors.accent} opacity="0.8" />
        </svg>
      ))}

      {/* Glow center */}
      <div style={{ position: 'absolute', top: '42%', left: '50%', transform: 'translate(-50%,-50%)', width: 180, height: 180, borderRadius: '50%', background: `radial-gradient(circle, ${data.colors.primary}44 0%, transparent 65%)`, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 28px' }}>
        <div style={{ color: data.colors.accent, fontSize: '7px', letterSpacing: '0.32em', marginBottom: '16px', opacity: 0.75, fontFamily: 'serif' }}>دعوة زفاف ملكية</div>
        <div style={{ color: data.colors.accent, fontSize: '30px', fontWeight: 700, lineHeight: 1.2, textShadow: `0 0 16px ${data.colors.accent}88` }}>{data.title}</div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '10px 0', justifyContent: 'center' }}>
          <div style={{ flex: 1, height: '0.5px', background: `linear-gradient(to left, ${data.colors.accent}88, transparent)` }} />
          <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6,0 L7,4 L12,6 L7,8 L6,12 L5,8 L0,6 L5,4 Z" fill={data.colors.accent} /></svg>
          <div style={{ flex: 1, height: '0.5px', background: `linear-gradient(to right, ${data.colors.accent}88, transparent)` }} />
        </div>

        <div style={{ color: data.colors.accent, fontSize: '30px', fontWeight: 700, lineHeight: 1.2, textShadow: `0 0 16px ${data.colors.accent}88`, marginBottom: '16px' }}>{data.subtitle}</div>
        <div style={{ width: '36px', height: '1px', background: data.colors.accent, margin: '0 auto 12px', opacity: 0.7 }} />
        <div style={{ color: `${data.colors.accent}aa`, fontSize: '9px', lineHeight: 2, letterSpacing: '0.03em' }}>{data.description}</div>
      </div>
    </div>
  );
}
