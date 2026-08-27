"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    const draw = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = resolvedTheme === "dark";
      const color = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)";
      const highlightColor = isDark ? "rgba(74, 122, 171, 0.15)" : "rgba(46, 92, 138, 0.1)"; // accent color

      // Create a phase-space inspired mathematical field
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      const numLines = 40;
      const pointsPerLine = 100;

      for (let i = 0; i < numLines; i++) {
        ctx.beginPath();
        
        // Use mathematical curves (Lissajous-like combined with waves)
        for (let j = 0; j < pointsPerLine; j++) {
          const t = (j / pointsPerLine) * Math.PI * 2;
          
          // Parametric equations for a beautiful topology-inspired shape
          const r = 200 + 100 * Math.sin(time + i * 0.1) + 50 * Math.cos(3 * t + time);
          
          // Add a subtle wave propagation element
          const wave = 30 * Math.sin(5 * t - time * 2 + i * 0.2);
          
          const x = centerX + (r + wave) * Math.cos(t + i * Math.PI * 2 / numLines) * (1 + 0.2 * Math.sin(time * 0.5));
          const y = centerY + (r + wave) * Math.sin(t + i * Math.PI * 2 / numLines) * (1 + 0.2 * Math.cos(time * 0.7));

          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.closePath();
        ctx.strokeStyle = (i % 5 === 0) ? highlightColor : color;
        ctx.lineWidth = (i % 5 === 0) ? 1.5 : 1;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10 h-full w-full opacity-60 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
}
