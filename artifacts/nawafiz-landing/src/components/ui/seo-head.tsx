import { useEffect } from 'react';

interface HelmetProps {
  title?: string;
  defaultTitle?: string;
  titleTemplate?: string;
  meta?: Array<{ name?: string; property?: string; content: string }>;
  link?: Array<{ rel: string; href: string }>;
  script?: Array<{ type: string; children: string }>;
}

/**
 * A lightweight, React 19-compatible replacement for react-helmet-async.
 * Directly manipulates the document head without relying on legacy React context APIs.
 */
export function SEOHead({
  title,
  defaultTitle,
  titleTemplate,
  meta = [],
  link = [],
  script = [],
}: HelmetProps) {
  useEffect(() => {
    // --- Title ---
    const prevTitle = document.title;
    if (title) {
      document.title = titleTemplate ? titleTemplate.replace('%s', title) : title;
    } else if (defaultTitle) {
      document.title = defaultTitle;
    }

    // --- Meta tags ---
    const addedMeta: HTMLMetaElement[] = [];
    meta.forEach(({ name, property, content }) => {
      if (!content) return;
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (el) {
        el.setAttribute('content', content);
      } else {
        el = document.createElement('meta');
        if (name) el.setAttribute('name', name);
        if (property) el.setAttribute('property', property);
        el.setAttribute('content', content);
        document.head.appendChild(el);
        addedMeta.push(el);
      }
    });

    // --- Link tags ---
    const addedLinks: HTMLLinkElement[] = [];
    link.forEach(({ rel, href }) => {
      if (!href) return;
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (el) {
        el.setAttribute('href', href);
      } else {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        el.setAttribute('href', href);
        document.head.appendChild(el);
        addedLinks.push(el);
      }
    });

    // --- Script tags (JSON-LD) ---
    const addedScripts: HTMLScriptElement[] = [];
    script.forEach(({ type, children }) => {
      if (!children) return;
      const el = document.createElement('script');
      el.type = type;
      el.textContent = children;
      el.setAttribute('data-seo', 'true');
      document.head.appendChild(el);
      addedScripts.push(el);
    });

    // Cleanup on unmount or re-render
    return () => {
      document.title = prevTitle;
      addedMeta.forEach((el) => el.remove());
      addedLinks.forEach((el) => el.remove());
      addedScripts.forEach((el) => el.remove());
    };
  }, [title, defaultTitle, titleTemplate, JSON.stringify(meta), JSON.stringify(link), JSON.stringify(script)]);

  return null;
}
