import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuthStore } from '../store/useAuthStore';
import { useRequestStore } from '../store/useRequestStore';
import { usePricingStore } from '../store/usePricingStore';
import {
  LayoutTemplate, LogOut, Crown, Clock, CheckCircle, XCircle,
  User, Zap, Star, ChevronLeft, Bell, RefreshCw, ExternalLink
} from 'lucide-react';

const ALL_CATEGORIES = [
  { id: 'congrats',      name: 'بطاقات التهنئة',  desc: 'بطاقات للأفراح والمناسبات',       emoji: '🎊', color: '#f59e0b', bg: '#fffbeb', border: '#fde68a', count: 29 },
  { id: 'wedding',       name: 'دعوات الزفاف',    desc: 'دعوات زفاف أنيقة وكلاسيكية',      emoji: '💍', color: '#d946ef', bg: '#fdf4ff', border: '#f0abfc', count: 32 },
  { id: 'business-card', name: 'بطاقات الأعمال',  desc: 'بطاقات احترافية لهويتك المهنية',   emoji: '🪪', color: '#6366f1', bg: '#eef2ff', border: '#c7d2fe', count: 34 },
  { id: 'mass-wedding',  name: 'عرس جماعي',       desc: 'دعوات عرس جماعي مع صور العرسان',  emoji: '👰', color: '#ec4899', bg: '#fdf2f8', border: '#f9a8d4', count: 13 },
  { id: 'ads',           name: 'إعلانات التواصل', desc: 'تصاميم جذابة لحملاتك الإعلانية',   emoji: '📣', color: '#ef4444', bg: '#fef2f2', border: '#fecaca', count: 12 },
  { id: 'specialized',   name: 'عيادات ومراكز',   desc: 'قوالب للعيادات والمراكز التعليمية', emoji: '🏥', color: '#10b981', bg: '#ecfdf5', border: '#a7f3d0', count: 24 },
];

const PLAN_LABELS: Record<string, string> = {
  free: 'مجاني',
  starter: 'باقة 7 قوالب',
  weekly: 'أسبوعي',
  monthly: 'شهري',
};

const PLAN_COLORS: Record<string, { from: string; to: string; text: string; bg: string; border: string }> = {
  free:    { from: '#94a3b8', to: '#64748b',   text: '#475569', bg: '#f8fafc',  border: '#e2e8f0' },
  starter: { from: '#10b981', to: '#059669',   text: '#065f46', bg: '#ecfdf5',  border: '#a7f3d0' },
  weekly:  { from: '#6366f1', to: '#4f46e5',   text: '#3730a3', bg: '#eef2ff',  border: '#c7d2fe' },
  monthly: { from: '#a855f7', to: '#7c3aed',   text: '#5b21b6', bg: '#fdf4ff',  border: '#e9d5ff' },
};

const REQUEST_TYPE: Record<string, string> = {
  activation:   'تفعيل قالب',
  subscription: 'اشتراك',
};

const REQUEST_STATUS: Record<string, { label: string; color: string; bg: string; icon: typeof CheckCircle }> = {
  pending:  { label: 'قيد المراجعة', color: '#d97706', bg: '#fef9ee', icon: Clock },
  approved: { label: 'تمت الموافقة', color: '#059669', bg: '#ecfdf5', icon: CheckCircle },
  rejected: { label: 'مرفوض',       color: '#dc2626', bg: '#fef2f2', icon: XCircle },
};

type ActiveView = 'home' | 'explore' | 'requests';

export default function UserDashboard() {
  const [, setLocation] = useLocation();
  const { user, logout } = useAuthStore();
  const { requests } = useRequestStore();
  const { plans } = usePricingStore();
  const [activeView, setActiveView] = useState<ActiveView>('home');

  if (!user) {
    setLocation('/login');
    return null;
  }

  const myRequests = requests.filter(r => r.userId === user.id);
  const pendingCount  = myRequests.filter(r => r.status === 'pending').length;
  const approvedCount = myRequests.filter(r => r.status === 'approved').length;

  const planColor = PLAN_COLORS[user.plan] || PLAN_COLORS.free;
  const activePlan = plans.find(p => p.id === user.plan);

  const handleLogout = () => { logout(); setLocation('/'); };

  const inp: React.CSSProperties = { fontFamily: "'Cairo',sans-serif" };

  return (
    <div dir="rtl" style={{ minHeight: '100vh', background: '#f1f5f9', fontFamily: "'Cairo',sans-serif" }}>

      {/* ── Sidebar ── */}
      <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 240, background: 'linear-gradient(180deg,#1e1b4b 0%,#0f172a 100%)', zIndex: 50, display: 'flex', flexDirection: 'column', padding: '28px 16px' }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36, padding: '0 8px' }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg,#6366f1,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LayoutTemplate size={20} color="#fff" />
          </div>
          <div>
            <p style={{ color: '#fff', fontSize: 13, fontWeight: 900, margin: 0 }}>ستوديو القوالب</p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, margin: 0 }}>حساب المستخدم</p>
          </div>
        </div>

        {/* User avatar */}
        <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 16, padding: '16px 14px', marginBottom: 28, border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16, fontWeight: 900, flexShrink: 0 }}>
              {user.name.charAt(0)}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <p style={{ color: '#fff', fontSize: 13, fontWeight: 800, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</p>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</p>
            </div>
          </div>
          {/* Plan badge */}
          <div style={{ background: `linear-gradient(135deg,${planColor.from},${planColor.to})`, borderRadius: 10, padding: '5px 10px', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <Crown size={11} color="#fff" />
            <span style={{ color: '#fff', fontSize: 11, fontWeight: 800 }}>{PLAN_LABELS[user.plan]}</span>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
          {([
            { icon: User,           label: 'لوحتي',          view: 'home'     as ActiveView },
            { icon: LayoutTemplate, label: 'استكشف القوالب', view: 'explore'  as ActiveView },
            { icon: Bell,           label: 'طلباتي',         view: 'requests' as ActiveView, badge: pendingCount || undefined },
          ] as { icon: typeof User; label: string; view: ActiveView; badge?: number }[]).map(({ icon: Icon, label, view, badge }) => (
            <button key={view} onClick={() => setActiveView(view)}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderRadius: 12, border: 'none', cursor: 'pointer', background: activeView === view ? 'rgba(99,102,241,0.25)' : 'transparent', color: activeView === view ? '#a5b4fc' : 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 700, ...inp, textAlign: 'right', transition: 'all 0.2s', position: 'relative' }}>
              <Icon size={17} />
              {label}
              {!!badge && <span style={{ marginRight: 'auto', background: '#ef4444', color: '#fff', borderRadius: 20, padding: '2px 7px', fontSize: 10, fontWeight: 800 }}>{badge}</span>}
            </button>
          ))}
        </nav>

        <button onClick={handleLogout}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 14px', borderRadius: 12, border: 'none', cursor: 'pointer', background: 'rgba(239,68,68,0.15)', color: '#fca5a5', fontSize: 13, fontWeight: 700, ...inp }}>
          <LogOut size={17} />تسجيل الخروج
        </button>
      </div>

      {/* ── Main Content ── */}
      <div style={{ marginRight: 240, padding: '32px 28px', minHeight: '100vh' }}>

        {/* ── VIEW: لوحتي ── */}
        {activeView === 'home' && <>

          {/* Welcome banner */}
          <div style={{ background: 'linear-gradient(135deg,#6366f1 0%,#a855f7 50%,#ec4899 100%)', borderRadius: 24, padding: '28px 32px', marginBottom: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, boxShadow: '0 8px 30px rgba(99,102,241,0.35)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -40, left: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
            <div style={{ position: 'absolute', bottom: -30, right: 100, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
            <div style={{ position: 'relative' }}>
              <h1 style={{ color: '#fff', fontSize: 24, fontWeight: 900, margin: '0 0 6px' }}>أهلاً، {user.name.split(' ')[0]} 👋</h1>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, margin: 0 }}>
                {user.plan === 'free'
                  ? 'أنت على الخطة المجانية — قم بالترقية للوصول لجميع القوالب'
                  : user.planStatus === 'active'
                    ? `اشتراكك نشط — استمتع بكامل مميزات ${PLAN_LABELS[user.plan]}`
                    : user.planStatus === 'pending'
                      ? 'طلب ترقيتك قيد المراجعة من الإدارة'
                      : 'اشتراكك غير نشط — تواصل مع الدعم'}
              </p>
            </div>
            <button onClick={() => setActiveView('explore')}
              style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer', color: '#fff', fontSize: 14, fontWeight: 800, padding: '11px 22px', borderRadius: 14, backdropFilter: 'blur(8px)', ...inp, whiteSpace: 'nowrap' }}>
              <Zap size={16} />استكشف القوالب
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16, marginBottom: 28 }}>
            {[
              { label: 'خطة الاشتراك',      value: PLAN_LABELS[user.plan], color: planColor.from, bg: planColor.bg, icon: Crown },
              { label: 'طلبات مُرسلة',      value: myRequests.length,      color: '#6366f1', bg: '#eef2ff', icon: Bell },
              { label: 'طلبات موافق عليها', value: approvedCount,           color: '#10b981', bg: '#ecfdf5', icon: CheckCircle },
              { label: 'قيد المراجعة',      value: pendingCount,            color: '#d97706', bg: '#fef9ee', icon: Clock },
            ].map(({ label, value, color, bg, icon: Icon }) => (
              <div key={label} style={{ background: '#fff', borderRadius: 18, padding: '20px 22px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', border: `1px solid ${color}20` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={17} color={color} />
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: 12, fontWeight: 600, margin: 0 }}>{label}</p>
                </div>
                <p style={{ color: '#1e1b4b', fontSize: 24, fontWeight: 900, margin: 0 }}>{value}</p>
              </div>
            ))}
          </div>

          {/* Plan card + upgrade */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
            <div style={{ background: '#fff', borderRadius: 20, padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', border: `2px solid ${planColor.border}` }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <h3 style={{ color: '#1e1b4b', fontSize: 16, fontWeight: 900, margin: 0 }}>خطتك الحالية</h3>
                <div style={{ background: `linear-gradient(135deg,${planColor.from},${planColor.to})`, borderRadius: 20, padding: '4px 12px', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Crown size={12} color="#fff" />
                  <span style={{ color: '#fff', fontSize: 12, fontWeight: 800 }}>{PLAN_LABELS[user.plan]}</span>
                </div>
              </div>
              {user.planStatus && (
                <div style={{ background: REQUEST_STATUS[user.planStatus]?.bg || '#f1f5f9', borderRadius: 10, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 7, marginBottom: 14 }}>
                  <RefreshCw size={14} color={REQUEST_STATUS[user.planStatus]?.color || '#94a3b8'} />
                  <span style={{ color: REQUEST_STATUS[user.planStatus]?.color || '#94a3b8', fontSize: 13, fontWeight: 700 }}>{REQUEST_STATUS[user.planStatus]?.label}</span>
                </div>
              )}
              {activePlan && user.plan !== 'free' && (
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {activePlan.features.slice(0, 4).map((f, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, color: '#475569', fontSize: 13 }}>
                      <CheckCircle size={14} color="#10b981" />{f}
                    </li>
                  ))}
                </ul>
              )}
              {user.plan === 'free' && (
                <p style={{ color: '#94a3b8', fontSize: 13, margin: 0, lineHeight: 1.7 }}>
                  حقلين قابلين للتعديل (العنوان والعنوان الفرعي) مجاناً.<br />قم بالترقية للوصول الكامل.
                </p>
              )}
            </div>

            {user.plan === 'free' ? (
              <div style={{ background: 'linear-gradient(135deg,#fdf4ff,#eef2ff)', borderRadius: 20, padding: '24px', border: '2px dashed #c7d2fe', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 12 }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Star size={24} color="#fff" fill="#fff" />
                </div>
                <div>
                  <h3 style={{ color: '#1e1b4b', fontSize: 16, fontWeight: 900, margin: '0 0 6px' }}>ترقية حسابك</h3>
                  <p style={{ color: '#64748b', fontSize: 13, margin: 0, lineHeight: 1.7 }}>احصل على وصول كامل لجميع القوالب وميزات التخصيص</p>
                </div>
                <button onClick={() => { setLocation('/'); setTimeout(() => document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
                  style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 14, fontWeight: 800, padding: '11px 24px', borderRadius: 14, ...inp, boxShadow: '0 4px 14px rgba(99,102,241,0.35)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Zap size={15} />عرض الباقات
                </button>
              </div>
            ) : (
              <div style={{ background: '#fff', borderRadius: 20, padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
                <h3 style={{ color: '#1e1b4b', fontSize: 16, fontWeight: 900, margin: '0 0 14px' }}>الوصول السريع</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { label: 'بطاقات أعمال', path: '/category/business-card', emoji: '🪪' },
                    { label: 'دعوات زفاف',   path: '/category/wedding',        emoji: '💍' },
                    { label: 'تهاني',        path: '/category/congrats',       emoji: '🎊' },
                    { label: 'إعلانات',      path: '/category/ads',            emoji: '📣' },
                  ].map(({ label, path, emoji }) => (
                    <button key={path} onClick={() => setLocation(path)}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 12, border: '1px solid #f1f5f9', cursor: 'pointer', background: '#f8fafc', color: '#374151', fontSize: 13, fontWeight: 700, ...inp, textAlign: 'right', transition: 'all 0.15s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#eef2ff'; e.currentTarget.style.borderColor = '#c7d2fe'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#f1f5f9'; }}>
                      <span style={{ fontSize: 18 }}>{emoji}</span>{label}
                      <ChevronLeft size={14} color="#94a3b8" style={{ marginRight: 'auto' }} />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Requests summary */}
          <div style={{ background: '#fff', borderRadius: 20, padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 style={{ color: '#1e1b4b', fontSize: 18, fontWeight: 900, margin: 0 }}>آخر الطلبات</h3>
              {myRequests.length > 0 && (
                <button onClick={() => setActiveView('requests')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1', fontSize: 13, fontWeight: 800, ...inp, display: 'flex', alignItems: 'center', gap: 4 }}>
                  عرض الكل <ChevronLeft size={14} />
                </button>
              )}
            </div>
            {myRequests.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '32px 20px' }}>
                <div style={{ fontSize: 44, marginBottom: 12 }}>📋</div>
                <p style={{ color: '#94a3b8', fontSize: 14, fontWeight: 600, margin: '0 0 6px' }}>لا توجد طلبات بعد</p>
                <p style={{ color: '#cbd5e1', fontSize: 13, margin: '0 0 18px' }}>يمكنك طلب تفعيل قالب من صفحة المحرر</p>
                <button onClick={() => setActiveView('explore')}
                  style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 14, fontWeight: 800, padding: '11px 24px', borderRadius: 14, ...inp }}>
                  استكشف القوالب
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {myRequests.slice(0, 3).map(req => {
                  const st = REQUEST_STATUS[req.status];
                  const StatusIcon = st.icon;
                  return (
                    <div key={req.id} style={{ background: '#f8fafc', borderRadius: 14, padding: '14px 16px', border: `1px solid ${st.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: st.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <StatusIcon size={16} color={st.color} />
                        </div>
                        <div>
                          <p style={{ color: '#475569', fontSize: 13, margin: 0, fontWeight: 700 }}>
                            {req.templateName && req.templateName !== 'غير محدد' ? req.templateName : REQUEST_TYPE[req.type]}
                          </p>
                          <p style={{ color: '#94a3b8', fontSize: 11, margin: 0 }}>{new Date(req.createdAt).toLocaleDateString('ar-YE')}</p>
                        </div>
                      </div>
                      <span style={{ background: st.bg, color: st.color, fontSize: 11, fontWeight: 800, padding: '4px 10px', borderRadius: 20, border: `1px solid ${st.color}30`, whiteSpace: 'nowrap' }}>{st.label}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>}

        {/* ── VIEW: استكشف القوالب ── */}
        {activeView === 'explore' && <>
          <div style={{ marginBottom: 28 }}>
            <h2 style={{ color: '#1e1b4b', fontSize: 22, fontWeight: 900, margin: '0 0 6px' }}>استكشف القوالب</h2>
            <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>اختر التصنيف الذي يناسبك وابدأ التصميم الآن</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
            {ALL_CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => setLocation(`/category/${cat.id}`)}
                style={{ background: cat.bg, border: `1.5px solid ${cat.border}`, borderRadius: 18, padding: '22px 20px', cursor: 'pointer', textAlign: 'right', transition: 'all 0.18s', display: 'flex', flexDirection: 'column', gap: 12, ...inp }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 30px ${cat.color}28`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 38 }}>{cat.emoji}</span>
                  <span style={{ background: cat.color, color: '#fff', fontSize: 11, fontWeight: 800, padding: '4px 10px', borderRadius: 20 }}>{cat.count} قالب</span>
                </div>
                <div>
                  <p style={{ color: '#1e1b4b', fontSize: 15, fontWeight: 900, margin: '0 0 5px' }}>{cat.name}</p>
                  <p style={{ color: '#64748b', fontSize: 12, margin: 0, lineHeight: 1.6 }}>{cat.desc}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: cat.color, fontSize: 13, fontWeight: 800 }}>
                  استكشف الآن <ChevronLeft size={14} />
                </div>
              </button>
            ))}
          </div>
        </>}

        {/* ── VIEW: طلباتي ── */}
        {activeView === 'requests' && <>
          <div style={{ marginBottom: 28 }}>
            <h2 style={{ color: '#1e1b4b', fontSize: 22, fontWeight: 900, margin: '0 0 6px' }}>طلباتي</h2>
            <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>سجل جميع طلبات التفعيل والاشتراك</p>
          </div>
          <div style={{ background: '#fff', borderRadius: 20, padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            {myRequests.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 20px' }}>
                <div style={{ fontSize: 52, marginBottom: 16 }}>📋</div>
                <p style={{ color: '#94a3b8', fontSize: 15, fontWeight: 600, margin: '0 0 8px' }}>لا توجد طلبات بعد</p>
                <p style={{ color: '#cbd5e1', fontSize: 13, margin: '0 0 20px' }}>يمكنك طلب تفعيل قالب من صفحة المحرر</p>
                <button onClick={() => setActiveView('explore')}
                  style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 14, fontWeight: 800, padding: '11px 24px', borderRadius: 14, ...inp }}>
                  استكشف القوالب
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {myRequests.map(req => {
                  const st = REQUEST_STATUS[req.status];
                  const StatusIcon = st.icon;
                  const canOpenTemplate = req.status === 'approved' && req.type === 'activation' && req.categoryId && req.templateId;
                  return (
                    <div key={req.id} style={{ background: req.status === 'approved' && req.type === 'activation' ? '#f0fdf4' : '#f8fafc', borderRadius: 14, padding: '16px 18px', border: `1.5px solid ${req.status === 'approved' && req.type === 'activation' ? '#bbf7d0' : st.color + '20'}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: st.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <StatusIcon size={18} color={st.color} />
                        </div>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                            <span style={{ background: '#eef2ff', color: '#6366f1', fontSize: 11, fontWeight: 800, padding: '2px 9px', borderRadius: 20 }}>{REQUEST_TYPE[req.type] || req.type}</span>
                            {req.plan && <span style={{ background: '#fdf4ff', color: '#a855f7', fontSize: 11, fontWeight: 800, padding: '2px 9px', borderRadius: 20 }}>{req.plan}</span>}
                          </div>
                          <p style={{ color: '#475569', fontSize: 13, margin: 0, fontWeight: 700 }}>
                            {req.templateName && req.templateName !== 'غير محدد' ? req.templateName : REQUEST_TYPE[req.type]}
                          </p>
                          <p style={{ color: '#94a3b8', fontSize: 11, margin: '2px 0 0' }}>{new Date(req.createdAt).toLocaleDateString('ar-YE')}</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                        <span style={{ background: st.bg, color: st.color, fontSize: 12, fontWeight: 800, padding: '5px 12px', borderRadius: 20, border: `1px solid ${st.color}30`, whiteSpace: 'nowrap' }}>{st.label}</span>
                        {canOpenTemplate && (
                          <button
                            onClick={() => setLocation(`/editor/${req.categoryId}/${req.templateId}`)}
                            style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'linear-gradient(135deg,#10b981,#059669)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 13, fontWeight: 800, padding: '7px 16px', borderRadius: 20, ...inp, boxShadow: '0 4px 12px rgba(16,185,129,0.35)', whiteSpace: 'nowrap' }}
                          >
                            <ExternalLink size={14} />
                            افتح القالب
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>}

      </div>
    </div>
  );
}
