"use client";

import { useEffect, useRef } from "react";

type Delay = 1 | 2 | 3 | 4 | 5 | 6;

export default function Reveal({
  as: Tag = "div",
  delay,
  className = "",
  children,
  ...rest
}: {
  as?: React.ElementType;
  delay?: Delay;
  className?: string;
  children: React.ReactNode;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const delayClass = delay ? `d${delay}` : "";

  return (
    <Tag
      ref={ref}
      className={`reveal ${delayClass} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Tag>
  );
}
