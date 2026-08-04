"use client";

import { useEffect, useRef } from "react";

const PALETTE = [
  "#C7A05A",
  "#B4543A",
  "#83A78E",
  "#5E7F91",
  "#CBA35F",
  "#E7DBBE",
];
const HEIGHTS = [180, 210, 150, 230, 170, 200, 160, 220, 190, 150, 205, 175];

export default function Bookshelf() {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const shelfRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const shelf = shelfRef.current;
    const shelfFrame = frameRef.current;
    if (!shelf) return;

    const spines: HTMLDivElement[] = [];
    const frag = document.createDocumentFragment();

    HEIGHTS.forEach((h, i) => {
      const s = document.createElement("div");
      s.className = "spine";
      s.style.height = h + "px";
      s.style.background = PALETTE[i % PALETTE.length];
      s.style.animationDelay = i * 0.045 + "s";
      s.style.setProperty("--bob-delay", i * 0.3 + "s");
      const glow = document.createElement("div");
      glow.className = "glow";
      s.appendChild(glow);
      s.addEventListener("mouseenter", () => {
        spines.forEach((sp, j) => {
          if (j === i - 1) sp.classList.add("lean-r");
          if (j === i + 1) sp.classList.add("lean-l");
        });
      });
      s.addEventListener("mouseleave", () => {
        spines.forEach((sp) => sp.classList.remove("lean-l", "lean-r"));
      });
      spines.push(s);
      frag.appendChild(s);
    });
    shelf.appendChild(frag);

    const onMove = (e: MouseEvent) => {
      const r = shelf.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      shelf.style.transform = `rotateY(${x * 4}deg) rotateX(${y * -3}deg)`;
    };
    const onLeave = () => {
      shelf.style.transform = "rotateY(0deg) rotateX(0deg)";
    };
    shelfFrame?.addEventListener("mousemove", onMove);
    shelfFrame?.addEventListener("mouseleave", onLeave);

    let sweepInterval: ReturnType<typeof setInterval> | undefined;
    const sweepTimeout = setTimeout(() => {
      shelf.classList.add("sweep");
      sweepInterval = setInterval(() => {
        shelf.classList.remove("sweep");
        void shelf.offsetWidth;
        shelf.classList.add("sweep");
      }, 9000);
    }, 900);

    return () => {
      clearTimeout(sweepTimeout);
      if (sweepInterval) clearInterval(sweepInterval);
      shelfFrame?.removeEventListener("mousemove", onMove);
      shelfFrame?.removeEventListener("mouseleave", onLeave);
      shelf.replaceChildren();
    };
  }, []);

  return (
    <div className="shelf-frame" ref={frameRef}>
      <div className="shelf" id="shelf" ref={shelfRef} />
      <div className="shelf-caption">
        <span>SHELF 01 / ANY TITLE</span>
        <span>ANY ISBN, ANY EDITION</span>
      </div>
    </div>
  );
}
