import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";

export function Hero() {
  const { t, dir } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: `${import.meta.env.BASE_URL}images/hero-1.png`,
      titleKey: "hero.slide1.title" as const,
    },
    {
      image: `${import.meta.env.BASE_URL}images/hero-2.png`,
      titleKey: "hero.slide2.title" as const,
    },
    {
      image: `${import.meta.env.BASE_URL}images/hero-3.png`,
      titleKey: "hero.slide3.title" as const,
    },
    {
      image: `${import.meta.env.BASE_URL}images/hero-4.png`,
      titleKey: "hero.slide4.title" as const,
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section id="hero" className="relative h-screen min-h-[600px] w-full overflow-hidden bg-primary">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          />
          {/* Complex Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/60 to-black/30" />
          <div className={`absolute inset-0 ${dir === 'rtl' ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-primary/80 to-transparent`} />
        </motion.div>
      </AnimatePresence>

      <div className="relative h-full container mx-auto px-4 md:px-6 flex flex-col justify-center pt-20">
        <div className="max-w-3xl">
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-accent/20 border border-accent/30 backdrop-blur-sm">
              <p className="text-accent font-semibold tracking-wider text-sm">
                نوافذ المستقبل
              </p>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 drop-shadow-lg">
              {t(slides[currentSlide].titleKey)}
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl leading-relaxed">
              {t("hero.subtitle")}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="#about"
                className="px-8 py-4 bg-accent text-accent-foreground font-bold rounded-lg hover:bg-accent/90 transition-all hover:-translate-y-1 shadow-lg shadow-accent/20"
              >
                {t("hero.cta.more")}
              </a>
              <a 
                href="#projects"
                className="px-8 py-4 bg-white/10 text-white font-bold rounded-lg backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all hover:-translate-y-1"
              >
                {t("hero.cta.projects")}
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-10 start-0 end-0 container mx-auto px-4 md:px-6 flex justify-between items-end z-20 pointer-events-none">
        <div className="flex gap-3 pointer-events-auto">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentSlide ? "w-10 bg-accent" : "w-4 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
        
        <div className="flex gap-4 pointer-events-auto">
          <button 
            onClick={dir === 'rtl' ? nextSlide : prevSlide}
            className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white backdrop-blur-sm hover:bg-white/10 transition-colors"
          >
            {dir === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
          </button>
          <button 
            onClick={dir === 'rtl' ? prevSlide : nextSlide}
            className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white backdrop-blur-sm hover:bg-white/10 transition-colors"
          >
            {dir === 'rtl' ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>
      </div>
    </section>
  );
}
