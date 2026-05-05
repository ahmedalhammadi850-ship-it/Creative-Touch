import { useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Upload, X, ImagePlus } from 'lucide-react';
import type { TemplateData } from '../types/template';

interface InlineEditorProps {
  categoryId: string;
  data: TemplateData;
  onChange: (data: Partial<TemplateData>) => void;
}

export function InlineEditor({ categoryId, data, onChange }: InlineEditorProps) {
  const isBusinessCard = categoryId === 'business-card';
  const isAds = categoryId === 'ads';
  const isWedding = categoryId === 'wedding';
  const isCongrats = categoryId === 'congrats';
  const isSpecialized = categoryId === 'specialized';
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const showPhone = isBusinessCard || isAds || isSpecialized || isCongrats;
  const showEmail = isBusinessCard || isSpecialized;
  const showWebsite = isBusinessCard || isSpecialized;
  const showImage = isWedding || isCongrats || isBusinessCard || isAds || isSpecialized;

  return (
    <div className="space-y-6">

      {/* Image Upload Section */}
      {showImage && (
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

      {/* Content Fields */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold">المحتوى</h3>

        <div className="space-y-2">
          <Label>
            {isWedding || isCongrats ? "الاسم الرئيسي / العريس" : "العنوان الرئيسي / الاسم"}
          </Label>
          <Input
            value={data.title}
            onChange={e => onChange({ title: e.target.value })}
            placeholder={isWedding || isCongrats ? "سامح" : "أحمد محمد"}
            data-testid="input-title"
          />
        </div>

        <div className="space-y-2">
          <Label>
            {isWedding || isCongrats ? "اسم الوالد / المناسبة" : "العنوان الفرعي / المسمى الوظيفي"}
          </Label>
          <Input
            value={data.subtitle}
            onChange={e => onChange({ subtitle: e.target.value })}
            placeholder={isWedding || isCongrats ? "أحمد سعيد الحاج" : "مدير تقني"}
            data-testid="input-subtitle"
          />
        </div>

        <div className="space-y-2">
          <Label>
            {isWedding || isCongrats ? "التفاصيل (التاريخ والمكان...)" :
             isSpecialized ? "الخدمات (افصل بـ ،)" : "الوصف"}
          </Label>
          <Textarea
            value={data.description}
            onChange={e => onChange({ description: e.target.value })}
            className="resize-none"
            rows={3}
            placeholder={
              isWedding || isCongrats
                ? "يوم الجمعة 29.08.2025 - المقيل والزفة\nالمخا - مدينة الكهرباء"
                : isSpecialized
                ? "تنظيف وتلميع،تبييض،حشوات تجميلية"
                : ""
            }
            data-testid="input-description"
          />
        </div>

        {/* Extra text input (for additional info) */}
        {(isCongrats || isWedding) && (
          <div className="space-y-2">
            <Label>نص إضافي (مثل: دعوة خاصة)</Label>
            <Input
              value={data.email || ''}
              onChange={e => onChange({ email: e.target.value })}
              placeholder="تهنئة مقدمة من..."
              data-testid="input-extra-text"
            />
          </div>
        )}

        {showPhone && (
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

        {/* Website field for congrats as location */}
        {isCongrats && (
          <div className="space-y-2">
            <Label>المكان</Label>
            <Input
              value={data.website || ''}
              onChange={e => onChange({ website: e.target.value })}
              placeholder="قاعة الأفراح - المدينة"
              data-testid="input-location"
            />
          </div>
        )}
      </div>

      {/* Colors */}
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
