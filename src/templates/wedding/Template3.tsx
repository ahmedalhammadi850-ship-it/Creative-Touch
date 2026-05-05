import type { TemplateData } from '../../types/template';

export default function Template3({ data }: { data: TemplateData }) {
  return (
    <div 
      id="template-preview"
      className="relative overflow-hidden w-[280px] h-[400px] flex flex-col items-center justify-center p-8 text-center shadow-sm"
      style={{ backgroundColor: data.colors.bg }}
    >
      {/* Floral-like corners using CSS shapes */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-40">
        <div className="absolute top-[-10px] right-[-10px] w-16 h-16 rounded-full" style={{ backgroundColor: data.colors.accent }} />
        <div className="absolute top-6 right-2 w-10 h-10 rounded-full" style={{ backgroundColor: data.colors.primary }} />
        <div className="absolute top-2 right-6 w-10 h-10 rounded-full" style={{ backgroundColor: data.colors.primary }} />
      </div>
      
      <div className="absolute bottom-0 left-0 w-20 h-20 opacity-40 transform rotate-180">
        <div className="absolute top-[-10px] right-[-10px] w-16 h-16 rounded-full" style={{ backgroundColor: data.colors.accent }} />
        <div className="absolute top-6 right-2 w-10 h-10 rounded-full" style={{ backgroundColor: data.colors.primary }} />
        <div className="absolute top-2 right-6 w-10 h-10 rounded-full" style={{ backgroundColor: data.colors.primary }} />
      </div>

      <div className="z-10 flex flex-col items-center flex-1 justify-center py-6 w-full">
        <p className="text-xs font-serif mb-6" style={{ color: data.colors.secondary }}>نتشرف بدعوتكم لحضور حفل زفاف</p>
        
        <h2 className="text-3xl font-serif font-bold w-full" style={{ color: data.colors.primary }}>{data.title}</h2>
        <div className="my-3 flex items-center justify-center gap-2">
          <div className="w-8 h-px" style={{ backgroundColor: data.colors.accent }} />
          <span className="text-lg" style={{ color: data.colors.primary }}>و</span>
          <div className="w-8 h-px" style={{ backgroundColor: data.colors.accent }} />
        </div>
        <h2 className="text-3xl font-serif font-bold w-full mb-8" style={{ color: data.colors.primary }}>{data.subtitle}</h2>
        
        <p className="text-xs font-serif leading-relaxed max-w-[220px]" style={{ color: data.colors.secondary }}>{data.description}</p>
      </div>
    </div>
  );
}
