import { useLocation } from 'wouter';
import { categories } from '../data/categories';
import {
  Sparkles, Zap, Download, Palette, Star, ArrowLeft,
  LayoutTemplate, Users, Award, ChevronLeft, Check, Crown
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

const stats = [
  { icon: LayoutTemplate, label: 'قالب جاهز',       value: '80+',  color: '#6366f1' },
  { icon: Users,          label: 'مستخدم راضٍ',      value: '2k+',  color: '#ec4899' },
  { icon: Download,       label: 'تصدير مجاني',      value: '∞',    color: '#10b981' },
  { icon: Award,          label: 'تصميم احترافي',    value: '100%', color: '#f59e0b' },
];

const steps = [
  { icon: Palette,  title: 'اختر القالب',   desc: 'تصفح مجموعتنا الواسعة وابحث عن التصميم المثالي لمناسبتك.', color: '#6366f1', bg: '#eef2ff' },
  { icon: Sparkles, title: 'خصّص بحرية',    desc: 'أضف الاسم والصورة والألوان وكل التفاصيل بلمسة واحدة.', color: '#ec4899', bg: '#fdf2f8' },
  { icon: Download, title: 'صدّر واشارك',   desc: 'حمّل تصميمك بجودة عالية PNG وشاركه مباشرة.', color: '#f59e0b', bg: '#fffbeb' },
];

export default function HomePage() {
  const [, setLocation] = useLocation();

  return (
    <div dir="rtl" style={{ fontFamily: "'Cairo', sans-serif", minHeight: '100vh', background: '#f8f7ff' }}>

      {/* ─── gradient background blobs ─── */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: -200, right: -200, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', top: 300, left: -150, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.09) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: -100, right: 100, width: 450, height: 450, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)' }} />
      </div>

      {/* ─── NAVBAR ─── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(99,102,241,0.1)',
        boxShadow: '0 1px 20px rgba(99,102,241,0.08)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button
              onClick={() => {
                document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                color: '#6366f1', fontSize: 14, fontWeight: 700,
                padding: '9px 18px', borderRadius: 10,
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#eef2ff')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              الأسعار
            </button>
            <button
              onClick={() => setLocation('/about')}
              style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                color: '#6366f1', fontSize: 14, fontWeight: 700,
                padding: '9px 18px', borderRadius: 10,
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#eef2ff')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              من نحن
            </button>
            <button
              onClick={() => setLocation('/category/congrats')}
              style={{
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                border: 'none', cursor: 'pointer',
                color: '#fff', fontSize: 14, fontWeight: 700,
                padding: '10px 22px', borderRadius: 12,
                boxShadow: '0 4px 15px rgba(99,102,241,0.35)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(99,102,241,0.45)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(99,102,241,0.35)'; }}
            >
              ابدأ الآن
            </button>
          </div>

          {/* Logo — left side visually in RTL */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 14,
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(99,102,241,0.35)',
            }}>
              <LayoutTemplate size={22} color="#fff" />
            </div>
            <span style={{ color: '#1e1b4b', fontSize: 20, fontWeight: 900, letterSpacing: '-0.02em' }}>ستوديو القوالب</span>
          </div>
        </div>
      </nav>

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ─── HERO ─── */}
        <section style={{ padding: '90px 24px 80px', textAlign: 'center' }}>
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            <h1 style={{
              fontSize: 'clamp(38px, 6vw, 72px)', fontWeight: 900,
              color: '#1e1b4b', lineHeight: 1.15, marginBottom: 22,
              letterSpacing: '-0.03em',
            }}>
              صمّم بطاقة{' '}
              <span style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                display: 'inline',
              }}>
                مذهلة
              </span>
              {' '}في دقائق
            </h1>

            <p style={{ color: '#64748b', fontSize: 18, lineHeight: 1.8, maxWidth: 540, margin: '0 auto 42px' }}>
              أكثر من 80 قالب احترافي للتهنئة والأعراس والبطاقات التجارية — خصّص وصدّر مجاناً
            </p>

            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => setLocation('/category/congrats')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 9,
                  background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                  border: 'none', cursor: 'pointer',
                  color: '#fff', fontSize: 16, fontWeight: 700,
                  padding: '15px 36px', borderRadius: 16,
                  boxShadow: '0 8px 30px rgba(99,102,241,0.4)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 40px rgba(99,102,241,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(99,102,241,0.4)'; }}
              >
                <Zap size={18} />
                استكشف القوالب
              </button>
              <button
                onClick={() => setLocation('/about')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#fff', border: '2px solid #e0e7ff', cursor: 'pointer',
                  color: '#6366f1', fontSize: 16, fontWeight: 700,
                  padding: '13px 28px', borderRadius: 16,
                  boxShadow: '0 4px 15px rgba(99,102,241,0.1)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#6366f1'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(99,102,241,0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e0e7ff'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(99,102,241,0.1)'; }}
              >
                من نحن
                <ChevronLeft size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* ─── STATS ─── */}
        <section style={{ padding: '0 24px 80px' }}>
          <div style={{
            maxWidth: 980, margin: '0 auto',
            background: '#fff',
            borderRadius: 28, padding: '40px 52px',
            boxShadow: '0 8px 50px rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.1)',
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 28,
          }}>
            {stats.map(({ icon: Icon, label, value, color }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{
                  width: 54, height: 54, borderRadius: 16,
                  background: `${color}18`,
                  border: `1px solid ${color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 14px',
                }}>
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
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#fdf4ff', border: '1px solid #e9d5ff',
                borderRadius: 100, padding: '7px 18px', marginBottom: 18,
              }}>
                <Star size={13} color="#a855f7" fill="#a855f7" />
                <span style={{ color: '#a855f7', fontSize: 13, fontWeight: 700 }}>الفئات المتاحة</span>
              </div>
              <h2 style={{ color: '#1e1b4b', fontSize: 38, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 12 }}>
                كل مناسبة لها تصميمها
              </h2>
              <p style={{ color: '#94a3b8', fontSize: 16 }}>اختر الفئة المناسبة وابدأ التخصيص فوراً</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 22 }}>
              {categories.map((cat) => {
                const c = categoryColors[cat.id] || { from: '#6366f1', to: '#a855f7', glow: 'rgba(99,102,241,0.3)' };
                return (
                  <div key={cat.id}
                    style={{
                      background: '#fff', borderRadius: 24,
                      border: '1px solid #f1f5f9',
                      boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
                      overflow: 'hidden', cursor: 'pointer',
                      transition: 'all 0.3s',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)';
                      (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 50px ${c.glow}`;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 20px rgba(0,0,0,0.06)';
                    }}
                    onClick={() => setLocation(`/category/${cat.id}`)}
                  >
                    <div style={{
                      height: 168, position: 'relative', overflow: 'hidden',
                      background: `linear-gradient(135deg, ${c.from}, ${c.to})`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
                      <div style={{ position: 'absolute', bottom: -20, left: -20, width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
                      <div style={{
                        width: 84, height: 84, borderRadius: '50%',
                        background: 'rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(10px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 46,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                      }}>
                        {categoryIcons[cat.id] || '🎨'}
                      </div>
                      <div style={{
                        position: 'absolute', bottom: 12, left: 14,
                        background: 'rgba(255,255,255,0.25)',
                        backdropFilter: 'blur(8px)',
                        borderRadius: 20, padding: '3px 12px',
                        color: '#fff', fontSize: 12, fontWeight: 800,
                      }}>
                        {cat.templates.length} قالب
                      </div>
                    </div>

                    <div style={{ padding: '22px 24px 24px' }}>
                      <h3 style={{ color: '#1e1b4b', fontSize: 20, fontWeight: 800, marginBottom: 8 }}>{cat.name}</h3>
                      <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.75, marginBottom: 20 }}>{cat.description}</p>
                      <button
                        onClick={e => { e.stopPropagation(); setLocation(`/category/${cat.id}`); }}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 6,
                          background: `linear-gradient(135deg, ${c.from}, ${c.to})`,
                          border: 'none', cursor: 'pointer',
                          color: '#fff', fontSize: 13, fontWeight: 700,
                          padding: '9px 18px', borderRadius: 10,
                          boxShadow: `0 4px 14px ${c.glow}`,
                          transition: 'transform 0.2s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
                        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                      >
                        تصفح القوالب
                        <ArrowLeft size={14} />
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
              <h2 style={{ color: '#1e1b4b', fontSize: 36, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 12 }}>كيف يعمل؟</h2>
              <p style={{ color: '#94a3b8', fontSize: 16 }}>ثلاث خطوات بسيطة للحصول على تصميمك</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 22 }}>
              {steps.map((step, i) => (
                <div key={i} style={{
                  background: '#fff', borderRadius: 22, padding: '36px 28px',
                  textAlign: 'center', position: 'relative',
                  border: `1px solid ${step.color}25`,
                  boxShadow: `0 4px 30px ${step.color}12`,
                  transition: 'transform 0.25s',
                }}
                  onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)')}
                >
                  <div style={{
                    position: 'absolute', top: 18, right: 18,
                    width: 28, height: 28, borderRadius: '50%',
                    background: step.bg, color: step.color,
                    fontSize: 13, fontWeight: 900,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: `1.5px solid ${step.color}40`,
                  }}>
                    {i + 1}
                  </div>
                  <div style={{
                    width: 68, height: 68, borderRadius: 20,
                    background: step.bg, margin: '0 auto 22px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 4px 20px ${step.color}20`,
                  }}>
                    <step.icon size={30} color={step.color} />
                  </div>
                  <h3 style={{ color: '#1e1b4b', fontSize: 18, fontWeight: 800, marginBottom: 10 }}>{step.title}</h3>
                  <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.85 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PRICING ─── */}
        <section id="pricing-section" style={{ padding: '0 24px 100px' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#fef9ee', border: '1px solid #fde68a',
                borderRadius: 100, padding: '7px 18px', marginBottom: 18,
              }}>
                <Crown size={13} color="#f59e0b" fill="#f59e0b" />
                <span style={{ color: '#d97706', fontSize: 13, fontWeight: 700 }}>خطط الاشتراك</span>
              </div>
              <h2 style={{ color: '#1e1b4b', fontSize: 38, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 12 }}>
                أسعار بسيطة وشفافة
              </h2>
              <p style={{ color: '#94a3b8', fontSize: 16 }}>اختر الخطة المناسبة لك وابدأ التصميم فوراً</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>

              {/* 7 templates plan */}
              <div style={{
                background: '#fff',
                borderRadius: 28,
                padding: '40px 36px',
                border: '2px solid #d1fae5',
                boxShadow: '0 4px 30px rgba(16,185,129,0.08)',
                display: 'flex', flexDirection: 'column', gap: 0,
                transition: 'transform 0.25s, box-shadow 0.25s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 50px rgba(16,185,129,0.18)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 30px rgba(16,185,129,0.08)'; }}
              >
                <div style={{ marginBottom: 28 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 16,
                    background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 20,
                  }}>
                    <Star size={24} color="#10b981" fill="#10b981" />
                  </div>
                  <h3 style={{ color: '#1e1b4b', fontSize: 22, fontWeight: 900, marginBottom: 8 }}>باقة 7 قوالب</h3>
                  <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.75 }}>مثالية لمن يريد تصميماً واحداً محدداً</p>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
                  <span style={{ color: '#1e1b4b', fontSize: 52, fontWeight: 900, lineHeight: 1 }}>1000</span>
                  <div>
                    <div style={{ color: '#10b981', fontSize: 16, fontWeight: 800 }}>ريال يمني</div>
                    <div style={{ color: '#94a3b8', fontSize: 12, fontWeight: 600 }}>/ مرة واحدة</div>
                  </div>
                </div>
                <div style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600, marginBottom: 32 }}>≈ 2 دولار أمريكي</div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}>
                  {[
                    'اختر 7 قوالب من أي قائمة',
                    'من جميع الفئات المتاحة',
                    'تصدير PNG بجودة عالية',
                    'تخصيص ألوان ونصوص وصور',
                    'صالح للاستخدام الدائم',
                  ].map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Check size={13} color="#10b981" strokeWidth={2.5} />
                      </div>
                      <span style={{ color: '#475569', fontSize: 14, fontWeight: 600 }}>{f}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setLocation('/category/congrats')}
                  style={{
                    width: '100%', padding: '14px', borderRadius: 14,
                    background: '#ecfdf5', border: '2px solid #a7f3d0',
                    color: '#059669', fontSize: 15, fontWeight: 800, cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#10b981'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#10b981'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#ecfdf5'; e.currentTarget.style.color = '#059669'; e.currentTarget.style.borderColor = '#a7f3d0'; }}
                >
                  اختر قوالبك الآن
                </button>
              </div>

              {/* Weekly plan */}
              <div style={{
                background: '#fff',
                borderRadius: 28,
                padding: '40px 36px',
                border: '2px solid #e0e7ff',
                boxShadow: '0 4px 30px rgba(99,102,241,0.08)',
                display: 'flex', flexDirection: 'column', gap: 0,
                transition: 'transform 0.25s, box-shadow 0.25s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 50px rgba(99,102,241,0.15)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 30px rgba(99,102,241,0.08)'; }}
              >
                <div style={{ marginBottom: 28 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 16,
                    background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 20,
                  }}>
                    <Zap size={24} color="#6366f1" />
                  </div>
                  <h3 style={{ color: '#1e1b4b', fontSize: 22, fontWeight: 900, marginBottom: 8 }}>الخطة الأسبوعية</h3>
                  <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.75 }}>مثالية للاستخدام القصير والمناسبات</p>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 32 }}>
                  <span style={{ color: '#1e1b4b', fontSize: 52, fontWeight: 900, lineHeight: 1 }}>300</span>
                  <div>
                    <div style={{ color: '#6366f1', fontSize: 16, fontWeight: 800 }}>ريال</div>
                    <div style={{ color: '#94a3b8', fontSize: 12, fontWeight: 600 }}>/ أسبوع</div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}>
                  {['وصول كامل لجميع القوالب', 'تصدير PNG بجودة عالية', 'تخصيص ألوان ونصوص وصور', 'دعم فني خلال الأسبوع'].map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Check size={13} color="#6366f1" strokeWidth={2.5} />
                      </div>
                      <span style={{ color: '#475569', fontSize: 14, fontWeight: 600 }}>{f}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setLocation('/category/congrats')}
                  style={{
                    width: '100%', padding: '14px', borderRadius: 14,
                    background: '#eef2ff', border: '2px solid #c7d2fe',
                    color: '#6366f1', fontSize: 15, fontWeight: 800, cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#6366f1'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#6366f1'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#eef2ff'; e.currentTarget.style.color = '#6366f1'; e.currentTarget.style.borderColor = '#c7d2fe'; }}
                >
                  اشترك أسبوعياً
                </button>
              </div>

              {/* Monthly plan — highlighted */}
              <div style={{
                background: 'linear-gradient(145deg, #6366f1 0%, #a855f7 100%)',
                borderRadius: 28,
                padding: '40px 36px',
                border: '2px solid transparent',
                boxShadow: '0 12px 50px rgba(99,102,241,0.35)',
                display: 'flex', flexDirection: 'column', gap: 0,
                position: 'relative', overflow: 'hidden',
                transition: 'transform 0.25s, box-shadow 0.25s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 24px 70px rgba(99,102,241,0.45)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 50px rgba(99,102,241,0.35)'; }}
              >
                {/* Decorative blobs */}
                <div style={{ position: 'absolute', top: -40, left: -40, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ position: 'absolute', bottom: -30, right: -30, width: 110, height: 110, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />

                {/* Best value badge */}
                <div style={{
                  position: 'absolute', top: 20, left: 20,
                  background: '#fbbf24', color: '#78350f',
                  fontSize: 11, fontWeight: 800, padding: '4px 12px', borderRadius: 20,
                }}>
                  الأوفر
                </div>

                <div style={{ position: 'relative', marginBottom: 28 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 16,
                    background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 20,
                  }}>
                    <Crown size={24} color="#fbbf24" fill="#fbbf24" />
                  </div>
                  <h3 style={{ color: '#fff', fontSize: 22, fontWeight: 900, marginBottom: 8 }}>الخطة الشهرية</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, lineHeight: 1.75 }}>الأفضل للاستخدام المستمر والمحترفين</p>
                </div>

                <div style={{ position: 'relative', display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 32 }}>
                  <span style={{ color: '#fff', fontSize: 52, fontWeight: 900, lineHeight: 1 }}>8000</span>
                  <div>
                    <div style={{ color: '#fbbf24', fontSize: 16, fontWeight: 800 }}>ريال</div>
                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 600 }}>/ شهر</div>
                  </div>
                </div>

                <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}>
                  {['وصول كامل لجميع القوالب', 'تصدير PNG بجودة عالية', 'تخصيص ألوان ونصوص وصور', 'دعم فني على مدار الشهر', 'قوالب جديدة حصرية شهرياً'].map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Check size={13} color="#fbbf24" strokeWidth={2.5} />
                      </div>
                      <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 14, fontWeight: 600 }}>{f}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setLocation('/category/congrats')}
                  style={{
                    position: 'relative', width: '100%', padding: '14px', borderRadius: 14,
                    background: '#fff', border: 'none',
                    color: '#6366f1', fontSize: 15, fontWeight: 800, cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.2)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)'; }}
                >
                  اشترك شهرياً
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* ─── CTA BANNER ─── */}
        <section style={{ padding: '0 24px 100px' }}>
          <div style={{
            maxWidth: 920, margin: '0 auto',
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
            borderRadius: 32, padding: '60px 48px', textAlign: 'center',
            position: 'relative', overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(99,102,241,0.4)',
          }}>
            <div style={{ position: 'absolute', top: -60, left: -60, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
            <div style={{ position: 'absolute', bottom: -50, right: -50, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: 50, marginBottom: 18 }}>✨</div>
              <h2 style={{ color: '#fff', fontSize: 32, fontWeight: 900, marginBottom: 14, letterSpacing: '-0.02em' }}>جاهز لإنشاء تصميمك؟</h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 16, marginBottom: 36, lineHeight: 1.8 }}>
                اختر من مئات القوالب الجاهزة وخصّصها في ثوانٍ دون أي خبرة تقنية
              </p>
              <button
                onClick={() => setLocation('/category/congrats')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 9,
                  background: '#fff', border: 'none', cursor: 'pointer',
                  color: '#6366f1', fontSize: 16, fontWeight: 800,
                  padding: '15px 38px', borderRadius: 16,
                  boxShadow: '0 6px 25px rgba(0,0,0,0.2)',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0) scale(1)')}
              >
                <Sparkles size={18} />
                ابدأ مجاناً الآن
              </button>
            </div>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer style={{
          borderTop: '1px solid #f1f5f9',
          padding: '40px 24px', textAlign: 'center',
          background: '#fff',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 18 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(99,102,241,0.3)',
            }}>
              <LayoutTemplate size={17} color="#fff" />
            </div>
            <span style={{ color: '#1e1b4b', fontWeight: 900, fontSize: 17 }}>ستوديو القوالب</span>
          </div>
          <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
            {categories.map(c => (
              <button key={c.id} onClick={() => setLocation(`/category/${c.id}`)} style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                color: '#94a3b8', fontSize: 13, fontWeight: 600,
                padding: '5px 12px', borderRadius: 8, transition: 'color 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = '#6366f1')}
                onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
              >{c.name}</button>
            ))}
            <button onClick={() => setLocation('/about')} style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              color: '#94a3b8', fontSize: 13, fontWeight: 600,
              padding: '5px 12px', borderRadius: 8, transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = '#6366f1')}
              onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
            >من نحن</button>
          </div>
          <p style={{ color: '#cbd5e1', fontSize: 12 }}>© 2025 ستوديو القوالب — جميع الحقوق محفوظة</p>
        </footer>

      </div>
    </div>
  );
}
