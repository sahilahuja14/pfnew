import { useEffect, useRef } from 'react';

/**
 * Attaches IntersectionObserver to a container element.
 * Children with data-card-reveal are animated in/out as they
 * enter/leave the viewport, giving the Apple "scroll back" effect.
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('card-in');
            entry.target.classList.remove('card-out');
          } else {
            // Only animate out if the card was already visible once
            if (entry.target.classList.contains('card-in')) {
              entry.target.classList.remove('card-in');
              entry.target.classList.add('card-out');
            }
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
