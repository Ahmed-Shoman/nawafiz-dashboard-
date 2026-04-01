import { useLanguage } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { FadeIn } from "@/components/ui/fade-in";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

const SERVICES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    titleAr: "المقاولات العامة",
    titleEn: "General Contracting",
    descAr: "تنفيذ شامل لكافة المشاريع الإنشائية بأعلى معايير الجودة والالتزام بالجداول الزمنية المحددة.",
    descEn: "Comprehensive execution of all construction projects with the highest quality standards and commitment to specified timelines.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    titleAr: "التصميم المعماري",
    titleEn: "Architectural Design",
    descAr: "تصاميم عصرية ومبتكرة تجمع بين الجماليات والوظيفية لتلبية رؤيتك وتحويلها إلى واقع ملموس.",
    descEn: "Modern and innovative designs that combine aesthetics and functionality to fulfill your vision and turn it into a tangible reality.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    titleAr: "إدارة العقارات",
    titleEn: "Real Estate Management",
    descAr: "خدمات متكاملة لإدارة أملاكك واستثماراتها لضمان أفضل العوائد بأقل جهد من طرفك.",
    descEn: "Integrated services for managing your properties and investments to ensure the best returns with minimal effort on your part.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M3 9h18v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path d="M3 9V6a2 2 0 012-2h14a2 2 0 012 2v3"/><line x1="12" y1="12" x2="12" y2="18"/><line x1="9" y1="15" x2="15" y2="15"/>
      </svg>
    ),
    titleAr: "المشاريع التجارية",
    titleEn: "Commercial Projects",
    descAr: "تصميم وتنفيذ مساحات تجارية ذكية تعزز من نجاح أعمالك وتجذب المزيد من العملاء.",
    descEn: "Design and execution of smart commercial spaces that enhance the success of your business and attract more customers.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
      </svg>
    ),
    titleAr: "المشاريع السكنية",
    titleEn: "Residential Projects",
    descAr: "بناء فلل ومجمعات سكنية فاخرة توفر لك ولعائلتك أسلوب حياة استثنائي ومريح.",
    descEn: "Building luxury villas and residential complexes that provide you and your family with an exceptional and comfortable lifestyle.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    ),
    titleAr: "الاستشارات الهندسية",
    titleEn: "Engineering Consultations",
    descAr: "فريق من الخبراء لتقديم دراسات جدوى واستشارات فنية تضمن نجاح مشروعك من الفكرة حتى التسليم.",
    descEn: "A team of experts to provide feasibility studies and technical consultations ensuring your project's success from concept to delivery.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
      </svg>
    ),
    titleAr: "التشغيل وإدارة المرافق",
    titleEn: "Operations & Facility Management",
    descAr: "خدمات متكاملة لتشغيل وصيانة المباني وإدارة المرافق بكفاءة عالية لضمان استمرارية أعمالك وراحة المستخدمين.",
    descEn: "Integrated services for operating and maintaining buildings and managing facilities with high efficiency to ensure business continuity and user comfort.",
  },
];

export default function ServicesPage() {
  const { lang, dir } = useLanguage();

  return (
    <div className="min-h-screen bg-[#111318]">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d2233]/80 to-[#111318]" />
        <div className="relative container mx-auto px-4 md:px-6 text-center">
          <FadeIn>
            <span className="inline-block text-accent font-bold tracking-[0.2em] text-xs uppercase mb-4">
              {lang === "ar" ? "نوافذ المستقبل" : "Nawafiz Al-Mustaqbal"}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {lang === "ar" ? "خدماتنا" : "Our Services"}
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              {lang === "ar"
                ? "نقدم مجموعة متكاملة من الخدمات العقارية والإنشائية لتلبية جميع احتياجاتكم"
                : "We offer a comprehensive range of real estate and construction services to meet all your needs"}
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Services Grid */}
      <section className="pb-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
                className="group relative bg-[#1a1d24] border border-white/8 rounded-2xl p-8 hover:border-accent/40 hover:bg-[#1e2129] transition-all duration-400 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center text-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent/15 group-hover:border-accent/30 transition-all duration-300">
                    {service.icon}
                  </div>

                  <h3 className="text-xl font-bold text-white">
                    {lang === "ar" ? service.titleAr : service.titleEn}
                  </h3>

                  <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors">
                    {lang === "ar" ? service.descAr : service.descEn}
                  </p>

                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 text-accent/70 text-sm font-semibold group-hover:text-accent transition-colors mt-2"
                  >
                    {lang === "ar" ? "تواصل معنا" : "Contact Us"}
                    {dir === "rtl" ? (
                      <ArrowLeft className="w-4 h-4" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0d2233]">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
              {lang === "ar" ? "هل أنت مستعد لبدء مشروعك؟" : "Ready to Start Your Project?"}
            </h2>
            <p className="text-white/60 mb-10 max-w-xl mx-auto">
              {lang === "ar"
                ? "تواصل معنا الآن وسيكون فريقنا سعيداً بمساعدتك في تحقيق رؤيتك"
                : "Contact us now and our team will be happy to help you achieve your vision"}
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 px-10 py-4 bg-accent text-accent-foreground font-bold rounded-xl hover:bg-accent/90 transition-colors shadow-xl shadow-accent/20"
            >
              {lang === "ar" ? "تواصل معنا" : "Contact Us"}
              {dir === "rtl" ? (
                <ArrowLeft className="w-5 h-5" />
              ) : (
                <ArrowRight className="w-5 h-5" />
              )}
            </a>
          </FadeIn>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
