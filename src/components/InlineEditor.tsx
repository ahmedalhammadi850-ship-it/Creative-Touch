import { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Upload, X, ImagePlus, Plus } from 'lucide-react';
import type { TemplateData } from '../types/template';

interface InlineEditorProps {
  categoryId: string;
  data: TemplateData;
  onChange: (data: Partial<TemplateData>) => void;
  backCardMode?: boolean;
}

export function InlineEditor({ categoryId, data, onChange, backCardMode = false }: InlineEditorProps) {
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

      {/* Font size control for mass-wedding */}
      {isMassWedding && (
        <div className="space-y-3">
          <h3 className="text-lg font-bold">حجم الخط</h3>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onChange({ fontSize: Math.max(0.7, Math.round(((data.fontSize ?? 1) - 0.1) * 10) / 10) })}
              className="w-9 h-9 rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground flex items-center justify-center text-lg font-bold transition-colors"
            >
              −
            </button>
            <div className="flex-1 text-center">
              <span className="text-base font-semibold">{Math.round((data.fontSize ?? 1) * 100)}%</span>
            </div>
            <button
              onClick={() => onChange({ fontSize: Math.min(2.0, Math.round(((data.fontSize ?? 1) + 0.1) * 10) / 10) })}
              className="w-9 h-9 rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground flex items-center justify-center text-lg font-bold transition-colors"
            >
              +
            </button>
          </div>
          <input
            type="range"
            min="70"
            max="200"
            step="10"
            value={Math.round((data.fontSize ?? 1) * 100) || 100}
            onChange={e => onChange({ fontSize: Number(e.target.value) / 100 })}
            className="w-full accent-primary"
          />
        </div>
      )}

      {/* Multi-image upload for mass-wedding */}
      {isMassWedding && (
        <div className="space-y-3">
          <h3 className="text-lg font-bold">صور العرسان</h3>
          <p className="text-xs text-muted-foreground">أضف صورة لكل عريس (حتى 6 صور) — تتطابق مع ترتيب الأسماء</p>

          <input
            ref={multiImageInputRef}
            type="file"
            accept="image/*"
            onChange={handleMultiImageUpload}
            className="hidden"
          />

          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }, (_, i) => {
              const img = data.images?.[i];
              return (
                <div key={i}>
                  {img ? (
                    <div className="relative group">
                      <img
                        src={img}
                        alt={`عريس ${i + 1}`}
                        className="w-full h-20 object-cover rounded-xl border-2 border-primary/20"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-1">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-6 px-1.5"
                          onClick={() => handleSlotClick(i)}
                        >
                          <Upload className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="h-6 px-1.5"
                          onClick={() => removeSlotImage(i)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleSlotClick(i)}
                      className="w-full h-20 border-2 border-dashed border-primary/30 rounded-xl flex flex-col items-center justify-center gap-1 hover:border-primary/60 hover:bg-primary/5 transition-all cursor-pointer"
                    >
                      <ImagePlus className="w-5 h-5 text-primary/40" />
                      <span className="text-xs text-muted-foreground">عريس {i + 1}</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Logo upload — shown for business cards (both front and back modes) */}
      {isBusinessCard && (
        <div className="space-y-3">
          <h3 className="text-lg font-bold">الشعار (اختياري)</h3>
          <input
            ref={logoInputRef}
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="hidden"
          />
          {data.logo ? (
            <div className="relative group">
              <img
                src={data.logo}
                alt="الشعار"
                className="w-full h-24 object-contain rounded-xl border-2 border-primary/20 bg-muted/30"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2">
                <Button size="sm" variant="secondary" onClick={() => logoInputRef.current?.click()}>
                  <Upload className="w-3 h-3 ml-1" />تغيير
                </Button>
                <Button size="sm" variant="destructive" onClick={removeLogo}>
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => logoInputRef.current?.click()}
              className="w-full h-24 border-2 border-dashed border-primary/30 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-primary/60 hover:bg-primary/5 transition-all cursor-pointer"
            >
              <ImagePlus className="w-7 h-7 text-primary/40" />
              <span className="text-sm text-muted-foreground font-medium">أضف الشعار</span>
              <span className="text-xs text-muted-foreground">PNG, JPG, WEBP</span>
            </button>
          )}
          {data.logo && !backCardMode && (
            <div className="space-y-3">
              <div className="space-y-2">
                <Label>موضع الشعار</Label>
                <div className="grid grid-cols-3 gap-1.5">
                  {([
                    { value: 'top-left', label: 'يسار أعلى' },
                    { value: 'top-right', label: 'يمين أعلى' },
                    { value: 'center', label: 'وسط' },
                    { value: 'bottom-left', label: 'يسار أسفل' },
                    { value: 'bottom-right', label: 'يمين أسفل' },
                  ] as const).map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => onChange({ logoPosition: value })}
                      className={`text-xs py-1.5 px-2 rounded-lg border transition-colors ${
                        (data.logoPosition ?? 'top-left') === value
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'border-input hover:bg-accent'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>حجم الشعار: {data.logoSize ?? 40}px</Label>
                <input
                  type="range"
                  min="24"
                  max="90"
                  step="4"
                  value={data.logoSize ?? 40}
                  onChange={e => onChange({ logoSize: Number(e.target.value) })}
                  className="w-full accent-primary"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Single image upload for non-business-card, non-mass-wedding categories */}
      {showImage && !isMassWedding && !isBusinessCard && (
        <div className="space-y-3">
          <h3 className="text-lg font-bold">الصورة الشخصية</h3>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            data-testid="input-image-upload"
          />
          {data.image ? (
            <div className="relative group">
              <img
                src={data.image}
                alt="صورة القالب"
                className="w-full h-40 object-cover rounded-xl border-2 border-primary/20"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => fileInputRef.current?.click()}
                  data-testid="button-change-image"
                >
                  <Upload className="w-3 h-3 ml-1" />
                  تغيير
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={removeImage}
                  data-testid="button-remove-image"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-32 border-2 border-dashed border-primary/30 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-primary/60 hover:bg-primary/5 transition-all cursor-pointer"
              data-testid="button-upload-image"
            >
              <ImagePlus className="w-8 h-8 text-primary/40" />
              <span className="text-sm text-muted-foreground font-medium">اضغط لرفع صورة</span>
              <span className="text-xs text-muted-foreground">PNG, JPG, WEBP</span>
            </button>
          )}
        </div>
      )}

      {/* =================== BACK CARD MODE =================== */}
      {backCardMode && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold">محتوى الوجه الخلفي</h3>

          <div className="space-y-2">
            <Label>اسم الشركة / العلامة التجارية</Label>
            <Input
              value={data.description}
              onChange={e => onChange({ description: e.target.value })}
              placeholder="شركة الإبداع التقني"
            />
            <p className="text-xs text-muted-foreground">النص الرئيسي الظاهر في المنتصف</p>
          </div>

          <div className="space-y-2">
            <Label>الشعار / الوصف المختصر</Label>
            <Input
              value={data.subtitle}
              onChange={e => onChange({ subtitle: e.target.value })}
              placeholder="إبداع بلا حدود"
            />
          </div>

          <div className="space-y-2">
            <Label>رقم الهاتف</Label>
            <Input
              value={data.phone || ''}
              onChange={e => onChange({ phone: e.target.value })}
              placeholder="+966 50 000 0000"
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
            <Label>حرف الأفاتار (يظهر إذا لم يوجد شعار)</Label>
            <Input
              value={data.title}
              onChange={e => onChange({ title: e.target.value })}
              placeholder="أ"
              maxLength={2}
            />
          </div>
        </div>
      )}

      {/* =================== FRONT / NORMAL MODE =================== */}
      {!backCardMode && (
        <>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">المحتوى</h3>

            {isMassWedding && (
              <div className="space-y-2">
                <Label>تسمية الدعوة</Label>
                <Input
                  value={data.eventLabel ?? ''}
                  onChange={e => onChange({ eventLabel: e.target.value })}
                  placeholder="دعوة عرس جماعي"
                />
              </div>
            )}

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

            <div className="space-y-2">
              <Label>
                {isMassWedding ? "أسماء العرسان (اسم في كل سطر)" :
                 isWedding || isCongrats ? "التفاصيل (التاريخ والمكان...)" :
                 isSpecialized ? "الخدمات (افصل بـ ،)" : "الوصف"}
              </Label>
              <Textarea
                value={data.description}
                onChange={e => onChange({ description: e.target.value })}
                className="resize-none"
                rows={isMassWedding ? 6 : 3}
                placeholder={
                  isMassWedding
                    ? "محمد & نورة\nعبدالله & سارة\nأحمد & فاطمة\nعلي & مريم\nخالد & هدى\nسامي & رنا"
                    : isWedding || isCongrats
                    ? "يوم الجمعة 29.08.2025 - المقيل والزفة\nالمخا - مدينة الكهرباء"
                    : isSpecialized
                    ? "تنظيف وتلميع،تبييض،حشوات تجميلية"
                    : ""
                }
                data-testid="input-description"
              />
              {isMassWedding && (
                <p className="text-xs text-muted-foreground">الاسم الأول يقابل الصورة الأولى، والثاني يقابل الثانية...</p>
              )}
            </div>

            {/* Extra text input (for additional info / sender name) */}
            {(isCongrats || isWedding) && !isMassWedding && (
              <div className="space-y-2">
                <Label>اسم المهنئ / النص الختامي</Label>
                <Input
                  value={data.email || ''}
                  onChange={e => onChange({ email: e.target.value })}
                  placeholder="تهنئة مقدمة من..."
                  data-testid="input-extra-text"
                />
              </div>
            )}

            {/* Congrats specific fields */}
            {isCongrats && (
              <>
                <div className="space-y-2">
                  <Label>نص التهنئة الرئيسي</Label>
                  <Input
                    value={data.phone || ''}
                    onChange={e => onChange({ phone: e.target.value })}
                    placeholder="تهانينا"
                    data-testid="input-congrats-text"
                  />
                  <p className="text-xs text-muted-foreground">مثل: تهانينا — ألف مبروك — مبارك</p>
                </div>
                <div className="space-y-2">
                  <Label>نص الإهداء</Label>
                  <Input
                    value={data.website || ''}
                    onChange={e => onChange({ website: e.target.value })}
                    placeholder="إهداء"
                    data-testid="input-hadya-text"
                  />
                  <p className="text-xs text-muted-foreground">مثل: إهداء — تقديم — بمناسبة</p>
                </div>
              </>
            )}

            {isMassWedding && (
              <>
                <div className="space-y-2">
                  <Label>التاريخ</Label>
                  <Input
                    value={data.phone || ''}
                    onChange={e => onChange({ phone: e.target.value })}
                    placeholder="يوم الجمعة ١٥ ذو الحجة ١٤٤٦"
                    data-testid="input-phone"
                  />
                </div>
                <div className="space-y-2">
                  <Label>المكان</Label>
                  <Input
                    value={data.website || ''}
                    onChange={e => onChange({ website: e.target.value })}
                    placeholder="قاعة الأفراح الكبرى - المدينة"
                    data-testid="input-location"
                  />
                </div>
              </>
            )}

            {showPhone && !isMassWedding && !isCongrats && (
              <div className="space-y-2">
                <Label>رقم الهاتف</Label>
                <Input
                  value={data.phone || ''}
                  onChange={e => onChange({ phone: e.target.value })}
                  placeholder="0500000000"
                  dir="ltr"
                  className="text-right"
                  data-testid="input-phone"
                />
              </div>
            )}

            {showEmail && !isCongrats && !isWedding && (
              <div className="space-y-2">
                <Label>البريد الإلكتروني</Label>
                <Input
                  value={data.email || ''}
                  onChange={e => onChange({ email: e.target.value })}
                  placeholder="email@example.com"
                  dir="ltr"
                  className="text-right"
                  data-testid="input-email"
                />
              </div>
            )}

            {showWebsite && !isCongrats && !isWedding && (
              <div className="space-y-2">
                <Label>الموقع الإلكتروني</Label>
                <Input
                  value={data.website || ''}
                  onChange={e => onChange({ website: e.target.value })}
                  placeholder="www.example.com"
                  dir="ltr"
                  className="text-right"
                  data-testid="input-website"
                />
              </div>
            )}
          </div>

          {/* Dynamic extra lines for congrats */}
          {isCongrats && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">سطور إضافية</h3>
                {extraLines.length < 5 && (
                  <button
                    onClick={addExtraLine}
                    className="flex items-center gap-1 text-sm text-primary border border-primary/30 rounded-lg px-3 py-1 hover:bg-primary/5 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    إضافة سطر
                  </button>
                )}
              </div>
              {extraLines.length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-3 border border-dashed border-primary/20 rounded-lg">
                  اضغط "إضافة سطر" لإضافة نص مخصص في البطاقة
                </p>
              )}
              <div className="space-y-2">
                {extraLines.map((line, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input
                      value={line}
                      onChange={e => updateExtraLine(i, e.target.value)}
                      placeholder={`سطر ${i + 1}...`}
                      className="flex-1"
                    />
                    <button
                      onClick={() => removeExtraLine(i)}
                      className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Colors — always shown */}
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
                  data-testid={`color-${key}`}
                />
                <span className="text-xs text-muted-foreground uppercase">{data.colors[key]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
