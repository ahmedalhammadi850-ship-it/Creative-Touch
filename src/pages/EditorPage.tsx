import { useEffect, useState } from 'react';
import { useRoute, Link } from 'wouter';
import { categories } from '../data/categories';
import { useTemplateStore } from '../store/useTemplateStore';
import { TemplateRenderer } from '../components/TemplateRenderer';
import { InlineEditor } from '../components/InlineEditor';
import { Button } from '@/components/ui/button';
import { Download, ChevronRight, RotateCcw, Copy, CreditCard, FlipHorizontal } from 'lucide-react';
import { useExport } from '../hooks/useExport';
import { useToast } from '@/hooks/use-toast';

const BACK_CARD_IDS = ['41', '42', '43'];
const BACK_TEMPLATE_ID = '41';

export default function EditorPage() {
  const [, params] = useRoute('/editor/:categoryId/:templateId');
  const categoryId = params?.categoryId;
  const templateId = params?.templateId;
  const { toast } = useToast();
  const [cardSide, setCardSide] = useState<'front' | 'back'>('front');

  const { setTemplate, templateData, updateData, resetData, duplicateTemplate } = useTemplateStore();
  const { exportAsPng } = useExport();

  const isBusinessCard = categoryId === 'business-card';
  const isFrontCard = isBusinessCard && !BACK_CARD_IDS.includes(templateId || '');

  const category = categories.find(c => c.id === categoryId);
  const templateConfig = category?.templates.find(t => t.id === templateId);

  useEffect(() => {
    if (categoryId && templateId && templateConfig) {
      setTemplate(categoryId, templateId);
      const key = `${categoryId}/${templateId}`;
      const storeData = useTemplateStore.getState().templateData;
      if (!storeData[key]) {
        updateData(categoryId, templateId, templateConfig.defaultData);
      }
    }
  }, [categoryId, templateId, templateConfig, setTemplate, updateData]);

  if (!category || !templateConfig || !categoryId || !templateId) {
    return <div className="p-20 text-center text-xl">القالب غير موجود</div>;
  }

  const dataKey = `${categoryId}/${templateId}`;
  const currentData = templateData[dataKey] || templateConfig.defaultData;

  const displayTemplateId = (isFrontCard && cardSide === 'back') ? BACK_TEMPLATE_ID : templateId;

  const handleExport = async () => {
    toast({
      title: "جاري التصدير...",
      description: "يرجى الانتظار بينما يتم تحضير الصورة.",
    });
    await exportAsPng();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white border-b px-4 h-16 flex items-center justify-between shrink-0 shadow-sm z-20">
        <div className="flex items-center gap-3">
          <Link href={`/category/${categoryId}`} className="text-muted-foreground hover:text-foreground p-2 rounded-full hover:bg-gray-100 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-base font-bold hidden sm:block">{templateConfig.name}</h1>
            <span className="text-xs text-muted-foreground hidden sm:block">{category.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              duplicateTemplate(categoryId, templateId);
              toast({ title: "تم التكرار", description: "تم إنشاء نسخة من القالب." });
            }}
            className="hidden sm:flex"
          >
            <Copy className="w-4 h-4 ml-2" />
            تكرار
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              resetData(categoryId, templateId, templateConfig.defaultData);
              toast({ title: "تم إعادة التعيين", description: "تم إرجاع القالب للحالة الافتراضية." });
            }}
          >
            <RotateCcw className="w-4 h-4 ml-2" />
            إعادة تعيين
          </Button>
          <Button onClick={handleExport} className="bg-primary hover:bg-primary/90 text-white shadow-md">
            <Download className="w-4 h-4 ml-2" />
            تصدير PNG
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        <main className="flex-1 overflow-auto bg-[#e5e7eb] flex flex-col items-center justify-center p-8 relative">
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundSize: '20px 20px', backgroundImage: 'radial-gradient(#d1d5db 1px, transparent 1px)' }} />

          {/* Front / Back toggle — only for front business cards */}
          {isFrontCard && (
            <div className="relative z-10 mb-5 flex items-center bg-white rounded-full shadow-md p-1 gap-1">
              <button
                onClick={() => setCardSide('front')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-200 ${
                  cardSide === 'front'
                    ? 'bg-primary text-white shadow'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                الوجه الأمامي
              </button>
              <button
                onClick={() => setCardSide('back')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-200 ${
                  cardSide === 'back'
                    ? 'bg-primary text-white shadow'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <FlipHorizontal className="w-3.5 h-3.5" />
                الوجه الخلفي
              </button>
            </div>
          )}

          <div
            className="relative shadow-2xl transition-all duration-300"
            style={{
              transform: cardSide === 'back' ? 'rotateY(0deg)' : 'rotateY(0deg)',
            }}
          >
            <TemplateRenderer
              categoryId={categoryId}
              templateId={displayTemplateId}
              data={currentData}
            />
          </div>

          {isFrontCard && (
            <p className="relative z-10 mt-4 text-xs text-gray-400 font-medium">
              {cardSide === 'front' ? 'الوجه الأمامي للبطاقة' : 'الوجه الخلفي — يستخدم نفس الألوان والبيانات'}
            </p>
          )}
        </main>

        <aside className="w-full md:w-80 lg:w-96 bg-white border-r shrink-0 overflow-y-auto shadow-[-4px_0_15px_rgba(0,0,0,0.05)] z-10">
          <div className="p-6">
            <InlineEditor
              categoryId={categoryId}
              data={currentData}
              onChange={(newData) => updateData(categoryId, templateId, newData)}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
