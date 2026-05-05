import type { TemplateData } from '../../types/template';
interface Props { data: TemplateData; }

export default function SpecializedTemplate20({ data }: Props) {
  const { title, subtitle, description, phone, email, colors, image, fontSize } = data;
  const fs = fontSize || 14;
  const features = (description || '').split('،').map(s => s.trim()).filter(Boolean);

  return (
    <div id="template-preview" style={{
      width: 360, height: 460,
      background: '#f0fbff',
      position: 'relative', overflow: 'hidden',
      fontFamily: 'Cairo, sans-serif', direction: 'rtl',
    }}>
      {/* Teal diagonal top banner */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 220,
        background: 'linear-gradient(145deg, #0891b2 0%, #0e7490 60%, #164e63 100%)',
      }} />

      {/* White diamond shape overlay */}
      <div style={{
        position: 'absolute', top: 90, left: -40,
        width: 220, height: 220,
        background: 'rgba(255,255,255,0.1)',
        transform: 'rotate(30deg)',
        borderRadius: 30,
      }} />
      <div style={{
        position: 'absolute', top: 40, right: -30,
        width: 160, height: 160,
        background: 'rgba(255,255,255,0.07)',
        transform: 'rotate(20deg)',
        borderRadius: 20,
      }} />

      {/* Logo / icon top right */}
      <div style={{
        position: 'absolute', top: 14, left: 14,
        background: 'rgba(255,255,255,0.15)',
        border: '2px solid rgba(255,255,255,0.4)',
        borderRadius: 14, padding: '6px 12px',
        color: '#fff', fontSize: 10, fontWeight: 800,
        zIndex: 3,
      }}>
        🚀 STEM School
      </div>

      {/* Photo */}
      <div style={{
        position: 'absolute', top: 14, right: 14,
        width: 90, height: 90, borderRadius: 18,
        overflow: 'hidden', zIndex: 3,
        border: '3px solid rgba(255,255,255,0.5)',
        boxShadow: '0 6px 24px rgba(0,0,0,0.3)',
        background: 'rgba(255,255,255,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {image
          ? <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <span style={{ fontSize: 40 }}>🎓</span>}
      </div>

      {/* Title on banner */}
      <div style={{ position: 'absolute', top: 120, right: 14, left: 14, zIndex: 3 }}>
        <h1 style={{ color: '#fff', fontSize: fs + 5, fontWeight: 900, margin: 0, lineHeight: 1.2, textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>{title}</h1>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: fs - 1, fontWeight: 700, margin: '4px 0 0' }}>{subtitle}</p>
      </div>

      {/* White wave */}
      <svg viewBox="0 0 360 50" style={{ position: 'absolute', top: 200, left: 0, width: 360 }} preserveAspectRatio="none">
        <path d="M0,25 Q80,0 160,25 Q240,50 360,15 L360,50 L0,50 Z" fill="#f0fbff" />
      </svg>

      {/* Features grid */}
      <div style={{ position: 'absolute', top: 236, left: 14, right: 14, zIndex: 3 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
          {features.slice(0, 4).map((f, i) => (
            <div key={i} style={{
              background: i % 2 === 0 ? '#e0f9ff' : '#fff',
              border: `1.5px solid ${i % 2 === 0 ? '#0891b2' : '#e5e7eb'}`,
              borderRadius: 12, padding: '8px 10px',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <span style={{ fontSize: 14 }}>{'🔬📚🎯💡'[i]}</span>
              <span style={{ color: '#0c4a6e', fontSize: fs - 3.5, fontWeight: 700, lineHeight: 1.3 }}>{f}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          background: 'linear-gradient(135deg, #0891b2, #0e7490)',
          borderRadius: 14, padding: '10px 18px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            {phone && <p style={{ color: '#67e8f9', fontSize: fs - 2, fontWeight: 800, margin: 0 }}>📞 {phone}</p>}
            {email && <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: fs - 4, margin: '2px 0 0' }}>{email}</p>}
          </div>
          <div style={{
            background: '#f59e0b', color: '#0c4a6e',
            borderRadius: 10, padding: '7px 14px',
            fontSize: fs - 2, fontWeight: 900,
          }}>ابدأ رحلتك ←</div>
        </div>
      </div>
    </div>
  );
}
