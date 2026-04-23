import { useLanguage } from "@/contexts/LanguageContext";
import { useApi } from "@/contexts/ApiContext";
import { FadeIn } from "@/components/ui/fade-in";
import { Building2, Home, Wrench, ClipboardList, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export function Services() {
  const { t, dir, lang } = useLanguage();
  const { services, sections } = useApi();

  const servicesSection = sections?.find((s) => s.key === 'services')?.content;

  const defaultServices = [
    {
      icon: Building2,
      title: t("services.1.title"),
      desc: t("services.1.desc"),
      slug: "general-contracting",
    },
    {
      icon: Home,
      title: t("services.2.title"),
      desc: t("services.2.desc"),
      slug: "residential-projects",
    },
    {
      icon: Wrench,
      title: t("services.3.title"),
      desc: t("services.3.desc"),
      slug: "operations-facility-management",
    },
    {
      icon: ClipboardList,
      title: t("services.4.title"),
      desc: t("services.4.desc"),
      slug: "engineering-consulting",
    }
  ];

  const displayedServices = services?.length > 0 ? services : defaultServices;

  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-bold tracking-wider uppercase text-sm mb-2 block">
            {lang === 'ar' ? (servicesSection?.badge_ar || t("services.badge")) : (servicesSection?.badge_en || t("services.badge"))}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            {lang === 'ar' ? (servicesSection?.title_ar || t("services.title")) : (servicesSection?.title_en || t("services.title"))}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedServices.map((service: any, idx: number) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <div className="group h-full p-8 rounded-3xl bg-card border border-border hover:border-primary/30 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                {/* Decorative background circle that scales on hover */}
                <div className="absolute -end-8 -top-8 w-32 h-32 bg-primary/5 rounded-full transition-transform duration-500 group-hover:scale-[2.5]" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Building2 className="w-7 h-7" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {lang === 'ar' ? (service.title_ar || service.title) : (service.title_en || service.title)}
                  </h3>
                  
                  <p className="text-muted-foreground mb-8 flex-grow">
                    {lang === 'ar' ? (service.short_desc_ar || service.summary_ar || service.desc) : (service.short_desc_en || service.summary_en || service.desc)}
                  </p>
                  
                  <Link href={`/services/${service.slug}`} className="inline-flex items-center gap-2 text-primary font-semibold group-hover:text-accent transition-colors mt-auto">
                    {t("services.learn_more")}
                    {dir === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </Link>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
