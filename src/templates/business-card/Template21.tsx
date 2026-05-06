import type { TemplateData } from '../../types/template';

export default function Template21({ data }: { data: TemplateData }) {
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
            className="text-[18px] font-bold leading-tight"
            style={{ color: data.colors.primary }}
          >
            {data.title}
          </h2>
          <p
            className="text-[10px] mt-0.5 tracking-widest uppercase font-medium"
            style={{ color: data.colors.accent }}
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
          className="text-[9px] leading-relaxed opacity-70"
          style={{ color: data.colors.secondary }}
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
              <p dir="ltr" className="text-[8px]" style={{ color: data.colors.secondary, margin: 0, lineHeight: 1.2, whiteSpace: 'nowrap' }}>{data.phone}</p>
            </div>
          )}
          {data.email && (
            <div className="flex items-center" style={{ gap: '8px', minHeight: '12px' }}>
              <div className="w-3 h-3 rounded flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${data.colors.primary}18` }}>
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: data.colors.primary }} />
              </div>
              <p dir="ltr" className="text-[8px]" style={{ color: data.colors.secondary, margin: 0, lineHeight: 1.2, whiteSpace: 'nowrap' }}>{data.email}</p>
            </div>
          )}
          {data.website && (
            <div className="flex items-center" style={{ gap: '8px', minHeight: '12px' }}>
              <div className="w-3 h-3 rounded flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${data.colors.primary}18` }}>
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: data.colors.primary }} />
              </div>
              <p dir="ltr" className="text-[8px]" style={{ color: data.colors.secondary, margin: 0, lineHeight: 1.2, whiteSpace: 'nowrap' }}>{data.website}</p>
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
