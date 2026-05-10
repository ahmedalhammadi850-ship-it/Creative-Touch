import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";

import HomePage from "@/pages/HomePage";
import CategoryPage from "@/pages/CategoryPage";
import EditorPage from "@/pages/EditorPage";
import AboutPage from "@/pages/AboutPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import VerifyCallbackPage from "@/pages/VerifyCallbackPage";
import AdminLoginPage from "@/pages/AdminLoginPage";
import AdminDashboard from "@/pages/AdminDashboard";
import UserDashboard from "@/pages/UserDashboard";
import NotFound from "@/pages/not-found";

import { useAdminStore } from "@/store/useAdminStore";
import { useAuthStore } from "@/store/useAuthStore";
import { subscribeToUser } from "@/lib/firestoreService";

const queryClient = new QueryClient();

function AdminRoute({ component: Component }: { component: React.ComponentType }) {
  const { isLoggedIn } = useAdminStore();
  if (!isLoggedIn) return <Redirect to="/admin/login" />;
  return <Component />;
}

function UserRoute({ component: Component }: { component: React.ComponentType }) {
  const { user } = useAuthStore();
  if (!user) return <Redirect to="/login" />;
  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/category/:id" component={CategoryPage} />
      <Route path="/editor/:categoryId/:templateId" component={EditorPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/forgot-password" component={ForgotPasswordPage} />
      <Route path="/reset-password" component={ResetPasswordPage} />
      <Route path="/verify-callback" component={VerifyCallbackPage} />
      <Route path="/dashboard">{() => <UserRoute component={UserDashboard} />}</Route>
      <Route path="/admin/login" component={AdminLoginPage} />
      <Route path="/admin">{() => <AdminRoute component={AdminDashboard} />}</Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { user, addActivatedTemplates, updateUserPlan } = useAuthStore();

  useEffect(() => {
    document.documentElement.dir = "rtl";
  }, []);

  // Listen to current user's Firestore doc so admin approvals unlock templates in real-time
  useEffect(() => {
    if (!user?.id) return;
    const unsub = subscribeToUser(user.id, (fsUser) => {
      // Sync activatedTemplates from Firestore → local store
      if (fsUser.activatedTemplates && fsUser.activatedTemplates.length > 0) {
        addActivatedTemplates(user.id, fsUser.activatedTemplates);
      }
      // Sync plan/planStatus from Firestore → local store
      if (fsUser.plan && fsUser.plan !== user.plan) {
        updateUserPlan(user.id, fsUser.plan, fsUser.planStatus, fsUser.planExpiresAt);
      }
    });
    return () => unsub();
  }, [user?.id]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
