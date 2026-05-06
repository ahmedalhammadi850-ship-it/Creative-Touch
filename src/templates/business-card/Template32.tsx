import type { TemplateData } from '../../types/template';

export default function Template32({ data }: { data: TemplateData }) {
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[340px] h-[220px] flex shadow-lg"
      style={{ backgroundColor: '#111111' }}
    >
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '18px 18px' }}
      />

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 340 220" preserveAspectRatio="none">
        <polygon points="0,0 50,0 0,50" fill={data.colors.accent} />
        <polygon points="340,0 290,0 340,50" fill={data.colors.accent} />
        <polygon points="0,220 50,220 0,170" fill={data.colors.accent} />
        <polygon points="340,220 290,220 340,170" fill={data.colors.accent} />
      </svg>

      <div className="relative z-10 w-[120px] flex-shrink-0 flex flex-col items-center justify-center gap-3 p-4 border-r border-white/10">
        <div className="text-center">
          <p className="text-[7px] tracking-widest uppercase" style={{ color: data.colors.accent }}>
            {data.description?.split(',')[0] || 'شركة'}
          </p>
        </div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center gap-3 p-5 pr-6">
        <div>
          <h2 className="text-[20px] font-bold leading-tight text-white">{data.title}</h2>
          <p className="text-[11px] mt-0.5" style={{ color: data.colors.accent }}>{data.subtitle}</p>
        </div>

        <div className="w-16 h-px" style={{ backgroundColor: data.colors.accent }} />

        <div className="flex flex-col gap-1.5">
          {data.phone && (
            <div className="flex items-center justify-end gap-2">
              <p dir="ltr" className="text-[8px] text-white/70">{data.phone}</p>
              <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0" style={{ backgroundColor: data.colors.accent }}>
                <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
              </div>
            </div>
          )}
          {data.website && (
            <div className="flex items-center justify-end gap-2">
              <p dir="ltr" className="text-[8px] text-white/70">{data.website}</p>
              <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0" style={{ backgroundColor: data.colors.accent }}>
                <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
              </div>
            </div>
          )}
          {data.email && (
            <div className="flex items-center justify-end gap-2">
              <p dir="ltr" className="text-[8px] text-white/70">{data.email}</p>
              <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0" style={{ backgroundColor: data.colors.accent }}>
                <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
