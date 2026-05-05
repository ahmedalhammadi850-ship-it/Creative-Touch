import { Link } from 'wouter';
import {
  LayoutTemplate, Sparkles, Palette, Download, Shield,
  Zap, Heart, Star, Users, Globe, ChevronLeft, Mail
} from 'lucide-react';

const values = [
  {
    icon: Zap, title: 'سرعة وسهولة',
    desc: 'واجهة بسيطة تمكّنك من إنشاء تصميم احترافي خلال دقائق دون أي خبرة تقنية.',
    color: '#f59e0b',
  },
  {
    icon: Palette, title: 'تصاميم عربية أصيلة',
    desc: 'كل قالب مصمم بعناية مع مراعاة الذوق العربي والاتجاه من اليمين لليسار.',
    color: '#6366f1',
  },
  {
    icon: Shield, title: 'خصوصية تامة',
    desc: 'صورك وبياناتك لا تُرفع لأي سيرفر، كل العمل يتم مباشرة في متصفحك.',
    color: '#10b981',
  },
  {
    icon: Download, title: 'تصدير مجاني',
    desc: 'حمّل تصميمك بجودة عالية PNG في أي وقت وبدون أي رسوم أو اشتراكات.',
    color: '#ec4899',
  },
  {
    icon: Globe, title: 'يعمل في كل مكان',
    desc: 'لا تثبيت ولا تسجيل، يعمل من أي متصفح على الهاتف أو الكمبيوتر.',
    color: '#a855f7',
  },
  {
    icon: Heart, title: 'مصنوع بشغف',
    desc: 'نحرص على تحديث القوالب وإضافة المزيد باستمرار لتناسب كل المناسبات.',
    color: '#ef4444',
  },
];

const team = [
  { emoji: '👨‍💻', name: 'فريق التطوير', role: 'بناء وتطوير المنصة', color: '#6366f1' },
  { emoji: '🎨', name: 'فريق التصميم', role: 'إبداع وتصميم القوالب', color: '#ec4899' },
  { emoji: '🤝', name: 'فريق الدعم',   role: 'خدمة ودعم المستخدمين', color: '#10b981' },
];

export default function AboutPage() {
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
          <Link href="/">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 20px rgba(99,102,241,0.5)',
              }}>
                <LayoutTemplate size={20} color="#fff" />
              </div>
              <span style={{ color: '#fff', fontSize: 18, fontWeight: 900 }}>ستوديو القوالب</span>
            </div>
          </Link>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Link href="/">
              <span style={{
                color: 'rgba(255,255,255,0.6)', fontSize: 14, fontWeight: 600,
                padding: '8px 14px', borderRadius: 10, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 5,
              }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >
                <ChevronLeft size={14} />
                الرئيسية
              </span>
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
      <section style={{ position: 'relative', overflow: 'hidden', padding: '90px 24px 80px', textAlign: 'center' }}>
        <div style={{ position: 'absolute', top: -120, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -80, width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', maxWidth: 720, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.35)',
            borderRadius: 100, padding: '6px 16px', marginBottom: 28,
          }}>
            <Sparkles size={14} color="#a78bfa" />
            <span style={{ color: '#a78bfa', fontSize: 13, fontWeight: 700 }}>قصتنا ورسالتنا</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: 900,
            color: '#fff', lineHeight: 1.2, marginBottom: 22, letterSpacing: '-0.03em',
          }}>
            نُبسّط فن{' '}
            <span style={{
              background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              التصميم العربي
            </span>
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 17, lineHeight: 1.9, maxWidth: 580, margin: '0 auto' }}>
            ستوديو القوالب منصة عربية متكاملة تُتيح لكل شخص — بصرف النظر عن خبرته — إنشاء تصاميم احترافية رائعة لجميع المناسبات.
          </p>
        </div>
      </section>

      {/* ───── MISSION CARDS ───── */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {[
            {
              icon: '🎯', title: 'رسالتنا',
              text: 'نؤمن بأن التصميم الجميل حق للجميع. نبني أدوات بسيطة تُمكّن أي شخص من إنشاء بطاقات وتصاميم مذهلة دون الحاجة لمصمم.',
              gradient: 'rgba(99,102,241,0.2), rgba(99,102,241,0.05)',
              border: 'rgba(99,102,241,0.3)',
            },
            {
              icon: '🔭', title: 'رؤيتنا',
              text: 'نسعى لأن نكون المنصة العربية الأولى في تصميم البطاقات والدعوات — نوفر مئات القوالب الاحترافية لكل مناسبة.',
              gradient: 'rgba(168,85,247,0.2), rgba(168,85,247,0.05)',
              border: 'rgba(168,85,247,0.3)',
            },
            {
              icon: '💡', title: 'قيمنا',
              text: 'البساطة، الجمال، والخصوصية ركائز أساسية نبني عليها كل قرار. نضع المستخدم أولاً في كل ما نطوّره.',
              gradient: 'rgba(236,72,153,0.2), rgba(236,72,153,0.05)',
              border: 'rgba(236,72,153,0.3)',
            },
          ].map((card) => (
            <div key={card.title} style={{
              background: `linear-gradient(135deg, ${card.gradient})`,
              border: `1px solid ${card.border}`,
              borderRadius: 22, padding: '36px 28px',
            }}>
              <div style={{ fontSize: 40, marginBottom: 18 }}>{card.icon}</div>
              <h3 style={{ color: '#fff', fontSize: 20, fontWeight: 800, marginBottom: 12 }}>{card.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.85 }}>{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───── FEATURES / VALUES ───── */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)',
              borderRadius: 100, padding: '6px 16px', marginBottom: 16,
            }}>
              <Star size={13} color="#fbbf24" fill="#fbbf24" />
              <span style={{ color: '#fbbf24', fontSize: 13, fontWeight: 700 }}>لماذا ستوديو القوالب؟</span>
            </div>
            <h2 style={{ color: '#fff', fontSize: 32, fontWeight: 900, letterSpacing: '-0.02em' }}>مزايا تجعلنا مختلفين</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 18 }}>
            {values.map((v) => (
              <div key={v.title} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 18, padding: '28px 24px',
                display: 'flex', gap: 18, alignItems: 'flex-start',
                transition: 'border-color 0.3s',
              }}
                onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = `${v.color}44`)}
                onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)')}
              >
                <div style={{
                  width: 50, height: 50, borderRadius: 14, flexShrink: 0,
                  background: `${v.color}20`,
                  border: `1px solid ${v.color}33`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <v.icon size={24} color={v.color} />
                </div>
                <div>
                  <h4 style={{ color: '#fff', fontSize: 16, fontWeight: 800, marginBottom: 8 }}>{v.title}</h4>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, lineHeight: 1.8 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── TEAM ───── */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)',
              borderRadius: 100, padding: '6px 16px', marginBottom: 16,
            }}>
              <Users size={13} color="#34d399" />
              <span style={{ color: '#34d399', fontSize: 13, fontWeight: 700 }}>فريق العمل</span>
            </div>
            <h2 style={{ color: '#fff', fontSize: 30, fontWeight: 900, letterSpacing: '-0.02em' }}>من يقف وراء المنصة</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {team.map((member) => (
              <div key={member.name} style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 20, padding: '32px 20px', textAlign: 'center',
                transition: 'transform 0.25s',
              }}
                onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)')}
                onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)')}
              >
                <div style={{
                  width: 72, height: 72, borderRadius: '50%',
                  background: `${member.color}22`,
                  border: `2px solid ${member.color}44`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 36, margin: '0 auto 18px',
                }}>
                  {member.emoji}
                </div>
                <h4 style={{ color: '#fff', fontSize: 16, fontWeight: 800, marginBottom: 6 }}>{member.name}</h4>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CONTACT CTA ───── */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{
          maxWidth: 860, margin: '0 auto',
          background: 'linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(168,85,247,0.2) 100%)',
          border: '1px solid rgba(99,102,241,0.3)',
          borderRadius: 28, padding: '56px 40px', textAlign: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -50, left: -50, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.25), transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -40, right: -40, width: 150, height: 150, borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.2), transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <div style={{
              width: 64, height: 64, borderRadius: 18,
              background: 'linear-gradient(135deg, rgba(99,102,241,0.4), rgba(168,85,247,0.4))',
              border: '1px solid rgba(99,102,241,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 22px',
            }}>
              <Mail size={28} color="#a78bfa" />
            </div>
            <h2 style={{ color: '#fff', fontSize: 28, fontWeight: 900, marginBottom: 14 }}>هل لديك سؤال أو اقتراح؟</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, marginBottom: 32, lineHeight: 1.8 }}>
              يسعدنا سماع آرائكم ومقترحاتكم لتطوير المنصة وإضافة قوالب جديدة
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/">
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                  color: '#fff', fontSize: 15, fontWeight: 700,
                  padding: '13px 30px', borderRadius: 12, cursor: 'pointer',
                  boxShadow: '0 8px 25px rgba(99,102,241,0.45)',
                }}>
                  <Sparkles size={16} />
                  ابدأ التصميم
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.07)',
        padding: '36px 24px', textAlign: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 9,
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <LayoutTemplate size={16} color="#fff" />
          </div>
          <span style={{ color: '#fff', fontWeight: 800, fontSize: 16 }}>ستوديو القوالب</span>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>© 2025 ستوديو القوالب — جميع الحقوق محفوظة</p>
      </footer>

    </div>
  );
}
