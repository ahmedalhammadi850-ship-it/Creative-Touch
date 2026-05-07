import type { TemplateData } from '../../types/template';

interface Props { data: TemplateData; }

export default function CongratsTemplate25({ data }: Props) {
  const { title, subtitle, description, email, colors, image } = data;
  const lines = (description || '').split('\n').filter(Boolean);

  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div id="template-preview" style={{
      width: 360, height: 460,
      background: colors.bg,
      position: 'relative', overflow: 'hidden',
      fontFamily: "'Cairo', sans-serif", direction: 'rtl',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ height: '4px', background: `linear-gradient(to left, ${colors.accent}, ${colors.primary}, ${colors.secondary}, ${colors.primary}, ${colors.accent})` }} />
      <div style={{ position: 'absolute', inset: '8px', border: `0.5px solid ${colors.primary}33`, pointerEvents: 'none' }} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
          <div style={{
            width: '78px', height: '78px', borderRadius: '50%', flexShrink: 0,
            border: `2px solid ${colors.primary}`,
            overflow: 'hidden', background: `${colors.primary}12`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {image
              ? <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
              : <span style={{ fontSize: `${26 + _d}px`, opacity: 0.38 }}>👤</span>
            }
          </div>
          <div>
            <div style={{ color: colors.secondary, fontSize: `${7 + _d}px`, letterSpacing: '0.25em', marginBottom: '4px', opacity: 0.55 }}>تهنئة بمناسبة</div>
            <div style={{ color: colors.primary, fontSize: `${24 + _d}px`, fontWeight: 900, lineHeight: 1.15 }}>{title}</div>
            <div style={{ width: '28px', height: '2px', background: colors.accent, marginTop: '5px', borderRadius: '1px' }} />
          </div>
        </div>

        <div style={{ height: '1px', background: `linear-gradient(to left, transparent, ${colors.primary}44, transparent)`, marginBottom: '13px' }} />
        <div style={{ color: colors.secondary, fontSize: `${11 + _d}px`, fontWeight: 600, marginBottom: '10px', opacity: 0.78 }}>{subtitle}</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          {lines.map((line, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: colors.accent, marginTop: '5px', flexShrink: 0 }} />
              <span style={{ color: colors.secondary, fontSize: `${10.5 + _d}px`, lineHeight: 1.6, opacity: 0.85 }}>{line}</span>
            </div>
          ))}
        </div>

        {email && (
          <div style={{
            marginTop: '14px', padding: '8px 14px',
            background: `${colors.primary}10`,
            borderRight: `3px solid ${colors.accent}`,
            borderRadius: '0 8px 8px 0',
          }}>
            <span style={{ color: colors.primary, fontSize: `${10 + _d}px`, fontWeight: 700 }}>{email}</span>
          </div>
        )}
      </div>

      <div style={{ height: '4px', background: `linear-gradient(to right, ${colors.accent}, ${colors.primary}, ${colors.secondary}, ${colors.primary}, ${colors.accent})` }} />
    </div>
  );
}
