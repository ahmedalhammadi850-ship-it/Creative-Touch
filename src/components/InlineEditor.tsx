import { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Upload, X, ImagePlus, Plus, Lock, Send } from 'lucide-react';
import type { TemplateData } from '../types/template';

interface InlineEditorProps {
  categoryId: string;
  data: TemplateData;
  onChange: (data: Partial<TemplateData>) => void;
  backCardMode?: boolean;
  onRequestPayment?: () => void;
}

function PaymentLockOverlay({ onRequestPayment }: { onRequestPayment?: () => void }) {
  return (
    <div
      dir="rtl"
      style={{
        position: 'absolute', inset: 0, zIndex: 10,
        background: 'rgba(248,247,255,0.85)',
        backdropFilter: 'blur(4px)',
        borderRadius: 16,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 12, padding: '20px 16px',
        border: '2px dashed #c7d2fe',
        cursor: 'pointer',
      }}
      onClick={onRequestPayment}
    >
      <div style={{
        width: 48, height: 48, borderRadius: '50%',
        background: 'linear-gradient(135deg, #6366f1, #a855f7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 6px 20px rgba(99,102,241,0.35)',
      }}>
        <Lock size={20} color="#fff" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: '#1e1b4b', fontSize: 14, fontWeight: 800, margin: '0 0 4px', fontFamily: "'Cairo', sans-serif" }}>
          هذه الحقول تتطلب الدفع
        </p>
        <p style={{ color: '#64748b', fontSize: 12, margin: 0, fontFamily: "'Cairo', sans-serif" }}>
          اضغط لإرسال طلب تفعيل
        </p>
      </div>
      <button
        onClick={e => { e.stopPropagation(); onRequestPayment?.(); }}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'linear-gradient(135deg, #6366f1, #a855f7)',
          border: 'none', cursor: 'pointer',
          color: '#fff', fontSize: 13, fontWeight: 800,
          padding: '9px 20px', borderRadius: 10,
          boxShadow: '0 4px 14px rgba(99,102,241,0.35)',
          fontFamily: "'Cairo', sans-serif",
        }}
      >
        <Send size={13} />
        طلب تفعيل
      </button>
    </div>
  );
}

export function InlineEditor({ categoryId, data, onChange, backCardMode = false, onRequestPayment }: InlineEditorProps) {
  const isBusinessCard = categoryId === 'business-card';
  const isAds = categoryId === 'ads';
  const isWedding = categoryId === 'wedding';
  const isCongrats = categoryId === 'congrats';
  const isSpecialized = categoryId === 'specialized';
  const isMassWedding = categoryId === 'mass-wedding';

  const fileInputRef = useRef<HTMLInputElement>(null);
  const multiImageInputRef = useRef<HTMLInputElement>(null);
  const [currentSlotIndex, setCurrentSlotIndex] = useState<number>(0);

  const handleColorChange = (key: keyof TemplateData['colors'], value: string) => {
    onChange({ colors: { ...data.colors, [key]: value } });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      onChange({ image: ev.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    onChange({ image: '' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleMultiImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const current = data.images ? [...data.images] : Array(6).fill('');
      while (current.length < 6) current.push('');
      current[currentSlotIndex] = ev.target?.result as string;
      onChange({ images: current });
    };
    reader.readAsDataURL(file);
    if (multiImageInputRef.current) multiImageInputRef.current.value = '';
  };

  const removeSlotImage = (index: number) => {
    const current = data.images ? [...data.images] : Array(6).fill('');
    while (current.length < 6) current.push('');
    current[index] = '';
    onChange({ images: current });
  };

  const handleSlotClick = (index: number) => {
    setCurrentSlotIndex(index);
    setTimeout(() => multiImageInputRef.current?.click(), 0);
  };

  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      onChange({ logo: ev.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    onChange({ logo: '' });
    if (logoInputRef.current) logoInputRef.current.value = '';
  };

  const showPhone = isBusinessCard || isAds || isSpecialized || isCongrats;
  const showEmail = isBusinessCard || isSpecialized;
  const showWebsite = isBusinessCard || isSpecialized;
  const showImage = isWedding || isCongrats || isBusinessCard || isAds || isSpecialized;

  const extraLines = isCongrats ? (data.images || []).filter(v => v !== undefined && !v.startsWith('data:image')) : [];

  const updateExtraLine = (index: number, value: string) => {
    const current = [...extraLines];
    current[index] = value;
    onChange({ images: current });
  };

  const addExtraLine = () => {
    if (extraLines.length >= 5) return;
    onChange({ images: [...extraLines, ''] });
  };

  const removeExtraLine = (index: number) => {
    const current = [...extraLines];
    current.splice(index, 1);
    onChange({ images: current });
  };

  return (
    <div className="space-y-6">

      {/* =================== BACK CARD MODE — no locking =================== */}
      {backCardMode && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold">محتوى الوجه الخلفي</h3>

          <div className="space-y-2">
            <Label>اسم الشركة / العلامة التجارية</Label>
            <Input value={data.description} onChange={e => onChange({ description: e.target.value })} placeholder="شركة الإبداع التقني" />
            <p className="text-xs text-muted-foreground">النص الرئيسي الظاهر في المنتصف</p>
          </div>
          <div className="space-y-2">
            <Label>الشعار / الوصف المختصر</Label>
            <Input value={data.subtitle} onChange={e => onChange({ subtitle: e.target.value })} placeholder="إبداع بلا حدود" />
          </div>
          <div className="space-y-2">
            <Label>رقم الهاتف</Label>
            <Input value={data.phone || ''} onChange={e => onChange({ phone: e.target.value })} placeholder="+966 50 000 0000" dir="ltr" className="text-right" />
          </div>
          <div className="space-y-2">
            <Label>الموقع الإلكتروني</Label>
            <Input value={data.website || ''} onChange={e => onChange({ website: e.target.value })} placeholder="www.example.com" dir="ltr" className="text-right" />
          </div>
          <div className="space-y-2">
            <Label>البريد الإلكتروني</Label>
            <Input value={data.email || ''} onChange={e => onChange({ email: e.target.value })} placeholder="info@example.com" dir="ltr" className="text-right" />
          </div>
          <div className="space-y-2">
            <Label>حرف الأفاتار (يظهر إذا لم يوجد شعار)</Label>
            <Input value={data.title} onChange={e => onChange({ title: e.target.value })} placeholder="أ" maxLength={2} />
          </div>
        </div>
      )}

      {/* =================== FRONT / NORMAL MODE =================== */}
      {!backCardMode && (
        <>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">المحتوى</h3>

            {/* ── FREE FIELD 1: title ── */}
            <div className="space-y-2">
              <Label>
                {isMassWedding ? "اسم الحدث الرئيسي" :
                 isWedding || isCongrats ? "الاسم الرئيسي / العريس" : "العنوان الرئيسي / الاسم"}
              </Label>
              <Input
                value={data.title}
                onChange={e => onChange({ title: e.target.value })}
                placeholder={isMassWedding ? "مهرجان الفرح الجماعي الأول" :
                             isWedding || isCongrats ? "سامح" : "أحمد محمد"}
                data-testid="input-title"
              />
            </div>

            {/* ── FREE FIELD 2: subtitle ── */}
            <div className="space-y-2">
              <Label>
                {isMassWedding ? "التاريخ والمكان" :
                 isWedding || isCongrats ? "اسم الوالد / المناسبة" : "العنوان الفرعي / المسمى الوظيفي"}
              </Label>
              <Input
                value={data.subtitle}
                onChange={e => onChange({ subtitle: e.target.value })}
                placeholder={isMassWedding ? "يوم الجمعة - قاعة الأفراح" :
                             isWedding || isCongrats ? "أحمد سعيد الحاج" : "مدير تقني"}
                data-testid="input-subtitle"
              />
            </div>
          </div>

          {/* ── LOCKED SECTION — everything else ── */}
          <div style={{ position: 'relative', borderRadius: 16 }}>
            <PaymentLockOverlay onRequestPayment={onRequestPayment} />

            {/* Blurred locked content preview */}
            <div style={{ filter: 'blur(3px)', pointerEvents: 'none', userSelect: 'none', padding: '4px' }}>
              <div className="space-y-4">

                {/* Font size (mass-wedding) */}
                {isMassWedding && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold">حجم الخط</h3>
                    <div className="flex items-center gap-3">
                      <button className="w-9 h-9 rounded-lg border flex items-center justify-center text-lg font-bold">−</button>
                      <div className="flex-1 text-center"><span className="text-base font-semibold">100%</span></div>
                      <button className="w-9 h-9 rounded-lg border flex items-center justify-center text-lg font-bold">+</button>
                    </div>
                  </div>
                )}

                {/* Image upload preview */}
                {showImage && !isMassWedding && !isBusinessCard && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold">الصورة الشخصية</h3>
                    <div className="w-full h-32 border-2 border-dashed border-primary/30 rounded-xl flex flex-col items-center justify-center gap-2">
                      <ImagePlus className="w-8 h-8 text-primary/40" />
                      <span className="text-sm text-muted-foreground font-medium">اضغط لرفع صورة</span>
                    </div>
                  </div>
                )}

                {/* Logo preview for business card */}
                {isBusinessCard && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold">الشعار (اختياري)</h3>
                    <div className="w-full h-24 border-2 border-dashed border-primary/30 rounded-xl flex flex-col items-center justify-center gap-2">
                      <ImagePlus className="w-7 h-7 text-primary/40" />
                      <span className="text-sm text-muted-foreground font-medium">أضف الشعار</span>
                    </div>
                  </div>
                )}

                {/* Mass wedding images preview */}
                {isMassWedding && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold">صور العرسان</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {Array.from({ length: 6 }, (_, i) => (
                        <div key={i} className="w-full h-20 border-2 border-dashed border-primary/30 rounded-xl flex flex-col items-center justify-center gap-1">
                          <ImagePlus className="w-5 h-5 text-primary/40" />
                          <span className="text-xs text-muted-foreground">عريس {i + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Description field */}
                  <div className="space-y-2">
                    <Label>
                      {isMassWedding ? "أسماء العرسان" :
                       isWedding || isCongrats ? "التفاصيل (التاريخ والمكان...)" :
                       isSpecialized ? "الخدمات" : "الوصف"}
                    </Label>
                    <div className="h-20 border rounded-lg bg-muted/30" />
                  </div>

                  {/* Extra congrats/wedding field */}
                  {(isCongrats || isWedding) && !isMassWedding && (
                    <div className="space-y-2">
                      <Label>اسم المهنئ / النص الختامي</Label>
                      <div className="h-9 border rounded-lg bg-muted/30" />
                    </div>
                  )}

                  {/* Congrats specific */}
                  {isCongrats && (
                    <>
                      <div className="space-y-2">
                        <Label>نص التهنئة الرئيسي</Label>
                        <div className="h-9 border rounded-lg bg-muted/30" />
                      </div>
                      <div className="space-y-2">
                        <Label>نص الإهداء</Label>
                        <div className="h-9 border rounded-lg bg-muted/30" />
                      </div>
                    </>
                  )}

                  {/* Mass wedding extra */}
                  {isMassWedding && (
                    <>
                      <div className="space-y-2">
                        <Label>التاريخ</Label>
                        <div className="h-9 border rounded-lg bg-muted/30" />
                      </div>
                      <div className="space-y-2">
                        <Label>المكان</Label>
                        <div className="h-9 border rounded-lg bg-muted/30" />
                      </div>
                    </>
                  )}

                  {/* Phone */}
                  {showPhone && !isMassWedding && !isCongrats && (
                    <div className="space-y-2">
                      <Label>رقم الهاتف</Label>
                      <div className="h-9 border rounded-lg bg-muted/30" />
                    </div>
                  )}

                  {/* Email */}
                  {showEmail && !isCongrats && !isWedding && (
                    <div className="space-y-2">
                      <Label>البريد الإلكتروني</Label>
                      <div className="h-9 border rounded-lg bg-muted/30" />
                    </div>
                  )}

                  {/* Website */}
                  {showWebsite && !isCongrats && !isWedding && (
                    <div className="space-y-2">
                      <Label>الموقع الإلكتروني</Label>
                      <div className="h-9 border rounded-lg bg-muted/30" />
                    </div>
                  )}
                </div>

                {/* Dynamic extra lines for congrats */}
                {isCongrats && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold">سطور إضافية</h3>
                    </div>
                    <div className="h-9 border rounded-lg bg-muted/30" />
                  </div>
                )}

                {/* Colors */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold">الألوان</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {['الأساسي', 'الثانوي', 'التمييز', 'الخلفية'].map((label) => (
                      <div key={label} className="space-y-2">
                        <Label>{label}</Label>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded border bg-muted" />
                          <span className="text-xs text-muted-foreground">#000000</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Colors for back card mode — not locked */}
      {backCardMode && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold">الألوان</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { key: 'primary' as const, label: 'الأساسي' },
              { key: 'secondary' as const, label: 'الثانوي' },
              { key: 'accent' as const, label: 'التمييز' },
              { key: 'bg' as const, label: 'الخلفية' },
            ].map(({ key, label }) => (
              <div key={key} className="space-y-2">
                <Label>{label}</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={data.colors[key]}
                    onChange={e => handleColorChange(key, e.target.value)}
                    className="h-8 w-8 rounded cursor-pointer border-0 p-0"
                  />
                  <span className="text-xs text-muted-foreground uppercase">{data.colors[key]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
