import { useEffect, useRef } from 'react';

/**
 * Adds the `is-visible` class to the element when it enters the viewport.
 * Pairs with the `.reveal` utility class in index.css for fade/slide-up.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px', ...options }
    );

    // Observe the element itself and all children with `.reveal`
    observer.observe(el);
    el.querySelectorAll('.reveal').forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, [options]);

  return ref;
}
