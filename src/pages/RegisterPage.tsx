import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, UserPlus, LayoutTemplate, Mail, CheckCircle, RefreshCw, Loader2 } from 'lucide-react';
import {
  auth,
  firebaseReady,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  signOut,
  getFirebaseErrorMessage,
} from '../lib/firebase';

type Step = 'form' | 'verify';

export default function RegisterPage() {
  const [, setLocation] = useLocation();
  const { addUser, getUserByEmail, setCurrentUser } = useAuthStore();

  const [step, setStep] = useState<Step>('form');
  const [verifyEmail, setVerifyEmail] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [checking, setChecking] = useState(false);
  const [verifyError, setVerifyError] = useState('');
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);
  const checkingRef = useRef(false);

  const handleVerified = async (silent = false) => {
    if (checkingRef.current) return;
    checkingRef.current = true;
    if (!silent) setChecking(true);
    setVerifyError('');

    try {
      const fbUser = auth.currentUser;
      if (!fbUser) {
        if (!silent) setVerifyError('انتهت جلسة التسجيل. يرجى تسجيل الدخول.');
        return;
      }

      await fbUser.reload();

      if (!auth.currentUser?.emailVerified) {
        if (!silent) setVerifyError('لم يتم التحقق بعد. راجع بريدك وانقر على الرابط.');
        return;
      }

      const fbVerifiedUser = auth.currentUser;
      const localUser = getUserByEmail(fbVerifiedUser.email!);
      if (localUser) {
        setCurrentUser(localUser);
      } else {
        const newUser = {
          id: fbVerifiedUser.uid,
          name: fbVerifiedUser.displayName || verifyEmail.split('@')[0],
          email: fbVerifiedUser.email!.toLowerCase(),
          plan: 'free' as const,
          planStatus: null as null,
          createdAt: new Date().toISOString(),
        };
        addUser(newUser);
        setCurrentUser(newUser);
      }

      await signOut(auth);
      setLocation('/dashboard');
    } catch {
      if (!silent) setVerifyError('حدث خطأ. يرجى المحاولة مرة أخرى.');
    } finally {
      checkingRef.current = false;
      if (!silent) setChecking(false);
    }
  };

  useEffect(() => {
    if (step !== 'verify') return;
    const onFocus = () => handleVerified(true);
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [step]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) { setError('يرجى إدخال الاسم الكامل'); return; }
    if (password !== confirm) { setError('كلمتا المرور غير متطابقتين'); return; }
    if (password.length < 6) { setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل'); return; }
    if (!firebaseReady) { setError('خدمة إنشاء الحساب غير متاحة حالياً.'); return; }

    setLoading(true);
    try {
      const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      await updateProfile(credential.user, { displayName: name.trim() });

      await sendEmailVerification(credential.user);

      addUser({
        id: credential.user.uid,
        name: name.trim(),
        email: email.toLowerCase().trim(),
        plan: 'free',
        planStatus: null,
        createdAt: new Date().toISOString(),
      });

      setVerifyEmail(email.trim());
      setStep('verify');
    } catch (err: unknown) {
      const code = (err as { code?: string }).code || '';
      setError(getFirebaseErrorMessage(code));
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setResent(false);
    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        setResent(true);
      }
    } catch {
    } finally {
      setResending(false);
    }
  };

  const inp: React.CSSProperties = {
    width: '100%', padding: '12px 14px', borderRadius: 12,
    border: '2px solid #e2e8f0', fontSize: 15, outline: 'none',
    boxSizing: 'border-box', fontFamily: "'Cairo',sans-serif", transition: 'border-color 0.2s',
  };
  const lbl: React.CSSProperties = { display: 'block', color: '#374151', fontSize: 13, fontWeight: 700, marginBottom: 7 };

  if (step === 'verify') {
    return (
      <div dir="rtl" style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#f8f7ff 0%,#eef2ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 16px', fontFamily: "'Cairo',sans-serif" }}>
        <div style={{ width: '100%', maxWidth: 460 }}>
          <div style={{ background: '#fff', borderRadius: 24, padding: 'clamp(28px,6vw,44px) clamp(20px,6vw,40px)', boxShadow: '0 12px 50px rgba(99,102,241,0.14)', border: '1px solid rgba(99,102,241,0.1)', textAlign: 'center' }}>

            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 10px 30px rgba(99,102,241,0.4)' }}>
              <Mail size={38} color="#fff" />
            </div>

            <h2 style={{ color: '#1e1b4b', fontSize: 22, fontWeight: 900, margin: '0 0 10px' }}>تحقق من بريدك الإلكتروني</h2>
            <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.8, margin: '0 0 4px' }}>أرسلنا رابط تفعيل إلى</p>
            <p style={{ color: '#6366f1', fontSize: 15, fontWeight: 800, margin: '0 0 20px', direction: 'ltr', wordBreak: 'break-all' }}>{verifyEmail}</p>

            <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: 14, padding: '14px 16px', marginBottom: 24, textAlign: 'right' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <CheckCircle size={18} color="#16a34a" style={{ marginTop: 2, flexShrink: 0 }} />
                <div>
                  <p style={{ color: '#15803d', fontSize: 13, fontWeight: 800, margin: '0 0 4px' }}>الخطوات التالية:</p>
                  <p style={{ color: '#166534', fontSize: 13, lineHeight: 1.9, margin: 0 }}>
                    ١. افتح بريدك الإلكتروني<br />
                    ٢. انقر على رابط "تحقق من بريدك الإلكتروني"<br />
                    ٣. ستُحوَّل تلقائياً للحساب
                  </p>
                </div>
              </div>
            </div>

            {verifyError && (
              <div style={{ background: '#fef9ee', border: '1px solid #fde68a', borderRadius: 10, padding: '10px 14px', color: '#92400e', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
                {verifyError}
              </div>
            )}

            {resent && (
              <div style={{ background: '#ecfdf5', border: '1px solid #6ee7b7', borderRadius: 10, padding: '10px 14px', color: '#059669', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
                تم إعادة إرسال رابط التحقق بنجاح
              </div>
            )}

            <button
              onClick={() => handleVerified(false)}
              disabled={checking}
              style={{ width: '100%', padding: '14px', borderRadius: 14, background: checking ? '#e2e8f0' : 'linear-gradient(135deg,#6366f1,#a855f7)', border: 'none', cursor: checking ? 'not-allowed' : 'pointer', color: checking ? '#94a3b8' : '#fff', fontSize: 15, fontWeight: 800, fontFamily: "'Cairo',sans-serif", boxShadow: checking ? 'none' : '0 6px 20px rgba(99,102,241,0.35)', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              {checking
                ? <><Loader2 size={17} style={{ animation: 'spin 1s linear infinite' }} />جاري التحقق...</>
                : <><CheckCircle size={17} />تحققت من بريدي — دخول للحساب</>
              }
            </button>

            <button
              onClick={handleResend}
              disabled={resending}
              style={{ width: '100%', padding: '11px', borderRadius: 14, background: 'transparent', border: '2px solid #e2e8f0', cursor: resending ? 'not-allowed' : 'pointer', color: '#64748b', fontSize: 14, fontWeight: 700, fontFamily: "'Cairo',sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}
            >
              <RefreshCw size={15} style={{ animation: resending ? 'spin 1s linear infinite' : 'none' }} />
              {resending ? 'جاري الإرسال...' : 'إعادة إرسال الرابط'}
            </button>

            <p style={{ color: '#94a3b8', fontSize: 12, marginTop: 16, lineHeight: 1.7 }}>
              تحقق من مجلد Spam إذا لم تجد الرسالة
            </p>
          </div>

          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <button onClick={() => setLocation('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 13, fontWeight: 600 }}>
              ← العودة للرئيسية
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#f8f7ff 0%,#eef2ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 16px', fontFamily: "'Cairo',sans-serif", boxSizing: 'border-box' }}>
      <div style={{ width: '100%', maxWidth: 420 }}>

        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ width: 56, height: 56, borderRadius: 18, background: 'linear-gradient(135deg,#6366f1,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', boxShadow: '0 8px 25px rgba(99,102,241,0.35)' }}>
            <LayoutTemplate size={26} color="#fff" />
          </div>
          <h1 style={{ color: '#1e1b4b', fontSize: 24, fontWeight: 900, margin: '0 0 6px' }}>إنشاء حساب</h1>
          <p style={{ color: '#64748b', fontSize: 14, margin: 0 }}>انضم إلى ستوديو القوالب مجاناً</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 20, padding: 'clamp(20px,5vw,36px) clamp(16px,5vw,32px)', boxShadow: '0 8px 40px rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.1)' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

            <div>
              <label style={lbl}>الاسم الكامل</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="أدخل اسمك الكامل" required autoComplete="name" style={inp}
                onFocus={e => (e.currentTarget.style.borderColor = '#6366f1')} onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')} />
            </div>

            <div>
              <label style={lbl}>البريد الإلكتروني</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@email.com" dir="ltr" required autoComplete="email" inputMode="email" style={inp}
                onFocus={e => (e.currentTarget.style.borderColor = '#6366f1')} onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')} />
            </div>

            <div>
              <label style={lbl}>كلمة المرور</label>
              <div style={{ position: 'relative' }}>
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="6 أحرف على الأقل" required autoComplete="new-password"
                  style={{ ...inp, padding: '12px 44px 12px 14px' }}
                  onFocus={e => (e.currentTarget.style.borderColor = '#6366f1')} onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')} />
                <button type="button" onClick={() => setShowPass(v => !v)}
                  style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 4 }}>
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label style={lbl}>تأكيد كلمة المرور</label>
              <input type={showPass ? 'text' : 'password'} value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="أعد كتابة كلمة المرور" required autoComplete="new-password" style={inp}
                onFocus={e => (e.currentTarget.style.borderColor = '#6366f1')} onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')} />
            </div>

            {error && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '10px 14px', color: '#dc2626', fontSize: 13, fontWeight: 600 }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              style={{ width: '100%', padding: '13px', borderRadius: 14, background: loading ? '#e2e8f0' : 'linear-gradient(135deg,#6366f1,#a855f7)', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', color: loading ? '#94a3b8' : '#fff', fontSize: 15, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: loading ? 'none' : '0 6px 20px rgba(99,102,241,0.35)', fontFamily: "'Cairo',sans-serif", marginTop: 4 }}>
              {loading ? 'جاري الإنشاء...' : <><UserPlus size={17} /> إنشاء حساب</>}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 20, paddingTop: 18, borderTop: '1px solid #f1f5f9' }}>
            <span style={{ color: '#64748b', fontSize: 13 }}>لديك حساب بالفعل؟ </span>
            <button onClick={() => setLocation('/login')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1', fontSize: 13, fontWeight: 800, padding: 0 }}>
              تسجيل الدخول
            </button>
          </div>
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
