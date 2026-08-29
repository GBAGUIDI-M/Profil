"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "@/routing";

const nodes = [
  { id: "analysis", label: "Analysis", x: 20, y: 30, color: "text-foreground" },
  { id: "pdes", label: "PDEs", x: 40, y: 15, color: "text-foreground" },
  { id: "operator-theory", label: "Operator Theory", x: 45, y: 45, color: "text-foreground" },
  { id: "microlocal", label: "Microlocal Analysis", x: 65, y: 30, color: "text-accent" },
  { id: "pseudo-diff", label: "Pseudo-Differential Operators", x: 80, y: 50, color: "text-accent" },
  { id: "dynamical-systems", label: "Dynamical Systems", x: 25, y: 65, color: "text-muted-foreground" },
  { id: "biomath", label: "Mathematical Biology", x: 50, y: 75, color: "text-muted-foreground" },
  { id: "nonlocal", label: "Nonlocal Models", x: 75, y: 70, color: "text-muted-foreground" },
];

const edges = [
  { source: "analysis", target: "pdes" },
  { source: "analysis", target: "operator-theory" },
  { source: "pdes", target: "microlocal" },
  { source: "operator-theory", target: "microlocal" },
  { source: "microlocal", target: "pseudo-diff" },
  { source: "pdes", target: "nonlocal" },
  { source: "dynamical-systems", target: "biomath" },
  { source: "biomath", target: "nonlocal" },
  { source: "analysis", target: "dynamical-systems" },
];

export default function ResearchMap() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <div className="relative w-full h-[60vh] border border-border bg-card mt-12 mb-24 overflow-hidden group">
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {edges.map((edge, i) => {
          const source = nodes.find(n => n.id === edge.source);
          const target = nodes.find(n => n.id === edge.target);
          if (!source || !target) return null;
          
          const isHighlighted = hoveredNode === source.id || hoveredNode === target.id;
          
          return (
            <motion.line
              key={i}
              x1={`${source.x}%`}
              y1={`${source.y}%`}
              x2={`${target.x}%`}
              y2={`${target.y}%`}
              stroke="currentColor"
              strokeWidth={isHighlighted ? 2 : 1}
              className={`transition-all duration-300 ${isHighlighted ? "text-accent" : "text-border"}`}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: i * 0.1 }}
            />
          );
        })}
      </svg>
      
      {nodes.map((node, i) => (
        <motion.div
          key={node.id}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
            hoveredNode && hoveredNode !== node.id ? "opacity-30" : "opacity-100"
          }`}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          onMouseEnter={() => setHoveredNode(node.id)}
          onMouseLeave={() => setHoveredNode(null)}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <div className="flex flex-col items-center gap-2">
            <div className={`w-3 h-3 rounded-full bg-current ${node.color} ${hoveredNode === node.id ? "scale-150" : ""}`} />
            <span className={`text-sm font-semibold tracking-widest uppercase whitespace-nowrap bg-background/80 px-2 py-1 ${node.color}`}>
              {node.label}
            </span>
          </div>
        </motion.div>
      ))}
      
      {hoveredNode && (
        <div className="absolute bottom-6 left-6 p-6 border border-border bg-background max-w-sm">
           <h3 className="text-xl font-serif font-bold mb-2 uppercase tracking-widest text-accent">
             {nodes.find(n => n.id === hoveredNode)?.label}
           </h3>
           <p className="text-sm text-muted-foreground font-light mb-4">
             Explore ongoing projects and publications related to this mathematical domain.
           </p>
           <Link href="/projects" className="text-sm font-semibold tracking-widest text-foreground hover:text-accent transition-colors">
             View Research →
           </Link>
        </div>
      )}
    </div>
  );
}
