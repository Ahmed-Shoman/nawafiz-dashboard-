import { useLanguage } from "@/contexts/LanguageContext";
import { FadeIn } from "@/components/ui/fade-in";
import { Building, Target, Compass } from "lucide-react";

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <FadeIn direction="right">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={`${import.meta.env.BASE_URL}images/about-bg.png`}
                alt="About Nawafiz Al-Mustaqbal" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
              
              <div className="absolute bottom-8 start-8 end-8 bg-background/90 backdrop-blur-md p-6 rounded-xl border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <Building className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-foreground">{t("about.title")}</h4>
                    <p className="text-sm text-muted-foreground">{t("hero.subtitle").substring(0, 50)}...</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Text Side */}
          <div>
            <FadeIn delay={0.2}>
              <span className="text-accent font-bold tracking-wider uppercase text-sm mb-2 block">
                {t("about.badge")}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                {t("about.title")}
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {t("about.description1")}
              </p>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                {t("about.description2")}
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <FadeIn delay={0.4}>
                <div className="p-6 rounded-2xl bg-secondary/50 border border-secondary hover:border-accent/50 transition-colors">
                  <Target className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-3">{t("about.vision.title")}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("about.vision.desc")}
                  </p>
                </div>
              </FadeIn>
              
              <FadeIn delay={0.6}>
                <div className="p-6 rounded-2xl bg-primary text-primary-foreground shadow-xl shadow-primary/20">
                  <Compass className="w-10 h-10 text-accent mb-4" />
                  <h3 className="text-xl font-bold mb-3">{t("about.mission.title")}</h3>
                  <p className="text-primary-foreground/80 leading-relaxed">
                    {t("about.mission.desc")}
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
