"use client";

import { cn } from "@/lib/utils";

interface PrintstreamPatternProps {
    className?: string;
    opacity?: number;
}

export function PrintstreamPattern({ className, opacity = 0.03 }: PrintstreamPatternProps) {
    return (
        <div
            className={cn("absolute inset-0 pointer-events-none select-none z-0 overflow-hidden", className)}
            style={{ opacity }}
            aria-hidden="true"
        >
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="xx-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        {/* Subtler X shape */}
                        <path
                            d="M20 20 L30 30 M30 20 L20 30"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="square"
                            fill="none"
                        />
                        {/* Occasional second X for the 'XX' look, offset slightly */}
                        <path
                            d="M35 20 L45 30 M45 20 L35 30"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="square"
                            fill="none"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#xx-pattern)" />
            </svg>
        </div>
    );
}
