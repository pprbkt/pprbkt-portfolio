"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    variant?: "simple" | "blur" | "scale" | "stagger";
    staggerChildren?: number;
}

export function SectionReveal({
    children,
    className,
    delay = 0,
    duration = 0.8, // Slightly slower for more cinematic feel
    variant = "blur", // Default to the premium blur effect
    staggerChildren = 0.1
}: SectionRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const variants: Record<string, Variants> = {
        simple: {
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration, delay, ease: [0.21, 0.47, 0.32, 0.98] } } // Apple-style ease
        },
        blur: {
            hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration, delay, ease: [0.21, 0.47, 0.32, 0.98] } }
        },
        scale: {
            hidden: { opacity: 0, scale: 0.95, filter: "blur(4px)" },
            visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration, delay, ease: [0.21, 0.47, 0.32, 0.98] } }
        },
        stagger: {
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: staggerChildren,
                    delayChildren: delay
                }
            }
        }
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants[variant]}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
}

// Helper component for staggered children
export function RevealItem({ children, className, variant = "blur" }: { children: ReactNode, className?: string, variant?: "simple" | "blur" | "scale" }) {
    const itemVariants: Record<string, Variants> = {
        simple: {
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
        },
        blur: {
            hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut" } }
        },
        scale: {
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
        }
    };

    return (
        <motion.div variants={itemVariants[variant]} className={className}>
            {children}
        </motion.div>
    );
}
