export const OPEN_COMMAND_PALETTE_EVENT = "command-palette:open";

/** Opens the global command palette from anywhere, including plain Astro scripts. */
export function openCommandPalette() {
  window.dispatchEvent(new Event(OPEN_COMMAND_PALETTE_EVENT));
}

export const SHOW_TOAST_EVENT = "command-palette:toast";

/** Shows a message in the palette's toast, which is mounted on every page. */
export function showToast(message: string) {
  window.dispatchEvent(new CustomEvent(SHOW_TOAST_EVENT, { detail: message }));
}
