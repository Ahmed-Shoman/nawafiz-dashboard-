import { useLanguage } from "@/contexts/LanguageContext";
import { useApi, API_BASE_URL } from "@/contexts/ApiContext";
import { FadeIn } from "@/components/ui/fade-in";
import { Link } from "wouter";
import { blogsData } from "@/lib/blogsData";
import { Calendar, ArrowRight, ArrowLeft } from "lucide-react";

export function Blogs() {
  const { t, dir, lang } = useLanguage();
  const { blogs, sections } = useApi();

  const blogsSection = sections?.find((s) => s.key === 'blogs')?.content;
  const badge = lang === 'ar' ? (blogsSection?.badge_ar || t("blogs.badge" as any) || "Our Blog") : (blogsSection?.badge_en || t("blogs.badge" as any) || "Our Blog");
  const title = lang === 'ar' ? (blogsSection?.title_ar || t("blogs.title" as any) || "Latest Insights & News") : (blogsSection?.title_en || t("blogs.title" as any) || "Latest Insights & News");

  const fixImg = (url: string) =>
    url ? (url.startsWith('http') ? url : `${API_BASE_URL}${url}`) : `${import.meta.env.BASE_URL}images/about-bg.png`;

  const displayedBlogs = blogs?.length > 0 ? blogs.map((b: any) => ({
    id: b.id,
    slug: b.slug,
    title: lang === 'ar' ? b.title_ar : b.title_en,
    excerpt: lang === 'ar' ? b.excerpt_ar : b.excerpt_en,
    image: fixImg(b.image),
    date: b.publish_date || b.created_at
  })) : blogsData.map(b => ({
    id: b.id,
    slug: b.slug,
    title: t(b.titleKey as any),
    excerpt: t(b.excerptKey as any),
    image: b.img,
    date: b.date
  }));

  return (
    <section id="blogs" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <FadeIn direction="right">
            <span className="text-accent font-bold tracking-wider uppercase text-sm mb-2 block">
              {badge}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              {title}
            </h2>
          </FadeIn>
          <FadeIn direction="left">
            <Link href="/blogs" className="px-6 py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors inline-block">
              {t("blogs.view_all" as any) || "View All Articles"}
            </Link>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedBlogs.slice(0, 3).map((blog: any, idx: number) => (
            <FadeIn key={blog.id} delay={idx * 0.1} className="group flex flex-col bg-card rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-border/50 transition-all duration-300 hover:-translate-y-1">
              <Link href={`/blogs/${blog.slug}`} className="block relative h-60 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-muted-foreground mb-4 text-sm font-medium">
                  <Calendar className="w-4 h-4 text-accent" />
                  <span>{new Date(blog.date).toLocaleDateString(dir === 'rtl' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                
                <Link href={`/blogs/${blog.slug}`} className="block block group-hover:text-primary transition-colors">
                  <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2">
                    {blog.title}
                  </h3>
                </Link>
                
                <p className="text-muted-foreground line-clamp-3 mb-6 flex-grow text-sm leading-relaxed">
                  {blog.excerpt}
                </p>
                
                <Link href={`/blogs/${blog.slug}`} className="flex items-center gap-2 text-primary font-bold mt-auto group-hover:text-accent transition-colors">
                  {t("blogs.read_more" as any) || "Read More"}
                  {dir === "rtl" ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
