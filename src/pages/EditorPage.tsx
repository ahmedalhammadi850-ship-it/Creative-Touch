import { useEffect, useState, useRef } from 'react';
import { useRoute, Link } from 'wouter';
import { categories } from '../data/categories';
import { useTemplateStore } from '../store/useTemplateStore';
import { useAuthStore } from '../store/useAuthStore';
import { TemplateRenderer } from '../components/TemplateRenderer';
import { InlineEditor } from '../components/InlineEditor';
import { PaymentRequestModal } from '../components/PaymentRequestModal';
import { Button } from '@/components/ui/button';
import { Download, ChevronRight, RotateCcw, Copy, CreditCard, FlipHorizontal, Send } from 'lucide-react';
import { useExport } from '../hooks/useExport';
import { useToast } from '@/hooks/use-toast';
import type { TemplateData } from '../types/template';

const BACK_CARD_IDS = ['41', '42', '43'];

const BACK_STYLES = [
  { id: '41', label: 'متدرج مركزي' },
  { id: '42', label: 'منقسم جانبي' },
  { id: '43', label: 'داكن متوهج' },
];

function getDefaultBackData(frontData: TemplateData): TemplateData {
  return {
    title: '',
    subtitle: '',
    description: frontData.description || '',
    phone: '',
    email: '',
    website: frontData.website || '',
    colors: { ...frontData.colors },
    logo: frontData.logo,
    logoSize: frontData.logoSize,
    logoPosition: frontData.logoPosition,
  };
}

export default function EditorPage() {
  const [, params] = useRoute('/editor/:categoryId/:templateId');
  const categoryId = params?.categoryId;
  const templateId = params?.templateId;
  const { toast } = useToast();
  const [cardSide, setCardSide] = useState<'front' | 'back'>('front');
  const [backStyleId, setBackStyleId] = useState('41');
  const [showPayment, setShowPayment] = useState(false);

  const { refreshCurrentUser } = useAuthStore();
  const { setTemplate, templateData, updateData, resetData, duplicateTemplate } = useTemplateStore();
  const [verifyImg, setVerifyImg] = useState<string | null>(null);
  const { exportAsPdf, capturePreview } = useExport();

  const isBusinessCard = categoryId === 'business-card';
  const isFrontCard = isBusinessCard && !BACK_CARD_IDS.includes(templateId || '');

  const category = categories.find(c => c.id === categoryId);
  const templateConfig = category?.templates.find(t => t.id === templateId);

  const frontKey = `${categoryId}/${templateId}`;
  const backKey = `${categoryId}/${templateId}__back`;

  useEffect(() => {
    if (categoryId && templateId && templateConfig) {
      setTemplate(categoryId, templateId);
      const storeData = useTemplateStore.getState().templateData;
      if (!storeData[frontKey]) {
        updateData(categoryId, templateId, templateConfig.defaultData);
      }
    }
  }, [categoryId, templateId, templateConfig, setTemplate, updateData]);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'auth-storage') {
        useAuthStore.persist.rehydrate();
        refreshCurrentUser();
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [refreshCurrentUser]);

  if (!category || !templateConfig || !categoryId || !templateId) {
    return <div className="p-20 text-center text-xl">القالب غير موجود</div>;
  }

  const frontData = templateData[frontKey] || templateConfig.defaultData;

  // Initialize back data lazily from front card's colors if not yet set
  const storedBackData = templateData[backKey];
  const backData: TemplateData = storedBackData ?? getDefaultBackData(frontData);

  const activeData = (isFrontCard && cardSide === 'back') ? backData : frontData;
  const displayTemplateId = (isFrontCard && cardSide === 'back') ? backStyleId : templateId;

  const updateFrontData = (newData: Partial<TemplateData>) => updateData(categoryId, templateId, newData);
  const updateBackData = (newData: Partial<TemplateData>) => {
    const current = templateData[backKey] ?? getDefaultBackData(frontData);
    const merged: TemplateData = {
      ...current,
      ...newData,
      colors: { ...current.colors, ...(newData.colors || {}) },
    };
    useTemplateStore.setState((state) => ({
      templateData: { ...state.templateData, [backKey]: merged },
    }));
  };

  const handleExport = async () => {
    toast({ title: 'جاري التصدير...', description: 'يرجى الانتظار بينما يتم تحضير الملف.' });
    await exportAsPdf();
  };

  const handleVerify = async () => {
    toast({ title: 'جاري الالتقاط...', description: 'يتم تصوير القالب كما سيظهر في الـ PDF' });
    const dataUrl = await capturePreview();
    if (dataUrl) setVerifyImg(dataUrl);
  };

  const handleResetBack = () => {
    const defaultBack = getDefaultBackData(frontData);
    useTemplateStore.setState((state) => ({
      templateData: { ...state.templateData, [backKey]: defaultBack },
    }));
    toast({ title: 'تم إعادة التعيين', description: 'تم إرجاع الوجه الخلفي للحالة الافتراضية.' });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white border-b px-4 h-16 flex items-center justify-between shrink-0 shadow-sm z-20">
        <div className="flex items-center gap-3">
          <button onClick={() => window.history.back()} className="text-muted-foreground hover:text-foreground p-2 rounded-full hover:bg-gray-100 transition-colors border-0 bg-transparent cursor-pointer">
            <ChevronRight className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base font-bold hidden sm:block">{templateConfig.name}</h1>
            <span className="text-xs text-muted-foreground hidden sm:block">{category.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {(!isFrontCard || cardSide === 'front') && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                duplicateTemplate(categoryId, templateId);
                toast({ title: 'تم التكرار', description: 'تم إنشاء نسخة من القالب.' });
              }}
              className="hidden sm:flex"
            >
              <Copy className="w-4 h-4 ml-2" />
              تكرار
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (isFrontCard && cardSide === 'back') {
                handleResetBack();
              } else {
                resetData(categoryId, templateId, templateConfig.defaultData);
                toast({ title: 'تم إعادة التعيين', description: 'تم إرجاع القالب للحالة الافتراضية.' });
              }
            }}
          >
            <RotateCcw className="w-4 h-4 ml-2" />
            إعادة تعيين
          </Button>
          <Button
            onClick={() => setShowPayment(true)}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md"
          >
            <Send className="w-4 h-4 ml-2" />
            طلب تفعيل
          </Button>
          <Button onClick={handleVerify} variant="outline" size="sm" className="border-green-500 text-green-700 hover:bg-green-50">
            🔍 تحقق
          </Button>
          <Button onClick={handleExport} className="bg-primary hover:bg-primary/90 text-white shadow-md">
            <Download className="w-4 h-4 ml-2" />
            تصدير PDF
          </Button>
        </div>
      </header>

      {verifyImg && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setVerifyImg(null)}
        >
          <div className="bg-white rounded-xl p-4 max-w-5xl w-full" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-lg">مقارنة: المعاينة ← الصورة المُصدَّرة في الـ PDF</h2>
              <button onClick={() => setVerifyImg(null)} className="text-gray-400 hover:text-gray-700 text-xl font-bold">✕</button>
            </div>
            <div className="flex gap-6 items-start justify-center flex-wrap">
              <div className="text-center">
                <p className="text-sm font-bold text-blue-600 mb-2">📱 المعاينة على الشاشة</p>
                <div className="border-2 border-blue-300 rounded inline-block">
                  <TemplateRenderer categoryId={categoryId} templateId={displayTemplateId} data={activeData} />
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-green-600 mb-2">📄 الصورة المُلتقطة للـ PDF</p>
                <div className="border-2 border-green-300 rounded inline-block">
                  <img src={verifyImg} alt="captured" style={{ display: 'block', maxWidth: '100%' }} />
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-gray-500 mt-3">الصورتان يجب أن تكونا متطابقتان تماماً — انقر خارج النافذة للإغلاق</p>
          </div>
        </div>
      )}

      {showPayment && (
        <PaymentRequestModal
          templateName={templateConfig.name}
          categoryId={categoryId}
          templateId={templateId}
          onClose={() => setShowPayment(false)}
        />
      )}

      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        <main className="flex-1 overflow-auto bg-[#e5e7eb] flex flex-col items-center justify-center p-4 sm:p-8 relative">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundSize: '20px 20px', backgroundImage: 'radial-gradient(#d1d5db 1px, transparent 1px)' }}
          />

          {/* Front / Back toggle */}
          {isFrontCard && (
            <div className="relative z-10 mb-5 flex items-center bg-white rounded-full shadow-md p-1 gap-1">
              <button
                onClick={() => setCardSide('front')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-200 ${
                  cardSide === 'front' ? 'bg-primary text-white shadow' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                الوجه الأمامي
              </button>
              <button
                onClick={() => setCardSide('back')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-200 ${
                  cardSide === 'back' ? 'bg-primary text-white shadow' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <FlipHorizontal className="w-3.5 h-3.5" />
                الوجه الخلفي
              </button>
            </div>
          )}

          {/* Card preview */}
          <div className="relative shadow-2xl transition-all duration-300">
            <TemplateRenderer
              categoryId={categoryId}
              templateId={displayTemplateId}
              data={activeData}
            />
          </div>

          {/* Back style selector */}
          {isFrontCard && cardSide === 'back' && (
            <div className="relative z-10 mt-5 flex items-center gap-2">
              <span className="text-xs text-gray-400 font-medium ml-1">تصميم الخلف:</span>
              {BACK_STYLES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setBackStyleId(s.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold border transition-all duration-150 ${
                    backStyleId === s.id
                      ? 'bg-primary text-white border-primary shadow'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}

          {isFrontCard && (
            <p className="relative z-10 mt-3 text-xs text-gray-400 font-medium">
              {cardSide === 'front' ? 'الوجه الأمامي للبطاقة' : 'الوجه الخلفي — بيانات مستقلة'}
            </p>
          )}
        </main>

        {/* Side panel — shows independent editor per side */}
        <aside className="w-full md:w-80 lg:w-96 bg-white border-r shrink-0 overflow-y-auto shadow-[-4px_0_15px_rgba(0,0,0,0.05)] z-10">
          <div className="p-6">
            {isFrontCard && cardSide === 'back' ? (
              <InlineEditor
                categoryId={categoryId}
                data={backData}
                onChange={updateBackData}
                backCardMode
                onRequestPayment={() => setShowPayment(true)}
              />
            ) : (
              <InlineEditor
                categoryId={categoryId}
                templateId={templateId}
                data={frontData}
                onChange={updateFrontData}
                onRequestPayment={() => setShowPayment(true)}
              />
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
