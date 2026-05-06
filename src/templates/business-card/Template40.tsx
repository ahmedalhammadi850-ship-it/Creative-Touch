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

export default function Template40({ data }: { data: TemplateData }) {
  const _d = (data.fontSize ?? 16) - 16;
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[340px] h-[220px] flex flex-col shadow-xl"
      style={{ backgroundColor: '#ffffff' }}
    >
      {/* Bold top bar */}
      <div className="h-[6px] w-full flex-shrink-0" style={{ backgroundColor: data.colors.primary }} />

      {/* Subtle corner decorations — very light, won't obscure text */}
      <svg className="absolute top-0 right-0 pointer-events-none" width="110" height="100" viewBox="0 0 110 100">
        <path d="M110,0 L110,100 Q55,65 110,0 Z" fill={data.colors.primary} opacity="0.06" />
      </svg>
      <svg className="absolute bottom-0 left-0 pointer-events-none" width="100" height="80" viewBox="0 0 100 80">
        <path d="M0,80 L100,80 Q45,30 0,80 Z" fill={data.colors.accent} opacity="0.07" />
      </svg>

      <LogoLayer data={data} />

      {/* Main content row — dark text on white = maximum contrast */}
      <div className="relative z-10 flex-1 flex flex-row items-center px-6 gap-5">
        {/* Name + job column */}
        <div className="flex-1">
          <h2 className="font-extrabold leading-tight" style={{ color: '#111111', fontSize: 19 + _d }}>{data.title}</h2>
          <p className="mt-0.5 font-bold tracking-wider uppercase" style={{ color: data.colors.primary, fontSize: 9 + _d }}>{data.subtitle}</p>
          <div className="mt-2 w-10 h-[2.5px] rounded" style={{ backgroundColor: data.colors.accent }} />
          {data.description && (
            <p className="mt-1.5 font-medium" style={{ color: '#555', fontSize: 7.5 + _d }}>{data.description?.split(',')[0]}</p>
          )}
        </div>

        {/* Contact column — dark icons + text */}
        <div className="flex flex-col gap-2 min-w-[125px]">
          {data.phone && (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: `${data.colors.primary}18` }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: data.colors.primary }} />
              </div>
              <p dir="ltr" className="font-semibold" style={{ color: '#1a1a1a', fontSize: 8.5 + _d }}>{data.phone}</p>
            </div>
          )}
          {data.email && (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: `${data.colors.primary}18` }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: data.colors.primary }} />
              </div>
              <p dir="ltr" className="font-semibold" style={{ color: '#1a1a1a', fontSize: 8.5 + _d }}>{data.email}</p>
            </div>
          )}
          {data.website && (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: `${data.colors.primary}18` }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: data.colors.primary }} />
              </div>
              <p dir="ltr" className="font-semibold" style={{ color: '#1a1a1a', fontSize: 8.5 + _d }}>{data.website}</p>
            </div>
          )}
        </div>
      </div>

      {/* Bold bottom accent bar */}
      <div className="h-[5px] w-full flex-shrink-0" style={{ backgroundColor: data.colors.accent }} />
    </div>
  );
}
