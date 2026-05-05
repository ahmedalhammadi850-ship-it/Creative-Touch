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
      className="relative overflow-hidden w-[340px] h-[220px] flex shadow-xl"
      style={{ backgroundColor: '#ffffff' }}
    >
      {/* White content area (left 210px) — all text here for maximum contrast */}
      <div className="relative z-10 w-[210px] flex flex-col justify-between py-5 px-5">
        <div>
          <h2 className="text-[18px] font-extrabold leading-tight" style={{ color: '#111111' }}>{data.title}</h2>
          <p className="text-[9px] font-semibold tracking-wider mt-1 uppercase" style={{ color: data.colors.primary }}>{data.subtitle}</p>
          <div className="mt-2.5 w-10 h-[2.5px] rounded" style={{ backgroundColor: data.colors.primary }} />
        </div>
        <div className="flex flex-col gap-2">
          {data.phone && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: data.colors.primary }}>
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
              <p dir="ltr" className="text-[8.5px] font-medium" style={{ color: '#1a1a1a' }}>{data.phone}</p>
            </div>
          )}
          {data.email && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: data.colors.primary }}>
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
              <p dir="ltr" className="text-[8.5px] font-medium" style={{ color: '#1a1a1a' }}>{data.email}</p>
            </div>
          )}
          {data.website && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: data.colors.primary }}>
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
              <p dir="ltr" className="text-[8.5px] font-medium" style={{ color: '#1a1a1a' }}>{data.website}</p>
            </div>
          )}
        </div>
      </div>

      {/* Colored right panel — decorative only, no text here */}
      <div className="flex-1 relative" style={{ backgroundColor: data.colors.primary }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 130 220" preserveAspectRatio="none">
          {/* Curved left edge of the colored panel */}
          <path d="M30,0 Q0,55 20,110 Q38,165 10,220 L130,220 L130,0 Z" fill={data.colors.primary} />
          <path d="M55,0 Q25,60 42,110 Q58,160 35,220 L130,220 L130,0 Z" fill={data.colors.accent} opacity="0.4" />
          <path d="M80,0 Q55,55 68,110 Q80,158 62,220 L130,220 L130,0 Z" fill="#ffffff" opacity="0.06" />
        </svg>
        {/* Tagline on the colored panel — white text = clear */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <p
            className="text-[7px] font-bold tracking-[0.3em] uppercase text-white opacity-70"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            {data.description?.split(',')[0] || ''}
          </p>
        </div>
      </div>

      <LogoLayer data={data} />
    </div>
  );
}
