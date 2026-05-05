import { Suspense, lazy } from 'react';
import type { TemplateData } from '../types/template';

interface TemplateRendererProps {
  categoryId: string;
  templateId: string;
  data: TemplateData;
}

// Lazy load templates based on category and id
const templates = {
  'business-card/1': lazy(() => import('../templates/business-card/Template1')),
  'business-card/2': lazy(() => import('../templates/business-card/Template2')),
  'business-card/3': lazy(() => import('../templates/business-card/Template3')),
  'business-card/4': lazy(() => import('../templates/business-card/Template4')),
  'ads/1': lazy(() => import('../templates/ads/Template1')),
  'ads/2': lazy(() => import('../templates/ads/Template2')),
  'ads/3': lazy(() => import('../templates/ads/Template3')),
  'ads/4': lazy(() => import('../templates/ads/Template4')),
  'wedding/1': lazy(() => import('../templates/wedding/Template1')),
  'wedding/2': lazy(() => import('../templates/wedding/Template2')),
  'wedding/3': lazy(() => import('../templates/wedding/Template3')),
  'wedding/4': lazy(() => import('../templates/wedding/Template4')),
  'specialized/1': lazy(() => import('../templates/specialized/Template1')),
  'specialized/2': lazy(() => import('../templates/specialized/Template2')),
  'specialized/3': lazy(() => import('../templates/specialized/Template3')),
  'specialized/4': lazy(() => import('../templates/specialized/Template4')),
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
  'business-card/5': lazy(() => import('../templates/business-card/Template5')),
  'business-card/6': lazy(() => import('../templates/business-card/Template6')),
  'business-card/7': lazy(() => import('../templates/business-card/Template7')),
  'business-card/8': lazy(() => import('../templates/business-card/Template8')),
  'wedding/5': lazy(() => import('../templates/wedding/Template5')),
  'wedding/6': lazy(() => import('../templates/wedding/Template6')),
  'wedding/7': lazy(() => import('../templates/wedding/Template7')),
  'wedding/8': lazy(() => import('../templates/wedding/Template8')),
  'wedding/9': lazy(() => import('../templates/wedding/Template9')),
  'wedding/10': lazy(() => import('../templates/wedding/Template10')),
  'wedding/11': lazy(() => import('../templates/wedding/Template11')),
};

export function TemplateRenderer({ categoryId, templateId, data }: TemplateRendererProps) {
  const key = `${categoryId}/${templateId}` as keyof typeof templates;
  const Component = templates[key];

  if (!Component) {
    return <div className="p-8 text-center text-red-500">القالب غير موجود</div>;
  }

  return (
    <Suspense fallback={<div className="p-12 text-center text-muted-foreground animate-pulse">جاري تحميل القالب...</div>}>
      <Component data={data} />
    </Suspense>
  );
}
