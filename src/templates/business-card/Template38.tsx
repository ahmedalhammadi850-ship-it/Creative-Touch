import type { TemplateData } from '../../types/template';

function LogoLayer({ data }: { data: TemplateData }) {
  if (!data.logo) return null;
  const size = data.logoSize ?? 40;
  const pos = data.logoPosition ?? 'bottom-left';
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
      className="relative overflow-hidden w-[340px] h-[220px] flex flex-col shadow-lg"
      style={{ backgroundColor: data.colors.bg }}
    >
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 340 220" preserveAspectRatio="none">
        <path d="M0,0 L340,0 L340,60 Q250,120 180,80 Q100,40 0,100 Z" fill={data.colors.primary} />
        <path d="M0,0 L340,0 L340,40 Q240,90 170,60 Q90,25 0,75 Z" fill={data.colors.accent} opacity="0.8"/>
        <path d="M0,160 Q80,130 160,160 Q240,190 340,150 L340,220 L0,220 Z" fill={data.colors.primary} opacity="0.3"/>
      </svg>

      <LogoLayer data={data} />

      <div className="relative z-10 px-5 pt-3 flex-shrink-0">
        <h2 className="text-[17px] font-bold text-white leading-tight">{data.title}</h2>
        <p className="text-[9px] mt-0.5" style={{ color: data.colors.accent }}>{data.subtitle}</p>
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-end pb-4 px-5">
        <div className="flex flex-col gap-1">
          {data.phone && <p dir="ltr" className="text-[8px]" style={{ color: 'rgba(255,255,255,0.8)' }}>{data.phone}</p>}
          {data.email && <p dir="ltr" className="text-[8px]" style={{ color: 'rgba(255,255,255,0.8)' }}>{data.email}</p>}
          {data.website && <p dir="ltr" className="text-[8px]" style={{ color: 'rgba(255,255,255,0.8)' }}>{data.website}</p>}
        </div>
      </div>
    </div>
  );
}
