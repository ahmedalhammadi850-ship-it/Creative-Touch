import type { TemplateData } from '../../types/template';

function LogoLayer({ data }: { data: TemplateData }) {
  if (!data.logo) return null;
  const size = data.logoSize ?? 44;
  const pos = data.logoPosition ?? 'top-left';
  const posClass: Record<string, string> = {
    'top-left': 'top-2 left-4',
    'top-right': 'top-2 right-4',
    'bottom-left': 'bottom-3 left-4',
    'bottom-right': 'bottom-3 right-4',
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

export default function Template36({ data }: { data: TemplateData }) {
  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[340px] h-[220px] flex flex-col shadow-xl"
      style={{ backgroundColor: '#ececec' }}
    >
      {/* Dark header band */}
      <div className="h-[75px] flex items-center px-5" style={{ backgroundColor: data.colors.secondary }}>
        <div className="flex flex-col">
          <span className="font-extrabold tracking-wide text-white leading-tight" style={{ fontSize: 16 + _d }}>
            {data.description?.split(',')[0] || data.title}
          </span>
          <span className="tracking-[0.2em] text-white/55 mt-0.5 uppercase" style={{ fontSize: 8 + _d }}>
            {data.subtitle}
          </span>
        </div>
        <LogoLayer data={data} />
      </div>

      {/* Arch separator */}
      <svg className="w-full flex-shrink-0" viewBox="0 0 340 18" preserveAspectRatio="none" style={{ height: 18, marginTop: -1 }}>
        <rect x="0" y="0" width="340" height="18" fill="#ececec" />
        <path d="M60,16 Q170,0 280,16" stroke={data.colors.accent} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      </svg>

      {/* Content on light background — dark text for max contrast */}
      <div className="flex-1 flex flex-row items-center px-5 gap-4">
        <div className="flex-1 border-r-2 pr-4" style={{ borderColor: data.colors.accent }}>
          <h2 className="font-extrabold" style={{ color: '#111111', fontSize: 15 + _d }}>{data.title}</h2>
          <p className="mt-0.5 font-semibold tracking-wide" style={{ color: data.colors.accent, fontSize: 9 + _d }}>{data.subtitle}</p>
        </div>
        <div className="flex flex-col gap-2">
          {data.phone && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: data.colors.accent }}>
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
              <p dir="ltr" className="font-medium" style={{ color: '#1a1a1a', fontSize: 8.5 + _d }}>{data.phone}</p>
            </div>
          )}
          {data.email && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: data.colors.accent }}>
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
              <p dir="ltr" className="font-medium" style={{ color: '#1a1a1a', fontSize: 8.5 + _d }}>{data.email}</p>
            </div>
          )}
          {data.website && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: data.colors.accent }}>
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
              <p dir="ltr" className="font-medium" style={{ color: '#1a1a1a', fontSize: 8.5 + _d }}>{data.website}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
