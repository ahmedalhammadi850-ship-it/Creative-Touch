import { useEffect, useState, useRef, useCallback } from 'react';
import { useRoute } from 'wouter';
import { categories } from '../data/categories';
import { useTemplateStore } from '../store/useTemplateStore';
import { useAuthStore } from '../store/useAuthStore';
import { TemplateRenderer } from '../components/TemplateRenderer';
import { InlineEditor } from '../components/InlineEditor';
import { PaymentRequestModal } from '../components/PaymentRequestModal';
import { Button } from '@/components/ui/button';
import { Download, ChevronRight, RotateCcw, Copy, CreditCard, FlipHorizontal, Send, MoreVertical } from 'lucide-react';
import { useExport } from '../hooks/useExport';
import { useToast } from '@/hooks/use-toast';
import type { TemplateData } from '../types/template';
import { getUserFromFirestore } from '../lib/firestoreService';

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
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  const { refreshCurrentUser, user } = useAuthStore();
  const { setTemplate, templateData, updateData, resetData, duplicateTemplate } = useTemplateStore();
  const [verifyImg, setVerifyImg] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);
  const [readyBlobUrl, setReadyBlobUrl] = useState<string | null>(null);
  const { exportAsPdf, capturePreview, isMobileDevice, isIOSDevice } = useExport();

  // Dynamic scale: measures the template's natural width and shrinks it to fit
  const previewWrapRef = useRef<HTMLDivElement>(null);
  const [previewScale, setPreviewScale] = useState(1);
  const [previewMarginBottom, setPreviewMarginBottom] = useState(0);

  const recalcScale = useCallback(() => {
    const wrap = previewWrapRef.current;
    if (!wrap) return;
    const templateEl = wrap.firstElementChild as HTMLElement | null;
    if (!templateEl) return;
    // Temporarily reset transform so we measure the natural size
    wrap.style.transform = 'none';
    const naturalW = templateEl.offsetWidth;
    const naturalH = templateEl.offsetHeight;
    if (!naturalW || !naturalH) return;
    const containerW = wrap.parentElement?.clientWidth ?? window.innerWidth;
    const padding = 32; // 16px each side
    const available = containerW - padding;
    const scale = available < naturalW ? Math.min(1, available / naturalW) : 1;
    // compensate the vertical space that the scaled-down element still occupies
    const marginBottom = scale < 1 ? -(naturalH * (1 - scale)) : 0;
    setPreviewScale(scale);
    setPreviewMarginBottom(marginBottom);
    wrap.style.transform = scale < 1 ? `scale(${scale})` : 'none';
  }, []);

  useEffect(() => {
    // Small delay lets the lazy-loaded template render first
    const t = setTimeout(recalcScale, 120);
    window.addEventListener('resize', recalcScale);
    return () => { clearTimeout(t); window.removeEventListener('resize', recalcScale); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recalcScale, templateId, cardSide, backStyleId]);

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

  // Sync activation status from Firestore on mount and when tab regains focus
  useEffect(() => {
    if (!user?.id) return;
    const { addActivatedTemplates, updateUserPlan } = useAuthStore.getState();

    const syncFromFirestore = async () => {
      const fsUser = await getUserFromFirestore(user.id);
      if (!fsUser) return;
      if (fsUser.activatedTemplates && fsUser.activatedTemplates.length > 0) {
        addActivatedTemplates(user.id, fsUser.activatedTemplates);
      }
      if (
        fsUser.plan &&
        (fsUser.plan !== user.plan ||
          fsUser.planStatus !== user.planStatus ||
          fsUser.planExpiresAt !== user.planExpiresAt)
      ) {
        updateUserPlan(user.id, fsUser.plan, fsUser.planStatus, fsUser.planExpiresAt);
      }
    };

    syncFromFirestore();
    window.addEventListener('focus', syncFromFirestore);
    return () => window.removeEventListener('focus', syncFromFirestore);
  }, [user?.id]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target as Node)) {
        setShowMoreMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (!category || !templateConfig || !categoryId || !templateId) {
    return <div className="p-20 text-center text-xl">القالب غير موجود</div>;
  }

  const frontData = templateData[frontKey] || templateConfig.defaultData;
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

  const handleExportPdf = async () => {
    if (exporting) return;
    setExporting(true);

    // iOS Safari: window.open() MUST be called synchronously from a user-gesture
    // handler, BEFORE any await — otherwise the popup blocker kills it.
    const iosWin = isIOSDevice ? window.open('', '_blank') : null;

    toast({ title: 'جاري تحضير الملف...', description: 'يرجى الانتظار، قد يستغرق بضع ثوانٍ.' });
    const result = await exportAsPdf(iosWin);
    setExporting(false);

    if (!result.ok) {
      toast({
        title: 'فشل التصدير',
        description: 'حدث خطأ أثناء التصدير، يرجى المحاولة مجدداً.',
        variant: 'destructive',
      });
    } else if (isIOSDevice) {
      toast({ title: '✓ تم فتح الـ PDF', description: 'اضغط المشاركة ← "حفظ في الملفات" لحفظه.' });
    } else if (isMobileDevice && result.blobUrl) {
      // Android: show interactive top notification instead of silent download
      setReadyBlobUrl(result.blobUrl);
      // Auto-dismiss after 20 seconds and revoke the blob URL
      setTimeout(() => {
        setReadyBlobUrl(prev => {
          if (prev) URL.revokeObjectURL(prev);
          return null;
        });
      }, 20000);
    } else {
      toast({ title: '✓ تم التصدير', description: 'تم تحميل ملف الـ PDF بنجاح.' });
    }
  };

  const handleVerify = async () => {
    toast({ title: 'جاري الالتقاط...', description: 'يتم تصوير القالب كما سيظهر في الـ PDF.' });
    const dataUrl = await capturePreview();
    if (dataUrl) setVerifyImg(dataUrl);
  };

  const handleResetCurrent = () => {
    if (isFrontCard && cardSide === 'back') {
      const defaultBack = getDefaultBackData(frontData);
      useTemplateStore.setState((state) => ({
        templateData: { ...state.templateData, [backKey]: defaultBack },
      }));
      toast({ title: 'تم إعادة التعيين', description: 'تم إرجاع الوجه الخلفي للحالة الافتراضية.' });
    } else {
      resetData(categoryId, templateId, templateConfig.defaultData);
      toast({ title: 'تم إعادة التعيين', description: 'تم إرجاع القالب للحالة الافتراضية.' });
    }
  };

  const handleDuplicate = () => {
    duplicateTemplate(categoryId, templateId);
    toast({ title: 'تم التكرار', description: 'تم إنشاء نسخة من القالب.' });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* ─── Android file-ready top notification ─── */}
      {readyBlobUrl && (
        <div
          className="fixed top-0 left-0 right-0 z-[99999] flex items-center justify-between gap-3 px-4 py-3 shadow-2xl cursor-pointer select-none"
          style={{ background: 'linear-gradient(90deg,#1e1b4b,#4f46e5)', fontFamily: "'Cairo',sans-serif", direction: 'rtl' }}
          onClick={() => {
            window.open(readyBlobUrl, '_blank');
          }}
        >
          <span className="text-white font-bold text-sm leading-snug">
            ✅ تم تجهيز ملفك بنجاح. اضغط هنا لفتحه
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              URL.revokeObjectURL(readyBlobUrl);
              setReadyBlobUrl(null);
            }}
            className="text-white/60 hover:text-white text-lg leading-none bg-transparent border-0 cursor-pointer shrink-0"
          >
            ✕
          </button>
        </div>
      )}

      {/* ─── Header ─── */}
      <header className="bg-white border-b px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between shrink-0 shadow-sm z-20">

        {/* Back + title */}
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={() => window.history.back()}
            className="text-muted-foreground hover:text-foreground p-1.5 rounded-full hover:bg-gray-100 transition-colors border-0 bg-transparent cursor-pointer shrink-0"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="min-w-0 hidden sm:block">
            <h1 className="text-sm font-bold truncate">{templateConfig.name}</h1>
            <span className="text-xs text-muted-foreground">{category.name}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5">

          {/* PDF export — always visible on all screen sizes */}
          <Button
            onClick={handleExportPdf}
            disabled={exporting}
            size="sm"
            className="bg-primary hover:bg-primary/90 text-white shadow-md h-8 sm:h-9 px-3 sm:px-4 text-xs sm:text-sm disabled:opacity-60 gap-1.5"
          >
            <Download className="w-3.5 h-3.5 shrink-0" />
            <span>{exporting ? 'جاري...' : 'PDF'}</span>
          </Button>

          {/* Request activation — always visible */}
          <Button
            onClick={() => setShowPayment(true)}
            size="sm"
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md h-8 sm:h-9 px-2.5 sm:px-3 text-xs sm:text-sm"
          >
            <Send className="w-3.5 h-3.5 sm:ml-1.5" />
            <span className="hidden sm:inline">طلب تفعيل</span>
          </Button>

          {/* More menu — mobile only */}
          <div className="relative sm:hidden" ref={moreMenuRef}>
            <button
              onClick={() => setShowMoreMenu(v => !v)}
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors border border-gray-200"
            >
              <MoreVertical className="w-4 h-4 text-gray-600" />
            </button>
            {showMoreMenu && (
              <div className="absolute left-0 top-10 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 min-w-[180px] z-50" dir="rtl">
                <button
                  onClick={() => { handleVerify(); setShowMoreMenu(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-base">🔍</span> معاينة التصدير
                </button>
                {(!isFrontCard || cardSide === 'front') && (
                  <button
                    onClick={() => { handleDuplicate(); setShowMoreMenu(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Copy className="w-4 h-4 text-indigo-500" /> تكرار القالب
                  </button>
                )}
                <button
                  onClick={() => { handleResetCurrent(); setShowMoreMenu(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" /> إعادة تعيين
                </button>
              </div>
            )}
          </div>

          {/* Desktop-only secondary actions */}
          <div className="hidden sm:flex items-center gap-1.5">
            {(!isFrontCard || cardSide === 'front') && (
              <Button variant="outline" size="sm" onClick={handleDuplicate}>
                <Copy className="w-4 h-4 ml-1.5" /> تكرار
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={handleResetCurrent}>
              <RotateCcw className="w-4 h-4 ml-1.5" /> إعادة تعيين
            </Button>
            <Button variant="outline" size="sm" onClick={handleVerify} className="border-green-500 text-green-700 hover:bg-green-50">
              🔍 تحقق
            </Button>
          </div>
        </div>
      </header>

      {/* ─── Verify modal ─── */}
      {verifyImg && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setVerifyImg(null)}
        >
          <div className="bg-white rounded-xl p-4 max-w-5xl w-full" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-sm sm:text-lg">مقارنة: المعاينة ← الصورة المُصدَّرة</h2>
              <button onClick={() => setVerifyImg(null)} className="text-gray-400 hover:text-gray-700 text-xl font-bold">✕</button>
            </div>
            <div className="flex gap-4 sm:gap-6 items-start justify-center flex-wrap">
              <div className="text-center">
                <p className="text-xs sm:text-sm font-bold text-blue-600 mb-2">📱 المعاينة على الشاشة</p>
                <div className="border-2 border-blue-300 rounded inline-block">
                  <TemplateRenderer categoryId={categoryId} templateId={displayTemplateId} data={activeData} />
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs sm:text-sm font-bold text-green-600 mb-2">📄 الصورة المُلتقطة للـ PDF</p>
                <div className="border-2 border-green-300 rounded inline-block">
                  <img src={verifyImg} alt="captured" style={{ display: 'block', maxWidth: '100%' }} />
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-gray-500 mt-3">انقر خارج النافذة للإغلاق</p>
          </div>
        </div>
      )}

      {/* ─── Payment modal ─── */}
      {showPayment && (
        <PaymentRequestModal
          templateName={templateConfig.name}
          categoryId={categoryId}
          templateId={templateId}
          onClose={() => setShowPayment(false)}
        />
      )}

      {/* ─── Main content ─── */}
      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">

        {/* Preview area */}
        <main
          className="bg-[#e5e7eb] flex flex-col items-center justify-start md:justify-center p-4 sm:p-6 relative md:flex-1 md:overflow-auto"
          style={{ minHeight: 0 }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundSize: '20px 20px', backgroundImage: 'radial-gradient(#d1d5db 1px, transparent 1px)' }}
          />

          {/* Front / Back toggle */}
          {isFrontCard && (
            <div className="relative z-10 mb-4 flex items-center bg-white rounded-full shadow-md p-1 gap-1">
              <button
                onClick={() => setCardSide('front')}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 ${
                  cardSide === 'front' ? 'bg-primary text-white shadow' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <CreditCard className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                الوجه الأمامي
              </button>
              <button
                onClick={() => setCardSide('back')}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 ${
                  cardSide === 'back' ? 'bg-primary text-white shadow' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <FlipHorizontal className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                الوجه الخلفي
              </button>
            </div>
          )}

          {/* Template preview — scaled dynamically to fit screen width */}
          <div
            ref={previewWrapRef}
            className="relative shadow-2xl transition-transform duration-300"
            style={{
              transformOrigin: 'top center',
              transform: previewScale < 1 ? `scale(${previewScale})` : 'none',
              marginBottom: previewMarginBottom,
            }}
          >
            <TemplateRenderer
              categoryId={categoryId}
              templateId={displayTemplateId}
              data={activeData}
            />
          </div>

          {/* Back style selector */}
          {isFrontCard && cardSide === 'back' && (
            <div className="relative z-10 mt-4 flex items-center gap-1.5 flex-wrap justify-center">
              <span className="text-xs text-gray-400 font-medium ml-1">تصميم الخلف:</span>
              {BACK_STYLES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setBackStyleId(s.id)}
                  className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold border transition-all duration-150 ${
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
            <p className="relative z-10 mt-2 text-xs text-gray-400 font-medium">
              {cardSide === 'front' ? 'الوجه الأمامي للبطاقة' : 'الوجه الخلفي — بيانات مستقلة'}
            </p>
          )}
        </main>

        {/* Editor panel */}
        <aside
          className="w-full md:w-80 lg:w-96 bg-white border-t md:border-t-0 md:border-r shrink-0 overflow-y-auto shadow-inner md:shadow-[-4px_0_15px_rgba(0,0,0,0.05)] z-10"
          style={{ maxHeight: 'calc(100vh - 56px)' }}
        >
          <div className="p-4 sm:p-6">
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
