import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuthStore } from '../store/useAuthStore';
import { Mail, LayoutTemplate, Copy, Check } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [, setLocation] = useLocation();
  const { forgotPassword } = useAuthStore();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetToken, setResetToken] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 400));
    const result = forgotPassword(email.trim());
    setLoading(false);
    if (result.success && result.token) setResetToken(result.token);
    else setError(result.error || 'حدث خطأ');
  };

  const copyToken = () => {
    navigator.clipboard.writeText(resetToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inp: React.CSSProperties = { width: '100%', padding: '11px 14px', borderRadius: 12, border: '2px solid #e2e8f0', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: "'Cairo',sans-serif", transition: 'border-color 0.2s' };

  return (
    <div dir="rtl" style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#f8f7ff 0%,#eef2ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'Cairo',sans-serif" }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, borderRadius: 18, background: 'linear-gradient(135deg,#6366f1,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 8px 25px rgba(99,102,241,0.35)' }}>
            <LayoutTemplate size={26} color="#fff" />
          </div>
          <h1 style={{ color: '#1e1b4b', fontSize: 26, fontWeight: 900, margin: '0 0 8px' }}>استعادة كلمة المرور</h1>
          <p style={{ color: '#64748b', fontSize: 14, margin: 0 }}>أدخل بريدك الإلكتروني للحصول على رمز الاستعادة</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 24, padding: '36px 32px', boxShadow: '0 8px 40px rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.1)' }}>
          {!resetToken ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <label style={{ display: 'block', color: '#374151', fontSize: 13, fontWeight: 700, marginBottom: 7 }}>البريد الإلكتروني المسجل</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@email.com" dir="ltr" required style={inp}
                  onFocus={e => (e.currentTarget.style.borderColor = '#6366f1')} onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')} />
              </div>
              {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '10px 14px', color: '#dc2626', fontSize: 13, fontWeight: 600 }}>{error}</div>}
              <button type="submit" disabled={loading}
                style={{ width: '100%', padding: '13px', borderRadius: 14, background: loading ? '#e2e8f0' : 'linear-gradient(135deg,#6366f1,#a855f7)', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', color: loading ? '#94a3b8' : '#fff', fontSize: 15, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: loading ? 'none' : '0 6px 20px rgba(99,102,241,0.35)', fontFamily: "'Cairo',sans-serif" }}>
                {loading ? 'جاري الإرسال...' : <><Mail size={17} />إرسال رمز الاستعادة</>}
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Check size={28} color="#10b981" />
              </div>
              <h3 style={{ color: '#1e1b4b', fontSize: 18, fontWeight: 900, marginBottom: 8 }}>رمز الاستعادة الخاص بك</h3>
              <p style={{ color: '#64748b', fontSize: 13, marginBottom: 20, lineHeight: 1.7 }}>احفظ هذا الرمز واستخدمه في صفحة إعادة تعيين كلمة المرور. صالح لمدة 15 دقيقة.</p>

              <div style={{ background: '#f8f7ff', border: '2px solid #c7d2fe', borderRadius: 14, padding: '20px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <span style={{ color: '#3730a3', fontSize: 28, fontWeight: 900, letterSpacing: 6 }}>{resetToken}</span>
                <button onClick={copyToken} style={{ background: copied ? '#ecfdf5' : '#eef2ff', border: 'none', cursor: 'pointer', borderRadius: 10, padding: '8px 12px', color: copied ? '#10b981' : '#6366f1', display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 700, fontFamily: "'Cairo',sans-serif" }}>
                  {copied ? <><Check size={14} />تم النسخ</> : <><Copy size={14} />نسخ</>}
                </button>
              </div>

              <button onClick={() => setLocation('/reset-password')}
                style={{ width: '100%', padding: '13px', borderRadius: 14, background: 'linear-gradient(135deg,#6366f1,#a855f7)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 15, fontWeight: 800, fontFamily: "'Cairo',sans-serif", boxShadow: '0 6px 20px rgba(99,102,241,0.35)' }}>
                إعادة تعيين كلمة المرور
              </button>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: 22, paddingTop: 20, borderTop: '1px solid #f1f5f9' }}>
            <button onClick={() => setLocation('/login')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1', fontSize: 13, fontWeight: 800, padding: 0 }}>← العودة لتسجيل الدخول</button>
          </div>
        </div>
      </div>
    </div>
  );
}
