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

function LockedField({ label, placeholder }: { label: string; placeholder?: string }) {
  return (
    <div className="space-y-2">
      <Label className="text-muted-foreground/70">{label}</Label>
      <div style={{ position: 'relative' }}>
        <input
          disabled
          readOnly
          placeholder={placeholder ?? ''}
          style={{
            width: '100%', padding: '8px 38px 8px 12px',
            borderRadius: 8, border: '1.5px solid #e2e8f0',
            background: '#f8f7ff', color: '#94a3b8',
            fontSize: 14, fontFamily: "'Cairo', sans-serif",
            outline: 'none', boxSizing: 'border-box',
            cursor: 'not-allowed',
          }}
        />
        <Lock
          size={14}
          color="#a5b4fc"
          style={{ position: 'absolute', top: '50%', left: 12, transform: 'translateY(-50%)', pointerEvents: 'none' }}
        />
      </div>
    </div>
  );
}

function LockedTextarea({ label, placeholder, rows = 3 }: { label: string; placeholder?: string; rows?: number }) {
  return (
    <div className="space-y-2">
      <Label className="text-muted-foreground/70">{label}</Label>
      <div style={{ position: 'relative' }}>
        <textarea
          disabled
          readOnly
          placeholder={placeholder ?? ''}
          rows={rows}
          style={{
            width: '100%', padding: '8px 38px 8px 12px',
            borderRadius: 8, border: '1.5px solid #e2e8f0',
            background: '#f8f7ff', color: '#94a3b8',
            fontSize: 14, fontFamily: "'Cairo', sans-serif",
            outline: 'none', boxSizing: 'border-box',
            cursor: 'not-allowed', resize: 'none',
          }}
        />
        <Lock
          size={14}
          color="#a5b4fc"
          style={{ position: 'absolute', top: 10, left: 12, pointerEvents: 'none' }}
        />
      </div>
    </div>
  );
}

function LockedImageSlot({ label }: { label: string }) {
  return (
    <div className="space-y-2">
      <Label className="text-muted-foreground/70">{label}</Label>
      <div style={{
        width: '100%', height: 96,
        border: '1.5px dashed #c7d2fe',
        borderRadius: 12, background: '#f8f7ff',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 6,
        cursor: 'not-allowed',
      }}>
        <Lock size={20} color="#a5b4fc" />
        <span style={{ color: '#94a3b8', fontSize: 12, fontFamily: "'Cairo', sans-serif" }}>محجوب</span>
      </div>
    </div>
  );
}

export function InlineEditor({ categoryId, data, onChange, backCardMode = false, onRequestPayment }: InlineEditorProps) {
  const isBusinessCard = categoryId === 'business-card';
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
    reader.onload = (ev) => onChange({ image: ev.target?.result as string });
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
    reader.onload = (ev) => onChange({ logo: ev.target?.result as string });
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    onChange({ logo: '' });
    if (logoInputRef.current) logoInputRef.current.value = '';
  };

  const showImage = isWedding || isCongrats || isBusinessCard || isSpecialized;
  const showPhone = isBusinessCard || isSpecialized;
  const showEmail = isBusinessCard || isSpecialized;
  const showWebsite = isBusinessCard || isSpecialized;

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
    <div className="space-y-6" dir="rtl">

      {/* =================== BACK CARD MODE — fully unlocked =================== */}
      {backCardMode && (
        <>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">محتوى الوجه الخلفي</h3>
            <div className="space-y-2">
              <Label>اسم الشركة / العلامة التجارية</Label>
              <Input value={data.description} onChange={e => onChange({ description: e.target.value })} placeholder="شركة الإبداع التقني" />
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
              <Label>حرف الأفاتار</Label>
              <Input value={data.title} onChange={e => onChange({ title: e.target.value })} placeholder="أ" maxLength={2} />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">الألوان</h3>
            <div className="grid grid-cols-2 gap-4">
              {(['primary', 'secondary', 'accent', 'bg'] as const).map((key) => (
                <div key={key} className="space-y-2">
                  <Label>{{ primary: 'الأساسي', secondary: 'الثانوي', accent: 'التمييز', bg: 'الخلفية' }[key]}</Label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={data.colors[key]} onChange={e => handleColorChange(key, e.target.value)} className="h-8 w-8 rounded cursor-pointer border-0 p-0" />
                    <span className="text-xs text-muted-foreground uppercase">{data.colors[key]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* =================== FRONT / NORMAL MODE =================== */}
      {!backCardMode && (
        <>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">المحتوى</h3>

            {/* ── FREE FIELD 1 ── */}
            {isMassWedding && (
              <div className="space-y-2">
                <Label>تسمية الدعوة</Label>
                <Input value={data.eventLabel ?? ''} onChange={e => onChange({ eventLabel: e.target.value })} placeholder="دعوة عرس جماعي" />
              </div>
            )}

            <div className="space-y-2">
              <Label>
                {isMassWedding ? 'اسم الحدث الرئيسي' :
                 isWedding || isCongrats ? 'الاسم الرئيسي / العريس' : 'العنوان الرئيسي / الاسم'}
              </Label>
              <Input
                value={data.title}
                onChange={e => onChange({ title: e.target.value })}
                placeholder={isMassWedding ? 'مهرجان الفرح الجماعي' : isWedding || isCongrats ? 'سامح' : 'أحمد محمد'}
                data-testid="input-title"
              />
            </div>

            {/* ── FREE FIELD 2 ── */}
            <div className="space-y-2">
              <Label>
                {isMassWedding ? 'التاريخ والمكان' :
                 isWedding || isCongrats ? 'اسم الوالد / المناسبة' : 'العنوان الفرعي / المسمى الوظيفي'}
              </Label>
              <Input
                value={data.subtitle}
                onChange={e => onChange({ subtitle: e.target.value })}
                placeholder={isMassWedding ? 'يوم الجمعة - قاعة الأفراح' : isWedding || isCongrats ? 'أحمد سعيد الحاج' : 'مدير تقني'}
                data-testid="input-subtitle"
              />
            </div>
          </div>

          {/* ── PAYMENT BANNER ── */}
          <div
            onClick={onRequestPayment}
            style={{
              background: 'linear-gradient(135deg, #eef2ff, #fdf4ff)',
              border: '2px solid #c7d2fe',
              borderRadius: 14,
              padding: '14px 16px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              cursor: 'pointer', gap: 12,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Lock size={16} color="#fff" />
              </div>
              <div>
                <p style={{ color: '#3730a3', fontSize: 13, fontWeight: 800, margin: 0, fontFamily: "'Cairo', sans-serif" }}>
                  باقي الحقول تتطلب الدفع
                </p>
                <p style={{ color: '#6366f1', fontSize: 12, margin: 0, fontFamily: "'Cairo', sans-serif" }}>
                  1000 ريال يمني ≈ 2$ • 7 قوالب
                </p>
              </div>
            </div>
            <button
              onClick={e => { e.stopPropagation(); onRequestPayment?.(); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                border: 'none', cursor: 'pointer',
                color: '#fff', fontSize: 12, fontWeight: 800,
                padding: '8px 14px', borderRadius: 9,
                fontFamily: "'Cairo', sans-serif",
                whiteSpace: 'nowrap', flexShrink: 0,
              }}
            >
              <Send size={12} />
              فعّل الآن
            </button>
          </div>

          {/* ── LOCKED FIELDS — visible but disabled ── */}
          <div className="space-y-4">

            {/* Image upload — locked */}
            {showImage && !isMassWedding && !isBusinessCard && (
              <LockedImageSlot label="الصورة الشخصية" />
            )}

            {isBusinessCard && (
              <LockedImageSlot label="الشعار (اختياري)" />
            )}

            {isMassWedding && (
              <div className="space-y-2">
                <Label className="text-muted-foreground/70">صور العرسان</Label>
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 6 }, (_, i) => (
                    <div key={i} style={{
                      height: 72, border: '1.5px dashed #c7d2fe',
                      borderRadius: 10, background: '#f8f7ff',
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center', gap: 4,
                    }}>
                      <Lock size={14} color="#a5b4fc" />
                      <span style={{ color: '#94a3b8', fontSize: 11 }}>عريس {i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Font size — locked for mass-wedding */}
            {isMassWedding && (
              <div className="space-y-2">
                <Label className="text-muted-foreground/70">حجم الخط</Label>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '8px 12px', borderRadius: 10,
                  border: '1.5px solid #e2e8f0', background: '#f8f7ff',
                  cursor: 'not-allowed',
                }}>
                  <Lock size={14} color="#a5b4fc" />
                  <span style={{ color: '#94a3b8', fontSize: 13 }}>100%</span>
                </div>
              </div>
            )}

            {/* Description */}
            <LockedTextarea
              label={
                isMassWedding ? 'أسماء العرسان (اسم في كل سطر)' :
                isWedding || isCongrats ? 'التفاصيل (التاريخ والمكان...)' :
                isSpecialized ? 'الخدمات' : 'الوصف'
              }
              placeholder="محجوب — يتطلب التفعيل"
              rows={isMassWedding ? 5 : 3}
            />

            {/* Congrats / wedding extra */}
            {(isCongrats || isWedding) && !isMassWedding && (
              <LockedField label="اسم المهنئ / النص الختامي" placeholder="محجوب — يتطلب التفعيل" />
            )}

            {isCongrats && (
              <>
                <LockedField label="نص التهنئة الرئيسي" placeholder="محجوب — يتطلب التفعيل" />
                <LockedField label="نص الإهداء" placeholder="محجوب — يتطلب التفعيل" />
              </>
            )}

            {isMassWedding && (
              <>
                <LockedField label="التاريخ" placeholder="محجوب — يتطلب التفعيل" />
                <LockedField label="المكان" placeholder="محجوب — يتطلب التفعيل" />
              </>
            )}

            {showPhone && !isMassWedding && !isCongrats && (
              <LockedField label="رقم الهاتف" placeholder="محجوب — يتطلب التفعيل" />
            )}

            {showEmail && (
              <LockedField label="البريد الإلكتروني" placeholder="محجوب — يتطلب التفعيل" />
            )}

            {showWebsite && (
              <LockedField label="الموقع الإلكتروني" placeholder="محجوب — يتطلب التفعيل" />
            )}

            {/* Extra lines — locked */}
            {isCongrats && (
              <div className="space-y-2">
                <Label className="text-muted-foreground/70">سطور إضافية</Label>
                <div style={{
                  padding: '10px 14px', borderRadius: 10,
                  border: '1.5px dashed #c7d2fe', background: '#f8f7ff',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <Lock size={14} color="#a5b4fc" />
                  <span style={{ color: '#94a3b8', fontSize: 13, fontFamily: "'Cairo', sans-serif" }}>محجوب — يتطلب التفعيل</span>
                </div>
              </div>
            )}

            {/* Colors — locked */}
            <div className="space-y-3">
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#94a3b8', margin: 0 }}>الألوان</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: 'primary', label: 'الأساسي' },
                  { key: 'secondary', label: 'الثانوي' },
                  { key: 'accent', label: 'التمييز' },
                  { key: 'bg', label: 'الخلفية' },
                ].map(({ key, label }) => (
                  <div key={key} style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                    <Label className="text-muted-foreground/70">{label}</Label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                      <div style={{
                        width: 30, height: 30, borderRadius: 6,
                        background: data.colors[key as keyof typeof data.colors],
                        border: '1.5px solid #e2e8f0',
                      }} />
                      <span style={{ fontSize: 11, color: '#94a3b8' }}>{data.colors[key as keyof typeof data.colors]}</span>
                      <Lock size={11} color="#a5b4fc" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
