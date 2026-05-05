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
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[340px] h-[220px] flex flex-col shadow-lg"
      style={{ backgroundColor: '#ffffff' }}
    >
      <div className="h-1.5 w-full" style={{ backgroundColor: data.colors.primary }} />

      <svg className="absolute top-0 right-0 w-36 h-32" viewBox="0 0 150 130" preserveAspectRatio="none">
        <path d="M150,0 L150,130 Q80,80 150,0 Z" fill={data.colors.primary} opacity="0.08"/>
      </svg>
      <svg className="absolute bottom-0 left-0 w-36 h-24" viewBox="0 0 150 100" preserveAspectRatio="none">
        <path d="M0,100 L150,100 Q70,20 0,100 Z" fill={data.colors.accent} opacity="0.1"/>
      </svg>

      <LogoLayer data={data} />

      <div className="relative z-10 flex-1 flex flex-row items-center px-5 gap-5">
        <div className="flex-1">
          <h2 className="text-[18px] font-bold leading-tight" style={{ color: data.colors.primary }}>{data.title}</h2>
          <p className="text-[10px] mt-0.5 font-medium" style={{ color: data.colors.accent }}>{data.subtitle}</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-px flex-1" style={{ backgroundColor: data.colors.primary, opacity: 0.2 }} />
          </div>
          <p className="text-[8px] mt-1.5 opacity-60" style={{ color: '#333' }}>{data.description?.split(',')[0]}</p>
        </div>

        <div className="flex flex-col gap-1.5 min-w-[120px]">
          {data.phone && (
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: `${data.colors.primary}20` }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: data.colors.primary }} />
              </div>
              <p dir="ltr" className="text-[8px]" style={{ color: '#444' }}>{data.phone}</p>
            </div>
          )}
          {data.email && (
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: `${data.colors.primary}20` }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: data.colors.primary }} />
              </div>
              <p dir="ltr" className="text-[8px]" style={{ color: '#444' }}>{data.email}</p>
            </div>
          )}
          {data.website && (
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: `${data.colors.primary}20` }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: data.colors.primary }} />
              </div>
              <p dir="ltr" className="text-[8px]" style={{ color: '#444' }}>{data.website}</p>
            </div>
          )}
        </div>
      </div>

      <div className="h-1 w-full" style={{ backgroundColor: data.colors.accent }} />
    </div>
  );
}
