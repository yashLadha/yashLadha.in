import { showToast } from "./commandPalette";
import { copyToClipboard } from "./platform";

const HEADINGS = ":is(h2, h3, h4)[id]";

function scrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

/** Scrolls to the element a "#id" hash names, returning false if there is none. */
function scrollToHash(hash: string) {
  const id = decodeURIComponent(hash.slice(1));
  const target = id && document.getElementById(id);
  if (!target) return false;
  // scrollIntoView honours the scroll-padding-top that keeps headings clear of the sticky nav.
  target.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
  return true;
}

/**
 * Gives every heading inside `root` a permalink and makes in-page hash links
 * scroll smoothly. Clicking a permalink also copies the section URL.
 */
export function initSectionLinks(root: HTMLElement) {
  root.querySelectorAll<HTMLHeadingElement>(HEADINGS).forEach((heading) => {
    const link = document.createElement("a");
    link.href = `#${heading.id}`;
    link.className = "heading-anchor";
    link.textContent = "#";
    link.setAttribute("aria-label", `Link to section: ${heading.textContent}`);
    heading.append(link);
  });

  root.addEventListener("click", async (event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey)
      return;
    const link = (event.target as Element).closest<HTMLAnchorElement>(
      'a[href^="#"]',
    );
    if (!link || !scrollToHash(link.hash)) return;
    event.preventDefault();
    history.pushState(null, "", link.hash);
    if (link.classList.contains("heading-anchor")) {
      const copied = await copyToClipboard(link.href);
      showToast(copied ? "Section link copied" : "Could not copy link");
    }
  });

  // The browser jumps to a shared #section before fonts and images settle, so
  // glide to the final position once the page has fully loaded.
  if (location.hash) {
    const settle = () => scrollToHash(location.hash);
    if (document.readyState === "complete") settle();
    else window.addEventListener("load", settle, { once: true });
  }
}
