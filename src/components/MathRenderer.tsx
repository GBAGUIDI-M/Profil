"use client";

import React from "react";
import katex from "katex";

interface MathRendererProps {
  math: string;
  block?: boolean;
}

export default function MathRenderer({ math, block = false }: MathRendererProps) {
  const html = React.useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
        errorColor: "#cc0000",
        strict: false,
      });
    } catch (e) {
      console.error("KaTeX error", e);
      return math;
    }
  }, [math, block]);

  return (
    <span
      className={`math-renderer ${block ? "block overflow-x-auto my-4 py-2" : "inline-block"}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
