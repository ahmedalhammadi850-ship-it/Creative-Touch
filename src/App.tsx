import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";

import HomePage from "@/pages/HomePage";
import CategoryPage from "@/pages/CategoryPage";
import EditorPage from "@/pages/EditorPage";
import AboutPage from "@/pages/AboutPage";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/category/:id" component={CategoryPage} />
      <Route path="/editor/:categoryId/:templateId" component={EditorPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/" component={HomePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.dir = "rtl";
  }, []);

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
