import { useLanguage } from "@/contexts/LanguageContext";
import { FadeIn } from "@/components/ui/fade-in";
import { CheckCircle } from "lucide-react";
import { Link } from "wouter";

export default function ThankYou() {
  const { t, lang } = useLanguage();

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col items-center justify-center p-4">
      <FadeIn className="bg-card w-full max-w-md p-8 md:p-10 rounded-3xl shadow-xl shadow-black/5 border border-border text-center flex flex-col items-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-4">
          {lang === "ar" ? "شكراً لك!" : "Thank You!"}
        </h1>
        <p className="text-muted-foreground mb-8 text-lg">
          {lang === "ar" 
            ? "لقد استلمنا رسالتك بنجاح. سنتواصل معك في أقرب وقت ممكن." 
            : "We have successfully received your message. We will contact you as soon as possible."}
        </p>
        <Link 
          href="/" 
          className="px-8 py-4 w-full bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 hover:-translate-y-1 transition-all flex items-center justify-center"
        >
          {t("nav.home")}
        </Link>
      </FadeIn>
    </div>
  );
}
