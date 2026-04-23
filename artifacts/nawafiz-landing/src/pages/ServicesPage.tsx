import { useLanguage } from "@/contexts/LanguageContext";
import { useApi, API_BASE_URL } from "@/contexts/ApiContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { FadeIn } from "@/components/ui/fade-in";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { SERVICES } from "@/lib/servicesData";

export default function ServicesPage() {
  const { lang, dir } = useLanguage();
  const { services } = useApi();

  const fixImg = (url: string) =>
    url ? (url.startsWith('http') ? url : `${API_BASE_URL}${url}`) : `${import.meta.env.BASE_URL}images/hero-3.png`;

  // Use API services if available, mapped to the shape the template expects
  const displayedServices = services?.length > 0 ? services.map((s: any) => ({
    slug: s.slug,
    titleAr: s.title_ar,
    titleEn: s.title_en,
    shortDescAr: s.short_desc_ar,
    shortDescEn: s.short_desc_en,
    image: fixImg(s.image),
    icon: s.icon || "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
  })) : SERVICES;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative pt-32 pb-20 bg-[#0d2233] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url(/images/hero-3.png)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d2233]/80 to-[#0d2233]" />
        <div className="relative container mx-auto px-4 md:px-6 text-center">
          <FadeIn>
            <span className="inline-block text-accent font-bold tracking-[0.2em] text-xs uppercase mb-4">
              {lang === "ar" ? "نوافذ المستقبل للتطوير العقاري" : "Nawafiz Al-Mustaqbal Real Estate"}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {lang === "ar" ? "خدماتنا" : "Our Services"}
            </h1>
            <p className="text-white/65 text-lg max-w-2xl mx-auto leading-relaxed">
              {lang === "ar"
                ? "نقدم مجموعة متكاملة من الخدمات العقارية والإنشائية لتلبية جميع احتياجاتكم بأعلى معايير الجودة"
                : "We offer a comprehensive range of real estate and construction services to meet all your needs at the highest quality standards"}
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedServices.map((service: any, idx: number) => (
              <motion.a
                key={service.slug}
                href={`/services/${service.slug}`}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
                className="group block bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-400"
              >
                {/* Card Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={service.image}
                    alt={lang === "ar" ? service.titleAr : service.titleEn}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d2233]/80 via-[#0d2233]/30 to-transparent" />
                  {/* Icon Badge */}
                  <div className="absolute bottom-4 start-4 w-12 h-12 rounded-2xl bg-accent flex items-center justify-center shadow-lg">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6 text-accent-foreground"
                    >
                      <path d={service.icon} />
                    </svg>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {lang === "ar" ? service.titleAr : service.titleEn}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-3">
                    {lang === "ar" ? service.shortDescAr : service.shortDescEn}
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:text-accent transition-colors">
                    {lang === "ar" ? "اعرف المزيد" : "Learn More"}
                    {dir === "rtl" ? (
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    ) : (
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    )}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-5">
              {lang === "ar" ? "هل أنت مستعد لبدء مشروعك؟" : "Ready to Start Your Project?"}
            </h2>
            <p className="text-primary-foreground/70 mb-10 max-w-xl mx-auto text-lg">
              {lang === "ar"
                ? "تواصل معنا الآن وسيكون فريقنا سعيداً بمساعدتك في تحقيق رؤيتك"
                : "Contact us now and our team will be happy to help you achieve your vision"}
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 px-10 py-4 bg-accent text-accent-foreground font-bold rounded-xl hover:bg-accent/90 transition-colors shadow-xl"
            >
              {lang === "ar" ? "تواصل معنا" : "Contact Us"}
              {dir === "rtl" ? (
                <ArrowLeft className="w-5 h-5" />
              ) : (
                <ArrowRight className="w-5 h-5" />
              )}
            </a>
          </FadeIn>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
