import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { GraduationCap, Briefcase, Award, FileText, Globe, Sparkles } from "lucide-react";

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
      <header className="mb-20">
        <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-8">
          {t("whoIAm")}
        </h1>
        <div className="p-8 rounded-3xl bg-accent/5 border relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-accent rounded-l-3xl"></div>
          <p className="text-lg md:text-xl font-light text-foreground leading-relaxed relative z-10">
            {t("description")}
          </p>
        </div>
      </header>

      {/* Academic Journey */}
      <section className="mb-24">
        <h2 className="text-2xl font-serif font-semibold mb-10 flex items-center gap-4">
          <GraduationCap className="w-6 h-6 text-accent" />
          {t("academicJourney")}
        </h2>
        <div className="space-y-12 border-l border-border ml-3 pl-8 relative">
          {cvData.education.map((edu: any) => (
            <div key={edu.id} className="relative group">
              <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-background border-2 border-accent group-hover:bg-accent transition-colors" />
              <div className="mb-2 text-sm font-bold text-accent tracking-widest uppercase">
                {edu.date}
              </div>
              <h3 className="text-xl font-bold mb-1">{edu.degree}</h3>
              <div className="text-muted-foreground text-sm font-medium mb-4 uppercase tracking-wide">
                {edu.institution} &middot; {edu.location}
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base bg-card p-4 rounded-xl border">
                {edu.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="mb-24">
        <h2 className="text-2xl font-serif font-semibold mb-10 flex items-center gap-4">
          <Briefcase className="w-6 h-6 text-accent" />
          {t("experience")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cvData.experience.map((exp: any) => (
            <div key={exp.id} className="p-8 rounded-2xl border bg-card hover:border-accent/50 hover:shadow-lg transition-all duration-300">
              <div className="mb-3 text-xs font-bold text-accent tracking-widest uppercase bg-accent/10 inline-block px-3 py-1 rounded-full">
                {exp.date}
              </div>
              <h3 className="text-lg font-bold mb-2">{exp.role}</h3>
              <div className="text-muted-foreground text-sm font-medium mb-4">
                {exp.institution}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="mb-24">
        <h2 className="text-2xl font-serif font-semibold mb-10 flex items-center gap-4">
          <FileText className="w-6 h-6 text-accent" />
          {t("certifications")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cvData.certifications.map((cert: any, idx: number) => (
            <div key={idx} className="p-6 rounded-2xl border bg-card/50 flex flex-col justify-between hover:bg-card transition-colors">
              <div>
                <h3 className="text-lg font-semibold mb-2">{cert.title}</h3>
                <div className="text-sm text-muted-foreground mb-4 font-medium">{cert.issuer}</div>
                {cert.description && (
                  <p className="text-sm text-muted-foreground/80 leading-relaxed">{cert.description}</p>
                )}
              </div>
              {cert.date && (
                <div className="mt-4 text-xs font-bold tracking-widest text-accent uppercase">{cert.date}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Workshops */}
      <section className="mb-24">
        <h2 className="text-2xl font-serif font-semibold mb-10 flex items-center gap-4">
          <Sparkles className="w-6 h-6 text-accent" />
          {t("workshops")}
        </h2>
        <ul className="space-y-4">
          {cvData.workshops.map((workshop: string, idx: number) => (
            <li key={idx} className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors">
              <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></span>
              <span className="text-foreground/80 leading-relaxed text-sm md:text-base">{workshop}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Languages and Interests */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-serif font-semibold mb-8 flex items-center gap-4">
            <Globe className="w-6 h-6 text-accent" />
            Languages
          </h2>
          <div className="flex flex-wrap gap-3">
            {cvData.languages.map((lang: string, idx: number) => (
              <span key={idx} className="px-4 py-2 rounded-full border bg-card text-sm font-medium shadow-sm">
                {lang}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-serif font-semibold mb-8 flex items-center gap-4">
            <Sparkles className="w-6 h-6 text-accent" />
            Interests
          </h2>
          <div className="flex flex-wrap gap-3">
            {cvData.interests.map((interest: string, idx: number) => (
              <span key={idx} className="px-4 py-2 rounded-full border bg-accent/5 text-sm font-medium shadow-sm">
                {interest}
              </span>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
