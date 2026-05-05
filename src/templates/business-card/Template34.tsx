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

export default function Template34({ data }: { data: TemplateData }) {
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[340px] h-[220px] flex shadow-lg"
      style={{ backgroundColor: '#ffffff' }}
    >
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 340 220" preserveAspectRatio="none">
        <path d="M0,0 L200,0 L150,220 L0,220 Z" fill={data.colors.secondary} />
        <path d="M0,0 L180,0 Q140,60 120,110 Q100,160 130,220 L0,220 Z" fill={data.colors.primary} />
        <path d="M240,220 L340,60 L340,220 Z" fill={data.colors.accent} opacity="0.85"/>
        <path d="M290,220 L340,120 L340,220 Z" fill={data.colors.primary} opacity="0.5"/>
      </svg>

      <LogoLayer data={data} />

      <div className="relative z-10 flex-1 flex flex-col justify-between p-5 pr-0">
        <div>
          <p className="text-[8px] tracking-widest uppercase mb-1" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {data.description?.split(',')[0] || ''}
          </p>
          <p className="text-[7px] tracking-widest" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {data.subtitle}
          </p>
        </div>
        <div />
      </div>

      <div className="relative z-10 w-[180px] flex flex-col justify-between p-5 pl-3">
        <div>
          <h2 className="text-[15px] font-bold" style={{ color: data.colors.primary }}>{data.title}</h2>
          <p className="text-[9px] mt-0.5" style={{ color: data.colors.secondary }}>{data.subtitle}</p>
        </div>
        <div className="flex flex-col gap-1">
          {data.phone && <p dir="ltr" className="text-[8px]" style={{ color: '#444' }}>{data.phone}</p>}
          {data.email && <p dir="ltr" className="text-[8px]" style={{ color: '#444' }}>{data.email}</p>}
          {data.website && <p dir="ltr" className="text-[8px]" style={{ color: '#444' }}>{data.website}</p>}
        </div>
      </div>
    </div>
  );
}
