import { Suspense, lazy } from 'react';
import type { TemplateData } from '../types/template';

interface TemplateRendererProps {
  categoryId: string;
  templateId: string;
  data: TemplateData;
}

const templates = {
  'mass-wedding/1': lazy(() => import('../templates/mass-wedding/Template1')),
  'mass-wedding/2': lazy(() => import('../templates/mass-wedding/Template2')),
  'mass-wedding/3': lazy(() => import('../templates/mass-wedding/Template3')),
  'mass-wedding/4': lazy(() => import('../templates/mass-wedding/Template4')),
  'mass-wedding/5': lazy(() => import('../templates/mass-wedding/Template5')),
  'mass-wedding/6': lazy(() => import('../templates/mass-wedding/Template6')),
  'mass-wedding/7': lazy(() => import('../templates/mass-wedding/Template7')),
  'mass-wedding/8': lazy(() => import('../templates/mass-wedding/Template8')),
  'mass-wedding/9': lazy(() => import('../templates/mass-wedding/Template9')),
  'mass-wedding/10': lazy(() => import('../templates/mass-wedding/Template10')),
  'mass-wedding/11': lazy(() => import('../templates/mass-wedding/Template11')),
  'mass-wedding/12': lazy(() => import('../templates/mass-wedding/Template12')),
  'mass-wedding/13': lazy(() => import('../templates/mass-wedding/Template13')),
  'business-card/1': lazy(() => import('../templates/business-card/Template1')),
  'business-card/2': lazy(() => import('../templates/business-card/Template2')),
  'business-card/3': lazy(() => import('../templates/business-card/Template3')),
  'business-card/4': lazy(() => import('../templates/business-card/Template4')),
  'business-card/5': lazy(() => import('../templates/business-card/Template5')),
  'business-card/6': lazy(() => import('../templates/business-card/Template6')),
  'business-card/7': lazy(() => import('../templates/business-card/Template7')),
  'business-card/8': lazy(() => import('../templates/business-card/Template8')),
  'business-card/9': lazy(() => import('../templates/business-card/Template9')),
  'business-card/10': lazy(() => import('../templates/business-card/Template10')),
  'business-card/11': lazy(() => import('../templates/business-card/Template11')),
  'business-card/12': lazy(() => import('../templates/business-card/Template12')),
  'business-card/13': lazy(() => import('../templates/business-card/Template13')),
  'business-card/14': lazy(() => import('../templates/business-card/Template14')),
  'business-card/15': lazy(() => import('../templates/business-card/Template15')),
  'business-card/16': lazy(() => import('../templates/business-card/Template16')),
  'business-card/17': lazy(() => import('../templates/business-card/Template17')),
  'business-card/18': lazy(() => import('../templates/business-card/Template18')),
  'business-card/19': lazy(() => import('../templates/business-card/Template19')),
  'business-card/20': lazy(() => import('../templates/business-card/Template20')),
  'business-card/21': lazy(() => import('../templates/business-card/Template21')),
  'business-card/22': lazy(() => import('../templates/business-card/Template21')),
  'business-card/23': lazy(() => import('../templates/business-card/Template21')),
  'business-card/24': lazy(() => import('../templates/business-card/Template21')),
  'business-card/25': lazy(() => import('../templates/business-card/Template21')),
  'business-card/26': lazy(() => import('../templates/business-card/Template21')),
  'business-card/27': lazy(() => import('../templates/business-card/Template21')),
  'business-card/28': lazy(() => import('../templates/business-card/Template21')),
  'business-card/29': lazy(() => import('../templates/business-card/Template21')),
  'business-card/30': lazy(() => import('../templates/business-card/Template21')),
  'business-card/31': lazy(() => import('../templates/business-card/Template31')),
  'business-card/32': lazy(() => import('../templates/business-card/Template32')),
  'business-card/33': lazy(() => import('../templates/business-card/Template33')),
  'business-card/34': lazy(() => import('../templates/business-card/Template34')),
  'business-card/35': lazy(() => import('../templates/business-card/Template35')),
  'business-card/36': lazy(() => import('../templates/business-card/Template36')),
  'business-card/37': lazy(() => import('../templates/business-card/Template37')),
  'business-card/38': lazy(() => import('../templates/business-card/Template38')),
  'business-card/39': lazy(() => import('../templates/business-card/Template39')),
  'business-card/40': lazy(() => import('../templates/business-card/Template40')),
  'business-card/41': lazy(() => import('../templates/business-card/Template41')),
  'business-card/42': lazy(() => import('../templates/business-card/Template42')),
  'business-card/43': lazy(() => import('../templates/business-card/Template43')),
  'ads/1': lazy(() => import('../templates/ads/Template1')),
  'ads/2': lazy(() => import('../templates/ads/Template2')),
  'ads/3': lazy(() => import('../templates/ads/Template3')),
  'ads/4': lazy(() => import('../templates/ads/Template4')),
  'ads/5': lazy(() => import('../templates/ads/Template5')),
  'ads/6': lazy(() => import('../templates/ads/Template6')),
  'ads/7': lazy(() => import('../templates/ads/Template7')),
  'ads/8': lazy(() => import('../templates/ads/Template8')),
  'ads/9': lazy(() => import('../templates/ads/Template9')),
  'ads/10': lazy(() => import('../templates/ads/Template10')),
  'ads/11': lazy(() => import('../templates/ads/Template11')),
  'ads/12': lazy(() => import('../templates/ads/Template12')),
  'wedding/1': lazy(() => import('../templates/wedding/Template1')),
  'wedding/2': lazy(() => import('../templates/wedding/Template2')),
  'wedding/3': lazy(() => import('../templates/wedding/Template3')),
  'wedding/4': lazy(() => import('../templates/wedding/Template4')),
  'wedding/5': lazy(() => import('../templates/wedding/Template5')),
  'wedding/6': lazy(() => import('../templates/wedding/Template6')),
  'wedding/7': lazy(() => import('../templates/wedding/Template7')),
  'wedding/8': lazy(() => import('../templates/wedding/Template8')),
  'wedding/9': lazy(() => import('../templates/wedding/Template9')),
  'wedding/10': lazy(() => import('../templates/wedding/Template10')),
  'wedding/11': lazy(() => import('../templates/wedding/Template11')),
  'wedding/12': lazy(() => import('../templates/wedding/Template12')),
  'wedding/13': lazy(() => import('../templates/wedding/Template13')),
  'wedding/14': lazy(() => import('../templates/wedding/Template14')),
  'wedding/15': lazy(() => import('../templates/wedding/Template15')),
  'wedding/16': lazy(() => import('../templates/wedding/Template16')),
  'wedding/17': lazy(() => import('../templates/wedding/Template17')),
  'wedding/18': lazy(() => import('../templates/wedding/Template18')),
  'wedding/19': lazy(() => import('../templates/wedding/Template19')),
  'wedding/20': lazy(() => import('../templates/wedding/Template20')),
  'wedding/21': lazy(() => import('../templates/wedding/Template21')),
  'wedding/22': lazy(() => import('../templates/wedding/Template22')),
  'wedding/23': lazy(() => import('../templates/wedding/Template23')),
  'wedding/24': lazy(() => import('../templates/wedding/Template24')),
  'wedding/25': lazy(() => import('../templates/wedding/Template25')),
  'wedding/26': lazy(() => import('../templates/wedding/Template26')),
  'wedding/27': lazy(() => import('../templates/wedding/Template27')),
  'wedding/28': lazy(() => import('../templates/wedding/Template28')),
  'wedding/29': lazy(() => import('../templates/wedding/Template29')),
  'wedding/30': lazy(() => import('../templates/wedding/Template30')),
  'wedding/31': lazy(() => import('../templates/wedding/Template31')),
  'wedding/32': lazy(() => import('../templates/wedding/Template32')),
  'specialized/1': lazy(() => import('../templates/specialized/Template1')),
  'specialized/2': lazy(() => import('../templates/specialized/Template2')),
  'specialized/3': lazy(() => import('../templates/specialized/Template3')),
  'specialized/4': lazy(() => import('../templates/specialized/Template4')),
  'specialized/5': lazy(() => import('../templates/specialized/Template5')),
  'specialized/6': lazy(() => import('../templates/specialized/Template6')),
  'specialized/7': lazy(() => import('../templates/specialized/Template7')),
  'specialized/8': lazy(() => import('../templates/specialized/Template8')),
  'specialized/9': lazy(() => import('../templates/specialized/Template9')),
  'specialized/10': lazy(() => import('../templates/specialized/Template10')),
  'specialized/11': lazy(() => import('../templates/specialized/Template11')),
  'specialized/12': lazy(() => import('../templates/specialized/Template12')),
  'specialized/13': lazy(() => import('../templates/specialized/Template13')),
  'specialized/14': lazy(() => import('../templates/specialized/Template14')),
  'specialized/15': lazy(() => import('../templates/specialized/Template15')),
  'specialized/16': lazy(() => import('../templates/specialized/Template16')),
  'specialized/17': lazy(() => import('../templates/specialized/Template17')),
  'specialized/18': lazy(() => import('../templates/specialized/Template18')),
  'specialized/19': lazy(() => import('../templates/specialized/Template19')),
  'specialized/20': lazy(() => import('../templates/specialized/Template20')),
  'specialized/21': lazy(() => import('../templates/specialized/Template21')),
  'specialized/22': lazy(() => import('../templates/specialized/Template22')),
  'specialized/23': lazy(() => import('../templates/specialized/Template23')),
  'specialized/24': lazy(() => import('../templates/specialized/Template24')),
  'congrats/1': lazy(() => import('../templates/congrats/Template1')),
  'congrats/2': lazy(() => import('../templates/congrats/Template2')),
  'congrats/3': lazy(() => import('../templates/congrats/Template3')),
  'congrats/4': lazy(() => import('../templates/congrats/Template4')),
  'congrats/5': lazy(() => import('../templates/congrats/Template5')),
  'congrats/6': lazy(() => import('../templates/congrats/Template6')),
  'congrats/7': lazy(() => import('../templates/congrats/Template7')),
  'congrats/8': lazy(() => import('../templates/congrats/Template8')),
  'congrats/9': lazy(() => import('../templates/congrats/Template9')),
  'congrats/10': lazy(() => import('../templates/congrats/Template10')),
  'congrats/11': lazy(() => import('../templates/congrats/Template11')),
  'congrats/12': lazy(() => import('../templates/congrats/Template12')),
  'congrats/13': lazy(() => import('../templates/congrats/Template13')),
  'congrats/14': lazy(() => import('../templates/congrats/Template14')),
  'congrats/15': lazy(() => import('../templates/congrats/Template15')),
  'congrats/16': lazy(() => import('../templates/congrats/Template16')),
  'congrats/17': lazy(() => import('../templates/congrats/Template17')),
  'congrats/18': lazy(() => import('../templates/congrats/Template18')),
  'congrats/19': lazy(() => import('../templates/congrats/Template19')),
  'congrats/20': lazy(() => import('../templates/congrats/Template20')),
  'congrats/21': lazy(() => import('../templates/congrats/Template21')),
  'congrats/22': lazy(() => import('../templates/congrats/Template22')),
  'congrats/23': lazy(() => import('../templates/congrats/Template23')),
  'congrats/24': lazy(() => import('../templates/congrats/Template24')),
  'congrats/25': lazy(() => import('../templates/congrats/Template25')),
  'congrats/26': lazy(() => import('../templates/congrats/Template26')),
  'congrats/27': lazy(() => import('../templates/congrats/Template27')),
  'congrats/28': lazy(() => import('../templates/congrats/Template28')),
  'congrats/29': lazy(() => import('../templates/congrats/Template29')),
};

export function TemplateRenderer({ categoryId, templateId, data }: TemplateRendererProps) {
  const key = `${categoryId}/${templateId}` as keyof typeof templates;
  const Component = templates[key];

  if (!Component) {
    return <div className="p-8 text-center text-red-500">القالب غير موجود</div>;
  }

  const isCongrats = categoryId === 'congrats';
  const extraLines = isCongrats
    ? (data.images || []).filter(v => v && typeof v === 'string' && !v.startsWith('data:image'))
    : [];

  return (
    <div id="export-target" style={{ position: 'relative', display: 'inline-block' }}>
      <Suspense fallback={<div className="p-12 text-center text-muted-foreground animate-pulse">جاري تحميل القالب...</div>}>
        <Component data={data} />
      </Suspense>

      {isCongrats && extraLines.filter(Boolean).length > 0 && (
        <div style={{
          position: 'absolute',
          bottom: 52,
          left: 10,
          right: 10,
          zIndex: 30,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
          pointerEvents: 'none',
          direction: 'rtl',
          fontFamily: "'Cairo', sans-serif",
        }}>
          {extraLines.filter(Boolean).map((line, i) => (
            <div key={i} style={{
              background: `${data.colors.primary}ee`,
              color: data.colors.accent,
              fontSize: 10,
              fontWeight: 700,
              padding: '4px 14px',
              borderRadius: 8,
              textAlign: 'center',
              border: `1px solid ${data.colors.accent}55`,
              boxShadow: `0 2px 8px rgba(0,0,0,0.4)`,
            }}>
              {line}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
