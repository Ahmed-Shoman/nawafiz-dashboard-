import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

function CountUp({ target, suffix = "+" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function Stats() {
  const { t, lang } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: 500, suffix: "+", labelKey: "stats.projects" },
    { value: 15,  suffix: "+", labelKey: "stats.experience" },
    { value: 1000, suffix: "+", labelKey: "stats.clients" },
    { value: 50,  suffix: "+", labelKey: "stats.awards" },
  ];

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, hsl(var(--accent)) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(var(--primary-foreground)) 0%, transparent 40%)",
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10" ref={sectionRef}>
        <div
          className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            {t("stats.title")}
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto text-lg leading-relaxed">
            {t("stats.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="inline-flex flex-col items-center justify-center bg-white/10 rounded-2xl px-8 py-8 w-full hover:bg-white/20 transition-colors duration-300 border border-white/10">
                <span className="text-4xl md:text-5xl font-bold text-accent mb-2">
                  {visible ? (
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  ) : (
                    `0${stat.suffix}`
                  )}
                </span>
                <span className="text-primary-foreground/80 text-sm md:text-base font-medium text-center">
                  {t(stat.labelKey as any)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
