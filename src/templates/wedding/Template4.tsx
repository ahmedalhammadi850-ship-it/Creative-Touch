import type { TemplateData } from '../../types/template';

export default function Template4({ data }: { data: TemplateData }) {
  return (
    <div 
      id="template-preview"
      className="relative overflow-hidden w-[280px] h-[400px] flex flex-col items-center p-6 text-center shadow-md"
      style={{ backgroundColor: data.colors.bg, color: data.colors.accent }}
    >
      <div 
        className="absolute inset-2 border-[3px] border-double rounded-lg opacity-80"
        style={{ borderColor: data.colors.secondary }}
      />
      
      <div className="z-10 mt-8 mb-6 relative">
        <div className="w-12 h-12 mx-auto rotate-45 border flex items-center justify-center opacity-80" style={{ borderColor: data.colors.secondary }}>
          <div className="w-8 h-8 border" style={{ borderColor: data.colors.secondary }} />
        </div>
      </div>
      
      <div className="z-10 flex flex-col items-center justify-center flex-1 w-full gap-2">
        <h2 className="text-4xl font-serif w-full drop-shadow-md" style={{ color: data.colors.accent }}>{data.title}</h2>
        <div className="h-4 w-px my-1 opacity-60" style={{ backgroundColor: data.colors.secondary }} />
        <h2 className="text-4xl font-serif w-full drop-shadow-md" style={{ color: data.colors.accent }}>{data.subtitle}</h2>
      </div>
      
      <div className="z-10 mt-auto mb-8 w-full">
        <div className="w-full flex justify-center mb-3 opacity-60">
          <div className="w-16 h-px" style={{ backgroundColor: data.colors.secondary }} />
        </div>
        <p className="text-xs font-serif leading-relaxed max-w-[200px] mx-auto opacity-90">{data.description}</p>
      </div>
    </div>
  );
}
