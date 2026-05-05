import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TemplateData } from '../types/template';

interface TemplateState {
  currentCategoryId: string | null;
  currentTemplateId: string | null;
  templateData: Record<string, TemplateData>;
  setTemplate: (categoryId: string, templateId: string) => void;
  updateData: (categoryId: string, templateId: string, data: Partial<TemplateData>) => void;
  resetData: (categoryId: string, templateId: string, defaultData: TemplateData) => void;
  duplicateTemplate: (categoryId: string, templateId: string) => void;
}

export const useTemplateStore = create<TemplateState>()(
  persist(
    (set) => ({
      currentCategoryId: null,
      currentTemplateId: null,
      templateData: {},
      setTemplate: (categoryId, templateId) =>
        set({ currentCategoryId: categoryId, currentTemplateId: templateId }),
      updateData: (categoryId, templateId, data) =>
        set((state) => {
          const key = `${categoryId}/${templateId}`;
          const current = state.templateData[key] || {} as TemplateData;
          return {
            templateData: {
              ...state.templateData,
              [key]: {
                ...current,
                ...data,
                colors: { ...current.colors, ...(data.colors || {}) }
              },
            },
          };
        }),
      resetData: (categoryId, templateId, defaultData) =>
        set((state) => ({
          templateData: {
            ...state.templateData,
            [`${categoryId}/${templateId}`]: defaultData,
          },
        })),
      duplicateTemplate: (categoryId, templateId) =>
        set((state) => {
          const key = `${categoryId}/${templateId}`;
          const newId = `${templateId}-copy-${Date.now()}`;
          const newKey = `${categoryId}/${newId}`;
          return {
            templateData: {
              ...state.templateData,
              [newKey]: state.templateData[key],
            },
            currentTemplateId: newId
          };
        }),
    }),
    {
      name: 'templates-storage',
    }
  )
);
