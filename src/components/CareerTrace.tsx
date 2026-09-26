import { useId, useState, type KeyboardEvent } from "react";
import { ym, type CareerSpan, type YearMonth } from "../data/career";
import { cn } from "../lib/utils";

type Props = { spans: CareerSpan[]; now: YearMonth };

const MIN_BAR_WIDTH = "6px";
const MOBILE_LABEL_STEP = 2;
const LABEL_COLUMN = "grid-cols-[8.5rem_1fr] sm:grid-cols-[13rem_1fr]";

const isLive = (span: CareerSpan) =>
    span.segments.some((s) => s.to === undefined);

const shortYear = (y: number) => `'${String(y).slice(2)}`;

function earliestYear(spans: CareerSpan[]) {
    const starts = spans.flatMap((s) => [
        ...s.segments.map((seg) => seg.from),
        ...(s.milestones ?? []).map((m) => m.at),
    ]);
    return Math.floor(Math.min(...starts));
}

export function CareerTrace({ spans, now }: Props) {
    const [selected, setSelected] = useState(spans[0].slug);
    const detailId = useId();
    const span = spans.find((s) => s.slug === selected) ?? spans[0];

    const start = earliestYear(spans);
    const end = now.year + 1;
    const nowAt = ym(now.year, now.month);
    const years = Array.from({ length: end - start }, (_, i) => start + i);
    const pct = (y: number) => ((y - start) / (end - start)) * 100;
    const optionId = (slug: string) => `${detailId}-${slug}`;

    const move = (delta: number) => {
        const i = spans.findIndex((s) => s.slug === selected);
        const next = Math.min(spans.length - 1, Math.max(0, i + delta));
        setSelected(spans[next].slug);
    };

    const onKey = (e: KeyboardEvent) => {
        if (e.metaKey || e.ctrlKey || e.altKey) return;
        if (e.key === "ArrowDown" || e.key === "j") {
            e.preventDefault();
            move(1);
        } else if (e.key === "ArrowUp" || e.key === "k") {
            e.preventDefault();
            move(-1);
        }
    };

    return (
        <div className="grid overflow-hidden rounded-xl border bg-card lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="min-w-0 border-b lg:border-b-0 lg:border-r">
                <div className="flex items-center justify-between border-b px-4 py-2.5 font-mono text-xs text-muted-foreground">
                    <span>
                        trace <span className="text-foreground">career</span>
                    </span>
                    <span className="hidden sm:inline">
                        {spans.length} spans · {start} to now
                    </span>
                </div>

                <div
                    role="listbox"
                    aria-label="Career timeline"
                    aria-controls={detailId}
                    aria-activedescendant={optionId(selected)}
                    tabIndex={0}
                    onKeyDown={onKey}
                    className="relative outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/50"
                >
                    <div aria-hidden className={cn("grid", LABEL_COLUMN)}>
                        <div className="border-b" />
                        <div className="relative h-8 border-b">
                            {years.map((y) => (
                                <span
                                    key={y}
                                    className={cn(
                                        "absolute top-1/2 -translate-y-1/2 pl-1.5 font-mono text-2xs text-muted-foreground",
                                        (y - start) % MOBILE_LABEL_STEP !== 0 &&
                                            "hidden sm:block",
                                    )}
                                    style={{ left: `${pct(y)}%` }}
                                >
                                    {shortYear(y)}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-y-0 left-[8.5rem] right-0 sm:left-[13rem]"
                    >
                        {years.map((y) => (
                            <span
                                key={y}
                                className="absolute inset-y-0 w-px bg-border/70"
                                style={{ left: `${pct(y)}%` }}
                            />
                        ))}
                    </div>

                    {spans.map((s) => {
                        const on = s.slug === selected;
                        return (
                            <div
                                key={s.slug}
                                id={optionId(s.slug)}
                                role="option"
                                aria-selected={on}
                                onClick={() => setSelected(s.slug)}
                                onMouseEnter={() => setSelected(s.slug)}
                                className={cn(
                                    "relative grid cursor-pointer border-b transition-colors last:border-b-0",
                                    LABEL_COLUMN,
                                    on ? "bg-accent/70" : "hover:bg-accent/40",
                                )}
                            >
                                <div className="relative min-w-0 px-4 py-3">
                                    <span
                                        className={cn(
                                            "absolute left-0 top-0 h-full w-0.5 transition-colors",
                                            on && "bg-brand",
                                        )}
                                    />
                                    <div className="text-crumb font-medium leading-snug sm:truncate sm:text-sm">
                                        {s.name}
                                    </div>
                                    <div className="truncate font-mono text-2xs text-muted-foreground">
                                        {s.period}
                                    </div>
                                </div>
                                <div className="relative">
                                    {s.segments.map(({ from, to = nowAt }) => (
                                        <span
                                            key={from}
                                            className={cn(
                                                "absolute top-1/2 h-2.5 -translate-y-1/2 rounded-sm transition-colors",
                                                on
                                                    ? "bg-brand"
                                                    : "bg-foreground/25",
                                                isLive(s) && "live-stripes",
                                            )}
                                            style={{
                                                left: `${pct(from)}%`,
                                                width: `max(${MIN_BAR_WIDTH}, ${pct(to) - pct(from)}%)`,
                                            }}
                                        />
                                    ))}
                                    {s.milestones?.map((m) => (
                                        <span
                                            key={m.label}
                                            title={m.label}
                                            className={cn(
                                                "absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[2px] transition-colors",
                                                on
                                                    ? "bg-brand"
                                                    : "bg-foreground/35",
                                            )}
                                            style={{ left: `${pct(m.at)}%` }}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div id={detailId} className="flex flex-col">
                <div className="flex items-center gap-2 border-b px-5 py-2.5 font-mono text-xs text-muted-foreground">
                    <span
                        className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            isLive(span) ? "bg-brand" : "bg-foreground/30",
                        )}
                    />
                    span <span className="text-foreground">{span.slug}</span>
                </div>
                <div className="flex-1 space-y-5 p-5">
                    <div>
                        <h3 className="text-lg font-semibold tracking-tight">
                            {span.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {span.role}
                        </p>
                    </div>
                    <dl className="space-y-1.5 font-mono text-xs">
                        {[["period", span.period], ...span.attrs].map(
                            ([k, v]) => (
                                <div key={k} className="flex gap-3">
                                    <dt className="w-24 shrink-0 text-muted-foreground">
                                        {k}
                                    </dt>
                                    <dd className="min-w-0">{v}</dd>
                                </div>
                            ),
                        )}
                    </dl>
                    <ul className="space-y-2.5 text-sm leading-relaxed text-foreground/85">
                        {span.highlights.map((h) => (
                            <li key={h} className="relative pl-4">
                                <span className="absolute left-0 top-[0.6em] h-1 w-1 rounded-full bg-brand" />
                                {h}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
