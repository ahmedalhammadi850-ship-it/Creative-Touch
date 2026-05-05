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
      { id: "8", name: "قطري منقسم", defaultData: { ...businessCardData, subtitle: "مدير مبيعات", colors: { primary: "#1e3a8a", secondary: "#1e40af", accent: "#fbbf24", bg: "#f5f5f5" } } }
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
      { id: "4", name: "العلامة الفاخرة", defaultData: { ...adsData, colors: { primary: "#8b5cf6", secondary: "#c084fc", accent: "#ffffff", bg: "#f3e8ff" } } }
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
      { id: "4", name: "أكاديمية تعليمية", defaultData: { ...specializedData, title: "أكاديمية المستقبل", subtitle: "الدولية", description: "خصم الأخوة،خصم الثقات،خصم حفظة القرآن،خصم القوات المسلحة", phone: "0778761241", colors: { primary: "#0369a1", secondary: "#0284c7", accent: "#fde047", bg: "#e0f2fe" } } }
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
          title: "عبد العزيز", subtitle: "يتشرف الوالد", image: "",
          description: "وذلك بمناسبة زفافه الميمون\nألف ألف مبروك\nودام الله السرور",
          phone: "", email: "تهنئة خاصة", website: "",
          colors: { primary: "#0d4a6e", secondary: "#0a3a5a", accent: "#4dd0e1", bg: "#061a25" }
        }
      },
      {
        id: "2", name: "ليلة العمر",
        defaultData: {
          title: "سامح", subtitle: "أحمد سعيد الحاج", image: "",
          description: "المقيل والزفة\nالجمعة 29.08.2025\nالمخا - مدينة الكهرباء",
          phone: "", email: "أفراح آل الحاج", website: "",
          colors: { primary: "#c8a85a", secondary: "#1a1a1a", accent: "#c8a85a", bg: "#0a0a0a" }
        }
      },
      {
        id: "3", name: "إطار الذكرى",
        defaultData: {
          title: "محمد", subtitle: "ابن الفاضل حمود القيسي", image: "",
          description: "بمناسبة زفافه الميمون ودخوله القفص الذهبي\nدامت أيامكم عامرة بالمسرات",
          phone: "", email: "تهنئة مقدمة من", website: "@QQYY_Y",
          colors: { primary: "#8b2020", secondary: "#6b1818", accent: "#c0392b", bg: "#fdf5e6" }
        }
      },
      {
        id: "4", name: "الليلة الحلوة",
        defaultData: {
          title: "باسم", subtitle: "الوالد والعائلة الكريمة", image: "",
          description: "المقيل والزفة والسمرة\nyom Al-Arbia'a\n28-7-2021",
          phone: "", email: "أفراح آل باشا", website: "في قاعة آية - شارع مالك دوحة آية",
          colors: { primary: "#2d5a27", secondary: "#1a3a1a", accent: "#c8a85a", bg: "#111" }
        }
      },
      {
        id: "5", name: "الإطار الذهبي",
        defaultData: {
          title: "أحمد", subtitle: "محمد بن علي", image: "",
          description: "المقيل والزفة والسمرة\nيوم الجمعة\n1 محرم 1447",
          phone: "", email: "تهنئة خاصة من العائلة", website: "قاعة الأفراح - المدينة",
          colors: { primary: "#1a3a5c", secondary: "#0f2640", accent: "#c9a84c", bg: "#f5f0e8" }
        }
      },
      {
        id: "6", name: "بطاقة سينمائية",
        defaultData: {
          title: "سامح", subtitle: "أحمد سعيد", image: "",
          description: "المقيل والزفة\nالجمعة\n28 - 7 - 2025",
          phone: "", email: "أفراح آل الحاج", website: "مدينة الكهرباء - المخا",
          colors: { primary: "#1a1a2e", secondary: "#16213e", accent: "#e2b96f", bg: "#0f3460" }
        }
      },
      {
        id: "7", name: "الدائرة الملكية",
        defaultData: {
          title: "محمد", subtitle: "يتشرف الوالد بالدعوة الكريمة", image: "",
          description: "المقيل والزفة\n28 - 7 - 2025",
          phone: "", email: "أفراح آل القيسي", website: "قاعة الملكية - الرياض",
          colors: { primary: "#1a1a2e", secondary: "#2d1b69", accent: "#d4af37", bg: "#0d0d1a" }
        }
      },
      {
        id: "8", name: "قطري مودرن",
        defaultData: {
          title: "عمار", subtitle: "الوالد عبد الله علي", image: "",
          description: "المقيل والزفة\nyom Al-Ahad\n2 - 7 - 2023",
          phone: "", email: "أفراح آل الفقيه", website: "شارع الملك فهد - جدة",
          colors: { primary: "#1e4d8c", secondary: "#163a6b", accent: "#f0c040", bg: "#f0f4fa" }
        }
      },
      {
        id: "9", name: "الف مبروك",
        defaultData: {
          title: "محمد", subtitle: "حمود القيسي", image: "",
          description: "العائلة الكريمة\nيوم الجمعة\n10 - 7 - 2025",
          phone: "", email: "أفراح آل القيسي", website: "قاعة الأفراح - صنعاء",
          colors: { primary: "#5a3a1a", secondary: "#3d2712", accent: "#c8922a", bg: "#f2ead8" }
        }
      },
      {
        id: "10", name: "ويدينج كلاسيك",
        defaultData: {
          title: "باسم", subtitle: "الشيخ عبدالسلام أحمد حمود الخطابي", image: "",
          description: "المقيل والزفة والسمرة\nفي قاعة آية - شارع مالك دوحة آية\nيوم الأربعاء\n28-7-2021",
          phone: "", email: "# الدكتور يحتفل", website: "قاعة آية",
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
      }
    ]
  }
];
