"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
    children: ReactNode;
    className?: string;
    duration?: number;
    repeat?: number;
}

export function Marquee({
    children,
    className,
    duration = 20, // Seconds for one full loop
    repeat = 4 // Number of times to repeat content to ensure no gaps
}: MarqueeProps) {
    return (
        <div className={cn("overflow-hidden flex select-none gap-4 w-full", className)}>
            <motion.div
                className="flex min-w-full shrink-0 items-center justify-around gap-4" // gap-4 to match parent
                animate={{
                    x: ["0%", "-100%"],
                }}
                transition={{
                    duration,
                    ease: "linear",
                    repeat: Infinity,
                }}
            >
                {Array.from({ length: repeat }).map((_, i) => (
                    <div key={i} className="flex shrink-0 items-center gap-4">
                        {children}
                    </div>
                ))}
            </motion.div>
            <motion.div
                className="flex min-w-full shrink-0 items-center justify-around gap-4"
                animate={{
                    x: ["0%", "-100%"],
                }}
                transition={{
                    duration,
                    ease: "linear",
                    repeat: Infinity,
                }}
            >
                {Array.from({ length: repeat }).map((_, i) => (
                    <div key={i} className="flex shrink-0 items-center gap-4">
                        {children}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
