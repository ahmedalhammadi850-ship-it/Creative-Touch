import { useState } from 'react';
import { useLocation } from 'wouter';
import { Eye, EyeOff, KeyRound, LayoutTemplate, CheckCircle } from 'lucide-react';
import { resetLocalPassword, getFirebaseErrorMessage } from '../lib/firebase';

export default function ForgotPasswordPage() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (newPassword.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }
    if (newPassword !== confirm) {
      setError('كلمتا المرور غير متطابقتين');
      return;
    }
    setLoading(true);
    try {
      await resetLocalPassword(email.trim(), newPassword);
      setDone(true);
    } catch (err: unknown) {
      const code = (err as { code?: string }).code || '';
      setError(getFirebaseErrorMessage(code));
    } finally {
      setLoading(false);
    }
  };

  const inp: React.CSSProperties = {
    width: '100%', padding: '12px 14px', borderRadius: 12,
    border: '2px solid #e2e8f0', fontSize: 15, outline: 'none',
    boxSizing: 'border-box', fontFamily: "'Cairo',sans-serif", transition: 'border-color 0.2s',
  };

  return (
    <div dir="rtl" style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#f8f7ff 0%,#eef2ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 16px', fontFamily: "'Cairo',sans-serif", boxSizing: 'border-box' }}>
      <div style={{ width: '100%', maxWidth: 420 }}>

        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ width: 56, height: 56, borderRadius: 18, background: 'linear-gradient(135deg,#6366f1,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', boxShadow: '0 8px 25px rgba(99,102,241,0.35)' }}>
            <LayoutTemplate size={26} color="#fff" />
          </div>
          <h1 style={{ color: '#1e1b4b', fontSize: 24, fontWeight: 900, margin: '0 0 6px' }}>إعادة تعيين كلمة المرور</h1>
          <p style={{ color: '#64748b', fontSize: 14, margin: 0 }}>أدخل بريدك وكلمة المرور الجديدة</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 20, padding: 'clamp(20px,5vw,36px) clamp(16px,5vw,32px)', boxShadow: '0 8px 40px rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.1)' }}>

          {done ? (
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <div style={{ width: 68, height: 68, borderRadius: '50%', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
                <CheckCircle size={36} color="#10b981" />
              </div>
              <h3 style={{ color: '#1e1b4b', fontSize: 20, fontWeight: 900, marginBottom: 10 }}>تم تغيير كلمة المرور!</h3>
              <p style={{ color: '#64748b', fontSize: 13, lineHeight: 1.8, marginBottom: 24 }}>
                يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة.
              </p>
              <button
                onClick={() => setLocation('/login')}
                style={{ width: '100%', padding: '13px', borderRadius: 14, background: 'linear-gradient(135deg,#6366f1,#a855f7)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 15, fontWeight: 800, fontFamily: "'Cairo',sans-serif", boxShadow: '0 6px 20px rgba(99,102,241,0.35)' }}
              >
                تسجيل الدخول الآن
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Email */}
              <div>
                <label style={{ display: 'block', color: '#374151', fontSize: 13, fontWeight: 700, marginBottom: 7 }}>البريد الإلكتروني المسجل</label>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="example@email.com" dir="ltr" required
                  autoComplete="email" inputMode="email" style={inp}
                  onFocus={e => (e.currentTarget.style.borderColor = '#6366f1')}
                  onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')}
                />
              </div>

              {/* New password */}
              <div>
                <label style={{ display: 'block', color: '#374151', fontSize: 13, fontWeight: 700, marginBottom: 7 }}>كلمة المرور الجديدة</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPass ? 'text' : 'password'} value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="6 أحرف على الأقل" required
                    autoComplete="new-password"
                    style={{ ...inp, padding: '12px 44px 12px 14px' }}
                    onFocus={e => (e.currentTarget.style.borderColor = '#6366f1')}
                    onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')}
                  />
                  <button type="button" onClick={() => setShowPass(v => !v)}
                    style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 4 }}>
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm */}
              <div>
                <label style={{ display: 'block', color: '#374151', fontSize: 13, fontWeight: 700, marginBottom: 7 }}>تأكيد كلمة المرور الجديدة</label>
                <input
                  type={showPass ? 'text' : 'password'} value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  placeholder="أعد كتابة كلمة المرور" required
                  autoComplete="new-password" style={inp}
                  onFocus={e => (e.currentTarget.style.borderColor = '#6366f1')}
                  onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')}
                />
              </div>

              {/* Error */}
              {error && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '10px 14px', color: '#dc2626', fontSize: 13, fontWeight: 600 }}>
                  {error}
                </div>
              )}

              <button
                type="submit" disabled={loading}
                style={{ width: '100%', padding: '13px', borderRadius: 14, background: loading ? '#e2e8f0' : 'linear-gradient(135deg,#6366f1,#a855f7)', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', color: loading ? '#94a3b8' : '#fff', fontSize: 15, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: loading ? 'none' : '0 6px 20px rgba(99,102,241,0.35)', fontFamily: "'Cairo',sans-serif", marginTop: 4 }}
              >
                {loading ? 'جاري التحديث...' : <><KeyRound size={17} />تعيين كلمة مرور جديدة</>}
              </button>
            </form>
          )}

          <div style={{ textAlign: 'center', marginTop: 20, paddingTop: 18, borderTop: '1px solid #f1f5f9' }}>
            <button onClick={() => setLocation('/login')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1', fontSize: 13, fontWeight: 800, padding: 0 }}>
              ← العودة لتسجيل الدخول
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
