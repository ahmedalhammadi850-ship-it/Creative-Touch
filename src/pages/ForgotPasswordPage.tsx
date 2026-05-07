import { useState } from 'react';
import { useLocation } from 'wouter';
import { Mail, LayoutTemplate, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    setSent(true);
    setLoading(false);
  };

  const inp: React.CSSProperties = {
    width: '100%', padding: '11px 14px', borderRadius: 12,
    border: '2px solid #e2e8f0', fontSize: 14, outline: 'none',
    boxSizing: 'border-box', fontFamily: "'Cairo',sans-serif", transition: 'border-color 0.2s',
  };

  return (
    <div dir="rtl" style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#f8f7ff 0%,#eef2ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'Cairo',sans-serif" }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, borderRadius: 18, background: 'linear-gradient(135deg,#6366f1,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 8px 25px rgba(99,102,241,0.35)' }}>
            <LayoutTemplate size={26} color="#fff" />
          </div>
          <h1 style={{ color: '#1e1b4b', fontSize: 26, fontWeight: 900, margin: '0 0 8px' }}>استعادة كلمة المرور</h1>
          <p style={{ color: '#64748b', fontSize: 14, margin: 0 }}>سنرسل لك رابط إعادة التعيين على بريدك الإلكتروني</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 24, padding: '36px 32px', boxShadow: '0 8px 40px rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.1)' }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <div style={{ width: 68, height: 68, borderRadius: '50%', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
                <CheckCircle size={36} color="#10b981" />
              </div>
              <h3 style={{ color: '#1e1b4b', fontSize: 20, fontWeight: 900, marginBottom: 10 }}>تم إرسال الرابط!</h3>
              <p style={{ color: '#64748b', fontSize: 13, lineHeight: 1.8, marginBottom: 8 }}>
                أرسلنا رابط إعادة تعيين كلمة المرور إلى
              </p>
              <p style={{ color: '#6366f1', fontSize: 14, fontWeight: 800, marginBottom: 20, direction: 'ltr' }}>{email}</p>
              <p style={{ color: '#94a3b8', fontSize: 12, lineHeight: 1.8, marginBottom: 28 }}>
                افتح بريدك وانقر على الرابط لإعادة تعيين كلمة المرور.
                <br />
                تأكد من مراجعة مجلد Spam إذا لم تجد الرسالة.
              </p>
              <button onClick={() => setLocation('/login')}
                style={{ width: '100%', padding: '13px', borderRadius: 14, background: 'linear-gradient(135deg,#6366f1,#a855f7)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 15, fontWeight: 800, fontFamily: "'Cairo',sans-serif", boxShadow: '0 6px 20px rgba(99,102,241,0.35)' }}>
                العودة لتسجيل الدخول
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <label style={{ display: 'block', color: '#374151', fontSize: 13, fontWeight: 700, marginBottom: 7 }}>البريد الإلكتروني المسجل</label>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="example@email.com" dir="ltr" required style={inp}
                  onFocus={e => (e.currentTarget.style.borderColor = '#6366f1')}
                  onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')} />
              </div>
              <button type="submit" disabled={loading}
                style={{ width: '100%', padding: '13px', borderRadius: 14, background: loading ? '#e2e8f0' : 'linear-gradient(135deg,#6366f1,#a855f7)', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', color: loading ? '#94a3b8' : '#fff', fontSize: 15, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: loading ? 'none' : '0 6px 20px rgba(99,102,241,0.35)', fontFamily: "'Cairo',sans-serif" }}>
                {loading ? 'جاري الإرسال...' : <><Mail size={17} />إرسال رابط الاستعادة</>}
              </button>
            </form>
          )}

          <div style={{ textAlign: 'center', marginTop: 22, paddingTop: 20, borderTop: '1px solid #f1f5f9' }}>
            <button onClick={() => setLocation('/login')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1', fontSize: 13, fontWeight: 800, padding: 0 }}>← العودة لتسجيل الدخول</button>
          </div>
        </div>
      </div>
    </div>
  );
}
