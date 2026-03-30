import { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";

const SLIDE_DURATION = 7000;

export function Hero() {
  const { t, dir, lang } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState(1);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const slides = [
    {
      image: `${import.meta.env.BASE_URL}images/hero-1.png`,
      titleKey: "hero.slide1.title" as const,
      subtitleKey: "hero.subtitle" as const,
    },
    {
      image: `${import.meta.env.BASE_URL}images/hero-2.png`,
      titleKey: "hero.slide2.title" as const,
      subtitleKey: "hero.subtitle" as const,
    },
    {
      image: `${import.meta.env.BASE_URL}images/hero-3.png`,
      titleKey: "hero.slide3.title" as const,
      subtitleKey: "hero.subtitle" as const,
    },
    {
      image: `${import.meta.env.BASE_URL}images/hero-4.png`,
      titleKey: "hero.slide4.title" as const,
      subtitleKey: "hero.subtitle" as const,
    },
  ];

  const goTo = useCallback((idx: number, dir: number) => {
    setDirection(dir);
    setCurrentSlide(idx);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  const nextSlide = useCallback(() => {
    goTo((currentSlide + 1) % slides.length, 1);
  }, [currentSlide, slides.length, goTo]);

  const prevSlide = useCallback(() => {
    goTo((currentSlide - 1 + slides.length) % slides.length, -1);
  }, [currentSlide, slides.length, goTo]);

  useEffect(() => {
    if (progressRef.current) clearInterval(progressRef.current);
    startTimeRef.current = Date.now();
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(pct);
      if (elapsed >= SLIDE_DURATION) {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        startTimeRef.current = Date.now();
      }
    }, 30);
    return () => { if (progressRef.current) clearInterval(progressRef.current); };
  }, [currentSlide, slides.length]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "5%" : "-5%",
      opacity: 0,
      scale: 1.06,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1.02,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-5%" : "5%",
      opacity: 0,
      scale: 1,
    }),
  };

  const textContainer = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08, delayChildren: 0.3 },
    },
  };

  const wordVariant = {
    hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const title = t(slides[currentSlide].titleKey);
  const words = title.split(" ");

  const slideNum = String(currentSlide + 1).padStart(2, "0");
  const totalNum = String(slides.length).padStart(2, "0");

  return (
    <section id="hero" className="relative h-screen min-h-[640px] w-full overflow-hidden bg-[#0d2233]">

      {/* ── Background Images with Ken Burns ── */}
      <AnimatePresence mode="sync" custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-0"
        >
          {/* Ken Burns slow zoom */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
            initial={{ scale: 1.08 }}
            animate={{ scale: 1.18 }}
            transition={{ duration: SLIDE_DURATION / 1000 + 1.5, ease: "linear" }}
          />
          {/* Layered gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d2233]/95 via-[#0d2233]/55 to-[#0d2233]/20" />
          <div className={`absolute inset-0 ${dir === "rtl" ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-[#0d2233]/85 via-[#0d2233]/40 to-transparent`} />
        </motion.div>
      </AnimatePresence>

      {/* ── Thin progress bar at very top ── */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-white/10 z-30">
        <motion.div
          className="h-full bg-accent origin-left"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0 }}
        />
      </div>

      {/* ── Decorative diagonal accent bar ── */}
      <div className="absolute top-0 bottom-0 w-1 bg-accent/30 blur-[1px] z-10"
        style={dir === "rtl" ? { right: "10%" } : { left: "10%" }}
      />

      {/* ── Main Content ── */}
      <div className="relative h-full container mx-auto px-6 md:px-10 flex flex-col justify-center pt-24 z-20">
        <div className="max-w-3xl">

          {/* Badge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`badge-${currentSlide}`}
              initial={{ opacity: 0, x: dir === "rtl" ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-7"
            >
              <span className="h-px w-10 bg-accent" />
              <span className="text-accent font-bold tracking-[0.2em] text-xs uppercase">
                {lang === "ar" ? "نوافذ المستقبل للتطوير العقاري" : "Nawafiz Al-Mustaqbal Real Estate"}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Staggered title */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${currentSlide}`}
              variants={textContainer}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
              className="text-4xl md:text-6xl lg:text-[72px] font-bold text-white leading-[1.12] mb-7 tracking-tight"
            >
              {words.map((word, i) => (
                <motion.span key={i} variants={wordVariant} className="inline-block me-[0.25em]">
                  {word}
                </motion.span>
              ))}
            </motion.h1>
          </AnimatePresence>

          {/* Subtitle */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`sub-${currentSlide}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="text-base md:text-lg text-white/75 mb-10 max-w-xl leading-relaxed"
            >
              {t("hero.subtitle")}
            </motion.p>
          </AnimatePresence>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#about"
              className="group relative px-8 py-4 bg-accent text-accent-foreground font-bold rounded-xl overflow-hidden shadow-xl shadow-accent/25 hover:shadow-accent/40 transition-shadow"
            >
              <span className="relative z-10">{t("hero.cta.more")}</span>
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
            </a>
            <a
              href="#projects"
              className="group px-8 py-4 bg-white/8 text-white font-bold rounded-xl backdrop-blur-md border border-white/20 hover:bg-white/15 hover:border-white/35 transition-all duration-300"
            >
              {t("hero.cta.projects")}
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom Controls Bar ── */}
      <div className="absolute bottom-0 inset-x-0 z-30 pointer-events-none">
        {/* Glass bar */}
        <div className="mx-6 md:mx-10 mb-8 flex items-center justify-between gap-6 pointer-events-auto">

          {/* Slide counter */}
          <div className="flex items-center gap-2 select-none">
            <span className="text-white text-3xl font-bold tabular-nums leading-none">{slideNum}</span>
            <div className="flex flex-col gap-1">
              <div className="h-px w-8 bg-white/30" />
              <span className="text-white/40 text-xs tabular-nums">{totalNum}</span>
            </div>
          </div>

          {/* Dot indicators with animated progress ring */}
          <div className="flex items-center gap-2.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx, idx > currentSlide ? 1 : -1)}
                aria-label={`Go to slide ${idx + 1}`}
                className="relative flex items-center justify-center w-5 h-5"
              >
                {idx === currentSlide ? (
                  <>
                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 20 20">
                      <circle cx="10" cy="10" r="8" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                      <motion.circle
                        cx="10" cy="10" r="8"
                        fill="none"
                        stroke="hsl(var(--accent))"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 8}`}
                        strokeDashoffset={`${2 * Math.PI * 8 * (1 - progress / 100)}`}
                        transition={{ duration: 0 }}
                      />
                    </svg>
                    <span className="w-2 h-2 rounded-full bg-accent" />
                  </>
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-white/35 hover:bg-white/60 transition-colors" />
                )}
              </button>
            ))}
          </div>

          {/* Arrow buttons */}
          <div className="flex gap-3">
            <button
              onClick={dir === "rtl" ? nextSlide : prevSlide}
              className="group w-11 h-11 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all duration-300"
            >
              {dir === "rtl" ? (
                <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
              ) : (
                <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
              )}
            </button>
            <button
              onClick={dir === "rtl" ? prevSlide : nextSlide}
              className="group w-11 h-11 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all duration-300"
            >
              {dir === "rtl" ? (
                <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
              ) : (
                <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Vertical slide label on side ── */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-3 ${dir === "rtl" ? "left-6" : "right-6"}`}
      >
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx, idx > currentSlide ? 1 : -1)}
            className={`transition-all duration-300 rounded-full ${
              idx === currentSlide
                ? "w-1 h-10 bg-accent"
                : "w-1 h-4 bg-white/25 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
