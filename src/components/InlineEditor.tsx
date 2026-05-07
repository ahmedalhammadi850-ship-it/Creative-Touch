import React, { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Upload, X, ImagePlus, Lock, Send, RotateCcw } from 'lucide-react';
import type { TemplateData } from '../types/template';

const DEFAULT_FS = 21;
const MIN_FS = 8;
const MAX_FS = 36;

function FontSizeControl({ fontSize, onChange }: { fontSize: number; onChange: (v: number) => void }) {
  const isDefault = fontSize === DEFAULT_FS;
  const delta = fontSize - DEFAULT_FS;
  const canDecrease = fontSize > MIN_FS;
  const canIncrease = fontSize < MAX_FS;

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold">حجم الخط</h3>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>

        {/* A- button */}
        <button
          disabled={!canDecrease}
          onClick={() => onChange(Math.max(MIN_FS, fontSize - 1))}
          style={{
            height: 40, padding: '0 14px', borderRadius: 10, flexShrink: 0,
            border: '1.5px solid #e2e8f0',
            background: canDecrease ? 'linear-gradient(135deg,#fff,#f1f5f9)' : '#f8fafc',
            cursor: canDecrease ? 'pointer' : 'not-allowed',
            color: canDecrease ? '#374151' : '#cbd5e1',
            display: 'flex', alignItems: 'center', gap: 2,
            fontFamily: "'Cairo', sans-serif",
            boxShadow: canDecrease ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
            transition: 'all 0.15s',
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 900, letterSpacing: '-0.5px' }}>A</span>
          <span style={{ fontSize: 10, fontWeight: 900, marginTop: 4 }}>−</span>
        </button>

        {/* Size indicator */}
        <div style={{
          flex: 1, height: 40, borderRadius: 10,
          border: '1.5px solid #e2e8f0', background: '#f8f7ff',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
        }}>
          <span style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 900, fontSize: 15, color: '#3730a3' }}>
            {fontSize}
          </span>
          <span style={{ color: '#6366f1', fontSize: 11, fontWeight: 600 }}>px</span>
          {delta !== 0 && (
            <span style={{
              fontSize: 10, fontWeight: 700,
              color: delta > 0 ? '#059669' : '#dc2626',
              background: delta > 0 ? '#ecfdf5' : '#fef2f2',
              border: `1px solid ${delta > 0 ? '#bbf7d0' : '#fecaca'}`,
              borderRadius: 6, padding: '1px 5px',
            }}>
              {delta > 0 ? `+${delta}` : delta}
            </span>
          )}
        </div>

        {/* A+ button */}
        <button
          disabled={!canIncrease}
          onClick={() => onChange(Math.min(MAX_FS, fontSize + 1))}
          style={{
            height: 40, padding: '0 14px', borderRadius: 10, flexShrink: 0,
            border: '1.5px solid #c7d2fe',
            background: canIncrease ? 'linear-gradient(135deg,#6366f1,#818cf8)' : '#f8fafc',
            cursor: canIncrease ? 'pointer' : 'not-allowed',
            color: canIncrease ? '#fff' : '#cbd5e1',
            display: 'flex', alignItems: 'center', gap: 2,
            fontFamily: "'Cairo', sans-serif",
            boxShadow: canIncrease ? '0 2px 8px rgba(99,102,241,0.35)' : 'none',
            transition: 'all 0.15s',
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 900, letterSpacing: '-0.5px' }}>A</span>
          <span style={{ fontSize: 11, fontWeight: 900, marginTop: -4 }}>+</span>
        </button>

        {/* Reset button */}
        {!isDefault && (
          <button
            onClick={() => onChange(DEFAULT_FS)}
            title="إعادة للافتراضي"
            style={{
              width: 40, height: 40, borderRadius: 10, flexShrink: 0,
              border: '1.5px solid #fecaca', background: '#fef2f2',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#dc2626',
              boxShadow: '0 1px 4px rgba(220,38,38,0.12)',
            }}
          >
            <RotateCcw size={13} />
          </button>
        )}
      </div>

      <p style={{ color: '#94a3b8', fontSize: 12, margin: 0, fontFamily: "'Cairo', sans-serif" }}>
        الحجم الافتراضي {DEFAULT_FS}px — يؤثر على جميع نصوص البطاقة
      </p>
    </div>
  );
}

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
  const isAds = categoryId === 'ads';
  const showFontSize = isMassWedding || isAds || isCongrats || isSpecialized || isWedding;

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

          <FontSizeControl fontSize={data.fontSize ?? DEFAULT_FS} onChange={fs => onChange({ fontSize: fs })} />

        </>
      )}

      {/* =================== BUSINESS CARD — FULLY FREE =================== */}
      {!backCardMode && isBusinessCard && (
        <>
          {/* Free badge */}
          <div style={{
            background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
            border: '2px solid #6ee7b7',
            borderRadius: 14, padding: '10px 16px',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ fontSize: 20 }}>🎁</span>
            <div>
              <p style={{ color: '#065f46', fontSize: 13, fontWeight: 800, margin: 0, fontFamily: "'Cairo', sans-serif" }}>
                بطاقات الأعمال مجانية بالكامل!
              </p>
              <p style={{ color: '#059669', fontSize: 12, margin: 0, fontFamily: "'Cairo', sans-serif" }}>
                جميع الحقول مفتوحة بدون أي رسوم
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">المحتوى</h3>

            <div className="space-y-2">
              <Label>الاسم الكامل / اسم الشركة</Label>
              <Input
                value={data.title}
                onChange={e => onChange({ title: e.target.value })}
                placeholder="أحمد محمد"
              />
            </div>

            <div className="space-y-2">
              <Label>المسمى الوظيفي</Label>
              <Input
                value={data.subtitle}
                onChange={e => onChange({ subtitle: e.target.value })}
                placeholder="مدير تقني"
              />
            </div>

            <div className="space-y-2">
              <Label>اسم الشركة / الوصف</Label>
              <Input
                value={data.description || ''}
                onChange={e => onChange({ description: e.target.value })}
                placeholder="شركة الإبداع التقني"
              />
            </div>

            <div className="space-y-2">
              <Label>رقم الهاتف</Label>
              <Input
                value={data.phone || ''}
                onChange={e => onChange({ phone: e.target.value })}
                placeholder="+967 71 000 0000"
                dir="ltr"
                className="text-right"
              />
            </div>

            <div className="space-y-2">
              <Label>البريد الإلكتروني</Label>
              <Input
                value={data.email || ''}
                onChange={e => onChange({ email: e.target.value })}
                placeholder="info@example.com"
                dir="ltr"
                className="text-right"
              />
            </div>

            <div className="space-y-2">
              <Label>الموقع الإلكتروني</Label>
              <Input
                value={data.website || ''}
                onChange={e => onChange({ website: e.target.value })}
                placeholder="www.example.com"
                dir="ltr"
                className="text-right"
              />
            </div>
          </div>

          {/* Logo upload */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold">الشعار (اختياري)</h3>
            <input ref={logoInputRef} type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
            {data.logo ? (
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <img src={data.logo} alt="logo" style={{ height: 80, maxWidth: '100%', borderRadius: 10, objectFit: 'contain', border: '1.5px solid #e2e8f0' }} />
                <button
                  onClick={removeLogo}
                  style={{ position: 'absolute', top: -8, left: -8, background: '#ef4444', border: 'none', borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <X size={12} color="#fff" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => logoInputRef.current?.click()}
                style={{
                  width: '100%', height: 80,
                  border: '2px dashed #6ee7b7', borderRadius: 12,
                  background: '#f0fdf4', display: 'flex',
                  flexDirection: 'column', alignItems: 'center',
                  justifyContent: 'center', gap: 6, cursor: 'pointer',
                }}>
                <ImagePlus size={22} color="#059669" />
                <span style={{ color: '#059669', fontSize: 13, fontFamily: "'Cairo', sans-serif", fontWeight: 700 }}>رفع الشعار</span>
              </button>
            )}
          </div>

          {/* Colors */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold">الألوان</h3>
            <div className="grid grid-cols-2 gap-4">
              {([
                { key: 'primary', label: 'الأساسي' },
                { key: 'secondary', label: 'الثانوي' },
                { key: 'accent', label: 'التمييز' },
                { key: 'bg', label: 'الخلفية' },
              ] as { key: keyof TemplateData['colors']; label: string }[]).map(({ key, label }) => (
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

          <FontSizeControl fontSize={data.fontSize ?? DEFAULT_FS} onChange={fs => onChange({ fontSize: fs })} />

        </>
      )}

      {/* =================== FRONT / NORMAL MODE (non-business-card) =================== */}
      {!backCardMode && !isBusinessCard && (
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

          {/* ── FONT SIZE — free for selected categories ── */}
          {showFontSize && (
            <FontSizeControl
              fontSize={data.fontSize ?? DEFAULT_FS}
              onChange={fs => onChange({ fontSize: fs })}
            />
          )}

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
            {showImage && !isMassWedding && (
              <LockedImageSlot label="الصورة الشخصية" />
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
