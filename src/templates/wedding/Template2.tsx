import type { TemplateData } from '../../types/template';

export default function Template2({ data }: { data: TemplateData }) {
  return (
    <div 
      id="template-preview"
      className="relative overflow-hidden w-[280px] h-[400px] flex flex-col shadow-sm"
      style={{ backgroundColor: data.colors.bg }}
    >
      <div 
        className="h-6 w-full"
        style={{ backgroundColor: data.colors.primary }}
      />
      
      <div className="flex-1 flex flex-col items-center p-8 mt-4">
        <p className="text-[10px] tracking-[0.2em] uppercase font-bold mb-10" style={{ color: data.colors.secondary }}>دعوة زفاف</p>
        
        <div className="flex flex-col items-center justify-center flex-1 w-full">
          <h2 className="text-4xl font-black mb-2" style={{ color: data.colors.primary }}>{data.title}</h2>
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white mb-2 shadow-sm" style={{ backgroundColor: data.colors.accent }}>+</div>
          <h2 className="text-4xl font-black" style={{ color: data.colors.primary }}>{data.subtitle}</h2>
        </div>
        
        <div className="w-full mt-10 p-4 rounded-lg bg-black/5 text-center">
          <p className="text-xs font-medium leading-relaxed" style={{ color: data.colors.secondary }}>{data.description}</p>
        </div>
      </div>
    </div>
  );
}
