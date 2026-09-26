import {
    useEffect,
    useId,
    useMemo,
    useRef,
    useState,
    type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import {
    ArrowUpRight,
    AtSign,
    Copy,
    CornerDownLeft,
    FileText,
    Home,
    Mail,
    Moon,
    Search,
    type LucideIcon,
} from "lucide-react";
import { Kbd } from "./ui/kbd";
import { EMAIL, navItems, socials } from "../data/site";
import type { PostSummary } from "../lib/posts";
import { OPEN_COMMAND_PALETTE_EVENT } from "../lib/commandPalette";
import { copyToClipboard, isApplePlatform } from "../lib/platform";
import { toggleTheme } from "../lib/theme";
import { cn } from "../lib/utils";

const TOAST_MS = 1800;

type Group = "Pages" | "Posts" | "Links" | "Actions";

type Command = {
    id: string;
    group: Group;
    label: string;
    hint?: string;
    icon: LucideIcon;
    keywords?: string;
    external?: boolean;
    /** Returns a message to show in a toast, if any. */
    run: () => void | Promise<string | void>;
};

const navigate = (href: string) => () => {
    window.location.href = href;
};

const openInNewTab = (href: string) => () => {
    window.open(href, "_blank", "noopener,noreferrer");
};

function buildCommands(posts: PostSummary[]): Command[] {
    return [
        {
            id: "home",
            group: "Pages",
            label: "Home",
            hint: "/",
            icon: Home,
            run: navigate("/"),
        },
        ...navItems.map<Command>((item) => ({
            id: `page:${item.href}`,
            group: "Pages",
            label: item.label,
            hint: item.href,
            icon: item.icon,
            keywords: item.keywords,
            run: navigate(item.href),
        })),
        ...posts.map<Command>((post) => ({
            id: `post:${post.url}`,
            group: "Posts",
            label: post.title,
            hint: post.date,
            icon: FileText,
            run: navigate(post.url),
        })),
        ...socials.map<Command>((social) => ({
            id: `social:${social.label}`,
            group: "Links",
            label: social.label,
            hint: social.handle,
            icon: social.icon,
            keywords: social.keywords,
            external: true,
            run: openInNewTab(social.href),
        })),
        {
            id: "mail",
            group: "Links",
            label: "Send an email",
            hint: EMAIL,
            icon: Mail,
            run: navigate(`mailto:${EMAIL}`),
        },
        {
            id: "copy-email",
            group: "Actions",
            label: "Copy email address",
            icon: Copy,
            run: async () =>
                (await copyToClipboard(EMAIL))
                    ? "Email copied"
                    : "Could not copy email",
        },
        {
            id: "theme",
            group: "Actions",
            label: "Toggle theme",
            icon: Moon,
            keywords: "dark light mode",
            run: () => toggleTheme(),
        },
    ];
}

function matches(command: Command, query: string) {
    const haystack = `${command.label} ${command.hint ?? ""} ${command.keywords ?? ""} ${command.group}`;
    return haystack.toLowerCase().includes(query);
}

export function CommandPalette({ posts }: { posts: PostSummary[] }) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const toastTimer = useRef<number | undefined>(undefined);
    const [query, setQuery] = useState("");
    const [active, setActive] = useState(0);
    const [toast, setToast] = useState<string | null>(null);
    const idPrefix = useId();

    const commands = useMemo(() => buildCommands(posts), [posts]);

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        return q ? commands.filter((command) => matches(command, q)) : commands;
    }, [commands, query]);

    // Results are already ordered by group, so grouping only needs to split them.
    const groups = useMemo(() => {
        const byGroup = new Map<Group, { command: Command; index: number }[]>();
        results.forEach((command, index) => {
            const entries = byGroup.get(command.group) ?? [];
            entries.push({ command, index });
            byGroup.set(command.group, entries);
        });
        return [...byGroup];
    }, [results]);

    const open = () => dialogRef.current?.showModal();
    const close = () => dialogRef.current?.close();

    useEffect(() => {
        const usesMeta = isApplePlatform();
        const onKeyDown = (event: KeyboardEvent) => {
            const modifier = usesMeta ? event.metaKey : event.ctrlKey;
            if (modifier && event.key.toLowerCase() === "k") {
                event.preventDefault();
                if (dialogRef.current?.open) close();
                else open();
            }
        };
        window.addEventListener("keydown", onKeyDown);
        window.addEventListener(OPEN_COMMAND_PALETTE_EVENT, open);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener(OPEN_COMMAND_PALETTE_EVENT, open);
            window.clearTimeout(toastTimer.current);
        };
    }, []);

    useEffect(() => {
        listRef.current
            ?.querySelector(`[data-index="${active}"]`)
            ?.scrollIntoView({ block: "nearest" });
    }, [active]);

    const showToast = (message: string) => {
        window.clearTimeout(toastTimer.current);
        setToast(message);
        toastTimer.current = window.setTimeout(() => setToast(null), TOAST_MS);
    };

    const execute = async (command: Command | undefined) => {
        if (!command) return;
        close();
        const message = await command.run();
        if (message) showToast(message);
    };

    const onQueryChange = (value: string) => {
        setQuery(value);
        setActive(0);
    };

    const onInputKeyDown = (event: ReactKeyboardEvent) => {
        const count = results.length;
        if (event.key === "ArrowDown" && count) {
            event.preventDefault();
            setActive((index) => (index + 1) % count);
        } else if (event.key === "ArrowUp" && count) {
            event.preventDefault();
            setActive((index) => (index - 1 + count) % count);
        } else if (event.key === "Enter" && !event.nativeEvent.isComposing) {
            event.preventDefault();
            execute(results[active]);
        }
    };

    const optionId = (index: number) => `${idPrefix}-option-${index}`;
    const listId = `${idPrefix}-list`;

    return (
        <>
            <dialog
                ref={dialogRef}
                aria-label="Command palette"
                onClose={() => onQueryChange("")}
                onClick={(event) =>
                    event.target === event.currentTarget && close()
                }
                className="palette-panel mx-auto mt-[12vh] w-[calc(100%-2rem)] max-w-xl overflow-hidden rounded-xl border bg-popover p-0 text-popover-foreground shadow-2xl shadow-black/10 backdrop:bg-background/60 backdrop:backdrop-blur-sm dark:shadow-black/50"
            >
                <div className="flex items-center gap-3 border-b px-4">
                    <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <input
                        value={query}
                        onChange={(event) => onQueryChange(event.target.value)}
                        onKeyDown={onInputKeyDown}
                        placeholder="Type a command or search"
                        className="h-12 w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
                        role="combobox"
                        aria-expanded="true"
                        aria-controls={listId}
                        aria-activedescendant={
                            results[active] ? optionId(active) : undefined
                        }
                    />
                    <Kbd>esc</Kbd>
                </div>

                <div
                    ref={listRef}
                    id={listId}
                    role="listbox"
                    aria-label="Commands"
                    className="max-h-[min(60vh,380px)] overflow-y-auto p-2"
                >
                    {results.length === 0 && (
                        <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                            No results for "{query}"
                        </p>
                    )}
                    {groups.map(([group, entries]) => (
                        <div
                            key={group}
                            role="group"
                            aria-labelledby={`${idPrefix}-${group}`}
                        >
                            <div
                                id={`${idPrefix}-${group}`}
                                className="px-3 pb-1.5 pt-3 font-mono text-2xs text-muted-foreground"
                            >
                                {group}
                            </div>
                            {entries.map(({ command, index }) => {
                                const selected = index === active;
                                const Icon = command.icon;
                                return (
                                    <div
                                        key={command.id}
                                        id={optionId(index)}
                                        role="option"
                                        aria-selected={selected}
                                        data-index={index}
                                        onMouseMove={() => setActive(index)}
                                        onClick={() => execute(command)}
                                        className={cn(
                                            "flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm",
                                            selected
                                                ? "bg-accent text-foreground"
                                                : "text-foreground/85",
                                        )}
                                    >
                                        <Icon
                                            className={cn(
                                                "h-4 w-4 shrink-0",
                                                selected
                                                    ? "text-brand"
                                                    : "text-muted-foreground",
                                            )}
                                        />
                                        <span className="flex-1 truncate">
                                            {command.label}
                                        </span>
                                        {command.hint && (
                                            <span className="hidden truncate font-mono text-xs text-muted-foreground sm:inline">
                                                {command.hint}
                                            </span>
                                        )}
                                        {command.external ? (
                                            <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
                                        ) : (
                                            selected && (
                                                <CornerDownLeft className="h-3.5 w-3.5 text-muted-foreground" />
                                            )
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between border-t bg-muted/40 px-4 py-2 font-mono text-2xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                        <AtSign className="h-3 w-3" /> yashladha.in
                    </span>
                    <span className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                            <Kbd>↑</Kbd>
                            <Kbd>↓</Kbd> move
                        </span>
                        <span className="flex items-center gap-1">
                            <Kbd>↵</Kbd> open
                        </span>
                    </span>
                </div>
            </dialog>

            <div
                role="status"
                aria-live="polite"
                className="fixed bottom-6 left-1/2 -translate-x-1/2"
            >
                {toast && (
                    <div className="animate-pop rounded-md border bg-popover px-3 py-2 font-mono text-xs shadow-lg">
                        {toast}
                    </div>
                )}
            </div>
        </>
    );
}
