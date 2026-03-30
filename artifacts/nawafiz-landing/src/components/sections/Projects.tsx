import { useLanguage } from "@/contexts/LanguageContext";
import { FadeIn } from "@/components/ui/fade-in";
import { ExternalLink } from "lucide-react";

export function Projects() {
  const { t } = useLanguage();

  const projects = [
    { title: t("projects.1.title"), desc: t("projects.1.desc"), img: `${import.meta.env.BASE_URL}images/hero-2.png` },
    { title: t("projects.2.title"), desc: t("projects.2.desc"), img: `${import.meta.env.BASE_URL}images/hero-1.png` },
    { title: t("projects.3.title"), desc: t("projects.3.desc"), img: `${import.meta.env.BASE_URL}images/hero-3.png` },
    { title: t("projects.4.title"), desc: t("projects.4.desc"), img: `${import.meta.env.BASE_URL}images/hero-4.png` },
    { title: t("projects.5.title"), desc: t("projects.5.desc"), img: `${import.meta.env.BASE_URL}images/about-bg.png` },
    { title: t("projects.6.title"), desc: t("projects.6.desc"), img: `${import.meta.env.BASE_URL}images/hero-2.png` },
  ];

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <FadeIn direction="right">
            <span className="text-accent font-bold tracking-wider uppercase text-sm mb-2 block">
              {t("projects.badge")}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              {t("projects.title")}
            </h2>
          </FadeIn>
          <FadeIn direction="left">
            <a href="#contact" className="px-6 py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors inline-block">
              {t("projects.view_all")}
            </a>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <FadeIn key={idx} delay={idx * 0.1} className="group relative h-80 rounded-3xl overflow-hidden shadow-lg">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${project.img})` }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-4 line-clamp-2">
                  {project.desc}
                </p>
                
                <a href="#contact" className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
