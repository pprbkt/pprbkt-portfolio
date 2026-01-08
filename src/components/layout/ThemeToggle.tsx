"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Avoid synchronous setState warning by deferring
        const timer = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);

    if (!mounted) {
        return (
            <button
                className="rounded-full p-2 hover:bg-accent transition-colors duration-200 opacity-50 cursor-default"
                aria-label="Toggle theme"
            >
                <Sun className="h-5 w-5 text-foreground" />
            </button>
        );
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full p-2 hover:bg-accent transition-colors duration-200"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? (
                <Sun className="h-5 w-5 text-foreground" />
            ) : (
                <Moon className="h-5 w-5 text-foreground" />
            )}
        </button>
    );
}
