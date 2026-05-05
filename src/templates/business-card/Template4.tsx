import type { TemplateData } from '../../types/template';

export default function Template4({ data }: { data: TemplateData }) {
  return (
    <div 
      id="template-preview"
      className="relative overflow-hidden w-[340px] h-[220px] shadow-sm flex flex-col items-center justify-center p-8 text-center"
      style={{ backgroundColor: data.colors.bg, color: data.colors.primary }}
    >
      <div className="w-full border-t mb-2" style={{ borderColor: data.colors.accent }} />
      <div className="w-full border-t mb-6" style={{ borderColor: data.colors.accent }} />
      
      <h2 className="text-xl font-bold font-serif mb-1">{data.title}</h2>
      <p className="text-xs tracking-widest uppercase mb-4" style={{ color: data.colors.secondary }}>{data.subtitle}</p>
      
      <p className="text-[10px] font-bold mb-3">{data.description}</p>
      
      <div className="flex gap-3 text-[8px] justify-center w-full" style={{ color: data.colors.secondary }}>
        {data.phone && <span dir="ltr">{data.phone}</span>}
        {data.email && <span dir="ltr">{data.email}</span>}
        {data.website && <span dir="ltr">{data.website}</span>}
      </div>
      
      <div className="w-full border-t mt-6 mb-2" style={{ borderColor: data.colors.accent }} />
      <div className="w-full border-t" style={{ borderColor: data.colors.accent }} />
    </div>
  );
}
