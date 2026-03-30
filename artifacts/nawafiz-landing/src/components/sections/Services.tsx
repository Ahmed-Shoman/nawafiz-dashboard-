import { useLanguage } from "@/contexts/LanguageContext";
import { FadeIn } from "@/components/ui/fade-in";
import { Building2, House, Wrench, ClipboardList, ArrowRight, ArrowLeft } from "lucide-react";

export function Services() {
  const { t, dir } = useLanguage();

  const services = [
    {
      icon: Building2,
      title: t("services.1.title"),
      desc: t("services.1.desc"),
    },
    {
      icon: House,
      title: t("services.2.title"),
      desc: t("services.2.desc"),
    },
    {
      icon: Wrench,
      title: t("services.3.title"),
      desc: t("services.3.desc"),
    },
    {
      icon: ClipboardList,
      title: t("services.4.title"),
      desc: t("services.4.desc"),
    }
  ];

  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-bold tracking-wider uppercase text-sm mb-2 block">
            {t("services.badge")}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            {t("services.title")}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <div className="group h-full p-8 rounded-3xl bg-card border border-border hover:border-primary/30 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                {/* Decorative background circle that scales on hover */}
                <div className="absolute -end-8 -top-8 w-32 h-32 bg-primary/5 rounded-full transition-transform duration-500 group-hover:scale-[2.5]" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <service.icon className="w-7 h-7" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-8 flex-grow">
                    {service.desc}
                  </p>
                  
                  <a href="#contact" className="inline-flex items-center gap-2 text-primary font-semibold group-hover:text-accent transition-colors mt-auto">
                    {t("services.learn_more")}
                    {dir === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
