import { useTranslations } from "next-intl";
import publicationsData from "@/data/publications.json";
import { getTranslations } from "next-intl/server";
import { FileText, ExternalLink } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Navigation' });
  return { title: `MD.G | ${t('publications')}` };
}

export default function Publications() {
  return (
    <div className="min-h-screen px-6 py-24 md:px-16 lg:px-24 max-w-5xl mx-auto">
      <header className="mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-6">
          Publications
        </h1>
        <p className="text-lg md:text-xl font-light text-muted-foreground leading-relaxed max-w-2xl">
          Academic papers, theses, and preprints across pure mathematics, biostatistics, and applied computational modeling.
        </p>
      </header>

      <div className="space-y-6">
        {publicationsData.map((pub) => (
          <article 
            key={pub.id} 
            className="p-6 md:p-8 rounded-xl border bg-card hover:border-accent/30 transition-colors flex flex-col md:flex-row gap-6"
          >
            {/* Year Badge */}
            <div className="flex-shrink-0 pt-1 hidden md:block">
              <span className="text-xl font-serif font-semibold text-muted-foreground/40">{pub.year}</span>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="md:hidden text-sm font-semibold text-accent">{pub.year}</span>
                <span className="px-2 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-md uppercase tracking-wider">
                  {pub.type}
                </span>
                <span className="px-2 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-md uppercase tracking-wider">
                  {pub.area}
                </span>
              </div>
              
              <h2 className="text-xl md:text-2xl font-serif font-semibold mb-2">
                {pub.title}
              </h2>
              
              <div className="text-sm text-foreground/80 mb-2">
                {pub.authors.join(", ")}
              </div>
              
              <div className="text-sm text-muted-foreground italic mb-4">
                {pub.journal}
              </div>
              
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {pub.abstract}
              </p>
              
              <div className="flex gap-4">
                {pub.pdf && pub.pdf !== "#" && (
                  <a href={pub.pdf} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-medium text-accent hover:text-foreground transition-colors uppercase tracking-wider">
                    <FileText className="w-4 h-4" /> PDF
                  </a>
                )}
                {/* Simulated DOI Link */}
                <a href="#" className="flex items-center gap-2 text-xs font-medium text-accent hover:text-foreground transition-colors uppercase tracking-wider">
                  <ExternalLink className="w-4 h-4" /> DOI
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
