import { getTranslations } from "next-intl/server";
import MathRenderer from "@/components/MathRenderer";
import { ArrowUpRight } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Navigation' });
  return { title: `MD.G | ${t('projects')}` };
}

export default async function Projects({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const projectsData = locale === 'fr' 
    ? (await import("@/data/projects.fr.json")).default 
    : (await import("@/data/projects.en.json")).default;

  const t = await getTranslations({ locale, namespace: 'Projects' });

  return (
    <div className="min-h-screen px-6 py-24 md:px-16 lg:px-24 max-w-6xl mx-auto">
      <header className="mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-6">
          {t("title")}
        </h1>
        <p className="text-lg md:text-xl font-light text-muted-foreground leading-relaxed max-w-2xl">
          {t("description")}
        </p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {projectsData.map((project: any) => (
          <article 
            key={project.id} 
            className="group relative p-8 rounded-2xl border bg-card hover:bg-card/50 transition-all duration-500 overflow-hidden"
          >
            {/* Subtle background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="text-xs font-mono font-medium text-accent tracking-wider uppercase bg-accent/10 px-3 py-1 rounded-full">
                  {project.category.replace("-", " ")}
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  {project.date}
                </div>
              </div>
              
              <h2 className="text-2xl font-serif font-semibold mb-4 pr-8 group-hover:text-accent transition-colors">
                {project.title}
                <ArrowUpRight className="absolute top-8 right-8 w-5 h-5 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-accent" />
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-8 flex-1">
                {project.abstract}
              </p>
              
              {project.math && (
                <div className="mt-auto pt-6 border-t border-border/50">
                  <div className="text-xs text-muted-foreground/60 uppercase tracking-widest mb-3">{t("mathFramework")}</div>
                  <MathRenderer math={project.math} block={true} />
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
