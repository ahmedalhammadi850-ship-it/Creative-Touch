import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAdminStore } from '../store/useAdminStore';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const [, setLocation] = useLocation();
  const { login } = useAdminStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    const ok = login(username.trim(), password);
    setLoading(false);
    if (ok) setLocation('/admin');
    else setError('اسم المستخدم أو كلمة المرور غير صحيحة');
  };

  const inp: React.CSSProperties = { width: '100%', padding: '12px 14px', borderRadius: 12, border: '2px solid #1e3a5f', background: 'rgba(255,255,255,0.08)', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: "'Cairo',sans-serif", color: '#fff', transition: 'border-color 0.2s' };

  return (
    <div dir="rtl" style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#0f172a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'Cairo',sans-serif" }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ width: 68, height: 68, borderRadius: 20, background: 'linear-gradient(135deg,#6366f1,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px', boxShadow: '0 12px 35px rgba(99,102,241,0.5)' }}>
            <ShieldCheck size={32} color="#fff" />
          </div>
          <h1 style={{ color: '#fff', fontSize: 26, fontWeight: 900, margin: '0 0 8px' }}>لوحة التحكم</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, margin: 0 }}>دخول المشرفين فقط</p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)', borderRadius: 24, padding: '36px 32px', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={{ display: 'block', color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: 700, marginBottom: 7 }}>اسم المستخدم</label>
              <input value={username} onChange={e => setUsername(e.target.value)} placeholder="أدخل اسم المستخدم" required style={inp}
                onFocus={e => (e.currentTarget.style.borderColor = '#6366f1')} onBlur={e => (e.currentTarget.style.borderColor = '#1e3a5f')} />
            </div>
            <div>
              <label style={{ display: 'block', color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: 700, marginBottom: 7 }}>كلمة المرور</label>
              <div style={{ position: 'relative' }}>
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required
                  style={{ ...inp, padding: '12px 44px 12px 14px' }}
                  onFocus={e => (e.currentTarget.style.borderColor = '#6366f1')} onBlur={e => (e.currentTarget.style.borderColor = '#1e3a5f')} />
                <button type="button" onClick={() => setShowPass(v => !v)} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)' }}>
                  {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {error && (
              <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', borderRadius: 10, padding: '10px 14px', color: '#fca5a5', fontSize: 13, fontWeight: 600 }}>{error}</div>
            )}

            <button type="submit" disabled={loading}
              style={{ width: '100%', padding: '14px', borderRadius: 14, background: loading ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg,#6366f1,#a855f7)', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', color: loading ? 'rgba(255,255,255,0.4)' : '#fff', fontSize: 15, fontWeight: 800, fontFamily: "'Cairo',sans-serif", boxShadow: loading ? 'none' : '0 8px 25px rgba(99,102,241,0.45)', marginTop: 4 }}>
              {loading ? 'جاري التحقق...' : 'دخول لوحة التحكم'}
            </button>
          </form>
        </div>

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button onClick={() => setLocation('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.35)', fontSize: 13, fontWeight: 600 }}>← العودة للموقع</button>
        </div>
      </div>
    </div>
  );
}
