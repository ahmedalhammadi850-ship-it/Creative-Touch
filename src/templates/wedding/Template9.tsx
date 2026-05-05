import type { TemplateData } from '../../types/template';

export default function Template9({ data }: { data: TemplateData }) {
  const couples = data.description ? data.description.split('\n').filter(Boolean) : [];
  const mid = Math.ceil(couples.length / 2);
  const col1 = couples.slice(0, mid);
  const col2 = couples.slice(mid);

  return (
    <div
      id="template-preview"
      className="relative overflow-hidden flex flex-col items-center"
      style={{
        width: '280px',
        minHeight: '500px',
        backgroundColor: data.colors.bg,
        fontFamily: "'Georgia', 'Times New Roman', serif",
        direction: 'rtl',
      }}
    >
      {/* Arabesque corner - top right */}
      <svg className="absolute top-0 right-0" width="80" height="80" viewBox="0 0 80 80" fill="none">
        <path d="M80,0 Q60,0 60,20 Q60,40 40,40 Q20,40 20,60 Q0,60 0,80 L0,0 Z" fill={data.colors.primary} opacity="0.12" />
        <path d="M80,0 Q55,5 55,25 Q55,45 35,45 Q15,45 15,65 Q5,75 0,80" stroke={data.colors.primary} strokeWidth="0.8" fill="none" opacity="0.7" />
        <circle cx="70" cy="10" r="3" fill={data.colors.primary} opacity="0.5" />
        <circle cx="55" cy="25" r="2" fill={data.colors.primary} opacity="0.5" />
        <circle cx="40" cy="40" r="2" fill={data.colors.primary} opacity="0.5" />
        <circle cx="25" cy="55" r="2" fill={data.colors.primary} opacity="0.5" />
        <circle cx="10" cy="70" r="3" fill={data.colors.primary} opacity="0.5" />
        <path d="M65,5 Q70,15 60,20 Q50,25 55,35" stroke={data.colors.primary} strokeWidth="0.6" fill="none" opacity="0.5" />
        <path d="M5,75 Q15,70 20,60 Q25,50 35,55" stroke={data.colors.primary} strokeWidth="0.6" fill="none" opacity="0.5" />
      </svg>

      {/* Arabesque corner - top left */}
      <svg className="absolute top-0 left-0" width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ transform: 'scaleX(-1)' }}>
        <path d="M80,0 Q60,0 60,20 Q60,40 40,40 Q20,40 20,60 Q0,60 0,80 L0,0 Z" fill={data.colors.primary} opacity="0.12" />
        <path d="M80,0 Q55,5 55,25 Q55,45 35,45 Q15,45 15,65 Q5,75 0,80" stroke={data.colors.primary} strokeWidth="0.8" fill="none" opacity="0.7" />
        <circle cx="70" cy="10" r="3" fill={data.colors.primary} opacity="0.5" />
        <circle cx="55" cy="25" r="2" fill={data.colors.primary} opacity="0.5" />
        <circle cx="40" cy="40" r="2" fill={data.colors.primary} opacity="0.5" />
        <circle cx="25" cy="55" r="2" fill={data.colors.primary} opacity="0.5" />
        <circle cx="10" cy="70" r="3" fill={data.colors.primary} opacity="0.5" />
      </svg>

      {/* Arabesque corner - bottom right */}
      <svg className="absolute bottom-0 right-0" width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ transform: 'scaleY(-1)' }}>
        <path d="M80,0 Q60,0 60,20 Q60,40 40,40 Q20,40 20,60 Q0,60 0,80 L0,0 Z" fill={data.colors.primary} opacity="0.12" />
        <path d="M80,0 Q55,5 55,25 Q55,45 35,45 Q15,45 15,65 Q5,75 0,80" stroke={data.colors.primary} strokeWidth="0.8" fill="none" opacity="0.7" />
        <circle cx="70" cy="10" r="3" fill={data.colors.primary} opacity="0.5" />
        <circle cx="10" cy="70" r="3" fill={data.colors.primary} opacity="0.5" />
      </svg>

      {/* Arabesque corner - bottom left */}
      <svg className="absolute bottom-0 left-0" width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ transform: 'scale(-1,-1)' }}>
        <path d="M80,0 Q60,0 60,20 Q60,40 40,40 Q20,40 20,60 Q0,60 0,80 L0,0 Z" fill={data.colors.primary} opacity="0.12" />
        <path d="M80,0 Q55,5 55,25 Q55,45 35,45 Q15,45 15,65 Q5,75 0,80" stroke={data.colors.primary} strokeWidth="0.8" fill="none" opacity="0.7" />
        <circle cx="70" cy="10" r="3" fill={data.colors.primary} opacity="0.5" />
        <circle cx="10" cy="70" r="3" fill={data.colors.primary} opacity="0.5" />
      </svg>

      {/* Outer border */}
      <div className="absolute inset-2 pointer-events-none" style={{ border: `1.5px solid ${data.colors.primary}`, opacity: 0.5 }} />
      <div className="absolute inset-3 pointer-events-none" style={{ border: `0.5px solid ${data.colors.primary}`, opacity: 0.3 }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full px-6 py-5">

        {/* Bismillah */}
        <div className="text-center mb-1" style={{ color: data.colors.primary, fontSize: '10px', letterSpacing: '0.05em', opacity: 0.9 }}>
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </div>

        {/* Ornamental divider top */}
        <div className="flex items-center gap-1 mb-3 mt-1">
          <div style={{ width: '28px', height: '1px', background: `linear-gradient(to left, ${data.colors.primary}, transparent)` }} />
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7,1 L8.5,5.5 L13,7 L8.5,8.5 L7,13 L5.5,8.5 L1,7 L5.5,5.5 Z" fill={data.colors.primary} opacity="0.8" /></svg>
          <div style={{ width: '28px', height: '1px', background: `linear-gradient(to right, ${data.colors.primary}, transparent)` }} />
        </div>

        {/* Event title oval frame */}
        <div
          className="relative flex items-center justify-center mb-3 text-center px-4 py-3"
          style={{
            border: `2px solid ${data.colors.primary}`,
            borderRadius: '50%',
            width: '180px',
            height: '72px',
            background: `radial-gradient(ellipse at center, ${data.colors.primary}18 0%, transparent 70%)`,
          }}
        >
          {/* Inner oval */}
          <div
            className="absolute"
            style={{
              inset: '4px',
              border: `0.5px solid ${data.colors.primary}`,
              borderRadius: '50%',
              opacity: 0.4,
            }}
          />
          <span
            style={{
              color: data.colors.secondary,
              fontSize: '9px',
              fontWeight: 'bold',
              lineHeight: 1.4,
              position: 'relative',
              zIndex: 1,
              textAlign: 'center',
            }}
          >
            {data.title}
          </span>
        </div>

        {/* Subtitle (date/location) */}
        <div className="text-center mb-3" style={{ color: data.colors.secondary, fontSize: '7.5px', opacity: 0.85, lineHeight: 1.6 }}>
          {data.subtitle}
        </div>

        {/* Ornamental divider */}
        <div className="flex items-center gap-1 w-full mb-3">
          <div style={{ flex: 1, height: '1px', background: `linear-gradient(to left, ${data.colors.primary}88, transparent)` }} />
          <svg width="10" height="10" viewBox="0 0 10 10"><path d="M5,0 L6,3.5 L10,5 L6,6.5 L5,10 L4,6.5 L0,5 L4,3.5 Z" fill={data.colors.primary} opacity="0.7" /></svg>
          <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, ${data.colors.primary}88, transparent)` }} />
        </div>

        {/* Label */}
        <div className="text-center mb-2" style={{ color: data.colors.primary, fontSize: '7px', letterSpacing: '0.1em', opacity: 0.9 }}>
          ✦ قائمة العرسان ✦
        </div>

        {/* Couples list - two columns */}
        <div className="flex gap-2 w-full mb-3 justify-center">
          <div className="flex flex-col gap-1 flex-1">
            {col1.map((couple, i) => (
              <div key={i} className="flex items-center gap-1">
                <span style={{ color: data.colors.primary, fontSize: '6.5px', opacity: 0.7, minWidth: '10px' }}>
                  {i + 1}.
                </span>
                <span style={{ color: data.colors.secondary, fontSize: '7px', lineHeight: 1.4, fontWeight: '500' }}>
                  {couple}
                </span>
              </div>
            ))}
          </div>
          {col2.length > 0 && (
            <>
              <div style={{ width: '1px', background: `linear-gradient(to bottom, transparent, ${data.colors.primary}55, transparent)` }} />
              <div className="flex flex-col gap-1 flex-1">
                {col2.map((couple, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <span style={{ color: data.colors.primary, fontSize: '6.5px', opacity: 0.7, minWidth: '12px' }}>
                      {mid + i + 1}.
                    </span>
                    <span style={{ color: data.colors.secondary, fontSize: '7px', lineHeight: 1.4, fontWeight: '500' }}>
                      {couple}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Bottom ornament */}
        <div className="flex items-center gap-1 w-full mt-1">
          <div style={{ flex: 1, height: '1px', background: `linear-gradient(to left, ${data.colors.primary}88, transparent)` }} />
          <svg width="14" height="8" viewBox="0 0 14 8">
            <path d="M7,4 Q4,1 1,4 Q4,7 7,4 Q10,1 13,4 Q10,7 7,4 Z" fill={data.colors.primary} opacity="0.5" />
          </svg>
          <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, ${data.colors.primary}88, transparent)` }} />
        </div>

        {/* Phone / website */}
        {(data.phone || data.website) && (
          <div className="flex gap-3 mt-2 text-center justify-center">
            {data.phone && <span style={{ color: data.colors.secondary, fontSize: '6.5px', opacity: 0.7 }}>{data.phone}</span>}
            {data.website && <span style={{ color: data.colors.secondary, fontSize: '6.5px', opacity: 0.7 }}>{data.website}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
