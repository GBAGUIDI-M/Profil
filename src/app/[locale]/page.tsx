import { useTranslations } from "next-intl";
import HeroCanvas from "@/components/HeroCanvas";
import { Link } from "@/routing";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Home' });
  return {
    title: t('heroTitle'),
    description: t('heroDescription'),
  };
}

export default function Home() {
  const t = useTranslations("Home");
  const tNav = useTranslations("Navigation");

  return (
    <div className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 overflow-hidden">
      <HeroCanvas />
      
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 z-10 w-full max-w-6xl">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-foreground mb-6">
            {t("heroTitle")}
          </h1>
          
          <p className="text-xl md:text-3xl font-light text-muted-foreground leading-relaxed mb-4">
            {t("heroSubtitle")}
          </p>
          
          <p className="text-base md:text-lg text-muted-foreground mb-12">
            {t("heroDescription")}
          </p>
          
          <div className="flex flex-wrap gap-6">
            <Link 
              href="/research" 
              className="group flex items-center gap-2 text-sm font-medium tracking-wide uppercase hover:text-accent transition-colors"
            >
              {tNav("research")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/publications" 
              className="group flex items-center gap-2 text-sm font-medium tracking-wide uppercase hover:text-accent transition-colors"
            >
              {tNav("publications")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/gallery" 
              className="group flex items-center gap-2 text-sm font-medium tracking-wide uppercase hover:text-accent transition-colors"
            >
              {tNav("gallery")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="relative w-64 h-80 md:w-80 md:h-96 lg:w-96 lg:h-[30rem] flex-shrink-0">
          <div className="absolute inset-0 rounded-3xl bg-accent/20 blur-3xl animate-pulse"></div>
          <Image
            src="/Mannonde.png"
            alt="Mannondé D. GBAGUIDI"
            fill
            className="object-cover rounded-3xl border border-border/50 shadow-2xl z-10 relative"
            priority
          />
        </div>
      </div>

    </div>
  );
}
