import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/routing";
import JournalClient from "./JournalClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Navigation' });
  return { title: `MD.G | ${t('journal')}` };
}

export default async function JournalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const journalData = locale === 'fr' 
    ? (await import("@/data/journal.fr.json")).default 
    : (await import("@/data/journal.en.json")).default;

  const t = await getTranslations({ locale, namespace: 'Gallery' }); // we'll update the locale keys later, we can still use Gallery for now or just hardcode for demo.

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-16 max-w-7xl mx-auto">
      <header className="mb-24">
        <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tight mb-8">
          Journal
        </h1>
        <p className="text-xl md:text-2xl font-light text-muted-foreground leading-relaxed max-w-3xl border-l-2 border-accent pl-6">
          Research notes, academic stories, and moments from the scientific community.
        </p>
      </header>

      <JournalClient journalData={journalData} />
    </div>
  );
}
