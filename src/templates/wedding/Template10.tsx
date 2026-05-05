import type { TemplateData } from '../../types/template';

export default function Template10({ data }: { data: TemplateData }) {
  const couples = data.description ? data.description.split('\n').filter(Boolean) : [];

  return (
    <div
      id="template-preview"
      className="relative overflow-hidden flex flex-col"
      style={{
        width: '280px',
        minHeight: '500px',
        backgroundColor: data.colors.bg,
        fontFamily: "'Helvetica Neue', 'Arial', sans-serif",
        direction: 'rtl',
      }}
    >
      {/* Top accent bar */}
      <div style={{ height: '5px', background: `linear-gradient(to left, transparent, ${data.colors.primary}, ${data.colors.accent}, ${data.colors.primary}, transparent)` }} />

      {/* Side accent lines */}
      <div className="absolute top-5 bottom-5 right-0" style={{ width: '2.5px', background: `linear-gradient(to bottom, transparent, ${data.colors.primary}55, transparent)` }} />
      <div className="absolute top-5 bottom-5 left-0" style={{ width: '2.5px', background: `linear-gradient(to bottom, transparent, ${data.colors.primary}55, transparent)` }} />

      {/* Main content */}
      <div className="flex flex-col items-center px-8 py-5 flex-1">

        {/* Decorative top label */}
        <div
          className="mb-2 px-4 py-0.5 text-center"
          style={{
            border: `1px solid ${data.colors.primary}`,
            color: data.colors.primary,
            fontSize: '6.5px',
            letterSpacing: '0.15em',
          }}
        >
          دعوة عرس جماعي
        </div>

        {/* Main event title */}
        <h1
          className="text-center leading-tight mb-1 font-bold"
          style={{
            color: data.colors.secondary,
            fontSize: '14px',
            letterSpacing: '-0.01em',
          }}
        >
          {data.title}
        </h1>

        {/* Thin accent line under title */}
        <div className="mb-3 flex gap-0.5">
          <div style={{ width: '20px', height: '2px', backgroundColor: data.colors.primary }} />
          <div style={{ width: '8px', height: '2px', backgroundColor: data.colors.accent }} />
          <div style={{ width: '20px', height: '2px', backgroundColor: data.colors.primary }} />
        </div>

        {/* Subtitle (date/location) */}
        <div className="text-center mb-4" style={{ color: data.colors.secondary, fontSize: '7.5px', opacity: 0.7, lineHeight: 1.7, letterSpacing: '0.04em' }}>
          {data.subtitle}
        </div>

        {/* Separator */}
        <div className="w-full flex items-center gap-2 mb-3">
          <div style={{ flex: 1, height: '0.5px', backgroundColor: `${data.colors.primary}44` }} />
          <span style={{ color: data.colors.primary, fontSize: '8px' }}>✦</span>
          <div style={{ flex: 1, height: '0.5px', backgroundColor: `${data.colors.primary}44` }} />
        </div>

        {/* Couples list label */}
        <div className="text-center mb-2" style={{ color: data.colors.primary, fontSize: '7px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          العرسان الكرام
        </div>

        {/* Couples list - single elegant column */}
        <div className="w-full flex flex-col gap-1.5 mb-4">
          {couples.map((couple, i) => (
            <div
              key={i}
              className="flex items-center gap-2 w-full"
              style={{
                borderBottom: `0.5px solid ${data.colors.primary}22`,
                paddingBottom: '4px',
              }}
            >
              {/* Number badge */}
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  width: '14px',
                  height: '14px',
                  border: `0.5px solid ${data.colors.primary}`,
                  color: data.colors.primary,
                  fontSize: '6px',
                  borderRadius: '2px',
                }}
              >
                {i + 1}
              </div>
              {/* Couple name */}
              <span
                className="flex-1 text-right"
                style={{
                  color: data.colors.secondary,
                  fontSize: '8px',
                  lineHeight: 1.3,
                  fontWeight: i % 2 === 0 ? '500' : '400',
                }}
              >
                {couple}
              </span>
              {/* Accent dot */}
              <div style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: data.colors.accent, opacity: 0.8, flexShrink: 0 }} />
            </div>
          ))}
        </div>

        {/* Footer info */}
        {(data.phone || data.email || data.website) && (
          <div className="flex flex-col items-center gap-0.5 mt-auto">
            <div style={{ width: '40px', height: '0.5px', backgroundColor: `${data.colors.primary}55` }} className="mb-1" />
            {data.phone && <span style={{ color: data.colors.secondary, fontSize: '6.5px', opacity: 0.6 }}>{data.phone}</span>}
            {data.email && <span style={{ color: data.colors.secondary, fontSize: '6.5px', opacity: 0.6 }}>{data.email}</span>}
            {data.website && <span style={{ color: data.colors.secondary, fontSize: '6.5px', opacity: 0.6 }}>{data.website}</span>}
          </div>
        )}
      </div>

      {/* Bottom accent bar */}
      <div style={{ height: '5px', background: `linear-gradient(to right, transparent, ${data.colors.primary}, ${data.colors.accent}, ${data.colors.primary}, transparent)` }} />
    </div>
  );
}
