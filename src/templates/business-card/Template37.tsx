import type { TemplateData } from '../../types/template';

function LogoLayer({ data }: { data: TemplateData }) {
  if (!data.logo) return null;
  const size = data.logoSize ?? 38;
  const pos = data.logoPosition ?? 'top-right';
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

export default function Template37({ data }: { data: TemplateData }) {
  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[340px] h-[220px] flex shadow-xl"
      style={{ backgroundColor: '#ffffff' }}
    >
      {/* Colored left wave column */}
      <div className="relative w-[100px] flex-shrink-0" style={{ backgroundColor: data.colors.primary }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 220" preserveAspectRatio="none">
          <path d="M0,0 L100,0 Q75,55 90,110 Q100,165 75,220 L0,220 Z" fill={data.colors.secondary} />
          <path d="M0,0 L80,0 Q60,50 72,110 Q82,160 60,220 L0,220 Z" fill={data.colors.accent} opacity="0.45" />
        </svg>
        {/* Tagline text vertical on colored band — white on color = clear */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <p
            className="font-bold tracking-[0.25em] uppercase text-white" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)', fontSize: 7 + _d }}
          >
            {data.description?.split(',')[0] || data.subtitle}
          </p>
        </div>
      </div>

      {/* White right panel — dark text for max contrast */}
      <div className="relative z-10 flex-1 flex flex-col justify-center py-5 px-5 gap-3">
        <div>
          <h2 className="font-extrabold leading-tight" style={{ color: '#111111', fontSize: 18 + _d }}>{data.title}</h2>
          <p className="font-semibold tracking-wider mt-1 uppercase" style={{ color: data.colors.primary, fontSize: 9 + _d }}>{data.subtitle}</p>
          <div className="mt-2 w-10 h-[2.5px] rounded" style={{ backgroundColor: data.colors.accent }} />
        </div>
        <div className="flex flex-col gap-2">
          {data.phone && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: data.colors.primary }}>
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
              <p dir="ltr" className="font-medium" style={{ color: '#1a1a1a', fontSize: 8.5 + _d }}>{data.phone}</p>
            </div>
          )}
          {data.email && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: data.colors.primary }}>
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
              <p dir="ltr" className="font-medium" style={{ color: '#1a1a1a', fontSize: 8.5 + _d }}>{data.email}</p>
            </div>
          )}
          {data.website && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: data.colors.primary }}>
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
              <p dir="ltr" className="font-medium" style={{ color: '#1a1a1a', fontSize: 8.5 + _d }}>{data.website}</p>
            </div>
          )}
        </div>
      </div>

      <LogoLayer data={data} />
    </div>
  );
}
