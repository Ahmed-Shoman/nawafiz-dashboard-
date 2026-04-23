import { useState } from "react";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useApi, API_BASE_URL } from "@/contexts/ApiContext";
import { FadeIn } from "@/components/ui/fade-in";
import { MapPin, Mail, Send } from "lucide-react";

// ✅ GTM Type Declaration
declare global {
  interface Window {
    dataLayer: any[];
  }
}

export function Contact() {
  const { t, dir, lang } = useLanguage();
  const { settings, sections } = useApi();
  const [, setLocation] = useLocation();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const contactSection = sections?.find((s) => s.key === 'contact')?.content;

  const badge = lang === 'ar' ? (contactSection?.badge_ar || t("contact.badge")) : (contactSection?.badge_en || t("contact.badge"));
  const title = lang === 'ar' ? (contactSection?.title_ar || t("contact.title")) : (contactSection?.title_en || t("contact.title"));
  const subtitle = lang === 'ar' ? (contactSection?.subtitle_ar || t("contact.subtitle")) : (contactSection?.subtitle_en || t("contact.subtitle"));

  // Pull contact info from site settings if available
  const getSetting = (key: string, fallback: string) => {
    if (Array.isArray(settings)) {
      const found = settings.find((s: any) => s.key === key);
      return found?.value || fallback;
    }
    if (settings && typeof settings === 'object' && settings[key]) {
      return settings[key];
    }
    return fallback;
  };

  const whatsappNumber = getSetting('whatsapp', '0537502035');
  const emailAddress = getSetting('email', t("contact.info.email"));
  const address = lang === 'ar'
    ? getSetting('address_ar', t("contact.info.address"))
    : getSetting('address_en', t("contact.info.address"));
  const phone = getSetting('phone', t("contact.info.phone"));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    // ✅ امسك البيانات من الفورم بأمان
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value || "";
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value || "";
    const phoneVal = (form.elements.namedItem("phone") as HTMLInputElement)?.value || "";
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value || "";

    // ✅ 1. Send data to Backend API
    try {
      await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone: phoneVal, message })
      });
    } catch (err) {
      console.error("Failed to submit contact form", err);
    }

    // ✅ 2. ابعت الـ Event لـ GTM (من غير ما نستناه يرد علينا)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "form_submit",
      form_name: "contact_form",
      user_name: name,
      user_email: email,
      user_phone: phoneVal,
    });

    // ✅ 3. توجيه إجباري ومضمون 100% بعد نصف ثانية
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setLocation("/thank-you"); // هينقلك للصفحة فوراً هنا
    }, 500);
  };

  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Info Side */}
          <FadeIn direction="right">
            <span className="text-accent font-bold tracking-wider uppercase text-sm mb-2 block">
              {badge}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-md">
              {subtitle}
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">{t("contact.info.address_label")}</h4>
                  <p className="text-muted-foreground">{address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">{t("contact.info.email_label")}</h4>
                  <a href={`mailto:${emailAddress}`} className="text-muted-foreground hover:text-primary transition-colors">
                    {emailAddress}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#25D366" className="w-6 h-6">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">{t("contact.info.whatsapp_label")}</h4>
                  <a href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#25D366] font-semibold hover:underline"
                    dir="ltr"
                  >
                    {phone}
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Form Side */}
          <FadeIn direction="left" delay={0.2}>
            <div className="bg-card p-8 md:p-10 rounded-3xl shadow-xl shadow-black/5 border border-border">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    {t("contact.form.name")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-5 py-4 rounded-xl bg-background border-2 border-border focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    {t("contact.form.email")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-5 py-4 rounded-xl bg-background border-2 border-border focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    {t("contact.form.phone")}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full px-5 py-4 rounded-xl bg-background border-2 border-border focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                    placeholder="+20 1XX XXX XXXX"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    {t("contact.form.message")}
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="w-full px-5 py-4 rounded-xl bg-background border-2 border-border focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none"
                    placeholder="..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending || sent}
                  className="w-full px-6 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 hover:-translate-y-1 transition-all disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                >
                  {sending ? t("contact.form.sending") : sent ? "Sent Successfully!" : t("contact.form.submit")}
                  {!sending && !sent && <Send className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />}
                </button>
              </form>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}