import type { TemplateData } from '../../types/template';

function LogoLayer({ data }: { data: TemplateData }) {
  if (!data.logo) return null;
  const size = data.logoSize ?? 40;
  const pos = data.logoPosition ?? 'bottom-right';
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

export default function Template38({ data }: { data: TemplateData }) {
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[340px] h-[220px] flex flex-col shadow-xl"
      style={{ backgroundColor: data.colors.secondary }}
    >
      {/* Top sweeping wave — accent color */}
      <svg className="absolute top-0 left-0 w-full" viewBox="0 0 340 80" preserveAspectRatio="none" style={{ height: 80 }}>
        <path d="M0,0 L340,0 L340,55 Q260,90 180,55 Q90,20 0,70 Z" fill={data.colors.primary} />
        <path d="M0,0 L340,0 L340,35 Q250,65 170,38 Q85,12 0,48 Z" fill={data.colors.accent} opacity="0.6" />
      </svg>

      {/* Name block — white text on dark = max contrast */}
      <div className="relative z-10 px-6 pt-4">
        <h2 className="text-[20px] font-extrabold text-white leading-tight tracking-wide">{data.title}</h2>
        <p className="text-[9px] font-bold mt-0.5 tracking-widest uppercase" style={{ color: data.colors.accent }}>{data.subtitle}</p>
      </div>

      {/* Divider */}
      <div className="relative z-10 mx-6 mt-3 h-px" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />

      {/* Contact info — white on dark */}
      <div className="relative z-10 flex-1 flex flex-col justify-center pb-3 px-6 gap-1.5">
        {data.phone && (
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 rounded flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: data.colors.accent }}>
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
            </div>
            <p dir="ltr" className="text-[8.5px] font-medium text-white">{data.phone}</p>
          </div>
        )}
        {data.email && (
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 rounded flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: data.colors.accent }}>
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
            </div>
            <p dir="ltr" className="text-[8.5px] font-medium text-white">{data.email}</p>
          </div>
        )}
        {data.website && (
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 rounded flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: data.colors.accent }}>
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
            </div>
            <p dir="ltr" className="text-[8.5px] font-medium text-white">{data.website}</p>
          </div>
        )}
      </div>

      <LogoLayer data={data} />
    </div>
  );
}
