import type { TemplateData } from '../../types/template';

export default function Template1({ data }: { data: TemplateData }) {
  return (
    <div 
      id="template-preview"
      className="relative overflow-hidden w-[360px] h-[360px] flex flex-col items-center justify-center p-8 text-center"
      style={{ backgroundColor: data.colors.primary, color: data.colors.bg }}
    >
      <div 
        className="absolute inset-4 border-2"
        style={{ borderColor: data.colors.accent }}
      />
      
      <div 
        className="absolute top-0 right-0 w-24 h-24"
        style={{ background: `linear-gradient(135deg, transparent 50%, ${data.colors.secondary} 50%)` }}
      />
      
      <div className="z-10 bg-black/10 backdrop-blur-sm p-6 w-full shadow-lg border border-white/20">
        <h2 className="text-3xl font-black mb-3 drop-shadow-md">{data.title}</h2>
        <div className="w-16 h-1 mx-auto mb-4" style={{ backgroundColor: data.colors.accent }} />
        <p className="text-lg font-bold mb-4 drop-shadow-sm">{data.subtitle}</p>
        <p className="text-sm opacity-90 mb-4 max-w-[80%] mx-auto leading-relaxed">{data.description}</p>
        
        {data.phone && (
          <div className="inline-block px-4 py-1.5 rounded-full text-sm font-bold shadow-md" style={{ backgroundColor: data.colors.accent, color: data.colors.primary }}>
            <span dir="ltr">{data.phone}</span>
          </div>
        )}
      </div>
    </div>
  );
}
