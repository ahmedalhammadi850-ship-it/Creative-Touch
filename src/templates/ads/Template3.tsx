import type { TemplateData } from '../../types/template';

export default function Template3({ data }: { data: TemplateData }) {
  return (
    <div 
      id="template-preview"
      className="relative overflow-hidden w-[360px] h-[360px] flex flex-col items-center p-8 text-center"
      style={{ backgroundColor: data.colors.bg }}
    >
      <div 
        className="absolute top-0 right-0 w-full h-full transform translate-x-1/2 -translate-y-1/2 rotate-45"
        style={{ backgroundColor: data.colors.accent, opacity: 0.1 }}
      />
      
      <div 
        className="absolute top-6 left-[-40px] w-[200px] text-center py-1 transform -rotate-45 shadow-md font-bold text-sm"
        style={{ backgroundColor: data.colors.accent, color: data.colors.primary }}
      >
        {data.subtitle}
      </div>
      
      <div className="flex-1 flex flex-col justify-center items-center z-10 mt-8">
        <h2 className="text-5xl font-black mb-4 drop-shadow-md" style={{ color: data.colors.primary }}>{data.title}</h2>
        
        <div className="bg-white/80 p-4 rounded-lg shadow-sm border border-black/5 max-w-[90%]">
          <p className="text-base font-medium leading-relaxed" style={{ color: data.colors.secondary }}>{data.description}</p>
        </div>
      </div>
      
      {data.phone && (
        <div className="z-10 mt-auto w-full max-w-[200px] py-3 rounded-md shadow-lg font-bold text-xl" style={{ backgroundColor: data.colors.primary, color: data.colors.bg }}>
          <span dir="ltr">{data.phone}</span>
        </div>
      )}
    </div>
  );
}
