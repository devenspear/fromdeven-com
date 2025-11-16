"use client";

import { motion } from "framer-motion";
import { CARD_CONTENT } from "@/config/cardContent";
import { PolaroidPhoto } from "./PolaroidPhoto";
import { useState, useEffect, useRef } from "react";

// Helper function to convert markdown-style italics to HTML
function formatPoem(text: string): React.ReactNode {
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

export function CardContent() {
  const [showContent, setShowContent] = useState(false);
  const [fontSize, setFontSize] = useState<number>(1);
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Reveal entire content 1 second after component mounts
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Calculate optimal font size based on container width
    const calculateOptimalFontSize = () => {
      if (!articleRef.current) return;

      const containerWidth = articleRef.current.offsetWidth;
      const windowWidth = window.innerWidth;

      // Calculate optimal font size based on viewport
      let optimalSize: number;

      if (windowWidth < 480) {
        // Mobile: prioritize readability
        optimalSize = 16;
      } else if (windowWidth < 768) {
        // Tablet small: balanced
        optimalSize = Math.max(17, Math.min(19, containerWidth / 35));
      } else if (windowWidth < 1024) {
        // Tablet large: more generous
        optimalSize = Math.max(18, Math.min(21, containerWidth / 38));
      } else if (windowWidth < 1440) {
        // Desktop standard: comfortable reading
        optimalSize = Math.max(20, Math.min(23, containerWidth / 40));
      } else {
        // Large desktop: maximize readability
        optimalSize = Math.max(21, Math.min(26, containerWidth / 42));
      }

      setFontSize(optimalSize);
    };

    calculateOptimalFontSize();

    const resizeObserver = new ResizeObserver(calculateOptimalFontSize);
    if (articleRef.current) {
      resizeObserver.observe(articleRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [showContent]);

  return (
    <div className="min-h-screen py-8 md:py-12 lg:py-16 px-4 md:px-6 lg:px-8 paper-texture">
      <motion.article
        ref={articleRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[96%] sm:max-w-[92%] md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto bg-card rounded-lg card-shadow p-6 sm:p-8 md:p-10 lg:p-14 xl:p-16"
        style={{
          maxWidth: "min(1200px, 96vw)"
        }}
      >
        {/* Label */}
        {CARD_CONTENT.label && (
          <p className="text-xs sm:text-sm tracking-widest uppercase text-text-secondary text-center mb-4 md:mb-6">
            {CARD_CONTENT.label}
          </p>
        )}

        {/* Title */}
        <h1 className="font-serif fluid-title text-text-primary text-center mb-4 md:mb-6 text-balance">
          {CARD_CONTENT.title}
        </h1>

        {/* Subtitle */}
        {CARD_CONTENT.subtitle && (
          <p className="fluid-subtitle text-text-secondary text-center mb-12 md:mb-16 lg:mb-20 font-light tracking-wide">
            {CARD_CONTENT.subtitle}
          </p>
        )}

        {/* Decorative divider */}
        <div className="w-16 md:w-20 lg:w-24 h-px bg-accent-gold mx-auto mb-12 md:mb-16 lg:mb-20" />

        {/* Greeting */}
        {CARD_CONTENT.greeting && (
          <p className="fluid-greeting text-text-primary mb-8 md:mb-10 lg:mb-12 font-light">
            {CARD_CONTENT.greeting}
          </p>
        )}

        {/* Poem with strategically placed photos */}
        <div className="poem-text text-text-primary font-light text-pretty" style={{
          fontSize: `${fontSize}px`,
          lineHeight: fontSize >= 22 ? '1.85' : fontSize >= 20 ? '1.8' : '1.75',
          textAlign: 'justify',
          textJustify: 'inter-word',
          hyphens: 'auto',
          transition: 'font-size 0.3s ease, line-height 0.3s ease'
        }}>
          {/* Stanza 0 with Photo 0 (left) */}
          {CARD_CONTENT.photos[0] && (
            <PolaroidPhoto
              src={CARD_CONTENT.photos[0].src}
              alt={CARD_CONTENT.photos[0].alt}
              position={CARD_CONTENT.photos[0].position as "left" | "right"}
              index={0}
            />
          )}
          <div style={{ marginBottom: 'clamp(1.5em, 3vw, 2.5em)' }}>
            {CARD_CONTENT.stanzas[0].split("\n").map((line, lineIndex) => (
              <p key={lineIndex} style={{ marginBottom: '0.4em' }}>
                {formatPoem(line)}
              </p>
            ))}
          </div>

          {/* Clear float before next section */}
          <div className="clear-both" style={{ marginBottom: 'clamp(1.5em, 3vw, 2.5em)' }}></div>

          {/* Stanza 1 with Photo 1 (right) */}
          {CARD_CONTENT.photos[1] && (
            <PolaroidPhoto
              src={CARD_CONTENT.photos[1].src}
              alt={CARD_CONTENT.photos[1].alt}
              position={CARD_CONTENT.photos[1].position as "left" | "right"}
              index={1}
            />
          )}
          <div style={{ marginBottom: 'clamp(1.5em, 3vw, 2.5em)' }}>
            {CARD_CONTENT.stanzas[1].split("\n").map((line, lineIndex) => (
              <p key={lineIndex} style={{ marginBottom: '0.4em' }}>
                {formatPoem(line)}
              </p>
            ))}
          </div>

          {/* Clear float before next section */}
          <div className="clear-both" style={{ marginBottom: 'clamp(1.5em, 3vw, 2.5em)' }}></div>

          {/* Stanzas 2 & 3 together with Photo 2 (left) */}
          {CARD_CONTENT.photos[2] && (
            <PolaroidPhoto
              src={CARD_CONTENT.photos[2].src}
              alt={CARD_CONTENT.photos[2].alt}
              position={CARD_CONTENT.photos[2].position as "left" | "right"}
              index={2}
            />
          )}
          <div style={{ marginBottom: 'clamp(1.5em, 3vw, 2.5em)' }}>
            {CARD_CONTENT.stanzas[2].split("\n").map((line, lineIndex) => (
              <p key={lineIndex} style={{ marginBottom: '0.4em' }}>
                {formatPoem(line)}
              </p>
            ))}
          </div>

          <div style={{ marginBottom: 'clamp(1.5em, 3vw, 2.5em)' }}>
            {CARD_CONTENT.stanzas[3].split("\n").map((line, lineIndex) => (
              <p key={lineIndex} style={{ marginBottom: '0.4em' }}>
                {formatPoem(line)}
              </p>
            ))}
          </div>

          {/* Clear float before next section */}
          <div className="clear-both" style={{ marginBottom: 'clamp(1.5em, 3vw, 2.5em)' }}></div>

          {/* Stanzas 4 & 5 together with Photo 3 (right) */}
          {CARD_CONTENT.photos[3] && (
            <PolaroidPhoto
              src={CARD_CONTENT.photos[3].src}
              alt={CARD_CONTENT.photos[3].alt}
              position={CARD_CONTENT.photos[3].position as "left" | "right"}
              index={3}
            />
          )}
          <div style={{ marginBottom: 'clamp(1.5em, 3vw, 2.5em)' }}>
            {CARD_CONTENT.stanzas[4].split("\n").map((line, lineIndex) => (
              <p key={lineIndex} style={{ marginBottom: '0.4em' }}>
                {formatPoem(line)}
              </p>
            ))}
          </div>

          <div style={{ marginBottom: 'clamp(1.5em, 3vw, 2.5em)' }}>
            {CARD_CONTENT.stanzas[5].split("\n").map((line, lineIndex) => (
              <p key={lineIndex} style={{ marginBottom: '0.4em' }}>
                {formatPoem(line)}
              </p>
            ))}
          </div>

          {/* Clear floats */}
          <div className="clear-both"></div>
        </div>

        {/* Closing signature */}
        {CARD_CONTENT.closing && (
          <div className="mt-12 md:mt-16 lg:mt-20 pt-8 md:pt-10 border-t border-gray-200 clear-both">
            <p className="fluid-greeting text-text-primary whitespace-pre-line text-right font-light">
              {CARD_CONTENT.closing}
            </p>
          </div>
        )}
      </motion.article>

      {/* Subtle footer */}
      <div className="w-full max-w-[95%] sm:max-w-[90%] md:max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto mt-8 md:mt-12 text-center">
        <p className="text-xs text-text-light">
          Created with care · {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
