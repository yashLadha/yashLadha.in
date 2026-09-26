import { useEffect, useState } from "react";
import { isApplePlatform } from "./platform";

/** The modifier key label for keyboard shortcuts: "⌘" on Apple platforms, "Ctrl" elsewhere. */
export function useModKey() {
    // Default to "⌘" so the server render and first client render agree.
    const [modKey, setModKey] = useState("⌘");
    useEffect(() => {
        if (!isApplePlatform()) setModKey("Ctrl");
    }, []);
    return modKey;
}
