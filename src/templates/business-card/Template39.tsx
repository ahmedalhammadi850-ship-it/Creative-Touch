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

export default function Template39({ data }: { data: TemplateData }) {
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[340px] h-[220px] flex shadow-lg"
      style={{ backgroundColor: '#ffffff' }}
    >
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 340 220" preserveAspectRatio="none">
        <path d="M220,0 Q260,80 220,140 Q200,180 240,220 L340,220 L340,0 Z" fill={data.colors.primary} />
        <path d="M240,0 Q275,70 240,130 Q220,170 255,220 L340,220 L340,0 Z" fill={data.colors.accent} opacity="0.6"/>
      </svg>

      <LogoLayer data={data} />

      <div className="relative z-10 flex-1 flex flex-col justify-between p-5">
        <div>
          <h2 className="text-[17px] font-black" style={{ color: data.colors.primary }}>{data.title}</h2>
          <p className="text-[9px] mt-0.5 tracking-wide uppercase" style={{ color: data.colors.accent }}>{data.subtitle}</p>
          <div className="mt-2 w-10 h-0.5 rounded" style={{ backgroundColor: data.colors.primary }} />
        </div>
        <div className="flex flex-col gap-1.5">
          {data.phone && (
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full flex-shrink-0" style={{ backgroundColor: data.colors.primary }} />
              <p dir="ltr" className="text-[8px]" style={{ color: '#555' }}>{data.phone}</p>
            </div>
          )}
          {data.email && (
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full flex-shrink-0" style={{ backgroundColor: data.colors.primary }} />
              <p dir="ltr" className="text-[8px]" style={{ color: '#555' }}>{data.email}</p>
            </div>
          )}
          {data.website && (
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full flex-shrink-0" style={{ backgroundColor: data.colors.primary }} />
              <p dir="ltr" className="text-[8px]" style={{ color: '#555' }}>{data.website}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
