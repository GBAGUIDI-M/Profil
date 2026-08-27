import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Mail, Linkedin, Github, FileText, Download } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Navigation' });
  return { title: `MD.G | ${t('contact')}` };
}

export default function Contact() {
  const tCV = useTranslations("CV");

  return (
    <div className="min-h-screen px-6 py-24 md:px-16 lg:px-24 flex items-center justify-center max-w-4xl mx-auto">
      <div className="w-full text-center">
        <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-8">
          Open a conversation
        </h1>
        
        <p className="text-lg md:text-xl font-light text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-16">
          I am currently open to research collaborations and academic discussions bridging mathematics and computation.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-20">
          <a 
            href="mailto:mannonde@aims.ac.za" 
            className="group flex flex-col items-center gap-3 text-muted-foreground hover:text-accent transition-colors"
          >
            <div className="w-16 h-16 rounded-full bg-card border flex items-center justify-center group-hover:border-accent group-hover:shadow-lg transition-all">
              <Mail className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium">Email</span>
          </a>
          
          <a 
            href="https://linkedin.com/in/mannonde-gbaguidi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 text-muted-foreground hover:text-accent transition-colors"
          >
            <div className="w-16 h-16 rounded-full bg-card border flex items-center justify-center group-hover:border-accent group-hover:shadow-lg transition-all">
              <Linkedin className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium">LinkedIn</span>
          </a>
          
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 text-muted-foreground hover:text-accent transition-colors"
          >
            <div className="w-16 h-16 rounded-full bg-card border flex items-center justify-center group-hover:border-accent group-hover:shadow-lg transition-all">
              <Github className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium">GitHub</span>
          </a>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
          <a 
            href="/CV_Gbaguidi_EN.pdf" 
            download="CV_Mannonde_Gbaguidi_EN.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center p-8 rounded-2xl border bg-card hover:border-accent/50 hover:bg-accent/5 transition-all duration-300 w-full sm:w-64 shadow-sm hover:shadow-md"
          >
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Download className="w-6 h-6 text-accent" />
            </div>
            <span className="text-base font-medium tracking-wide">
              {tCV("downloadEn")}
            </span>
            <span className="text-xs text-muted-foreground mt-1">PDF Document</span>
          </a>

          <a 
            href="/CV_GbaguidiFr.pdf" 
            download="CV_Mannonde_Gbaguidi_FR.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center p-8 rounded-2xl border bg-card hover:border-accent/50 hover:bg-accent/5 transition-all duration-300 w-full sm:w-64 shadow-sm hover:shadow-md"
          >
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Download className="w-6 h-6 text-accent" />
            </div>
            <span className="text-base font-medium tracking-wide">
              {tCV("downloadFr")}
            </span>
            <span className="text-xs text-muted-foreground mt-1">Document PDF</span>
          </a>
        </div>
      </div>
    </div>
  );
}
