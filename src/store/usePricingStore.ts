import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { persistStorage } from '../lib/safeStorage';

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  priceYER: number;
  priceUSD: number;
  period: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
  color: 'green' | 'indigo' | 'purple';
}

const defaultPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'باقة 3 قوالب',
    description: 'مثالية لمن يريد تصميماً واحداً محدداً',
    priceYER: 1000,
    priceUSD: 2,
    period: 'مرة واحدة',
    features: [
      'اختر 3 قوالب من أي قائمة',
      'من جميع الفئات المتاحة',
      'تصدير PNG بجودة عالية',
      'تخصيص ألوان ونصوص وصور',
      'صالح للاستخدام الدائم',
    ],
    highlighted: false,
    color: 'green',
  },
  {
    id: 'weekly',
    name: 'الخطة الأسبوعية',
    description: 'مثالية للاستخدام القصير والمناسبات',
    priceYER: 3000,
    priceUSD: 6,
    period: 'أسبوع',
    features: [
      'وصول كامل لجميع القوالب',
      'تصدير PNG بجودة عالية',
      'تخصيص ألوان ونصوص وصور',
      'دعم فني خلال الأسبوع',
    ],
    highlighted: false,
    color: 'indigo',
  },
  {
    id: 'monthly',
    name: 'الخطة الشهرية',
    description: 'الأفضل للاستخدام المستمر والمحترفين',
    priceYER: 8000,
    priceUSD: 16,
    period: 'شهر',
    features: [
      'وصول كامل لجميع القوالب',
      'تصدير PNG بجودة عالية',
      'تخصيص ألوان ونصوص وصور',
      'دعم فني على مدار الشهر',
      'قوالب جديدة حصرية شهرياً',
    ],
    highlighted: true,
    badge: 'الأوفر',
    color: 'purple',
  },
];

interface PricingState {
  plans: PricingPlan[];
  updatePlan: (id: string, data: Partial<PricingPlan>) => void;
  updateFeature: (planId: string, index: number, value: string) => void;
  addFeature: (planId: string) => void;
  removeFeature: (planId: string, index: number) => void;
  resetToDefault: () => void;
}

export const usePricingStore = create<PricingState>()(
  persist(
    (set) => ({
      plans: defaultPlans,
      updatePlan: (id, data) =>
        set((state) => ({
          plans: state.plans.map((p) => (p.id === id ? { ...p, ...data } : p)),
        })),
      updateFeature: (planId, index, value) =>
        set((state) => ({
          plans: state.plans.map((p) => {
            if (p.id !== planId) return p;
            const features = [...p.features];
            features[index] = value;
            return { ...p, features };
          }),
        })),
      addFeature: (planId) =>
        set((state) => ({
          plans: state.plans.map((p) =>
            p.id === planId ? { ...p, features: [...p.features, ''] } : p
          ),
        })),
      removeFeature: (planId, index) =>
        set((state) => ({
          plans: state.plans.map((p) => {
            if (p.id !== planId) return p;
            const features = p.features.filter((_, i) => i !== index);
            return { ...p, features };
          }),
        })),
      resetToDefault: () => set({ plans: defaultPlans }),
    }),
    { name: 'pricing-storage', storage: persistStorage }
  )
);
