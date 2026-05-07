import { useRoute, useLocation } from 'wouter';
import { categories } from '../data/categories';
import { TemplateRenderer } from '../components/TemplateRenderer';
import { useAuthStore, isPlanActive, getSelectedTemplatesCount } from '../store/useAuthStore';
import { ChevronRight, Lock as LockIcon, Zap, LayoutTemplate, ShieldCheck } from 'lucide-react';

const FREE_CATEGORY = 'business-card';
const MAX_STARTER_TEMPLATES = 7;

export default function CategoryPage() {
  const [, params] = useRoute('/category/:id');
  const [, setLocation] = useLocation();
  const categoryId = params?.id;
  const { user, addSelectedTemplate } = useAuthStore();

  const category = categories.find(c => c.id === categoryId);

  if (!category) {
    return <div style={{ padding: 80, textAlign: 'center', fontSize: 20, fontFamily: "'Cairo',sans-serif" }}>الفئة غير موجودة</div>;
  }

  const isActivePaidPlan = isPlanActive(user);
  const isFreeCategory = categoryId === FREE_CATEGORY;
  const isFreeUser = !isActivePaidPlan;

  // All categories are now browsable — restriction is only in the editor
  const selectedCount = getSelectedTemplatesCount(user);
  const selectedTemplates = user?.selectedTemplates || [];
  const activatedTemplates = user?.activatedTemplates || [];
  const remaining = Math.max(0, MAX_STARTER_TEMPLATES - selectedCount);

  const isStarterPlan = user?.plan === 'starter' && user?.planStatus === 'active';
  const starterAtLimit = isStarterPlan && selectedCount >= MAX_STARTER_TEMPLATES;

  const handleTemplateClick = (templateId: string) => {
    const key = `${categoryId}/${templateId}`;
    const alreadySelected = selectedTemplates.includes(key) || activatedTemplates.includes(key);

    // Track selected templates for starter plan
    if (!alreadySelected && isStarterPlan && !starterAtLimit) {
      if (user) addSelectedTemplate(user.id, key);
    }

    // Track for free category
    if (!alreadySelected && isFreeCategory && !isActivePaidPlan) {
      if (user) addSelectedTemplate(user.id, key);
    }

    setLocation(`/editor/${categoryId}/${templateId}`);
  };

  const getContainerHeight = () => {
    if (categoryId === 'business-card') return 160;
    return 220;
  };

  return (
    <div dir="rtl" style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: "'Cairo',sans-serif" }}>

      {/* Header */}
      <header style={{ background: '#fff', borderBottom: '1px solid #f1f5f9', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 14, position: 'sticky', top: 0, zIndex: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <button
          onClick={() => window.history.back()}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38, borderRadius: 10, border: '1.5px solid #e2e8f0', background: '#fff', cursor: 'pointer', color: '#64748b', flexShrink: 0 }}
          onMouseEnter={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#c7d2fe'; e.currentTarget.style.color = '#6366f1'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#64748b'; }}
        >
          <ChevronRight size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg,#6366f1,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <LayoutTemplate size={18} color="#fff" />
          </div>
          <div>
            <h1 style={{ color: '#1e1b4b', fontSize: 18, fontWeight: 900, margin: 0 }}>{category.name}</h1>
            <p style={{ color: '#94a3b8', fontSize: 12, margin: 0 }}>{category.description}</p>
          </div>
        </div>

        {/* Free badge for business-card */}
        {isFreeCategory && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#ecfdf5', border: '1.5px solid #6ee7b7', borderRadius: 14, padding: '8px 14px' }}>
            <ShieldCheck size={15} color="#10b981" />
            <span style={{ color: '#065f46', fontSize: 13, fontWeight: 800 }}>مجاني بالكامل</span>
          </div>
        )}

        {/* Preview-only badge for free user in non-free category */}
        {isFreeUser && !isFreeCategory && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fef9ee', border: '1.5px solid #fde68a', borderRadius: 14, padding: '8px 14px' }}>
            <LockIcon size={14} color="#d97706" />
            <span style={{ color: '#92400e', fontSize: 13, fontWeight: 800 }}>معاينة محدودة</span>
          </div>
        )}

        {/* Starter counter badge */}
        {isStarterPlan && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: remaining === 0 ? 'linear-gradient(135deg,#fef2f2,#fee2e2)' : remaining <= 2 ? 'linear-gradient(135deg,#fef9ee,#fef3c7)' : 'linear-gradient(135deg,#eef2ff,#f5f3ff)',
            border: `2px solid ${remaining === 0 ? '#fecaca' : remaining <= 2 ? '#fde68a' : '#c7d2fe'}`,
            borderRadius: 14, padding: '8px 16px',
          }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: remaining === 0 ? '#fee2e2' : remaining <= 2 ? '#fef3c7' : '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 900, color: remaining === 0 ? '#dc2626' : remaining <= 2 ? '#d97706' : '#6366f1' }}>
              {remaining}
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 800, color: remaining === 0 ? '#dc2626' : remaining <= 2 ? '#d97706' : '#6366f1' }}>قوالب متبقية</p>
              <p style={{ margin: 0, fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>{selectedCount}/{MAX_STARTER_TEMPLATES} مختار</p>
            </div>
          </div>
        )}

        {/* Full access badge */}
        {isActivePaidPlan && (user?.plan === 'weekly' || user?.plan === 'monthly') && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#ecfdf5', border: '1.5px solid #6ee7b7', borderRadius: 14, padding: '8px 14px' }}>
            <Zap size={15} color="#10b981" fill="#10b981" />
            <span style={{ color: '#065f46', fontSize: 13, fontWeight: 800 }}>وصول كامل</span>
          </div>
        )}
      </header>

      {/* Free-user info banner for non-business-card */}
      {isFreeUser && !isFreeCategory && (
        <div style={{ background: 'linear-gradient(135deg,#fef9ee,#fff7ed)', borderBottom: '1px solid #fde68a', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <LockIcon size={15} color="#d97706" />
            </div>
            <div>
              <p style={{ color: '#92400e', fontSize: 13, fontWeight: 900, margin: 0 }}>وضع المعاينة — حقلان مجانيان فقط</p>
              <p style={{ color: '#b45309', fontSize: 12, margin: 0, fontWeight: 600 }}>يمكنك كتابة الاسم والعنوان الفرعي، والباقي يتطلب اشتراكاً</p>
            </div>
          </div>
          <button
            onClick={() => { setLocation('/'); setTimeout(() => document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
            style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'linear-gradient(135deg,#6366f1,#a855f7)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 13, fontWeight: 800, padding: '10px 20px', borderRadius: 12, fontFamily: "'Cairo',sans-serif", whiteSpace: 'nowrap', boxShadow: '0 4px 14px rgba(99,102,241,0.35)', flexShrink: 0 }}>
            <Zap size={14} />عرض الباقات
          </button>
        </div>
      )}

      {/* Starter limit warning */}
      {isStarterPlan && remaining === 0 && (
        <div style={{ background: 'linear-gradient(135deg,#fef2f2,#fff5f5)', borderBottom: '1px solid #fecaca', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <LockIcon size={16} color="#dc2626" />
            </div>
            <div>
              <p style={{ color: '#991b1b', fontSize: 14, fontWeight: 900, margin: 0 }}>استنفدت قوالبك السبعة</p>
              <p style={{ color: '#dc2626', fontSize: 12, margin: 0, fontWeight: 600 }}>قم بشراء باقة جديدة (1,000 ريال) للحصول على 7 قوالب إضافية</p>
            </div>
          </div>
          <button
            onClick={() => { setLocation('/'); setTimeout(() => document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
            style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'linear-gradient(135deg,#6366f1,#a855f7)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 13, fontWeight: 800, padding: '10px 20px', borderRadius: 12, fontFamily: "'Cairo',sans-serif", whiteSpace: 'nowrap', boxShadow: '0 4px 14px rgba(99,102,241,0.35)' }}>
            <Zap size={14} />تجديد الباقة
          </button>
        </div>
      )}

      {/* Templates Grid */}
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
          {category.templates.map(template => {
            const key = `${categoryId}/${template.id}`;
            const alreadySelected = selectedTemplates.includes(key) || activatedTemplates.includes(key);
            const starterLocked = isStarterPlan && starterAtLimit && !alreadySelected;
            const containerH = getContainerHeight();

            return (
              <div
                key={template.id}
                onClick={() => !starterLocked && handleTemplateClick(template.id)}
                style={{
                  background: '#fff', borderRadius: 20, overflow: 'hidden',
                  border: starterLocked ? '2px solid #fecaca' : alreadySelected ? '2px solid #6ee7b7' : isFreeUser && !isFreeCategory ? '1.5px solid #fde68a' : '1.5px solid #f1f5f9',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                  cursor: starterLocked ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s', opacity: starterLocked ? 0.75 : 1, position: 'relative',
                }}
                onMouseEnter={e => { if (!starterLocked) { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(99,102,241,0.18)'; } }}
                onMouseLeave={e => { if (!starterLocked) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)'; } }}
              >
                <div style={{ background: '#f8fafc', height: containerH, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ transform: 'scale(0.48)', transformOrigin: 'center', pointerEvents: 'none', userSelect: 'none' }}>
                    <TemplateRenderer categoryId={category.id} templateId={template.id} data={template.defaultData} />
                  </div>

                  {/* Starter plan limit lock */}
                  {starterLocked && (
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(254,242,242,0.88)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                      <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#fecaca', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <LockIcon size={20} color="#dc2626" />
                      </div>
                      <span style={{ color: '#dc2626', fontSize: 12, fontWeight: 800, fontFamily: "'Cairo',sans-serif", textAlign: 'center', padding: '0 12px' }}>جدّد الباقة</span>
                    </div>
                  )}

                  {/* Already selected badge */}
                  {alreadySelected && !starterLocked && (
                    <div style={{ position: 'absolute', top: 10, left: 10, background: '#10b981', color: '#fff', fontSize: 10, fontWeight: 800, padding: '3px 9px', borderRadius: 20, fontFamily: "'Cairo',sans-serif" }}>
                      ✓ مختار
                    </div>
                  )}
                </div>

                <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p style={{ color: '#1e1b4b', fontSize: 14, fontWeight: 800, margin: 0 }}>{template.name}</p>
                  {starterLocked && <div style={{ background: '#fee2e2', borderRadius: 8, padding: '3px 8px' }}><LockIcon size={12} color="#dc2626" /></div>}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
