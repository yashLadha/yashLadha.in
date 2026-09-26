import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw, StepForward } from "lucide-react";
import { cn } from "../lib/utils";

type Phase = "script" | "microtasks" | "timers";

type Frame = {
    line: number | null;
    phase: "idle" | Phase | "done";
    stack: string[];
    micro: string[];
    timers: string[];
    out: string[];
    note: string;
};

type TokenKind = "call" | "keyword" | "string" | "number" | "punct";
type Token = [TokenKind, string];

const TOKEN_CLASS: Record<TokenKind, string> = {
    call: "text-sky-700 dark:text-sky-300",
    keyword: "text-violet-700 dark:text-violet-300",
    string: "text-emerald-700 dark:text-emerald-300",
    number: "text-brand",
    punct: "text-foreground/70",
};

const CODE: Token[][] = [
    [
        ["call", "console"],
        ["punct", "."],
        ["call", "log"],
        ["punct", "("],
        ["string", '"start"'],
        ["punct", ");"],
    ],
    [
        ["call", "setTimeout"],
        ["punct", "(() => "],
        ["call", "log"],
        ["punct", "("],
        ["string", '"timeout"'],
        ["punct", "), "],
        ["number", "0"],
        ["punct", ");"],
    ],
    [
        ["keyword", "Promise"],
        ["punct", "."],
        ["call", "resolve"],
        ["punct", "()."],
        ["call", "then"],
        ["punct", "(() => "],
        ["call", "log"],
        ["punct", "("],
        ["string", '"promise"'],
        ["punct", "));"],
    ],
    [
        ["call", "queueMicrotask"],
        ["punct", "(() => "],
        ["call", "log"],
        ["punct", "("],
        ["string", '"microtask"'],
        ["punct", "));"],
    ],
    [
        ["call", "console"],
        ["punct", "."],
        ["call", "log"],
        ["punct", "("],
        ["string", '"end"'],
        ["punct", ");"],
    ],
];

const FRAMES: Frame[] = [
    {
        line: null,
        phase: "idle",
        stack: [],
        micro: [],
        timers: [],
        out: [],
        note: "Guess the output order, then run it.",
    },
    {
        line: 0,
        phase: "script",
        stack: ["main()", "log"],
        micro: [],
        timers: [],
        out: ["start"],
        note: "Synchronous code runs on the call stack.",
    },
    {
        line: 1,
        phase: "script",
        stack: ["main()", "setTimeout"],
        micro: [],
        timers: ["timeout cb"],
        out: ["start"],
        note: "Node clamps the 0ms delay to 1ms and parks the callback on the timer queue.",
    },
    {
        line: 2,
        phase: "script",
        stack: ["main()", "then"],
        micro: ["promise cb"],
        timers: ["timeout cb"],
        out: ["start"],
        note: "A resolved promise queues its reaction as a microtask.",
    },
    {
        line: 3,
        phase: "script",
        stack: ["main()", "queueMicrotask"],
        micro: ["promise cb", "microtask cb"],
        timers: ["timeout cb"],
        out: ["start"],
        note: "queueMicrotask joins the same queue, behind the promise reaction.",
    },
    {
        line: 4,
        phase: "script",
        stack: ["main()", "log"],
        micro: ["promise cb", "microtask cb"],
        timers: ["timeout cb"],
        out: ["start", "end"],
        note: "Still synchronous, so this prints before any callback.",
    },
    {
        line: null,
        phase: "microtasks",
        stack: [],
        micro: ["promise cb", "microtask cb"],
        timers: ["timeout cb"],
        out: ["start", "end"],
        note: "Stack is empty. Drain the microtask queue before the loop moves on.",
    },
    {
        line: 2,
        phase: "microtasks",
        stack: ["promise cb"],
        micro: ["microtask cb"],
        timers: ["timeout cb"],
        out: ["start", "end", "promise"],
        note: "Microtasks run in FIFO order.",
    },
    {
        line: 3,
        phase: "microtasks",
        stack: ["microtask cb"],
        micro: [],
        timers: ["timeout cb"],
        out: ["start", "end", "promise", "microtask"],
        note: "Queue drained.",
    },
    {
        line: null,
        phase: "timers",
        stack: [],
        micro: [],
        timers: ["timeout cb"],
        out: ["start", "end", "promise", "microtask"],
        note: "The loop enters the timers phase and finds an expired timer.",
    },
    {
        line: 1,
        phase: "timers",
        stack: ["timeout cb"],
        micro: [],
        timers: [],
        out: ["start", "end", "promise", "microtask", "timeout"],
        note: "Only now does the timeout callback run.",
    },
    {
        line: null,
        phase: "done",
        stack: [],
        micro: [],
        timers: [],
        out: ["start", "end", "promise", "microtask", "timeout"],
        note: "Nothing left. The process can exit.",
    },
];

const LAST_STEP = FRAMES.length - 1;
const STEP_MS = 1100;
const HOLD_MS = 2600;
const PHASES: Phase[] = ["script", "microtasks", "timers"];

type PhaseState = "past" | "now" | "future";

function phaseState(phase: Phase, current: Frame["phase"]): PhaseState {
    if (current === "done") return "past";
    if (current === "idle") return "future";
    const diff = PHASES.indexOf(phase) - PHASES.indexOf(current);
    if (diff < 0) return "past";
    return diff === 0 ? "now" : "future";
}

const PHASE_CLASS: Record<PhaseState, string> = {
    now: "bg-brand text-white dark:text-background",
    past: "text-foreground",
    future: "text-muted-foreground",
};

function nextStep(step: number) {
    return step >= LAST_STEP ? 0 : step + 1;
}

function formatStep(step: number) {
    return String(step).padStart(2, "0");
}

export function EventLoop() {
    const [step, setStep] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [userControlled, setUserControlled] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const frame = FRAMES[step];

    useEffect(() => {
        if (!playing) return;
        const atEnd = step >= LAST_STEP;
        const id = window.setTimeout(
            () => {
                if (atEnd && userControlled) setPlaying(false);
                else setStep(nextStep);
            },
            atEnd ? HOLD_MS : STEP_MS,
        );
        return () => window.clearTimeout(id);
    }, [playing, step, userControlled]);

    useEffect(() => {
        const root = rootRef.current;
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        if (userControlled || reducedMotion || !root) return;
        const observer = new IntersectionObserver(([entry]) =>
            setPlaying(entry.isIntersecting),
        );
        observer.observe(root);
        return () => observer.disconnect();
    }, [userControlled]);

    const toggle = () => {
        setUserControlled(true);
        if (step >= LAST_STEP) setStep(0);
        setPlaying((p) => !p);
    };
    const stepOnce = () => {
        setUserControlled(true);
        setPlaying(false);
        setStep(nextStep);
    };
    const reset = () => {
        setUserControlled(true);
        setPlaying(false);
        setStep(0);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.target !== e.currentTarget) return;
        if (e.metaKey || e.ctrlKey || e.altKey) return;
        if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            toggle();
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            stepOnce();
        } else if (e.key.toLowerCase() === "r") {
            reset();
        }
    };

    return (
        <div
            ref={rootRef}
            role="group"
            tabIndex={0}
            onKeyDown={onKeyDown}
            aria-label="Interactive Node.js event loop walkthrough. Space to play or pause, right arrow to step, R to reset."
            className="shadow-panel relative overflow-hidden rounded-xl border bg-card outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
        >
            <TitleBar
                playing={playing}
                onToggle={toggle}
                onStep={stepOnce}
                onReset={reset}
            />
            <div className="grid md:grid-cols-[minmax(0,1fr)_10.5rem]">
                <div className="min-w-0 border-b py-3 font-mono text-2xs leading-6 sm:text-xs md:border-b-0 md:border-r">
                    <CodeListing activeLine={frame.line} />
                    <PhaseTrack current={frame.phase} />
                </div>
                <div className="grid grid-cols-3 gap-px bg-border md:grid-cols-1">
                    <Lane
                        title="call stack"
                        items={[...frame.stack].reverse()}
                        chipClass="bg-foreground text-background"
                    />
                    <Lane
                        title="microtasks"
                        items={frame.micro}
                        chipClass="bg-brand/12 text-brand ring-1 ring-brand/30"
                    />
                    <Lane
                        title="timer queue"
                        items={frame.timers}
                        chipClass="bg-accent text-foreground ring-1 ring-border"
                    />
                </div>
            </div>
            <div className="border-t bg-muted/40 px-4 py-3 font-mono text-xs">
                <Stdout lines={frame.out} />
                <p
                    className="mt-2 text-muted-foreground"
                    aria-live={userControlled ? "polite" : "off"}
                >
                    <span className="text-brand">{formatStep(step)}</span>/
                    {formatStep(LAST_STEP)} {frame.note}
                </p>
            </div>
        </div>
    );
}

function TitleBar({
    playing,
    onToggle,
    onStep,
    onReset,
}: {
    playing: boolean;
    onToggle: () => void;
    onStep: () => void;
    onReset: () => void;
}) {
    return (
        <div className="flex items-center gap-3 border-b px-4 py-2.5">
            <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">
                event-loop.mjs
            </span>
            <div className="ml-auto flex items-center gap-1">
                <IconButton
                    label={playing ? "Pause" : "Run"}
                    onClick={onToggle}
                >
                    {playing ? (
                        <Pause className="h-3.5 w-3.5" />
                    ) : (
                        <Play className="h-3.5 w-3.5" />
                    )}
                </IconButton>
                <IconButton label="Step" onClick={onStep}>
                    <StepForward className="h-3.5 w-3.5" />
                </IconButton>
                <IconButton label="Reset" onClick={onReset}>
                    <RotateCcw className="h-3.5 w-3.5" />
                </IconButton>
            </div>
        </div>
    );
}

function CodeListing({ activeLine }: { activeLine: number | null }) {
    return (
        <div className="overflow-x-auto">
            {CODE.map((tokens, i) => {
                const active = activeLine === i;
                return (
                    <div
                        key={i}
                        className={cn(
                            "relative flex w-max min-w-full whitespace-pre pr-3 transition-colors duration-300",
                            active && "bg-brand/10",
                        )}
                    >
                        <span
                            className={cn(
                                "absolute left-0 top-0 h-full w-0.5 transition-colors duration-300",
                                active ? "bg-brand" : "bg-transparent",
                            )}
                        />
                        <span
                            className={cn(
                                "w-8 shrink-0 select-none pr-2.5 text-right",
                                active ? "text-brand" : "text-muted-foreground",
                            )}
                        >
                            {i + 1}
                        </span>
                        <span>
                            {tokens.map(([kind, text], j) => (
                                <span key={j} className={TOKEN_CLASS[kind]}>
                                    {text}
                                </span>
                            ))}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}

function PhaseTrack({ current }: { current: Frame["phase"] }) {
    return (
        <div className="mt-3 flex items-center gap-1.5 border-t px-3 pt-3">
            {PHASES.map((phase, i) => (
                <div key={phase} className="flex items-center gap-1.5">
                    {i > 0 && <span className="h-px w-3 bg-border" />}
                    <span
                        className={cn(
                            "rounded px-1.5 py-0.5 text-2xs leading-4 transition-colors duration-300",
                            PHASE_CLASS[phaseState(phase, current)],
                        )}
                    >
                        {phase}
                    </span>
                </div>
            ))}
        </div>
    );
}

function Stdout({ lines }: { lines: string[] }) {
    return (
        <div className="flex min-h-6 flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-muted-foreground">stdout</span>
            <span className="text-muted-foreground/50" aria-hidden="true">
                {"›"}
            </span>
            {lines.length === 0 && (
                <span className="text-muted-foreground">waiting</span>
            )}
            {lines.map((line, i) => (
                <span
                    key={line}
                    className="animate-pop rounded bg-background px-1.5 py-0.5 text-foreground ring-1 ring-border"
                >
                    <span className="mr-1 text-muted-foreground">{i + 1}</span>
                    {line}
                </span>
            ))}
        </div>
    );
}

function Lane({
    title,
    items,
    chipClass,
}: {
    title: string;
    items: string[];
    chipClass: string;
}) {
    return (
        <div className="min-h-[74px] bg-card px-3 py-2.5">
            <div className="mb-1.5 flex items-center justify-between font-mono text-2xs text-muted-foreground">
                <span>{title}</span>
                <span className="tabular-nums">{items.length}</span>
            </div>
            <div className="flex flex-wrap gap-1">
                {items.map((item) => (
                    <span
                        key={item}
                        className={cn(
                            "animate-pop rounded px-1.5 py-0.5 font-mono text-2xs",
                            chipClass,
                        )}
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}

function IconButton({
    label,
    onClick,
    children,
}: {
    label: string;
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={label}
            title={label}
            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition hover:bg-accent hover:text-foreground"
        >
            {children}
        </button>
    );
}
