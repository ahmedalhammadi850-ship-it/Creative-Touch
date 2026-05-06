import type { TemplateData } from '../../types/template';

export default function Template33({ data }: { data: TemplateData }) {
  const _d = (data.fontSize ?? 16) - 16;
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[340px] h-[220px] flex flex-col shadow-lg"
      style={{ backgroundColor: data.colors.bg }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-1.5"
        style={{ backgroundColor: data.colors.accent }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-1.5"
        style={{ backgroundColor: data.colors.accent }}
      />

      <div
        className="absolute left-0 top-0 bottom-0 w-[90px] flex flex-col items-center justify-center gap-3"
        style={{ backgroundColor: data.colors.primary }}
      >
        <div className="w-10 h-px" style={{ backgroundColor: data.colors.accent, opacity: 0.5 }} />
        <p className="tracking-widest text-center px-2" style={{ color: data.colors.accent, fontSize: 6 + _d }}>
          {data.description?.split(',')[0] || 'BRAND'}
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-between pl-[106px] pr-5 py-5">
        <div>
          <h2 className="font-bold leading-tight" style={{ color: '#ffffff', fontSize: 17 + _d }}>
            {data.title}
          </h2>
          <p className="mt-0.5 tracking-wider" style={{ color: data.colors.accent, fontSize: 10 + _d }}>
            {data.subtitle}
          </p>
        </div>

        <div
          className="w-full h-px"
          style={{ background: `linear-gradient(to right, ${data.colors.accent}, transparent)` }}
        />

        <div className="flex flex-col gap-1.5">
          {data.phone && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: data.colors.accent }}>
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
              <p dir="ltr" className="text-white/70" style={{ fontSize: 8 + _d }}>{data.phone}</p>
            </div>
          )}
          {data.email && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: data.colors.accent }}>
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
              <p dir="ltr" className="text-white/70" style={{ fontSize: 8 + _d }}>{data.email}</p>
            </div>
          )}
          {data.website && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: data.colors.accent }}>
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
              <p dir="ltr" className="text-white/70" style={{ fontSize: 8 + _d }}>{data.website}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
