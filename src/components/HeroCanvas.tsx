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
    let width = 0;
    let height = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight;
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    };

    window.addEventListener("resize", resize);
    resize();

    const draw = () => {
      time += 0.005;
      ctx.clearRect(0, 0, width, height);

      const isDark = resolvedTheme === "dark";
      const baseColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
      const accentColor = isDark ? "rgba(99, 102, 241, 0.3)" : "rgba(79, 70, 229, 0.3)";
      const textColor = isDark ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.4)";

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw vector field
      ctx.strokeStyle = baseColor;
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < width; x += step) {
        for (let y = 0; y < height; y += step) {
          const dx = Math.sin((y - centerY) * 0.01 + time);
          const dy = Math.cos((x - centerX) * 0.01 + time);
          const len = 10;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + dx * len, y + dy * len);
          ctx.stroke();
        }
      }

      // Draw trajectories
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        let px = width * 0.1 + (i * width * 0.2);
        let py = height * 0.5 + Math.sin(time + i) * 100;
        ctx.moveTo(px, py);
        for (let j = 0; j < 50; j++) {
          const dx = Math.sin((py - centerY) * 0.01 + time) * 15;
          const dy = Math.cos((px - centerX) * 0.01 + time) * 15;
          px += dx;
          py += dy;
          ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      // Draw some math notation
      ctx.fillStyle = textColor;
      ctx.font = "italic 16px 'Times New Roman', serif";
      ctx.fillText("(x, ξ)", width * 0.7, height * 0.3 + Math.sin(time) * 10);
      ctx.fillText("Op(a)", width * 0.3, height * 0.7 + Math.cos(time) * 10);
      ctx.fillText("WF(u)", width * 0.8, height * 0.8 + Math.sin(time * 1.5) * 10);

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
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
      aria-hidden="true"
    />
  );
}
