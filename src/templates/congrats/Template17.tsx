import type { TemplateData } from '../../types/template';

interface Props { data: TemplateData; }

export default function CongratsTemplate17({ data }: Props) {
  const { title, subtitle, description, email, website, colors, image } = data;
  const lines = (description || '').split('\n').filter(Boolean);

  return (
    <div
      id="template-preview"
      style={{
        width: 360,
        height: 460,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Cairo, sans-serif',
        direction: 'rtl',
        background: colors.bg || '#0a0a0f',
      }}
    >
      {/* Gradient mesh background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <div style={{
          position: 'absolute', top: -60, right: -60,
          width: 300, height: 300, borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.primary}77 0%, ${colors.primary}33 45%, transparent 70%)`,
        }} />
        <div style={{
          position: 'absolute', bottom: -40, left: -40,
          width: 260, height: 260, borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.secondary}66 0%, ${colors.secondary}22 45%, transparent 70%)`,
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 220, height: 220, borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.accent}22 0%, transparent 70%)`,
        }} />
      </div>

      {/* Background photo with overlay */}
      {image && (
        <>
          <img src={image} alt="صورة" style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'top center',
            zIndex: 0, opacity: 0.25,
          }} />
        </>
      )}

      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, transparent, ${colors.accent}, ${colors.primary}, transparent)`,
        zIndex: 2,
      }} />

      {/* Glass card center */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        zIndex: 3,
        background: 'rgba(255,255,255,0.10)',
        border: '1px solid rgba(255,255,255,0.16)',
        borderRadius: 16,
        padding: '28px 28px 24px',
        textAlign: 'center',
      }}>
        {/* Glowing dot */}
        <div style={{
          width: 8, height: 8, borderRadius: '50%',
          background: colors.accent,
          boxShadow: `0 0 12px 4px ${colors.accent}88`,
          margin: '0 auto 14px',
        }} />

        <p style={{ color: `${colors.accent}cc`, fontSize: 10, margin: '0 0 8px', letterSpacing: 3, fontWeight: 600 }}>
          ✦ بطاقة تهنئة ✦
        </p>

        {/* Photo circle */}
        {image ? (
          <div style={{
            width: 90, height: 90, borderRadius: '50%',
            overflow: 'hidden', margin: '0 auto 14px',
            border: `2px solid ${colors.accent}`,
            boxShadow: `0 0 20px ${colors.accent}55`,
          }}>
            <img src={image} alt="صورة"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
          </div>
        ) : (
          <div style={{
            width: 90, height: 90, borderRadius: '50%',
            background: `linear-gradient(135deg, ${colors.primary}66, ${colors.secondary}66)`,
            border: `2px solid ${colors.accent}66`,
            margin: '0 auto 14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 36,
          }}>👤</div>
        )}

        <h1 style={{
          color: '#ffffff',
          fontSize: 32, fontWeight: 900,
          margin: '0 0 6px', lineHeight: 1.0,
        }}>{title || 'محمد'}</h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', margin: '8px 0' }}>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${colors.accent})` }} />
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: colors.accent }} />
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${colors.accent})` }} />
        </div>

        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11, margin: '0 0 10px', lineHeight: 1.5 }}>
          {subtitle || 'يتشرف الوالد بالدعوة الكريمة'}
        </p>

        <div style={{
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
          borderRadius: 8,
          padding: '6px 16px',
          margin: '8px 0',
        }}>
          <p style={{ color: colors.accent, fontSize: 12, fontWeight: 800, margin: 0 }}>
            {lines[0] || 'المقيل والزفة والسمرة'}
          </p>
        </div>

        <p style={{ color: colors.accent, fontSize: 16, fontWeight: 900, margin: '8px 0 4px' }}>
          {lines[1] || '28 - 7 - 2025'}
        </p>

        {website && (
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 9, margin: 0 }}>📍 {website}</p>
        )}
        {email && (
          <p style={{ color: `${colors.accent}99`, fontSize: 9, margin: '4px 0 0', fontWeight: 600 }}>{email}</p>
        )}
      </div>

      {/* Bottom accent line */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, transparent, ${colors.secondary}, ${colors.accent}, transparent)`,
        zIndex: 2,
      }} />
    </div>
  );
}
