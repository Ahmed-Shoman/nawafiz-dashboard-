import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useApi, API_BASE_URL } from "@/contexts/ApiContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { FadeIn } from "@/components/ui/fade-in";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import { SEOHead } from "@/components/ui/seo-head";
import { getServiceBySlug, SERVICES } from "@/lib/servicesData";

interface Props {
  params: { slug: string };
}

export default function ServiceDetailPage({ params }: Props) {
  const { lang, dir } = useLanguage();
  const { services, settings } = useApi();

  // Try API service first
  const apiService = services?.find((s: any) => s.slug === params.slug);

  // Fetch individual service if not in list
  const [fetchedService, setFetchedService] = useState<any>(null);

  useEffect(() => {
    if (!apiService) {
      fetch(`${API_BASE_URL}/api/services/${params.slug}?t=${Date.now()}`)
        .then(res => res.ok ? res.json() : null)
        .then(data => setFetchedService(data))
        .catch(() => {});
    }
  }, [params.slug, apiService]);

  const dynamicService = apiService || fetchedService;

  // Pull WhatsApp from settings
  const getSetting = (key: string, fallback: string) => {
    if (Array.isArray(settings)) {
      const found = settings.find((s: any) => s.key === key);
      return found?.value || fallback;
    }
    if (settings && typeof settings === 'object' && settings[key]) {
      return settings[key];
    }
    return fallback;
  };
  const whatsappNumber = getSetting('whatsapp', '966537502035');

  // If we have API data, use it
  if (dynamicService) {
    const titleAr = dynamicService.title_ar;
    const titleEn = dynamicService.title_en;
    const shortDescAr = dynamicService.short_desc_ar;
    const shortDescEn = dynamicService.short_desc_en;
    const longDescAr = dynamicService.long_desc_ar;
    const longDescEn = dynamicService.long_desc_en;
    const featuresAr = dynamicService.features_ar || [];
    const featuresEn = dynamicService.features_en || [];
    const image = dynamicService.image || `${import.meta.env.BASE_URL}images/hero-3.png`;
    const icon = dynamicService.icon || "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z";

    const fixImg = (url: string) =>
      url ? (url.startsWith('http') ? url : `${API_BASE_URL}${url}`) : `${import.meta.env.BASE_URL}images/hero-3.png`;

    const titleStr = lang === "ar" ? titleAr : titleEn;
    const descStr = lang === "ar" ? shortDescAr : shortDescEn;
    const resolvedImage = fixImg(image);

    const otherServices = services?.filter((s: any) => s.slug !== dynamicService.slug).slice(0, 3) || [];

    return (
      <div className="min-h-screen bg-background">
        <SEOHead
          title={dynamicService.meta_title || titleStr}
          meta={[
            { name: 'description', content: dynamicService.meta_description || descStr },
            ...(dynamicService.keywords ? [{ name: 'keywords', content: dynamicService.keywords }] : []),
            { property: 'og:title', content: dynamicService.og_title || dynamicService.meta_title || titleStr },
            { property: 'og:description', content: dynamicService.og_description || dynamicService.meta_description || descStr },
            { property: 'og:image', content: resolvedImage },
            { property: 'og:type', content: 'article' },
            ...(dynamicService.tags ? [{ property: 'article:tag', content: dynamicService.tags }] : []),
          ]}
          link={[
            { rel: 'canonical', href: dynamicService.canonical_url || window?.location?.href },
          ]}
          script={dynamicService.schema_markup ? [{ type: 'application/ld+json', children: dynamicService.schema_markup }] : []}
        />

        <Navbar />

        {/* Hero Image */}
        <div className="relative h-[70vh] min-h-[480px] overflow-hidden">
          <img
            src={resolvedImage}
            alt={lang === "ar" ? titleAr : titleEn}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d2233] via-[#0d2233]/55 to-[#0d2233]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d2233]/70 to-transparent" />

          {/* Breadcrumb */}
          <div className="absolute top-28 start-0 end-0 container mx-auto px-4 md:px-6">
            <nav className="flex items-center gap-2 text-white/60 text-sm">
              <a href="/" className="hover:text-accent transition-colors">
                {lang === "ar" ? "الرئيسية" : "Home"}
              </a>
              {dir === "rtl" ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              <a href="/services" className="hover:text-accent transition-colors">
                {lang === "ar" ? "الخدمات" : "Services"}
              </a>
              {dir === "rtl" ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              <span className="text-accent font-semibold">
                {lang === "ar" ? titleAr : titleEn}
              </span>
            </nav>
          </div>

          {/* Hero Content */}
          <div className="absolute bottom-0 start-0 end-0 container mx-auto px-4 md:px-6 pb-14">
            <FadeIn>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center shadow-xl flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-accent-foreground">
                    <path d={icon} />
                  </svg>
                </div>
                <span className="text-accent font-bold tracking-[0.18em] text-xs uppercase">
                  {lang === "ar" ? "نوافذ المستقبل للتطوير العقاري" : "Nawafiz Al-Mustaqbal Real Estate"}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 max-w-3xl">
                {lang === "ar" ? titleAr : titleEn}
              </h1>
              <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
                {lang === "ar" ? shortDescAr : shortDescEn}
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Content */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">

              {/* Main Content */}
              <div className="lg:col-span-2">
                <FadeIn>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                    {lang === "ar" ? "نبذة عن الخدمة" : "About This Service"}
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                    {lang === "ar" ? longDescAr : longDescEn}
                  </p>
                </FadeIn>

                {/* Features Grid */}
                {(lang === "ar" ? featuresAr : featuresEn).length > 0 && (
                  <FadeIn delay={0.1}>
                    <h3 className="text-xl font-bold text-foreground mb-6">
                      {lang === "ar" ? "ما يشمله هذا الخدمة" : "What This Service Includes"}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {(lang === "ar" ? featuresAr : featuresEn).map((feature: string, i: number) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: dir === "rtl" ? 20 : -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: i * 0.06 }}
                          className="flex items-start gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/10"
                        >
                          <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                          <span className="text-foreground font-medium text-sm">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </FadeIn>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* CTA Card */}
                <FadeIn direction="left" delay={0.15}>
                  <div className="bg-primary rounded-3xl p-8 text-center">
                    <h3 className="text-xl font-bold text-primary-foreground mb-3">
                      {lang === "ar" ? "هل أنت مهتم بهذه الخدمة؟" : "Interested in This Service?"}
                    </h3>
                    <p className="text-primary-foreground/70 text-sm mb-6">
                      {lang === "ar"
                        ? "تواصل مع فريقنا الآن للحصول على استشارة مجانية"
                        : "Contact our team now for a free consultation"}
                    </p>
                    <a href="/contact" className="block w-full px-6 py-3.5 bg-accent text-accent-foreground font-bold rounded-xl hover:bg-accent/90 transition-colors shadow-lg text-center">
                      {lang === "ar" ? "تواصل معنا" : "Contact Us"}
                    </a>
                    <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer"
                      className="block w-full mt-3 px-6 py-3.5 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#22c55e] transition-colors text-center">
                      {lang === "ar" ? "واتساب" : "WhatsApp"}
                    </a>
                  </div>
                </FadeIn>

                {/* Other Services */}
                {otherServices.length > 0 && (
                  <FadeIn direction="left" delay={0.2}>
                    <div className="bg-card border border-border rounded-3xl p-6">
                      <h3 className="font-bold text-foreground mb-4 text-lg">
                        {lang === "ar" ? "خدمات أخرى" : "Other Services"}
                      </h3>
                      <ul className="space-y-3">
                        {otherServices.map((s: any) => (
                          <li key={s.slug}>
                            <a href={`/services/${s.slug}`} className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group">
                              {dir === "rtl" ? (
                                <ChevronLeft className="w-4 h-4 text-accent group-hover:-translate-x-1 transition-transform shrink-0" />
                              ) : (
                                <ChevronRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform shrink-0" />
                              )}
                              <span className="text-sm font-medium">
                                {lang === "ar" ? s.title_ar : s.title_en}
                              </span>
                            </a>
                          </li>
                        ))}
                        <li>
                          <a href="/services" className="flex items-center gap-2 text-primary font-semibold text-sm hover:text-accent transition-colors mt-2">
                            {lang === "ar" ? "عرض كل الخدمات" : "View All Services"}
                            {dir === "rtl" ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </FadeIn>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Related Services */}
        {otherServices.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
              <FadeIn>
                <h2 className="text-2xl font-bold text-foreground mb-8">
                  {lang === "ar" ? "خدمات ذات صلة" : "Related Services"}
                </h2>
              </FadeIn>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {otherServices.map((s: any, idx: number) => (
                  <motion.a
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: idx * 0.08 }}
                    className="group block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={fixImg(s.image)}
                        alt={lang === "ar" ? s.title_ar : s.title_en}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d2233]/70 to-transparent" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                        {lang === "ar" ? s.title_ar : s.title_en}
                      </h3>
                      <p className="text-muted-foreground text-xs mt-1.5 line-clamp-2">
                        {lang === "ar" ? s.short_desc_ar : s.short_desc_en}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </section>
        )}

        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  // Fallback to static service data
  const service = getServiceBySlug(params.slug);

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            {lang === "ar" ? "الخدمة غير موجودة" : "Service Not Found"}
          </h1>
          <a href="/services" className="text-primary hover:text-accent font-semibold">
            {lang === "ar" ? "العودة إلى الخدمات" : "Back to Services"}
          </a>
        </div>
      </div>
    );
  }

  const otherServices = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Image */}
      <div className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <img src={service.image} alt={lang === "ar" ? service.titleAr : service.titleEn} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d2233] via-[#0d2233]/55 to-[#0d2233]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2233]/70 to-transparent" />

        <div className="absolute top-28 start-0 end-0 container mx-auto px-4 md:px-6">
          <nav className="flex items-center gap-2 text-white/60 text-sm">
            <a href="/" className="hover:text-accent transition-colors">{lang === "ar" ? "الرئيسية" : "Home"}</a>
            {dir === "rtl" ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            <a href="/services" className="hover:text-accent transition-colors">{lang === "ar" ? "الخدمات" : "Services"}</a>
            {dir === "rtl" ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            <span className="text-accent font-semibold">{lang === "ar" ? service.titleAr : service.titleEn}</span>
          </nav>
        </div>

        <div className="absolute bottom-0 start-0 end-0 container mx-auto px-4 md:px-6 pb-14">
          <FadeIn>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center shadow-xl flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-accent-foreground">
                  <path d={service.icon} />
                </svg>
              </div>
              <span className="text-accent font-bold tracking-[0.18em] text-xs uppercase">
                {lang === "ar" ? "نوافذ المستقبل للتطوير العقاري" : "Nawafiz Al-Mustaqbal Real Estate"}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 max-w-3xl">
              {lang === "ar" ? service.titleAr : service.titleEn}
            </h1>
            <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
              {lang === "ar" ? service.shortDescAr : service.shortDescEn}
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
            <div className="lg:col-span-2">
              <FadeIn>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  {lang === "ar" ? "نبذة عن الخدمة" : "About This Service"}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                  {lang === "ar" ? service.longDescAr : service.longDescEn}
                </p>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h3 className="text-xl font-bold text-foreground mb-6">
                  {lang === "ar" ? "ما يشمله هذا الخدمة" : "What This Service Includes"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(lang === "ar" ? service.featuresAr : service.featuresEn).map((feature, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: dir === "rtl" ? 20 : -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                      className="flex items-start gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-foreground font-medium text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </FadeIn>
            </div>

            <div className="space-y-6">
              <FadeIn direction="left" delay={0.15}>
                <div className="bg-primary rounded-3xl p-8 text-center">
                  <h3 className="text-xl font-bold text-primary-foreground mb-3">
                    {lang === "ar" ? "هل أنت مهتم بهذه الخدمة؟" : "Interested in This Service?"}
                  </h3>
                  <p className="text-primary-foreground/70 text-sm mb-6">
                    {lang === "ar" ? "تواصل مع فريقنا الآن للحصول على استشارة مجانية" : "Contact our team now for a free consultation"}
                  </p>
                  <a href="/contact" className="block w-full px-6 py-3.5 bg-accent text-accent-foreground font-bold rounded-xl hover:bg-accent/90 transition-colors shadow-lg text-center">
                    {lang === "ar" ? "تواصل معنا" : "Contact Us"}
                  </a>
                  <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer"
                    className="block w-full mt-3 px-6 py-3.5 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#22c55e] transition-colors text-center">
                    {lang === "ar" ? "واتساب" : "WhatsApp"}
                  </a>
                </div>
              </FadeIn>

              <FadeIn direction="left" delay={0.2}>
                <div className="bg-card border border-border rounded-3xl p-6">
                  <h3 className="font-bold text-foreground mb-4 text-lg">
                    {lang === "ar" ? "خدمات أخرى" : "Other Services"}
                  </h3>
                  <ul className="space-y-3">
                    {otherServices.map((s) => (
                      <li key={s.slug}>
                        <a href={`/services/${s.slug}`} className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group">
                          {dir === "rtl" ? <ChevronLeft className="w-4 h-4 text-accent group-hover:-translate-x-1 transition-transform shrink-0" /> : <ChevronRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform shrink-0" />}
                          <span className="text-sm font-medium">{lang === "ar" ? s.titleAr : s.titleEn}</span>
                        </a>
                      </li>
                    ))}
                    <li>
                      <a href="/services" className="flex items-center gap-2 text-primary font-semibold text-sm hover:text-accent transition-colors mt-2">
                        {lang === "ar" ? "عرض كل الخدمات" : "View All Services"}
                        {dir === "rtl" ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                      </a>
                    </li>
                  </ul>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn>
            <h2 className="text-2xl font-bold text-foreground mb-8">
              {lang === "ar" ? "خدمات ذات صلة" : "Related Services"}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherServices.map((s, idx) => (
              <motion.a key={s.slug} href={`/services/${s.slug}`} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="group block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-40 overflow-hidden">
                  <img src={s.image} alt={lang === "ar" ? s.titleAr : s.titleEn} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d2233]/70 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{lang === "ar" ? s.titleAr : s.titleEn}</h3>
                  <p className="text-muted-foreground text-xs mt-1.5 line-clamp-2">{lang === "ar" ? s.shortDescAr : s.shortDescEn}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
