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

    const observeRevealElements = (root: ParentNode) => {
      root.querySelectorAll('.reveal').forEach((child) => observer.observe(child));
    };

    // Observe the element itself and all children with `.reveal`
    observer.observe(el);
    observeRevealElements(el);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            if (node.matches('.reveal')) observer.observe(node);
            observeRevealElements(node);
          }
        });
      });
    });
    mutationObserver.observe(el, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [options]);

  return ref;
}
