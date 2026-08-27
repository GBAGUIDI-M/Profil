"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/routing";
import { motion } from "framer-motion";
import { Home, User, BookOpen, Layers, Book, Briefcase, Mail, FileText, Image as ImageIcon, Globe } from "lucide-react";

export default function Navigation() {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();

  const toggleLanguage = () => {
    const nextLocale = locale === 'en' ? 'fr' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  const navItems = [
    { name: t("home"), path: "/", icon: Home },
    { name: t("research"), path: "/research", icon: Layers },
    { name: t("publications"), path: "/publications", icon: Book },
    { name: t("projects"), path: "/projects", icon: Briefcase },
    { name: t("gallery"), path: "/gallery", icon: ImageIcon },
    { name: t("about"), path: "/about", icon: User },
    // { name: t("cv"), path: "/cv", icon: FileText },
    { name: t("contact"), path: "/contact", icon: Mail },
  ];

  return (
    <>
      {/* Desktop Sidebar Navigation */}
      <nav className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 border-r bg-background/80 backdrop-blur-md z-50 p-8">
        <div className="mb-12">
          <Link href="/" className="flex flex-col gap-1 group">
            <span className="font-serif font-bold text-xl tracking-tight group-hover:text-accent transition-colors">
              MD.G
            </span>
            <span className="text-xs text-muted-foreground uppercase tracking-widest">
              Research
            </span>
          </Link>
        </div>
        
        <ul className="flex flex-col gap-4">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center gap-4 text-sm transition-all duration-300 relative group ${
                    isActive ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                  <span>{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute -left-4 w-1 h-full bg-accent rounded-r"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Language / Theme toggles could go here at the bottom */}
        <div className="mt-auto pb-8 flex items-center gap-4 text-xs text-muted-foreground font-medium">
           <button onClick={toggleLanguage} className="hover:text-foreground transition-colors flex items-center gap-2 border border-border/50 px-3 py-1.5 rounded-full bg-muted/30">
             <Globe className="w-4 h-4" />
             {locale === 'en' ? 'FR' : 'EN'}
           </button>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-background/90 backdrop-blur-lg border-t z-50 flex items-center justify-around px-2 pb-safe">
        {navItems.slice(0, 5).map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
                isActive ? "text-accent" : "text-muted-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Mobile Language Toggle (Top Right) */}
      <div className="md:hidden fixed top-6 right-6 z-50">
        <button 
          onClick={toggleLanguage} 
          className="bg-background/80 backdrop-blur-md border border-border/50 text-foreground text-xs font-medium px-3 py-1.5 rounded-full shadow-sm hover:shadow transition-all"
        >
          {locale === 'en' ? 'FR' : 'EN'}
        </button>
      </div>
    </>
  );
}
