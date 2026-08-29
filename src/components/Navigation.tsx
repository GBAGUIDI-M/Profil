"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/routing";
import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";

export default function Navigation() {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    const nextLocale = locale === 'en' ? 'fr' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  const navItems = [
    { name: t("research"), path: "/research" },
    { name: t("publications"), path: "/publications" },
    { name: t("projects"), path: "/projects" },
    { name: t("journal"), path: "/journal" },
    { name: t("about"), path: "/about" },
    { name: t("cv"), path: "/cv" }
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/90 backdrop-blur-md border-b border-border py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex items-center justify-between">
          <Link href="/" className="flex flex-col group">
            <span className="font-serif font-bold text-2xl tracking-tight group-hover:text-accent transition-colors">
              MD.G
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.path) && item.path !== "/" || pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`text-sm font-semibold tracking-widest uppercase transition-colors hover:text-accent ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            
            <div className="flex items-center gap-6 ml-4 border-l border-border pl-8">
              <button onClick={toggleLanguage} className="text-sm font-semibold tracking-widest text-muted-foreground hover:text-accent flex items-center gap-2 transition-colors">
                <Globe className="w-4 h-4" />
                {locale.toUpperCase()}
              </button>
              <Link
                href="/contact"
                className="text-sm font-semibold tracking-widest uppercase bg-foreground text-background px-6 py-2 hover:bg-accent transition-colors"
              >
                {t("contact")}
              </Link>
            </div>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-foreground p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background flex flex-col pt-24 px-6">
          <nav className="flex flex-col gap-6 items-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-serif font-bold text-foreground hover:text-accent transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <div className="w-12 h-[1px] bg-border my-6"></div>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xl font-serif font-bold text-accent hover:text-foreground transition-colors"
            >
              {t("contact")}
            </Link>
            <button onClick={toggleLanguage} className="mt-8 text-sm font-semibold tracking-widest text-muted-foreground flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Language: {locale === 'en' ? 'FR' : 'EN'}
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
