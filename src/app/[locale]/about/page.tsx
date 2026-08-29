import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/routing";

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
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-16 max-w-5xl mx-auto">
      <header className="mb-24">
        <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tight mb-12">
          About
        </h1>
        <p className="text-2xl md:text-4xl font-serif leading-relaxed text-foreground mb-8">
          I am a mathematician trained across pure mathematics, mathematical sciences, and biostatistics. My research interests lie at the interface of mathematical analysis, partial differential equations, operator theory, microlocal analysis, and mathematical modeling.
        </p>
      </header>

      <div className="space-y-32">
        {/* Research Trajectory */}
        <section>
          <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-12 border-b border-border pb-4">
            Research Trajectory
          </h2>
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-sm tracking-widest uppercase text-muted-foreground pt-2">Future</div>
              <div className="md:col-span-3">
                <h3 className="text-2xl font-serif font-bold mb-2">PhD Research</h3>
                <p className="text-muted-foreground font-light leading-relaxed">Focusing on microlocal analysis, pseudo-differential operators, and partial differential equations.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-sm tracking-widest uppercase text-muted-foreground pt-2">2026</div>
              <div className="md:col-span-3">
                <h3 className="text-2xl font-serif font-bold mb-2">Microlocal Analysis</h3>
                <p className="text-muted-foreground font-light leading-relaxed">Investigating pseudo-differential operators and wave-front sets at AIMS South Africa.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-sm tracking-widest uppercase text-muted-foreground pt-2">2023–2025</div>
              <div className="md:col-span-3">
                <h3 className="text-2xl font-serif font-bold mb-2">Biostatistics & Mathematical Modeling</h3>
                <p className="text-muted-foreground font-light leading-relaxed">Structural robustness of SEIR models, biostatistical analysis, and mathematical epidemiology.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-sm tracking-widest uppercase text-muted-foreground pt-2">2017–2021</div>
              <div className="md:col-span-3">
                <h3 className="text-2xl font-serif font-bold mb-2">Fundamental Mathematics</h3>
                <p className="text-muted-foreground font-light leading-relaxed">Rigorous foundations in real/complex analysis, algebra, and topology.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-12 border-b border-border pb-4">
            Education
          </h2>
          <div className="flex flex-col gap-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-sm tracking-widest uppercase text-muted-foreground pt-2">2025–2026</div>
              <div className="md:col-span-3">
                <h3 className="text-2xl font-serif font-bold mb-2">MSc in Mathematical Sciences</h3>
                <p className="text-lg text-foreground mb-4">African Institute for Mathematical Sciences (AIMS South Africa) — Degree awarded by Stellenbosch University</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-sm tracking-widest uppercase text-muted-foreground pt-2">2023–2025</div>
              <div className="md:col-span-3">
                <h3 className="text-2xl font-serif font-bold mb-2">MSc in Biostatistics</h3>
                <p className="text-lg text-foreground mb-4">University of Abomey-Calavi</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-sm tracking-widest uppercase text-muted-foreground pt-2">2023–2025</div>
              <div className="md:col-span-3">
                <h3 className="text-2xl font-serif font-bold mb-2">MSc in Pure & Applied Mathematics</h3>
                <p className="text-lg text-foreground mb-4">University of Abomey-Calavi</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-sm tracking-widest uppercase text-muted-foreground pt-2">2017–2021</div>
              <div className="md:col-span-3">
                <h3 className="text-2xl font-serif font-bold mb-2">BSc in Fundamental Mathematics</h3>
                <p className="text-lg text-foreground mb-4">University of Abomey-Calavi</p>
              </div>
            </div>
          </div>
        </section>

        {/* Research Experience */}
        <section>
          <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-12 border-b border-border pb-4">
            Research Experience
          </h2>
          <div className="flex flex-col gap-12">
            {cvData.experience.filter((e: any) => e.role.includes("Research") || e.role.includes("Intern") || e.role.includes("Modeling")).map((exp: any, idx: number) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-sm tracking-widest uppercase text-muted-foreground pt-2">{exp.date}</div>
                <div className="md:col-span-3">
                  <h3 className="text-2xl font-serif font-bold mb-2">{exp.role}</h3>
                  <p className="text-lg text-foreground mb-4">{exp.institution}</p>
                  <p className="text-muted-foreground font-light leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Teaching */}
        <section>
          <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-12 border-b border-border pb-4">
            Teaching
          </h2>
          <div className="flex flex-col gap-12">
            {cvData.experience.filter((e: any) => e.role.includes("Teacher") || e.role.includes("Professeur")).map((exp: any, idx: number) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-sm tracking-widest uppercase text-muted-foreground pt-2">{exp.date}</div>
                <div className="md:col-span-3">
                  <h3 className="text-2xl font-serif font-bold mb-2">{exp.role}</h3>
                  <p className="text-lg text-foreground mb-4">{exp.institution}</p>
                  <p className="text-muted-foreground font-light leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Awards */}
        <section>
          <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-12 border-b border-border pb-4">
            Awards & Scholarships
          </h2>
          <div className="flex flex-col gap-8">
            {cvData.scholarships.map((award: any, idx: number) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-sm tracking-widest uppercase text-muted-foreground pt-2">{award.date}</div>
                <div className="md:col-span-3">
                  <h3 className="text-xl font-serif font-bold mb-2">{award.title}</h3>
                  <p className="text-muted-foreground font-light leading-relaxed">{award.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Scientific Training */}
        <section>
          <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-12 border-b border-border pb-4">
            Scientific Training
          </h2>
          <div className="flex flex-col gap-8">
            {cvData.certifications.map((cert: any, idx: number) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-sm tracking-widest uppercase text-muted-foreground pt-2">{cert.date || "Ongoing"}</div>
                <div className="md:col-span-3">
                  <h3 className="text-xl font-serif font-bold mb-1">{cert.title}</h3>
                  <p className="text-muted-foreground font-medium mb-2">{cert.issuer}</p>
                  {cert.description && (
                    <p className="text-muted-foreground font-light leading-relaxed">{cert.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-12 border-b border-border pb-4">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-serif font-bold mb-6">Mathematics</h3>
              <ul className="space-y-3 text-muted-foreground font-light">
                <li>Functional Analysis</li>
                <li>Operator Theory</li>
                <li>Partial Differential Equations</li>
                <li>Microlocal Analysis</li>
                <li>Dynamical Systems</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold mb-6 border-l-2 border-accent pl-4">Modeling & Statistics</h3>
              <ul className="space-y-3 text-muted-foreground font-light">
                <li>Mathematical Epidemiology</li>
                <li>Biostatistics</li>
                <li>Statistical Modeling</li>
                <li>Sensitivity Analysis</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold mb-6">Scientific Computing</h3>
              <ul className="space-y-3 text-muted-foreground font-light flex flex-wrap gap-x-6">
                <li>Python</li>
                <li>R</li>
                <li>MATLAB</li>
                <li>C/C++</li>
                <li>Julia</li>
                <li>LaTeX</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Beyond Mathematics */}
        <section className="pt-24 opacity-60 hover:opacity-100 transition-opacity">
          <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-8">
            Beyond Mathematics
          </h2>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground font-light">
            {cvData.interests.map((interest: string, idx: number) => (
              <span key={idx} className="border border-border px-4 py-2">
                {interest}
              </span>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
