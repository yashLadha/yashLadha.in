import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/** Two-digit, zero-padded counter such as "03". */
export function padTwo(n: number) {
    return String(n).padStart(2, "0");
}

/**
 * Canonical route path without the ".html" suffix or trailing slash that
 * `build.format: "file"` and dev URLs add, e.g. "/blog/post.html" to "/blog/post".
 */
export function normalizePath(pathname: string) {
    return pathname.replace(/\.html$/, "").replace(/(.)\/$/, "$1");
}
