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

export default function Template35({ data }: { data: TemplateData }) {
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[340px] h-[220px] flex flex-col shadow-lg"
      style={{ backgroundColor: data.colors.bg }}
    >
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 340 220" preserveAspectRatio="none">
        <path d="M200,0 Q260,40 340,20 L340,0 Z" fill={data.colors.accent} />
        <path d="M180,0 Q240,50 340,30 L340,0 L200,0 Z" fill={data.colors.primary} opacity="0.6"/>
        <path d="M0,180 Q80,140 180,200 Q260,230 340,180 L340,220 L0,220 Z" fill={data.colors.accent} />
        <path d="M0,195 Q100,155 200,210 Q280,235 340,195 L340,220 L0,220 Z" fill={data.colors.primary} opacity="0.5"/>
      </svg>

      <LogoLayer data={data} />

      <div className="relative z-10 flex-1 flex flex-row items-center px-6 gap-4">
        <div className="flex-1">
          <h2 className="text-[18px] font-bold" style={{ color: data.colors.primary }}>{data.title}</h2>
          <p className="text-[10px] mt-1" style={{ color: data.colors.accent }}>{data.subtitle}</p>
        </div>
        <div className="flex flex-col gap-1 text-right">
          {data.phone && <p dir="ltr" className="text-[8px]" style={{ color: 'rgba(255,255,255,0.75)' }}>{data.phone}</p>}
          {data.email && <p dir="ltr" className="text-[8px]" style={{ color: 'rgba(255,255,255,0.75)' }}>{data.email}</p>}
          {data.website && <p dir="ltr" className="text-[8px]" style={{ color: 'rgba(255,255,255,0.75)' }}>{data.website}</p>}
        </div>
      </div>
    </div>
  );
}
