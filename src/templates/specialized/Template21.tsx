import type { TemplateData } from '../../types/template';
interface Props { data: TemplateData; }

export default function SpecializedTemplate21({ data }: Props) {
  const { title, subtitle, description, phone, email, colors, image, fontSize } = data;
  const fs = fontSize || 14;
  const features = (description || '').split('،').map(s => s.trim()).filter(Boolean);

  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div id="template-preview" style={{
      width: 360, height: 460,
      background: '#fff',
      position: 'relative', overflow: 'hidden',
      fontFamily: 'Cairo, sans-serif', direction: 'rtl',
    }}>
      {/* Full photo top half */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 200,
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%)',
        overflow: 'hidden',
      }}>
        {image && (
          <img src={image} alt="" style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', opacity: 0.35,
          }} />
        )}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(30,58,138,0.3) 0%, rgba(30,58,138,0.85) 100%)',
        }} />

        {/* Shield badge */}
        <div style={{
          position: 'absolute', top: 14, left: 14,
          background: 'rgba(255,255,255,0.15)',
          border: '1.5px solid rgba(255,255,255,0.4)',
          borderRadius: 10, padding: '5px 12px',
          color: '#fff', fontSize: 10 + _d, fontWeight: 800,
          display: 'flex', alignItems: 'center', gap: 5,
        }}>
          🛡 Academic Institute
        </div>

        {/* Year badge top right */}
        <div style={{
          position: 'absolute', top: 14, right: 14,
          background: '#f59e0b', color: '#1e3a8a',
          borderRadius: 8, padding: '4px 10px',
          fontSize: 10 + _d, fontWeight: 900,
        }}>منذ 2005</div>

        {/* School name */}
        <div style={{ position: 'absolute', bottom: 18, right: 14, left: 14 }}>
          <h1 style={{ color: '#fff', fontSize: fs + 6, fontWeight: 900, margin: 0, lineHeight: 1.2, textShadow: '0 2px 10px rgba(0,0,0,0.4)' }}>{title}</h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: fs - 2, margin: '4px 0 0', fontWeight: 600 }}>{subtitle}</p>
        </div>
      </div>

      {/* Accent stripe */}
      <div style={{ position: 'absolute', top: 200, left: 0, right: 0, height: 5,
        background: 'linear-gradient(to left, #f59e0b, #1d4ed8, #f59e0b)',
      }} />

      {/* Feature pills */}
      <div style={{ position: 'absolute', top: 218, left: 14, right: 14 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 12 }}>
          {features.slice(0, 5).map((f, i) => (
            <div key={i} style={{
              background: i === 0 ? '#1e3a8a' : i === 1 ? '#1d4ed8' : '#eff6ff',
              color: i < 2 ? '#fff' : '#1e3a8a',
              border: i < 2 ? 'none' : '1.5px solid #bfdbfe',
              borderRadius: 20, padding: '6px 14px',
              fontSize: fs - 3.5, fontWeight: 700,
              display: 'flex', alignItems: 'center', gap: 5,
            }}>
              <span>{'🏆🎓📖💡✅'[i]}</span> {f}
            </div>
          ))}
        </div>

        {/* Bilingual accent */}
        <div style={{
          background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
          border: '1.5px solid #bfdbfe',
          borderRadius: 14, padding: '10px 14px', marginBottom: 12,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <p style={{ color: '#1e3a8a', fontSize: fs, fontWeight: 900, margin: 0 }}>التميز الأكاديمي</p>
            <p style={{ color: '#1d4ed8', fontSize: fs - 3, margin: '2px 0 0', fontWeight: 600, direction: 'ltr', textAlign: 'right' }}>Academic Excellence</p>
          </div>
          <div style={{
            width: 44, height: 44, borderRadius: 14,
            background: '#1e3a8a', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22 + _d,
          }}>🎓</div>
        </div>

        {/* Contact footer */}
        <div style={{
          background: '#1e3a8a', borderRadius: 14, padding: '10px 16px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          {phone && <span style={{ color: '#93c5fd', fontSize: fs - 2, fontWeight: 800 }}>📞 {phone}</span>}
          <span style={{ background: '#f59e0b', color: '#1e3a8a', borderRadius: 10, padding: '6px 14px', fontSize: fs - 2, fontWeight: 900 }}>
            سجّل الآن ←
          </span>
        </div>
      </div>
    </div>
  );
}
