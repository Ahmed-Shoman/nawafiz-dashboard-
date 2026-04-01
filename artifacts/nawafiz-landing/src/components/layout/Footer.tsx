import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin } from "lucide-react";

export function Footer() {
  const { t, lang } = useLanguage();

  const quickLinks = [
    { key: "nav.home", href: "/" },
    { key: "nav.about", href: "/#about" },
    { key: "nav.services", href: "/services" },
    { key: "nav.projects", href: "/#projects" },
    { key: "nav.contact", href: "/contact" },
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
    {
      label: "Instagram",
      href: "https://www.instagram.com/qrrr.39/",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      ),
    },
    {
      label: "Snapchat",
      href: "https://www.snapchat.com/add/nwf600700",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M12.065.001C8.427-.006 5.188 2.119 3.732 5.407c-.525 1.178-.476 2.467-.546 3.72-.476.292-1.06.26-1.568.476-.453.19-.855.585-.839 1.095.016.57.526.985 1.04 1.16.2.066.406.117.607.178-.137.356-.316.7-.538 1.02-.822 1.22-2.078 2.063-3.48 2.32l.001.001c-.307.057-.304.508.006.552.923.13 1.818.427 2.636.877.153.085.268.222.318.385.097.315.04.642.065.963.029.367.337.6.69.552.3-.04.6-.182.916-.07.349.124.65.36.95.57.657.46 1.318.974 2.11 1.155.924.207 1.812-.152 2.671-.47.62-.23 1.253-.466 1.913-.421.602.04 1.182.26 1.76.472.74.27 1.52.524 2.307.352.787-.172 1.448-.68 2.1-1.133.33-.225.657-.456.99-.657.26-.155.543-.268.838-.33.474-.093.8.084 1.261.076.358-.007.629-.302.633-.654.018-.334.006-.673.105-.995a.661.661 0 01.304-.362c.826-.447 1.731-.744 2.662-.878l.001-.001c.31-.044.313-.495.007-.552C22.12 14.85 20.864 14.007 20.041 12.787c-.22-.32-.398-.664-.535-1.02.2-.061.406-.112.606-.178.515-.175 1.024-.59 1.04-1.16.016-.51-.386-.905-.839-1.095-.507-.216-1.092-.184-1.568-.476-.07-1.253-.021-2.542-.546-3.72C16.843 2.12 13.604-.005 12.065 0z"/>
        </svg>
      ),
    },
    {
      label: "TikTok",
      href: "https://www.tiktok.com/@nfw705",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.3 6.3 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34l-.01-8.91a8.16 8.16 0 004.77 1.52V4.46a4.85 4.85 0 01-1-.23z"/>
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-foreground text-background pt-20 pb-8 border-t-4 border-accent">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Column 1: Logo + description */}
          <div className="lg:col-span-1">
            <div className="mb-5 inline-block bg-white/95 rounded-lg px-3 py-2">
              <img
                src="/logo.png"
                alt="نوافذ المستقبل للتطوير العقاري"
                className="h-12 w-auto"
              />
            </div>
            <p className="text-white/65 text-sm leading-relaxed mb-5">
              {t("footer.desc")}
            </p>
            <div className="flex items-start gap-2 text-white/60 text-sm mb-6">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-accent" />
              <span>{t("footer.address")}</span>
            </div>
            <div className="flex gap-3">
              {socials.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/8 flex items-center justify-center text-white hover:bg-accent hover:text-foreground transition-all duration-300"
                >
                  {icon}
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
