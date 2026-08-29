import { getTranslations } from "next-intl/server";
import Image from "next/image";
import HeroCanvas from "@/components/HeroCanvas";
import MathVisualization from "@/components/MathVisualization";
import { Link } from "@/routing";
import { ChevronDown } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Home' });
  return {
    title: t('heroTitle'),
    description: t('heroSubtitle'),
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Home' });

  return (
    <div className="relative flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center px-6 md:px-16 overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 pointer-events-none z-0">
           <HeroCanvas />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center pt-24 lg:pt-0">
          <div className="max-w-2xl lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-foreground mb-4 leading-tight">
              {t("heroTitle")}
            </h1>
            <h2 className="text-xl md:text-2xl font-sans tracking-widest text-muted-foreground uppercase mb-8">
              {t("heroProfession")}
            </h2>
            <p className="text-sm md:text-base font-semibold tracking-widest text-accent uppercase mb-6">
              {t("heroAreas")}
            </p>
            <p className="text-xl md:text-2xl font-serif italic font-light text-foreground mb-8 border-l-2 border-accent pl-6">
              {t("heroSubtitle")}
            </p>
            <p className="text-lg text-muted-foreground mb-12">
              {t("heroTagline")}
            </p>
            <div className="flex flex-wrap gap-8">
              <Link href="/research" className="group flex items-center gap-3 text-sm font-semibold tracking-widest uppercase hover:text-accent transition-colors">
                [ {t("exploreResearch")} ]
              </Link>
              <Link href="/cv" className="group flex items-center gap-3 text-sm font-semibold tracking-widest uppercase hover:text-accent transition-colors">
                [ {t("viewCV")} ]
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
             <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border border-border p-2">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                   <Image src="/Mannonde.png" alt="Mannondé D. Gbaguidi" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" priority sizes="(max-width: 768px) 256px, 384px" />
                </div>
             </div>
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown className="w-6 h-6 text-muted-foreground/50" />
        </div>
      </section>

      {/* 2. RESEARCH IDENTITY SECTION */}
      <section className="relative py-32 px-6 md:px-16 border-t border-border">
        <MathVisualization />
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-12">
            {t("researchTitle")}
          </h2>
          <p className="text-3xl md:text-5xl font-serif leading-tight text-foreground mb-20">
            {t("researchIdentity")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <div>
              <h3 className="text-2xl font-serif font-bold mb-6">Mathematical Analysis & Microlocal Analysis</h3>
              <ul className="space-y-3 text-muted-foreground font-light">
                <li>Functional Analysis</li>
                <li>Operator Theory</li>
                <li>Partial Differential Equations</li>
                <li>Pseudo-Differential Operators</li>
                <li>Symbolic Calculus</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold mb-6 border-l-2 border-accent pl-4">Mathematical Modeling & Computing</h3>
              <ul className="space-y-3 text-muted-foreground font-light">
                <li>Dynamical Systems</li>
                <li>Mathematical Epidemiology</li>
                <li>Biostatistics</li>
                <li>Scientific Computing (Python, R, C++)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED RESEARCH */}
      <section className="py-32 px-6 md:px-16 bg-muted/20 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-16">
            {t("featuredResearchTitle")}
          </h2>
          <div className="flex flex-col gap-12">
            {/* Project 1 */}
            <Link href="/projects" className="group block border-b border-border pb-12 hover:border-foreground transition-colors">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-4">
                <h3 className="text-3xl md:text-5xl font-serif group-hover:text-accent transition-colors">Pseudo-Differential Operators & Microlocal Analysis</h3>
                <span className="text-sm tracking-widest uppercase text-muted-foreground whitespace-nowrap">MSc Research · 2026</span>
              </div>
              <p className="text-xl font-light text-muted-foreground max-w-3xl">
                Investigating analytical frameworks underlying differential equations using Hörmander's calculus and wave-front sets.
              </p>
            </Link>
            {/* Project 2 */}
            <Link href="/projects" className="group block border-b border-border pb-12 hover:border-foreground transition-colors">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-4">
                <h3 className="text-3xl md:text-5xl font-serif group-hover:text-accent transition-colors">SEIR-B Cholera Model</h3>
                <span className="text-sm tracking-widest uppercase text-muted-foreground whitespace-nowrap">MSc Biostatistics</span>
              </div>
              <p className="text-xl font-light text-muted-foreground max-w-3xl">
                Structural robustness and sensitivity analysis of epidemiological dynamics with waterborne transmission.
              </p>
            </Link>
            {/* Project 3 */}
            <Link href="/projects" className="group block pb-4 hover:border-foreground transition-colors">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-4">
                <h3 className="text-3xl md:text-5xl font-serif group-hover:text-accent transition-colors">Non-Local Multi-Strain Epidemic Model</h3>
                <span className="text-sm tracking-widest uppercase text-muted-foreground whitespace-nowrap">Mathematical Biology</span>
              </div>
              <p className="text-xl font-light text-muted-foreground max-w-3xl">
                Integro-differential structures modelling spatial coexistence and nonlocal dispersion in multi-strain outbreaks.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. RESEARCH TRAJECTORY */}
      <section className="py-32 px-6 md:px-16 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-12">
            {t("trajectoryTitle")}
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-4 text-xl md:text-2xl font-serif text-muted-foreground">
             <span className="hover:text-foreground transition-colors">Fundamental Mathematics</span>
             <span className="text-accent">→</span>
             <span className="hover:text-foreground transition-colors">Pure & Applied Mathematics</span>
             <span className="text-accent">→</span>
             <span className="hover:text-foreground transition-colors">Biostatistics</span>
             <span className="text-accent">→</span>
             <span className="hover:text-foreground transition-colors">Mathematical Sciences at AIMS</span>
             <span className="text-accent">→</span>
             <span className="text-foreground border-b border-foreground pb-1">PDEs & Microlocal Analysis</span>
             <span className="text-accent">→</span>
             <span className="font-bold text-foreground">PhD Research</span>
          </div>
        </div>
      </section>

      {/* 5. SELECTED ACHIEVEMENTS */}
      <section className="py-32 px-6 md:px-16 bg-muted/20 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-16">
            {t("achievementsTitle")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            <div>
               <div className="text-xs tracking-widest text-accent mb-2">2026</div>
               <h3 className="text-xl font-serif font-bold mb-2">Academic Excellence AIMS South Africa</h3>
               <p className="text-muted-foreground font-light">MSc in Mathematical Sciences</p>
            </div>
            <div>
               <div className="text-xs tracking-widest text-accent mb-2">2025</div>
               <h3 className="text-xl font-serif font-bold mb-2">Mastercard Foundation Scholar</h3>
               <p className="text-muted-foreground font-light">Prestigious scholarship awarded for academic excellence and leadership.</p>
            </div>
            <div>
               <div className="text-xs tracking-widest text-accent mb-2">2023</div>
               <h3 className="text-xl font-serif font-bold mb-2">World Bank Scholarship</h3>
               <p className="text-muted-foreground font-light">Centre of Excellence in Mathematical Sciences and Applications.</p>
            </div>
            <div>
               <div className="text-xs tracking-widest text-accent mb-2">2023</div>
               <h3 className="text-xl font-serif font-bold mb-2">DAAD Scholarship</h3>
               <p className="text-muted-foreground font-light">Academic excellence scholarship for research in biostatistics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. RESEARCH VISION */}
      <section className="relative py-32 px-6 md:px-16 border-t border-border">
        <MathVisualization />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-12">
            {t("visionTitle")}
          </h2>
          <p className="text-2xl md:text-4xl font-serif leading-relaxed text-foreground mb-16">
            {t("visionDescription")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
             <div className="border border-border p-8 hover:border-accent transition-colors bg-background">
                <div className="text-3xl font-serif text-accent mb-4">01</div>
                <h4 className="text-lg font-bold mb-2">Nonlocal PDEs</h4>
                <p className="text-sm text-muted-foreground">Investigating analytical properties of integro-differential models.</p>
             </div>
             <div className="border border-border p-8 hover:border-accent transition-colors bg-background">
                <div className="text-3xl font-serif text-accent mb-4">02</div>
                <h4 className="text-lg font-bold mb-2">Microlocal Methods</h4>
                <p className="text-sm text-muted-foreground">Applying pseudo-differential calculus to complex operators.</p>
             </div>
             <div className="border border-border p-8 hover:border-accent transition-colors bg-background">
                <div className="text-3xl font-serif text-accent mb-4">03</div>
                <h4 className="text-lg font-bold mb-2">Spatial Systems</h4>
                <p className="text-sm text-muted-foreground">Mathematical modeling of spatial dynamics in biological populations.</p>
             </div>
          </div>
        </div>
      </section>

      {/* 7. FROM THE JOURNAL */}
      <section className="py-32 px-6 md:px-16 bg-muted/20 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-baseline mb-16">
          <h2 className="text-sm font-bold tracking-widest text-accent uppercase">
            {t("journalTitle")}
          </h2>
          <Link href="/journal" className="text-sm tracking-widest hover:text-accent transition-colors border-b border-foreground hover:border-accent mt-6 md:mt-0">
            View all entries →
          </Link>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           <Link href="/journal" className="group">
              <div className="text-xs text-muted-foreground mb-2 tracking-widest uppercase">Research Note</div>
              <h3 className="text-xl font-serif group-hover:text-accent transition-colors mb-4">Why pseudo-differential operators matter for PDEs</h3>
              <div className="h-[1px] w-12 bg-border group-hover:w-full group-hover:bg-accent transition-all duration-500"></div>
           </Link>
           <Link href="/journal" className="group">
              <div className="text-xs text-muted-foreground mb-2 tracking-widest uppercase">Academic Story</div>
              <h3 className="text-xl font-serif group-hover:text-accent transition-colors mb-4">My year at AIMS South Africa</h3>
              <div className="h-[1px] w-12 bg-border group-hover:w-full group-hover:bg-accent transition-all duration-500"></div>
           </Link>
           <Link href="/journal" className="group">
              <div className="text-xs text-muted-foreground mb-2 tracking-widest uppercase">Gallery</div>
              <h3 className="text-xl font-serif group-hover:text-accent transition-colors mb-4">Mathematical Modeling Session · 2026</h3>
              <div className="h-[1px] w-12 bg-border group-hover:w-full group-hover:bg-accent transition-all duration-500"></div>
           </Link>
           <Link href="/journal" className="group">
              <div className="text-xs text-muted-foreground mb-2 tracking-widest uppercase">Research Note</div>
              <h3 className="text-xl font-serif group-hover:text-accent transition-colors mb-4">From mathematical modeling to microlocal analysis</h3>
              <div className="h-[1px] w-12 bg-border group-hover:w-full group-hover:bg-accent transition-all duration-500"></div>
           </Link>
        </div>
      </section>

      {/* 8. CONTACT */}
      <section className="py-32 px-6 md:px-16 border-y border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8">
            {t("contactTitle")}
          </h2>
          <p className="text-xl text-muted-foreground font-light mb-12 max-w-2xl mx-auto">
            I am interested in research collaborations, mathematical discussions, and interdisciplinary research involving analysis, PDEs, mathematical modeling, and scientific computing.
          </p>
          <Link href="/contact" className="inline-block px-12 py-4 bg-foreground text-background font-semibold tracking-widest uppercase hover:bg-accent transition-colors">
             Contact Me
          </Link>
        </div>
      </section>

    </div>
  );
}
