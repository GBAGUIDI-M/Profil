"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/routing";

export default function JournalClient({ journalData }: { journalData: any[] }) {
  const [filter, setFilter] = useState("All");
  
  const categories = ["All", "Research Notes", "Academic Stories", "Conferences", "Gallery"];
  
  const filteredData = filter === "All" 
    ? journalData 
    : journalData.filter(entry => entry.type === filter || (filter === "Gallery" && !entry.type));

  return (
    <>
      <div className="flex gap-4 mb-16 overflow-x-auto pb-4 no-scrollbar">
        {categories.map(cat => (
          <span 
            key={cat}
            onClick={() => setFilter(cat)}
            className={`text-sm tracking-widest uppercase font-semibold cursor-pointer transition-colors ${
              filter === cat ? "text-foreground border-b-2 border-accent pb-1" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredData.map((entry: any, index: number) => {
          const coverImage = entry.coverImage || (entry.images && entry.images.length > 0 ? entry.images[0] : null);
          
          return (
            <Link 
              href={`/journal/${entry.id}`} 
              key={entry.id}
              className="group flex flex-col border border-border bg-card hover:border-accent transition-colors overflow-hidden"
            >
              {coverImage && (
                <div className="relative w-full overflow-hidden shrink-0 aspect-[4/3]">
                  <Image 
                    src={coverImage} 
                    alt={entry.title} 
                    fill 
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                  />
                </div>
              )}
              
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-3 text-xs tracking-widest text-muted-foreground uppercase mb-4">
                  <span>{entry.date || "2026"}</span>
                  <span className="w-1 h-1 rounded-full bg-accent"></span>
                  <span className="text-accent">{entry.type || "Gallery"}</span>
                </div>
                
                <h2 className="text-2xl font-serif font-bold mb-4 leading-tight group-hover:text-accent transition-colors">
                  {entry.title}
                </h2>
                
                <p className="text-muted-foreground font-light leading-relaxed mb-6">
                  {entry.summary || entry.description}
                </p>

                <div className="mt-auto inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-foreground group-hover:text-accent transition-colors">
                  Read Entry <span className="text-accent">→</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
