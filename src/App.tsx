import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageRouter } from "@/components/LanguageRouter";
import { Index } from "./pages/Index";
import { About } from "./pages/About";
import { Features } from "./pages/Features";
import { Pricing } from "./pages/Pricing";
import { Careers } from "./pages/Careers";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";
import { Security } from "./pages/Security";
import { Signup } from "./pages/Signup";
import Login from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { DynamicLandingPage } from "./pages/DynamicLandingPage";
import { Inspiration } from "./pages/Inspiration";
import { CategoryPage } from "./pages/CategoryPage"; // Import the new CategoryPage
import { ScrollToTop } from "./components/ScrollToTop";
import { initializeGclidTracking } from "./utils/gclid";
import "./i18n";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  // Initialize GCLID tracking on app load
  useEffect(() => {
    initializeGclidTracking();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="kliv-ui-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Redirect root to default language */}
              <Route path="/" element={<LanguageRouter><Index /></LanguageRouter>} />
              
              {/* Language-prefixed routes */}
              <Route path="/:lang" element={<LanguageRouter><Index /></LanguageRouter>} />
              <Route path="/:lang/about" element={<LanguageRouter><About /></LanguageRouter>} />
              <Route path="/:lang/features" element={<LanguageRouter><Features /></LanguageRouter>} />
              <Route path="/:lang/pricing" element={<LanguageRouter><Pricing /></LanguageRouter>} />
              <Route path="/:lang/careers" element={<LanguageRouter><Careers /></LanguageRouter>} />
              <Route path="/:lang/privacy" element={<LanguageRouter><Privacy /></LanguageRouter>} />
              <Route path="/:lang/terms" element={<LanguageRouter><Terms /></LanguageRouter>} />
              <Route path="/:lang/security" element={<LanguageRouter><Security /></LanguageRouter>} />
              <Route path="/:lang/signup" element={<LanguageRouter><Signup /></LanguageRouter>} />
              <Route path="/:lang/login" element={<LanguageRouter><Login /></LanguageRouter>} />
              <Route path="/:lang/inspiration" element={<LanguageRouter><Inspiration /></LanguageRouter>} />
              <Route path="/:lang/inspiration/:categorySlug" element={<LanguageRouter><CategoryPage /></LanguageRouter>} /> {/* New route for category pages */}
              
              {/* Dynamic landing pages - two levels deep */}
              <Route path="/:lang/:category/:subcategory" element={<LanguageRouter><DynamicLandingPage /></LanguageRouter>} />
              
              {/* Dynamic landing pages - one level deep */}
              <Route path="/:lang/:category" element={<LanguageRouter><DynamicLandingPage /></LanguageRouter>} />
              
              {/* Legacy routes without language prefix - redirect to default language */}
              <Route path="/about" element={<LanguageRouter><About /></LanguageRouter>} />
              <Route path="/features" element={<LanguageRouter><Features /></LanguageRouter>} />
              <Route path="/pricing" element={<LanguageRouter><Pricing /></LanguageRouter>} />
              <Route path="/careers" element={<LanguageRouter><Careers /></LanguageRouter>} />
              <Route path="/privacy" element={<LanguageRouter><Privacy /></LanguageRouter>} />
              <Route path="/terms" element={<LanguageRouter><Terms /></LanguageRouter>} />
              <Route path="/security" element={<LanguageRouter><Security /></LanguageRouter>} />
              <Route path="/signup" element={<LanguageRouter><Signup /></LanguageRouter>} />
              <Route path="/login" element={<LanguageRouter><Login /></LanguageRouter>} />
              <Route path="/inspiration" element={<LanguageRouter><Inspiration /></LanguageRouter>} />
              
              {/* Catch-all for 404 */}
              <Route path="*" element={<LanguageRouter><NotFound /></LanguageRouter>} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;