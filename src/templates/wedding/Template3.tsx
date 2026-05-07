import type { TemplateData } from '../../types/template';

export default function Template3({ data }: { data: TemplateData }) {
  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[280px] h-[400px] flex flex-col items-center justify-center p-8 text-center shadow-sm"
      style={{ backgroundColor: data.colors.bg }}
    >
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
        <p className="font-serif mb-6" style={{ color: data.colors.secondary, fontSize: 12 + _d }}>نتشرف بدعوتكم لحضور حفل زفاف</p>

        <h2 className="font-serif font-bold w-full" style={{ color: data.colors.primary, fontSize: 30 + _d }}>{data.title}</h2>
        <div className="my-3 flex items-center justify-center gap-2">
          <div className="w-8 h-px" style={{ backgroundColor: data.colors.accent }} />
          <span className="font-serif" style={{ color: data.colors.primary, fontSize: 18 + _d }}>و</span>
          <div className="w-8 h-px" style={{ backgroundColor: data.colors.accent }} />
        </div>
        <h2 className="font-serif font-bold w-full mb-8" style={{ color: data.colors.primary, fontSize: 30 + _d }}>{data.subtitle}</h2>

        <p className="font-serif leading-relaxed max-w-[220px]" style={{ color: data.colors.secondary, fontSize: 12 + _d }}>{data.description}</p>
      </div>
    </div>
  );
}
