'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const MATH_TERMS = [
  '(x, ξ)',
  'T*Ω',
  'Op(a)',
  'WF(u)',
  'a(x, ξ)',
  '∂u/∂t = Δu',
  '∫ e^{ix·ξ} a(x,ξ) û(ξ) dξ',
  'u ∈ H^s(Ω)',
  'P(x, D)',
  'σ(P)(x, ξ)',
];

export default function MathVisualization() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none opacity-[0.03] dark:opacity-[0.05] z-0">
      {MATH_TERMS.map((term, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: i * 0.2, ease: "easeOut" }}
          className="absolute font-serif text-2xl whitespace-nowrap"
          style={{
            left: `${10 + (i * 27) % 80}%`,
            top: `${10 + (i * 17) % 80}%`,
            transform: `rotate(${(i * 15) % 30 - 15}deg)`,
          }}
        >
          {term}
        </motion.div>
      ))}
      <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border opacity-50" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}
