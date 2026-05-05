import type { TemplateData } from '../../types/template';

function LogoLayer({ data }: { data: TemplateData }) {
  if (!data.logo) return null;
  const size = data.logoSize ?? 40;
  const pos = data.logoPosition ?? 'top-left';
  const posClass: Record<string, string> = {
    'top-left': 'top-3 left-3',
    'top-right': 'top-3 right-3',
    'bottom-left': 'bottom-3 left-3',
    'bottom-right': 'bottom-3 right-3',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  };
  return (
    <img
      src={data.logo}
      alt="logo"
      className={`absolute z-30 object-contain ${posClass[pos]}`}
      style={{ width: size, height: size }}
    />
  );
}

export default function Template34({ data }: { data: TemplateData }) {
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[340px] h-[220px] flex shadow-xl"
      style={{ backgroundColor: '#ffffff' }}
    >
      {/* Colored diagonal left panel */}
      <div className="relative w-[130px] flex-shrink-0 flex flex-col justify-between p-4" style={{ backgroundColor: data.colors.secondary }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 130 220" preserveAspectRatio="none">
          <path d="M0,0 L130,0 L130,220 L0,220 Z" fill={data.colors.secondary} />
          <path d="M80,0 L130,0 L130,220 L55,220 Z" fill={data.colors.primary} opacity="0.35" />
        </svg>
        <div className="relative z-10">
          <p className="text-[10px] font-bold tracking-widest uppercase text-white leading-tight">{data.description?.split(',')[0] || 'الشركة'}</p>
          <div className="mt-1.5 w-8 h-0.5 rounded bg-white opacity-50" />
        </div>
        <div className="relative z-10">
          <p className="text-[7px] text-white/60 leading-relaxed">{data.subtitle}</p>
        </div>
        {/* Bottom accent triangles */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 130 40" preserveAspectRatio="none" style={{ height: 40 }}>
          <path d="M0,40 L130,10 L130,40 Z" fill={data.colors.primary} opacity="0.5" />
          <path d="M0,40 L130,22 L130,40 Z" fill={data.colors.accent} opacity="0.8" />
        </svg>
      </div>

      {/* White right panel — all text on white = max contrast */}
      <div className="flex-1 flex flex-col justify-between p-4 pl-5">
        <div>
          <h2 className="text-[17px] font-extrabold leading-tight" style={{ color: '#111111' }}>{data.title}</h2>
          <p className="text-[9px] font-semibold mt-1 uppercase tracking-wider" style={{ color: data.colors.primary }}>{data.subtitle}</p>
          <div className="mt-2 w-8 h-0.5 rounded" style={{ backgroundColor: data.colors.accent }} />
        </div>
        <div className="flex flex-col gap-1.5">
          {data.phone && (
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full flex-shrink-0" style={{ backgroundColor: data.colors.accent }} />
              <p dir="ltr" className="text-[8.5px] font-medium" style={{ color: '#222' }}>{data.phone}</p>
            </div>
          )}
          {data.email && (
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full flex-shrink-0" style={{ backgroundColor: data.colors.accent }} />
              <p dir="ltr" className="text-[8.5px] font-medium" style={{ color: '#222' }}>{data.email}</p>
            </div>
          )}
          {data.website && (
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full flex-shrink-0" style={{ backgroundColor: data.colors.accent }} />
              <p dir="ltr" className="text-[8.5px] font-medium" style={{ color: '#222' }}>{data.website}</p>
            </div>
          )}
        </div>
      </div>

      <LogoLayer data={data} />
    </div>
  );
}
