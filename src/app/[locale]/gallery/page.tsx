import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/routing";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Navigation' });
  return { title: `MD.G | ${t('gallery')}` };
}

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const galleryData = locale === 'fr' 
    ? (await import("@/data/gallery.fr.json")).default 
    : (await import("@/data/gallery.en.json")).default;

  const t = await getTranslations({ locale, namespace: 'Gallery' });

  return (
    <div className="min-h-screen px-6 py-24 md:px-16 lg:px-24 max-w-5xl mx-auto">
      <header className="mb-16 border-b pb-8">
        <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-6">
          {t("title")}
        </h1>
        <p className="text-lg md:text-xl font-light text-muted-foreground leading-relaxed max-w-2xl">
          {t("description")}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {galleryData.map((event: any) => {
          const coverImage = event.coverImage || ((event as any).images && (event as any).images.length > 0 ? (event as any).images[0] : null);

          return (
            <Link 
              href={`/gallery/${event.id}`} 
              key={event.id}
              className="group flex flex-col rounded-2xl border bg-card overflow-hidden hover:border-accent/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              {/* Cover Image */}
              <div className="relative aspect-[4/3] w-full bg-muted overflow-hidden">
                {coverImage ? (
                  <Image 
                    src={coverImage} 
                    alt={event.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-accent/5">
                    <span className="font-serif text-accent/30 text-2xl font-bold">MD.G</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-xs text-accent font-medium uppercase tracking-wider mb-3">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {event.date}</span>
                </div>
                
                <h2 className="text-2xl font-serif font-bold mb-3 group-hover:text-accent transition-colors line-clamp-2">
                  {event.title}
                </h2>
                
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-6 flex-1">
                  {event.summary}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {event.location}
                  </span>
                  <span className="text-sm font-medium text-accent flex items-center gap-1 group-hover:gap-2 transition-all">
                    {t("readMore")} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
