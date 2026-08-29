import { getTranslations } from "next-intl/server";
import { Link } from "@/routing";
import ResearchMap from "@/components/ResearchMap";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Navigation' });
  return { title: `MD.G | ${t('research')}` };
}

export default async function ResearchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Research' });

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-16 max-w-7xl mx-auto">
      <header className="mb-12">
        <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tight mb-8">
          {t("title") || "Research"}
        </h1>
        <p className="text-2xl md:text-4xl font-serif leading-relaxed text-foreground max-w-4xl border-l-2 border-accent pl-6">
          My research interests lie at the interface of mathematical analysis, partial differential equations, pseudo-differential operators, microlocal analysis, and mathematical modeling.
        </p>
      </header>

      {/* Interactive Research Map */}
      <ResearchMap />

      {/* Research Domains Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-24">
         
         <div className="border-t border-border pt-8">
            <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-6">
              Primary Domain
            </h2>
            <h3 className="text-4xl font-serif font-bold mb-6">Mathematical Analysis</h3>
            <p className="text-muted-foreground font-light leading-relaxed mb-6">
              Exploring the rigorous foundations of functional analysis, operator theory, and spectral theory to understand the properties of differential operators.
            </p>
            <ul className="space-y-2 text-sm text-foreground mb-8">
               <li className="flex items-center gap-2"><span className="w-1 h-1 bg-accent rounded-full"></span> Functional Analysis</li>
               <li className="flex items-center gap-2"><span className="w-1 h-1 bg-accent rounded-full"></span> Operator Theory</li>
               <li className="flex items-center gap-2"><span className="w-1 h-1 bg-accent rounded-full"></span> PDEs</li>
               <li className="flex items-center gap-2"><span className="w-1 h-1 bg-accent rounded-full"></span> Spectral Theory</li>
            </ul>
            <Link href="/projects" className="text-sm font-semibold tracking-widest uppercase hover:text-accent transition-colors border-b border-foreground hover:border-accent pb-1">
              View Analysis Projects
            </Link>
         </div>

         <div className="border-t border-border pt-8">
            <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-6">
              Primary Domain
            </h2>
            <h3 className="text-4xl font-serif font-bold mb-6">Microlocal Analysis</h3>
            <p className="text-muted-foreground font-light leading-relaxed mb-6">
              Investigating singularities of solutions to PDEs using pseudo-differential operators, symbolic calculus, and wave-front sets in phase space.
            </p>
            <ul className="space-y-2 text-sm text-foreground mb-8">
               <li className="flex items-center gap-2"><span className="w-1 h-1 bg-accent rounded-full"></span> Pseudo-Differential Operators</li>
               <li className="flex items-center gap-2"><span className="w-1 h-1 bg-accent rounded-full"></span> Symbolic Calculus</li>
               <li className="flex items-center gap-2"><span className="w-1 h-1 bg-accent rounded-full"></span> Ellipticity & Parametrices</li>
               <li className="flex items-center gap-2"><span className="w-1 h-1 bg-accent rounded-full"></span> Wave-Front Sets</li>
            </ul>
            <Link href="/projects" className="text-sm font-semibold tracking-widest uppercase hover:text-accent transition-colors border-b border-foreground hover:border-accent pb-1">
              View Microlocal Projects
            </Link>
         </div>

         <div className="border-t border-border pt-8">
            <h2 className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-6">
              Secondary Domain
            </h2>
            <h3 className="text-4xl font-serif font-bold mb-6">Mathematical Modeling</h3>
            <p className="text-muted-foreground font-light leading-relaxed mb-6">
              Developing and analyzing dynamical systems to describe complex biological phenomena, particularly in mathematical epidemiology and ecology.
            </p>
            <ul className="space-y-2 text-sm text-foreground mb-8">
               <li className="flex items-center gap-2"><span className="w-1 h-1 bg-muted-foreground rounded-full"></span> Dynamical Systems</li>
               <li className="flex items-center gap-2"><span className="w-1 h-1 bg-muted-foreground rounded-full"></span> Mathematical Epidemiology</li>
               <li className="flex items-center gap-2"><span className="w-1 h-1 bg-muted-foreground rounded-full"></span> Nonlocal Models</li>
            </ul>
            <Link href="/projects" className="text-sm font-semibold tracking-widest uppercase hover:text-accent transition-colors border-b border-foreground hover:border-accent pb-1">
              View Modeling Projects
            </Link>
         </div>

         <div className="border-t border-border pt-8">
            <h2 className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-6">
              Computational Domain
            </h2>
            <h3 className="text-4xl font-serif font-bold mb-6">Scientific Computing</h3>
            <p className="text-muted-foreground font-light leading-relaxed mb-6">
              Leveraging computational tools and machine learning to simulate mathematical models, perform biostatistical analysis, and visualize complex data.
            </p>
            <ul className="space-y-2 text-sm text-foreground mb-8">
               <li className="flex items-center gap-2"><span className="w-1 h-1 bg-muted-foreground rounded-full"></span> Python & R</li>
               <li className="flex items-center gap-2"><span className="w-1 h-1 bg-muted-foreground rounded-full"></span> MATLAB & C/C++</li>
               <li className="flex items-center gap-2"><span className="w-1 h-1 bg-muted-foreground rounded-full"></span> Machine Learning</li>
            </ul>
            <Link href="/projects" className="text-sm font-semibold tracking-widest uppercase hover:text-accent transition-colors border-b border-foreground hover:border-accent pb-1">
              View Computational Projects
            </Link>
         </div>

      </div>
    </div>
  );
}
