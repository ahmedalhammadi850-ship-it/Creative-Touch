import type { TemplateData } from '../../types/template';

export default function Template3({ data }: { data: TemplateData }) {
  return (
    <div 
      id="template-preview"
      className="relative overflow-hidden w-[340px] h-[220px] p-6 shadow-sm flex items-center justify-between"
      style={{ 
        background: `linear-gradient(135deg, ${data.colors.primary}, ${data.colors.secondary})`,
        color: data.colors.bg
      }}
    >
      <div 
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20"
        style={{ backgroundColor: data.colors.accent }}
      />
      <div 
        className="absolute -bottom-16 -left-10 w-48 h-48 rounded-full border-[10px] opacity-20"
        style={{ borderColor: data.colors.accent }}
      />
      
      <div className="z-10 flex-1 pl-4">
        <h2 className="text-2xl font-black mb-1">{data.title}</h2>
        <p className="text-xs opacity-90 font-medium">{data.subtitle}</p>
        <div className="mt-4 w-8 h-1 rounded" style={{ backgroundColor: data.colors.accent }} />
        <p className="text-xs mt-3 font-bold opacity-90">{data.description}</p>
      </div>
      
      <div className="z-10 text-[9px] space-y-1.5 text-left border-l pl-3" style={{ borderColor: `${data.colors.bg}40` }}>
        {data.phone && <p dir="ltr">{data.phone}</p>}
        {data.email && <p dir="ltr">{data.email}</p>}
        {data.website && <p dir="ltr">{data.website}</p>}
      </div>
    </div>
  );
}
