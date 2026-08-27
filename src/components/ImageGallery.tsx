"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function ImageGallery({ images, title }: { images: string[], title: string }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    if (selectedImage) {
      window.addEventListener("keydown", handleKeyDown);
      // Prevent body scrolling when lightbox is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [selectedImage]);

  if (!images || images.length === 0) return null;

  return (
    <>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-8 flex items-center gap-4">
          <span className="w-8 h-[1px] bg-border block"></span>
          Photo Gallery
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.map((img, imgIdx) => (
            <div 
              key={imgIdx} 
              className="relative aspect-video rounded-2xl overflow-hidden border bg-muted shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group cursor-pointer"
              onClick={() => setSelectedImage(img)}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 z-10 transition-colors duration-500 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 text-white font-medium bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm transition-opacity duration-300 transform scale-95 group-hover:scale-100">
                  View Fullscreen
                </span>
              </div>
              <Image 
                src={img} 
                alt={`${title} - Image ${imgIdx + 1}`} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-2 sm:p-8 backdrop-blur-md cursor-zoom-out animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 z-[110]"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
            title="Close (Esc)"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div 
            className="relative w-full h-full max-w-7xl mx-auto flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image 
              src={selectedImage} 
              alt="Enlarged view" 
              fill 
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
