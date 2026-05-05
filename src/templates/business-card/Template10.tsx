import type { TemplateData } from '../../types/template';

export default function Template10({ data }: { data: TemplateData }) {
  return (
    <div id="template-preview" style={{ width: '340px', height: '220px', position: 'relative', overflow: 'hidden', fontFamily: "'Helvetica Neue', Arial, sans-serif", direction: 'rtl', backgroundColor: data.colors.bg, border: `1px solid ${data.colors.primary}22` }}>
      {/* Top color bar */}
      <div style={{ height: '6px', background: `linear-gradient(to left, ${data.colors.primary}, ${data.colors.accent})` }} />

      {/* Dot grid background */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06 }}>
        <defs>
          <pattern id="bc10-dots" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="7" cy="7" r="1" fill={data.colors.primary} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bc10-dots)" />
      </svg>

      <div style={{ position: 'relative', zIndex: 1, padding: '16px 22px', height: 'calc(100% - 6px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <div style={{ color: data.colors.primary, fontSize: '22px', fontWeight: '900', lineHeight: 1.1 }}>{data.title}</div>
              <div style={{ color: data.colors.secondary, fontSize: '11px', marginTop: '2px', opacity: 0.7 }}>{data.subtitle}</div>
            </div>
            {/* Logo placeholder circle */}
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: `linear-gradient(135deg, ${data.colors.primary}22, ${data.colors.accent}33)`, border: `2px solid ${data.colors.primary}44`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: data.colors.primary, opacity: 0.5 }} />
            </div>
          </div>
          <div style={{ color: data.colors.primary, fontSize: '9px', marginTop: '6px', fontWeight: '600', opacity: 0.75 }}>{data.description}</div>
        </div>

        <div style={{ borderTop: `1px solid ${data.colors.primary}22`, paddingTop: '10px' }}>
          <div style={{ display: 'flex', gap: '14px', fontSize: '9px', color: data.colors.secondary, opacity: 0.7 }} dir="ltr">
            {data.phone && <span>{data.phone}</span>}
            {data.email && <span>{data.email}</span>}
            {data.website && <span>{data.website}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
