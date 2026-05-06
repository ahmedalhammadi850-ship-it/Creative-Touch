import { useLocation } from 'wouter';
import { KeyRound, LayoutTemplate } from 'lucide-react';

export default function ResetPasswordPage() {
  const [, setLocation] = useLocation();

  return (
    <div dir="rtl" style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#f8f7ff 0%,#eef2ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'Cairo',sans-serif" }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, borderRadius: 18, background: 'linear-gradient(135deg,#6366f1,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 8px 25px rgba(99,102,241,0.35)' }}>
            <LayoutTemplate size={26} color="#fff" />
          </div>
          <h1 style={{ color: '#1e1b4b', fontSize: 26, fontWeight: 900, margin: '0 0 8px' }}>تعيين كلمة مرور جديدة</h1>
          <p style={{ color: '#64748b', fontSize: 14, margin: 0 }}>استخدم الرابط الذي وصلك في البريد الإلكتروني</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 24, padding: '40px 32px', boxShadow: '0 8px 40px rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.1)', textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <KeyRound size={30} color="#6366f1" />
          </div>
          <h3 style={{ color: '#1e1b4b', fontSize: 18, fontWeight: 900, marginBottom: 12 }}>تحقق من بريدك الإلكتروني</h3>
          <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.9, marginBottom: 28 }}>
            لقد أرسلنا لك رابط إعادة تعيين كلمة المرور.
            <br />
            انقر على الرابط في البريد الإلكتروني لإنشاء كلمة مرور جديدة.
            <br />
            <span style={{ color: '#94a3b8', fontSize: 12 }}>إذا لم تجد الرسالة تحقق من مجلد Spam.</span>
          </p>
          <button
            onClick={() => setLocation('/forgot-password')}
            style={{ width: '100%', padding: '13px', borderRadius: 14, background: 'linear-gradient(135deg,#6366f1,#a855f7)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 15, fontWeight: 800, fontFamily: "'Cairo',sans-serif", boxShadow: '0 6px 20px rgba(99,102,241,0.35)', marginBottom: 12 }}>
            إعادة إرسال الرابط
          </button>
          <button
            onClick={() => setLocation('/login')}
            style={{ width: '100%', padding: '11px', borderRadius: 14, background: 'transparent', border: '2px solid #e2e8f0', cursor: 'pointer', color: '#64748b', fontSize: 14, fontWeight: 700, fontFamily: "'Cairo',sans-serif" }}>
            تسجيل الدخول
          </button>
        </div>
      </div>
    </div>
  );
}
