import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function NotFoundPage() {
  const t = useTranslations('Navigation');
  
  return (
    <div className="min-h-screen px-6 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-6">
          404
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          This page could not be found.
        </p>
        <Link 
          href="/"
          className="bg-accent text-white px-8 py-3 rounded-full font-medium hover:scale-105 active:scale-95 transition-all inline-flex shadow-lg"
        >
          {t('home')}
        </Link>
      </div>
    </div>
  );
}
