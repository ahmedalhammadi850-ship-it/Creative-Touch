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
import { getUserFromFirestore } from '../lib/firestoreService';

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { getUserByEmail, setCurrentUser, addUser } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [unverified, setUnverified] = useState(false);
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);

  const handleResend = async () => {
    setResending(true);
    setResent(false);
    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
      await sendEmailVerification(cred.user);
      await signOut(auth);
      setResent(true);
    } catch {
    } finally {
      setResending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setUnverified(false);
    if (!firebaseReady) { setError('خدمة تسجيل الدخول غير متاحة حالياً.'); return; }
    setLoading(true);
    try {
      const credential = await signInWithEmailAndPassword(auth, email.trim(), password);

      if (!credential.user.emailVerified) {
        await signOut(auth);
        setUnverified(true);
        setLoading(false);
        return;
      }

      // Sync latest data from Firestore (handles plan updates approved on other devices)
      const fsUser = await getUserFromFirestore(credential.user.uid).catch(() => null);
      const localUser = getUserByEmail(email.trim());

      if (localUser) {
        // Merge Firestore plan/templates on top of local data
        const merged = fsUser
          ? { ...localUser, plan: fsUser.plan, planStatus: fsUser.planStatus, planExpiresAt: fsUser.planExpiresAt, activatedTemplates: fsUser.activatedTemplates ?? localUser.activatedTemplates }
          : localUser;
        addUser(merged);
        setCurrentUser(merged);
      } else {
        const newUser = fsUser ?? {
          id: credential.user.uid,
          name: credential.user.displayName || email.split('@')[0],
          email: email.toLowerCase().trim(),
          plan: 'free' as const,
          planStatus: null as null,
          createdAt: new Date().toISOString(),
        };
        addUser(newUser);
        setCurrentUser(newUser);
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
          <h1 style={{ color: '#1e1b4b', fontSize: 24, fontWeight: 900, margin: '0 0 6px' }}>تسجيل الدخول</h1>
          <p style={{ color: '#64748b', fontSize: 14, margin: 0 }}>أهلاً بك في ستوديو القوالب</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 20, padding: 'clamp(20px,5vw,36px) clamp(16px,5vw,32px)', boxShadow: '0 8px 40px rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.1)' }}>

          {unverified ? (
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <div style={{ width: 68, height: 68, borderRadius: '50%', background: '#fef9ee', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
                <Mail size={34} color="#d97706" />
              </div>
              <h3 style={{ color: '#1e1b4b', fontSize: 19, fontWeight: 900, marginBottom: 10 }}>لم تتحقق من بريدك بعد</h3>
              <p style={{ color: '#64748b', fontSize: 13, lineHeight: 1.9, marginBottom: 6 }}>
                أرسلنا رابط التحقق إلى
              </p>
              <p style={{ color: '#6366f1', fontSize: 14, fontWeight: 800, marginBottom: 20, direction: 'ltr', wordBreak: 'break-all' }}>{email}</p>
              <p style={{ color: '#64748b', fontSize: 13, lineHeight: 1.8, marginBottom: 24 }}>
                افتح بريدك وانقر على رابط التحقق، ثم ارجع وسجّل دخولك من جديد.
              </p>

              {resent && (
                <div style={{ background: '#ecfdf5', border: '1px solid #6ee7b7', borderRadius: 10, padding: '10px 14px', color: '#059669', fontSize: 13, fontWeight: 700, marginBottom: 14 }}>
                  تم إعادة الإرسال بنجاح — راجع بريدك
                </div>
              )}

              <button onClick={handleResend} disabled={resending}
                style={{ width: '100%', padding: '12px', borderRadius: 14, background: 'transparent', border: '2px solid #6366f1', cursor: resending ? 'not-allowed' : 'pointer', color: '#6366f1', fontSize: 14, fontWeight: 800, fontFamily: "'Cairo',sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginBottom: 12 }}>
                <RefreshCw size={15} />
                {resending ? 'جاري الإرسال...' : 'إعادة إرسال رابط التحقق'}
              </button>

              <button onClick={() => setUnverified(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 13, fontWeight: 600 }}>
                ← العودة لتسجيل الدخول
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              <div>
                <label style={{ display: 'block', color: '#374151', fontSize: 13, fontWeight: 700, marginBottom: 7 }}>البريد الإلكتروني</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@email.com" dir="ltr" required autoComplete="email" inputMode="email" style={inp}
                  onFocus={e => (e.currentTarget.style.borderColor = '#6366f1')} onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')} />
              </div>

              <div>
                <label style={{ display: 'block', color: '#374151', fontSize: 13, fontWeight: 700, marginBottom: 7 }}>كلمة المرور</label>
                <div style={{ position: 'relative' }}>
                  <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required autoComplete="current-password"
                    style={{ ...inp, padding: '12px 44px 12px 14px' }}
                    onFocus={e => (e.currentTarget.style.borderColor = '#6366f1')} onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')} />
                  <button type="button" onClick={() => setShowPass(v => !v)}
                    style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 4 }}>
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <button type="button" onClick={() => setLocation('/forgot-password')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1', fontSize: 12, fontWeight: 700, marginTop: 6, padding: 0 }}>
                  نسيت كلمة المرور؟
                </button>
              </div>

              {error && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '10px 14px', color: '#dc2626', fontSize: 13, fontWeight: 600 }}>
                  {error}
                </div>
              )}

              <button type="submit" disabled={loading}
                style={{ width: '100%', padding: '13px', borderRadius: 14, background: loading ? '#e2e8f0' : 'linear-gradient(135deg,#6366f1,#a855f7)', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', color: loading ? '#94a3b8' : '#fff', fontSize: 15, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: loading ? 'none' : '0 6px 20px rgba(99,102,241,0.35)', fontFamily: "'Cairo',sans-serif", marginTop: 4, WebkitTapHighlightColor: 'transparent' }}>
                {loading ? 'جاري الدخول...' : <><LogIn size={17} /> دخول</>}
              </button>
            </form>
          )}

          {!unverified && (
            <div style={{ textAlign: 'center', marginTop: 20, paddingTop: 18, borderTop: '1px solid #f1f5f9' }}>
              <span style={{ color: '#64748b', fontSize: 13 }}>ليس لديك حساب؟ </span>
              <button onClick={() => setLocation('/register')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1', fontSize: 13, fontWeight: 800, padding: 0 }}>
                إنشاء حساب
              </button>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 14 }}>
          <button onClick={() => setLocation('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 13, fontWeight: 600 }}>
            ← العودة للرئيسية
          </button>
        </div>
      </div>
    </div>
  );
}
