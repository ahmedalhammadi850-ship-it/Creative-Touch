import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAdminStore } from '../store/useAdminStore';
import { usePricingStore } from '../store/usePricingStore';
import { useRequestStore } from '../store/useRequestStore';
import { useAuthStore, getTimeRemaining } from '../store/useAuthStore';
import { categories } from '../data/categories';
import type { User } from '../store/useAuthStore';
import {
  subscribeToRequests,
  subscribeToUsers,
  updateRequestInFirestore,
  updateUserInFirestore,
  addActivatedTemplatesToFirestore,
} from '../lib/firestoreService';
import {
  ShieldCheck, LogOut, DollarSign, Users, Clock, CheckCircle, XCircle,
  Edit3, Save, X, Plus, Trash2, LayoutTemplate, Bell, RotateCcw, ChevronDown,
  AlertTriangle, CalendarClock, Infinity
} from 'lucide-react';
import type { AppRequest } from '../store/useRequestStore';
import type { PricingPlan } from '../store/usePricingStore';

type Tab = 'requests' | 'pricing' | 'users';
type RequestFilter = 'all' | 'pending' | 'approved' | 'rejected';
type PlanFilter = 'all' | 'activation' | 'starter' | 'weekly' | 'monthly';

const STATUS_LABEL: Record<string, { label: string; color: string; bg: string }> = {
  pending:  { label: 'قيد الانتظار', color: '#d97706', bg: '#fef9ee' },
  approved: { label: 'موافق',        color: '#059669', bg: '#ecfdf5' },
  rejected: { label: 'مرفوض',       color: '#dc2626', bg: '#fef2f2' },
};

const TYPE_LABEL: Record<string, string> = {
  activation:   'تفعيل قالب',
  subscription: 'اشتراك',
};

const PLAN_ID_MAP: Record<string, User['plan']> = {
  starter:           'starter',
  weekly:            'weekly',
  monthly:           'monthly',
  'باقة 3 قوالب':    'starter',
  'باقة 7 قوالب':    'starter',
  'الخطة الأسبوعية': 'weekly',
  'الخطة الشهرية':   'monthly',
  'اشتراك شهري':     'monthly',
  'اشتراك أسبوعي':   'weekly',
};

const PLAN_LABELS: Record<string, string> = {
  free:    'مجاني',
  starter: 'باقة 3 قوالب',
  weekly:  'أسبوعي',
  monthly: 'شهري',
};

const PLAN_COLORS: Record<string, string> = {
  free:    '#94a3b8',
  starter: '#10b981',
  weekly:  '#6366f1',
  monthly: '#a855f7',
};

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { logout } = useAdminStore();
  const { plans, updatePlan, updateFeature, addFeature, removeFeature, resetToDefault } = usePricingStore();
  const { requests: localRequests, updateStatus } = useRequestStore();
  const { users: localUsers, updateUserPlan, addActivatedTemplate, addActivatedTemplates } = useAuthStore();

  const [fsRequests, setFsRequests] = useState<AppRequest[] | null>(null);
  const [fsUsers, setFsUsers] = useState<User[] | null>(null);
  const [fsReqErr, setFsReqErr] = useState(false);
  const [fsUsersErr, setFsUsersErr] = useState(false);

  useEffect(() => {
    const unsubReq = subscribeToRequests(
      (data) => { setFsRequests(data); setFsReqErr(false); },
      () => setFsReqErr(true),
    );
    const unsubUsers = subscribeToUsers(
      (data) => { setFsUsers(data); setFsUsersErr(false); },
      () => setFsUsersErr(true),
    );
    return () => { unsubReq(); unsubUsers(); };
  }, []);

  // Use Firestore when connected; fall back to local store otherwise
  const requests = (!fsReqErr && fsRequests !== null) ? fsRequests : localRequests;
  const users = (!fsUsersErr && fsUsers !== null) ? fsUsers : localUsers;

  const [tab, setTab] = useState<Tab>('requests');
  const [editingPlan, setEditingPlan] = useState<string | null>(null);
  const [editBuf, setEditBuf] = useState<Partial<PricingPlan>>({});
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<RequestFilter>('all');
  const [filterPlan, setFilterPlan] = useState<PlanFilter>('all');
  const [changingPlan, setChangingPlan] = useState<string | null>(null);
  const [approvingReq, setApprovingReq] = useState<AppRequest | null>(null);

  const pendingCount = requests.filter(r => r.status === 'pending').length;

  const handleLogout = () => { logout(); setLocation('/admin/login'); };

  const startEdit = (plan: PricingPlan) => { setEditingPlan(plan.id); setEditBuf({ ...plan }); };
  const cancelEdit = () => { setEditingPlan(null); setEditBuf({}); };
  const saveEdit = () => {
    if (editingPlan) { updatePlan(editingPlan, editBuf); setEditingPlan(null); setEditBuf({}); }
  };

  const resolvePlanId = (req: AppRequest): User['plan'] => {
    if (req.planId && PLAN_ID_MAP[req.planId]) return PLAN_ID_MAP[req.planId];
    if (req.plan && PLAN_ID_MAP[req.plan]) return PLAN_ID_MAP[req.plan];
    return 'starter';
  };

  const filtered = requests.filter(r => {
    if (filterStatus !== 'all' && r.status !== filterStatus) return false;
    if (filterPlan === 'activation') return r.type === 'activation';
    if (filterPlan === 'starter') return r.type === 'subscription' && resolvePlanId(r) === 'starter';
    if (filterPlan === 'weekly') return r.type === 'subscription' && resolvePlanId(r) === 'weekly';
    if (filterPlan === 'monthly') return r.type === 'subscription' && resolvePlanId(r) === 'monthly';
    return true;
  });

  // Get adjacent template keys for a given category+template (prev, selected, next)
  const getAdjacentTemplateKeys = (categoryId: string, templateId: string): string[] => {
    const cat = categories.find(c => c.id === categoryId);
    if (!cat) return [`${categoryId}/${templateId}`];
    const idx = cat.templates.findIndex(t => t.id === templateId);
    if (idx === -1) return [`${categoryId}/${templateId}`];
    const keys: string[] = [];
    if (idx > 0) keys.push(`${categoryId}/${cat.templates[idx - 1].id}`);
    keys.push(`${categoryId}/${templateId}`);
    if (idx < cat.templates.length - 1) keys.push(`${categoryId}/${cat.templates[idx + 1].id}`);
    return keys;
  };

  const handleApprove = (req: AppRequest, overridePlan?: User['plan'], expiresAt?: string) => {
    const respondedAt = new Date().toISOString();
    updateStatus(req.id, 'approved');
    updateRequestInFirestore(req.id, { status: 'approved', respondedAt });
    if (req.userId) {
      if (req.type === 'activation' && req.categoryId && req.templateId) {
        const keys = getAdjacentTemplateKeys(req.categoryId, req.templateId);
        addActivatedTemplates(req.userId, keys);
        addActivatedTemplatesToFirestore(req.userId, keys);
      } else {
        const plan = overridePlan ?? resolvePlanId(req);
        updateUserPlan(req.userId, plan, 'active', expiresAt);
        updateUserInFirestore(req.userId, { plan, planStatus: 'active', planExpiresAt: expiresAt });
      }
    }
    setApprovingReq(null);
  };

  const handleReject = (req: AppRequest) => {
    const respondedAt = new Date().toISOString();
    updateStatus(req.id, 'rejected');
    updateRequestInFirestore(req.id, { status: 'rejected', respondedAt });
  };

  const handleApproveClick = (req: AppRequest) => {
    if (req.type === 'activation') {
      handleApprove(req);
    } else {
      setApprovingReq(req);
    }
  };

  const handlePlanSelect = (plan: User['plan']) => {
    if (!approvingReq) return;
    let expiresAt: string | undefined;
    if (plan === 'weekly') {
      const d = new Date();
      d.setDate(d.getDate() + 7);
      expiresAt = d.toISOString();
    } else if (plan === 'monthly') {
      const d = new Date();
      d.setMonth(d.getMonth() + 1);
      expiresAt = d.toISOString();
    }
    handleApprove(approvingReq, plan, expiresAt);
  };

  const handleDirectPlanChange = (userId: string, plan: User['plan']) => {
    const planStatus = plan === 'free' ? null : 'active';
    updateUserPlan(userId, plan, planStatus);
    updateUserInFirestore(userId, { plan, planStatus });
    setChangingPlan(null);
  };

  return (
    <div dir="rtl" style={{ minHeight: '100vh', background: '#f1f5f9', fontFamily: "'Cairo',sans-serif" }}>

      {/* Sidebar */}
      <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 240, background: 'linear-gradient(180deg,#1e1b4b 0%,#0f172a 100%)', zIndex: 50, display: 'flex', flexDirection: 'column', padding: '28px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40, padding: '0 8px' }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg,#6366f1,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={20} color="#fff" />
          </div>
          <div>
            <p style={{ color: '#fff', fontSize: 14, fontWeight: 900, margin: 0 }}>لوحة التحكم</p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, margin: 0 }}>مرحباً، أحمد</p>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
          {([
            { id: 'requests', icon: Bell,         label: 'الطلبات',        badge: pendingCount },
            { id: 'pricing',  icon: DollarSign,   label: 'إدارة الأسعار' },
            { id: 'users',    icon: Users,         label: 'المستخدمون',    badge: users.length },
          ] as Array<{ id: Tab; icon: any; label: string; badge?: number }>).map(({ id, icon: Icon, label, badge }) => (
            <button key={id} onClick={() => setTab(id)}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderRadius: 12, border: 'none', cursor: 'pointer', background: tab === id ? 'rgba(99,102,241,0.25)' : 'transparent', color: tab === id ? '#a5b4fc' : 'rgba(255,255,255,0.5)', fontSize: 14, fontWeight: 700, fontFamily: "'Cairo',sans-serif", textAlign: 'right', transition: 'all 0.2s', position: 'relative' }}>
              <Icon size={18} />
              {label}
              {!!badge && <span style={{ marginRight: 'auto', background: id === 'requests' ? '#ef4444' : 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: 20, padding: '2px 8px', fontSize: 11, fontWeight: 800 }}>{badge}</span>}
            </button>
          ))}
        </nav>

        <button onClick={handleLogout}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 14px', borderRadius: 12, border: 'none', cursor: 'pointer', background: 'rgba(239,68,68,0.15)', color: '#fca5a5', fontSize: 14, fontWeight: 700, fontFamily: "'Cairo',sans-serif" }}>
          <LogOut size={17} />
          تسجيل الخروج
        </button>
      </div>

      {/* Main */}
      <div style={{ marginRight: 240, padding: '32px 28px', minHeight: '100vh' }}>

        {/* ═══ REQUESTS TAB ═══ */}
        {tab === 'requests' && (
          <div>
            <div style={{ marginBottom: 28 }}>
              <h1 style={{ color: '#1e1b4b', fontSize: 26, fontWeight: 900, margin: '0 0 6px' }}>الطلبات الواردة</h1>
              <p style={{ color: '#64748b', fontSize: 14, margin: 0 }}>طلبات التفعيل والاشتراك من المستخدمين</p>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 28 }}>
              {[
                { label: 'إجمالي الطلبات', value: requests.length,                                       color: '#6366f1', bg: '#eef2ff' },
                { label: 'قيد الانتظار',   value: requests.filter(r => r.status === 'pending').length,  color: '#d97706', bg: '#fef9ee' },
                { label: 'تمت الموافقة',   value: requests.filter(r => r.status === 'approved').length, color: '#059669', bg: '#ecfdf5' },
              ].map(({ label, value, color, bg }) => (
                <div key={label} style={{ background: '#fff', borderRadius: 18, padding: '20px 22px', border: `1px solid ${color}20`, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                  <p style={{ color: '#94a3b8', fontSize: 12, fontWeight: 600, margin: '0 0 8px' }}>{label}</p>
                  <p style={{ color, fontSize: 32, fontWeight: 900, margin: 0 }}>{value}</p>
                </div>
              ))}
            </div>

            {/* Status Filter */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ color: '#94a3b8', fontSize: 12, fontWeight: 700 }}>الحالة:</span>
              {(['all', 'pending', 'approved', 'rejected'] as const).map(f => (
                <button key={f} onClick={() => setFilterStatus(f)}
                  style={{ padding: '7px 16px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700, fontFamily: "'Cairo',sans-serif", background: filterStatus === f ? '#6366f1' : '#fff', color: filterStatus === f ? '#fff' : '#64748b', boxShadow: filterStatus === f ? '0 4px 12px rgba(99,102,241,0.3)' : '0 1px 4px rgba(0,0,0,0.07)' }}>
                  {f === 'all' ? 'الكل' : STATUS_LABEL[f].label}
                </button>
              ))}
            </div>

            {/* Plan / Type Filter */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 22, flexWrap: 'wrap', alignItems: 'center', padding: '12px 14px', background: '#fff', borderRadius: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <span style={{ color: '#64748b', fontSize: 12, fontWeight: 700 }}>نوع الطلب:</span>
              {([
                { id: 'all',        label: 'الجميع',        color: '#6366f1', activeColor: '#6366f1' },
                { id: 'activation', label: '🔓 تفعيل قالب',  color: '#f59e0b', activeColor: '#f59e0b' },
                { id: 'starter',    label: '📦 باقة 3 قوالب', color: '#10b981', activeColor: '#10b981' },
                { id: 'weekly',     label: '📅 الخطة الأسبوعية', color: '#6366f1', activeColor: '#6366f1' },
                { id: 'monthly',    label: '⭐ الخطة الشهرية', color: '#a855f7', activeColor: '#a855f7' },
              ] as const).map(f => {
                const active = filterPlan === f.id;
                const count = f.id === 'all' ? requests.length
                  : f.id === 'activation' ? requests.filter(r => r.type === 'activation').length
                  : requests.filter(r => r.type === 'subscription' && resolvePlanId(r) === f.id).length;
                return (
                  <button key={f.id} onClick={() => setFilterPlan(f.id)}
                    style={{
                      padding: '7px 14px', borderRadius: 10, border: active ? `2px solid ${f.activeColor}` : '2px solid #e2e8f0',
                      cursor: 'pointer', fontSize: 12, fontWeight: 800, fontFamily: "'Cairo',sans-serif",
                      background: active ? `${f.activeColor}18` : '#f8fafc',
                      color: active ? f.activeColor : '#64748b',
                      display: 'flex', alignItems: 'center', gap: 5,
                      transition: 'all 0.15s',
                    }}>
                    {f.label}
                    <span style={{ background: active ? f.activeColor : '#e2e8f0', color: active ? '#fff' : '#64748b', borderRadius: 20, padding: '1px 7px', fontSize: 11 }}>{count}</span>
                  </button>
                );
              })}
            </div>

            {/* Requests list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {filtered.length === 0 && (
                <div style={{ background: '#fff', borderRadius: 18, padding: '48px', textAlign: 'center', color: '#94a3b8', fontSize: 15 }}>
                  لا توجد طلبات حالياً
                </div>
              )}
              {filtered.map((req: AppRequest) => {
                const st = STATUS_LABEL[req.status];
                const resolvedPlan = resolvePlanId(req);
                return (
                  <div key={req.id} style={{ background: '#fff', borderRadius: 18, padding: '20px 24px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                          <span style={{ background: '#eef2ff', color: '#6366f1', fontSize: 11, fontWeight: 800, padding: '3px 10px', borderRadius: 20 }}>{TYPE_LABEL[req.type] || req.type}</span>
                          <span style={{ background: st.bg, color: st.color, fontSize: 11, fontWeight: 800, padding: '3px 10px', borderRadius: 20 }}>{st.label}</span>
                          {req.plan && <span style={{ background: '#fdf4ff', color: '#a855f7', fontSize: 11, fontWeight: 800, padding: '3px 10px', borderRadius: 20 }}>{req.plan}</span>}
                          {req.type === 'subscription' && <span style={{ background: `${PLAN_COLORS[resolvedPlan]}18`, color: PLAN_COLORS[resolvedPlan], fontSize: 11, fontWeight: 800, padding: '3px 10px', borderRadius: 20 }}>← {PLAN_LABELS[resolvedPlan]}</span>}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '6px 20px' }}>
                          <p style={{ margin: 0, fontSize: 14 }}><strong>الاسم:</strong> {req.userName}</p>
                          {req.userEmail && <p style={{ margin: 0, fontSize: 14 }}><strong>البريد:</strong> {req.userEmail}</p>}
                          {req.templateName && req.templateName !== 'غير محدد' && <p style={{ margin: 0, fontSize: 14 }}><strong>القالب:</strong> {req.templateName}</p>}
                          <p style={{ margin: 0, fontSize: 12, color: '#94a3b8' }}><strong>التاريخ:</strong> {new Date(req.createdAt).toLocaleDateString('ar-YE')}</p>
                        </div>
                      </div>

                      {req.imageBase64 && (
                        <img
                          src={`data:image/jpeg;base64,${req.imageBase64}`}
                          alt="إيصال"
                          onClick={() => setPreviewImg(req.imageBase64!)}
                          style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 12, cursor: 'zoom-in', border: '2px solid #e2e8f0', flexShrink: 0 }}
                        />
                      )}
                    </div>

                    {req.status === 'pending' && (
                      <div style={{ display: 'flex', gap: 10, marginTop: 16, paddingTop: 14, borderTop: '1px solid #f1f5f9' }}>
                        <button onClick={() => handleApproveClick(req)}
                          style={{ flex: 1, padding: '10px', borderRadius: 12, border: 'none', cursor: 'pointer', background: '#ecfdf5', color: '#059669', fontSize: 14, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, fontFamily: "'Cairo',sans-serif" }}>
                          <CheckCircle size={16} />{req.type === 'activation' ? 'موافقة وتفعيل' : 'موافقة — اختر الخطة'}
                        </button>
                        <button onClick={() => handleReject(req)}
                          style={{ flex: 1, padding: '10px', borderRadius: 12, border: 'none', cursor: 'pointer', background: '#fef2f2', color: '#dc2626', fontSize: 14, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, fontFamily: "'Cairo',sans-serif" }}>
                          <XCircle size={16} />رفض
                        </button>
                      </div>
                    )}

                    {req.status === 'approved' && (
                      <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <CheckCircle size={14} color="#059669" />
                        <span style={{ color: '#059669', fontSize: 13, fontWeight: 700 }}>تمت الموافقة {req.respondedAt ? `في ${new Date(req.respondedAt).toLocaleDateString('ar-YE')}` : ''}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══ PRICING TAB ═══ */}
        {tab === 'pricing' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
              <div>
                <h1 style={{ color: '#1e1b4b', fontSize: 26, fontWeight: 900, margin: '0 0 6px' }}>إدارة الأسعار</h1>
                <p style={{ color: '#64748b', fontSize: 14, margin: 0 }}>تعديل خطط الاشتراك والمميزات</p>
              </div>
              <button onClick={resetToDefault}
                style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 18px', borderRadius: 12, border: 'none', cursor: 'pointer', background: '#fef2f2', color: '#dc2626', fontSize: 13, fontWeight: 700, fontFamily: "'Cairo',sans-serif" }}>
                <RotateCcw size={15} />إعادة للافتراضي
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20 }}>
              {plans.map((plan) => {
                const isEditing = editingPlan === plan.id;
                const buf = isEditing ? editBuf : plan;

                return (
                  <div key={plan.id} style={{ background: '#fff', borderRadius: 22, padding: '24px', border: plan.highlighted ? '2px solid #a855f7' : '1px solid #f1f5f9', boxShadow: plan.highlighted ? '0 8px 30px rgba(168,85,247,0.15)' : '0 2px 12px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                      <h3 style={{ color: '#1e1b4b', fontSize: 16, fontWeight: 900, margin: 0 }}>
                        {isEditing ? <input value={buf.name ?? ''} onChange={e => setEditBuf(b => ({ ...b, name: e.target.value }))} style={{ fontSize: 16, fontWeight: 900, border: '1.5px solid #c7d2fe', borderRadius: 8, padding: '4px 8px', fontFamily: "'Cairo',sans-serif", width: '100%' }} /> : plan.name}
                      </h3>
                      {!isEditing
                        ? <button onClick={() => startEdit(plan)} style={{ background: '#eef2ff', border: 'none', cursor: 'pointer', borderRadius: 9, padding: '7px 12px', color: '#6366f1', display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 700, fontFamily: "'Cairo',sans-serif" }}><Edit3 size={13} />تعديل</button>
                        : <div style={{ display: 'flex', gap: 6 }}>
                          <button onClick={saveEdit} style={{ background: '#ecfdf5', border: 'none', cursor: 'pointer', borderRadius: 9, padding: '7px 12px', color: '#059669', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, fontFamily: "'Cairo',sans-serif" }}><Save size={13} />حفظ</button>
                          <button onClick={cancelEdit} style={{ background: '#fef2f2', border: 'none', cursor: 'pointer', borderRadius: 9, padding: '7px 10px', color: '#dc2626', display: 'flex', alignItems: 'center', fontFamily: "'Cairo',sans-serif" }}><X size={14} /></button>
                        </div>
                      }
                    </div>

                    <div style={{ marginBottom: 14 }}>
                      <label style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700, display: 'block', marginBottom: 4 }}>الوصف</label>
                      {isEditing
                        ? <input value={buf.description ?? ''} onChange={e => setEditBuf(b => ({ ...b, description: e.target.value }))} style={{ width: '100%', fontSize: 13, border: '1.5px solid #e2e8f0', borderRadius: 8, padding: '7px 10px', fontFamily: "'Cairo',sans-serif", boxSizing: 'border-box' }} />
                        : <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>{plan.description}</p>
                      }
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 16 }}>
                      {[
                        { key: 'priceYER', label: 'ريال يمني' },
                        { key: 'priceUSD', label: 'دولار' },
                        { key: 'period',   label: 'الفترة', isText: true },
                      ].map(({ key, label, isText }) => (
                        <div key={key}>
                          <label style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700, display: 'block', marginBottom: 4 }}>{label}</label>
                          {isEditing
                            ? <input
                                type={isText ? 'text' : 'number'}
                                value={(buf as any)[key] ?? ''}
                                onChange={e => setEditBuf(b => ({ ...b, [key]: isText ? e.target.value : Number(e.target.value) }))}
                                style={{ width: '100%', fontSize: 13, border: '1.5px solid #e2e8f0', borderRadius: 8, padding: '7px 10px', fontFamily: "'Cairo',sans-serif", boxSizing: 'border-box' }}
                              />
                            : <p style={{ color: '#1e1b4b', fontSize: 15, fontWeight: 900, margin: 0 }}>{(plan as any)[key]}</p>
                          }
                        </div>
                      ))}
                    </div>

                    {isEditing && (
                      <div style={{ marginBottom: 14 }}>
                        <label style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700, display: 'block', marginBottom: 4 }}>شارة (اختياري)</label>
                        <input value={buf.badge ?? ''} onChange={e => setEditBuf(b => ({ ...b, badge: e.target.value }))}
                          style={{ width: '100%', fontSize: 13, border: '1.5px solid #e2e8f0', borderRadius: 8, padding: '7px 10px', fontFamily: "'Cairo',sans-serif", boxSizing: 'border-box' }} placeholder="مثل: الأوفر" />
                      </div>
                    )}

                    <div>
                      <label style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700, display: 'block', marginBottom: 8 }}>المميزات</label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {(isEditing ? (buf.features ?? []) : plan.features).map((f, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                            {isEditing
                              ? <>
                                  <input value={f} onChange={e => updateFeature(plan.id, i, e.target.value)}
                                    style={{ flex: 1, fontSize: 12, border: '1.5px solid #e2e8f0', borderRadius: 7, padding: '5px 9px', fontFamily: "'Cairo',sans-serif" }} />
                                  <button onClick={() => removeFeature(plan.id, i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626', padding: 3 }}><Trash2 size={13} /></button>
                                </>
                              : <p style={{ margin: 0, fontSize: 13, color: '#475569', display: 'flex', alignItems: 'center', gap: 6 }}>
                                  <span style={{ color: '#10b981', fontSize: 10 }}>✓</span>{f}
                                </p>
                            }
                          </div>
                        ))}
                        {isEditing && (
                          <button onClick={() => addFeature(plan.id)}
                            style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#f8f7ff', border: '1.5px dashed #c7d2fe', borderRadius: 8, padding: '6px 12px', color: '#6366f1', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: "'Cairo',sans-serif", marginTop: 4 }}>
                            <Plus size={13} />إضافة ميزة
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══ USERS TAB ═══ */}
        {tab === 'users' && (
          <div>
            <div style={{ marginBottom: 28 }}>
              <h1 style={{ color: '#1e1b4b', fontSize: 26, fontWeight: 900, margin: '0 0 6px' }}>المستخدمون</h1>
              <p style={{ color: '#64748b', fontSize: 14, margin: 0 }}>إدارة حسابات المستخدمين وتغيير خططهم مباشرة</p>
            </div>

            {/* Quick stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 14, marginBottom: 24 }}>
              {(['free','starter','weekly','monthly'] as User['plan'][]).map(p => (
                <div key={p} style={{ background: '#fff', borderRadius: 16, padding: '16px 18px', border: `1px solid ${PLAN_COLORS[p]}20`, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <p style={{ color: '#94a3b8', fontSize: 11, fontWeight: 600, margin: '0 0 6px' }}>{PLAN_LABELS[p]}</p>
                  <p style={{ color: PLAN_COLORS[p], fontSize: 26, fontWeight: 900, margin: 0 }}>{users.filter(u => u.plan === p).length}</p>
                </div>
              ))}
            </div>

            <div style={{ background: '#fff', borderRadius: 20, overflow: 'visible', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
              {users.length === 0 && (
                <div style={{ padding: '48px', textAlign: 'center', color: '#94a3b8', fontSize: 15 }}>لا يوجد مستخدمون مسجلون بعد</div>
              )}
              {users.map((u, i) => (
                <div key={u.id} style={{ padding: '18px 24px', borderBottom: i < users.length - 1 ? '1px solid #f1f5f9' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16, fontWeight: 900, flexShrink: 0 }}>
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <p style={{ color: '#1e1b4b', fontSize: 14, fontWeight: 800, margin: '0 0 2px' }}>{u.name}</p>
                      <p style={{ color: '#94a3b8', fontSize: 12, margin: 0 }}>{u.email}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <span style={{ background: `${PLAN_COLORS[u.plan]}18`, color: PLAN_COLORS[u.plan], fontSize: 12, fontWeight: 800, padding: '4px 12px', borderRadius: 20 }}>{PLAN_LABELS[u.plan]}</span>
                    {u.planStatus && (
                      <span style={{ background: STATUS_LABEL[u.planStatus]?.bg, color: STATUS_LABEL[u.planStatus]?.color, fontSize: 12, fontWeight: 800, padding: '4px 12px', borderRadius: 20 }}>{STATUS_LABEL[u.planStatus]?.label}</span>
                    )}
                    <span style={{ color: '#94a3b8', fontSize: 11 }}>{new Date(u.createdAt).toLocaleDateString('ar-YE')}</span>

                    {/* Time Remaining Column */}
                    {(() => {
                      const timeLeft = getTimeRemaining(u);
                      if (u.plan === 'free') {
                        return (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '5px 10px' }}>
                            <CalendarClock size={13} color="#94a3b8" />
                            <span style={{ color: '#94a3b8', fontSize: 11, fontWeight: 700 }}>مجاني</span>
                          </div>
                        );
                      }
                      if (u.plan === 'starter') {
                        return (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#ecfdf5', border: '1px solid #6ee7b7', borderRadius: 10, padding: '5px 10px' }}>
                            <Infinity size={13} color="#10b981" />
                            <span style={{ color: '#065f46', fontSize: 11, fontWeight: 700 }}>دائم</span>
                          </div>
                        );
                      }
                      if (!timeLeft) return null;
                      if (timeLeft.expired) {
                        return (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '5px 10px' }}>
                            <AlertTriangle size={13} color="#dc2626" />
                            <span style={{ color: '#dc2626', fontSize: 11, fontWeight: 800 }}>منتهي</span>
                          </div>
                        );
                      }
                      const isUrgent = timeLeft.days === 0;
                      return (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: isUrgent ? '#fef2f2' : '#eef2ff', border: `1px solid ${isUrgent ? '#fecaca' : '#c7d2fe'}`, borderRadius: 10, padding: '5px 10px' }}>
                          <Clock size={13} color={isUrgent ? '#dc2626' : '#6366f1'} />
                          <span style={{ color: isUrgent ? '#dc2626' : '#3730a3', fontSize: 11, fontWeight: 800 }}>
                            {timeLeft.days > 0 ? `${timeLeft.days}ي ${timeLeft.hours}س` : `${timeLeft.hours} ساعة`}
                          </span>
                          {isUrgent && <AlertTriangle size={12} color="#dc2626" />}
                        </div>
                      );
                    })()}

                    {/* Direct plan change */}
                    <div style={{ position: 'relative' }}>
                      <button
                        onClick={() => setChangingPlan(changingPlan === u.id ? null : u.id)}
                        style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 12px', borderRadius: 10, border: '1.5px solid #e2e8f0', background: '#f8fafc', cursor: 'pointer', color: '#374151', fontSize: 12, fontWeight: 700, fontFamily: "'Cairo',sans-serif" }}>
                        <Edit3 size={12} />تغيير الخطة <ChevronDown size={12} />
                      </button>
                      {changingPlan === u.id && (
                        <div style={{ position: 'absolute', top: '110%', left: 0, background: '#fff', borderRadius: 14, boxShadow: '0 12px 40px rgba(0,0,0,0.15)', border: '1px solid #f1f5f9', minWidth: 180, padding: 8, zIndex: 100 }}>
                          {(['free','starter','weekly','monthly'] as User['plan'][]).map(plan => (
                            <button key={plan} onClick={() => handleDirectPlanChange(u.id, plan)}
                              style={{ width: '100%', padding: '9px 14px', borderRadius: 10, border: 'none', cursor: 'pointer', background: u.plan === plan ? `${PLAN_COLORS[plan]}15` : 'transparent', color: u.plan === plan ? PLAN_COLORS[plan] : '#374151', fontSize: 13, fontWeight: u.plan === plan ? 800 : 600, display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Cairo',sans-serif" }}>
                              <span style={{ width: 8, height: 8, borderRadius: '50%', background: PLAN_COLORS[plan], display: 'inline-block', flexShrink: 0 }} />
                              {PLAN_LABELS[plan]}
                              {u.plan === plan && <span style={{ marginRight: 'auto', fontSize: 11 }}>✓</span>}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Image preview modal */}
      {previewImg && (
        <div onClick={() => setPreviewImg(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, cursor: 'zoom-out' }}>
          <img src={`data:image/jpeg;base64,${previewImg}`} alt="preview" style={{ maxWidth: '90vw', maxHeight: '85vh', borderRadius: 16, objectFit: 'contain', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }} />
        </div>
      )}

      {/* Plan Selector Modal */}
      {approvingReq && (
        <div
          onClick={() => setApprovingReq(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.7)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
        >
          <div
            onClick={e => e.stopPropagation()}
            dir="rtl"
            style={{ background: '#fff', borderRadius: 24, padding: '32px 28px', width: '100%', maxWidth: 480, boxShadow: '0 24px 60px rgba(0,0,0,0.25)', fontFamily: "'Cairo',sans-serif" }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <h2 style={{ color: '#1e1b4b', fontSize: 20, fontWeight: 900, margin: 0 }}>اختر الخطة للمستخدم</h2>
              <button onClick={() => setApprovingReq(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 4 }}><X size={20} /></button>
            </div>
            <p style={{ color: '#64748b', fontSize: 13, margin: '0 0 24px' }}>
              المستخدم: <strong style={{ color: '#1e1b4b' }}>{approvingReq.userName}</strong>
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

              {/* باقة 3 قوالب */}
              <button
                onClick={() => handlePlanSelect('starter')}
                style={{ width: '100%', padding: '16px 18px', borderRadius: 16, border: '2px solid #6ee7b7', background: 'linear-gradient(135deg,#ecfdf5,#f0fdf4)', cursor: 'pointer', textAlign: 'right', fontFamily: "'Cairo',sans-serif", transition: 'all 0.15s' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ color: '#065f46', fontSize: 15, fontWeight: 900, margin: '0 0 4px' }}>📦 باقة 3 قوالب</p>
                    <p style={{ color: '#059669', fontSize: 12, margin: 0 }}>يختار المستخدم 3 قوالب — صلاحية دائمة</p>
                  </div>
                  <span style={{ background: '#059669', color: '#fff', fontSize: 11, fontWeight: 800, padding: '3px 10px', borderRadius: 20 }}>دائم</span>
                </div>
              </button>

              {/* الخطة الأسبوعية */}
              <button
                onClick={() => handlePlanSelect('weekly')}
                style={{ width: '100%', padding: '16px 18px', borderRadius: 16, border: '2px solid #c7d2fe', background: 'linear-gradient(135deg,#eef2ff,#f8f7ff)', cursor: 'pointer', textAlign: 'right', fontFamily: "'Cairo',sans-serif", transition: 'all 0.15s' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ color: '#3730a3', fontSize: 15, fontWeight: 900, margin: '0 0 4px' }}>📅 الخطة الأسبوعية</p>
                    <p style={{ color: '#6366f1', fontSize: 12, margin: 0 }}>وصول كامل لجميع القوالب — تنتهي بعد 7 أيام</p>
                  </div>
                  <span style={{ background: '#6366f1', color: '#fff', fontSize: 11, fontWeight: 800, padding: '3px 10px', borderRadius: 20 }}>7 أيام</span>
                </div>
              </button>

              {/* الخطة الشهرية */}
              <button
                onClick={() => handlePlanSelect('monthly')}
                style={{ width: '100%', padding: '16px 18px', borderRadius: 16, border: '2px solid #e9d5ff', background: 'linear-gradient(135deg,#fdf4ff,#faf5ff)', cursor: 'pointer', textAlign: 'right', fontFamily: "'Cairo',sans-serif", transition: 'all 0.15s' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ color: '#581c87', fontSize: 15, fontWeight: 900, margin: '0 0 4px' }}>⭐ الخطة الشهرية</p>
                    <p style={{ color: '#a855f7', fontSize: 12, margin: 0 }}>وصول كامل لجميع القوالب — تنتهي بعد 30 يوماً</p>
                  </div>
                  <span style={{ background: '#a855f7', color: '#fff', fontSize: 11, fontWeight: 800, padding: '3px 10px', borderRadius: 20 }}>30 يوم</span>
                </div>
              </button>

            </div>

            <button
              onClick={() => setApprovingReq(null)}
              style={{ width: '100%', marginTop: 16, padding: '11px', borderRadius: 12, border: '1.5px solid #e2e8f0', background: 'transparent', cursor: 'pointer', color: '#64748b', fontSize: 14, fontWeight: 700, fontFamily: "'Cairo',sans-serif" }}
            >
              إلغاء
            </button>
          </div>
        </div>
      )}

      {/* Click-away for plan dropdowns */}
      {changingPlan && <div style={{ position: 'fixed', inset: 0, zIndex: 50 }} onClick={() => setChangingPlan(null)} />}
    </div>
  );
}
