import type { TemplateData } from '../../types/template';

function LogoLayer({ data }: { data: TemplateData }) {
  if (!data.logo) return null;
  const size = data.logoSize ?? 40;
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

export default function Template35({ data }: { data: TemplateData }) {
  const _d = (data.fontSize ?? 16) - 16;
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[340px] h-[220px] flex flex-col shadow-xl"
      style={{ backgroundColor: data.colors.secondary }}
    >
      {/* Top wave accent */}
      <svg className="absolute top-0 left-0 w-full" viewBox="0 0 340 55" preserveAspectRatio="none" style={{ height: 55 }}>
        <path d="M0,0 L340,0 L340,35 Q260,60 180,30 Q100,5 0,45 Z" fill={data.colors.primary} />
        <path d="M0,0 L340,0 L340,18 Q250,40 170,18 Q80,0 0,28 Z" fill={data.colors.accent} opacity="0.7" />
      </svg>

      {/* Bottom wave */}
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 340 45" preserveAspectRatio="none" style={{ height: 45 }}>
        <path d="M0,45 L340,45 L340,20 Q260,0 180,25 Q90,45 0,15 Z" fill={data.colors.primary} opacity="0.4" />
        <path d="M0,45 L340,45 L340,30 Q240,8 160,32 Q80,50 0,28 Z" fill={data.colors.accent} opacity="0.3" />
      </svg>

      <LogoLayer data={data} />

      {/* Main content — white text on dark bg */}
      <div className="relative z-10 flex-1 flex flex-row items-center px-6 gap-5 mt-4">
        <div className="flex-1">
          <h2 className="font-extrabold leading-tight text-white" style={{ fontSize: 19 + _d }}>{data.title}</h2>
          <p className="mt-1 font-semibold tracking-wider" style={{ color: data.colors.accent, fontSize: 9 + _d }}>{data.subtitle}</p>
          <div className="mt-2 w-10 h-0.5 rounded bg-white opacity-30" />
        </div>
        <div className="flex flex-col gap-2">
          {data.phone && (
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 rounded flex-shrink-0" style={{ backgroundColor: data.colors.accent }} />
              <p dir="ltr" className="font-medium text-white" style={{ fontSize: 8.5 + _d }}>{data.phone}</p>
            </div>
          )}
          {data.email && (
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 rounded flex-shrink-0" style={{ backgroundColor: data.colors.accent }} />
              <p dir="ltr" className="font-medium text-white" style={{ fontSize: 8.5 + _d }}>{data.email}</p>
            </div>
          )}
          {data.website && (
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 rounded flex-shrink-0" style={{ backgroundColor: data.colors.accent }} />
              <p dir="ltr" className="font-medium text-white" style={{ fontSize: 8.5 + _d }}>{data.website}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
