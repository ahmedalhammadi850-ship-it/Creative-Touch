import { Component, type ReactNode } from 'react';

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div dir="rtl" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f7ff', fontFamily: "'Cairo',sans-serif", padding: 20 }}>
          <div style={{ textAlign: 'center', maxWidth: 400 }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>⚠️</div>
            <h2 style={{ color: '#1e1b4b', fontSize: 22, fontWeight: 900, marginBottom: 12 }}>حدث خطأ في التطبيق</h2>
            <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>
              نعتذر عن هذا الخطأ. يرجى تحديث الصفحة أو المحاولة مرة أخرى.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{ padding: '12px 28px', borderRadius: 14, background: 'linear-gradient(135deg,#6366f1,#a855f7)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 15, fontWeight: 800, fontFamily: "'Cairo',sans-serif" }}>
              تحديث الصفحة
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
