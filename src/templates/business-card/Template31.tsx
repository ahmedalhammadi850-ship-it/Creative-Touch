import type { TemplateData } from '../../types/template';

export default function Template31({ data }: { data: TemplateData }) {
  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[340px] h-[220px] flex shadow-lg"
      style={{ backgroundColor: '#ffffff' }}
    >
      <div className="relative flex-1 flex flex-col justify-between p-5 z-10">
        <div>
          <div
            className="inline-block px-3 py-1 text-white font-bold" style={{ backgroundColor: data.colors.primary, fontSize: 13 + _d }}
          >
            {data.title}
          </div>
          <p className="mt-1" style={{ color: '#555', fontSize: 10 + _d }}>{data.subtitle}</p>
        </div>

        <div className="flex flex-col gap-1">
          {data.description && (
            <div className="flex items-start gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full mt-0.5 flex-shrink-0" style={{ backgroundColor: data.colors.primary }} />
              <p className="leading-tight" style={{ color: '#444', fontSize: 8 + _d }}>{data.description}</p>
            </div>
          )}
          {data.email && (
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: data.colors.primary }} />
              <p dir="ltr" className="" style={{ color: '#444', fontSize: 8 + _d }}>{data.email}</p>
            </div>
          )}
          {data.website && (
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: data.colors.primary }} />
              <p dir="ltr" className="" style={{ color: '#444', fontSize: 8 + _d }}>{data.website}</p>
            </div>
          )}
          {data.phone && (
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: data.colors.primary }} />
              <p dir="ltr" className="" style={{ color: '#444', fontSize: 8 + _d }}>{data.phone}</p>
            </div>
          )}
        </div>
      </div>

      <div
        className="relative w-[130px] flex-shrink-0 flex flex-col items-center justify-end pb-4"
        style={{ backgroundColor: data.colors.secondary }}
      >
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 130 220" preserveAspectRatio="none">
          <path d="M0,0 Q40,60 0,120 Q40,170 0,220 L130,220 L130,0 Z" fill={data.colors.primary} opacity="0.85"/>
          <path d="M0,0 Q20,80 0,140 Q25,190 0,220 L80,220 L80,0 Z" fill={data.colors.primary} opacity="0.4"/>
        </svg>

        <p className="relative z-10 text-white mt-2 text-center px-2 font-medium opacity-90 leading-tight" style={{ fontSize: 7 + _d }}>
          {data.description?.split(',')[0] || 'Company'}
        </p>
      </div>
    </div>
  );
}
