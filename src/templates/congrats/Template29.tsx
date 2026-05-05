import type { TemplateData } from '../../types/template';

interface Props { data: TemplateData; }

export default function CongratsTemplate29({ data }: Props) {
  const { title, subtitle, description, email, phone, website, colors, image, images } = data;

  const thaniaText = phone || 'تهانينا';
  const ihdaaText = website || 'إهداء';
  const extraLines = (images || []).filter(v => v !== undefined && !v.startsWith('data:image'));

  return (
    <div
      id="template-preview"
      style={{
        width: 280,
        height: 420,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Cairo', 'Amiri', 'Georgia', serif",
        direction: 'rtl',
        background: colors.bg,
      }}
    >
      {/* Full-bleed user photo */}
      {image ? (
        <img
          src={image}
          alt="صورة"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top center',
          }}
        />
      ) : (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(160deg, ${colors.bg} 0%, ${colors.secondary} 50%, ${colors.bg} 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 8,
        }}>
          <svg width="56" height="64" viewBox="0 0 56 64" fill="none">
            <ellipse cx="28" cy="18" rx="14" ry="16" fill={colors.primary} opacity="0.4" />
            <path d="M4 58 Q28 36 52 58" stroke={colors.primary} strokeWidth="2" fill={colors.primary} opacity="0.3" />
          </svg>
          <span style={{ color: `${colors.primary}99`, fontSize: 9, textAlign: 'center', padding: '0 16px' }}>
            ارفع صورة شخصية كاملة
          </span>
        </div>
      )}

      {/* Top gradient veil */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '52%',
        background: `linear-gradient(to bottom, ${colors.secondary}e0 0%, ${colors.secondary}99 40%, transparent 100%)`,
        pointerEvents: 'none',
      }} />

      {/* Bottom gradient veil */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '55%',
        background: `linear-gradient(to top, ${colors.secondary}f8 0%, ${colors.secondary}cc 40%, transparent 100%)`,
        pointerEvents: 'none',
      }} />

      {/* ── TOP SECTION ── */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: '14px 16px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        zIndex: 2,
      }}>
        <div style={{
          width: '75%',
          height: 1,
          background: `linear-gradient(to right, transparent, ${colors.primary}, transparent)`,
          marginBottom: 2,
        }} />

        {/* Event title */}
        <div style={{
          color: colors.accent,
          fontSize: 20,
          fontWeight: 900,
          textAlign: 'center',
          lineHeight: 1.25,
          textShadow: `0 2px 10px ${colors.secondary}cc, 0 0 20px ${colors.secondary}`,
          letterSpacing: '0.03em',
        }}>
          {title || 'أفراح الراعيني'}
        </div>

        {/* Divider ornament */}
        <svg width="80" height="8" viewBox="0 0 80 8">
          <path d="M0,4 Q10,0 20,4 Q30,8 40,4 Q50,0 60,4 Q70,8 80,4" stroke={colors.primary} strokeWidth="1.2" fill="none" opacity="0.8" />
          <circle cx="40" cy="4" r="2" fill={colors.primary} opacity="0.9" />
        </svg>

        {/* Person name */}
        <div style={{
          color: '#ffffff',
          fontSize: 12,
          fontWeight: 700,
          textAlign: 'center',
          textShadow: `0 1px 6px ${colors.secondary}`,
          letterSpacing: '0.05em',
          opacity: 0.92,
        }}>
          {subtitle || 'عبدالرحمن الرعيني'}
        </div>
      </div>

      {/* ── BOTTOM SECTION ── */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 0,
      }}>

        {/* Large calligraphic greeting — editable */}
        <div style={{
          color: colors.accent,
          fontSize: 34,
          fontWeight: 900,
          textAlign: 'center',
          lineHeight: 1,
          textShadow: `0 2px 16px ${colors.secondary}, 0 0 30px ${colors.secondary}`,
          marginBottom: 2,
          letterSpacing: '0.04em',
        }}>
          {thaniaText}
        </div>

        {/* Occasion line */}
        <div style={{
          color: '#ffffffdd',
          fontSize: 9.5,
          textAlign: 'center',
          lineHeight: 1.6,
          padding: '0 14px',
          textShadow: `0 1px 4px ${colors.secondary}`,
        }}>
          {description || 'بمناسبة الزفاف قالف الف مبروك'}
        </div>

        {/* Extra lines */}
        {extraLines.filter(Boolean).map((line, i) => (
          <div key={i} style={{
            color: '#ffffffcc',
            fontSize: 9,
            textAlign: 'center',
            lineHeight: 1.5,
            padding: '1px 14px 0',
            textShadow: `0 1px 4px ${colors.secondary}`,
          }}>
            {line}
          </div>
        ))}

        {/* إهداء ornament — editable */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          margin: '5px 0 4px',
        }}>
          <div style={{ width: 28, height: 1, background: `linear-gradient(to right, transparent, ${colors.primary})` }} />
          <div style={{
            color: colors.accent,
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textShadow: `0 1px 4px ${colors.secondary}`,
          }}>
            {ihdaaText}
          </div>
          <div style={{ width: 28, height: 1, background: `linear-gradient(to left, transparent, ${colors.primary})` }} />
        </div>

        {/* Footer bar — sender names */}
        <div style={{
          width: '100%',
          background: `${colors.primary}22`,
          borderTop: `1px solid ${colors.primary}55`,
          padding: '6px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}>
          <div style={{
            color: colors.accent,
            fontSize: 9,
            fontWeight: 700,
            textAlign: 'center',
            letterSpacing: '0.04em',
            textShadow: `0 1px 4px ${colors.secondary}`,
          }}>
            {email || 'عمار ياسر المصطرف - صلاح حسن الحيمي'}
          </div>
        </div>
      </div>

      {/* Subtle inner border */}
      <div style={{
        position: 'absolute',
        inset: 6,
        border: `1px solid ${colors.primary}33`,
        borderRadius: 2,
        pointerEvents: 'none',
        zIndex: 3,
      }} />
    </div>
  );
}
