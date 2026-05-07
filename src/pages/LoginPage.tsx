import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, LogIn, LayoutTemplate, Mail, RefreshCw } from 'lucide-react';
import {
  auth,
  firebaseReady,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  getFirebaseErrorMessage,
} from '../lib/firebase';

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { getUserByEmail, setCurrentUser } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [notVerified, setNotVerified] = useState(false);
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setNotVerified(false);
    if (!firebaseReady) {
      setError('خدمة تسجيل الدخول غير متاحة حالياً. يرجى التواصل مع الدعم.');
      return;
    }
    setLoading(true);
    try {
      const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
      if (!credential.user.emailVerified) {
        await signOut(auth);
        setNotVerified(true);
        setLoading(false);
        return;
      }
      const localUser = getUserByEmail(email.trim());
      if (localUser) {
        setCurrentUser(localUser);
      } else {
        setCurrentUser({
          id: credential.user.uid,
          name: credential.user.displayName || email.split('@')[0],
          email: email.toLowerCase().trim(),
          plan: 'free',
          planStatus: null,
          createdAt: new Date().toISOString(),
        });
      }
      await signOut(auth);
      setLocation('/dashboard');
    } catch (err: unknown) {
      const code = (err as { code?: string }).code || '';
      setError(getFirebaseErrorMessage(code));
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setResending(true);
    try {
      const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
      if (!credential.user.emailVerified) {
        await sendEmailVerification(credential.user);
        await signOut(auth);
        setResent(true);
      }
    } catch {
    } finally {
      setResending(false);
    }
  };

  const s = {
    page: { minHeight: '100vh', background: 'linear-gradient(135deg,#f8f7ff 0%,#eef2ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'Cairo',sans-serif" } as React.CSSProperties,
    card: { background: '#fff', borderRadius: 24, padding: '36px 32px', boxShadow: '0 8px 40px rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.1)' } as React.CSSProperties,
    input: { width: '100%', padding: '11px 14px', borderRadius: 12, border: '2px solid #e2e8f0', fontSize: 14, outline: 'none', boxSizing: 'border-box' as const, fontFamily: "'Cairo',sans-serif", transition: 'border-color 0.2s' },
    label: { display: 'block', color: '#374151', fontSize: 13, fontWeight: 700, marginBottom: 7 } as React.CSSProperties,
  };

  return (
    <div dir="rtl" style={s.page}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, borderRadius: 18, background: 'linear-gradient(135deg,#6366f1,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 8px 25px rgba(99,102,241,0.35)' }}>
            <LayoutTemplate size={26} color="#fff" />
          </div>
          <h1 style={{ color: '#1e1b4b', fontSize: 26, fontWeight: 900, margin: '0 0 8px' }}>تسجيل الدخول</h1>
          <p style={{ color: '#64748b', fontSize: 14, margin: 0 }}>أهلاً بك في ستوديو القوالب</p>
        </div>

        <div style={s.card}>
          {notVerified ? (
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#fef9ee', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px', border: '2px solid #fde68a' }}>
                <Mail size={30} color="#d97706" />
              </div>
              <h3 style={{ color: '#1e1b4b', fontSize: 18, fontWeight: 900, marginBottom: 10 }}>البريد الإلكتروني غير مفعّل</h3>
              <p style={{ color: '#64748b', fontSize: 13, lineHeight: 1.8, marginBottom: 6 }}>
                يجب تفعيل بريدك الإلكتروني أولاً.
              </p>
              <p style={{ color: '#6366f1', fontSize: 14, fontWeight: 700, marginBottom: 24, direction: 'ltr' }}>{email}</p>

              {resent && (
                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '10px 14px', color: '#16a34a', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
                  تم إعادة إرسال رسالة التحقق بنجاح
                </div>
              )}

              <button
                onClick={handleResendVerification}
                disabled={resending || resent}
                style={{ width: '100%', padding: '12px', borderRadius: 14, background: resent ? '#f0fdf4' : 'linear-gradient(135deg,#6366f1,#a855f7)', border: resent ? '2px solid #bbf7d0' : 'none', cursor: resending ? 'not-allowed' : 'pointer', color: resent ? '#16a34a' : '#fff', fontSize: 14, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontFamily: "'Cairo',sans-serif", marginBottom: 12 }}>
                <RefreshCw size={15} />
                {resending ? 'جاري الإرسال...' : resent ? 'تم الإرسال ✓' : 'إعادة إرسال رسالة التحقق'}
              </button>
              <button
                onClick={() => { setNotVerified(false); setResent(false); }}
                style={{ width: '100%', padding: '11px', borderRadius: 14, background: 'transparent', border: '2px solid #e2e8f0', cursor: 'pointer', color: '#64748b', fontSize: 14, fontWeight: 700, fontFamily: "'Cairo',sans-serif" }}>
                العودة لتسجيل الدخول
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <label style={s.label}>البريد الإلكتروني</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@email.com" dir="ltr" required style={s.input}
                  onFocus={e => (e.currentTarget.style.borderColor = '#6366f1')}
                  onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')} />
              </div>
              <div>
                <label style={s.label}>كلمة المرور</label>
                <div style={{ position: 'relative' }}>
                  <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required
                    style={{ ...s.input, padding: '11px 44px 11px 14px' }}
                    onFocus={e => (e.currentTarget.style.borderColor = '#6366f1')}
                    onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')} />
                  <button type="button" onClick={() => setShowPass(v => !v)} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                    {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                <button type="button" onClick={() => setLocation('/forgot-password')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1', fontSize: 12, fontWeight: 700, marginTop: 6, padding: 0 }}>نسيت كلمة المرور؟</button>
              </div>

              {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '10px 14px', color: '#dc2626', fontSize: 13, fontWeight: 600 }}>{error}</div>}

              <button type="submit" disabled={loading}
                style={{ width: '100%', padding: '13px', borderRadius: 14, background: loading ? '#e2e8f0' : 'linear-gradient(135deg,#6366f1,#a855f7)', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', color: loading ? '#94a3b8' : '#fff', fontSize: 15, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: loading ? 'none' : '0 6px 20px rgba(99,102,241,0.35)', fontFamily: "'Cairo',sans-serif" }}>
                {loading ? 'جاري الدخول...' : <><LogIn size={17} />دخول</>}
              </button>
            </form>
          )}

          {!notVerified && (
            <div style={{ textAlign: 'center', marginTop: 22, paddingTop: 20, borderTop: '1px solid #f1f5f9' }}>
              <span style={{ color: '#64748b', fontSize: 13 }}>ليس لديك حساب؟ </span>
              <button onClick={() => setLocation('/register')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1', fontSize: 13, fontWeight: 800, padding: 0 }}>إنشاء حساب</button>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button onClick={() => setLocation('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 13, fontWeight: 600 }}>← العودة للرئيسية</button>
        </div>
      </div>
    </div>
  );
}
