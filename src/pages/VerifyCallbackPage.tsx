import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { CheckCircle, Loader2, XCircle } from 'lucide-react';
import { auth, signOut, onAuthStateChanged } from '../lib/firebase';
import { useAuthStore } from '../store/useAuthStore';
import type { User as FirebaseUser } from 'firebase/auth';

type Status = 'checking' | 'success' | 'failed';

export default function VerifyCallbackPage() {
  const [, setLocation] = useLocation();
  const { getUserByEmail, setCurrentUser, addUser } = useAuthStore();
  const [status, setStatus] = useState<Status>('checking');

  useEffect(() => {
    let redirectTimer: ReturnType<typeof setTimeout>;

    const processUser = async (fbUser: FirebaseUser) => {
      try {
        await fbUser.reload();
        const refreshed = auth.currentUser;
        if (!refreshed?.emailVerified) {
          setStatus('failed');
          redirectTimer = setTimeout(() => setLocation('/login'), 2500);
          return;
        }

        const localUser = getUserByEmail(refreshed.email!);
        if (localUser) {
          setCurrentUser(localUser);
        } else {
          const newUser = {
            id: refreshed.uid,
            name: refreshed.displayName || refreshed.email!.split('@')[0],
            email: refreshed.email!.toLowerCase(),
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
        setStatus('failed');
        redirectTimer = setTimeout(() => setLocation('/login'), 2500);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        processUser(fbUser);
      } else {
        setStatus('failed');
        redirectTimer = setTimeout(() => setLocation('/login'), 2500);
      }
    });

    return () => {
      unsubscribe();
      clearTimeout(redirectTimer);
    };
  }, []);

  const styles = {
    page: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg,#f8f7ff 0%,#eef2ff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Cairo',sans-serif",
      padding: 20,
    } as React.CSSProperties,
    card: {
      background: '#fff',
      borderRadius: 24,
      padding: '44px 40px',
      boxShadow: '0 12px 50px rgba(99,102,241,0.14)',
      border: '1px solid rgba(99,102,241,0.1)',
      textAlign: 'center' as const,
      maxWidth: 400,
      width: '100%',
    },
  };

  return (
    <div dir="rtl" style={styles.page}>
      <div style={styles.card}>
        {status === 'checking' && (
          <>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Loader2 size={36} color="#6366f1" style={{ animation: 'spin 1s linear infinite' }} />
            </div>
            <h2 style={{ color: '#1e1b4b', fontSize: 20, fontWeight: 900, marginBottom: 10 }}>جاري التحقق من حسابك...</h2>
            <p style={{ color: '#64748b', fontSize: 14 }}>لحظة من فضلك</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <CheckCircle size={40} color="#10b981" />
            </div>
            <h2 style={{ color: '#1e1b4b', fontSize: 22, fontWeight: 900, marginBottom: 10 }}>تم التحقق بنجاح! 🎉</h2>
            <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.8 }}>
              تم تفعيل حسابك.<br />
              جاري التوجيه للوحة التحكم...
            </p>
            <div style={{ marginTop: 20, height: 4, borderRadius: 2, background: '#e2e8f0', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: 'linear-gradient(90deg,#6366f1,#a855f7)', borderRadius: 2, animation: 'progress 1.8s linear forwards' }} />
            </div>
          </>
        )}

        {status === 'failed' && (
          <>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <XCircle size={40} color="#ef4444" />
            </div>
            <h2 style={{ color: '#1e1b4b', fontSize: 20, fontWeight: 900, marginBottom: 10 }}>لم يتم التحقق بعد</h2>
            <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>
              يرجى مراجعة بريدك والضغط على رابط التحقق أولاً.
            </p>
            <button onClick={() => setLocation('/login')}
              style={{ padding: '11px 28px', borderRadius: 12, background: 'linear-gradient(135deg,#6366f1,#a855f7)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 14, fontWeight: 800, fontFamily: "'Cairo',sans-serif" }}>
              تسجيل الدخول
            </button>
          </>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes progress { from { width: 0%; } to { width: 100%; } }
      `}</style>
    </div>
  );
}
