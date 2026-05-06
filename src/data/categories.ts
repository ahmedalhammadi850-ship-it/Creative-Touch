import type { TemplateData } from '../types/template';

export interface TemplateConfig {
  id: string;
  name: string;
  thumbnail?: string;
  defaultData: TemplateData;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  templates: TemplateConfig[];
}

const businessCardData: TemplateData = {
  title: "أحمد محمد",
  subtitle: "مدير تقني",
  description: "شركة الإبداع التقني",
  phone: "+966 50 123 4567",
  email: "ahmed@example.com",
  website: "www.example.com",
  colors: {
    primary: "#4f46e5",
    secondary: "#f43f5e",
    accent: "#eab308",
    bg: "#ffffff"
  }
};

const adsData: TemplateData = {
  title: "عرض لا يُفوَّت",
  subtitle: "احصل على خصم 50%",
  description: "اتصل بنا الآن واستفد من العرض الحصري المتاح لفترة محدودة",
  phone: "+966 50 123 4567",
  colors: {
    primary: "#ef4444",
    secondary: "#f59e0b",
    accent: "#3b82f6",
    bg: "#ffffff"
  }
};

const weddingData: TemplateData = {
  title: "نورة",
  subtitle: "عبدالله",
  description: "يسعدان بدعوتكم لحضور حفل زفافهما يوم الخميس الموافق ١٥ أكتوبر",
  colors: {
    primary: "#d946ef",
    secondary: "#ec4899",
    accent: "#fce7f3",
    bg: "#ffffff"
  }
};

const specializedData: TemplateData = {
  title: "رعاية كاملة لأسنانك",
  subtitle: "خدمة متكاملة بأسلوب حديث",
  description: "تنظيف وتلميع،تبييض بجلسة واحدة،حشوات تجميلية",
  phone: "+0123 456 789",
  email: "info@clinic.com",
  website: "www.clinic.com",
  colors: {
    primary: "#1a4b9c",
    secondary: "#1e3a8a",
    accent: "#fbbf24",
    bg: "#e8f4f8"
  }
};

const massWeddingDefaultData: TemplateData = {
  title: "مهرجان الفرح الجماعي الأول",
  subtitle: "يوم الجمعة ١٥ ذو الحجة ١٤٤٦\nقاعة الأفراح الكبرى - الرياض",
  description: "محمد & نورة\nعبدالله & سارة\nأحمد & فاطمة\nعلي & مريم\nخالد & هدى\nسامي & رنا",
  phone: "يوم الجمعة ١٥ ذو الحجة ١٤٤٦",
  website: "قاعة الأفراح الكبرى - الرياض",
  eventLabel: "دعوة عرس جماعي",
  images: [],
  colors: {
    primary: "#b8962e",
    secondary: "#1a0a00",
    accent: "#d4af37",
    bg: "#faf6ef"
  }
};

export const categories: Category[] = [
  {
    id: "mass-wedding",
    name: "عرس جماعي",
    description: "دعوات عرس جماعي فاخرة مع صور العرسان",
    templates: [
      {
        id: "1",
        name: "الملكي مع الصور",
        defaultData: {
          ...massWeddingDefaultData,
          colors: { primary: "#b8962e", secondary: "#1a0a00", accent: "#d4af37", bg: "#faf6ef" }
        }
      },
      {
        id: "2",
        name: "الفاخر الملون",
        defaultData: {
          ...massWeddingDefaultData,
          colors: { primary: "#9d174d", secondary: "#1e1b4b", accent: "#f9a8d4", bg: "#fff8f9" }
        }
      },
      {
        id: "3",
        name: "الليلي المضيء",
        defaultData: {
          ...massWeddingDefaultData,
          colors: { primary: "#c9a84c", secondary: "#f0e8d0", accent: "#f0d060", bg: "#0d1117" }
        }
      },
      {
        id: "4",
        name: "الفاخر الكلاسيكي",
        defaultData: {
          ...massWeddingDefaultData,
          colors: { primary: "#b8962e", secondary: "#2c1008", accent: "#e8c86a", bg: "#fdf6ef" }
        }
      },
      {
        id: "5",
        name: "العصري الجريء",
        defaultData: {
          ...massWeddingDefaultData,
          colors: { primary: "#1e1b4b", secondary: "#1e1b4b", accent: "#d4af37", bg: "#ffffff" }
        }
      },
      {
        id: "6",
        name: "الزمرد والذهب",
        defaultData: {
          ...massWeddingDefaultData,
          colors: { primary: "#c9a84c", secondary: "#e8dfc0", accent: "#d4af37", bg: "#0d2818" }
        }
      },
      {
        id: "7",
        name: "الأزرق العصري",
        defaultData: {
          ...massWeddingDefaultData,
          colors: { primary: "#4169e1", secondary: "#e8eef8", accent: "#90b4ff", bg: "#050e2b" }
        }
      },
      {
        id: "8",
        name: "الوردي الأنيق",
        defaultData: {
          ...massWeddingDefaultData,
          colors: { primary: "#8b1a3a", secondary: "#5a0e24", accent: "#c9a84c", bg: "#fdf0f5" }
        }
      },
      {
        id: "9",
        name: "النقي العصري",
        defaultData: {
          ...massWeddingDefaultData,
          colors: { primary: "#1a1a2e", secondary: "#0f3460", accent: "#e94560", bg: "#f8fafc" }
        }
      },
      {
        id: "10",
        name: "الداكن الفاخر",
        defaultData: {
          ...massWeddingDefaultData,
          colors: { primary: "#4a1d96", secondary: "#2e1065", accent: "#fbbf24", bg: "#0a0514" }
        }
      },
      {
        id: "11",
        name: "المنحدر المبهج",
        defaultData: {
          ...massWeddingDefaultData,
          colors: { primary: "#be185d", secondary: "#9d174d", accent: "#fde68a", bg: "#fff8f0" }
        }
      },
      {
        id: "12",
        name: "الملكي الكلاسيكي",
        defaultData: {
          ...massWeddingDefaultData,
          colors: { primary: "#0a1628", secondary: "#c9a84c", accent: "#c9a84c", bg: "#0a1628" }
        }
      },
      {
        id: "13",
        name: "العصري المذهب",
        defaultData: {
          ...massWeddingDefaultData,
          colors: { primary: "#b5838d", secondary: "#2d1b2e", accent: "#e8a598", bg: "#fdf8f5" }
        }
      }
    ]
  },
  {
    id: "business-card",
    name: "بطاقات الأعمال",
    description: "بطاقات احترافية لتمثيل هويتك المهنية",
    templates: [
      { id: "1", name: "الفاخر الداكن", defaultData: { ...businessCardData, colors: { primary: "#fbbf24", secondary: "#ffffff", accent: "#fbbf24", bg: "#1a1a2e" } } },
      { id: "2", name: "النظيف البسيط", defaultData: { ...businessCardData, colors: { primary: "#0d9488", secondary: "#1f2937", accent: "#ccfbf1", bg: "#ffffff" } } },
      { id: "3", name: "الجريء المبدع", defaultData: { ...businessCardData, colors: { primary: "#ec4899", secondary: "#8b5cf6", accent: "#ffffff", bg: "#ffffff" } } },
      { id: "4", name: "الشركة الأنيق", defaultData: { ...businessCardData, colors: { primary: "#1e3a8a", secondary: "#1e3a8a", accent: "#bfdbfe", bg: "#fdf6ec" } } },
      { id: "5", name: "داكن مع صورة", defaultData: { ...businessCardData, colors: { primary: "#6c22b8", secondary: "#3b0f7a", accent: "#e040fb", bg: "#0d0d0d" } } },
      { id: "6", name: "لوكس أبيض", defaultData: { ...businessCardData, colors: { primary: "#1a1a2e", secondary: "#16213e", accent: "#c9a84c", bg: "#ffffff" } } },
      { id: "7", name: "زجاجي متدرج", defaultData: { ...businessCardData, subtitle: "مطور برمجيات", colors: { primary: "#00b4d8", secondary: "#0077b6", accent: "#00f5d4", bg: "#1a0533" } } },
      { id: "8", name: "قطري منقسم", defaultData: { ...businessCardData, subtitle: "مدير مبيعات", colors: { primary: "#1e3a8a", secondary: "#1e40af", accent: "#fbbf24", bg: "#f5f5f5" } } },
      { id: "9", name: "متدرج مائل", defaultData: { ...businessCardData, colors: { primary: "#f97316", secondary: "#ea580c", accent: "#fde68a", bg: "#1e1b4b" } } },
      { id: "10", name: "نقطي بسيط", defaultData: { ...businessCardData, colors: { primary: "#0f766e", secondary: "#4b5563", accent: "#34d399", bg: "#f0fdf4" } } },
      { id: "11", name: "منقسم بدائري", defaultData: { ...businessCardData, colors: { primary: "#7c3aed", secondary: "#6d28d9", accent: "#c4b5fd", bg: "#faf5ff" } } },
      { id: "12", name: "الحدود المذهبة", defaultData: { ...businessCardData, colors: { primary: "#1a1a1a", secondary: "#2d2d2d", accent: "#c9a84c", bg: "#fffdf5" } } },
      { id: "13", name: "اللون المنقسم", defaultData: { ...businessCardData, colors: { primary: "#7c3aed", secondary: "#5b21b6", accent: "#fbbf24", bg: "#faf5ff" } } },
      { id: "14", name: "النيون التقني", defaultData: { ...businessCardData, colors: { primary: "#00b4d8", secondary: "#e8f4f8", accent: "#00f5d4", bg: "#03000f" } } },
      { id: "15", name: "الماسي الفاخر", defaultData: { ...businessCardData, colors: { primary: "#c9a84c", secondary: "#c9a84c", accent: "#c9a84c", bg: "#0a0a0a" } } },
      { id: "16", name: "المرمري العصري", defaultData: { ...businessCardData, colors: { primary: "#8b5e3c", secondary: "#3d2b1f", accent: "#c9a06a", bg: "#f9f5f0" } } },
      { id: "17", name: "الدائري العصري", defaultData: { ...businessCardData, colors: { primary: "#0d47a1", secondary: "#1565c0", accent: "#42a5f5", bg: "#f0f7ff" } } },
      { id: "18", name: "المنقسم الجانبي", defaultData: { ...businessCardData, colors: { primary: "#1b5e20", secondary: "#2e7d32", accent: "#a5d6a7", bg: "#ffffff" } } },
      { id: "19", name: "التدرج الجريء الجديد", defaultData: { ...businessCardData, colors: { primary: "#4a148c", secondary: "#6a1b9a", accent: "#ffffff", bg: "#4a148c" } } },
      { id: "20", name: "الداكن الزجاجي الفاخر", defaultData: { ...businessCardData, colors: { primary: "#c9a84c", secondary: "#c9a84c", accent: "#c9a84c", bg: "#0d0d0d" } } },
      { id: "21", name: "كلاسيك أزرق ملكي", defaultData: { ...businessCardData, colors: { primary: "#1e3a8a", secondary: "#1e3a8a", accent: "#fbbf24", bg: "#f8fafc" } } },
      { id: "22", name: "كلاسيك أخضر زمردي", defaultData: { ...businessCardData, colors: { primary: "#065f46", secondary: "#065f46", accent: "#34d399", bg: "#f0fdf4" } } },
      { id: "23", name: "كلاسيك برغندي فاخر", defaultData: { ...businessCardData, colors: { primary: "#881337", secondary: "#881337", accent: "#fda4af", bg: "#fff1f2" } } },
      { id: "24", name: "كلاسيك أسود ذهبي", defaultData: { ...businessCardData, colors: { primary: "#0f172a", secondary: "#1e293b", accent: "#c9a84c", bg: "#fafaf9" } } },
      { id: "25", name: "كلاسيك بنفسجي عصري", defaultData: { ...businessCardData, colors: { primary: "#5b21b6", secondary: "#5b21b6", accent: "#ddd6fe", bg: "#faf5ff" } } },
      { id: "26", name: "كلاسيك برتقالي حيوي", defaultData: { ...businessCardData, colors: { primary: "#c2410c", secondary: "#c2410c", accent: "#fed7aa", bg: "#fff7ed" } } },
      { id: "27", name: "كلاسيك سماوي نيون", defaultData: { ...businessCardData, colors: { primary: "#0e7490", secondary: "#0e7490", accent: "#22d3ee", bg: "#ecfeff" } } },
      { id: "28", name: "كلاسيك وردي أنثوي", defaultData: { ...businessCardData, colors: { primary: "#be185d", secondary: "#be185d", accent: "#f9a8d4", bg: "#fdf2f8" } } },
      { id: "29", name: "كلاسيك رمادي راقي", defaultData: { ...businessCardData, colors: { primary: "#374151", secondary: "#374151", accent: "#9ca3af", bg: "#f9fafb" } } },
      { id: "30", name: "كلاسيك داكن نيوني", defaultData: { ...businessCardData, colors: { primary: "#4ade80", secondary: "#bbf7d0", accent: "#4ade80", bg: "#0a0a0a" } } },
      { id: "31", name: "موجة زرقاء احترافية", defaultData: { ...businessCardData, colors: { primary: "#0ea5e9", secondary: "#1e3a5f", accent: "#f97316", bg: "#ffffff" } } },
      { id: "32", name: "داكن أحمر عربي", defaultData: { ...businessCardData, colors: { primary: "#111111", secondary: "#1a1a1a", accent: "#ef4444", bg: "#111111" } } },
      { id: "33", name: "داكن ذهبي احترافي", defaultData: { ...businessCardData, colors: { primary: "#1e2a3a", secondary: "#162030", accent: "#f59e0b", bg: "#0f1923" } } },
      { id: "34", name: "موجة ذهبية + شعار", defaultData: { ...businessCardData, colors: { primary: "#f59e0b", secondary: "#1e293b", accent: "#f97316", bg: "#ffffff" } } },
      { id: "35", name: "موجة داكنة + شعار", defaultData: { ...businessCardData, colors: { primary: "#1e293b", secondary: "#0f172a", accent: "#f59e0b", bg: "#1e293b" } } },
      { id: "36", name: "قوس رمادي + شعار", defaultData: { ...businessCardData, colors: { primary: "#374151", secondary: "#1f2937", accent: "#ef4444", bg: "#f3f4f6" } } },
      { id: "37", name: "موجة حمراء + شعار", defaultData: { ...businessCardData, colors: { primary: "#dc2626", secondary: "#991b1b", accent: "#dc2626", bg: "#ffffff" } } },
      { id: "38", name: "موجة برتقالية + شعار", defaultData: { ...businessCardData, colors: { primary: "#ea580c", secondary: "#9a3412", accent: "#fbbf24", bg: "#0f172a" } } },
      { id: "39", name: "موجة جانبية + شعار", defaultData: { ...businessCardData, colors: { primary: "#7c3aed", secondary: "#5b21b6", accent: "#a78bfa", bg: "#ffffff" } } },
      { id: "40", name: "نظيف خطوط + شعار", defaultData: { ...businessCardData, colors: { primary: "#0ea5e9", secondary: "#0369a1", accent: "#f59e0b", bg: "#ffffff" } } },
      { id: "41", name: "كرت خلفي — متدرج مركزي", defaultData: { ...businessCardData, description: "شركة الإبداع التقني", colors: { primary: "#4f46e5", secondary: "#3730a3", accent: "#fbbf24", bg: "#ffffff" } } },
      { id: "42", name: "كرت خلفي — منقسم جانبي", defaultData: { ...businessCardData, description: "شركة الإبداع التقني", colors: { primary: "#0f766e", secondary: "#134e4a", accent: "#34d399", bg: "#ffffff" } } },
      { id: "43", name: "كرت خلفي — داكن متوهج", defaultData: { ...businessCardData, description: "شركة الإبداع التقني", colors: { primary: "#7c3aed", secondary: "#5b21b6", accent: "#a78bfa", bg: "#0a0a0a" } } },
    ]
  },
  {
    id: "ads",
    name: "إعلانات التواصل",
    description: "تصاميم جذابة لحملاتك الإعلانية",
    templates: [
      { id: "1", name: "تسليط الضوء", defaultData: { ...adsData, colors: { primary: "#3b82f6", secondary: "#1d4ed8", accent: "#ffffff", bg: "#eff6ff" } } },
      { id: "2", name: "إعلان", defaultData: { ...adsData, colors: { primary: "#10b981", secondary: "#047857", accent: "#ffffff", bg: "#ffffff" } } },
      { id: "3", name: "عرض السعر", defaultData: { ...adsData, colors: { primary: "#f43f5e", secondary: "#e11d48", accent: "#ffffff", bg: "#ffe4e6" } } },
      { id: "4", name: "العلامة الفاخرة", defaultData: { ...adsData, colors: { primary: "#8b5cf6", secondary: "#c084fc", accent: "#ffffff", bg: "#f3e8ff" } } },
      { id: "5", name: "عرض محدود", defaultData: { ...adsData, colors: { primary: "#dc2626", secondary: "#b91c1c", accent: "#fcd34d", bg: "#0f172a" } } },
      { id: "6", name: "قائمة الخدمات", defaultData: { ...adsData, title: "خدماتنا المميزة", description: "تصميم احترافي،جودة عالية،تسليم سريع", colors: { primary: "#0f766e", secondary: "#134e4a", accent: "#2dd4bf", bg: "#f0fdf4" } } },
      { id: "7", name: "إعجاب العملاء", defaultData: { ...adsData, colors: { primary: "#1e40af", secondary: "#1e3a8a", accent: "#f59e0b", bg: "#f0f9ff" } } },
      { id: "8", name: "الخصم الجريء", defaultData: { ...adsData, title: "خصم 50%", colors: { primary: "#dc2626", secondary: "#991b1b", accent: "#fbbf24", bg: "#0a0505" } } },
      { id: "9", name: "الأنيق الفاتح", defaultData: { ...adsData, colors: { primary: "#0891b2", secondary: "#0e7490", accent: "#f59e0b", bg: "#f0f9ff" } } },
      { id: "10", name: "الليلي اللامع", defaultData: { ...adsData, colors: { primary: "#8b5cf6", secondary: "#7c3aed", accent: "#a78bfa", bg: "#0f0a1e" } } },
      { id: "11", name: "الهندسي الجريء", defaultData: { ...adsData, colors: { primary: "#1e3a5f", secondary: "#0f2640", accent: "#f59e0b", bg: "#f0f4f8" } } },
      { id: "12", name: "التدرجي المضيء", defaultData: { ...adsData, colors: { primary: "#7c3aed", secondary: "#e8d5f0", accent: "#fbbf24", bg: "#0a0514" } } }
    ]
  },
  {
    id: "wedding",
    name: "دعوات الزفاف",
    description: "دعوات زفاف أنيقة وكلاسيكية",
    templates: [
      { id: "1", name: "الرومانسي الكلاسيكي", defaultData: { ...weddingData, colors: { primary: "#d4af37", secondary: "#4a4a4a", accent: "#d4af37", bg: "#ffffff" } } },
      { id: "2", name: "الحديث البسيط", defaultData: { ...weddingData, colors: { primary: "#0f172a", secondary: "#4b5563", accent: "#94a3b8", bg: "#f8fafc" } } },
      { id: "3", name: "حديقة الزهور", defaultData: { ...weddingData, colors: { primary: "#166534", secondary: "#14532d", accent: "#86efac", bg: "#fef3c7" } } },
      { id: "4", name: "الملكي الداكن", defaultData: { ...weddingData, colors: { primary: "#1e1b4b", secondary: "#fcd34d", accent: "#fef3c7", bg: "#1e1b4b" } } },
      { id: "5", name: "زهور رومانسي", defaultData: { ...weddingData, title: "حفل زفاف", subtitle: "علي & فاطمة", description: "يسعدان بدعوتكم\nلحضور حفل زفافهما", colors: { primary: "#be185d", secondary: "#9d174d", accent: "#fbcfe8", bg: "#fff8f0" } } },
      { id: "6", name: "ليلة داكنة", defaultData: { ...weddingData, title: "عبدالله", subtitle: "& نورة", description: "دعوة زفاف ✦\nلحضور حفل الزفاف\n28 - 7 - 2025", colors: { primary: "#0c1a2e", secondary: "#1e3a5f", accent: "#c9a84c", bg: "#0c1a2e" } } },
      { id: "7", name: "ناعم مع صورة", defaultData: { ...weddingData, title: "خالد", subtitle: "& سارة", description: "حفل الزفاف والعشاء\nالجمعة\n15 - 8 - 2025", colors: { primary: "#7c3aed", secondary: "#5b21b6", accent: "#ddd6fe", bg: "#f8f4ef" } } },
      { id: "8", name: "عصري منقسم", defaultData: { ...weddingData, title: "عمر", subtitle: "& أميرة", description: "حفل الزفاف\n28 - 7 - 2025", colors: { primary: "#0f172a", secondary: "#1e3a8a", accent: "#c9a84c", bg: "#ffffff" } } },
      { id: "12", name: "نباتي طبيعي", defaultData: { ...weddingData, colors: { primary: "#166534", secondary: "#14532d", accent: "#d97706", bg: "#fefce8" } } },
      { id: "13", name: "ليلة النجوم", defaultData: { ...weddingData, colors: { primary: "#818cf8", secondary: "#6366f1", accent: "#fde68a", bg: "#0f0f1e" } } },
      { id: "14", name: "الذهبي الحديث", defaultData: { ...weddingData, colors: { primary: "#1e293b", secondary: "#334155", accent: "#f59e0b", bg: "#f8fafc" } } },
      { id: "15", name: "المينيمال النقي", defaultData: { ...weddingData, colors: { primary: "#1a1a1a", secondary: "#333333", accent: "#c9a84c", bg: "#fffef9" } } },
      { id: "16", name: "الداكن الرومانسي", defaultData: { ...weddingData, colors: { primary: "#4a1942", secondary: "#e8d5f0", accent: "#ffd700", bg: "#0f0414" } } },
      { id: "17", name: "الأخضر الطبيعي", defaultData: { ...weddingData, colors: { primary: "#2d5a27", secondary: "#1a3d15", accent: "#fbbf24", bg: "#f0f7ee" } } },
      { id: "18", name: "الملكي الداكن", defaultData: { ...weddingData, colors: { primary: "#0a1020", secondary: "#c9a84c", accent: "#c9a84c", bg: "#0a1020" } } },
      { id: "19", name: "الورود المائية", defaultData: { ...weddingData, colors: { primary: "#c9748a", secondary: "#7d2e46", accent: "#f4c2ce", bg: "#fdf5f7" } } },
      { id: "20", name: "الذهبي الفاخر الجديد", defaultData: { ...weddingData, colors: { primary: "#b8860b", secondary: "#5a3e1b", accent: "#ffd700", bg: "#fffbf0" } } },
      { id: "21", name: "الوردي الربيعي", defaultData: { ...weddingData, colors: { primary: "#c2185b", secondary: "#880e4f", accent: "#f8bbd0", bg: "#fce4ec" } } },
      { id: "22", name: "الأزرق الأنيق الجديد", defaultData: { ...weddingData, colors: { primary: "#1565c0", secondary: "#0d47a1", accent: "#90caf9", bg: "#e3f2fd" } } },
      { id: "23", name: "كريمي بزهور بيضاء", defaultData: { ...weddingData, title: "نورة", subtitle: "& عبدالله", description: "يسعدنا دعوتكم لحضور حفل زفافنا\nيوم الخميس ١٥ أكتوبر ٢٠٢٥\nقاعة الأفراح — الرياض", phone: "+966 50 123 4567", colors: { primary: "#8b6b4a", secondary: "#6b4e31", accent: "#c9a87c", bg: "#f8f4ef" } } },
      { id: "24", name: "دائري زهري فاتح", defaultData: { ...weddingData, title: "سارة", subtitle: "& خالد", description: "يشرفانكم بدعوتكم لحضور\nحفل زفافهما المبارك\nالجمعة ٢٠ سبتمبر ٢٠٢٥", phone: "+966 55 987 6543", website: "قاعة الأفراح", colors: { primary: "#c2748a", secondary: "#8b4560", accent: "#f4b8c8", bg: "#fdf5f7" } } },
      { id: "25", name: "داكن ذهبي إسلامي", defaultData: { ...weddingData, title: "محمد", subtitle: "& فاطمة", description: "يسعدان بدعوتكم الكريمة\nلحضور حفل الزفاف\nالسبت ٢٥ أكتوبر ١٤٤٧", phone: "+966 50 111 2222", colors: { primary: "#1a1508", secondary: "#0d0b04", accent: "#d4a832", bg: "#0f0c04" } } },
      { id: "26", name: "خط عربي كبير نباتي", defaultData: { ...weddingData, title: "باسم", subtitle: "علي", description: "يدعوانكم لحضور\nحفل زفافهما السعيد\nالجمعة ١٢ يناير ٢٠٢٦", phone: "+966 50 333 4444", colors: { primary: "#4a7c5a", secondary: "#2d5a3a", accent: "#a8c890", bg: "#faf8f5" } } },
      { id: "27", name: "ورود مائية مع خواتم", defaultData: { ...weddingData, title: "زاهي", subtitle: "سلمى", description: "يشرفانكم بدعوتكم\nلحضور حفل زفافهما", phone: "17 أكتوبر", website: "قاعة النخيل", colors: { primary: "#c27090", secondary: "#8a3c58", accent: "#f0b8c8", bg: "#fff9f9" } } },
      { id: "28", name: "نباتي أزرق أنيق", defaultData: { ...weddingData, title: "MY SUITE", subtitle: "& الحبيب", description: "يسعدنا دعوتكم لحضور\nحفل زفافنا المبارك\nالأحد ١٧ أغسطس ٢٠٢٥", phone: "17", website: "قاعة الياسمين", colors: { primary: "#3d7a7a", secondary: "#2a5858", accent: "#7fc4c4", bg: "#f6fbfc" } } },
      { id: "29", name: "داكن مع ورود وردية", defaultData: { ...weddingData, title: "جلال & أميرة", subtitle: "حفل الزفاف", description: "يسعدانكم بدعوتكم\nلحضور حفل زفافهما\nالجمعة ١٥ أغسطس ٢٠٢٥", phone: "+966 50 123 4567", colors: { primary: "#0d1b3a", secondary: "#132244", accent: "#c9a84c", bg: "#0d1b3a" } } },
      { id: "30", name: "ستائر مسرحية ذهبية", defaultData: { ...weddingData, title: "نورة", subtitle: "& خالد", description: "يشرفانكم بدعوتكم\nلحضور حفل الزفاف السعيد", phone: "25 - 06 - 2030", website: "قاعة الأفراح الكبرى", colors: { primary: "#8b3a4a", secondary: "#6b2a38", accent: "#c9a84c", bg: "#f2ead8" } } },
      { id: "31", name: "تدرج باستيل وإطار معيّن", defaultData: { ...weddingData, title: "معتاد", subtitle: "& سجود", description: "يسعدانكم بدعوتكم\nلحضور حفل زفافهما المبارك\nالسبت ٢٠ سبتمبر ٢٠٢٥", phone: "+966 53 614 4044", website: "www.sa1shop.com", colors: { primary: "#5a3a8a", secondary: "#3d2060", accent: "#c9a84c", bg: "#e8d8f8" } } },
      { id: "32", name: "أبيض مع رسمة زوجان", defaultData: { ...weddingData, title: "أحمد", subtitle: "والكلمة التالية", description: "يسعدنا دعوتكم لحضور حفل الزفاف", phone: "١٥ أكتوبر ٢٠٢٥", website: "قاعة النخيل", colors: { primary: "#8b5e3c", secondary: "#6b4428", accent: "#c9a870", bg: "#faf8f4" } } },
      {
        id: "9", name: "عرس جماعي - الكلاسيكي الملكي",
        defaultData: {
          title: "مهرجان الفرح الجماعي الأول",
          subtitle: "يوم الجمعة ١٥ ذو الحجة ١٤٤٦\nقاعة الأفراح الكبرى - الرياض",
          description: "محمد & نورة\nعبدالله & سارة\nأحمد & فاطمة\nعلي & مريم\nخالد & هدى\nسامي & رنا\nيوسف & أسماء\nعمر & ليلى\nحسن & منى\nكريم & نادية\nطارق & لينا\nوليد & دانة",
          phone: "١٥ ذو الحجة ١٤٤٦",
          email: "",
          website: "قاعة الأفراح الكبرى",
          colors: { primary: "#b8962e", secondary: "#2c1810", accent: "#d4af37", bg: "#faf6ef" }
        }
      },
      {
        id: "10", name: "عرس جماعي - العصري المبسط",
        defaultData: {
          title: "مهرجان الفرح الجماعي الأول",
          subtitle: "يوم الجمعة ١٥ ذو الحجة ١٤٤٦\nقاعة الأفراح الكبرى - الرياض",
          description: "محمد & نورة\nعبدالله & سارة\nأحمد & فاطمة\nعلي & مريم\nخالد & هدى\nسامي & رنا\nيوسف & أسماء\nعمر & ليلى\nحسن & منى\nكريم & نادية\nطارق & لينا\nوليد & دانة",
          phone: "١٥ ذو الحجة ١٤٤٦",
          email: "قاعة الأفراح الكبرى",
          website: "",
          colors: { primary: "#be185d", secondary: "#1e1b4b", accent: "#fbcfe8", bg: "#ffffff" }
        }
      },
      {
        id: "11", name: "عرس جماعي - الفني والملون",
        defaultData: {
          title: "مهرجان الفرح الجماعي الأول",
          subtitle: "يوم الجمعة ١٥ ذو الحجة ١٤٤٦\nقاعة الأفراح الكبرى - الرياض",
          description: "محمد & نورة\nعبدالله & سارة\nأحمد & فاطمة\nعلي & مريم\nخالد & هدى\nسامي & رنا\nيوسف & أسماء\nعمر & ليلى\nحسن & منى\nكريم & نادية\nطارق & لينا\nوليد & دانة",
          phone: "١٥ ذو الحجة ١٤٤٦",
          email: "قاعة الأفراح الكبرى",
          website: "",
          colors: { primary: "#9d174d", secondary: "#1e1b4b", accent: "#f9a8d4", bg: "#fff8f9" }
        }
      }
    ]
  },
  {
    id: "specialized",
    name: "عيادات ومراكز",
    description: "قوالب احترافية للعيادات والمراكز التعليمية",
    templates: [
      { id: "1", name: "عيادة احترافية", defaultData: { ...specializedData, colors: { primary: "#1a4b9c", secondary: "#1e3a8a", accent: "#fbbf24", bg: "#e8f4f8" } } },
      { id: "2", name: "مركز طبي مميز", defaultData: { ...specializedData, title: "Dream Clinic", subtitle: "ابتسامتك", description: "علاج الأسنان،تبييض الأسنان،ابتسامة هوليود،تيجان بورسلين،تيجان زيركونيوم", phone: "+90 535 081 96 31", email: "@dream_clinic", website: "Dream-Clinic", colors: { primary: "#1e40af", secondary: "#1d4ed8", accent: "#fcd34d", bg: "#eff6ff" } } },
      { id: "3", name: "مركز تعليمي", defaultData: { ...specializedData, title: "مركز الأمير التعليمي", subtitle: "نعلن عن بدء دوراتنا المركزة", description: "قاعات دراسية واسعة ومكيفة،دوام الطلاب منفصل عن الطالبات،أسعار مخففة وبالتقسيط", phone: "07826560604", colors: { primary: "#1e40af", secondary: "#3b82f6", accent: "#fbbf24", bg: "#dbeafe" } } },
      { id: "4", name: "أكاديمية تعليمية", defaultData: { ...specializedData, title: "أكاديمية المستقبل", subtitle: "الدولية", description: "خصم الأخوة،خصم الثقات،خصم حفظة القرآن،خصم القوات المسلحة", phone: "0778761241", colors: { primary: "#0369a1", secondary: "#0284c7", accent: "#fde047", bg: "#e0f2fe" } } },
      { id: "5", name: "صالون تجميل", defaultData: { ...specializedData, title: "ستايل بيوتي", subtitle: "صالون تجميل متكامل", description: "قص وتصفيف،صبغ وهايلايت،عناية بالبشرة،مانيكير وباديكير", phone: "0501234567", colors: { primary: "#be185d", secondary: "#9d174d", accent: "#fda4af", bg: "#fff1f2" } } },
      { id: "6", name: "تسويق عقاري", defaultData: { ...specializedData, title: "العقارية الذهبية", subtitle: "نبني أحلامك معنا", description: "بيع وشراء،إيجار سكني وتجاري،إدارة أملاك،استشارات عقارية", phone: "0556789012", colors: { primary: "#1e3a5f", secondary: "#0f2640", accent: "#f59e0b", bg: "#0a1628" } } },
      { id: "7", name: "مركز تدريبي", defaultData: { ...specializedData, title: "منارة التدريب", subtitle: "طريقك نحو التميز", description: "دورات مكثفة،مناهج معتمدة،شهادات معترف بها،مدربون خبراء", phone: "0523456789", colors: { primary: "#7c3aed", secondary: "#6d28d9", accent: "#fbbf24", bg: "#faf5ff" } } },
      { id: "8", name: "الاحترافي المعاصر", defaultData: { ...specializedData, colors: { primary: "#0369a1", secondary: "#0c4a6e", accent: "#38bdf8", bg: "#f0f9ff" } } },
      { id: "9", name: "المنقسم الجريء", defaultData: { ...specializedData, colors: { primary: "#dc2626", secondary: "#991b1b", accent: "#fbbf24", bg: "#fff7ed" } } },
      { id: "10", name: "الليلي الفاخر", defaultData: { ...specializedData, colors: { primary: "#8b5cf6", secondary: "#c4b5fd", accent: "#fbbf24", bg: "#0f0a1e" } } },
      { id: "11", name: "الزجاجي الشفاف", defaultData: { ...specializedData, colors: { primary: "#6366f1", secondary: "#e0e7ff", accent: "#a5f3fc", bg: "#0f0728" } } },
      { id: "12", name: "النيوني المتوهج", defaultData: { ...specializedData, colors: { primary: "#10b981", secondary: "#d1fae5", accent: "#34d399", bg: "#020f09" } } },
      {
        id: "13", name: "تسجيل المدرسة — كلاسيك",
        defaultData: {
          title: "مدرسة النور الأهلية",
          subtitle: "تسجيل العام الدراسي الجديد 1446 - 1447",
          description: "روضة وتمهيدي،المرحلة الابتدائية،المرحلة المتوسطة،المرحلة الثانوية",
          phone: "0501234567",
          email: "al-noor@school.edu",
          website: "www.alnoor-school.edu",
          colors: { primary: "#1e40af", secondary: "#1d4ed8", accent: "#fbbf24", bg: "#f8faff" }
        }
      },
      {
        id: "14", name: "تسجيل المدرسة — عصري",
        defaultData: {
          title: "مدرسة المستقبل",
          subtitle: "باب التسجيل مفتوح — انضم إلى عائلتنا",
          description: "الروضة والتمهيدي،الابتدائي البناء،المتوسطة الإبداعية،الثانوية المتميزة",
          phone: "0557654321",
          email: "info@mostaqbal.edu",
          website: "www.mostaqbal.edu",
          colors: { primary: "#0f4c81", secondary: "#1e6fad", accent: "#f59e0b", bg: "#f0f6ff" }
        }
      },
      {
        id: "15", name: "مزايا المدرسة — شبكة",
        defaultData: {
          title: "أكاديمية الإبداع",
          subtitle: "مدرسة أهلية متميزة — تعليم بمعايير دولية",
          description: "مناهج دولية معتمدة،معامل علوم وتقنية،أنشطة رياضية وفنية،تعليم اللغات الأجنبية،رحلات ومخيمات تعليمية,دعم نفسي واجتماعي",
          phone: "0509876543",
          email: "academy@ibda3.edu",
          website: "www.ibda3-academy.edu",
          colors: { primary: "#1a5f3c", secondary: "#2d8a5e", accent: "#fbbf24", bg: "#f0fdf4" }
        }
      },
      {
        id: "16", name: "مزايا المدرسة — قوائم",
        defaultData: {
          title: "مدرسة الرواد الدولية",
          subtitle: "نشكّل جيل المستقبل بأيدٍ خبيرة ورؤية واضحة",
          description: "بيئة تعليمية آمنة ومحفّزة،نسب نجاح تتجاوز 98%،معلمون مؤهلون ومتدرّبون،تقنيات حديثة في التعليم,اهتمام شخصي بكل طالب",
          phone: "0512345678",
          email: "info@rowad-intl.edu",
          website: "www.rowad-intl.edu",
          colors: { primary: "#7c2d12", secondary: "#b45309", accent: "#fde68a", bg: "#fff8f0" }
        }
      },
      {
        id: "17", name: "مدرسة احترافية — بانر",
        defaultData: {
          title: "مدرسة الأجيال الأهلية",
          subtitle: "تعليم متميز — مستقبل مشرق",
          description: "مناهج معتمدة دولياً،معلمون مؤهلون ومتخصصون،أنشطة رياضية وفنية متنوعة،معامل علوم وحاسب متطورة،رعاية نفسية واجتماعية,خصومات للأسر المتعددة",
          phone: "0501112233",
          email: "info@ajyal.edu",
          website: "www.ajyal-school.edu",
          fontSize: 14,
          colors: { primary: "#1e3a8a", secondary: "#1d4ed8", accent: "#fbbf24", bg: "#f0f6ff" }
        }
      },
      {
        id: "18", name: "مدرسة احترافية — أنيق",
        defaultData: {
          title: "أكاديمية النخبة",
          subtitle: "نشكّل العقول ونصنع القادة",
          description: "بيئة تعليمية آمنة ومحفّزة،مستوى أكاديمي رفيع ومتميز،تقنيات حديثة وسبورات ذكية،اهتمام فردي بكل طالب,رحلات ومخيمات تعليمية",
          phone: "0557778899",
          email: "info@nukhba.edu",
          website: "www.nukhba-academy.edu",
          fontSize: 14,
          colors: { primary: "#4f46e5", secondary: "#6366f1", accent: "#fbbf24", bg: "#f5f3ff" }
        }
      },
      {
        id: "19", name: "روضة أطفال — مرح ونمو",
        defaultData: {
          title: "روضة الأطفال المرحة",
          subtitle: "تعلم ممتع ونمو",
          description: "Fun Learning & Growth",
          phone: "0501234567",
          email: "info@kids-garden.edu",
          fontSize: 14,
          colors: { primary: "#d97706", secondary: "#f59e0b", accent: "#fde68a", bg: "#fff7e6" }
        }
      },
      {
        id: "20", name: "مدرسة ابتدائية — ستيم",
        defaultData: {
          title: "مدرسة المستقبل الابتدائية",
          subtitle: "برامج ستيم والقيادة",
          description: "برامج علوم ورياضيات،مهارات القيادة والتفكير،أنشطة تكنولوجيا وبرمجة،رحلات علمية تعليمية",
          phone: "0509876543",
          email: "info@stem-school.edu",
          fontSize: 14,
          colors: { primary: "#0891b2", secondary: "#0e7490", accent: "#f59e0b", bg: "#f0fbff" }
        }
      },
      {
        id: "21", name: "ثانوية ومعاهد — أكاديمي",
        defaultData: {
          title: "معهد التميز الأكاديمي",
          subtitle: "التحضير للجامعة والمستقبل",
          description: "التميز الأكاديمي،تأهيل جامعي متكامل،مسارات علمية وأدبية،تطوير مهارات القيادة",
          phone: "0551234567",
          email: "info@excellence.edu",
          fontSize: 14,
          colors: { primary: "#1e3a8a", secondary: "#1d4ed8", accent: "#f59e0b", bg: "#eff6ff" }
        }
      },
      {
        id: "22", name: "معهد لغات — تواصل مع العالم",
        defaultData: {
          title: "أكاديمية اللغات العالمية",
          subtitle: "معهد لغات",
          description: "إجادة اللغة الإنجليزية،الفرنسية والإسبانية،اللغة الصينية والألمانية,شهادات دولية معتمدة",
          phone: "0507654321",
          email: "info@lang-academy.edu",
          website: "www.global-scholars.edu",
          fontSize: 14,
          colors: { primary: "#1d4ed8", secondary: "#3b82f6", accent: "#f59e0b", bg: "#ffffff" }
        }
      },
      {
        id: "23", name: "معهد تقنية — مستقبلي",
        defaultData: {
          title: "معهد آفاق التكنولوجيا",
          subtitle: "طريقك للابتكار",
          description: "البرمجة والتطوير،الذكاء الاصطناعي,تصميم الجرافيك والUI،الأمن السيبراني",
          phone: "0503456789",
          email: "info@afaq-tech.edu",
          website: "www.afaq-tech.edu",
          fontSize: 14,
          colors: { primary: "#06b6d4", secondary: "#6366f1", accent: "#06b6d4", bg: "#050b1a" }
        }
      },
      {
        id: "24", name: "مركز إسلامي — قيم ومعرفة",
        defaultData: {
          title: "مركز النجاح التعليمي",
          subtitle: "مركز تحفيظ وعلوم إسلامية",
          description: "تحفيظ القرآن الكريم،تعليم الأحكام والتجويد،العلوم الإسلامية الأساسية,تربية الأخلاق والقيم",
          phone: "0512345678",
          email: "info@annajah.edu",
          website: "www.annajah-center.edu",
          fontSize: 14,
          colors: { primary: "#065f46", secondary: "#047857", accent: "#fbbf24", bg: "#fdf8f0" }
        }
      }
    ]
  },
  {
    id: "congrats",
    name: "بطاقات التهنئة",
    description: "بطاقات تهنئة للأفراح والمناسبات مع صورة شخصية",
    templates: [
      {
        id: "1", name: "تهنئة فاخرة",
        defaultData: {
          title: "محمد", subtitle: "يتشرف الوالد عمار بالدعوة", image: "",
          description: "وذلك بمناسبة زفافه الميمون\nألف ألف مبروك\nودام الله السرور",
          phone: "تهانينا", email: "أفراح عمار", website: "إهداء",
          colors: { primary: "#0d4a6e", secondary: "#0a3a5a", accent: "#4dd0e1", bg: "#061a25" }
        }
      },
      {
        id: "2", name: "ليلة العمر",
        defaultData: {
          title: "محمد", subtitle: "عمار بن صالح", image: "",
          description: "المقيل والزفة\nالجمعة 29.08.2025\nالمخا - مدينة الكهرباء",
          phone: "تهانينا", email: "أفراح عمار", website: "إهداء",
          colors: { primary: "#c8a85a", secondary: "#1a1a1a", accent: "#c8a85a", bg: "#0a0a0a" }
        }
      },
      {
        id: "3", name: "إطار الذكرى",
        defaultData: {
          title: "محمد", subtitle: "ابن الفاضل عمار القيسي", image: "",
          description: "بمناسبة زفافه الميمون ودخوله القفص الذهبي\nدامت أيامكم عامرة بالمسرات",
          phone: "تهانينا", email: "تهنئة مقدمة من عمار", website: "إهداء",
          colors: { primary: "#8b2020", secondary: "#6b1818", accent: "#c0392b", bg: "#fdf5e6" }
        }
      },
      {
        id: "4", name: "الليلة الحلوة",
        defaultData: {
          title: "محمد", subtitle: "الوالد عمار والعائلة الكريمة", image: "",
          description: "المقيل والزفة والسمرة\nyom Al-Arbia'a\n28-7-2021",
          phone: "تهانينا", email: "أفراح عمار", website: "إهداء",
          colors: { primary: "#2d5a27", secondary: "#1a3a1a", accent: "#c8a85a", bg: "#111" }
        }
      },
      {
        id: "5", name: "الإطار الذهبي",
        defaultData: {
          title: "محمد", subtitle: "محمد بن عمار", image: "",
          description: "المقيل والزفة والسمرة\nيوم الجمعة\n1 محرم 1447",
          phone: "تهانينا", email: "تهنئة خاصة من عمار", website: "إهداء",
          colors: { primary: "#1a3a5c", secondary: "#0f2640", accent: "#c9a84c", bg: "#f5f0e8" }
        }
      },
      {
        id: "6", name: "بطاقة سينمائية",
        defaultData: {
          title: "محمد", subtitle: "عمار بن سعيد", image: "",
          description: "المقيل والزفة\nالجمعة\n28 - 7 - 2025",
          phone: "تهانينا", email: "أفراح عمار", website: "إهداء",
          colors: { primary: "#1a1a2e", secondary: "#16213e", accent: "#e2b96f", bg: "#0f3460" }
        }
      },
      {
        id: "7", name: "الدائرة الملكية",
        defaultData: {
          title: "محمد", subtitle: "يتشرف الوالد عمار بالدعوة الكريمة", image: "",
          description: "المقيل والزفة\n28 - 7 - 2025",
          phone: "تهانينا", email: "أفراح عمار", website: "إهداء",
          colors: { primary: "#1a1a2e", secondary: "#2d1b69", accent: "#d4af37", bg: "#0d0d1a" }
        }
      },
      {
        id: "8", name: "قطري مودرن",
        defaultData: {
          title: "محمد", subtitle: "الوالد عمار علي", image: "",
          description: "المقيل والزفة\nyom Al-Ahad\n2 - 7 - 2023",
          phone: "تهانينا", email: "أفراح عمار", website: "إهداء",
          colors: { primary: "#1e4d8c", secondary: "#163a6b", accent: "#f0c040", bg: "#f0f4fa" }
        }
      },
      {
        id: "9", name: "الف مبروك",
        defaultData: {
          title: "محمد", subtitle: "عمار القيسي", image: "",
          description: "العائلة الكريمة\nيوم الجمعة\n10 - 7 - 2025",
          phone: "تهانينا", email: "أفراح عمار", website: "إهداء",
          colors: { primary: "#5a3a1a", secondary: "#3d2712", accent: "#c8922a", bg: "#f2ead8" }
        }
      },
      {
        id: "10", name: "ويدينج كلاسيك",
        defaultData: {
          title: "محمد", subtitle: "الشيخ عمار أحمد الخطابي", image: "",
          description: "المقيل والزفة والسمرة\nفي قاعة آية - شارع مالك دوحة آية\nيوم الأربعاء\n28-7-2021",
          phone: "تهانينا", email: "أفراح عمار", website: "إهداء",
          colors: { primary: "#0e2b1e", secondary: "#091a12", accent: "#c8a84b", bg: "#0e2b1e" }
        }
      },
      {
        id: "11", name: "عرسان مزدوج",
        defaultData: {
          title: "محمد & هيثم", subtitle: "بمناسبة زفافهم الميمون", image: "",
          description: "فألف ألف مبروك وبالرفاء والبنين\nتهنئة خاصة من\nصيدلية جارف\nGarf Pharmacy",
          phone: "", email: "أفراح المعلوم", website: "",
          colors: { primary: "#0d2240", secondary: "#091729", accent: "#c8a84b", bg: "#0d2240" }
        }
      },
      {
        id: "12", name: "صورة كاملة",
        defaultData: {
          title: "نسيد باشا", subtitle: "من قِبَل الشيخ عصام باشا", image: "",
          description: "حوالة فوق شركة جلب\n2023-7-2\nالمقيل والزفة والسمرة",
          phone: "", email: "أفراح آل باشا", website: "حوالة فوق شركة جلب",
          colors: { primary: "#1a1a00", secondary: "#2a2a00", accent: "#f0c040", bg: "#c8a84b" }
        }
      },
      {
        id: "13", name: "رملي بتاريخ 3D",
        defaultData: {
          title: "نسيم فضل باشا", subtitle: "تفضلي", image: "",
          description: "المقيل والسمرة - من نجل الشيخ عبدرب باشا\nالأحد\n2.7.2023",
          phone: "", email: "أفراح آل باشا", website: "خوالة فوق دوحة باب",
          colors: { primary: "#4a2c0a", secondary: "#7a5530", accent: "#c8922a", bg: "#d4b896" }
        }
      },
      {
        id: "14", name: "رملي يميني",
        defaultData: {
          title: "سامي باشا", subtitle: "تفضلي", image: "",
          description: "المقيل والزفة والسمرة - من نجل الشيخ\nالأحد\n28.7.2025",
          phone: "", email: "أفراح آل القيسي", website: "📍 قاعة الأفراح - المدينة",
          colors: { primary: "#3d2008", secondary: "#7a5030", accent: "#d4a030", bg: "#e8d5b7" }
        }
      },
      {
        id: "15", name: "رملي منقسم",
        defaultData: {
          title: "نسيم باشا", subtitle: "تفضلي", image: "",
          description: "المقيل والزفة والسمرة\nمن نجل الشيخ عبدرب باشا\nالأحد\n2.7.2023",
          phone: "", email: "أفراح آل باشا", website: "خوالة فوق دوحة باب",
          colors: { primary: "#3d1e05", secondary: "#8a5828", accent: "#c8902a", bg: "#e2c99a" }
        }
      },
      {
        id: "16", name: "رملي مركزي",
        defaultData: {
          title: "نسيم فضل باشا", subtitle: "تفضلي", image: "",
          description: "المقيل والسمرة - من نجل الشيخ عبدرب باشا\nالأحد\n2.7.2023",
          phone: "", email: "أفراح آل باشا", website: "خوالة فوق دوحة باب",
          colors: { primary: "#4a2c0a", secondary: "#b88c50", accent: "#c8922a", bg: "#dfc498" }
        }
      },
      {
        id: "17", name: "زجاجي عصري",
        defaultData: {
          title: "محمد", subtitle: "يتشرف الوالد بالدعوة الكريمة", image: "",
          description: "المقيل والزفة والسمرة\n28 - 7 - 2025",
          phone: "", email: "أفراح آل الحاج", website: "قاعة الملكية - الرياض",
          colors: { primary: "#6c22b8", secondary: "#3b0f7a", accent: "#e040fb", bg: "#0a0a0f" }
        }
      },
      {
        id: "18", name: "نيون داكن",
        defaultData: {
          title: "أحمد", subtitle: "يتشرف الوالد", image: "",
          description: "المقيل والزفة والسمرة\n28 - 7 - 2025",
          phone: "", email: "أفراح آل القيسي", website: "قاعة النخبة - جدة",
          colors: { primary: "#00b4d8", secondary: "#0077b6", accent: "#00f5d4", bg: "#08080f" }
        }
      },
      {
        id: "19", name: "منقسم أنيق",
        defaultData: {
          title: "محمد", subtitle: "يتشرف الوالد بالدعوة", image: "",
          description: "المقيل والزفة والسمرة\n28 - 7 - 2025",
          phone: "", email: "أفراح آل باشا", website: "قاعة الأفراح",
          colors: { primary: "#1a1a5e", secondary: "#0d0d4a", accent: "#ffd700", bg: "#f8f8f8" }
        }
      },
      {
        id: "20", name: "لوكس أبيض",
        defaultData: {
          title: "سامح", subtitle: "يتشرف الوالد بالدعوة الكريمة", image: "",
          description: "المقيل والزفة والسمرة\n28 - 7 - 2025",
          phone: "", email: "أفراح آل الحاج", website: "قاعة الأفراح",
          colors: { primary: "#1a1a2e", secondary: "#16213e", accent: "#c9a84c", bg: "#ffffff" }
        }
      },
      {
        id: "21", name: "احتفالي ملون",
        defaultData: {
          title: "عبدالرحمن", subtitle: "تهانينا القلبية", image: "",
          description: "بمناسبة هذا الإنجاز الرائع\nألف مبروك وعقبال المزيد\nبارك الله في مسيرتك",
          phone: "", email: "تهنئة خاصة", website: "",
          colors: { primary: "#7c3aed", secondary: "#5b21b6", accent: "#fbbf24", bg: "#1e1b4b" }
        }
      },
      {
        id: "22", name: "كلاسيكي فاخر",
        defaultData: {
          title: "محمود", subtitle: "ابن الأستاذ حمد القحطاني", image: "",
          description: "بمناسبة زفافه الميمون\nألف ألف مبروك\nودام الله السرور والهناء",
          phone: "", email: "تهنئة من الأسرة", website: "",
          colors: { primary: "#92400e", secondary: "#78350f", accent: "#d97706", bg: "#fef3c7" }
        }
      },
      {
        id: "23", name: "صورة كاملة عصري",
        defaultData: {
          title: "أحمد فهد", subtitle: "يتشرف العائلة بالدعوة", image: "",
          description: "حفل الزفاف\nيوم الجمعة\n15 - 7 - 2025",
          phone: "", email: "أفراح آل فهد", website: "قاعة النخبة",
          colors: { primary: "#0f172a", secondary: "#1e3a8a", accent: "#c9a84c", bg: "#f8fafc" }
        }
      },
      {
        id: "24", name: "التهنئة المبهجة",
        defaultData: {
          title: "عبدالله", subtitle: "ابن الشيخ محمد العمري", image: "",
          description: "بمناسبة زفافه الميمون\nألف ألف مبروك\nودام الله السرور والهناء",
          phone: "", email: "تهنئة خاصة من الأسرة", website: "",
          colors: { primary: "#7c3aed", secondary: "#6d28d9", accent: "#fde68a", bg: "#0f0b1e" }
        }
      },
      {
        id: "25", name: "المينيمال الأنيق",
        defaultData: {
          title: "سامح", subtitle: "يتشرف الوالد بالدعوة الكريمة", image: "",
          description: "المقيل والزفة والسمرة\nيوم الجمعة\n28 - 7 - 2025",
          phone: "", email: "أفراح آل الحاج", website: "قاعة الأفراح - المدينة",
          colors: { primary: "#1e293b", secondary: "#334155", accent: "#f59e0b", bg: "#f8fafc" }
        }
      },
      {
        id: "27", name: "الملكي المبهج",
        defaultData: {
          title: "ناصر", subtitle: "ابن الحاج عبدالله السالم", image: "",
          description: "بمناسبة حفل زفافه الميمون\nألف ألف مبروك\nبارك الله لكما وبارك عليكما",
          phone: "", email: "تهانينا من العائلة", website: "",
          colors: { primary: "#c9a84c", secondary: "#c9a84c", accent: "#c9a84c", bg: "#050918" }
        }
      },
      {
        id: "28", name: "الحديث البسيط",
        defaultData: {
          title: "فيصل", subtitle: "يتشرف الوالد بدعوتكم الكريمة", image: "",
          description: "بمناسبة زفاف نجله العزيز\nيوم الجمعة المبارك\nألف مبروك وبالرفاء والبنين",
          phone: "", email: "أفراح آل السلطان", website: "",
          colors: { primary: "#1e40af", secondary: "#1e3a8a", accent: "#fbbf24", bg: "#f0f6ff" }
        }
      },
      {
        id: "26", name: "الفاخر الداكن",
        defaultData: {
          title: "محمد", subtitle: "ابن الفاضل أحمد القيسي", image: "",
          description: "بمناسبة زفافه الميمون ودخوله القفص الذهبي\nألف مبروك وبالرفاء والبنين",
          phone: "", email: "تهنئة خاصة", website: "قاعة الملكية - الرياض",
          colors: { primary: "#92400e", secondary: "#c4b5fd", accent: "#c9a84c", bg: "#0a0800" }
        }
      },
      {
        id: "29", name: "أفراح يمنية - صورة كاملة",
        defaultData: {
          title: "أفراح الراعيني", subtitle: "عبدالرحمن الرعيني", image: "",
          description: "بمناسبة الزفاف قالف الف مبروك",
          phone: "تهانينا", email: "عمار ياسر المصطرف - صلاح حسن الحيمي", website: "إهداء",
          colors: { primary: "#c8a050", secondary: "#2a1a08", accent: "#f0d070", bg: "#3a2510" }
        }
      }
    ]
  }
];
