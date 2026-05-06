import { useState, useRef } from 'react';
import { useRoute, useLocation } from 'wouter';
import { categories } from '../data/categories';
import { TemplateRenderer } from '../components/TemplateRenderer';
import { ChevronRight, CheckCircle, XCircle, Loader2, Send } from 'lucide-react';
import html2canvas from 'html2canvas';

const APPROVED_NAME = 'أحمد عبدالله عقلان الحمادي';
const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || '';

type Step = 'form' | 'payment' | 'success' | 'error';

export default function OrderPage() {
  const [, params] = useRoute('/order/:categoryId/:templateId');
  const [, setLocation] = useLocation();
  const categoryId = params?.categoryId || '';
  const templateId = params?.templateId || '';

  const category = categories.find(c => c.id === categoryId);
  const template = category?.templates.find(t => t.id === templateId);

  const [step, setStep] = useState<Step>('form');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [verifyName, setVerifyName] = useState('');
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState('');
  const previewRef = useRef<HTMLDivElement>(null);

  if (!category || !template) {
    return (
      <div dir="rtl" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cairo', sans-serif" }}>
        <p style={{ color: '#94a3b8', fontSize: 18 }}>القالب غير موجود</p>
      </div>
    );
  }

  const captureAndSend = async () => {
    let imageBase64 = '';
    try {
      const el = document.getElementById('order-preview-target');
      if (el) {
        const canvas = await html2canvas(el, { useCORS: true, scale: 2, logging: false, allowTaint: false });
        imageBase64 = canvas.toDataURL('image/png');
      }
    } catch { imageBase64 = ''; }

    if (N8N_WEBHOOK_URL) {
      try {
        await fetch(N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customerName,
            customerPhone,
            templateId,
            templateName: template.name,
            categoryId,
            categoryName: category.name,
            price: 1000,
            currency: 'YR',
            imageBase64,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch { }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) return;
    setStep('payment');
  };

  const handlePaymentVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setNameError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));

    const normalized = verifyName.trim().replace(/\s+/g, ' ');
    if (normalized === APPROVED_NAME) {
      await captureAndSend();
      setStep('success');
    } else {
      setStep('error');
    }
    setLoading(false);
  };

  return (
    <div dir="rtl" style={{ minHeight: '100vh', background: '#f8f7ff', fontFamily: "'Cairo', sans-serif" }}>

      {/* Header */}
      <header style={{
        background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(99,102,241,0.1)',
        boxShadow: '0 1px 20px rgba(99,102,241,0.07)',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', gap: 14 }}>
          <button onClick={() => setLocation(`/category/${categoryId}`)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 700, fontSize: 14 }}>
            <ChevronRight size={20} />
            رجوع
          </button>
          <div style={{ width: 1, height: 24, background: '#e2e8f0' }} />
          <span style={{ color: '#1e1b4b', fontWeight: 800, fontSize: 16 }}>طلب قالب — 1000 ريال</span>
        </div>
      </header>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>

        {/* Steps indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginBottom: 40 }}>
          {['بياناتك', 'تأكيد الدفع', 'النتيجة'].map((label, i) => {
            const done = (step === 'form' && i < 0) || (step === 'payment' && i < 1) || (step === 'success' || step === 'error') && i < 2;
            const active = (step === 'form' && i === 0) || (step === 'payment' && i === 1) || ((step === 'success' || step === 'error') && i === 2);
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: done ? '#10b981' : active ? '#6366f1' : '#e2e8f0',
                    color: done || active ? '#fff' : '#94a3b8',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, fontWeight: 900,
                    transition: 'all 0.3s',
                  }}>
                    {done ? '✓' : i + 1}
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: active ? '#6366f1' : done ? '#10b981' : '#94a3b8' }}>{label}</span>
                </div>
                {i < 2 && <div style={{ width: 60, height: 2, background: done ? '#10b981' : '#e2e8f0', margin: '0 8px', marginBottom: 24, transition: 'background 0.3s' }} />}
              </div>
            );
          })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 28, alignItems: 'start' }}>

          {/* Left: steps content */}
          <div>
            {/* STEP 1: Form */}
            {step === 'form' && (
              <div style={{ background: '#fff', borderRadius: 24, padding: '36px', boxShadow: '0 4px 30px rgba(99,102,241,0.09)', border: '1px solid #e0e7ff' }}>
                <h2 style={{ color: '#1e1b4b', fontSize: 22, fontWeight: 900, marginBottom: 6 }}>بياناتك الشخصية</h2>
                <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 32 }}>أدخل بياناتك لإتمام الطلب</p>
                <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div>
                    <label style={{ display: 'block', color: '#374151', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>الاسم الكامل</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      placeholder="أدخل اسمك الكامل"
                      required
                      style={{
                        width: '100%', padding: '14px 16px', borderRadius: 12,
                        border: '2px solid #e0e7ff', outline: 'none', fontSize: 15,
                        fontFamily: "'Cairo', sans-serif", color: '#1e1b4b',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={e => (e.target.style.borderColor = '#6366f1')}
                      onBlur={e => (e.target.style.borderColor = '#e0e7ff')}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#374151', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>رقم الهاتف</label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={e => setCustomerPhone(e.target.value)}
                      placeholder="+967 7XX XXX XXXX"
                      required
                      dir="ltr"
                      style={{
                        width: '100%', padding: '14px 16px', borderRadius: 12,
                        border: '2px solid #e0e7ff', outline: 'none', fontSize: 15,
                        fontFamily: "'Cairo', sans-serif", color: '#1e1b4b',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={e => (e.target.style.borderColor = '#6366f1')}
                      onBlur={e => (e.target.style.borderColor = '#e0e7ff')}
                    />
                  </div>
                  <button type="submit" style={{
                    width: '100%', padding: '15px', borderRadius: 14,
                    background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                    border: 'none', color: '#fff', fontSize: 16, fontWeight: 800,
                    cursor: 'pointer', boxShadow: '0 6px 20px rgba(99,102,241,0.35)',
                    transition: 'transform 0.2s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
                  >
                    متابعة للدفع ←
                  </button>
                </form>
              </div>
            )}

            {/* STEP 2: Payment verification */}
            {step === 'payment' && (
              <div style={{ background: '#fff', borderRadius: 24, padding: '36px', boxShadow: '0 4px 30px rgba(99,102,241,0.09)', border: '1px solid #e0e7ff' }}>
                <h2 style={{ color: '#1e1b4b', fontSize: 22, fontWeight: 900, marginBottom: 6 }}>تأكيد الدفع</h2>
                <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 28 }}>أرسل مبلغ 1000 ريال يمني ثم أدخل اسم المستلم للتأكيد</p>

                {/* Payment instruction box */}
                <div style={{
                  background: 'linear-gradient(135deg, #fef9ee, #fff7e6)',
                  border: '1.5px solid #fde68a',
                  borderRadius: 16, padding: '20px 22px', marginBottom: 28,
                }}>
                  <div style={{ color: '#92400e', fontSize: 13, fontWeight: 700, marginBottom: 6 }}>تعليمات الدفع</div>
                  <div style={{ color: '#78350f', fontSize: 14, lineHeight: 2 }}>
                    ١. أرسل مبلغ <strong>1000 ريال يمني</strong> إلى الحساب المخصص<br />
                    ٢. تأكد من صحة اسم المستلم قبل الإرسال<br />
                    ٣. أدخل اسم المستلم بالأسفل للتحقق من الدفع
                  </div>
                </div>

                <form onSubmit={handlePaymentVerify} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div>
                    <label style={{ display: 'block', color: '#374151', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>أدخل اسم المستلم للتحقق</label>
                    <input
                      type="text"
                      value={verifyName}
                      onChange={e => { setVerifyName(e.target.value); setNameError(''); }}
                      placeholder="اسم المستلم..."
                      required
                      style={{
                        width: '100%', padding: '14px 16px', borderRadius: 12,
                        border: `2px solid ${nameError ? '#ef4444' : '#e0e7ff'}`,
                        outline: 'none', fontSize: 15,
                        fontFamily: "'Cairo', sans-serif", color: '#1e1b4b',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={e => (e.target.style.borderColor = nameError ? '#ef4444' : '#6366f1')}
                      onBlur={e => (e.target.style.borderColor = nameError ? '#ef4444' : '#e0e7ff')}
                    />
                  </div>

                  <button type="submit" disabled={loading} style={{
                    width: '100%', padding: '15px', borderRadius: 14,
                    background: loading ? '#a5b4fc' : 'linear-gradient(135deg, #6366f1, #a855f7)',
                    border: 'none', color: '#fff', fontSize: 16, fontWeight: 800,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    boxShadow: '0 6px 20px rgba(99,102,241,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    transition: 'transform 0.2s',
                  }}>
                    {loading ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> جاري التحقق...</> : <><Send size={16} /> تأكيد الدفع</>}
                  </button>
                </form>

                <button onClick={() => setStep('form')} style={{
                  width: '100%', marginTop: 12, padding: '12px', borderRadius: 12,
                  background: 'transparent', border: '1.5px solid #e0e7ff',
                  color: '#94a3b8', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                }}>
                  ← رجوع
                </button>
              </div>
            )}

            {/* STEP 3a: Success */}
            {step === 'success' && (
              <div style={{
                background: '#fff', borderRadius: 24, padding: '48px 36px',
                boxShadow: '0 4px 30px rgba(16,185,129,0.12)', border: '2px solid #a7f3d0',
                textAlign: 'center',
              }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                  <CheckCircle size={72} color="#10b981" strokeWidth={1.5} />
                </div>
                <h2 style={{ color: '#065f46', fontSize: 26, fontWeight: 900, marginBottom: 12 }}>تم التحقق بنجاح!</h2>
                <p style={{ color: '#047857', fontSize: 17, lineHeight: 1.8, marginBottom: 32, fontWeight: 600 }}>
                  سوف نفتح لك القالب في دقائق قادمة
                </p>
                <div style={{ background: '#ecfdf5', borderRadius: 14, padding: '16px 20px', marginBottom: 32, textAlign: 'right' }}>
                  <div style={{ color: '#065f46', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>تفاصيل طلبك</div>
                  <div style={{ color: '#047857', fontSize: 14, lineHeight: 2 }}>
                    <div>الاسم: <strong>{customerName}</strong></div>
                    <div>الهاتف: <strong>{customerPhone}</strong></div>
                    <div>القالب: <strong>{template.name}</strong></div>
                    <div>المبلغ: <strong>1000 ريال يمني</strong></div>
                  </div>
                </div>
                <button onClick={() => setLocation('/')} style={{
                  padding: '13px 32px', borderRadius: 14,
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  border: 'none', color: '#fff', fontSize: 15, fontWeight: 800,
                  cursor: 'pointer', boxShadow: '0 6px 20px rgba(16,185,129,0.3)',
                }}>
                  العودة للرئيسية
                </button>
              </div>
            )}

            {/* STEP 3b: Error */}
            {step === 'error' && (
              <div style={{
                background: '#fff', borderRadius: 24, padding: '48px 36px',
                boxShadow: '0 4px 30px rgba(239,68,68,0.1)', border: '2px solid #fecaca',
                textAlign: 'center',
              }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                  <XCircle size={72} color="#ef4444" strokeWidth={1.5} />
                </div>
                <h2 style={{ color: '#991b1b', fontSize: 26, fontWeight: 900, marginBottom: 12 }}>لم يتم التحقق</h2>
                <p style={{ color: '#b91c1c', fontSize: 17, lineHeight: 1.8, marginBottom: 32, fontWeight: 600 }}>
                  معذرة يرجى المحاولة
                </p>
                <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 32, lineHeight: 1.8 }}>
                  الاسم الذي أدخلته غير صحيح. تأكد من إدخال اسم المستلم بشكل صحيح وحاول مجدداً.
                </p>
                <button onClick={() => { setVerifyName(''); setStep('payment'); }} style={{
                  width: '100%', padding: '14px', borderRadius: 14,
                  background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                  border: 'none', color: '#fff', fontSize: 15, fontWeight: 800,
                  cursor: 'pointer', boxShadow: '0 6px 20px rgba(99,102,241,0.3)',
                  marginBottom: 12,
                }}>
                  حاول مجدداً
                </button>
                <button onClick={() => setLocation('/')} style={{
                  width: '100%', padding: '12px', borderRadius: 12,
                  background: 'transparent', border: '1.5px solid #fecaca',
                  color: '#94a3b8', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                }}>
                  العودة للرئيسية
                </button>
              </div>
            )}
          </div>

          {/* Right: Template preview */}
          <div style={{ position: 'sticky', top: 90 }}>
            <div style={{
              background: '#fff', borderRadius: 20, padding: '20px',
              boxShadow: '0 4px 25px rgba(99,102,241,0.1)',
              border: '1px solid #e0e7ff',
            }}>
              <div style={{ color: '#6366f1', fontSize: 12, fontWeight: 800, marginBottom: 12, textAlign: 'center', letterSpacing: '0.05em' }}>القالب المختار</div>
              <div id="order-preview-target" ref={previewRef} style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                background: '#f8f7ff', borderRadius: 12, padding: '16px', overflow: 'hidden',
              }}>
                <div style={{ transform: 'scale(0.65)', transformOrigin: 'center', pointerEvents: 'none' }}>
                  <TemplateRenderer categoryId={categoryId} templateId={templateId} data={template.defaultData} />
                </div>
              </div>
              <div style={{ marginTop: 14, textAlign: 'center' }}>
                <div style={{ color: '#1e1b4b', fontWeight: 800, fontSize: 15 }}>{template.name}</div>
                <div style={{ color: '#6366f1', fontWeight: 900, fontSize: 22, marginTop: 4 }}>1000 ريال</div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>دفعة واحدة</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
