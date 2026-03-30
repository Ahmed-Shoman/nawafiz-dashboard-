import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { FadeIn } from "@/components/ui/fade-in";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Testimonials() {
  const { t, dir } = useLanguage();
  const [active, setActive] = useState(0);

  const testimonials = [
    { text: t("testimonials.1.text"), name: t("testimonials.1.name"), role: t("testimonials.1.role") },
    { text: t("testimonials.2.text"), name: t("testimonials.2.name"), role: t("testimonials.2.role") },
    { text: t("testimonials.3.text"), name: t("testimonials.3.name"), role: t("testimonials.3.role") },
  ];

  const next = () => setActive((p) => (p + 1) % testimonials.length);
  const prev = () => setActive((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 start-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 end-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/4" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <FadeIn className="text-center mb-16">
          <span className="text-accent font-bold tracking-wider uppercase text-sm mb-2 block">
            {t("testimonials.badge")}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold">
            {t("testimonials.title")}
          </h2>
        </FadeIn>

        <div className="max-w-4xl mx-auto">
          <div className="relative min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: dir === 'rtl' ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
                transition={{ duration: 0.5 }}
                className="text-center px-8 md:px-16"
              >
                <Quote className="w-16 h-16 text-accent/30 mx-auto mb-8 rotate-180" />
                <p className="text-2xl md:text-3xl font-medium leading-relaxed mb-10">
                  "{testimonials[active].text}"
                </p>
                <div>
                  <h4 className="text-xl font-bold text-accent mb-1">{testimonials[active].name}</h4>
                  <p className="text-primary-foreground/70">{testimonials[active].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button onClick={dir === 'rtl' ? next : prev} className="p-3 rounded-full border border-primary-foreground/20 hover:bg-primary-foreground/10 transition-colors">
              {dir === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
            </button>
            <button onClick={dir === 'rtl' ? prev : next} className="p-3 rounded-full border border-primary-foreground/20 hover:bg-primary-foreground/10 transition-colors">
              {dir === 'rtl' ? <ChevronLeft /> : <ChevronRight />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
