import { useState, useRef } from 'react';
import { useLocation } from 'wouter';
import { categories } from '../data/categories';
import { usePricingStore } from '../store/usePricingStore';
import { useAuthStore } from '../store/useAuthStore';
import { useRequestStore } from '../store/useRequestStore';
import { saveRequestToFirestore } from '../lib/firestoreService';
import {
  Sparkles, Zap, Download, Palette, Star,
  LayoutTemplate, Users, Award, ChevronLeft, ArrowLeft, Check, Crown,
  LogIn, UserPlus, LogOut, LayoutDashboard, X, Send, CheckCircle, ImageIcon,
  Menu, Home
} from 'lucide-react';

const categoryIcons: Record<string, string> = {
  'congrats':      '🎊',
  'wedding':       '💍',
  'business-card': '🪪',
  'ads':           '📣',
};

const categoryColors: Record<string, { from: string; to: string; glow: string }> = {
  'congrats':      { from: '#f43f5e', to: '#fb923c', glow: 'rgba(244,63,94,0.3)' },
  'wedding':       { from: '#d97706', to: '#eab308', glow: 'rgba(217,119,6,0.3)' },
  'business-card': { from: '#6366f1', to: '#06b6d4', glow: 'rgba(99,102,241,0.3)' },
  'ads':           { from: '#8b5cf6', to: '#ec4899', glow: 'rgba(139,92,246,0.3)' },
};

const planColors: Record<string, { border: string; shadow: string; iconBg: string; iconColor: string; btnBg: string; btnColor: string; btnBorder: string; priceColor: string }> = {
  starter: { border: '#d1fae5', shadow: 'rgba(16,185,129,0.08)', iconBg: '#ecfdf5', iconColor: '#10b981', btnBg: '#ecfdf5', btnColor: '#059669', btnBorder: '#a7f3d0', priceColor: '#10b981' },
  weekly:  { border: '#e0e7ff', shadow: 'rgba(99,102,241,0.08)',  iconBg: '#eef2ff', iconColor: '#6366f1', btnBg: '#eef2ff', btnColor: '#6366f1', btnBorder: '#c7d2fe', priceColor: '#6366f1' },
  monthly: { border: 'transparent', shadow: 'rgba(99,102,241,0.35)', iconBg: 'rgba(255,255,255,0.2)', iconColor: '#fbbf24', btnBg: '#fff', btnColor: '#6366f1', btnBorder: 'transparent', priceColor: '#fbbf24' },
};

const stats = [
  { icon: LayoutTemplate, label: 'قالب جاهز',    value: '80+',  color: '#6366f1' },
  { icon: Users,          label: 'مستخدم راضٍ',   value: '2k+',  color: '#ec4899' },
  { icon: Download,       label: 'تصدير مجاني',   value: '∞',    color: '#10b981' },
  { icon: Award,          label: 'تصميم احترافي', value: '100%', color: '#f59e0b' },
];

const steps = [
  { icon: Palette,  title: 'اختر القالب',  desc: 'تصفح مجموعتنا الواسعة وابحث عن التصميم المثالي لمناسبتك.', color: '#6366f1', bg: '#eef2ff' },
  { icon: Sparkles, title: 'خصّص بحرية',   desc: 'أضف الاسم والصورة والألوان وكل التفاصيل بلمسة واحدة.', color: '#ec4899', bg: '#fdf2f8' },
  { icon: Download, title: 'صدّر واشارك', desc: 'حمّل تصميمك بجودة عالية PDF وشاركه مباشرة.', color: '#f59e0b', bg: '#fffbeb' },
];

// ── Subscription Modal ──────────────────────────────────────────────────────
function SubModal({ plan, planId, onClose }: { plan: string; planId: string; onClose: () => void }) {
  const { user } = useAuthStore();
  const { addRequest } = useRequestStore();
  const [, setLocation] = useLocation();

  const [name, setName] = useState(user?.name || '');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!user) {
    return (
      <div dir="rtl" style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, fontFamily: "'Cairo',sans-serif" }}
        onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
        <div style={{ background: '#fff', borderRadius: 24, width: '100%', maxWidth: 380, padding: '40px 32px', textAlign: 'center', boxShadow: '0 24px 70px rgba(0,0,0,0.18)' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
          <h3 style={{ color: '#1e1b4b', fontSize: 20, fontWeight: 900, marginBottom: 10 }}>يجب تسجيل الدخول أولاً</h3>
          <p style={{ color: '#64748b', fontSize: 14, marginBottom: 28 }}>سجّل دخولك أو أنشئ حساباً جديداً للاشتراك</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button onClick={() => { onClose(); setLocation('/login'); }} style={{ padding: '12px', borderRadius: 14, background: 'linear-gradient(135deg,#6366f1,#a855f7)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 15, fontWeight: 800, fontFamily: "'Cairo',sans-serif" }}>تسجيل الدخول</button>
            <button onClick={() => { onClose(); setLocation('/register'); }} style={{ padding: '12px', borderRadius: 14, background: '#eef2ff', border: '2px solid #c7d2fe', cursor: 'pointer', color: '#6366f1', fontSize: 15, fontWeight: 800, fontFamily: "'Cairo',sans-serif" }}>إنشاء حساب</button>
            <button onClick={onClose} style={{ padding: '10px', borderRadius: 12, background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 13, fontFamily: "'Cairo',sans-serif" }}>إغلاق</button>
          </div>
        </div>
      </div>
    );
  }

  const handleImageChange = (file: File) => {
    setImage(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setError('يرجى إدخال الاسم الكامل'); return; }
    if (!image) { setError('يرجى رفع صورة إيصال الدفع'); return; }

    setSending(true);
    try {
      const toBase64 = (f: File): Promise<string> =>
        new Promise((res, rej) => {
          const r = new FileReader();
          r.onload = () => res((r.result as string).split(',')[1]);
          r.onerror = rej;
          r.readAsDataURL(f);
        });

      const imageBase64 = await toBase64(image);

      const subPayload = {
        type: 'subscription' as const,
        userId: user.id,
        userName: name.trim(),
        userPhone: 'غير مزود',
        userEmail: user.email,
        plan,
        planId,
        imageBase64,
        imageName: image.name,
      };
      const subId = addRequest(subPayload);

      // Save to Firestore for centralized admin access
      saveRequestToFirestore({
        ...subPayload,
        id: subId,
        status: 'pending',
        createdAt: new Date().toISOString(),
      }).catch(() => {});

      setDone(true);
    } catch {
      setError('حدث خطأ أثناء المعالجة');
    } finally {
      setSending(false);
    }
  };

  const inp: React.CSSProperties = { width: '100%', padding: '11px 14px', borderRadius: 12, border: '2px solid #e2e8f0', fontSize: 14, fontFamily: "'Cairo',sans-serif", outline: 'none', boxSizing: 'border-box' };

  return (
    <div dir="rtl" style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, fontFamily: "'Cairo',sans-serif" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: '#fff', borderRadius: 28, width: '100%', maxWidth: 440, boxShadow: '0 32px 80px rgba(0,0,0,0.2)', overflow: 'hidden' }}>
        <div style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)', padding: '22px 26px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ color: '#fff', fontSize: 18, fontWeight: 900, margin: 0 }}>طلب اشتراك</h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, margin: '4px 0 0' }}>{plan}</p>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', borderRadius: '50%', width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><X size={16} /></button>
        </div>
        <div style={{ padding: '26px 28px 30px' }}>
          {done ? (
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#ecfdf5', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle size={34} color="#10b981" />
              </div>
              <h3 style={{ color: '#1e1b4b', fontSize: 18, fontWeight: 900, marginBottom: 8 }}>تم إرسال طلبك!</h3>
              <p style={{ color: '#64748b', fontSize: 14, marginBottom: 22 }}>سيتم مراجعة طلب الاشتراك والرد عليك قريباً.</p>
              <button onClick={onClose} style={{ padding: '12px 32px', borderRadius: 14, background: 'linear-gradient(135deg,#6366f1,#a855f7)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 15, fontWeight: 800, fontFamily: "'Cairo',sans-serif" }}>إغلاق</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

              {/* Bank info box */}
              <div style={{ background: 'linear-gradient(135deg,#eef2ff,#fdf4ff)', border: '1.5px solid #c7d2fe', borderRadius: 16, padding: '14px 16px' }}>
                <p style={{ color: '#6366f1', fontSize: 13, fontWeight: 900, margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
                  🏦 حوّل المبلغ إلى الحساب التالي
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#64748b', fontSize: 12, fontWeight: 600 }}>البنك</span>
                    <span style={{ color: '#1e1b4b', fontSize: 13, fontWeight: 800 }}>بنك تضامن</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#64748b', fontSize: 12, fontWeight: 600 }}>اسم صاحب الحساب</span>
                    <span style={{ color: '#1e1b4b', fontSize: 13, fontWeight: 800 }}>احمد عبدالله عقلان الحمادي</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', borderRadius: 10, padding: '8px 12px', border: '1px solid #e0e7ff' }}>
                    <span style={{ color: '#64748b', fontSize: 12, fontWeight: 600 }}>رقم الحساب</span>
                    <span style={{ color: '#6366f1', fontSize: 15, fontWeight: 900, letterSpacing: '0.05em', direction: 'ltr' }}>00154578</span>
                  </div>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>الاسم الكامل</label>
                <input value={name} onChange={e => setName(e.target.value)} style={inp} placeholder="أدخل اسمك" onFocus={e => (e.currentTarget.style.borderColor = '#6366f1')} onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')} />
              </div>

              <div>
                <label style={{ display: 'block', color: '#374151', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>صورة إيصال الدفع <span style={{ color: '#ef4444' }}>*</span></label>
                <div onClick={() => fileRef.current?.click()}
                  style={{ border: `2px dashed ${imagePreview ? '#10b981' : '#c7d2fe'}`, borderRadius: 16, padding: imagePreview ? 10 : '24px 16px', textAlign: 'center', cursor: 'pointer', background: imagePreview ? '#f0fdf4' : '#f8f7ff', transition: 'all 0.2s' }}>
                  {imagePreview ? (
                    <div>
                      <img src={imagePreview} alt="preview" style={{ maxHeight: 110, borderRadius: 10, objectFit: 'contain' }} />
                      <p style={{ color: '#10b981', fontSize: 11, fontWeight: 700, marginTop: 8, marginBottom: 0 }}>✓ تم رفع الإيصال</p>
                    </div>
                  ) : (
                    <>
                      <ImageIcon size={24} color="#6366f1" style={{ marginBottom: 8 }} />
                      <p style={{ color: '#374151', fontSize: 13, fontWeight: 700, margin: '0 0 2px' }}>انقر لرفع صورة الإيصال</p>
                      <p style={{ color: '#94a3b8', fontSize: 11, margin: 0 }}>PNG، JPG</p>
                    </>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) handleImageChange(f); }} />
              </div>

              {error && <p style={{ color: '#dc2626', fontSize: 13, fontWeight: 600, margin: 0 }}>{error}</p>}
              <button type="submit" disabled={sending} style={{ padding: '13px', borderRadius: 14, background: sending ? '#e2e8f0' : 'linear-gradient(135deg,#6366f1,#a855f7)', border: 'none', cursor: sending ? 'not-allowed' : 'pointer', color: sending ? '#94a3b8' : '#fff', fontSize: 15, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: "'Cairo',sans-serif", marginTop: 4 }}>
                {sending ? 'جاري الإرسال...' : <><Send size={16} />إرسال طلب الاشتراك</>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>


  );
}

// ── Main Page ───────────────────────────────────────────────────────────────
export default function HomePage() {
  const [, setLocation] = useLocation();
  const { plans } = usePricingStore();
  const { user, logout } = useAuthStore();
  const [subModal, setSubModal] = useState<{ name: string; id: string } | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div dir="rtl" style={{ fontFamily: "'Cairo', sans-serif", minHeight: '100vh', background: '#f8f7ff' }}>

      {/* Background blobs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: -200, right: -200, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', top: 300, left: -150, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.09) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: -100, right: 100, width: 450, height: 450, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)' }} />
      </div>

      {/* ─── Mobile Sidebar Drawer ─── */}
      {showMobileMenu && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex' }} dir="rtl">
          {/* Overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(4px)', animation: 'fadeInOverlay 0.25s ease' }} onClick={() => setShowMobileMenu(false)} />
          {/* Drawer from right */}
          <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 280, background: 'linear-gradient(180deg,#1e1b4b,#0f172a)', display: 'flex', flexDirection: 'column', padding: '28px 20px', zIndex: 1, boxShadow: '-8px 0 40px rgba(0,0,0,0.3)', animation: 'slideInRight 0.28s cubic-bezier(0.32,0.72,0,1)' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 36 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#6366f1,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <LayoutTemplate size={18} color="#fff" />
                </div>
                <span style={{ color: '#fff', fontSize: 14, fontWeight: 900 }}>ستوديو القوالب</span>
              </div>
              <button onClick={() => setShowMobileMenu(false)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <X size={16} />
              </button>
            </div>
            {/* Nav links */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
              {[
                { label: 'الصفحة الرئيسية', icon: Home, action: () => { setShowMobileMenu(false); window.scrollTo({ top: 0, behavior: 'smooth' }); } },
                { label: 'الأسعار', icon: Crown, action: () => { setShowMobileMenu(false); setTimeout(() => document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
                { label: 'من نحن', icon: Users, action: () => { setShowMobileMenu(false); setLocation('/about'); } },
              ].map(({ label, icon: Icon, action }) => (
                <button key={label} onClick={action}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', borderRadius: 14, border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.85)', fontSize: 15, fontWeight: 700, fontFamily: "'Cairo',sans-serif", textAlign: 'right', marginBottom: 4, transition: 'all 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(99,102,241,0.25)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}>
                  <Icon size={18} color="#a5b4fc" />
                  {label}
                </button>
              ))}
            </nav>
            {/* Auth buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {user ? (
                <>
                  <button onClick={() => { setShowMobileMenu(false); setLocation('/dashboard'); }}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 14, border: 'none', cursor: 'pointer', background: 'rgba(99,102,241,0.25)', color: '#a5b4fc', fontSize: 14, fontWeight: 800, fontFamily: "'Cairo',sans-serif" }}>
                    <LayoutDashboard size={16} />لوحتي
                  </button>
                  <button onClick={() => { logout(); setShowMobileMenu(false); }}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 14, border: 'none', cursor: 'pointer', background: 'rgba(239,68,68,0.15)', color: '#fca5a5', fontSize: 14, fontWeight: 800, fontFamily: "'Cairo',sans-serif" }}>
                    <LogOut size={16} />تسجيل الخروج
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => { setShowMobileMenu(false); setLocation('/login'); }}
                    style={{ padding: '12px', borderRadius: 14, border: '2px solid rgba(255,255,255,0.15)', cursor: 'pointer', background: 'transparent', color: '#fff', fontSize: 14, fontWeight: 800, fontFamily: "'Cairo',sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <LogIn size={16} />دخول
                  </button>
                  <button onClick={() => { setShowMobileMenu(false); setLocation('/register'); }}
                    style={{ padding: '12px', borderRadius: 14, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#6366f1,#a855f7)', color: '#fff', fontSize: 14, fontWeight: 800, fontFamily: "'Cairo',sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 14px rgba(99,102,241,0.4)' }}>
                    <UserPlus size={16} />إنشاء حساب
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── NAVBAR ─── */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(99,102,241,0.1)', boxShadow: '0 1px 20px rgba(99,102,241,0.08)' }}>
        <div className="nav-container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Right: actions */}
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {/* Hamburger — mobile only */}
            <button className="nav-hamburger" onClick={() => setShowMobileMenu(true)}
              style={{ display: 'none', alignItems: 'center', justifyContent: 'center', width: 38, height: 38, borderRadius: 10, border: '1.5px solid #e2e8f0', background: '#fff', cursor: 'pointer', color: '#6366f1' }}>
              <Menu size={20} />
            </button>

            <button onClick={() => document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="nav-text-links"
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#6366f1', fontSize: 14, fontWeight: 700, padding: '9px 16px', borderRadius: 10 }}
              onMouseEnter={e => (e.currentTarget.style.background = '#eef2ff')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              الأسعار
            </button>
            <button onClick={() => setLocation('/about')}
              className="nav-text-links"
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#6366f1', fontSize: 14, fontWeight: 700, padding: '9px 16px', borderRadius: 10 }}
              onMouseEnter={e => (e.currentTarget.style.background = '#eef2ff')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              من نحن
            </button>

            {user ? (
              /* Logged-in user */
              <div className="nav-user-btn" style={{ position: 'relative' }}>
                <button onClick={() => setShowUserMenu(v => !v)}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#eef2ff', border: '2px solid #c7d2fe', cursor: 'pointer', borderRadius: 12, padding: '7px 12px', color: '#6366f1', fontSize: 13, fontWeight: 800 }}>
                  <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 900, flexShrink: 0 }}>
                    {user.name.charAt(0)}
                  </div>
                  <span className="nav-btn-text">{user.name.split(' ')[0]}</span>
                </button>
                {showUserMenu && (
                  <div style={{ position: 'absolute', top: '110%', right: 0, background: '#fff', borderRadius: 16, boxShadow: '0 12px 40px rgba(0,0,0,0.15)', border: '1px solid #f1f5f9', minWidth: 190, padding: 8, zIndex: 100 }}>
                    <div style={{ padding: '10px 14px', borderBottom: '1px solid #f1f5f9', marginBottom: 6 }}>
                      <p style={{ color: '#1e1b4b', fontSize: 13, fontWeight: 800, margin: 0 }}>{user.name}</p>
                      <p style={{ color: '#94a3b8', fontSize: 11, margin: '2px 0 0' }}>{user.email}</p>
                    </div>
                    <button onClick={() => { setShowUserMenu(false); setLocation('/dashboard'); }}
                      style={{ width: '100%', padding: '9px 14px', borderRadius: 10, border: 'none', cursor: 'pointer', background: 'none', color: '#6366f1', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Cairo',sans-serif" }}>
                      <LayoutDashboard size={14} />لوحتي
                    </button>
                    <button onClick={() => { logout(); setShowUserMenu(false); }}
                      style={{ width: '100%', padding: '9px 14px', borderRadius: 10, border: 'none', cursor: 'pointer', background: 'none', color: '#dc2626', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Cairo',sans-serif" }}>
                      <LogOut size={14} />تسجيل الخروج
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Guest */
              <div className="nav-guest-btns" style={{ display: 'flex', gap: 6 }}>
                <button onClick={() => setLocation('/login')}
                  style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'transparent', border: '2px solid #c7d2fe', cursor: 'pointer', color: '#6366f1', fontSize: 13, fontWeight: 800, padding: '7px 13px', borderRadius: 12 }}>
                  <LogIn size={15} /><span className="nav-btn-text">دخول</span>
                </button>
                <button onClick={() => setLocation('/register')}
                  style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'linear-gradient(135deg,#6366f1,#a855f7)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 13, fontWeight: 800, padding: '7px 13px', borderRadius: 12, boxShadow: '0 4px 14px rgba(99,102,241,0.35)' }}>
                  <UserPlus size={15} /><span className="nav-btn-text">إنشاء حساب</span>
                </button>
              </div>
            )}
          </div>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="nav-logo-icon" style={{ width: 44, height: 44, borderRadius: 14, background: 'linear-gradient(135deg,#6366f1,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(99,102,241,0.35)', flexShrink: 0 }}>
              <LayoutTemplate size={22} color="#fff" />
            </div>
            <span className="nav-logo-text" style={{ color: '#1e1b4b', fontSize: 20, fontWeight: 900, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>ستوديو القوالب</span>
          </div>
        </div>
      </nav>

      {/* Click-away for user menu */}
      {showUserMenu && <div style={{ position: 'fixed', inset: 0, zIndex: 49 }} onClick={() => setShowUserMenu(false)} />}

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ─── HERO ─── */}
        <section className="hero-section" style={{ padding: '90px 24px 80px', textAlign: 'center' }}>
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            <h1 style={{ fontSize: 'clamp(38px, 6vw, 72px)', fontWeight: 900, color: '#1e1b4b', lineHeight: 1.15, marginBottom: 22, letterSpacing: '-0.03em' }}>
              صمّم بطاقة{' '}
              <span style={{ background: 'linear-gradient(135deg,#6366f1 0%,#a855f7 50%,#ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                مذهلة
              </span>
              {' '}في دقائق
            </h1>
            <p style={{ color: '#64748b', fontSize: 18, lineHeight: 1.8, maxWidth: 540, margin: '0 auto 42px' }}>
              أكثر من 80 قالب احترافي للتهنئة والأعراس والبطاقات التجارية — خصّص وصدّر مجاناً
            </p>
            <div className="hero-buttons" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => setLocation('/category/congrats')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: 'linear-gradient(135deg,#6366f1,#a855f7)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 16, fontWeight: 700, padding: '15px 36px', borderRadius: 16, boxShadow: '0 8px 30px rgba(99,102,241,0.4)', transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 40px rgba(99,102,241,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(99,102,241,0.4)'; }}>
                <Zap size={18} />استكشف القوالب
              </button>
              <button onClick={() => setLocation('/about')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', border: '2px solid #e0e7ff', cursor: 'pointer', color: '#6366f1', fontSize: 16, fontWeight: 700, padding: '13px 28px', borderRadius: 16, boxShadow: '0 4px 15px rgba(99,102,241,0.1)', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#6366f1'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = '#e0e7ff'; }}>
                من نحن<ChevronLeft size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* ─── STATS ─── */}
        <section style={{ padding: '0 24px 80px' }}>
          <div className="stats-card-inner" style={{ maxWidth: 980, margin: '0 auto', background: '#fff', borderRadius: 28, padding: '40px 52px', boxShadow: '0 8px 50px rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.1)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 28 }}>
            {stats.map(({ icon: Icon, label, value, color }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ width: 54, height: 54, borderRadius: 16, background: `${color}18`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                  <Icon size={24} color={color} />
                </div>
                <div style={{ color: '#1e1b4b', fontSize: 32, fontWeight: 900, lineHeight: 1 }}>{value}</div>
                <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 7, fontWeight: 600 }}>{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── CATEGORIES ─── */}
        <section style={{ padding: '0 24px 100px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fdf4ff', border: '1px solid #e9d5ff', borderRadius: 100, padding: '7px 18px', marginBottom: 18 }}>
                <Star size={13} color="#a855f7" fill="#a855f7" />
                <span style={{ color: '#a855f7', fontSize: 13, fontWeight: 700 }}>الفئات المتاحة</span>
              </div>
              <h2 className="section-heading-xl" style={{ color: '#1e1b4b', fontSize: 38, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 12 }}>كل مناسبة لها تصميمها</h2>
              <p style={{ color: '#94a3b8', fontSize: 16 }}>اختر الفئة المناسبة وابدأ التخصيص فوراً</p>
            </div>
            <div className="category-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 22 }}>
              {categories.map((cat) => {
                const c = categoryColors[cat.id] || { from: '#6366f1', to: '#a855f7', glow: 'rgba(99,102,241,0.3)' };
                return (
                  <div key={cat.id} onClick={() => setLocation(`/category/${cat.id}`)} style={{ background: '#fff', borderRadius: 24, border: '1px solid #f1f5f9', boxShadow: '0 2px 20px rgba(0,0,0,0.06)', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.3s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 50px ${c.glow}`; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 20px rgba(0,0,0,0.06)'; }}>
                    <div style={{ height: 168, position: 'relative', overflow: 'hidden', background: `linear-gradient(135deg,${c.from},${c.to})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
                      <div style={{ position: 'absolute', bottom: -20, left: -20, width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
                      <div style={{ width: 84, height: 84, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 46, boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
                        {categoryIcons[cat.id] || '🎨'}
                      </div>
                      <div style={{ position: 'absolute', bottom: 12, left: 14, background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)', borderRadius: 20, padding: '3px 12px', color: '#fff', fontSize: 12, fontWeight: 800 }}>
                        {cat.templates.length} قالب
                      </div>
                    </div>
                    <div style={{ padding: '22px 24px 24px' }}>
                      <h3 style={{ color: '#1e1b4b', fontSize: 20, fontWeight: 800, marginBottom: 8 }}>{cat.name}</h3>
                      <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.75, marginBottom: 20 }}>{cat.description}</p>
                      <button onClick={e => { e.stopPropagation(); setLocation(`/category/${cat.id}`); }}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `linear-gradient(135deg,${c.from},${c.to})`, border: 'none', cursor: 'pointer', color: '#fff', fontSize: 13, fontWeight: 700, padding: '9px 18px', borderRadius: 10, boxShadow: `0 4px 14px ${c.glow}` }}>
                        تصفح القوالب <ArrowLeft size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── HOW IT WORKS ─── */}
        <section style={{ padding: '0 24px 100px' }}>
          <div style={{ maxWidth: 960, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <h2 className="section-heading-xl" style={{ color: '#1e1b4b', fontSize: 36, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 12 }}>كيف يعمل؟</h2>
              <p style={{ color: '#94a3b8', fontSize: 16 }}>ثلاث خطوات بسيطة للحصول على تصميمك</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 22 }}>
              {steps.map((step, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 22, padding: '36px 28px', textAlign: 'center', position: 'relative', border: `1px solid ${step.color}25`, boxShadow: `0 4px 30px ${step.color}12`, transition: 'transform 0.25s' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)')}>
                  <div style={{ position: 'absolute', top: 18, right: 18, width: 28, height: 28, borderRadius: '50%', background: step.bg, color: step.color, fontSize: 13, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1.5px solid ${step.color}40` }}>{i + 1}</div>
                  <div style={{ width: 68, height: 68, borderRadius: 20, background: step.bg, margin: '0 auto 22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <step.icon size={30} color={step.color} />
                  </div>
                  <h3 style={{ color: '#1e1b4b', fontSize: 18, fontWeight: 800, marginBottom: 10 }}>{step.title}</h3>
                  <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.85 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PRICING (from store) ─── */}
        <section id="pricing-section" style={{ padding: '0 24px 100px' }}>
          <div style={{ maxWidth: 920, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fef9ee', border: '1px solid #fde68a', borderRadius: 100, padding: '7px 18px', marginBottom: 18 }}>
                <Crown size={13} color="#f59e0b" fill="#f59e0b" />
                <span style={{ color: '#d97706', fontSize: 13, fontWeight: 700 }}>خطط الاشتراك</span>
              </div>
              <h2 className="section-heading-xl" style={{ color: '#1e1b4b', fontSize: 38, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 12 }}>أسعار بسيطة وشفافة</h2>
              <p style={{ color: '#94a3b8', fontSize: 16 }}>اختر الخطة المناسبة لك وابدأ التصميم فوراً</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 24 }}>
              {plans.map((plan) => {
                const pc = planColors[plan.id] || planColors.weekly;
                const isMonthly = plan.id === 'monthly';
                return (
                  <div key={plan.id} className="pricing-card-inner" style={{
                    background: isMonthly ? 'linear-gradient(145deg,#6366f1 0%,#a855f7 100%)' : '#fff',
                    borderRadius: 28, padding: '40px 34px',
                    border: `2px solid ${pc.border}`,
                    boxShadow: `0 ${isMonthly ? '12px 50px' : '4px 30px'} ${pc.shadow}`,
                    display: 'flex', flexDirection: 'column', gap: 0, position: 'relative', overflow: 'hidden',
                    transition: 'transform 0.25s, box-shadow 0.25s',
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-5px)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; }}>

                    {isMonthly && <>
                      <div style={{ position: 'absolute', top: -40, left: -40, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                      <div style={{ position: 'absolute', bottom: -30, right: -30, width: 110, height: 110, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
                    </>}

                    {plan.badge && (
                      <div style={{ position: 'absolute', top: 18, left: 18, background: '#fbbf24', color: '#78350f', fontSize: 11, fontWeight: 800, padding: '4px 12px', borderRadius: 20 }}>{plan.badge}</div>
                    )}

                    <div style={{ position: 'relative', marginBottom: 26 }}>
                      <div style={{ width: 48, height: 48, borderRadius: 16, background: pc.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                        {plan.id === 'monthly' ? <Crown size={24} color="#fbbf24" fill="#fbbf24" /> : plan.id === 'starter' ? <Star size={24} color={pc.iconColor} fill={pc.iconColor} /> : <Zap size={24} color={pc.iconColor} />}
                      </div>
                      <h3 style={{ color: isMonthly ? '#fff' : '#1e1b4b', fontSize: 22, fontWeight: 900, marginBottom: 8 }}>{plan.name}</h3>
                      <p style={{ color: isMonthly ? 'rgba(255,255,255,0.7)' : '#94a3b8', fontSize: 14, lineHeight: 1.75 }}>{plan.description}</p>
                    </div>

                    <div style={{ position: 'relative', display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 6 }}>
                      <span style={{ color: isMonthly ? '#fff' : '#1e1b4b', fontSize: 52, fontWeight: 900, lineHeight: 1 }}>{plan.priceYER.toLocaleString()}</span>
                      <div>
                        <div style={{ color: pc.priceColor, fontSize: 15, fontWeight: 800 }}>ريال يمني</div>
                        <div style={{ color: isMonthly ? 'rgba(255,255,255,0.55)' : '#94a3b8', fontSize: 12, fontWeight: 600 }}>/ {plan.period}</div>
                      </div>
                    </div>
                    <div style={{ color: isMonthly ? 'rgba(255,255,255,0.55)' : '#94a3b8', fontSize: 13, fontWeight: 600, marginBottom: 28 }}>≈ {plan.priceUSD} دولار</div>

                    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                      {plan.features.map((f, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 22, height: 22, borderRadius: '50%', background: isMonthly ? 'rgba(255,255,255,0.2)' : `${pc.iconColor}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Check size={13} color={isMonthly ? '#fbbf24' : pc.iconColor} strokeWidth={2.5} />
                          </div>
                          <span style={{ color: isMonthly ? 'rgba(255,255,255,0.9)' : '#475569', fontSize: 14, fontWeight: 600 }}>{f}</span>
                        </div>
                      ))}
                    </div>

                    <button onClick={() => setSubModal({ name: plan.name, id: plan.id })}
                      style={{ position: 'relative', width: '100%', padding: '14px', borderRadius: 14, background: pc.btnBg, border: `2px solid ${pc.btnBorder}`, color: pc.btnColor, fontSize: 15, fontWeight: 800, cursor: 'pointer', fontFamily: "'Cairo',sans-serif", transition: 'all 0.2s', boxShadow: isMonthly ? '0 4px 20px rgba(0,0,0,0.15)' : 'none' }}>
                      {plan.id === 'monthly' ? 'اشترك شهرياً' : plan.id === 'weekly' ? 'اشترك أسبوعياً' : 'اختر قوالبك الآن'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── CTA BANNER ─── */}
        <section style={{ padding: '0 24px 100px' }}>
          <div className="cta-banner-inner" style={{ maxWidth: 920, margin: '0 auto', background: 'linear-gradient(135deg,#6366f1 0%,#a855f7 50%,#ec4899 100%)', borderRadius: 32, padding: '60px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 60px rgba(99,102,241,0.4)' }}>
            <div style={{ position: 'absolute', top: -60, left: -60, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
            <div style={{ position: 'absolute', bottom: -50, right: -50, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: 50, marginBottom: 18 }}>✨</div>
              <h2 style={{ color: '#fff', fontSize: 32, fontWeight: 900, marginBottom: 14, letterSpacing: '-0.02em' }}>جاهز لإنشاء تصميمك؟</h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 16, marginBottom: 36, lineHeight: 1.8 }}>اختر من مئات القوالب الجاهزة وخصّصها في ثوانٍ دون أي خبرة تقنية</p>
              <button onClick={() => setLocation('/category/congrats')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#fff', border: 'none', cursor: 'pointer', color: '#6366f1', fontSize: 16, fontWeight: 800, padding: '15px 38px', borderRadius: 16, boxShadow: '0 6px 25px rgba(0,0,0,0.2)', transition: 'transform 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0) scale(1)')}>
                <Sparkles size={18} />ابدأ مجاناً الآن
              </button>
            </div>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer style={{ borderTop: '1px solid #f1f5f9', padding: '40px 24px', textAlign: 'center', background: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 18 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg,#6366f1,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LayoutTemplate size={17} color="#fff" />
            </div>
            <span style={{ color: '#1e1b4b', fontWeight: 900, fontSize: 17 }}>ستوديو القوالب</span>
          </div>
          <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
            {categories.map(c => (
              <button key={c.id} onClick={() => setLocation(`/category/${c.id}`)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 13, fontWeight: 600, padding: '5px 12px', borderRadius: 8 }}
                onMouseEnter={e => (e.currentTarget.style.color = '#6366f1')} onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}>{c.name}</button>
            ))}
            <button onClick={() => setLocation('/about')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 13, fontWeight: 600, padding: '5px 12px', borderRadius: 8 }}
              onMouseEnter={e => (e.currentTarget.style.color = '#6366f1')} onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}>من نحن</button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 16 }}>
            <button onClick={() => setLocation('/login')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 12, fontWeight: 600 }}>تسجيل الدخول</button>
            <button onClick={() => setLocation('/register')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 12, fontWeight: 600 }}>إنشاء حساب</button>
          </div>
          <p style={{ color: '#cbd5e1', fontSize: 12 }}>© 2025 ستوديو القوالب — جميع الحقوق محفوظة</p>
        </footer>
      </div>

      {subModal && <SubModal plan={subModal.name} planId={subModal.id} onClose={() => setSubModal(null)} />}
    </div>
  );
}
