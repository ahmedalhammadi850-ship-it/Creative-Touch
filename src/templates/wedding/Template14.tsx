import type { TemplateData } from '../../types/template';

export default function Template14({ data }: { data: TemplateData }) {
  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div id="template-preview" style={{ width: '280px', height: '400px', position: 'relative', overflow: 'hidden', fontFamily: "'Georgia', serif", direction: 'rtl', backgroundColor: data.colors.bg }}>
      {/* Top half gradient */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '50%', background: `linear-gradient(160deg, ${data.colors.primary}, ${data.colors.secondary})` }} />

      {/* Wave separator */}
      <svg style={{ position: 'absolute', top: '44%', left: 0, width: '100%' }} height="40" viewBox="0 0 280 40" preserveAspectRatio="none">
        <path d="M0,20 Q35,0 70,20 Q105,40 140,20 Q175,0 210,20 Q245,40 280,20 L280,40 L0,40 Z" fill={data.colors.bg} />
      </svg>

      {/* Geometric gold lines */}
      <svg style={{ position: 'absolute', top: '5px', left: '5px', right: '5px', width: 'calc(100% - 10px)' }} height="50%">
        <line x1="0" y1="0" x2="30" y2="0" stroke={data.colors.accent} strokeWidth="0.8" opacity="0.5" />
        <line x1="0" y1="0" x2="0" y2="30" stroke={data.colors.accent} strokeWidth="0.8" opacity="0.5" />
        <line x1="100%" y1="0" x2="calc(100% - 30px)" y2="0" stroke={data.colors.accent} strokeWidth="0.8" opacity="0.5" />
        <line x1="100%" y1="0" x2="100%" y2="30" stroke={data.colors.accent} strokeWidth="0.8" opacity="0.5" />
      </svg>

      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Top section */}
        <div style={{ flex: '0 0 50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ color: data.colors.accent, fontSize: `${7 + _d}px`, letterSpacing: '0.25em', marginBottom: '8px' }}>WEDDING INVITATION</div>
          <div style={{ color: '#ffffff', fontSize: `${28 + _d}px`, textAlign: 'center', lineHeight: 1.2, textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>{data.title}</div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: `${12 + _d}px`, fontStyle: 'italic', margin: '4px 0' }}>&</div>
          <div style={{ color: '#ffffff', fontSize: `${28 + _d}px`, textAlign: 'center', lineHeight: 1.2, textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>{data.subtitle}</div>
        </div>

        {/* Bottom section */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ display: 'flex', gap: '4px', marginBottom: '14px' }}>
            {[0,1,2,3,4].map(i => <div key={i} style={{ width: '4px', height: '4px', borderRadius: '50%', background: data.colors.primary, opacity: 0.3 + i*0.12 }} />)}
          </div>
          <div style={{ color: data.colors.secondary, fontSize: `${10.5 + _d}px`, textAlign: 'center', lineHeight: 2, opacity: 0.8 }}>{data.description}</div>
        </div>
      </div>
    </div>
  );
}
