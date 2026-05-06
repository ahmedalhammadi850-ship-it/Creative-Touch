import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, KeyRound, LayoutTemplate, CheckCircle } from 'lucide-react';

export default function ResetPasswordPage() {
  const [, setLocation] = useLocation();
  const { resetPassword } = useAuthStore();
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) { setError('كلمتا المرور غير متطابقتين'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 400));
    const result = resetPassword(token.trim(), password);
    setLoading(false);
    if (result.success) setSuccess(true);
    else setError(result.error || 'حدث خطأ');
  };

  const inp: React.CSSProperties = { width: '100%', padding: '11px 14px', borderRadius: 12, border: '2px solid #e2e8f0', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: "'Cairo',sans-serif", transition: 'border-color 0.2s' };

  return (
    <div dir="rtl" style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#f8f7ff 0%,#eef2ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'Cairo',sans-serif" }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, borderRadius: 18, background: 'linear-gradient(135deg,#6366f1,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 8px 25px rgba(99,102,241,0.35)' }}>
            <LayoutTemplate size={26} color="#fff" />
          </div>
          <h1 style={{ color: '#1e1b4b', fontSize: 26, fontWeight: 900, margin: '0 0 8px' }}>تعيين كلمة مرور جديدة</h1>
          <p style={{ color: '#64748b', fontSize: 14, margin: 0 }}>أدخل رمز الاستعادة وكلمة المرور الجديدة</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 24, padding: '36px 32px', boxShadow: '0 8px 40px rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.1)' }}>
          {success ? (
            <div style={{ textAlign: 'center', padding: '12px 0' }}>
              <div style={{ width: 68, height: 68, borderRadius: '50%', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
                <CheckCircle size={36} color="#10b981" />
              </div>
              <h3 style={{ color: '#1e1b4b', fontSize: 20, fontWeight: 900, marginBottom: 10 }}>تم تغيير كلمة المرور!</h3>
              <p style={{ color: '#64748b', fontSize: 14, marginBottom: 24 }}>يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة.</p>
              <button onClick={() => setLocation('/login')}
                style={{ width: '100%', padding: '13px', borderRadius: 14, background: 'linear-gradient(135deg,#6366f1,#a855f7)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 15, fontWeight: 800, fontFamily: "'Cairo',sans-serif" }}>
                تسجيل الدخول
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', color: '#374151', fontSize: 13, fontWeight: 700, marginBottom: 7 }}>رمز الاستعادة (6 أرقام)</label>
                <input value={token} onChange={e => setToken(e.target.value)} placeholder="123456" dir="ltr" maxLength={6} required style={{ ...inp, textAlign: 'center', fontSize: 20, fontWeight: 700, letterSpacing: 6 }}
                  onFocus={e => (e.currentTarget.style.borderColor = '#6366f1')} onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')} />
              </div>
              <div>
                <label style={{ display: 'block', color: '#374151', fontSize: 13, fontWeight: 700, marginBottom: 7 }}>كلمة المرور الجديدة</label>
                <div style={{ position: 'relative' }}>
                  <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="6 أحرف على الأقل" required style={{ ...inp, padding: '11px 44px 11px 14px' }}
                    onFocus={e => (e.currentTarget.style.borderColor = '#6366f1')} onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')} />
                  <button type="button" onClick={() => setShowPass(v => !v)} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                    {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', color: '#374151', fontSize: 13, fontWeight: 700, marginBottom: 7 }}>تأكيد كلمة المرور</label>
                <input type={showPass ? 'text' : 'password'} value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="أعد كتابة كلمة المرور" required style={inp}
                  onFocus={e => (e.currentTarget.style.borderColor = '#6366f1')} onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')} />
              </div>

              {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '10px 14px', color: '#dc2626', fontSize: 13, fontWeight: 600 }}>{error}</div>}

              <button type="submit" disabled={loading}
                style={{ width: '100%', padding: '13px', borderRadius: 14, background: loading ? '#e2e8f0' : 'linear-gradient(135deg,#6366f1,#a855f7)', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', color: loading ? '#94a3b8' : '#fff', fontSize: 15, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: "'Cairo',sans-serif" }}>
                {loading ? 'جاري الحفظ...' : <><KeyRound size={17} />تعيين كلمة المرور</>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
