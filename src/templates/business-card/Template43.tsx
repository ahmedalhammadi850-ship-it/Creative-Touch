import type { TemplateData } from '../../types/template';

export default function Template43({ data }: { data: TemplateData }) {
  const _d = (data.fontSize ?? 16) - 16;
  return (
    <div
      id="template-preview"
      className="relative overflow-hidden w-[340px] h-[220px] flex flex-col items-center justify-between py-5 px-8"
      style={{ backgroundColor: '#0a0a0a', fontFamily: 'Cairo, sans-serif' }}
    >
      {/* Glowing bg orb — using radial-gradient (compatible with html2canvas) */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 280,
          height: 280,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, ${data.colors.primary}55 0%, ${data.colors.primary}22 40%, transparent 70%)`,
        }}
      />

      {/* Top row: subtle brand line */}
      <div className="flex items-center gap-3 z-10 w-full justify-center">
        <div className="flex-1 h-[1px] opacity-20" style={{ background: data.colors.accent }} />
        <span className="font-bold tracking-[0.3em] uppercase opacity-50" style={{ color: data.colors.accent, fontSize: 8 + _d }}>
          {data.website ? data.website.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0] : 'business'}
        </span>
        <div className="flex-1 h-[1px] opacity-20" style={{ background: data.colors.accent }} />
      </div>

      {/* Center: logo + name */}
      <div className="flex flex-col items-center gap-2 z-10">
        {data.logo && (
          <img src={data.logo} alt="logo" className="w-16 h-16 object-contain rounded-2xl mb-1" style={{ boxShadow: `0 0 12px ${data.colors.primary}88` }} />
        )}
        <h2 className="font-black tracking-wide text-center" style={{ color: '#ffffff', fontSize: 18 + _d }}>
          {data.description || 'شركة الإبداع التقني'}
        </h2>
        <p className="font-semibold tracking-widest uppercase text-center" style={{ color: data.colors.accent, fontSize: 9 + _d }}>
          {data.subtitle || 'مدير تقني'}
        </p>
      </div>

      {/* Bottom contact row */}
      <div className="flex items-center gap-4 z-10">
        {data.phone && (
          <p dir="ltr" className="font-bold" style={{ color: '#ffffff88', fontSize: 8 + _d }}>{data.phone}</p>
        )}
        {data.phone && data.website && (
          <div className="w-1 h-1 rounded-full" style={{ background: data.colors.accent }} />
        )}
        {data.website && (
          <p dir="ltr" className="font-bold" style={{ color: data.colors.accent, fontSize: 8 + _d }}>{data.website}</p>
        )}
      </div>
    </div>
  );
}
