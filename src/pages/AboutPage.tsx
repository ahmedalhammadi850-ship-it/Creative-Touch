import { useState } from 'react';
import { useLocation } from 'wouter';
import {
  LayoutTemplate, Sparkles, Palette, Download, Shield,
  Zap, Heart, Star, Users, Globe, ChevronLeft, Mail,
  LogIn, UserPlus, LogOut, LayoutDashboard, Crown
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const values = [
  { icon: Zap,      title: 'سرعة وسهولة',         desc: 'واجهة بسيطة تمكّنك من إنشاء تصميم احترافي خلال دقائق دون أي خبرة تقنية.', color: '#f59e0b', bg: '#fffbeb' },
  { icon: Palette,  title: 'تصاميم عربية أصيلة',   desc: 'كل قالب مصمم بعناية مع مراعاة الذوق العربي والاتجاه من اليمين لليسار.',   color: '#6366f1', bg: '#eef2ff' },
  { icon: Shield,   title: 'خصوصية تامة',           desc: 'صورك وبياناتك لا تُرفع لأي سيرفر، كل العمل يتم مباشرة في متصفحك.',        color: '#10b981', bg: '#f0fdf4' },
  { icon: Download, title: 'تصدير مجاني',           desc: 'حمّل تصميمك بجودة عالية PNG في أي وقت وبدون أي رسوم أو اشتراكات.',       color: '#ec4899', bg: '#fdf2f8' },
  { icon: Globe,    title: 'يعمل في كل مكان',       desc: 'لا تثبيت ولا تسجيل، يعمل من أي متصفح على الهاتف أو الكمبيوتر.',          color: '#a855f7', bg: '#faf5ff' },
  { icon: Heart,    title: 'مصنوع بشغف',            desc: 'نحرص على تحديث القوالب وإضافة المزيد باستمرار لتناسب كل المناسبات.',      color: '#ef4444', bg: '#fff1f2' },
];

const team = [
  { emoji: '👨‍💻', name: 'فريق التطوير', role: 'بناء وتطوير المنصة',    color: '#6366f1', bg: '#eef2ff' },
  { emoji: '🎨', name: 'فريق التصميم', role: 'إبداع وتصميم القوالب',  color: '#ec4899', bg: '#fdf2f8' },
  { emoji: '🤝', name: 'فريق الدعم',   role: 'خدمة ودعم المستخدمين',  color: '#10b981', bg: '#f0fdf4' },
];

export default function AboutPage() {
  const [, setLocation] = useLocation();
  const { user, logout } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div dir="rtl" style={{ fontFamily: "'Cairo', sans-serif", minHeight: '100vh', background: '#f8f7ff' }}>

      {/* background blobs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: -200, right: -150, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: 100, left: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)' }} />
      </div>

      {/* ─── NAVBAR ─── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(99,102,241,0.1)',
        boxShadow: '0 1px 20px rgba(99,102,241,0.08)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>

          {/* Right side — actions */}
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>

            <button onClick={() => setLocation('/')}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#6366f1', fontSize: 14, fontWeight: 700, padding: '9px 16px', borderRadius: 10, display: 'inline-flex', alignItems: 'center', gap: 5 }}
              onMouseEnter={e => (e.currentTarget.style.background = '#eef2ff')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              <ChevronLeft size={15} />الرئيسية
            </button>

            <button onClick={() => { setLocation('/'); setTimeout(() => document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' }), 300); }}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#6366f1', fontSize: 14, fontWeight: 700, padding: '9px 16px', borderRadius: 10, display: 'inline-flex', alignItems: 'center', gap: 5 }}
              onMouseEnter={e => (e.currentTarget.style.background = '#eef2ff')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              <Crown size={14} />الأسعار
            </button>

            {user ? (
              <div style={{ position: 'relative' }}>
                <button onClick={() => setShowUserMenu(v => !v)}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#eef2ff', border: '2px solid #c7d2fe', cursor: 'pointer', borderRadius: 12, padding: '7px 12px', color: '#6366f1', fontSize: 13, fontWeight: 800 }}>
                  <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 900, flexShrink: 0 }}>
                    {user.name.charAt(0)}
                  </div>
                  {user.name.split(' ')[0]}
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
              <div style={{ display: 'flex', gap: 6 }}>
                <button onClick={() => setLocation('/login')}
                  style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'transparent', border: '2px solid #c7d2fe', cursor: 'pointer', color: '#6366f1', fontSize: 13, fontWeight: 800, padding: '7px 13px', borderRadius: 12 }}>
                  <LogIn size={15} />دخول
                </button>
                <button onClick={() => setLocation('/register')}
                  style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'linear-gradient(135deg,#6366f1,#a855f7)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 13, fontWeight: 800, padding: '7px 13px', borderRadius: 12, boxShadow: '0 4px 14px rgba(99,102,241,0.35)' }}>
                  <UserPlus size={15} />إنشاء حساب
                </button>
              </div>
            )}
          </div>

          {/* Logo */}
          <button onClick={() => setLocation('/')}
            style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: 'linear-gradient(135deg, #6366f1, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(99,102,241,0.35)' }}>
              <LayoutTemplate size={22} color="#fff" />
            </div>
            <span style={{ color: '#1e1b4b', fontSize: 20, fontWeight: 900 }}>ستوديو القوالب</span>
          </button>
        </div>
      </nav>

      {/* Click-away for user menu */}
      {showUserMenu && <div style={{ position: 'fixed', inset: 0, zIndex: 49 }} onClick={() => setShowUserMenu(false)} />}

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ─── HERO ─── */}
        <section style={{ padding: '90px 24px 76px', textAlign: 'center' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'linear-gradient(135deg, #eef2ff, #fdf4ff)',
              border: '1px solid rgba(99,102,241,0.25)',
              borderRadius: 100, padding: '7px 18px', marginBottom: 28,
              boxShadow: '0 2px 12px rgba(99,102,241,0.1)',
            }}>
              <Sparkles size={14} color="#6366f1" />
              <span style={{ color: '#6366f1', fontSize: 13, fontWeight: 700 }}>قصتنا ورسالتنا</span>
            </div>
            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 900,
              color: '#1e1b4b', lineHeight: 1.2, marginBottom: 22, letterSpacing: '-0.03em',
            }}>
              نُبسّط فن{' '}
              <span style={{
                background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                التصميم العربي
              </span>
            </h1>
            <p style={{ color: '#64748b', fontSize: 17, lineHeight: 1.9, maxWidth: 580, margin: '0 auto' }}>
              ستوديو القوالب منصة عربية متكاملة تُتيح لكل شخص — بصرف النظر عن خبرته — إنشاء تصاميم احترافية رائعة لجميع المناسبات.
            </p>
          </div>
        </section>

        {/* ─── MISSION CARDS ─── */}
        <section style={{ padding: '0 24px 80px' }}>
          <div style={{ maxWidth: 1060, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 22 }}>
            {[
              { icon: '🎯', title: 'رسالتنا', bg: '#eef2ff', border: '#c7d2fe', titleColor: '#4338ca', text: 'نؤمن بأن التصميم الجميل حق للجميع. نبني أدوات بسيطة تُمكّن أي شخص من إنشاء بطاقات وتصاميم مذهلة دون الحاجة لمصمم.' },
              { icon: '🔭', title: 'رؤيتنا', bg: '#fdf4ff', border: '#e9d5ff', titleColor: '#7c3aed', text: 'نسعى لأن نكون المنصة العربية الأولى في تصميم البطاقات والدعوات — نوفر مئات القوالب الاحترافية لكل مناسبة.' },
              { icon: '💡', title: 'قيمنا',   bg: '#fdf2f8', border: '#fbcfe8', titleColor: '#be185d', text: 'البساطة، الجمال، والخصوصية ركائز أساسية نبني عليها كل قرار. نضع المستخدم أولاً في كل ما نطوّره.' },
            ].map((card) => (
              <div key={card.title} style={{
                background: card.bg, border: `1px solid ${card.border}`,
                borderRadius: 24, padding: '36px 30px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
                transition: 'transform 0.25s',
              }}
                onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)')}
                onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)')}
              >
                <div style={{ fontSize: 44, marginBottom: 18 }}>{card.icon}</div>
                <h3 style={{ color: card.titleColor, fontSize: 21, fontWeight: 900, marginBottom: 12 }}>{card.title}</h3>
                <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.85 }}>{card.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── FEATURES ─── */}
        <section style={{ padding: '0 24px 100px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#fffbeb', border: '1px solid #fde68a',
                borderRadius: 100, padding: '7px 18px', marginBottom: 18,
              }}>
                <Star size={13} color="#f59e0b" fill="#f59e0b" />
                <span style={{ color: '#d97706', fontSize: 13, fontWeight: 700 }}>لماذا ستوديو القوالب؟</span>
              </div>
              <h2 style={{ color: '#1e1b4b', fontSize: 34, fontWeight: 900, letterSpacing: '-0.02em' }}>مزايا تجعلنا مختلفين</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 18 }}>
              {values.map((v) => (
                <div key={v.title} style={{
                  background: '#fff', border: '1px solid #f1f5f9',
                  borderRadius: 20, padding: '28px 24px',
                  display: 'flex', gap: 18, alignItems: 'flex-start',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
                  transition: 'all 0.25s',
                }}
                  onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.boxShadow = `0 8px 30px ${v.color}20`; d.style.borderColor = `${v.color}30`; }}
                  onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.boxShadow = '0 2px 16px rgba(0,0,0,0.04)'; d.style.borderColor = '#f1f5f9'; }}
                >
                  <div style={{
                    width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                    background: v.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 4px 12px ${v.color}18`,
                  }}>
                    <v.icon size={24} color={v.color} />
                  </div>
                  <div>
                    <h4 style={{ color: '#1e1b4b', fontSize: 16, fontWeight: 800, marginBottom: 8 }}>{v.title}</h4>
                    <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.85 }}>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── TEAM ─── */}
        <section style={{ padding: '0 24px 100px' }}>
          <div style={{ maxWidth: 820, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#f0fdf4', border: '1px solid #bbf7d0',
                borderRadius: 100, padding: '7px 18px', marginBottom: 18,
              }}>
                <Users size={13} color="#10b981" />
                <span style={{ color: '#059669', fontSize: 13, fontWeight: 700 }}>فريق العمل</span>
              </div>
              <h2 style={{ color: '#1e1b4b', fontSize: 32, fontWeight: 900, letterSpacing: '-0.02em' }}>من يقف وراء المنصة</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 18 }}>
              {team.map((member) => (
                <div key={member.name} style={{
                  background: '#fff', border: '1px solid #f1f5f9',
                  borderRadius: 22, padding: '36px 20px', textAlign: 'center',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  transition: 'transform 0.25s',
                }}
                  onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)')}
                >
                  <div style={{
                    width: 76, height: 76, borderRadius: '50%',
                    background: member.bg,
                    border: `2px solid ${member.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 38, margin: '0 auto 18px',
                    boxShadow: `0 6px 20px ${member.color}20`,
                  }}>
                    {member.emoji}
                  </div>
                  <h4 style={{ color: '#1e1b4b', fontSize: 17, fontWeight: 800, marginBottom: 7 }}>{member.name}</h4>
                  <p style={{ color: '#94a3b8', fontSize: 13 }}>{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section style={{ padding: '0 24px 100px' }}>
          <div style={{
            maxWidth: 880, margin: '0 auto',
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
            borderRadius: 32, padding: '60px 44px', textAlign: 'center',
            boxShadow: '0 20px 60px rgba(99,102,241,0.35)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: -50, left: -50, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
            <div style={{ position: 'absolute', bottom: -40, right: -40, width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
            <div style={{ position: 'relative' }}>
              <div style={{
                width: 68, height: 68, borderRadius: 20,
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 22px',
              }}>
                <Mail size={30} color="#fff" />
              </div>
              <h2 style={{ color: '#fff', fontSize: 30, fontWeight: 900, marginBottom: 14 }}>هل لديك سؤال أو اقتراح؟</h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 16, marginBottom: 34, lineHeight: 1.8 }}>
                يسعدنا سماع آرائكم ومقترحاتكم لتطوير المنصة وإضافة قوالب جديدة
              </p>
              <button
                onClick={() => setLocation('/')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 9,
                  background: '#fff', border: 'none', cursor: 'pointer',
                  color: '#6366f1', fontSize: 16, fontWeight: 800,
                  padding: '15px 36px', borderRadius: 16,
                  boxShadow: '0 6px 25px rgba(0,0,0,0.2)',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0) scale(1)')}
              >
                <Sparkles size={18} />
                ابدأ التصميم
              </button>
            </div>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer style={{ borderTop: '1px solid #f1f5f9', padding: '36px 24px', textAlign: 'center', background: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <LayoutTemplate size={17} color="#fff" />
            </div>
            <span style={{ color: '#1e1b4b', fontWeight: 900, fontSize: 17 }}>ستوديو القوالب</span>
          </div>
          <p style={{ color: '#cbd5e1', fontSize: 12 }}>© 2025 ستوديو القوالب — جميع الحقوق محفوظة</p>
        </footer>

      </div>
    </div>
  );
}
