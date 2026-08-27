"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Network, Activity, Cpu, Calculator } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Research() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const t = useTranslations("Research");

  const RESEARCH_AREAS = [
    {
      id: "analysis",
      title: t("areas.analysis"),
      icon: Calculator,
      color: "from-blue-500/20 to-transparent",
      topics: t.raw("areas.analysisTopics"),
      position: { x: "20%", y: "20%" },
    },
    {
      id: "microlocal",
      title: t("areas.microlocal"),
      icon: Network,
      color: "from-indigo-500/20 to-transparent",
      topics: t.raw("areas.microlocalTopics"),
      position: { x: "60%", y: "30%" },
    },
    {
      id: "biomath",
      title: t("areas.biomath"),
      icon: Activity,
      color: "from-emerald-500/20 to-transparent",
      topics: t.raw("areas.biomathTopics"),
      position: { x: "30%", y: "70%" },
    },
    {
      id: "ai",
      title: t("areas.ai"),
      icon: Cpu,
      color: "from-purple-500/20 to-transparent",
      topics: t.raw("areas.aiTopics"),
      position: { x: "70%", y: "60%" },
    },
  ];

  return (
    <div className="min-h-screen px-6 py-24 md:px-16 lg:px-24 max-w-7xl mx-auto flex flex-col relative">
      <header className="mb-12 z-20">
        <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-6">
          {t("title")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          {t("description")}
        </p>
      </header>

      {/* Interactive Constellation Map */}
      <div className="flex-1 relative w-full min-h-[600px] border border-border/50 rounded-3xl bg-background/50 overflow-hidden shadow-inner">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* Connections (SVG Lines) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          <line x1="20%" y1="20%" x2="60%" y2="30%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="20%" y1="20%" x2="30%" y2="70%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="30%" y1="70%" x2="70%" y2="60%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="60%" y1="30%" x2="70%" y2="60%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        </svg>

        {/* Nodes */}
        {RESEARCH_AREAS.map((area) => {
          const Icon = area.icon;
          const isActive = activeNode === area.id;
          
          return (
            <motion.div
              key={area.id}
              className={`absolute cursor-pointer -translate-x-1/2 -translate-y-1/2 group`}
              style={{ left: area.position.x, top: area.position.y }}
              onHoverStart={() => setActiveNode(area.id)}
              onHoverEnd={() => setActiveNode(null)}
              animate={isActive ? { scale: 1.05 } : { scale: 1 }}
            >
              <div className={`relative flex flex-col items-center gap-4 transition-all duration-500 ${isActive ? 'z-30' : 'z-10'}`}>
                {/* Node visual */}
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full border border-border bg-card flex items-center justify-center shadow-lg transition-all duration-500 ${isActive ? 'shadow-accent/20 border-accent' : ''}`}>
                  <Icon className={`w-8 h-8 transition-colors duration-300 ${isActive ? 'text-accent' : 'text-muted-foreground'}`} />
                  
                  {/* Subtle animated ring */}
                  {isActive && (
                    <motion.div 
                      className="absolute inset-0 rounded-full border-2 border-accent/30"
                      animate={{ scale: [1, 1.3], opacity: [0.8, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </div>

                {/* Node Label */}
                <div className="bg-background/80 backdrop-blur-md px-4 py-2 rounded-full border shadow-sm">
                  <h3 className={`text-sm font-semibold tracking-wide whitespace-nowrap transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                    {area.title}
                  </h3>
                </div>

                {/* Topics Panel */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full mt-4 w-64 bg-card border rounded-2xl shadow-2xl overflow-hidden z-40"
                    >
                      <div className={`h-1 w-full bg-gradient-to-r ${area.color}`} />
                      <div className="p-4">
                        <ul className="space-y-2">
                          {area.topics.map((topic: string, i: number) => (
                            <motion.li 
                              key={i} 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="text-sm text-muted-foreground flex items-center gap-2"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-accent/50" />
                              {topic}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
