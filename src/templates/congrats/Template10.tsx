import type { TemplateData } from '../../types/template';

interface Props { data: TemplateData; }

export default function CongratsTemplate10({ data }: Props) {
  const { title, subtitle, description, email, website, colors, image } = data;
  const lines = (description || '').split('\n').filter(Boolean);

  const _d = (data.fontSize ?? 21) - 21;
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
        display: 'flex',
        background: colors.bg || '#0e2b1e',
      }}
    >
      {/* Photo — full left half */}
      <div style={{
        width: 170,
        height: '100%',
        position: 'relative',
        flexShrink: 0,
        overflow: 'hidden',
      }}>
        {image ? (
          <img src={image} alt="صورة"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            background: `linear-gradient(180deg, ${colors.primary}44 0%, ${colors.bg || '#0e2b1e'} 100%)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8,
          }}>
            <div style={{ fontSize: 64 + _d, opacity: 0.5 }}>👤</div>
            <span style={{ color: '#ffffff55', fontSize: 10 + _d }}>ارفع صورة</span>
          </div>
        )}
        {/* Gradient fade to right */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          background: `linear-gradient(to left, ${colors.bg || '#0e2b1e'} 0%, transparent 40%)`,
        }} />
        {/* WEDDING badge */}
        <div style={{
          position: 'absolute', top: 18, right: 0, left: 0,
          textAlign: 'center',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <p style={{ color: '#ffffff', fontSize: 10 + _d, fontWeight: 700, margin: 0, letterSpacing: 3 }}>WEDDING</p>
            <p style={{ color: colors.accent, fontSize: 14 + _d, fontWeight: 900, margin: 0 }}>{title || 'باسم'}</p>
          </div>
        </div>
        {/* Stars decoration */}
        {[1,2,3,4,5].map(i => (
          <div key={i} style={{
            position: 'absolute', top: 52, left: `${10 + i * 16}%`,
            color: colors.accent, fontSize: 8 + _d, opacity: 0.7,
          }}>★</div>
        ))}
      </div>

      {/* Right text panel */}
      <div style={{
        flex: 1,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '20px 18px 20px 10px',
        gap: 7,
        position: 'relative',
        zIndex: 1,
      }}>
        {/* SVG small decorations */}
        <svg style={{ position: 'absolute', top: 10, right: 10, width: 40, height: 40, pointerEvents: 'none' }} viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="18" fill="none" stroke={colors.accent} strokeWidth="0.8" opacity="0.5"/>
          <path d="M20,8 Q24,14 20,20 Q16,14 20,8 Z" fill={colors.accent} opacity="0.6"/>
        </svg>

        <p style={{ color: colors.accent, fontSize: 9 + _d, margin: 0, letterSpacing: 1, opacity: 0.8 }}>بمناسبة زفاف الفاخر</p>

        <h1 style={{
          color: colors.accent,
          fontSize: 30 + _d, fontWeight: 900,
          margin: '2px 0', lineHeight: 1.0,
          textShadow: `0 0 20px ${colors.accent}66`,
        }}>{title || 'باسم'}</h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ width: 20, height: 2, background: colors.accent }} />
          <div style={{ width: 6, height: 2, background: `${colors.accent}55` }} />
        </div>

        <div style={{
          background: `${colors.primary}aa`,
          borderRadius: 3,
          padding: '3px 10px',
          borderRight: `3px solid ${colors.accent}`,
          display: 'inline-block',
        }}>
          <p style={{ color: '#ffffff', fontSize: 9 + _d, margin: 0 }}>يتشرف</p>
          <p style={{ color: '#ffffffee', fontSize: 11 + _d, fontWeight: 700, margin: 0, lineHeight: 1.3 }}>
            {subtitle || 'الشيخ عبدالسلام أحمد حمود'}
          </p>
        </div>

        <p style={{ color: '#ffffffaa', fontSize: 10 + _d, margin: 0 }}>بدعوتكم لحضور</p>

        <div style={{
          background: colors.accent,
          padding: '4px 12px',
          borderRadius: 2,
          display: 'inline-block',
          width: 'fit-content',
        }}>
          <span style={{ color: colors.primary, fontSize: 11 + _d, fontWeight: 900 }}>
            {lines[0] || 'المقيل والزفة والسمرة'}
          </span>
        </div>

        <p style={{ color: '#888', fontSize: 10 + _d, margin: 0 }}>
          {lines[1] || 'في قاعة آية - شارع مالك دوحة آية'}
        </p>

        <p style={{ color: '#ffffffcc', fontSize: 11 + _d, fontWeight: 600, margin: 0 }}>
          {lines[2] || 'يوم الأربعاء'}
        </p>
        <p style={{ color: colors.accent, fontSize: 20 + _d, fontWeight: 900, margin: '0 0 2px', lineHeight: 1.0 }}>
          {lines[3] || '28-7-2021'}
        </p>

        {website && (
          <p style={{ color: '#777', fontSize: 9 + _d, margin: 0 }}>📍 {website}</p>
        )}
        {email && (
          <p style={{ color: colors.accent, fontSize: 9 + _d, fontWeight: 600, margin: '2px 0 0' }}>{email}</p>
        )}
      </div>
    </div>
  );
}
