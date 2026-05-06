import type { TemplateData } from '../../types/template';

export default function Template20({ data }: { data: TemplateData }) {
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[340px] h-[220px] flex flex-row shadow-lg"
      style={{ backgroundColor: '#0d0d0d' }}
    >
      <div
        className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full opacity-20"
        style={{ border: `1px solid ${data.colors.accent}`, background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)' }}
      />
      <div
        className="absolute -left-4 -bottom-4 w-24 h-24 rounded-full opacity-15"
        style={{ border: `1px solid ${data.colors.accent}` }}
      />
      <div
        className="absolute right-16 -top-10 w-36 h-36 rounded-full opacity-10"
        style={{ border: `1px solid ${data.colors.accent}`, background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)' }}
      />
      <div
        className="absolute right-24 -top-4 w-20 h-20 rounded-full opacity-10"
        style={{ border: `1px solid ${data.colors.accent}` }}
      />

      <div className="relative z-10 flex flex-col justify-between p-5 w-[55%] border-r border-white/10">
        <div>
          <p className="text-[8px] tracking-[0.2em] uppercase mb-1" style={{ color: data.colors.accent }}>
            {data.description || 'COMPANY NAME'}
          </p>
          <div className="w-8 h-px" style={{ backgroundColor: data.colors.accent }} />
        </div>
      </div>

      <div className="relative z-10 flex flex-col justify-between p-5 w-[45%]">
        <div>
          <h2 className="text-sm font-bold tracking-wide leading-tight" style={{ color: '#ffffff' }}>
            {data.title}
          </h2>
          <p className="text-[9px] mt-0.5 tracking-wider uppercase" style={{ color: data.colors.accent }}>
            {data.subtitle}
          </p>
        </div>

        <div className="flex flex-col gap-1">
          {data.phone && (
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: data.colors.accent }} />
              <p dir="ltr" className="text-[8px]" style={{ color: 'rgba(255,255,255,0.7)' }}>{data.phone}</p>
            </div>
          )}
          {data.email && (
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: data.colors.accent }} />
              <p dir="ltr" className="text-[8px]" style={{ color: 'rgba(255,255,255,0.7)' }}>{data.email}</p>
            </div>
          )}
          {data.website && (
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: data.colors.accent }} />
              <p dir="ltr" className="text-[8px]" style={{ color: 'rgba(255,255,255,0.7)' }}>{data.website}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
