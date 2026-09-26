import { useEffect, useReducer, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { cn } from "../lib/utils";

type Health = "healthy" | "slow" | "down";
type Guard = "timeout" | "retry" | "breaker";
type Outcome = "ok" | "error" | "shed";
type Sample = { id: number; ms: number; outcome: Outcome; attempts: number };
type Breaker = {
    state: "closed" | "open" | "half-open";
    failures: number;
    openUntil: number;
};

type Sim = {
    tick: number;
    health: Health;
    guards: Record<Guard, boolean>;
    breaker: Breaker;
    samples: Sample[];
};

type Action =
    | { type: "tick" }
    | { type: "health"; health: Health }
    | { type: "toggle"; guard: Guard }
    | { type: "reset" };

const TICK_MS = 200;
const WINDOW = 48;
const TIMEOUT_MS = 250;
const HANG_MS = 3000;
const MAX_RETRIES = 2;
const TRIP_AFTER = 5;
const COOLDOWN_TICKS = 12;
const TRAVEL_MS = 1000;
const VISIBLE_DOTS = 5;

const HEALTHS: Health[] = ["healthy", "slow", "down"];
const GUARDS: { key: Guard; label: string; hotkey: string }[] = [
    { key: "timeout", label: "timeouts", hotkey: "1" },
    { key: "retry", label: "retries", hotkey: "2" },
    { key: "breaker", label: "breaker", hotkey: "3" },
];
const NODES = ["client", "gateway", "service", "upstream"] as const;
const nodeCenter = (i: number) => ((i + 0.5) / NODES.length) * 100;

const CLOSED: Breaker = { state: "closed", failures: 0, openUntil: 0 };

const INITIAL: Sim = {
    tick: 0,
    health: "healthy",
    guards: { timeout: false, retry: false, breaker: false },
    breaker: CLOSED,
    samples: [],
};

const OUTCOME_CLASS: Record<Outcome, string> = {
    ok: "bg-emerald-600/70 dark:bg-emerald-400/70",
    error: "bg-red-500 dark:bg-red-400",
    shed: "bg-brand",
};

const HEALTH_CLASS: Record<Health, string> = {
    healthy: "text-emerald-700 dark:text-emerald-300",
    slow: "text-amber-700 dark:text-amber-300",
    down: "text-red-600 dark:text-red-400",
};

const between = (lo: number, hi: number) => lo + Math.random() * (hi - lo);

/** One call to the upstream. Slow means a heavy tail, down means it accepts the connection and never answers. */
function callUpstream(health: Health) {
    if (health === "down") return { ms: HANG_MS, ok: false };
    if (health === "slow") {
        const tail = Math.random() < 0.3;
        return {
            ms: tail ? between(800, 2000) : between(120, 220),
            ok: Math.random() > 0.05,
        };
    }
    return { ms: between(30, 90), ok: Math.random() > 0.01 };
}

function request(sim: Sim, id: number): { sample: Sample; breaker: Breaker } {
    const { guards, health, tick } = sim;
    let breaker = guards.breaker ? sim.breaker : CLOSED;

    if (breaker.state === "open") {
        if (tick < breaker.openUntil) {
            return {
                sample: { id, ms: 1, outcome: "shed", attempts: 0 },
                breaker,
            };
        }
        breaker = { ...breaker, state: "half-open" };
    }

    const probing = breaker.state === "half-open";
    const tries = guards.retry && !probing ? 1 + MAX_RETRIES : 1;
    let ms = 0;
    let attempts = 0;
    let ok = false;
    for (let i = 0; i < tries && !ok; i++) {
        if (i > 0) ms += 40 * 2 ** (i - 1) + between(0, 40);
        const call = callUpstream(health);
        const timedOut = guards.timeout && call.ms > TIMEOUT_MS;
        ms += timedOut ? TIMEOUT_MS : call.ms;
        ok = call.ok && !timedOut;
        attempts++;
    }

    if (ok) breaker = CLOSED;
    else {
        const failures = breaker.failures + 1;
        breaker =
            probing || failures >= TRIP_AFTER
                ? { state: "open", failures, openUntil: tick + COOLDOWN_TICKS }
                : { ...breaker, failures };
    }
    if (!guards.breaker) breaker = CLOSED;

    return {
        sample: { id, ms, outcome: ok ? "ok" : "error", attempts },
        breaker,
    };
}

function reducer(sim: Sim, action: Action): Sim {
    switch (action.type) {
        case "tick": {
            const { sample, breaker } = request(sim, sim.tick);
            return {
                ...sim,
                tick: sim.tick + 1,
                breaker,
                samples: [...sim.samples, sample].slice(-WINDOW),
            };
        }
        case "health":
            return { ...sim, health: action.health };
        case "toggle":
            return {
                ...sim,
                breaker: CLOSED,
                guards: {
                    ...sim.guards,
                    [action.guard]: !sim.guards[action.guard],
                },
            };
        case "reset":
            return INITIAL;
    }
}

function stats(samples: Sample[]) {
    if (samples.length === 0) return null;
    const n = samples.length;
    const sorted = samples.map((s) => s.ms).sort((a, b) => a - b);
    const meanMs = sorted.reduce((a, b) => a + b, 0) / n;
    return {
        success: samples.filter((s) => s.outcome === "ok").length / n,
        p99: sorted[Math.ceil(0.99 * n) - 1],
        load: samples.reduce((a, s) => a + s.attempts, 0) / n,
        // Little's law: requests in flight = arrival rate x time in system.
        inFlight: meanMs / TICK_MS,
    };
}

function note(sim: Sim) {
    const { health, guards, breaker } = sim;
    if (guards.breaker && breaker.state === "open")
        return "Breaker open. Requests fail fast in 1ms and the upstream gets room to recover.";
    if (health === "healthy")
        return "All green. Break the upstream and watch what callers go through.";
    if (!guards.timeout)
        return health === "down"
            ? "The upstream accepts connections and never answers. Every request hangs for 3s holding a slot."
            : "A slow tail upstream becomes your latency. Without a timeout, callers wait as long as the upstream does.";
    if (health === "down" && guards.retry && !guards.breaker)
        return "Retries against a dead upstream triple its load and buy nothing. Add a circuit breaker.";
    if (health === "slow" && !guards.retry)
        return "Timeouts cap the wait, but the slow tail now shows up as errors. Retry it.";
    if (health === "slow")
        return "Timeouts bound the wait and jittered retries recover the tail. This is the steady state to aim for.";
    return "Timeouts stop the hang, but every request still pays for a call that cannot succeed.";
}

export function FailureDrill() {
    const [sim, dispatch] = useReducer(reducer, INITIAL);
    const [playing, setPlaying] = useState(false);
    const [userControlled, setUserControlled] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!playing) return;
        const id = window.setInterval(
            () => dispatch({ type: "tick" }),
            TICK_MS,
        );
        return () => window.clearInterval(id);
    }, [playing]);

    useEffect(() => {
        const root = rootRef.current;
        if (userControlled || !root) return;
        const observer = new IntersectionObserver(([entry]) =>
            setPlaying(entry.isIntersecting),
        );
        observer.observe(root);
        return () => observer.disconnect();
    }, [userControlled]);

    const toggle = () => {
        setUserControlled(true);
        setPlaying((p) => !p);
    };
    const reset = () => dispatch({ type: "reset" });
    const cycleHealth = () =>
        dispatch({
            type: "health",
            health: HEALTHS[(HEALTHS.indexOf(sim.health) + 1) % HEALTHS.length],
        });

    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.target !== e.currentTarget) return;
        if (e.metaKey || e.ctrlKey || e.altKey) return;
        const guard = GUARDS.find((g) => g.hotkey === e.key);
        if (guard) dispatch({ type: "toggle", guard: guard.key });
        else if (e.key === " ") {
            e.preventDefault();
            toggle();
        } else if (e.key.toLowerCase() === "b") cycleHealth();
        else if (e.key.toLowerCase() === "r") reset();
    };

    const s = stats(sim.samples);

    return (
        <div
            ref={rootRef}
            role="group"
            tabIndex={0}
            onKeyDown={onKeyDown}
            aria-label="Failure drill for a service and its upstream dependency. B cycles upstream health, 1 to 3 toggle timeouts, retries, and circuit breaker, space pauses, R resets."
            className="shadow-panel relative overflow-hidden rounded-xl border bg-card outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
        >
            <div className="flex items-center gap-3 border-b px-4 py-2.5">
                <div className="flex gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                    failure-drill <span className="text-foreground">api</span>
                </span>
                <div className="ml-auto flex items-center gap-1">
                    <IconButton
                        label={playing ? "Pause" : "Run"}
                        onClick={toggle}
                    >
                        {playing ? (
                            <Pause className="h-3.5 w-3.5" />
                        ) : (
                            <Play className="h-3.5 w-3.5" />
                        )}
                    </IconButton>
                    <IconButton label="Reset" onClick={reset}>
                        <RotateCcw className="h-3.5 w-3.5" />
                    </IconButton>
                </div>
            </div>

            <Topology sim={sim} onUpstreamClick={cycleHealth} />

            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t px-4 py-2.5 font-mono text-2xs">
                <Segmented
                    label="upstream"
                    options={HEALTHS}
                    value={sim.health}
                    onChange={(health) => dispatch({ type: "health", health })}
                />
                <div className="flex items-center gap-1">
                    <span className="mr-1 text-muted-foreground">guards</span>
                    {GUARDS.map((g) => (
                        <button
                            key={g.key}
                            type="button"
                            aria-pressed={sim.guards[g.key]}
                            onClick={() =>
                                dispatch({ type: "toggle", guard: g.key })
                            }
                            className={cn(
                                "rounded px-1.5 py-0.5 ring-1 transition-colors",
                                sim.guards[g.key]
                                    ? "bg-foreground text-background ring-foreground"
                                    : "text-muted-foreground ring-border hover:text-foreground",
                            )}
                        >
                            {g.label}
                        </button>
                    ))}
                </div>
            </div>

            <LatencyChart samples={sim.samples} timeout={sim.guards.timeout} />

            <dl className="grid grid-cols-2 gap-px border-t bg-border sm:grid-cols-4">
                <Metric
                    label="success"
                    value={s && `${Math.round(s.success * 100)}%`}
                    tone={s && s.success < 0.9 ? "bad" : undefined}
                />
                <Metric
                    label="p99"
                    value={s && formatMs(s.p99)}
                    tone={s && s.p99 > 1000 ? "bad" : undefined}
                />
                <Metric
                    label="upstream load"
                    value={s && `${s.load.toFixed(1)}x`}
                    tone={s && s.load > 1.5 ? "bad" : undefined}
                />
                <Metric
                    label="in flight"
                    value={s && s.inFlight.toFixed(1)}
                    tone={s && s.inFlight > 5 ? "bad" : undefined}
                />
            </dl>

            <p
                className="border-t bg-muted/40 px-4 py-3 font-mono text-xs text-muted-foreground"
                aria-live={userControlled ? "polite" : "off"}
            >
                <span className="text-brand">{"›"}</span> {note(sim)}
            </p>
        </div>
    );
}

function Topology({
    sim,
    onUpstreamClick,
}: {
    sim: Sim;
    onUpstreamClick: () => void;
}) {
    const breakerOn = sim.guards.breaker;
    const dots = sim.samples.slice(-VISIBLE_DOTS);

    const status = (node: (typeof NODES)[number]) => {
        if (node === "upstream") return sim.health;
        if (node === "service" && breakerOn)
            return `breaker ${sim.breaker.state}`;
        return "healthy";
    };

    return (
        <div className="relative px-2 pt-5 pb-6">
            <div
                className="absolute inset-x-0 top-[2.35rem] h-px"
                aria-hidden="true"
            >
                <div
                    className="absolute h-px bg-border"
                    style={{
                        left: `${nodeCenter(0)}%`,
                        right: `${100 - nodeCenter(NODES.length - 1)}%`,
                    }}
                />
                {dots.map((d) => (
                    <span
                        key={d.id}
                        className="travel absolute top-0 left-0 w-full"
                        style={
                            {
                                "--from": `${nodeCenter(0)}%`,
                                "--to": `${nodeCenter(d.outcome === "shed" ? 2 : 3)}%`,
                                animationDuration: `${TRAVEL_MS}ms`,
                            } as React.CSSProperties
                        }
                    >
                        <span
                            className={cn(
                                "absolute -top-[3px] -left-[3px] h-[7px] w-[7px] rounded-full",
                                OUTCOME_CLASS[d.outcome],
                            )}
                        />
                    </span>
                ))}
            </div>
            <div className="relative grid grid-cols-4">
                {NODES.map((node) => {
                    const isUpstream = node === "upstream";
                    const label = status(node);
                    const tone = isUpstream
                        ? HEALTH_CLASS[sim.health]
                        : label === "breaker open"
                          ? "text-brand"
                          : "text-muted-foreground";
                    const body = (
                        <>
                            <span
                                className={cn(
                                    "rounded-md border bg-card px-2 py-1 text-foreground transition-colors",
                                    isUpstream &&
                                        "group-hover:border-foreground/40",
                                    isUpstream &&
                                        sim.health === "down" &&
                                        "border-red-500/60",
                                    label === "breaker open" &&
                                        "border-brand/60",
                                )}
                            >
                                {node}
                            </span>
                            <span className={cn("mt-1.5 text-2xs", tone)}>
                                {label}
                            </span>
                        </>
                    );
                    return isUpstream ? (
                        <button
                            key={node}
                            type="button"
                            onClick={onUpstreamClick}
                            title="Cycle upstream health"
                            className="group flex flex-col items-center font-mono text-xs"
                        >
                            {body}
                        </button>
                    ) : (
                        <div
                            key={node}
                            className="flex flex-col items-center font-mono text-xs"
                        >
                            {body}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function Segmented<T extends string>({
    label,
    options,
    value,
    onChange,
}: {
    label: string;
    options: T[];
    value: T;
    onChange: (value: T) => void;
}) {
    return (
        <div
            className="flex items-center gap-1"
            role="radiogroup"
            aria-label={label}
        >
            <span className="mr-1 text-muted-foreground">{label}</span>
            {options.map((option) => (
                <button
                    key={option}
                    type="button"
                    role="radio"
                    aria-checked={value === option}
                    onClick={() => onChange(option)}
                    className={cn(
                        "rounded px-1.5 py-0.5 transition-colors",
                        value === option
                            ? "bg-brand text-white dark:text-background"
                            : "text-muted-foreground hover:text-foreground",
                    )}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}

const CHART_MAX_MS = HANG_MS;
const logHeight = (ms: number) =>
    Math.max(4, (Math.log10(Math.max(ms, 1)) / Math.log10(CHART_MAX_MS)) * 100);

function LatencyChart({
    samples,
    timeout,
}: {
    samples: Sample[];
    timeout: boolean;
}) {
    return (
        <div className="border-t px-4 pt-3 pb-2">
            <div className="mb-2 flex items-center justify-between gap-3 font-mono text-2xs text-muted-foreground">
                <span className="truncate">
                    latency
                    <span className="hidden sm:inline"> per request</span>, log
                    scale
                </span>
                <span className="flex shrink-0 items-center gap-2.5 whitespace-nowrap">
                    <Legend outcome="ok" label="ok" />
                    <Legend outcome="error" label="error" />
                    <Legend outcome="shed" label="fast-fail" />
                </span>
            </div>
            <div className="relative h-20">
                <div
                    className="absolute inset-x-0 top-0 border-t border-dashed border-border"
                    aria-hidden="true"
                />
                <span className="absolute top-0 right-0 -translate-y-1/2 bg-card pl-1 font-mono text-2xs text-muted-foreground">
                    3s
                </span>
                {timeout && (
                    <div
                        className="absolute inset-x-0 border-t border-dashed border-brand/50"
                        style={{ bottom: `${logHeight(TIMEOUT_MS)}%` }}
                        aria-hidden="true"
                    >
                        <span className="absolute right-0 -translate-y-1/2 bg-card pl-1 font-mono text-2xs text-brand">
                            {formatMs(TIMEOUT_MS)}
                        </span>
                    </div>
                )}
                <div className="absolute inset-0 flex items-end gap-px pr-11">
                    {samples.length === 0 && (
                        <span className="mb-1 font-mono text-2xs text-muted-foreground">
                            waiting for traffic
                        </span>
                    )}
                    {samples.map((sample) => (
                        <span
                            key={sample.id}
                            className={cn(
                                "min-w-0 flex-1 rounded-t-[1px] transition-[height] duration-200",
                                OUTCOME_CLASS[sample.outcome],
                            )}
                            style={{ height: `${logHeight(sample.ms)}%` }}
                            title={`${formatMs(sample.ms)} ${sample.outcome}`}
                        />
                    ))}
                    {Array.from({ length: WINDOW - samples.length }, (_, i) => (
                        <span key={`pad-${i}`} className="flex-1" />
                    ))}
                </div>
            </div>
        </div>
    );
}

function Legend({ outcome, label }: { outcome: Outcome; label: string }) {
    return (
        <span className="flex items-center gap-1">
            <span
                className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    OUTCOME_CLASS[outcome],
                )}
            />
            {label}
        </span>
    );
}

function Metric({
    label,
    value,
    tone,
}: {
    label: string;
    value: string | null;
    tone?: "bad";
}) {
    return (
        <div className="bg-card px-4 py-2.5">
            <dt className="font-mono text-2xs text-muted-foreground">
                {label}
            </dt>
            <dd
                className={cn(
                    "mt-0.5 font-mono text-sm tabular-nums transition-colors",
                    tone === "bad"
                        ? "text-red-600 dark:text-red-400"
                        : "text-foreground",
                )}
            >
                {value ?? "n/a"}
            </dd>
        </div>
    );
}

function formatMs(ms: number) {
    return ms >= 1000 ? `${(ms / 1000).toFixed(1)}s` : `${Math.round(ms)}ms`;
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
