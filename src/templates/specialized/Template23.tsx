import type { TemplateData } from '../../types/template';
interface Props { data: TemplateData; }

export default function SpecializedTemplate23({ data }: Props) {
  const { title, subtitle, description, phone, email, website, colors, image, fontSize } = data;
  const fs = fontSize || 14;
  const features = (description || '').split('،').map(s => s.trim()).filter(Boolean);

  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div id="template-preview" style={{
      width: 360, height: 460,
      background: '#050b1a',
      position: 'relative', overflow: 'hidden',
      fontFamily: 'Cairo, sans-serif', direction: 'rtl',
    }}>
      {/* Neon glow bg orbs */}
      <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 70%)' }} />
      <div style={{ position: 'absolute', bottom: -40, left: -40, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)' }} />
      <div style={{ position: 'absolute', top: 180, left: '50%', transform: 'translateX(-50%)', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 60%)' }} />

      {/* Grid lines */}
      {[0,1,2,3].map(i => (
        <div key={i} style={{ position: 'absolute', top: 0, bottom: 0, left: `${i * 90 + 45}px`, width: 1, background: 'rgba(6,182,212,0.06)' }} />
      ))}
      {[0,1,2,3,4].map(i => (
        <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: `${i * 92}px`, height: 1, background: 'rgba(6,182,212,0.06)' }} />
      ))}

      {/* Top area */}
      <div style={{ position: 'relative', zIndex: 3, padding: '16px 16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        {/* Tech badge */}
        <div style={{
          border: '1.5px solid rgba(6,182,212,0.6)',
          borderRadius: 10, padding: '5px 12px',
          color: '#06b6d4', fontSize: 10 + _d, fontWeight: 800,
          background: 'rgba(6,182,212,0.08)',
        }}>⚡ Tech Institute</div>

        {/* Photo */}
        <div style={{
          width: 88, height: 88, borderRadius: 18, overflow: 'hidden',
          border: '2px solid rgba(6,182,212,0.6)',
          boxShadow: '0 0 20px rgba(6,182,212,0.3)',
          background: 'rgba(6,182,212,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {image
            ? <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <span style={{ fontSize: 40 + _d }}>🤖</span>}
        </div>
      </div>

      {/* Main text */}
      <div style={{ position: 'relative', zIndex: 3, padding: '14px 16px 0' }}>
        <h1 style={{ color: '#e2e8f0', fontSize: fs + 6, fontWeight: 900, margin: 0, lineHeight: 1.2 }}>{title}</h1>
        <div style={{ display: 'flex', gap: 6, margin: '6px 0 0', flexWrap: 'wrap' }}>
          {['#06b6d4','#6366f1','#f59e0b'].map((c, i) => (
            <span key={i} style={{ color: c, fontSize: fs - 2, fontWeight: 700 }}>
              {['💻 Coding','🤖 AI','🔬 STEM'][i]}
            </span>
          ))}
        </div>

        {/* Bilingual tagline */}
        <div style={{
          margin: '12px 0', padding: '12px 16px',
          background: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(99,102,241,0.1))',
          border: '1px solid rgba(6,182,212,0.3)',
          borderRadius: 14,
        }}>
          <p style={{ color: '#e2e8f0', fontSize: fs + 1, fontWeight: 900, margin: '0 0 3px' }}>🚀 {subtitle}</p>
          <p style={{ color: '#06b6d4', fontSize: fs - 3, margin: 0, direction: 'ltr', fontWeight: 600 }}>Your Path to Innovation & Technology</p>
        </div>
      </div>

      {/* Features */}
      <div style={{ position: 'relative', zIndex: 3, padding: '0 16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
          {features.slice(0, 4).map((f, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${['rgba(6,182,212,0.3)','rgba(99,102,241,0.3)','rgba(245,158,11,0.3)','rgba(6,182,212,0.2)'][i]}`,
              borderRadius: 12, padding: '9px 10px',
              display: 'flex', alignItems: 'center', gap: 7,
            }}>
              <span style={{ fontSize: 14 + _d }}>{'⚡🧠🎯💡'[i]}</span>
              <span style={{ color: '#cbd5e1', fontSize: fs - 3.5, fontWeight: 700, lineHeight: 1.3 }}>{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12, zIndex: 3 }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(6,182,212,0.2), rgba(99,102,241,0.2))',
          border: '1px solid rgba(6,182,212,0.4)',
          borderRadius: 14, padding: '11px 16px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            {phone && <p style={{ color: '#67e8f9', fontSize: fs - 2, fontWeight: 800, margin: 0 }}>📞 {phone}</p>}
            {website && <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: fs - 4, margin: '2px 0 0' }}>{website}</p>}
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #06b6d4, #6366f1)',
            borderRadius: 10, padding: '7px 14px',
            color: '#fff', fontSize: fs - 2, fontWeight: 900,
            boxShadow: '0 4px 16px rgba(6,182,212,0.4)',
          }}>انضم الآن ←</div>
        </div>
      </div>
    </div>
  );
}
