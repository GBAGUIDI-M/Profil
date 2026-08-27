import galleryData from "@/data/gallery.json";
import Image from "next/image";
import { Link } from "@/routing";
import { notFound } from "next/navigation";
import { Calendar, MapPin, ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import fs from "fs";
import path from "path";
import ImageGallery from "@/components/ImageGallery";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { id } = await params;
  const event = galleryData.find((e) => e.id === id);
  if (!event) return { title: 'Not Found' };
  return { title: `MD.G | ${event.title}` };
}

export default async function GalleryDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { id } = await params;
  const event = galleryData.find((e) => e.id === id);

  if (!event) {
    notFound();
  }

  let images = event.images || [];

  if (event.imageFolder) {
    const dirPath = path.join(process.cwd(), "public", event.imageFolder);
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath).filter((file) =>
        file.match(/\.(jpg|jpeg|png|gif|webp)$/i)
      );
      // Create absolute paths from the public directory root
      images = files.map((file) => `/${event.imageFolder}/${file}`);
    }
  }

  return (
    <div className="min-h-screen px-6 py-24 md:px-16 lg:px-24 max-w-4xl mx-auto">
      <Link 
        href="/gallery" 
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors mb-12"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Gallery
      </Link>

      <header className="mb-12">
        <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-accent uppercase tracking-widest mb-6">
          <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {event.date}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-border"></span>
          <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {event.location}</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight mb-8 leading-tight">
          {event.title}
        </h1>
        <div className="w-24 h-1 bg-accent rounded-full"></div>
      </header>

      <article className="prose prose-lg dark:prose-invert max-w-none mb-20 text-muted-foreground font-light leading-relaxed">
        {event.content.split('\n').map((paragraph, idx) => (
          <p key={idx} className="mb-6">{paragraph}</p>
        ))}
      </article>

      <ImageGallery images={images} title={event.title} />
    </div>
  );
}
