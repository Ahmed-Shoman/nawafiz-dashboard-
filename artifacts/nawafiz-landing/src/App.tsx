import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { ApiProvider, useApi } from "@/contexts/ApiContext";
import { SEOHead } from "@/components/ui/seo-head";

import Home from "@/pages/Home";
import ServicesPage from "@/pages/ServicesPage";
import ServiceDetailPage from "@/pages/ServiceDetailPage";
import ContactPage from "@/pages/ContactPage";
import NotFound from "@/pages/not-found";
import ThankYou from "@/pages/ThankYou";
import BlogDetailPage from "@/pages/BlogDetailPage";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={ServicesPage} />
      <Route path="/services/:slug" component={ServiceDetailPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/thank-you" component={ThankYou} />
      <Route path="/blogs/:slug" component={BlogDetailPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function GlobalSEO() {
  const { seo, settings } = useApi();
  const { lang } = useLanguage();
  const [location] = useLocation();

  if (!seo || typeof seo !== 'object') return null;

  // Use explicit Home Meta Title if we are on the homepage
  const isHome = location === '/';
  
  const metaTitle = isHome 
      ? (seo[`home_meta_title_${lang}`] || seo[`global_meta_title_${lang}`] || 'Nawafiz')
      : (seo[`global_meta_title_${lang}`] || 'Nawafiz');
      
  const metaDesc = seo[`global_meta_description_${lang}`] || '';
  const keywords = seo['global_keywords'] || '';
  const ogImg = seo['default_og_image'] || `${import.meta.env.BASE_URL}images/hero-1.jpg`;

  // Get favicon from site settings
  const getSetting = (key: string) => {
    if (Array.isArray(settings)) {
      const found = settings.find((s: any) => s.key === key);
      return found?.value || null;
    }
    if (settings && typeof settings === 'object' && settings[key]) {
      return settings[key];
    }
    return null;
  };
  
  const favicon = getSetting('favicon') || '/favicon.svg';

  return (
    <SEOHead
      defaultTitle={metaTitle}
      meta={[
        { name: 'description', content: metaDesc },
        ...(keywords ? [{ name: 'keywords', content: keywords }] : []),
        { property: 'og:title', content: metaTitle },
        { property: 'og:description', content: metaDesc },
        { property: 'og:image', content: ogImg },
        { property: 'og:type', content: 'website' },
      ]}
      link={[
        { rel: 'icon', href: favicon }
      ]}
    />
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ApiProvider>
        <LanguageProvider>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <GlobalSEO />
              <Router />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </LanguageProvider>
      </ApiProvider>
    </QueryClientProvider>
  );
}

export default App;
