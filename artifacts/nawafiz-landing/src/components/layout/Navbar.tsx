import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";

export function Navbar() {
  const { lang, setLang, t, dir } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLang = () => {
    setLang(lang === "ar" ? "en" : "ar");
  };

  const isHome = location === "/" || location === "";

  const navLinks = [
    { key: "nav.home", href: "/" },
    { key: "nav.about", href: isHome ? "#about" : "/#about" },
    { key: "nav.services", href: "/services" },
    { key: "nav.projects", href: isHome ? "#projects" : "/#projects" },
    { key: "nav.contact", href: "/contact" },
  ] as const;

  return (
    <header
      className={`fixed top-0 start-0 end-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-border py-4 shadow-sm"
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <div className={`transition-all duration-300 ${isScrolled ? "" : "bg-white/90 rounded-lg px-2 py-1"}`}>
            <img
              src="/logo.png"
              alt="نوافذ المستقبل للتطوير العقاري"
              className="h-10 w-auto"
            />
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className={`text-sm font-semibold transition-colors hover:text-accent relative group ${
                isScrolled ? "text-foreground/80" : "text-white/90"
              }`}
            >
              {t(link.key)}
              <span className="absolute -bottom-1 start-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
            </a>
          ))}

          <button
            onClick={toggleLang}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
              isScrolled
                ? "border-primary/20 text-primary hover:bg-primary/5"
                : "border-white/30 text-white hover:bg-white/10"
            }`}
          >
            <Globe className="w-4 h-4" />
            <span className="font-bold text-sm">{t("nav.language")}</span>
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className={`lg:hidden p-2 ${isScrolled ? "text-primary" : "text-white"}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border overflow-hidden"
          >
            <nav className="flex flex-col px-4 py-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-foreground py-2 border-b border-border/50"
                >
                  {t(link.key)}
                </a>
              ))}
              <button
                onClick={() => {
                  toggleLang();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-lg"
              >
                <Globe className="w-5 h-5" />
                <span className="font-bold">{lang === "ar" ? "Switch to English" : "التبديل للعربية"}</span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
