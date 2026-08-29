import { getTranslations } from "next-intl/server";
import { Download } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'CV' });
  return { title: `MD.G | ${t('title')}` };
}

export default async function CVPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const cvData = locale === 'fr' 
    ? (await import("@/data/cv.fr.json")).default 
    : (await import("@/data/cv.en.json")).default;

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-16 max-w-5xl mx-auto">
      <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
           <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tight mb-8">
             Curriculum Vitae
           </h1>
           <p className="text-xl md:text-2xl font-light text-muted-foreground leading-relaxed max-w-2xl border-l-2 border-accent pl-6">
             Academic background, research experience, and technical expertise.
           </p>
        </div>
        <div className="flex flex-col gap-4">
           <a 
             href="/CV_Gbaguidi_EN.pdf" 
             target="_blank"
             rel="noopener noreferrer"
             className="flex items-center gap-3 bg-foreground text-background px-6 py-3 font-semibold tracking-widest uppercase text-sm hover:bg-accent transition-colors"
           >
             <Download className="w-4 h-4" /> Download CV — English
           </a>
           <a 
             href="/CV_GbaguidiFr.pdf" 
             target="_blank"
             rel="noopener noreferrer"
             className="flex items-center gap-3 border border-border px-6 py-3 font-semibold tracking-widest uppercase text-sm hover:border-accent hover:text-accent transition-colors"
           >
             <Download className="w-4 h-4" /> Télécharger le CV — Français
           </a>
        </div>
      </header>

      <div className="space-y-24 bg-card border border-border p-8 md:p-16">
        
        {/* Profile */}
        <section>
          <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-8 border-b border-border pb-4">Profile</h2>
          <p className="text-lg leading-relaxed text-foreground font-serif">{cvData.profile}</p>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-8 border-b border-border pb-4">Education</h2>
          <div className="flex flex-col gap-8">
            {cvData.education.map((edu: any, idx: number) => (
              <div key={idx}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                  <h3 className="text-xl font-bold">{edu.degree}</h3>
                  <span className="text-sm tracking-widest uppercase text-muted-foreground whitespace-nowrap">{edu.date}</span>
                </div>
                <div className="text-sm font-semibold tracking-widest uppercase text-accent mb-2">{edu.institution}</div>
                <p className="text-muted-foreground font-light leading-relaxed">{edu.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-8 border-b border-border pb-4">Experience</h2>
          <div className="flex flex-col gap-8">
            {cvData.experience.map((exp: any, idx: number) => (
              <div key={idx}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                  <h3 className="text-xl font-bold">{exp.role}</h3>
                  <span className="text-sm tracking-widest uppercase text-muted-foreground whitespace-nowrap">{exp.date}</span>
                </div>
                <div className="text-sm font-semibold tracking-widest uppercase text-accent mb-2">{exp.institution}</div>
                <p className="text-muted-foreground font-light leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Awards */}
        <section>
          <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-8 border-b border-border pb-4">Awards & Scholarships</h2>
          <div className="flex flex-col gap-6">
            {cvData.scholarships.map((award: any, idx: number) => (
              <div key={idx}>
                <h3 className="text-lg font-bold mb-1">{award.title}</h3>
                <div className="text-xs tracking-widest uppercase text-muted-foreground mb-2">{award.date}</div>
                <p className="text-sm text-muted-foreground font-light">{award.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Skills */}
        <section>
          <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-8 border-b border-border pb-4">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cvData.skills.map((skillGroup: any, idx: number) => (
              <div key={idx}>
                <h3 className="text-lg font-bold mb-4">{skillGroup.category}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {skillGroup.items.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-accent mt-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
        
        {/* Languages */}
        <section>
          <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-8 border-b border-border pb-4">Languages</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {cvData.languages.map((lang: string, i: number) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-accent mt-2"></span>
                {lang}
              </li>
            ))}
          </ul>
        </section>

      </div>
    </div>
  );
}
