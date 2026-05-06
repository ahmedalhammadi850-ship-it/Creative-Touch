import type { TemplateData } from '../../types/template';

export default function Template4({ data }: { data: TemplateData }) {
  return (
    <div 
      id="template-preview"
      className="relative overflow-hidden w-[360px] h-[360px] flex items-center justify-center p-6"
      style={{ 
        background: `linear-gradient(135deg, ${data.colors.bg}, ${data.colors.secondary})`,
      }}
    >
      <div 
        className="absolute w-[320px] h-[320px] rounded-full border-[1px] opacity-30"
        style={{ borderColor: data.colors.primary }}
      />
      <div 
        className="absolute w-[300px] h-[300px] rounded-full border-[4px] opacity-20"
        style={{ borderColor: data.colors.accent }}
      />
      
      <div className="z-10 text-center w-full max-w-[280px] p-6 rounded-full aspect-square flex flex-col justify-center items-center shadow-lg border border-white/50" style={{ background: 'rgba(255,255,255,0.55)' }}>
        <h2 className="text-3xl font-bold mb-2 font-serif" style={{ color: data.colors.primary }}>{data.title}</h2>
        <div className="w-8 h-0.5 mx-auto mb-3" style={{ backgroundColor: data.colors.accent }} />
        <p className="text-sm font-medium mb-3 uppercase tracking-wider" style={{ color: data.colors.primary }}>{data.subtitle}</p>
        <p className="text-xs mb-4 leading-relaxed px-4 opacity-90" style={{ color: data.colors.primary }}>{data.description}</p>
        
        {data.phone && (
          <p dir="ltr" className="text-sm font-bold mt-2" style={{ color: data.colors.primary }}>{data.phone}</p>
        )}
      </div>
    </div>
  );
}
