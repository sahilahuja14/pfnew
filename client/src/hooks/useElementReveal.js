import { useEffect, useRef } from 'react';

/**
 * Generic IntersectionObserver hook for non-card elements:
 * pills, tiles, rows. Applies a CSS class on enter,
 * and optionally removes it when scrolled back past.
 *
 * @param {string} inClass  - CSS class to add when visible
 * @param {string} selector - data attribute selector to query children
 * @param {object} opts     - IntersectionObserver options
 * @param {boolean} bidirectional - if true, removes class on exit
 */
export const useElementReveal = ({
  inClass,
  selector,
  threshold = 0.12,
  rootMargin = '0px 0px -40px 0px',
  bidirectional = false,
  staggerMs = 0,
} = {}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = selector
      ? container.querySelectorAll(selector)
      : [container];

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (staggerMs) {
              // stagger delay is already set via inline style
            }
            entry.target.classList.add(inClass);
          } else if (bidirectional && entry.target.classList.contains(inClass)) {
            entry.target.classList.remove(inClass);
          }
        });
      },
      { threshold, rootMargin }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [inClass, selector, threshold, rootMargin, bidirectional, staggerMs]);

  return containerRef;
};
