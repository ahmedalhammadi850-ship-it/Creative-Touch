import type { TemplateData } from '../../types/template';

export default function Template21({ data }: { data: TemplateData }) {
  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[340px] h-[220px] flex shadow-lg"
      style={{ backgroundColor: data.colors.bg }}
    >
      <div
        className="w-[90px] flex-shrink-0 flex flex-col items-center justify-between py-5 px-3"
        style={{ backgroundColor: data.colors.primary }}
      >

        <div className="flex flex-col items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: data.colors.accent }} />
          <div className="w-1 h-1 rounded-full opacity-60" style={{ backgroundColor: data.colors.accent }} />
          <div className="w-1 h-1 rounded-full opacity-30" style={{ backgroundColor: data.colors.accent }} />
        </div>

      </div>

      <div className="flex-1 flex flex-col justify-between p-5">
        <div>
          <h2
            className="font-bold leading-tight" style={{ color: data.colors.primary, fontSize: 18 + _d }}
          >
            {data.title}
          </h2>
          <p
            className="mt-0.5 tracking-widest uppercase font-medium" style={{ color: data.colors.accent, fontSize: 10 + _d }}
          >
            {data.subtitle}
          </p>
          <div className="mt-2 flex items-center gap-1.5">
            <div className="h-px flex-1" style={{ backgroundColor: data.colors.primary, opacity: 0.15 }} />
            <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: data.colors.accent }} />
            <div className="h-px flex-1" style={{ backgroundColor: data.colors.primary, opacity: 0.15 }} />
          </div>
        </div>

        <p
          className="leading-relaxed opacity-70" style={{ color: data.colors.secondary, fontSize: 9 + _d }}
        >
          {data.description}
        </p>

        <div className="flex flex-col" style={{ gap: '4px' }}>
          {data.phone && (
            <div className="flex items-center" style={{ gap: '8px', minHeight: '12px' }}>
              <div className="w-3 h-3 rounded flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${data.colors.primary}18` }}>
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: data.colors.primary }} />
              </div>
              <p dir="ltr" className="" style={{ color: data.colors.secondary, margin: 0, lineHeight: 1.2, whiteSpace: 'nowrap', fontSize: 8 + _d }}>{data.phone}</p>
            </div>
          )}
          {data.email && (
            <div className="flex items-center" style={{ gap: '8px', minHeight: '12px' }}>
              <div className="w-3 h-3 rounded flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${data.colors.primary}18` }}>
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: data.colors.primary }} />
              </div>
              <p dir="ltr" className="" style={{ color: data.colors.secondary, margin: 0, lineHeight: 1.2, whiteSpace: 'nowrap', fontSize: 8 + _d }}>{data.email}</p>
            </div>
          )}
          {data.website && (
            <div className="flex items-center" style={{ gap: '8px', minHeight: '12px' }}>
              <div className="w-3 h-3 rounded flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${data.colors.primary}18` }}>
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: data.colors.primary }} />
              </div>
              <p dir="ltr" className="" style={{ color: data.colors.secondary, margin: 0, lineHeight: 1.2, whiteSpace: 'nowrap', fontSize: 8 + _d }}>{data.website}</p>
            </div>
          )}
        </div>
      </div>

      <div
        className="absolute bottom-0 right-0 w-14 h-14"
        style={{
          background: `linear-gradient(135deg, transparent 50%, ${data.colors.accent}22 50%)`
        }}
      />
    </div>
  );
}
