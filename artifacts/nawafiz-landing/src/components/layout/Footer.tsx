import { useLanguage } from "@/contexts/LanguageContext";
import { Twitter, Linkedin, Facebook, MapPin } from "lucide-react";

export function Footer() {
  const { t, lang } = useLanguage();

  const quickLinks = [
    { key: "nav.home", href: "#hero" },
    { key: "nav.about", href: "#about" },
    { key: "nav.services", href: "#services" },
    { key: "nav.projects", href: "#projects" },
    { key: "nav.contact", href: "#contact" },
  ] as const;

  const services = [
    { key: "footer.svc.general" },
    { key: "footer.svc.arch" },
    { key: "footer.svc.realestate" },
    { key: "footer.svc.consulting" },
    { key: "footer.svc.maintenance" },
  ] as const;

  const hours = [
    { days: "footer.hours.sun_thu", time: "footer.hours.sun_thu_time" },
    { days: "footer.hours.sat", time: "footer.hours.sat_time" },
    { days: "footer.hours.fri", time: "footer.hours.fri_time" },
  ] as const;

  const socials = [
    { Icon: Twitter, href: "#", label: "X" },
    { Icon: Linkedin, href: "#", label: "LinkedIn" },
    { Icon: Facebook, href: "#", label: "Facebook" },
  ];

  return (
    <footer className="bg-foreground text-background pt-20 pb-8 border-t-4 border-accent">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Column 1: Logo + description */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <span className="text-2xl font-bold text-white block leading-tight">
                {lang === "ar" ? "نوافذ المستقبل للتطوير العقاري" : "Nawafiz Al-Mustaqbal Real Estate Development"}
              </span>
            </div>
            <p className="text-white/65 text-sm leading-relaxed mb-5">
              {t("footer.desc")}
            </p>
            <div className="flex items-start gap-2 text-white/60 text-sm mb-6">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-accent" />
              <span>{t("footer.address")}</span>
            </div>
            <div className="flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/8 flex items-center justify-center text-white hover:bg-accent hover:text-foreground transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-base font-bold text-white mb-5">{t("footer.links")}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-accent transition-colors text-sm"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-base font-bold text-white mb-5">{t("footer.services")}</h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.key}>
                  <span className="text-white/60 text-sm">{t(s.key as any)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Working Hours */}
          <div>
            <h4 className="text-base font-bold text-white mb-5">{t("footer.hours.title")}</h4>
            <ul className="space-y-4">
              {hours.map((h) => (
                <li key={h.days} className="flex flex-col gap-0.5">
                  <span className="text-white/80 text-sm font-medium">{t(h.days as any)}</span>
                  <span className="text-accent text-sm">{t(h.time as any)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-white/50 text-xs">
          <p>{t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
}
