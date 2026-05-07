import type { TemplateData } from '../../types/template';

export default function Template2({ data }: { data: TemplateData }) {
  const _d = (data.fontSize ?? 21) - 21;
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[280px] h-[400px] flex flex-col shadow-sm"
      style={{ backgroundColor: data.colors.bg }}
    >
      <div className="h-6 w-full" style={{ backgroundColor: data.colors.primary }} />

      <div className="flex-1 flex flex-col items-center p-8 mt-4">
        <p className="tracking-[0.2em] uppercase font-bold mb-10" style={{ color: data.colors.secondary, fontSize: 10 + _d }}>دعوة زفاف</p>

        <div className="flex flex-col items-center justify-center flex-1 w-full">
          <h2 className="font-black mb-2" style={{ color: data.colors.primary, fontSize: 36 + _d }}>{data.title}</h2>
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-white mb-2 shadow-sm"
            style={{ backgroundColor: data.colors.accent, fontSize: 12 + _d }}
          >+</div>
          <h2 className="font-black" style={{ color: data.colors.primary, fontSize: 36 + _d }}>{data.subtitle}</h2>
        </div>

        <div className="w-full mt-10 p-4 rounded-lg bg-black/5 text-center">
          <p className="font-medium leading-relaxed" style={{ color: data.colors.secondary, fontSize: 12 + _d }}>{data.description}</p>
        </div>
      </div>
    </div>
  );
}
