import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useApi, API_BASE_URL } from "@/contexts/ApiContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { FadeIn } from "@/components/ui/fade-in";
import { ChevronRight, ChevronLeft, Calendar } from "lucide-react";
import { SEOHead } from "@/components/ui/seo-head";
import { blogsData } from "@/lib/blogsData";

interface Props {
  params: { slug: string };
}

export default function BlogDetailPage({ params }: Props) {
  const { t, lang, dir } = useLanguage();
  const { blogs } = useApi();

  // Try to find blog from API first, then fallback to static data
  const apiBlog = blogs?.find((b: any) => b.slug === params.slug);
  const staticBlog = blogsData.find((b) => b.slug === params.slug);

  // For API blog that needs individual fetch (if not in the list)
  const [fetchedBlog, setFetchedBlog] = useState<any>(null);

  useEffect(() => {
    if (!apiBlog && !staticBlog) {
      // Try fetching individual blog from API
      fetch(`${API_BASE_URL}/api/blogs/${params.slug}?t=${Date.now()}`)
        .then(res => res.ok ? res.json() : null)
        .then(data => setFetchedBlog(data))
        .catch(() => {});
    }
  }, [params.slug, apiBlog, staticBlog]);

  const blog = apiBlog || fetchedBlog;

  // If we have an API blog, use it
  if (blog) {
    const blogTitle = lang === 'ar' ? blog.title_ar : blog.title_en;
    const blogExcerpt = lang === 'ar' ? blog.excerpt_ar : blog.excerpt_en;
    const blogContent = lang === 'ar' ? blog.content_ar : blog.content_en;
    const fixImg = (url: string) =>
      url ? (url.startsWith('http') ? url : `${API_BASE_URL}${url}`) : `${import.meta.env.BASE_URL}images/about-bg.png`;

    const blogImage = fixImg(blog.image);
    const blogDate = blog.publish_date || blog.created_at;

    const recentBlogs = blogs?.filter((b: any) => b.id !== blog.id).slice(0, 3) || [];

    return (
      <div className="min-h-screen bg-background">
        <SEOHead
          title={blog.meta_title || blogTitle}
          meta={[
            { name: 'description', content: blog.meta_description || blogExcerpt },
            ...(blog.keywords ? [{ name: 'keywords', content: blog.keywords }] : []),
            { property: 'og:title', content: blog.og_title || blog.meta_title || blogTitle },
            { property: 'og:description', content: blog.og_description || blog.meta_description || blogExcerpt },
            { property: 'og:image', content: blogImage },
            { property: 'og:type', content: 'article' },
            ...(blogDate ? [{ property: 'article:published_time', content: blogDate }] : []),
            ...(blog.updated_at ? [{ property: 'article:modified_time', content: blog.updated_at }] : []),
            ...(blog.tags ? [{ property: 'article:tag', content: blog.tags }] : []),
          ]}
          link={[
            { rel: 'canonical', href: blog.canonical_url || window?.location?.href },
          ]}
          script={blog.schema_markup ? [{ type: 'application/ld+json', children: blog.schema_markup }] : []}
        />
        
        <Navbar />

        {/* Hero Header */}
        <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
          <img
            src={blogImage}
            alt={blog.img_alt || blogTitle}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d2233] via-[#0d2233]/60 to-[#0d2233]/30" />

          {/* Breadcrumb */}
          <div className="absolute top-28 start-0 end-0 container mx-auto px-4 md:px-6">
            <nav className="flex items-center gap-2 text-white/60 text-sm">
              <a href="/" className="hover:text-accent transition-colors">
                {t("nav.home" as any) || "Home"}
              </a>
              {dir === "rtl" ? (
                <ChevronLeft className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
              <span className="text-accent font-semibold truncate max-w-[200px] md:max-w-none">
                {blogTitle}
              </span>
            </nav>
          </div>

          {/* Hero Content */}
          <div className="absolute bottom-0 start-0 end-0 container mx-auto px-4 md:px-6 pb-16">
            <FadeIn>
              <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full mb-4">
                {t("blogs.badge" as any) || "Our Blog"}
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl leading-tight">
                {blogTitle}
              </h1>
              <div className="flex items-center gap-4 text-white/70">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-accent" />
                  <span className="font-medium">
                    {new Date(blogDate).toLocaleDateString(dir === 'rtl' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Main Content Area */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Article Content */}
              <div className="lg:col-span-8">
                <FadeIn>
                  <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary hover:prose-a:text-accent prose-p:leading-loose">
                    <p className="text-xl md:text-2xl font-medium text-foreground mb-8 leading-relaxed">
                      {blogExcerpt}
                    </p>
                    
                    {blogContent ? (
                      <div dangerouslySetInnerHTML={{ __html: blogContent }} />
                    ) : (
                      <p className="mb-6">{blogExcerpt}</p>
                    )}
                  </div>
                </FadeIn>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-4 space-y-8">
                <FadeIn direction={dir === "rtl" ? "right" : "left"} delay={0.1}>
                  {/* Recent Articles */}
                  <div className="bg-card border border-border rounded-3xl p-6 sticky top-28">
                    <h3 className="text-xl font-bold text-foreground mb-6 pb-4 border-b border-border">
                      {lang === "ar" ? "مقالات أخيرة" : "Recent Articles"}
                    </h3>
                    <div className="space-y-6">
                      {recentBlogs.map((b: any) => (
                        <a key={b.id} href={`/blogs/${b.slug}`} className="flex gap-4 group">
                          <img 
                            src={fixImg(b.image)} 
                            alt={lang === 'ar' ? b.title_ar : b.title_en} 
                            className="w-20 h-20 rounded-xl object-cover"
                          />
                          <div>
                            <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
                              {lang === 'ar' ? b.title_ar : b.title_en}
                            </h4>
                            <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                              <Calendar className="w-3 h-3" />
                              {new Date(b.publish_date || b.created_at).toLocaleDateString(dir === 'rtl' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              </div>
              
            </div>
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  // Fallback to static blog data
  if (staticBlog) {
    const recentBlogs = blogsData.filter((b) => b.id !== staticBlog.id).slice(0, 3);

    return (
      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Hero Header */}
        <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
          <img
            src={staticBlog.img}
            alt={t(staticBlog.titleKey as any)}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d2233] via-[#0d2233]/60 to-[#0d2233]/30" />

          <div className="absolute top-28 start-0 end-0 container mx-auto px-4 md:px-6">
            <nav className="flex items-center gap-2 text-white/60 text-sm">
              <a href="/" className="hover:text-accent transition-colors">
                {t("nav.home" as any) || "Home"}
              </a>
              {dir === "rtl" ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              <span className="text-accent font-semibold truncate max-w-[200px] md:max-w-none">
                {t(staticBlog.titleKey as any)}
              </span>
            </nav>
          </div>

          <div className="absolute bottom-0 start-0 end-0 container mx-auto px-4 md:px-6 pb-16">
            <FadeIn>
              <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full mb-4">
                {t("blogs.badge" as any) || "Our Blog"}
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl leading-tight">
                {t(staticBlog.titleKey as any)}
              </h1>
              <div className="flex items-center gap-4 text-white/70">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-accent" />
                  <span className="font-medium">
                    {new Date(staticBlog.date).toLocaleDateString(dir === 'rtl' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8">
                <FadeIn>
                  <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary hover:prose-a:text-accent prose-p:leading-loose">
                    <p className="text-xl md:text-2xl font-medium text-foreground mb-8 leading-relaxed">
                      {t(staticBlog.excerptKey as any)}
                    </p>
                    {t(staticBlog.contentKey as any).split('\n').map((paragraph: string, i: number) => (
                      <p key={i} className="mb-6">{paragraph}</p>
                    ))}
                  </div>
                </FadeIn>
              </div>
              <div className="lg:col-span-4 space-y-8">
                <FadeIn direction={dir === "rtl" ? "right" : "left"} delay={0.1}>
                  <div className="bg-card border border-border rounded-3xl p-6 sticky top-28">
                    <h3 className="text-xl font-bold text-foreground mb-6 pb-4 border-b border-border">
                      {lang === "ar" ? "مقالات أخيرة" : "Recent Articles"}
                    </h3>
                    <div className="space-y-6">
                      {recentBlogs.map((b) => (
                        <a key={b.id} href={`/blogs/${b.slug}`} className="flex gap-4 group">
                          <img src={b.img} alt={t(b.titleKey as any)} className="w-20 h-20 rounded-xl object-cover" />
                          <div>
                            <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
                              {t(b.titleKey as any)}
                            </h4>
                            <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                              <Calendar className="w-3 h-3" />
                              {new Date(b.date).toLocaleDateString(dir === 'rtl' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  // Not found
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <Navbar />
      <div className="text-center mt-20 flex-grow flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          {lang === "ar" ? "المقال غير موجود" : "Blog Post Not Found"}
        </h1>
        <a href="/" className="text-primary hover:text-accent font-semibold">
          {t("blogs.back_home" as any) || "Back to Home"}
        </a>
      </div>
      <Footer />
    </div>
  );
}
