import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { FadeIn } from "@/components/ui/fade-in";
import { MapPin, Phone, Mail, Send, Navigation } from "lucide-react";

const PHONE = "0537502035";
const WHATSAPP = "966537502035";
const LAT = 24.38741;
const LNG = 39.66397;
const MAPS_LINK = "https://maps.app.goo.gl/JMkrQQRZEFpgtWQN8";

export default function ContactPage() {
  const { t, lang, dir } = useLanguage();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative pt-32 pb-20 bg-[#0d2233] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d2233] to-[#0d2233]/90" />
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(circle at 30% 50%, hsl(42 87% 55% / 0.3) 0%, transparent 60%)" }} />
        <div className="relative container mx-auto px-4 md:px-6 text-center">
          <FadeIn>
            <span className="inline-block text-accent font-bold tracking-[0.2em] text-xs uppercase mb-4">
              {lang === "ar" ? "نوافذ المستقبل" : "Nawafiz Al-Mustaqbal"}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {t("contact.title")}
            </h1>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              {t("contact.subtitle")}
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Contact Cards Row */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {/* Phone */}
            <FadeIn delay={0}>
              <a
                href={`tel:${PHONE}`}
                className="group flex flex-col items-center text-center gap-4 p-8 bg-card border border-border rounded-2xl hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground text-primary transition-all duration-300">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    {t("contact.info.phone_label")}
                  </p>
                  <p className="font-bold text-foreground text-lg" dir="ltr">{PHONE}</p>
                </div>
              </a>
            </FadeIn>

            {/* WhatsApp */}
            <FadeIn delay={0.1}>
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center text-center gap-4 p-8 bg-card border border-border rounded-2xl hover:border-[#25D366]/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366] transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#25D366] group-hover:text-white transition-colors">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    {t("contact.info.whatsapp_label")}
                  </p>
                  <p className="font-bold text-foreground text-lg" dir="ltr">{PHONE}</p>
                </div>
              </a>
            </FadeIn>

            {/* Email */}
            <FadeIn delay={0.15}>
              <a
                href={`mailto:${t("contact.info.email")}`}
                className="group flex flex-col items-center text-center gap-4 p-8 bg-card border border-border rounded-2xl hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground text-primary transition-all duration-300">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    {t("contact.info.email_label")}
                  </p>
                  <p className="font-bold text-foreground">{t("contact.info.email")}</p>
                </div>
              </a>
            </FadeIn>

            {/* Location */}
            <FadeIn delay={0.2}>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center text-center gap-4 p-8 bg-card border border-border rounded-2xl hover:border-accent/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent text-accent group-hover:text-accent-foreground transition-all duration-300">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    {t("contact.info.address_label")}
                  </p>
                  <p className="font-bold text-foreground text-sm">
                    {lang === "ar" ? "المدينة المنورة، المملكة العربية السعودية" : "Medina, Saudi Arabia"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 font-mono" dir="ltr">
                    24°23'14.7"N 39°39'50.3"E
                  </p>
                </div>
              </a>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* Map + Form */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Map */}
            <FadeIn direction="right">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {lang === "ar" ? "موقعنا على الخريطة" : "Our Location"}
              </h2>
              <div className="rounded-2xl overflow-hidden border border-border shadow-xl aspect-[4/3]">
                <iframe
                  title="موقع نوافذ المستقبل"
                  src={`https://maps.google.com/maps?q=${LAT},${LNG}&hl=${lang}&z=15&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-primary font-semibold hover:text-accent transition-colors text-sm"
              >
                <Navigation className="w-4 h-4" />
                {lang === "ar" ? "فتح في خرائط جوجل" : "Open in Google Maps"}
              </a>
            </FadeIn>

            {/* Form */}
            <FadeIn direction="left" delay={0.2}>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {lang === "ar" ? "أرسل لنا رسالة" : "Send Us a Message"}
              </h2>
              <div className="bg-card p-8 md:p-10 rounded-3xl shadow-xl shadow-black/5 border border-border">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      {t("contact.form.name")}
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-5 py-4 rounded-xl bg-background border-2 border-border focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      {t("contact.form.email")}
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-5 py-4 rounded-xl bg-background border-2 border-border focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      {t("contact.form.message")}
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-5 py-4 rounded-xl bg-background border-2 border-border focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending || sent}
                    className="w-full px-6 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 hover:-translate-y-1 transition-all disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                  >
                    {sending
                      ? t("contact.form.sending")
                      : sent
                      ? lang === "ar" ? "تم الإرسال بنجاح!" : "Sent Successfully!"
                      : t("contact.form.submit")}
                    {!sending && !sent && (
                      <Send className={`w-5 h-5 ${dir === "rtl" ? "rotate-180" : ""}`} />
                    )}
                  </button>
                </form>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
