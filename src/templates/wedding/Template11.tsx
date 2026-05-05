import type { TemplateData } from '../../types/template';

export default function Template11({ data }: { data: TemplateData }) {
  const couples = data.description ? data.description.split('\n').filter(Boolean) : [];
  const mid = Math.ceil(couples.length / 2);
  const col1 = couples.slice(0, mid);
  const col2 = couples.slice(mid);

  return (
    <div
      id="template-preview"
      className="relative overflow-hidden flex flex-col"
      style={{
        width: '280px',
        minHeight: '500px',
        backgroundColor: data.colors.bg,
        fontFamily: "'Georgia', serif",
        direction: 'rtl',
      }}
    >
      {/* Watercolor floral background - top */}
      <svg className="absolute top-0 left-0 w-full" height="140" viewBox="0 0 280 140" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="floral-tl" cx="10%" cy="10%" r="50%">
            <stop offset="0%" stopColor={data.colors.primary} stopOpacity="0.35" />
            <stop offset="100%" stopColor={data.colors.primary} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="floral-tr" cx="90%" cy="10%" r="50%">
            <stop offset="0%" stopColor={data.colors.accent} stopOpacity="0.3" />
            <stop offset="100%" stopColor={data.colors.accent} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="280" height="140" fill="url(#floral-tl)" />
        <rect width="280" height="140" fill="url(#floral-tr)" />

        {/* Left bouquet */}
        <g transform="translate(10, 10)">
          <ellipse cx="20" cy="40" rx="18" ry="12" fill={data.colors.primary} opacity="0.18" transform="rotate(-30 20 40)" />
          <ellipse cx="10" cy="55" rx="14" ry="9" fill={data.colors.primary} opacity="0.14" transform="rotate(20 10 55)" />
          <circle cx="22" cy="28" r="8" fill={data.colors.primary} opacity="0.22" />
          <circle cx="8" cy="40" r="6" fill={data.colors.primary} opacity="0.2" />
          <circle cx="30" cy="50" r="5" fill={data.colors.accent} opacity="0.25" />
          {/* Flower petals */}
          {[0,60,120,180,240,300].map((angle, i) => (
            <ellipse key={i} cx={22 + 9 * Math.cos(angle * Math.PI/180)} cy={28 + 9 * Math.sin(angle * Math.PI/180)} rx="5" ry="3" fill={data.colors.primary} opacity="0.2" transform={`rotate(${angle} ${22 + 9 * Math.cos(angle * Math.PI/180)} ${28 + 9 * Math.sin(angle * Math.PI/180)})`} />
          ))}
          <circle cx="22" cy="28" r="4" fill={data.colors.accent} opacity="0.4" />
          {/* Leaves */}
          <ellipse cx="5" cy="70" rx="10" ry="5" fill="#86efac" opacity="0.35" transform="rotate(-40 5 70)" />
          <ellipse cx="35" cy="65" rx="9" ry="4" fill="#86efac" opacity="0.3" transform="rotate(20 35 65)" />
          <line x1="20" y1="80" x2="20" y2="55" stroke="#86efac" strokeWidth="1.5" opacity="0.5" />
          <line x1="8" y1="75" x2="8" y2="55" stroke="#86efac" strokeWidth="1" opacity="0.4" />
        </g>

        {/* Right bouquet */}
        <g transform="translate(230, 10)">
          <ellipse cx="20" cy="40" rx="18" ry="12" fill={data.colors.accent} opacity="0.18" transform="rotate(30 20 40)" />
          <ellipse cx="32" cy="55" rx="14" ry="9" fill={data.colors.accent} opacity="0.14" transform="rotate(-20 32 55)" />
          <circle cx="22" cy="28" r="8" fill={data.colors.accent} opacity="0.22" />
          <circle cx="36" cy="40" r="6" fill={data.colors.primary} opacity="0.2" />
          {[0,60,120,180,240,300].map((angle, i) => (
            <ellipse key={i} cx={22 + 9 * Math.cos(angle * Math.PI/180)} cy={28 + 9 * Math.sin(angle * Math.PI/180)} rx="5" ry="3" fill={data.colors.accent} opacity="0.2" transform={`rotate(${angle} ${22 + 9 * Math.cos(angle * Math.PI/180)} ${28 + 9 * Math.sin(angle * Math.PI/180)})`} />
          ))}
          <circle cx="22" cy="28" r="4" fill={data.colors.primary} opacity="0.4" />
          <ellipse cx="38" cy="70" rx="10" ry="5" fill="#86efac" opacity="0.35" transform="rotate(40 38 70)" />
          <ellipse cx="8" cy="65" rx="9" ry="4" fill="#86efac" opacity="0.3" transform="rotate(-20 8 65)" />
          <line x1="22" y1="80" x2="22" y2="55" stroke="#86efac" strokeWidth="1.5" opacity="0.5" />
        </g>

        {/* Scattered petals */}
        {[
          {x:80,y:15,r:4}, {x:100,y:8,r:3}, {x:150,y:5,r:5}, {x:180,y:20,r:3},
          {x:60,y:30,r:3}, {x:200,y:12,r:4}, {x:130,y:18,r:3},
        ].map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={p.r} fill={i % 2 === 0 ? data.colors.primary : data.colors.accent} opacity="0.2" />
        ))}

        {/* Scattered leaves */}
        {[{x:70,y:10},{x:130,y:20},{x:190,y:8}].map((l, i) => (
          <ellipse key={i} cx={l.x} cy={l.y} rx="7" ry="3" fill="#86efac" opacity="0.25" transform={`rotate(${-30 + i*30} ${l.x} ${l.y})`} />
        ))}
      </svg>

      {/* Watercolor floral background - bottom */}
      <svg className="absolute bottom-0 left-0 w-full" height="80" viewBox="0 0 280 80" preserveAspectRatio="xMidYMid slice">
        <g transform="translate(15, 0)">
          <circle cx="15" cy="55" r="7" fill={data.colors.primary} opacity="0.2" />
          {[0,72,144,216,288].map((a, i) => (
            <ellipse key={i} cx={15 + 8 * Math.cos(a * Math.PI/180)} cy={55 + 8 * Math.sin(a * Math.PI/180)} rx="4" ry="2.5" fill={data.colors.primary} opacity="0.18" transform={`rotate(${a} ${15 + 8 * Math.cos(a * Math.PI/180)} ${55 + 8 * Math.sin(a * Math.PI/180)})`} />
          ))}
          <ellipse cx="0" cy="70" rx="12" ry="5" fill="#86efac" opacity="0.3" transform="rotate(-20 0 70)" />
          <ellipse cx="30" cy="72" rx="9" ry="4" fill="#86efac" opacity="0.25" transform="rotate(15 30 72)" />
        </g>
        <g transform="translate(225, 0)">
          <circle cx="20" cy="55" r="7" fill={data.colors.accent} opacity="0.2" />
          {[0,72,144,216,288].map((a, i) => (
            <ellipse key={i} cx={20 + 8 * Math.cos(a * Math.PI/180)} cy={55 + 8 * Math.sin(a * Math.PI/180)} rx="4" ry="2.5" fill={data.colors.accent} opacity="0.18" transform={`rotate(${a} ${20 + 8 * Math.cos(a * Math.PI/180)} ${55 + 8 * Math.sin(a * Math.PI/180)})`} />
          ))}
          <ellipse cx="40" cy="70" rx="12" ry="5" fill="#86efac" opacity="0.3" transform="rotate(20 40 70)" />
          <ellipse cx="10" cy="72" rx="9" ry="4" fill="#86efac" opacity="0.25" transform="rotate(-15 10 72)" />
        </g>
      </svg>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full px-6 pt-10 pb-8">

        {/* Event name */}
        <div
          className="text-center mb-1 px-3 py-2 rounded"
          style={{
            background: 'rgba(255,255,255,0.82)',
            backdropFilter: 'blur(4px)',
            border: `1px solid ${data.colors.primary}55`,
          }}
        >
          <div style={{ color: data.colors.primary, fontSize: '7px', letterSpacing: '0.1em', marginBottom: '3px' }}>
            ✿ دعوة عرس جماعي ✿
          </div>
          <div
            style={{
              color: data.colors.secondary,
              fontSize: '12px',
              fontWeight: 'bold',
              lineHeight: 1.4,
            }}
          >
            {data.title}
          </div>
        </div>

        {/* Subtitle */}
        <div
          className="text-center mb-3 mt-2 px-2 py-1 rounded"
          style={{
            background: 'rgba(255,255,255,0.7)',
            color: data.colors.secondary,
            fontSize: '7px',
            lineHeight: 1.6,
            opacity: 0.9,
          }}
        >
          {data.subtitle}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-1 w-full mb-2">
          <div style={{ flex: 1, height: '1px', background: `linear-gradient(to left, ${data.colors.primary}88, transparent)` }} />
          <span style={{ color: data.colors.primary, fontSize: '10px' }}>❋</span>
          <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, ${data.colors.primary}88, transparent)` }} />
        </div>

        {/* Couples card */}
        <div
          className="w-full rounded p-3 mb-2"
          style={{
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(6px)',
            border: `1px solid ${data.colors.primary}33`,
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          }}
        >
          <div className="text-center mb-2" style={{ color: data.colors.primary, fontSize: '7px', letterSpacing: '0.1em' }}>
            قائمة العرسان السعداء
          </div>

          <div className="flex gap-2">
            {/* Column 1 */}
            <div className="flex flex-col gap-1 flex-1">
              {col1.map((couple, i) => (
                <div key={i} className="flex items-center gap-1">
                  <span style={{ color: data.colors.primary, fontSize: '6px', opacity: 0.8 }}>✦</span>
                  <span style={{ color: data.colors.secondary, fontSize: '7.5px', lineHeight: 1.3, fontWeight: '500' }}>{couple}</span>
                </div>
              ))}
            </div>
            {col2.length > 0 && (
              <>
                <div style={{ width: '1px', background: `linear-gradient(to bottom, transparent, ${data.colors.primary}44, transparent)` }} />
                {/* Column 2 */}
                <div className="flex flex-col gap-1 flex-1">
                  {col2.map((couple, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <span style={{ color: data.colors.accent, fontSize: '6px', opacity: 0.8 }}>✦</span>
                      <span style={{ color: data.colors.secondary, fontSize: '7.5px', lineHeight: 1.3, fontWeight: '500' }}>{couple}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        {(data.phone || data.email || data.website) && (
          <div
            className="text-center px-3 py-1.5 rounded mt-1"
            style={{
              background: 'rgba(255,255,255,0.75)',
              fontSize: '6.5px',
              color: data.colors.secondary,
              lineHeight: 1.8,
              opacity: 0.85,
            }}
          >
            {data.phone && <div>{data.phone}</div>}
            {data.email && <div>{data.email}</div>}
            {data.website && <div>{data.website}</div>}
          </div>
        )}
      </div>
    </div>
  );
}
