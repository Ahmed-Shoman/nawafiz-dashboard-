import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';

interface ApiContextType {
  sections: any[];
  services: any[];
  projects: any[];
  testimonials: any[];
  blogs: any[];
  seo: any;
  settings: any;
  loading: boolean;
  refetch: () => void;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

const REFRESH_INTERVAL = 30_000; // 30 seconds

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.nawafedz.com';

export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState({
    sections: [] as any[],
    services: [] as any[],
    projects: [] as any[],
    testimonials: [] as any[],
    blogs: [] as any[],
    seo: {} as any,
    settings: {} as any,
  });
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchData = useCallback(async () => {
    try {
      // Cache-busting timestamp so we always get fresh data
      const t = Date.now();

      const fetchJson = async (url: string) => {
        const res = await fetch(`${API_BASE_URL}${url}?t=${t}`, {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Accept': 'application/json'
          },
        });
        if (!res.ok) return [];
        return await res.json();
      };

      const [sections, services, projects, testimonials, blogs, seo, settings] =
        await Promise.all([
          fetchJson('/api/sections'),
          fetchJson('/api/services'),
          fetchJson('/api/projects'),
          fetchJson('/api/testimonials'),
          fetchJson('/api/blogs'),
          fetchJson('/api/seo'),
          fetchJson('/api/settings'),
        ]);

      setData({ sections, services, projects, testimonials, blogs, seo, settings });
    } catch (err) {
      console.error('Failed to fetch API data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch + polling every 30s
  useEffect(() => {
    fetchData();

    intervalRef.current = setInterval(fetchData, REFRESH_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchData]);

  // SEO Scripts Injection
  useEffect(() => {
    if (loading || !data.seo || typeof data.seo !== 'object') return;

    const seo = data.seo;

    // Helper to safely inject inline scripts
    const injectScript = (id: string, content: string) => {
      if (!document.getElementById(id)) {
        const script = document.createElement('script');
        script.id = id;
        script.innerHTML = content;
        document.head.appendChild(script);
      }
    };

    // Google Tag Manager
    if (seo.gtm_id && !document.getElementById('gtm-script')) {
      injectScript('gtm-script', `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${seo.gtm_id}');
      `);
      if (!document.getElementById('gtm-noscript')) {
        const noscript = document.createElement('noscript');
        noscript.id = 'gtm-noscript';
        noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${seo.gtm_id}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
        document.body.insertBefore(noscript, document.body.firstChild);
      }
    }

    // Google Analytics
    if (seo.ga_id && !document.getElementById('ga-script')) {
      const gaScript = document.createElement('script');
      gaScript.id = 'ga-script-ext';
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${seo.ga_id}`;
      document.head.appendChild(gaScript);

      injectScript('ga-script', `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${seo.ga_id}');
      `);
    }

    // Meta Pixel
    if (seo.meta_pixel && !document.getElementById('meta-pixel-script')) {
      injectScript('meta-pixel-script', `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${seo.meta_pixel}');
        fbq('track', 'PageView');
      `);
    }

    // Search Console
    if (seo.search_console && !document.querySelector('meta[name="google-site-verification"]')) {
      const meta = document.createElement('meta');
      meta.name = 'google-site-verification';
      meta.content = seo.search_console;
      document.head.appendChild(meta);
    }

    // Custom Head Scripts
    if (seo.custom_head_scripts && !document.getElementById('seo-custom-script-container')) {
      const container = document.createElement('meta');
      container.id = 'seo-custom-script-container';
      document.head.appendChild(container);
      try {
        const range = document.createRange();
        range.selectNode(document.head);
        const fragment = range.createContextualFragment(seo.custom_head_scripts);
        document.head.appendChild(fragment);
      } catch (e) {
        console.error('Error injecting custom head scripts:', e);
      }
    }
  }, [loading, data.seo]);

  return (
    <ApiContext.Provider value={{ ...data, loading, refetch: fetchData }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) throw new Error('useApi must be used within ApiProvider');
  return context;
};