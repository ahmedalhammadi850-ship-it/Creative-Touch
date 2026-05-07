import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, LogIn, LayoutTemplate } from 'lucide-react';
import {
  auth,
  firebaseReady,
  signInWithEmailAndPassword,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!firebaseReady) {
      setError('خدمة تسجيل الدخول غير متاحة حالياً.');
      return;
    }
    setLoading(true);
    try {
      const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
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

  return (
    <div
      dir="rtl"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg,#f8f7ff 0%,#eef2ff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px 16px',
        fontFamily: "'Cairo',sans-serif",
        boxSizing: 'border-box',
      }}
    >
      <div style={{ width: '100%', maxWidth: 420 }}>

        {/* Logo + title */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 18,
            background: 'linear-gradient(135deg,#6366f1,#a855f7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 14px',
            boxShadow: '0 8px 25px rgba(99,102,241,0.35)',
          }}>
            <LayoutTemplate size={26} color="#fff" />
          </div>
          <h1 style={{ color: '#1e1b4b', fontSize: 24, fontWeight: 900, margin: '0 0 6px' }}>
            تسجيل الدخول
          </h1>
          <p style={{ color: '#64748b', fontSize: 14, margin: 0 }}>
            أهلاً بك في ستوديو القوالب
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: '#fff',
          borderRadius: 20,
          padding: 'clamp(20px, 5vw, 36px) clamp(16px, 5vw, 32px)',
          boxShadow: '0 8px 40px rgba(99,102,241,0.12)',
          border: '1px solid rgba(99,102,241,0.1)',
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Email */}
            <div>
              <label style={{ display: 'block', color: '#374151', fontSize: 13, fontWeight: 700, marginBottom: 7 }}>
                البريد الإلكتروني
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="example@email.com"
                dir="ltr"
                required
                autoComplete="email"
                inputMode="email"
                style={{
                  width: '100%', padding: '12px 14px', borderRadius: 12,
                  border: '2px solid #e2e8f0', fontSize: 15, outline: 'none',
                  boxSizing: 'border-box', fontFamily: "'Cairo',sans-serif",
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = '#6366f1')}
                onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')}
              />
            </div>

            {/* Password */}
            <div>
              <label style={{ display: 'block', color: '#374151', fontSize: 13, fontWeight: 700, marginBottom: 7 }}>
                كلمة المرور
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  style={{
                    width: '100%', padding: '12px 44px 12px 14px', borderRadius: 12,
                    border: '2px solid #e2e8f0', fontSize: 15, outline: 'none',
                    boxSizing: 'border-box', fontFamily: "'Cairo',sans-serif",
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = '#6366f1')}
                  onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  style={{
                    position: 'absolute', left: 12, top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#94a3b8', padding: 4,
                  }}
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <button
                type="button"
                onClick={() => setLocation('/forgot-password')}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#6366f1', fontSize: 12, fontWeight: 700,
                  marginTop: 6, padding: 0,
                }}
              >
                نسيت كلمة المرور؟
              </button>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                background: '#fef2f2', border: '1px solid #fecaca',
                borderRadius: 10, padding: '10px 14px',
                color: '#dc2626', fontSize: 13, fontWeight: 600,
              }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '13px', borderRadius: 14,
                background: loading ? '#e2e8f0' : 'linear-gradient(135deg,#6366f1,#a855f7)',
                border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                color: loading ? '#94a3b8' : '#fff',
                fontSize: 15, fontWeight: 800,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                boxShadow: loading ? 'none' : '0 6px 20px rgba(99,102,241,0.35)',
                fontFamily: "'Cairo',sans-serif",
                marginTop: 4,
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {loading ? 'جاري الدخول...' : <><LogIn size={17} /> دخول</>}
            </button>
          </form>

          {/* Switch to register */}
          <div style={{ textAlign: 'center', marginTop: 20, paddingTop: 18, borderTop: '1px solid #f1f5f9' }}>
            <span style={{ color: '#64748b', fontSize: 13 }}>ليس لديك حساب؟ </span>
            <button
              onClick={() => setLocation('/register')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1', fontSize: 13, fontWeight: 800, padding: 0 }}
            >
              إنشاء حساب
            </button>
          </div>
        </div>

        {/* Notice: local accounts */}
        <div style={{
          marginTop: 14, padding: '10px 14px',
          background: 'rgba(99,102,241,0.06)',
          borderRadius: 12, border: '1px solid rgba(99,102,241,0.15)',
          textAlign: 'center',
        }}>
          <p style={{ color: '#6366f1', fontSize: 12, margin: 0, fontWeight: 600, lineHeight: 1.6 }}>
            ⚠️ الحسابات محفوظة على هذا الجهاز والمتصفح فقط
          </p>
        </div>

        {/* Back */}
        <div style={{ textAlign: 'center', marginTop: 14 }}>
          <button
            onClick={() => setLocation('/')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 13, fontWeight: 600 }}
          >
            ← العودة للرئيسية
          </button>
        </div>
      </div>
    </div>
  );
}
