import React, { useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger globally
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Checks if the user prefers reduced motion.
 * @returns {boolean}
 */
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Custom hook to run GSAP animations with automatic cleanup.
 * @param {Function} effect - The function containing GSAP animations.
 * @param {React.RefObject|Array} [dependencies] - Dependency array or scope ref.
 */
export const useGSAP = (effect, dependencies = []) => {
  const isRef = dependencies && !Array.isArray(dependencies) && dependencies.current !== undefined;
  const deps = isRef ? [] : dependencies;
  const scope = isRef ? dependencies : null;

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(effect, scope);
    return () => ctx.revert();
  }, deps);
};

/**
 * Custom hook to register a magnetic effect on elements.
 * @param {React.RefObject} ref - Ref to the element.
 * @param {number} [strength=0.2] - Strength of magnetic effect.
 */
export const useMagnetic = (ref, strength = 0.2) => {
  useEffect(() => {
    const el = ref?.current;
    if (!el || prefersReducedMotion()) return;

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const onMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1.1, 0.4)',
        overwrite: 'auto',
      });
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [ref, strength]);
};

/**
 * SplitText React Component.
 * Splits text into word and character spans to enable word-by-word or character-by-character animations.
 */
export const SplitText = ({ children, className = '' }) => {
  // If children isn't a plain string, render it unchanged — GSAP won't split it
  if (typeof children !== 'string') return <span className={className}>{children}</span>;

  const text = String(children);

  return (
    <span className={`${className} split-text-container inline-block`} style={{ perspective: '1000px' }}>
      {text.split(' ').map((word, wIdx) => (
        <span key={wIdx} className="word-span inline-block whitespace-nowrap mr-[0.25em]">
          {word.split('').map((char, cIdx) => (
            <span key={cIdx} className="char-span inline-block origin-center transform-gpu">
              {char}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
};
