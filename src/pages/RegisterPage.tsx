import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, UserPlus, LayoutTemplate, Mail, RefreshCw, CheckCircle } from 'lucide-react';
import {
  auth,
  firebaseReady,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  signOut,
  getFirebaseErrorMessage,
} from '../lib/firebase';

export default function RegisterPage() {
  const [, setLocation] = useLocation();
  const { addUser, setCurrentUser, getUserByEmail } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [checking, setChecking] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCooldown = () => {
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown(prev => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const startPolling = () => {
    if (pollRef.current) clearInterval(pollRef.current);
    pollRef.current = setInterval(async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;
        await user.reload();
        if (user.emailVerified) {
          if (pollRef.current) clearInterval(pollRef.current);
          const localUser = getUserByEmail(user.email || '');
          if (localUser) {
            setCurrentUser(localUser);
          } else {
            setCurrentUser({
              id: user.uid,
              name: user.displayName || user.email?.split('@')[0] || '',
              email: (user.email || '').toLowerCase(),
              plan: 'free',
              planStatus: null,
              createdAt: new Date().toISOString(),
            });
          }
          await signOut(auth);
          setLocation('/dashboard');
        }
      } catch {
      }
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) { setError('يرجى إدخال الاسم الكامل'); return; }
    if (password !== confirm) { setError('كلمتا المرور غير متطابقتين'); return; }
    if (password.length < 6) { setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل'); return; }
    if (!firebaseReady) {
      setError('خدمة إنشاء الحساب غير متاحة حالياً. يرجى التواصل مع الدعم.');
      return;
    }
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
      setVerificationSent(true);
      startCooldown();
      startPolling();
    } catch (err: unknown) {
      const code = (err as { code?: string }).code || '';
      setError(getFirebaseErrorMessage(code));
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setResending(true);
    try {
      const user = auth.currentUser;
      if (user && !user.emailVerified) {
        await sendEmailVerification(user);
        startCooldown();
      }
    } catch {
    } finally {
      setResending(false);
    }
  };

  const handleManualCheck = async () => {
    setChecking(true);
    try {
      const user = auth.currentUser;
      if (!user) return;
      await user.reload();
      if (user.emailVerified) {
        if (pollRef.current) clearInterval(pollRef.current);
        const localUser = getUserByEmail(user.email || '');
        if (localUser) {
          setCurrentUser(localUser);
        } else {
          setCurrentUser({
            id: user.uid,
            name: user.displayName || user.email?.split('@')[0] || '',
            email: (user.email || '').toLowerCase(),
            plan: 'free',
            planStatus: null,
            createdAt: new Date().toISOString(),
          });
        }
        await signOut(auth);
        setLocation('/dashboard');
      } else {
        setError('لم يتم التحقق من البريد الإلكتروني بعد. يرجى التحقق من بريدك والمحاولة مجدداً.');
      }
    } catch {
      setError('حدث خطأ أثناء التحقق. يرجى المحاولة مرة أخرى.');
    } finally {
      setChecking(false);
    }
  };

  const inp: React.CSSProperties = {
    width: '100%', padding: '11px 14px', borderRadius: 12,
    border: '2px solid #e2e8f0', fontSize: 14, outline: 'none',
    boxSizing: 'border-box', fontFamily: "'Cairo',sans-serif", transition: 'border-color 0.2s',
  };

  if (verificationSent) {
    return (
      <div dir="rtl" style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#f8f7ff 0%,#eef2ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'Cairo',sans-serif" }}>
        <div style={{ width: '100%', maxWidth: 440 }}>
          <div style={{ background: '#fff', borderRadius: 24, padding: '40px 32px', boxShadow: '0 8px 40px rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.1)', textAlign: 'center' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg,#eef2ff,#f0fdf4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', border: '2px solid #c7d2fe' }}>
              <Mail size={34} color="#6366f1" />
            </div>
            <h2 style={{ color: '#1e1b4b', fontSize: 22, fontWeight: 900, margin: '0 0 12px' }}>تحقق من بريدك الإلكتروني</h2>
            <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.8, margin: '0 0 8px' }}>
              أرسلنا رسالة تحقق إلى
            </p>
            <p style={{ color: '#6366f1', fontSize: 15, fontWeight: 800, margin: '0 0 8px', direction: 'ltr' }}>{email}</p>
            <p style={{ color: '#64748b', fontSize: 13, lineHeight: 1.8, margin: '0 0 4px' }}>
              انقر على رابط التحقق في بريدك وسيتم توجيهك للداشبورد تلقائياً.
            </p>
            <p style={{ color: '#94a3b8', fontSize: 12, margin: '0 0 28px' }}>
              نراقب البريد تلقائياً... تأكد من مراجعة مجلد Spam إذا لم تجد الرسالة.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 20, color: '#6366f1', fontSize: 13, fontWeight: 600 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#6366f1', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
              جاري المراقبة التلقائية...
            </div>

            {error && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '10px 14px', color: '#dc2626', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
                {error}
              </div>
            )}

            <button
              onClick={handleManualCheck}
              disabled={checking}
              style={{ width: '100%', padding: '13px', borderRadius: 14, background: checking ? '#e2e8f0' : 'linear-gradient(135deg,#6366f1,#a855f7)', border: 'none', cursor: checking ? 'not-allowed' : 'pointer', color: checking ? '#94a3b8' : '#fff', fontSize: 15, fontWeight: 800, fontFamily: "'Cairo',sans-serif", boxShadow: checking ? 'none' : '0 6px 20px rgba(99,102,241,0.35)', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <CheckCircle size={17} />
              {checking ? 'جاري التحقق...' : 'لقد تحققت من بريدي — دخول للداشبورد'}
            </button>

            <button
              onClick={handleResend}
              disabled={resendCooldown > 0 || resending}
              style={{ width: '100%', padding: '11px', borderRadius: 14, background: 'transparent', border: '2px solid #e2e8f0', cursor: resendCooldown > 0 ? 'not-allowed' : 'pointer', color: resendCooldown > 0 ? '#94a3b8' : '#6366f1', fontSize: 14, fontWeight: 700, fontFamily: "'Cairo',sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <RefreshCw size={15} />
              {resending ? 'جاري الإرسال...' : resendCooldown > 0 ? `إعادة الإرسال بعد ${resendCooldown}ث` : 'إعادة إرسال رسالة التحقق'}
            </button>
          </div>
        </div>
        <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
      </div>
    );
  }

  return (
    <div dir="rtl" style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#f8f7ff 0%,#eef2ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'Cairo',sans-serif" }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, borderRadius: 18, background: 'linear-gradient(135deg,#6366f1,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 8px 25px rgba(99,102,241,0.35)' }}>
            <LayoutTemplate size={26} color="#fff" />
          </div>
          <h1 style={{ color: '#1e1b4b', fontSize: 26, fontWeight: 900, margin: '0 0 8px' }}>إنشاء حساب</h1>
          <p style={{ color: '#64748b', fontSize: 14, margin: 0 }}>انضم إلى ستوديو القوالب مجاناً</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 24, padding: '36px 32px', boxShadow: '0 8px 40px rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.1)' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', color: '#374151', fontSize: 13, fontWeight: 700, marginBottom: 7 }}>الاسم الكامل</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="أدخل اسمك الكامل" required style={inp}
                onFocus={e => (e.currentTarget.style.borderColor = '#6366f1')} onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#374151', fontSize: 13, fontWeight: 700, marginBottom: 7 }}>البريد الإلكتروني</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@email.com" dir="ltr" required style={inp}
                onFocus={e => (e.currentTarget.style.borderColor = '#6366f1')} onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#374151', fontSize: 13, fontWeight: 700, marginBottom: 7 }}>كلمة المرور</label>
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

            {error && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '10px 14px', color: '#dc2626', fontSize: 13, fontWeight: 600 }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              style={{ width: '100%', padding: '13px', borderRadius: 14, background: loading ? '#e2e8f0' : 'linear-gradient(135deg,#6366f1,#a855f7)', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', color: loading ? '#94a3b8' : '#fff', fontSize: 15, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: loading ? 'none' : '0 6px 20px rgba(99,102,241,0.35)', fontFamily: "'Cairo',sans-serif", marginTop: 4 }}>
              {loading ? 'جاري الإنشاء...' : <><UserPlus size={17} />إنشاء حساب</>}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 22, paddingTop: 20, borderTop: '1px solid #f1f5f9' }}>
            <span style={{ color: '#64748b', fontSize: 13 }}>لديك حساب بالفعل؟ </span>
            <button onClick={() => setLocation('/login')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1', fontSize: 13, fontWeight: 800, padding: 0 }}>تسجيل الدخول</button>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button onClick={() => setLocation('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 13, fontWeight: 600 }}>← العودة للرئيسية</button>
        </div>
      </div>
    </div>
  );
}
