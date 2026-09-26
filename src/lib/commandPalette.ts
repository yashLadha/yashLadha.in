export const OPEN_COMMAND_PALETTE_EVENT = "command-palette:open";

/** Opens the global command palette from anywhere, including plain Astro scripts. */
export function openCommandPalette() {
    window.dispatchEvent(new Event(OPEN_COMMAND_PALETTE_EVENT));
}
