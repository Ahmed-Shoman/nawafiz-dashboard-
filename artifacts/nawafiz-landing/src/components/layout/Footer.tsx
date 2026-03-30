import { useLanguage } from "@/contexts/LanguageContext";
import { Twitter, Instagram, Linkedin, Facebook } from "lucide-react";

export function Footer() {
  const { t, lang } = useLanguage();

  const navLinks = [
    { key: "nav.home", href: "#hero" },
    { key: "nav.about", href: "#about" },
    { key: "nav.services", href: "#services" },
    { key: "nav.projects", href: "#projects" },
    { key: "nav.contact", href: "#contact" },
  ] as const;

  return (
    <footer className="bg-foreground text-background pt-20 pb-10 border-t-4 border-accent">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="lg:col-span-2">
            <div className="flex flex-col group mb-6 inline-flex">
              <span className="text-3xl font-bold tracking-tight text-white">
                {lang === "ar" ? "نوافذ المستقبل" : "Nawafiz"}
              </span>
              <span className="text-sm font-medium tracking-widest uppercase text-accent">
                {lang === "ar" ? "للتطوير العقاري" : "Real Estate Dev"}
              </span>
            </div>
            <p className="text-muted-foreground/80 max-w-sm mb-8 leading-relaxed">
              {t("footer.desc")}
            </p>
            <div className="flex gap-4">
              {[Twitter, Instagram, Linkedin, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-accent hover:text-foreground transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6">{t("footer.links")}</h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <a href={link.href} className="text-muted-foreground/80 hover:text-accent transition-colors">
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6">{t("footer.contact")}</h4>
            <ul className="space-y-4 text-muted-foreground/80">
              <li>{t("contact.info.address")}</li>
              <li dir="ltr" className="text-start">{t("contact.info.phone")}</li>
              <li>{t("contact.info.email")}</li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 text-center text-muted-foreground/60 text-sm">
          <p>{t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
}
