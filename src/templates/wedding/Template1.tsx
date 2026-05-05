import type { TemplateData } from '../../types/template';

export default function Template1({ data }: { data: TemplateData }) {
  return (
    <div 
      id="template-preview"
      className="relative overflow-hidden w-[280px] h-[400px] flex flex-col items-center justify-center p-8 text-center shadow-sm"
      style={{ backgroundColor: data.colors.bg }}
    >
      <div 
        className="absolute inset-3 border"
        style={{ borderColor: data.colors.primary, opacity: 0.8 }}
      />
      <div 
        className="absolute inset-4 border"
        style={{ borderColor: data.colors.accent, opacity: 0.5 }}
      />
      
      <div className="z-10 mb-8 mt-4 text-xs tracking-widest font-serif" style={{ color: data.colors.secondary }}>
        دعوة زفاف
      </div>
      
      <div className="z-10 flex flex-col items-center justify-center flex-1 w-full gap-4">
        <h2 className="text-3xl font-serif text-center w-full" style={{ color: data.colors.primary }}>{data.title}</h2>
        <span className="text-xl font-serif italic" style={{ color: data.colors.accent }}>و</span>
        <h2 className="text-3xl font-serif text-center w-full" style={{ color: data.colors.primary }}>{data.subtitle}</h2>
      </div>
      
      <div className="z-10 mt-8 mb-4 max-w-[200px]">
        <div className="w-12 h-px mx-auto mb-4" style={{ backgroundColor: data.colors.primary }} />
        <p className="text-xs leading-relaxed font-serif text-center" style={{ color: data.colors.secondary }}>{data.description}</p>
      </div>
    </div>
  );
}
