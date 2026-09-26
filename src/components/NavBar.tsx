import React, { useEffect, useState } from "react";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { Button } from "./ui/button";
import { Kbd } from "./ui/kbd";
import { openCommandPalette } from "../lib/commandPalette";
import { navItems } from "../data/site";
import { useModKey } from "../lib/useModKey";
import { currentTheme, THEME_CHANGE_EVENT, toggleTheme } from "../lib/theme";

function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        setIsDark(currentTheme() === "dark");
        const onChange = () => setIsDark(currentTheme() === "dark");
        window.addEventListener(THEME_CHANGE_EVENT, onChange);
        return () => window.removeEventListener(THEME_CHANGE_EVENT, onChange);
    }, []);

    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const { left, top, width, height } =
            event.currentTarget.getBoundingClientRect();
        toggleTheme({ x: left + width / 2, y: top + height / 2 });
    };

    const label = isDark ? "Switch to light mode" : "Switch to dark mode";

    return (
        <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9"
            onClick={onClick}
            aria-label={label}
            title={label}
        >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform duration-500 dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform duration-500 dark:rotate-0 dark:scale-100" />
        </Button>
    );
}

function isActive(pathname: string, href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavBar({ pathname }: { pathname: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const modKey = useModKey();

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="page-width flex h-(--nav-height) items-center justify-between gap-4">
                <a
                    href="/"
                    className="font-semibold tracking-tight transition-opacity hover:opacity-80"
                >
                    Yash Ladha
                </a>

                <div className="hidden items-center gap-1 md:flex">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            aria-current={
                                isActive(pathname, item.href)
                                    ? "page"
                                    : undefined
                            }
                            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground aria-[current=page]:bg-accent aria-[current=page]:text-foreground"
                        >
                            {item.label}
                        </a>
                    ))}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={openCommandPalette}
                        className="ml-2 h-8 pr-1.5 pl-2.5 font-normal text-muted-foreground"
                    >
                        <Search />
                        Search
                        <Kbd>{modKey}K</Kbd>
                    </Button>
                    <ThemeToggle />
                </div>

                <div className="flex items-center gap-1 md:hidden">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9"
                        onClick={openCommandPalette}
                        aria-label="Search"
                    >
                        <Search className="h-5 w-5" />
                    </Button>
                    <ThemeToggle />
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isOpen}
                    >
                        {isOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </Button>
                </div>
            </div>

            {isOpen && (
                <div className="border-t bg-background md:hidden">
                    <div className="page-width space-y-1 py-3">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                aria-current={
                                    isActive(pathname, item.href)
                                        ? "page"
                                        : undefined
                                }
                                className="block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent aria-[current=page]:bg-accent"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
