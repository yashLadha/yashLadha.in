import * as React from "react";

import { cn } from "../../lib/utils";

function Kbd({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
    return (
        <kbd
            className={cn(
                "inline-flex h-5 min-w-5 items-center justify-center gap-0.5 rounded border border-b-2 bg-background px-1 font-mono text-2xs font-medium leading-none text-muted-foreground",
                className,
            )}
            {...props}
        />
    );
}

export { Kbd };
