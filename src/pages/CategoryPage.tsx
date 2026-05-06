import { Link, useRoute, useLocation } from 'wouter';
import { categories } from '../data/categories';
import { ChevronRight, ShoppingCart } from 'lucide-react';
import { TemplateRenderer } from '../components/TemplateRenderer';

export default function CategoryPage() {
  const [, params] = useRoute('/category/:id');
  const [, setLocation] = useLocation();
  const categoryId = params?.id;

  const category = categories.find(c => c.id === categoryId);

  if (!category) {
    return <div className="p-20 text-center text-xl">الفئة غير موجودة</div>;
  }

  const getScale = () => 'scale-[0.5] origin-center';

  const getContainerHeight = () => {
    if (categoryId === 'business-card') return 'h-40';
    if (categoryId === 'ads') return 'h-64';
    return 'h-64';
  };

  return (
    <div dir="rtl" style={{ minHeight: '100vh', background: '#f8f7ff', fontFamily: "'Cairo', sans-serif" }}>
      <header style={{
        background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(99,102,241,0.1)',
        boxShadow: '0 1px 20px rgba(99,102,241,0.07)',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', gap: 14 }}>
          <button onClick={() => setLocation('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 700, fontSize: 14 }}>
            <ChevronRight size={20} />
            الرئيسية
          </button>
          <div style={{ width: 1, height: 24, background: '#e2e8f0' }} />
          <div>
            <div style={{ color: '#1e1b4b', fontWeight: 800, fontSize: 16 }}>{category.name}</div>
            <div style={{ color: '#94a3b8', fontSize: 12 }}>{category.description}</div>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
          {category.templates.map(template => (
            <div
              key={template.id}
              style={{
                background: '#fff', borderRadius: 20,
                boxShadow: '0 2px 20px rgba(99,102,241,0.07)',
                border: '1px solid #e0e7ff',
                overflow: 'hidden', display: 'flex', flexDirection: 'column',
                transition: 'transform 0.25s, box-shadow 0.25s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 14px 40px rgba(99,102,241,0.15)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 20px rgba(99,102,241,0.07)'; }}
            >
              {/* Template preview */}
              <div
                className={`bg-gray-100 flex items-center justify-center border-b relative overflow-hidden ${getContainerHeight()} cursor-pointer`}
                onClick={() => setLocation(`/editor/${category.id}/${template.id}`)}
              >
                <div className="absolute inset-0 bg-black/5 opacity-0 hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                  <span style={{ background: '#fff', color: '#6366f1', padding: '8px 18px', borderRadius: 20, fontSize: 13, fontWeight: 700, boxShadow: '0 4px 15px rgba(0,0,0,0.15)' }}>
                    تخصيص القالب
                  </span>
                </div>
                <div className={getScale()}>
                  <div className="pointer-events-none select-none">
                    <TemplateRenderer
                      categoryId={category.id}
                      templateId={template.id}
                      data={template.defaultData}
                    />
                  </div>
                </div>
              </div>

              {/* Card footer */}
              <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ color: '#1e1b4b', fontWeight: 800, fontSize: 15, textAlign: 'center' }}>
                  {template.name}
                </div>

                {/* Two action buttons */}
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => setLocation(`/editor/${category.id}/${template.id}`)}
                    style={{
                      flex: 1, padding: '10px 8px', borderRadius: 10,
                      background: '#eef2ff', border: '1.5px solid #c7d2fe',
                      color: '#6366f1', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#6366f1'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#eef2ff'; e.currentTarget.style.color = '#6366f1'; }}
                  >
                    تخصيص
                  </button>
                  <button
                    onClick={() => setLocation(`/order/${category.id}/${template.id}`)}
                    style={{
                      flex: 1, padding: '10px 8px', borderRadius: 10,
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      border: 'none',
                      color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                      boxShadow: '0 4px 12px rgba(16,185,129,0.25)',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(16,185,129,0.35)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(16,185,129,0.25)'; }}
                  >
                    <ShoppingCart size={13} />
                    1000 ريال
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
