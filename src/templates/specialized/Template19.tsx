import type { TemplateData } from '../../types/template';
interface Props { data: TemplateData; }

export default function SpecializedTemplate19({ data }: Props) {
  const { title, subtitle, description, phone, email, colors, image, fontSize } = data;
  const fs = fontSize || 14;

  return (
    <div id="template-preview" style={{
      width: 360, height: 460,
      background: `linear-gradient(145deg, #fff7e6 0%, #fff3cd 50%, #ffe8a0 100%)`,
      position: 'relative', overflow: 'hidden',
      fontFamily: 'Cairo, sans-serif', direction: 'rtl',
    }}>
      {/* Sky background top */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 240,
        background: `linear-gradient(170deg, #87ceeb 0%, #b8e4ff 60%, #fff7e6 100%)`,
      }} />

      {/* Sun deco */}
      <div style={{ position: 'absolute', top: 16, right: 18, width: 58, height: 58,
        background: 'radial-gradient(circle, #fbbf24 40%, #fde68a 100%)',
        borderRadius: '50%', boxShadow: '0 0 20px #fbbf2466',
      }} />
      {[0,1,2,3,4,5,6,7].map(i => (
        <div key={i} style={{
          position: 'absolute', top: 16 + 29 + 12 * Math.sin(i * Math.PI / 4) - 3,
          right: 18 + 29 + 12 * Math.cos(i * Math.PI / 4) - 3,
          width: 6, height: 6, borderRadius: '50%',
          background: '#fbbf24', opacity: 0.6,
        }} />
      ))}

      {/* Cloud decorations */}
      {[{t:22,l:20,w:70,o:0.85},{t:50,l:80,w:50,o:0.6},{t:10,l:160,w:60,o:0.5}].map((c,i) => (
        <div key={i} style={{
          position: 'absolute', top: c.t, left: c.l,
          width: c.w, height: c.w * 0.45,
          background: `rgba(255,255,255,${c.o})`,
          borderRadius: '50px',
          boxShadow: `0 ${c.w*0.15}px 0 ${c.w*0.12}px rgba(255,255,255,${c.o})`,
        }} />
      ))}

      {/* Stars */}
      {['★','✦','✧','⭐'].map((s,i) => (
        <div key={i} style={{
          position: 'absolute', fontSize: 12 + i*3,
          color: '#fbbf24', opacity: 0.7,
          top: [30,60,18,45][i], left: [50,100,200,260][i],
        }}>{s}</div>
      ))}

      {/* Child photo */}
      <div style={{
        position: 'absolute', top: 24, left: '50%', transform: 'translateX(-50%)',
        width: 130, height: 130, borderRadius: '50%',
        overflow: 'hidden', zIndex: 3,
        border: `5px solid #fff`,
        boxShadow: '0 8px 30px rgba(0,0,0,0.18)',
        background: 'linear-gradient(135deg, #fde68a, #fbbf24)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {image
          ? <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <span style={{ fontSize: 60 }}>👶</span>}
      </div>

      {/* Wave bottom of sky */}
      <svg viewBox="0 0 360 60" style={{ position: 'absolute', top: 196, left: 0, width: 360 }} preserveAspectRatio="none">
        <path d="M0,30 Q90,0 180,30 Q270,60 360,30 L360,60 L0,60 Z" fill="#fff7e6" />
      </svg>

      {/* Content below */}
      <div style={{
        position: 'absolute', top: 220, left: 0, right: 0, bottom: 0,
        padding: '4px 20px 0', display: 'flex', flexDirection: 'column', alignItems: 'center',
        zIndex: 3,
      }}>
        <h1 style={{
          color: '#d97706', fontSize: fs + 7, fontWeight: 900,
          margin: 0, textAlign: 'center', lineHeight: 1.2,
          textShadow: '0 2px 8px rgba(217,119,6,0.15)',
        }}>{title}</h1>
        <p style={{
          color: '#92400e', fontSize: fs - 2, fontWeight: 700,
          margin: '5px 0 0', textAlign: 'center',
        }}>{subtitle}</p>
        {description && (
          <p style={{
            color: '#78350f', fontSize: fs - 3, fontWeight: 600,
            margin: '6px 0 0', textAlign: 'center', lineHeight: 1.6,
            opacity: 0.8,
          }}>{description.replace(/،/g, ' • ')}</p>
        )}

        {/* CTA button */}
        <div style={{ marginTop: 'auto', width: '100%', paddingBottom: 10 }}>
          <div style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            borderRadius: 30, padding: '10px 0', textAlign: 'center',
            color: '#fff', fontSize: fs - 1, fontWeight: 900,
            boxShadow: '0 5px 20px rgba(245,158,11,0.4)',
            marginBottom: 8,
          }}>
            🎒 ابدأ رحلتك
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, alignItems: 'center' }}>
            {phone && <span style={{ color: '#92400e', fontSize: fs - 3, fontWeight: 700 }}>📞 {phone}</span>}
            {email && <span style={{ color: '#92400e', fontSize: fs - 4, opacity: 0.7 }}>✉ {email}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
