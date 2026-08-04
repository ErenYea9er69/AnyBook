"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const FAQS = [
  {
    q: "Do I need an account?",
    a: "No. Search a title and read. AnyBook stays free, with no sign up and no card.",
  },
  {
    q: "Does AnyBook cover fiction and nonfiction?",
    a: "Yes. Search any title in either category.",
  },
  {
    q: "What if my book isn't in the library yet?",
    a: 'Use the "Request a title" link and send us the title. We read the book ourselves and add the summary — we don\'t generate it automatically, so it isn\'t instant, but we work through requests as they come in.',
  },
  {
    q: "Is the summary biased toward the author's argument?",
    a: "No. Each summary includes pushback from critics, not the author's view alone.",
  },
  {
    q: "Do you offer audio?",
    a: "Not yet. Audio narration is on the way, but every summary is text-only for now.",
  },
  {
    q: "Do you support languages other than English?",
    a: "English today. Additional languages come later this year.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="on-paper" id="faq">
      <div className="wrap">
        <Reveal className="section-head">
          <div className="eyebrow">FAQ</div>
          <h2>Questions, answered.</h2>
        </Reveal>
        <Reveal className="faq-list">
          {FAQS.map((item, i) => (
            <details
              key={item.q}
              className="faq-item"
              open={openIndex === i}
              onToggle={(e) => {
                if ((e.target as HTMLDetailsElement).open) setOpenIndex(i);
              }}
            >
              <summary>
                {item.q}
                <span className="plus">+</span>
              </summary>
              <div className="answer">{item.a}</div>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
