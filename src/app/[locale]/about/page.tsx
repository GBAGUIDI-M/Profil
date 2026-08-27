import { useTranslations } from "next-intl";

import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Navigation' });
  return { title: `MD.G | ${t('about')}` };
}

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const cvData = locale === 'fr' 
    ? (await import("@/data/cv.fr.json")).default 
    : (await import("@/data/cv.en.json")).default;
    
  const t = await getTranslations({ locale, namespace: 'About' });

  return (
    <div className="min-h-screen px-6 py-24 md:px-16 lg:px-24 max-w-5xl mx-auto">
      <header className="mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-6">
          {t("whoIAm")}
        </h1>
        <p className="text-lg md:text-xl font-light text-muted-foreground leading-relaxed">
          {t("description")}
        </p>
      </header>

      <section className="mb-24">
        <h2 className="text-2xl font-serif font-semibold mb-8 flex items-center gap-4">
          <span className="w-8 h-[1px] bg-border block"></span>
          {t("academicJourney")}
        </h2>
        <div className="space-y-12 border-l border-border ml-2 pl-8 relative">
          {cvData.education.map((edu: any) => (
            <div key={edu.id} className="relative group">
              <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-background border-2 border-accent group-hover:bg-accent transition-colors" />
              <div className="mb-1 text-sm font-medium text-accent tracking-wider uppercase">
                {edu.date}
              </div>
              <h3 className="text-xl font-medium mb-1">{edu.degree}</h3>
              <div className="text-muted-foreground text-sm mb-4">
                {edu.institution} &middot; {edu.location}
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {edu.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-24">
        <h2 className="text-2xl font-serif font-semibold mb-8 flex items-center gap-4">
          <span className="w-8 h-[1px] bg-border block"></span>
          {t("experience")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cvData.experience.map((exp: any) => (
            <div key={exp.id} className="p-6 rounded-xl border bg-card hover:border-accent/50 transition-colors">
              <div className="mb-2 text-xs font-medium text-accent tracking-wider uppercase">
                {exp.date}
              </div>
              <h3 className="text-lg font-medium mb-1">{exp.role}</h3>
              <div className="text-muted-foreground text-sm mb-4">
                {exp.institution}
              </div>
              <p className="text-sm text-muted-foreground">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
