import type { TemplateData } from '../../types/template';

function LogoLayer({ data }: { data: TemplateData }) {
  if (!data.logo) return null;
  const size = data.logoSize ?? 44;
  const pos = data.logoPosition ?? 'top-left';
  const posClass: Record<string, string> = {
    'top-left': 'top-3 left-4',
    'top-right': 'top-3 right-4',
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
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[340px] h-[220px] flex flex-col shadow-lg"
      style={{ backgroundColor: '#f0f0f0' }}
    >
      <div className="h-[72px] flex items-center px-5 gap-3" style={{ backgroundColor: data.colors.secondary }}>
        {data.logo ? null : (
          <div className="flex flex-col">
            <span className="text-[15px] font-extrabold tracking-wide" style={{ color: '#fff' }}>
              {data.description?.split(',')[0] || data.title}
            </span>
            <span className="text-[8px] tracking-widest text-white/60">{data.subtitle}</span>
          </div>
        )}
      </div>

      <svg className="absolute top-[60px] left-0 right-0 w-full" viewBox="0 0 340 20" preserveAspectRatio="none" style={{ height: 20 }}>
        <path d="M0,20 Q170,0 340,20 L340,20 L0,20 Z" fill="#f0f0f0"/>
        <path d="M80,18 Q170,2 260,18" stroke={data.colors.accent} strokeWidth="2" fill="none"/>
      </svg>

      <LogoLayer data={data} />

      <div className="flex-1 flex flex-row items-center px-5 gap-4 pt-2">
        <div className="flex-1 border-r-2 pr-4" style={{ borderColor: data.colors.accent }}>
          <h2 className="text-[14px] font-bold" style={{ color: data.colors.secondary }}>{data.title}</h2>
          <p className="text-[9px] mt-0.5 tracking-wide" style={{ color: data.colors.accent }}>{data.subtitle}</p>
        </div>
        <div className="flex flex-col gap-1.5">
          {data.phone && (
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: data.colors.accent }}>
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
              <p dir="ltr" className="text-[8px]" style={{ color: '#444' }}>{data.phone}</p>
            </div>
          )}
          {data.email && (
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: data.colors.accent }}>
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
              <p dir="ltr" className="text-[8px]" style={{ color: '#444' }}>{data.email}</p>
            </div>
          )}
          {data.website && (
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: data.colors.accent }}>
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
              <p dir="ltr" className="text-[8px]" style={{ color: '#444' }}>{data.website}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
