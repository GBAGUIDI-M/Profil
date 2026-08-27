import { getTranslations } from "next-intl/server";
import HeroCanvas from "@/components/HeroCanvas";
import { Link } from "@/routing";
import { ArrowRight, Code2, Brain, Award, ChevronDown } from "lucide-react";
import Image from "next/image";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Home' });
  return {
    title: t('heroTitle'),
    description: t('heroDescription'),
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  const cvData = locale === 'fr' 
    ? (await import("@/data/cv.fr.json")).default 
    : (await import("@/data/cv.en.json")).default;

  const t = await getTranslations({ locale, namespace: 'Home' });
  const tNav = await getTranslations({ locale, namespace: 'Navigation' });

  return (
    <div className="relative flex flex-col">
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 overflow-hidden">
        <HeroCanvas />
        
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 z-10 w-full max-w-7xl mx-auto">
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
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover rounded-3xl border border-border/50 shadow-2xl z-10 relative"
              priority
            />
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown className="w-8 h-8 text-muted-foreground/50" />
        </div>
      </section>

      {/* Profile Summary Section */}
      <section className="py-24 px-6 md:px-16 bg-muted/30 relative">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-10 text-center flex items-center justify-center gap-4">
            <span className="w-12 h-[1px] bg-accent"></span>
            {t("profileTitle")}
            <span className="w-12 h-[1px] bg-accent"></span>
          </h2>
          <div className="bg-card p-8 md:p-12 rounded-3xl border shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground relative z-10 font-light">
              {cvData.profile}
            </p>
          </div>
        </div>
      </section>

      {/* Expertise & Skills Section */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-16 text-center">
          {t("skillsTitle")}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cvData.skills.map((skillGroup: any, idx: number) => (
            <div key={idx} className="group p-8 rounded-3xl border bg-card hover:border-accent/50 transition-colors">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {idx === 0 ? <Code2 className="w-6 h-6 text-accent" /> : <Brain className="w-6 h-6 text-accent" />}
                </div>
                <h3 className="text-xl font-serif font-semibold">{skillGroup.category}</h3>
              </div>
              <ul className="space-y-4">
                {skillGroup.items.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50 mt-2 flex-shrink-0"></span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Scholarships & Awards */}
      <section className="py-24 px-6 md:px-16 bg-accent/5 border-y relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-16 text-center flex items-center justify-center gap-3">
            <Award className="w-8 h-8 text-accent" />
            {t("scholarshipsTitle")}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cvData.scholarships.map((award: any, idx: number) => (
              <div key={idx} className="p-8 rounded-2xl bg-card border shadow-lg hover:-translate-y-2 transition-transform duration-300">
                <div className="text-xs font-bold tracking-widest text-accent uppercase mb-3">{award.date}</div>
                <h3 className="text-xl font-serif font-bold mb-4">{award.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{award.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link 
              href="/about" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-foreground text-background font-medium hover:scale-105 transition-transform"
            >
              {t("exploreCV")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
