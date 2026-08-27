import { routing } from '@/routing';
import Link from 'next/link';

export default function GlobalNotFound() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="bg-background text-foreground flex items-center justify-center min-h-screen font-sans">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">404 - Not Found</h1>
          <p className="text-muted-foreground mb-8">The page you are looking for does not exist.</p>
          <Link 
            href="/"
            className="bg-accent text-white px-6 py-3 rounded-full hover:bg-accent/90 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </body>
    </html>
  );
}
