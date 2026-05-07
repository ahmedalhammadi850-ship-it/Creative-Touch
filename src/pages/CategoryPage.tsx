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

  // Free users can browse business-card freely, other categories need a plan
  const canAccessCategory = isActivePaidPlan || isFreeCategory;

  // Starter plan: 7 templates globally tracked
  const selectedCount = getSelectedTemplatesCount(user);
  const selectedTemplates = user?.selectedTemplates || [];
  const activatedTemplates = user?.activatedTemplates || [];
  const remaining = Math.max(0, MAX_STARTER_TEMPLATES - selectedCount);

  // For starter plan: limit of 7 globally
  const isStarterPlan = user?.plan === 'starter' && user?.planStatus === 'active';
  const starterAtLimit = isStarterPlan && selectedCount >= MAX_STARTER_TEMPLATES;

  const handleTemplateClick = (templateId: string) => {
    if (!canAccessCategory) return;

    const key = `${categoryId}/${templateId}`;
    const alreadySelected = selectedTemplates.includes(key) || activatedTemplates.includes(key);

    if (!alreadySelected && isStarterPlan) {
      if (starterAtLimit) return;
      if (user) addSelectedTemplate(user.id, key);
    }

    if (!alreadySelected && isFreeCategory && !isActivePaidPlan) {
      if (user) addSelectedTemplate(user.id, key);
    }

    setLocation(`/editor/${categoryId}/${templateId}`);
  };

  const isTemplateLocked = (templateId: string): boolean => {
    if (!canAccessCategory) return true;
    if (!isStarterPlan) return false;
    const key = `${categoryId}/${templateId}`;
    const alreadySelected = selectedTemplates.includes(key) || activatedTemplates.includes(key);
    if (alreadySelected) return false;
    return starterAtLimit;
  };

  const getContainerHeight = () => {
    if (categoryId === 'business-card') return 160;
    if (categoryId === 'ads') return 220;
    return 220;
  };

  return (
    <div dir="rtl" style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: "'Cairo',sans-serif" }}>

      {/* Header */}
      <header style={{ background: '#fff', borderBottom: '1px solid #f1f5f9', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 14, position: 'sticky', top: 0, zIndex: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <button
          onClick={() => setLocation('/')}
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

        {/* Starter counter badge */}
        {isStarterPlan && !isFreeCategory && (
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

      {/* Category locked overlay for non-free categories */}
      {!canAccessCategory ? (
        <div style={{ maxWidth: 600, margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 24, padding: '48px 40px', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', border: '1.5px solid #e2e8f0' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg,#fef2f2,#fee2e2)', border: '3px solid #fecaca', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <LockIcon size={36} color="#dc2626" />
            </div>
            <h2 style={{ color: '#1e1b4b', fontSize: 22, fontWeight: 900, margin: '0 0 12px' }}>هذا القسم يتطلب اشتراكاً</h2>
            <p style={{ color: '#64748b', fontSize: 15, margin: '0 0 8px', lineHeight: 1.7 }}>
              قسم <strong style={{ color: '#1e1b4b' }}>{category.name}</strong> متاح فقط لأصحاب الاشتراكات المدفوعة.
            </p>
            <p style={{ color: '#94a3b8', fontSize: 13, margin: '0 0 32px', lineHeight: 1.7 }}>
              الفئة المجانية الوحيدة هي <strong style={{ color: '#6366f1' }}>بطاقات الأعمال 🪪</strong>.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button
                onClick={() => { setLocation('/'); setTimeout(() => document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
                style={{ width: '100%', padding: '14px', borderRadius: 16, background: 'linear-gradient(135deg,#6366f1,#a855f7)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 15, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: "'Cairo',sans-serif", boxShadow: '0 6px 20px rgba(99,102,241,0.35)' }}>
                <Zap size={17} />عرض الباقات والأسعار
              </button>
              <button
                onClick={() => setLocation('/category/business-card')}
                style={{ width: '100%', padding: '13px', borderRadius: 16, background: '#f8fafc', border: '1.5px solid #e2e8f0', cursor: 'pointer', color: '#374151', fontSize: 14, fontWeight: 700, fontFamily: "'Cairo',sans-serif" }}>
                تصفح بطاقات الأعمال المجانية 🪪
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
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
                const locked = isTemplateLocked(template.id);
                const containerH = getContainerHeight();

                return (
                  <div
                    key={template.id}
                    onClick={() => !locked && handleTemplateClick(template.id)}
                    style={{
                      background: '#fff', borderRadius: 20, overflow: 'hidden',
                      border: locked ? '2px solid #fecaca' : alreadySelected ? '2px solid #6ee7b7' : '1.5px solid #f1f5f9',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                      cursor: locked ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s', opacity: locked ? 0.75 : 1, position: 'relative',
                    }}
                    onMouseEnter={e => { if (!locked) { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(99,102,241,0.18)'; e.currentTarget.style.borderColor = alreadySelected ? '#6ee7b7' : '#c7d2fe'; } }}
                    onMouseLeave={e => { if (!locked) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)'; e.currentTarget.style.borderColor = alreadySelected ? '#6ee7b7' : '#f1f5f9'; } }}
                  >
                    <div style={{ background: '#f8fafc', height: containerH, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ transform: 'scale(0.48)', transformOrigin: 'center', pointerEvents: 'none', userSelect: 'none' }}>
                        <TemplateRenderer categoryId={category.id} templateId={template.id} data={template.defaultData} />
                      </div>

                      {locked && (
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(254,242,242,0.88)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                          <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#fecaca', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <LockIcon size={20} color="#dc2626" />
                          </div>
                          <span style={{ color: '#dc2626', fontSize: 12, fontWeight: 800, fontFamily: "'Cairo',sans-serif", textAlign: 'center', padding: '0 12px' }}>
                            جدّد الباقة
                          </span>
                        </div>
                      )}

                      {alreadySelected && !locked && (
                        <div style={{ position: 'absolute', top: 10, left: 10, background: '#10b981', color: '#fff', fontSize: 10, fontWeight: 800, padding: '3px 9px', borderRadius: 20, fontFamily: "'Cairo',sans-serif" }}>
                          ✓ مختار
                        </div>
                      )}
                    </div>

                    <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <p style={{ color: '#1e1b4b', fontSize: 14, fontWeight: 800, margin: 0 }}>{template.name}</p>
                      {locked && <div style={{ background: '#fee2e2', borderRadius: 8, padding: '3px 8px' }}><LockIcon size={12} color="#dc2626" /></div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        </>
      )}
    </div>
  );
}
