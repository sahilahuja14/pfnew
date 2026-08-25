import { useEffect, useRef } from 'react';

/**
 * Attaches IntersectionObserver to a container element.
 * Children with data-card-reveal are revealed once as they enter.
 *
 * Usage: attach returned ref to the card grid container.
 */
export const useCardReveal = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('[data-card-reveal]');
    if (!cards.length) return;

    const prefersStaticMotion = window.matchMedia('(max-width: 900px), (prefers-reduced-motion: reduce)').matches;
    if (prefersStaticMotion) {
      cards.forEach((card) => card.classList.add('card-in'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('card-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return containerRef;
};
