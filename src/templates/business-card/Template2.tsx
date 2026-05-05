import type { TemplateData } from '../../types/template';

export default function Template2({ data }: { data: TemplateData }) {
  return (
    <div 
      id="template-preview"
      className="relative overflow-hidden w-[340px] h-[220px] flex shadow-sm"
      style={{ backgroundColor: data.colors.bg }}
    >
      <div 
        className="w-4 h-full shrink-0"
        style={{ backgroundColor: data.colors.primary }}
      />
      
      <div className="flex flex-col justify-center flex-1 p-6">
        <div className="border-b-2 pb-3 mb-3" style={{ borderColor: data.colors.accent }}>
          <h2 className="text-xl font-bold" style={{ color: data.colors.primary }}>{data.title}</h2>
          <p className="text-xs font-medium" style={{ color: data.colors.secondary }}>{data.subtitle}</p>
        </div>
        
        <p className="text-xs mb-4 font-bold" style={{ color: data.colors.primary }}>{data.description}</p>
        
        <div className="text-[10px] space-y-1" style={{ color: data.colors.secondary }}>
          {data.phone && <p dir="ltr" className="text-right">{data.phone}</p>}
          {data.email && <p dir="ltr" className="text-right">{data.email}</p>}
          {data.website && <p dir="ltr" className="text-right">{data.website}</p>}
        </div>
      </div>
    </div>
  );
}
