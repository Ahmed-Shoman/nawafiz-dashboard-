import { useLanguage } from "@/contexts/LanguageContext";
import { useApi, API_BASE_URL } from "@/contexts/ApiContext";
import { FadeIn } from "@/components/ui/fade-in";
import { Building, Target, Compass } from "lucide-react";

export function About() {
  const { t, lang } = useLanguage();
  const { sections } = useApi();

  const aboutSection = sections?.find((s) => s.key === 'about')?.content;

  const title = lang === 'ar' ? (aboutSection?.title_ar || t("about.title")) : (aboutSection?.title_en || t("about.title"));
  const badge = lang === 'ar' ? (aboutSection?.badge_ar || t("about.badge")) : (aboutSection?.badge_en || t("about.badge"));
  const desc1 = lang === 'ar' ? (aboutSection?.desc1_ar || t("about.description1")) : (aboutSection?.desc1_en || t("about.description1"));
  const desc2 = lang === 'ar' ? (aboutSection?.desc2_ar || t("about.description2")) : (aboutSection?.desc2_en || t("about.description2"));
  
  const visionTitle = lang === 'ar' ? (aboutSection?.vision_title_ar || t("about.vision.title")) : (aboutSection?.vision_title_en || t("about.vision.title"));
  const visionDesc = lang === 'ar' ? (aboutSection?.vision_desc_ar || t("about.vision.desc")) : (aboutSection?.vision_desc_en || t("about.vision.desc"));
  
  const missionTitle = lang === 'ar' ? (aboutSection?.mission_title_ar || t("about.mission.title")) : (aboutSection?.mission_title_en || t("about.mission.title"));
  const missionDesc = lang === 'ar' ? (aboutSection?.mission_desc_ar || t("about.mission.desc")) : (aboutSection?.mission_desc_en || t("about.mission.desc"));

  const rawImage = aboutSection?.image;
  const image = rawImage
    ? (rawImage.startsWith('http') ? rawImage : `${API_BASE_URL}${rawImage}`)
    : `${import.meta.env.BASE_URL}images/about-bg.png`;

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <FadeIn direction="right">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={image}
                alt={title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
              
              <div className="absolute bottom-8 start-8 end-8 bg-background/90 backdrop-blur-md p-6 rounded-xl border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <Building className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-foreground">{title}</h4>
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
                {badge}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                {title}
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {desc1}
              </p>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                {desc2}
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <FadeIn delay={0.4}>
                <div className="p-6 rounded-2xl bg-secondary/50 border border-secondary hover:border-accent/50 transition-colors">
                  <Target className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-3">{visionTitle}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {visionDesc}
                  </p>
                </div>
              </FadeIn>
              
              <FadeIn delay={0.6}>
                <div className="p-6 rounded-2xl bg-primary text-primary-foreground shadow-xl shadow-primary/20">
                  <Compass className="w-10 h-10 text-accent mb-4" />
                  <h3 className="text-xl font-bold mb-3">{missionTitle}</h3>
                  <p className="text-primary-foreground/80 leading-relaxed">
                    {missionDesc}
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
