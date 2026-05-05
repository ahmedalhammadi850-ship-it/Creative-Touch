import type { TemplateData } from '../../types/template';
interface Props { data: TemplateData; }

export default function SpecializedTemplate24({ data }: Props) {
  const { title, subtitle, description, phone, email, website, colors, image, fontSize } = data;
  const fs = fontSize || 14;
  const features = (description || '').split('،').map(s => s.trim()).filter(Boolean);

  return (
    <div id="template-preview" style={{
      width: 360, height: 460,
      background: '#fdf8f0',
      position: 'relative', overflow: 'hidden',
      fontFamily: 'Cairo, sans-serif', direction: 'rtl',
    }}>
      {/* Floral corner decorations */}
      <div style={{
        position: 'absolute', top: -20, right: -20, width: 120, height: 120,
        background: 'radial-gradient(circle at 30% 30%, #d1fae5, #a7f3d0)',
        borderRadius: '50%', opacity: 0.5,
      }} />
      <div style={{
        position: 'absolute', top: -20, left: -20, width: 100, height: 100,
        background: 'radial-gradient(circle, #fde68a, #fcd34d)',
        borderRadius: '50%', opacity: 0.35,
      }} />
      <div style={{
        position: 'absolute', bottom: -30, left: -20, width: 140, height: 140,
        background: 'radial-gradient(circle at 60% 60%, #d1fae5, #6ee7b7)',
        borderRadius: '50%', opacity: 0.35,
      }} />
      <div style={{
        position: 'absolute', bottom: -20, right: -10, width: 90, height: 90,
        background: 'radial-gradient(circle, #fde68a, #fbbf24)',
        borderRadius: '50%', opacity: 0.3,
      }} />

      {/* Outer border frame */}
      <div style={{
        position: 'absolute', inset: 10,
        border: '1.5px solid rgba(16,185,129,0.25)',
        borderRadius: 20, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 14,
        border: '1px solid rgba(16,185,129,0.12)',
        borderRadius: 16, pointerEvents: 'none',
      }} />

      {/* Corner ornaments */}
      {['top:8,right:8','top:8,left:8','bottom:8,right:8','bottom:8,left:8'].map((pos, i) => {
        const s: Record<string, string | number> = { position: 'absolute', fontSize: 18, opacity: 0.4 };
        pos.split(',').forEach(p => { const [k,v] = p.split(':'); s[k] = parseInt(v); });
        return <span key={i} style={s}>🌿</span>;
      })}

      {/* Header */}
      <div style={{ position: 'relative', zIndex: 2, padding: '26px 24px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
        {/* Photo */}
        <div style={{
          width: 80, height: 90, borderRadius: 20, flexShrink: 0, overflow: 'hidden',
          border: '3px solid #10b981',
          boxShadow: '0 6px 20px rgba(16,185,129,0.25)',
          background: '#ecfdf5',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {image
            ? <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <span style={{ fontSize: 36 }}>👨‍🏫</span>}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            background: '#d1fae5', borderRadius: 20, padding: '3px 10px',
            color: '#065f46', fontSize: 9, fontWeight: 800, marginBottom: 5,
          }}>☪ مركز إسلامي متميز</div>
          <h1 style={{ color: '#065f46', fontSize: fs + 4, fontWeight: 900, margin: 0, lineHeight: 1.2 }}>{title}</h1>
          <p style={{ color: '#6b7280', fontSize: fs - 3, fontWeight: 600, margin: '4px 0 0' }}>{subtitle}</p>
        </div>
      </div>

      {/* Ornamental divider */}
      <div style={{ margin: '0 20px', height: 2, background: 'linear-gradient(to left, transparent, #10b981, #fbbf24, #10b981, transparent)', borderRadius: 2 }} />

      {/* Banner card */}
      <div style={{
        margin: '12px 20px',
        background: 'linear-gradient(135deg, #065f46 0%, #047857 50%, #10b981 100%)',
        borderRadius: 16, padding: '13px 16px',
        display: 'flex', alignItems: 'center', gap: 12,
        boxShadow: '0 6px 24px rgba(16,185,129,0.25)',
      }}>
        <span style={{ fontSize: 26 }}>📖</span>
        <div>
          <p style={{ color: '#fff', fontSize: fs, fontWeight: 900, margin: 0 }}>القيم والمعرفة</p>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: fs - 3, margin: '2px 0 0', direction: 'ltr', fontWeight: 600 }}>Values & Knowledge Memorization</p>
        </div>
      </div>

      {/* Features list */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {features.slice(0, 4).map((f, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 12, padding: '9px 14px',
              display: 'flex', alignItems: 'center', gap: 10,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              border: '1px solid #d1fae5',
            }}>
              <div style={{
                width: 30, height: 30, borderRadius: 10, flexShrink: 0,
                background: `${['#d1fae5','#fef9c3','#ecfdf5','#d1fae5'][i]}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15,
              }}>
                {['📿','🌙','🕌','✨'][i]}
              </div>
              <span style={{ color: '#1f2937', fontSize: fs - 3, fontWeight: 700 }}>{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: 'absolute', bottom: 16, left: 20, right: 20, zIndex: 2 }}>
        <div style={{
          background: '#065f46', borderRadius: 14, padding: '10px 16px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          {phone && <span style={{ color: '#6ee7b7', fontSize: fs - 2, fontWeight: 800 }}>📞 {phone}</span>}
          <span style={{ background: '#fbbf24', color: '#065f46', borderRadius: 10, padding: '6px 14px', fontSize: fs - 2, fontWeight: 900 }}>
            التسجيل مفتوح ←
          </span>
        </div>
      </div>
    </div>
  );
}
