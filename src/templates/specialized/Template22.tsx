import type { TemplateData } from '../../types/template';
interface Props { data: TemplateData; }

const LANG_PILLS = ['EN','AR','FR','ES','DE','中'];
const PILL_COLORS = ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#ec4899'];

export default function SpecializedTemplate22({ data }: Props) {
  const { title, subtitle, description, phone, email, website, colors, image, fontSize } = data;
  const fs = fontSize || 14;
  const features = (description || '').split('،').map(s => s.trim()).filter(Boolean);

  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div id="template-preview" style={{
      width: 360, height: 460,
      background: '#ffffff',
      position: 'relative', overflow: 'hidden',
      fontFamily: 'Cairo, sans-serif', direction: 'rtl',
    }}>
      {/* Background globe deco */}
      <div style={{
        position: 'absolute', top: -40, left: -40, width: 220, height: 220,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 40% 40%, #eff6ff, #dbeafe)',
        border: '2px solid #bfdbfe',
        opacity: 0.6,
      }} />
      <div style={{
        position: 'absolute', bottom: 60, right: -60, width: 200, height: 200,
        borderRadius: '50%',
        background: 'radial-gradient(circle, #f0fdf4, #dcfce7)',
        border: '2px solid #bbf7d0',
        opacity: 0.5,
      }} />

      {/* Top header bar */}
      <div style={{
        position: 'relative', padding: '16px 16px 14px',
        borderBottom: '2px solid #f1f5f9', zIndex: 2,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            background: '#eff6ff', borderRadius: 20, padding: '3px 12px',
            color: '#1d4ed8', fontSize: 10 + _d, fontWeight: 800, marginBottom: 6,
          }}>🌐 Language Academy</div>
          <h1 style={{ color: '#1e293b', fontSize: fs + 4, fontWeight: 900, margin: 0, lineHeight: 1.2 }}>{title}</h1>
          <p style={{ color: '#64748b', fontSize: fs - 3, fontWeight: 600, margin: '4px 0 0' }}>{subtitle}</p>
        </div>

        {/* Photo */}
        <div style={{
          width: 76, height: 90, borderRadius: 20, flexShrink: 0,
          overflow: 'hidden', marginRight: 10,
          border: '3px solid #3b82f6',
          boxShadow: '0 6px 20px rgba(59,130,246,0.25)',
          background: '#eff6ff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {image
            ? <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <span style={{ fontSize: 34 + _d }}>👩‍🏫</span>}
        </div>
      </div>

      {/* Language pills row */}
      <div style={{ padding: '12px 16px 10px', zIndex: 2, position: 'relative' }}>
        <p style={{ color: '#64748b', fontSize: fs - 3, fontWeight: 700, margin: '0 0 8px' }}>اللغات المتاحة:</p>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          {LANG_PILLS.map((lang, i) => (
            <div key={i} style={{
              background: PILL_COLORS[i], color: '#fff',
              borderRadius: 10, padding: '5px 12px',
              fontSize: fs - 2, fontWeight: 900,
              boxShadow: `0 3px 10px ${PILL_COLORS[i]}44`,
            }}>{lang}</div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 2, margin: '0 16px', background: 'linear-gradient(to left, transparent, #3b82f6, transparent)', borderRadius: 2 }} />

      {/* Tagline */}
      <div style={{ padding: '12px 16px', zIndex: 2, position: 'relative' }}>
        <div style={{
          background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
          borderRadius: 16, padding: '13px 16px', textAlign: 'center',
          boxShadow: '0 6px 24px rgba(29,78,216,0.25)',
        }}>
          <p style={{ color: '#fff', fontSize: fs + 1, fontWeight: 900, margin: '0 0 3px', lineHeight: 1.3 }}>
            🌍 تواصل مع العالم
          </p>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: fs - 3, margin: 0, direction: 'ltr' }}>
            Connect with the World
          </p>
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: '0 16px', zIndex: 2, position: 'relative' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {features.slice(0, 3).map((f, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: '#f8fafc', borderRadius: 12, padding: '8px 12px',
              border: '1px solid #e2e8f0',
            }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: PILL_COLORS[i], flexShrink: 0 }} />
              <span style={{ color: '#1e293b', fontSize: fs - 3, fontWeight: 700 }}>{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: 'absolute', bottom: 14, left: 14, right: 14, zIndex: 2 }}>
        <div style={{
          background: '#1e293b', borderRadius: 14, padding: '10px 16px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            {phone && <p style={{ color: '#60a5fa', fontSize: fs - 2, fontWeight: 800, margin: 0 }}>📞 {phone}</p>}
            {website && <p style={{ color: '#94a3b8', fontSize: fs - 4, margin: '2px 0 0' }}>🌐 {website}</p>}
          </div>
          <span style={{ background: '#3b82f6', color: '#fff', borderRadius: 10, padding: '6px 14px', fontSize: fs - 2, fontWeight: 900 }}>
            التحق الآن ←
          </span>
        </div>
      </div>
    </div>
  );
}
