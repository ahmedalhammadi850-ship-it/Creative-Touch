import { useState, useRef, useCallback } from 'react';
import { X, Send, CheckCircle, Clock, ImageIcon } from 'lucide-react';
import { useRequestStore } from '../store/useRequestStore';
import { useAuthStore } from '../store/useAuthStore';

const N8N_WEBHOOK = 'https://ahmedaaasss.app.n8n.cloud/webhook-test/060b55ea-bd8e-4d32-9968-d37bff3b7be5';
const COOLDOWN_KEY = 'payment_request_last_sent';
const COOLDOWN_MS = 60_000;

interface PaymentRequestModalProps {
  onClose: () => void;
  templateName?: string;
}

export function PaymentRequestModal({ onClose, templateName }: PaymentRequestModalProps) {
  const { addRequest } = useRequestStore();
  const { user } = useAuthStore();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [cooldownLeft, setCooldownLeft] = useState<number>(0);
  const fileRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getRemainingCooldown = () => {
    const last = localStorage.getItem(COOLDOWN_KEY);
    if (!last) return 0;
    const elapsed = Date.now() - parseInt(last, 10);
    return Math.max(0, Math.ceil((COOLDOWN_MS - elapsed) / 1000));
  };

  const startCooldownTimer = (seconds: number) => {
    setCooldownLeft(seconds);
    timerRef.current = setInterval(() => {
      setCooldownLeft(prev => {
        if (prev <= 1) { if (timerRef.current) clearInterval(timerRef.current); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const handleImageChange = useCallback((file: File) => {
    setImage(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleImageChange(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const remaining = getRemainingCooldown();
    if (remaining > 0) { startCooldownTimer(remaining); return; }
    if (!name.trim() || !phone.trim()) { setError('يرجى ملء جميع الحقول المطلوبة'); return; }
    if (!image) { setError('يرجى رفع صورة إيصال الدفع'); return; }

    setSending(true);
    try {
      const toBase64 = (f: File): Promise<string> =>
        new Promise((res, rej) => {
          const r = new FileReader();
          r.onload = () => res((r.result as string).split(',')[1]);
          r.onerror = rej;
          r.readAsDataURL(f);
        });

      const imageBase64 = await toBase64(image);

      // Save to local store
      addRequest({
        type: 'activation',
        userId: user?.id,
        userName: name.trim(),
        userPhone: phone.trim(),
        userEmail: user?.email,
        templateName: templateName || 'غير محدد',
        imageBase64,
        imageName: image.name,
      });

      // Also send to n8n
      try {
        await fetch(N8N_WEBHOOK, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name.trim(), phone: phone.trim(), template: templateName, imageName: image.name, imageBase64, sentAt: new Date().toISOString() }),
        });
      } catch { /* n8n failure is non-blocking */ }

      localStorage.setItem(COOLDOWN_KEY, Date.now().toString());
      setSent(true);
      startCooldownTimer(60);
    } catch {
      setError('حدث خطأ أثناء الإرسال. يرجى المحاولة مجدداً.');
    } finally {
      setSending(false);
    }
  };

  const handleTryAgain = () => {
    const remaining = getRemainingCooldown();
    if (remaining > 0) { startCooldownTimer(remaining); return; }
    setSent(false); setName(user?.name || ''); setPhone(''); setImage(null); setImagePreview(null); setError('');
  };

  const inp: React.CSSProperties = { width: '100%', padding: '11px 14px', borderRadius: 12, border: '2px solid #e2e8f0', fontSize: 14, fontFamily: "'Cairo',sans-serif", outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' };

  return (
    <div dir="rtl"
      style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, fontFamily: "'Cairo',sans-serif" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: '#fff', borderRadius: 28, width: '100%', maxWidth: 480, boxShadow: '0 32px 80px rgba(0,0,0,0.2)', overflow: 'hidden' }}>

        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)', padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 900, margin: 0 }}>طلب تفعيل القالب</h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, margin: '4px 0 0' }}>أرسل إيصال الدفع للتفعيل</p>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '28px 28px 32px' }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '12px 0' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#ecfdf5', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle size={38} color="#10b981" />
              </div>
              <h3 style={{ color: '#1e1b4b', fontSize: 20, fontWeight: 900, marginBottom: 10 }}>تم إرسال رسالتك!</h3>
              <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.8, marginBottom: 28 }}>سيتم مراجعة طلبك من قِبل الإدارة والرد عليك في أقرب وقت.</p>
              {cooldownLeft > 0 ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#fef9ee', border: '1px solid #fde68a', borderRadius: 12, padding: '12px 20px', marginBottom: 16 }}>
                  <Clock size={16} color="#d97706" />
                  <span style={{ color: '#92400e', fontSize: 13, fontWeight: 700 }}>يمكنك الإرسال مجدداً بعد {cooldownLeft} ثانية</span>
                </div>
              ) : (
                <button onClick={handleTryAgain} style={{ width: '100%', padding: '13px', borderRadius: 14, background: '#eef2ff', border: '2px solid #c7d2fe', color: '#6366f1', fontSize: 15, fontWeight: 800, cursor: 'pointer', marginBottom: 12, fontFamily: "'Cairo',sans-serif" }}>
                  إرسال طلب آخر
                </button>
              )}
              <button onClick={onClose} style={{ width: '100%', padding: '13px', borderRadius: 14, background: 'transparent', border: '2px solid #e2e8f0', color: '#64748b', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: "'Cairo',sans-serif" }}>إغلاق</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Two-column fields */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
                <div>
                  <label style={{ display: 'block', color: '#374151', fontSize: 13, fontWeight: 700, marginBottom: 6 }}>الاسم الكامل <span style={{ color: '#ef4444' }}>*</span></label>
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="أدخل اسمك" style={inp}
                    onFocus={e => (e.currentTarget.style.borderColor = '#6366f1')} onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#374151', fontSize: 13, fontWeight: 700, marginBottom: 6 }}>رقم الهاتف <span style={{ color: '#ef4444' }}>*</span></label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="07xxxxxxxx" dir="ltr" style={{ ...inp, textAlign: 'right' }}
                    onFocus={e => (e.currentTarget.style.borderColor = '#6366f1')} onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')} />
                </div>
              </div>

              {/* Image upload */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', color: '#374151', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>صورة إيصال الدفع <span style={{ color: '#ef4444' }}>*</span></label>
                <div onDrop={handleDrop} onDragOver={e => e.preventDefault()} onClick={() => fileRef.current?.click()}
                  style={{ border: `2px dashed ${imagePreview ? '#10b981' : '#c7d2fe'}`, borderRadius: 16, padding: imagePreview ? 10 : '28px 16px', textAlign: 'center', cursor: 'pointer', background: imagePreview ? '#f0fdf4' : '#f8f7ff', transition: 'all 0.2s' }}>
                  {imagePreview ? (
                    <div>
                      <img src={imagePreview} alt="preview" style={{ maxHeight: 140, borderRadius: 10, objectFit: 'contain' }} />
                      <p style={{ color: '#10b981', fontSize: 12, fontWeight: 700, marginTop: 8, marginBottom: 0 }}>✓ تم رفع الصورة — انقر للتغيير</p>
                    </div>
                  ) : (
                    <>
                      <div style={{ width: 48, height: 48, borderRadius: 14, background: '#eef2ff', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ImageIcon size={24} color="#6366f1" />
                      </div>
                      <p style={{ color: '#374151', fontSize: 14, fontWeight: 700, margin: '0 0 4px' }}>اسحب الصورة هنا أو انقر للرفع</p>
                      <p style={{ color: '#94a3b8', fontSize: 12, margin: 0 }}>PNG، JPG، WEBP</p>
                    </>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) handleImageChange(f); }} />
              </div>

              {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '10px 14px', marginBottom: 16, color: '#dc2626', fontSize: 13, fontWeight: 600 }}>{error}</div>}
              {cooldownLeft > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fef9ee', border: '1px solid #fde68a', borderRadius: 10, padding: '10px 14px', marginBottom: 16 }}>
                  <Clock size={15} color="#d97706" />
                  <span style={{ color: '#92400e', fontSize: 13, fontWeight: 700 }}>يرجى الانتظار {cooldownLeft} ثانية قبل الإرسال مجدداً</span>
                </div>
              )}

              <button type="submit" disabled={sending || cooldownLeft > 0}
                style={{ width: '100%', padding: '14px', borderRadius: 14, background: sending || cooldownLeft > 0 ? '#e2e8f0' : 'linear-gradient(135deg,#6366f1,#a855f7)', border: 'none', cursor: sending || cooldownLeft > 0 ? 'not-allowed' : 'pointer', color: sending || cooldownLeft > 0 ? '#94a3b8' : '#fff', fontSize: 15, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: "'Cairo',sans-serif", boxShadow: sending || cooldownLeft > 0 ? 'none' : '0 6px 20px rgba(99,102,241,0.35)' }}>
                {sending ? 'جاري الإرسال...' : <><Send size={17} />إرسال طلب التفعيل</>}
              </button>
              <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: 12, marginTop: 14 }}>سيتم مراجعة طلبك وسيصلك الرد قريباً</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
