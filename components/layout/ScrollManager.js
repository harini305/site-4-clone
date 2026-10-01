'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const toTop = (behavior) => window.scrollTo({ top: 0, left: 0, behavior });

/**
 * Makes internal link clicks always land at the very top of the destination page.
 * - Next.js only scrolls to the top of the changed segment (below the top bar/header),
 *   so links clicked from the footer landed part-way down the new page.
 * - Clicking a link to the page you're already on did nothing at all.
 * Only link clicks are handled: back/forward keep the browser's scroll restoration,
 * and router.push(..., { scroll: false }) calls (shop filters) are unaffected.
 */
export default function ScrollManager() {
  const pathname = usePathname();
  const pending = useRef(false);

  useEffect(() => {
    const onClick = (e) => {
      // Runs in the capture phase, i.e. before next/link's own handler calls preventDefault().
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest?.('a[href]');
      if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;

      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.hash) return;

      if (url.pathname === window.location.pathname) {
        if (url.search === window.location.search) {
          // Same page: Next.js won't navigate, so just bring the user back to the top.
          e.preventDefault();
          toTop('smooth');
        } else {
          // Same path, different query (e.g. "Shop" while filters are applied).
          toTop('instant');
        }
        return;
      }
      pending.current = true;
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  useEffect(() => {
    if (!pending.current) return;
    pending.current = false;
    toTop('instant');
  }, [pathname]);

  return null;
}
