import { Link } from 'wouter';
import { categories } from '../data/categories';
import {
  Sparkles, Zap, Download, Palette, Star, ArrowLeft,
  LayoutTemplate, ChevronLeft, Users, Award, Clock
} from 'lucide-react';

const categoryIcons: Record<string, string> = {
  'congrats':      '🎊',
  'wedding':       '💍',
  'business-card': '🪪',
  'ads':           '📣',
};

const categoryGradients: Record<string, string> = {
  'congrats':      'from-rose-500 via-pink-500 to-orange-400',
  'wedding':       'from-amber-400 via-yellow-400 to-orange-300',
  'business-card': 'from-indigo-600 via-blue-500 to-cyan-400',
  'ads':           'from-violet-600 via-purple-500 to-fuchsia-400',
};

const stats = [
  { icon: LayoutTemplate, label: 'قالب جاهز', value: '80+' },
  { icon: Users,          label: 'مستخدم راضٍ', value: '2k+' },
  { icon: Download,       label: 'تصدير مجاني', value: '∞' },
  { icon: Award,          label: 'تصميم احترافي', value: '100%' },
];

const steps = [
  { icon: Palette, title: 'اختر القالب',  desc: 'تصفح مجموعتنا الواسعة وابحث عن التصميم المثالي لمناسبتك.', color: '#6366f1' },
  { icon: Sparkles, title: 'خصّص بحرية', desc: 'أضف الاسم والصورة والألوان وكل التفاصيل بلمسة واحدة.', color: '#ec4899' },
  { icon: Download, title: 'صدّر واشارك',  desc: 'حمّل تصميمك بجودة عالية PNG وشاركه مباشرة.', color: '#f59e0b' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen" dir="rtl" style={{ fontFamily: "'Cairo', sans-serif", background: '#0a0a1a' }}>

      {/* ───── NAVBAR ───── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(10,10,26,0.85)',
        backdropFilter: 'blur(18px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 20px rgba(99,102,241,0.5)',
            }}>
              <LayoutTemplate size={20} color="#fff" />
            </div>
            <span style={{ color: '#fff', fontSize: 18, fontWeight: 900, letterSpacing: '-0.02em' }}>ستوديو القوالب</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Link href="/about">
              <span style={{
                color: 'rgba(255,255,255,0.65)', fontSize: 14, fontWeight: 600,
                padding: '8px 16px', borderRadius: 10, cursor: 'pointer',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
              >من نحن</span>
            </Link>
            <Link href="/category/congrats">
              <span style={{
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                color: '#fff', fontSize: 14, fontWeight: 700,
                padding: '8px 18px', borderRadius: 10, cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(99,102,241,0.4)',
              }}>ابدأ الآن</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* ───── HERO ───── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '100px 24px 80px' }}>
        {/* Background blobs */}
        <div style={{ position: 'absolute', top: -100, right: -150, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 300, background: 'radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', maxWidth: 780, margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.35)',
            borderRadius: 100, padding: '6px 16px', marginBottom: 28,
          }}>
            <Sparkles size={14} color="#a78bfa" />
            <span style={{ color: '#a78bfa', fontSize: 13, fontWeight: 700 }}>أداة تصميم عربية احترافية مجاناً</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 900,
            color: '#fff', lineHeight: 1.15, marginBottom: 24,
            letterSpacing: '-0.03em',
          }}>
            صمّم بطاقة{' '}
            <span style={{
              background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              مذهلة
            </span>
            {' '}في دقائق
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 18, lineHeight: 1.8, maxWidth: 560, margin: '0 auto 40px' }}>
            أكثر من 80 قالب احترافي للتهنئة والأعراس والبطاقات التجارية — خصّص وصدّر مجاناً
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/category/congrats">
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                color: '#fff', fontSize: 16, fontWeight: 700,
                padding: '14px 32px', borderRadius: 14, cursor: 'pointer',
                boxShadow: '0 8px 30px rgba(99,102,241,0.45)',
                transition: 'transform 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <Zap size={18} />
                استكشف القوالب
              </span>
            </Link>
            <Link href="/about">
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff', fontSize: 16, fontWeight: 600,
                padding: '14px 28px', borderRadius: 14, cursor: 'pointer',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}
              >
                من نحن
                <ChevronLeft size={16} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ───── STATS ───── */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{
          maxWidth: 1000, margin: '0 auto',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 24, padding: '36px 48px',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 24,
        }}>
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(168,85,247,0.3))',
                border: '1px solid rgba(99,102,241,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 12px',
              }}>
                <Icon size={22} color="#a78bfa" />
              </div>
              <div style={{ color: '#fff', fontSize: 28, fontWeight: 900, lineHeight: 1 }}>{value}</div>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, marginTop: 6 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ───── CATEGORIES ───── */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)',
              borderRadius: 100, padding: '6px 16px', marginBottom: 16,
            }}>
              <Star size={13} color="#c084fc" fill="#c084fc" />
              <span style={{ color: '#c084fc', fontSize: 13, fontWeight: 700 }}>الفئات المتاحة</span>
            </div>
            <h2 style={{ color: '#fff', fontSize: 36, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 12 }}>
              كل مناسبة لها تصميمها
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 16 }}>اختر الفئة المناسبة وابدأ التخصيص فوراً</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {categories.map((cat) => (
              <Link key={cat.id} href={`/category/${cat.id}`}>
                <div
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 20, overflow: 'hidden', cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)';
                    (e.currentTarget as HTMLDivElement).style.border = '1px solid rgba(99,102,241,0.4)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 60px rgba(99,102,241,0.2)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLDivElement).style.border = '1px solid rgba(255,255,255,0.08)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                  }}
                >
                  {/* Card top gradient */}
                  <div style={{
                    height: 160,
                    background: `linear-gradient(135deg, ${categoryGradients[cat.id] ? '' : '#6366f1, #a855f7'})`,
                    backgroundImage: `linear-gradient(135deg, var(--g1) 0%, var(--g2) 50%, var(--g3) 100%)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 64, position: 'relative',
                  }}
                    className={`bg-gradient-to-br ${categoryGradients[cat.id] || 'from-indigo-600 to-purple-500'}`}
                  >
                    <div style={{
                      width: 80, height: 80, borderRadius: '50%',
                      background: 'rgba(255,255,255,0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 44, backdropFilter: 'blur(8px)',
                    }}>
                      {categoryIcons[cat.id] || '🎨'}
                    </div>
                    <div style={{
                      position: 'absolute', bottom: 12, left: 16,
                      background: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 20, padding: '3px 12px',
                      color: '#fff', fontSize: 12, fontWeight: 700,
                    }}>
                      {cat.templates.length} قالب
                    </div>
                  </div>

                  {/* Card body */}
                  <div style={{ padding: '20px 22px 22px' }}>
                    <h3 style={{ color: '#fff', fontSize: 20, fontWeight: 800, marginBottom: 8 }}>{cat.name}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, lineHeight: 1.7, marginBottom: 18 }}>{cat.description}</p>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      color: '#a78bfa', fontSize: 14, fontWeight: 700,
                    }}>
                      تصفح القوالب
                      <ArrowLeft size={15} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───── HOW IT WORKS ───── */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ color: '#fff', fontSize: 34, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 10 }}>كيف يعمل؟</h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 15 }}>ثلاث خطوات بسيطة للحصول على تصميمك</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {steps.map((step, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 20, padding: '32px 28px', textAlign: 'center', position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', top: 20, right: 20,
                  width: 28, height: 28, borderRadius: '50%',
                  background: `${step.color}22`,
                  border: `1px solid ${step.color}44`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: step.color, fontSize: 13, fontWeight: 900,
                }}>
                  {i + 1}
                </div>
                <div style={{
                  width: 64, height: 64, borderRadius: 18,
                  background: `${step.color}22`,
                  border: `1px solid ${step.color}33`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                }}>
                  <step.icon size={28} color={step.color} />
                </div>
                <h3 style={{ color: '#fff', fontSize: 18, fontWeight: 800, marginBottom: 10 }}>{step.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, lineHeight: 1.8 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CTA BANNER ───── */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{
          maxWidth: 900, margin: '0 auto',
          background: 'linear-gradient(135deg, rgba(99,102,241,0.25) 0%, rgba(168,85,247,0.25) 100%)',
          border: '1px solid rgba(99,102,241,0.35)',
          borderRadius: 28, padding: '56px 48px', textAlign: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -60, left: -60, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.3), transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.25), transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✨</div>
            <h2 style={{ color: '#fff', fontSize: 30, fontWeight: 900, marginBottom: 14, letterSpacing: '-0.02em' }}>جاهز لإنشاء تصميمك؟</h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 16, marginBottom: 32 }}>اختر من مئات القوالب الجاهزة وخصّصها في ثوانٍ</p>
            <Link href="/category/congrats">
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                color: '#fff', fontSize: 16, fontWeight: 700,
                padding: '14px 36px', borderRadius: 14, cursor: 'pointer',
                boxShadow: '0 8px 30px rgba(99,102,241,0.5)',
              }}>
                <Sparkles size={18} />
                ابدأ مجاناً الآن
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.07)',
        padding: '36px 24px',
        textAlign: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 9,
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <LayoutTemplate size={16} color="#fff" />
          </div>
          <span style={{ color: '#fff', fontWeight: 800, fontSize: 16 }}>ستوديو القوالب</span>
        </div>
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginBottom: 20 }}>
          {categories.map(c => (
            <Link key={c.id} href={`/category/${c.id}`}>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
              >{c.name}</span>
            </Link>
          ))}
          <Link href="/about">
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
            >من نحن</span>
          </Link>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>© 2025 ستوديو القوالب — جميع الحقوق محفوظة</p>
      </footer>

    </div>
  );
}
