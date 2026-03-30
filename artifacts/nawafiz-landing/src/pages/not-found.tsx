import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { Building } from "lucide-react";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground px-4">
      <Building className="w-24 h-24 text-muted mb-8" />
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-8">Page Not Found</h2>
      <Link href="/" className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all shadow-lg hover:-translate-y-1">
        {t("nav.home")}
      </Link>
    </div>
  );
}
