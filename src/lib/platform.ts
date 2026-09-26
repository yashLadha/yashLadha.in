export function isApplePlatform() {
    return /Mac|iPhone|iPad/.test(navigator.userAgent);
}

export async function copyToClipboard(text: string): Promise<boolean> {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        return false;
    }
}
