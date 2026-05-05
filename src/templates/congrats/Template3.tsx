import type { TemplateData } from '../../types/template';

interface Props { data: TemplateData; }

export default function CongratsTemplate3({ data }: Props) {
  const { title, subtitle, description, email, website, colors, image } = data;
  const lines = (description || '').split('\n').filter(Boolean);

  return (
    <div
      id="template-preview"
      style={{
        width: 360,
        height: 460,
        background: `linear-gradient(170deg, #e8d5b7 0%, #f5ebe0 40%, #dde8f5 100%)`,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Cairo, sans-serif',
        direction: 'rtl',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* String lights decoration */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 40, zIndex: 2, pointerEvents: 'none' }}>
        {/* Wire */}
        <svg width="360" height="40" viewBox="0 0 360 40" style={{ position: 'absolute', top: 0 }}>
          <path d="M0,8 Q90,20 180,8 Q270,20 360,8" stroke={colors.accent} strokeWidth="1.5" fill="none" opacity="0.6" />
          {[30, 75, 120, 165, 210, 255, 300, 340].map((x, i) => (
            <g key={i}>
              <line x1={x} y1={8} x2={x} y2={18} stroke={colors.accent} strokeWidth="1" opacity="0.5" />
              <ellipse cx={x} cy={22} rx="5" ry="7"
                fill={i % 3 === 0 ? colors.accent : i % 3 === 1 ? colors.primary : '#e74c3c'}
                opacity="0.8" />
            </g>
          ))}
        </svg>
      </div>

      {/* Main content */}
      <div style={{ display: 'flex', flex: 1, padding: '48px 16px 16px', gap: 12 }}>
        {/* Left text */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 8,
        }}>
          {/* Calligraphy title */}
          <div style={{
            background: colors.primary,
            color: colors.accent,
            borderRadius: 8,
            padding: '6px 12px',
            textAlign: 'center',
            fontSize: 14,
            fontWeight: 900,
            boxShadow: `0 3px 12px ${colors.primary}44`,
          }}>تهانينا</div>

          <p style={{
            color: '#555',
            fontSize: 11,
            margin: 0,
            lineHeight: 1.5,
          }}>لفخامة العريس الغالي</p>

          <h1 style={{
            color: colors.primary,
            fontSize: 22,
            fontWeight: 900,
            margin: '4px 0',
            lineHeight: 1.2,
          }}>{title || 'محمد'}</h1>

          <p style={{
            color: '#666',
            fontSize: 12,
            fontWeight: 600,
            margin: 0,
          }}>{subtitle || 'ابن الفاضل'}</p>

          <div style={{
            width: '70%', height: 1,
            background: `linear-gradient(to right, ${colors.primary}, transparent)`,
            margin: '4px 0',
          }} />

          <p style={{ color: '#555', fontSize: 11, margin: 0, lineHeight: 1.6 }}>
            {lines[0] || 'بمناسبة زفافه الميمون ودخوله القفص الذهبي'}
          </p>
          <p style={{ color: colors.primary, fontSize: 13, fontWeight: 700, margin: 0 }}>
            ألف مبروك
          </p>

          {/* From */}
          <div style={{
            background: colors.primary + '15',
            border: `1px solid ${colors.primary}33`,
            borderRadius: 6,
            padding: '4px 10px',
            marginTop: 4,
          }}>
            <p style={{ color: colors.primary, fontSize: 10, margin: 0, fontWeight: 600 }}>
              {email || 'تهنئة مقدمة من'}
            </p>
          </div>
        </div>

        {/* Right: Circle photo */}
        <div style={{
          width: 140,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          flexShrink: 0,
        }}>
          {/* Large circle frame */}
          <div style={{
            width: 128,
            height: 128,
            borderRadius: '50%',
            border: `4px solid ${colors.accent}`,
            boxShadow: `0 0 0 4px ${colors.primary}33, 0 8px 24px ${colors.primary}44`,
            overflow: 'hidden',
            position: 'relative',
            background: `linear-gradient(135deg, ${colors.primary}22, ${colors.accent}22)`,
          }}>
            {image ? (
              <img
                src={image}
                alt="صورة"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
              />
            ) : (
              <div style={{
                width: '100%', height: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', gap: 4,
              }}>
                <div style={{ fontSize: 40 }}>👤</div>
                <span style={{ color: `${colors.primary}88`, fontSize: 8, textAlign: 'center' }}>ارفع صورة</span>
              </div>
            )}
          </div>

          {/* Small circle frame (for second person if any) */}
          <div style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            border: `2px solid ${colors.primary}55`,
            overflow: 'hidden',
            background: `${colors.primary}11`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24,
          }}>
            💍
          </div>

          {website && (
            <p style={{ color: '#888', fontSize: 9, textAlign: 'center', margin: 0 }}>{website}</p>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        background: colors.primary,
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <p style={{ color: colors.accent, fontSize: 12, fontWeight: 700, margin: 0 }}>
          {lines[1] || 'ودامت أيامكم عامرة بالمسرات'}
        </p>
      </div>
    </div>
  );
}
