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
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[340px] h-[220px] flex shadow-lg"
      style={{ backgroundColor: '#ffffff' }}
    >
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 340 220" preserveAspectRatio="none">
        <path d="M0,0 L80,0 Q60,110 100,220 L0,220 Z" fill={data.colors.primary} />
        <path d="M0,0 L60,0 Q45,100 80,220 L0,220 Z" fill={data.colors.accent} opacity="0.7"/>
        <path d="M240,220 Q280,160 340,140 L340,220 Z" fill={data.colors.primary} opacity="0.3"/>
        <path d="M260,220 Q300,170 340,155 L340,220 Z" fill={data.colors.accent} opacity="0.5"/>
      </svg>

      <LogoLayer data={data} />

      <div className="relative z-10 w-[90px]" />

      <div className="relative z-10 flex-1 flex flex-col justify-between py-4 pr-5 pl-2">
        <div>
          <h2 className="text-[16px] font-black uppercase" style={{ color: data.colors.primary }}>{data.title}</h2>
          <p className="text-[9px] tracking-wider mt-0.5" style={{ color: data.colors.accent }}>{data.subtitle}</p>
        </div>
        <div className="flex flex-col gap-1.5">
          {data.phone && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: data.colors.primary }}>
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
              <p dir="ltr" className="text-[8px]" style={{ color: '#555' }}>{data.phone}</p>
            </div>
          )}
          {data.email && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: data.colors.primary }}>
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
              <p dir="ltr" className="text-[8px]" style={{ color: '#555' }}>{data.email}</p>
            </div>
          )}
          {data.website && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: data.colors.primary }}>
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
              <p dir="ltr" className="text-[8px]" style={{ color: '#555' }}>{data.website}</p>
            </div>
          )}
          <p className="text-[7px] tracking-widest mt-1 uppercase" style={{ color: data.colors.accent }}>
            {data.description?.split(',')[0] || ''}
          </p>
        </div>
      </div>
    </div>
  );
}
