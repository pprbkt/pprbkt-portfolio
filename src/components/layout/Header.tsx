"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { cn } from "@/lib/utils";
import { portfolioData } from "@/data/portfolio";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Works", href: "#work" },
    { name: "Resume", href: "/resume.pdf", external: true },
    { name: "Contact", href: "#contact" },
];

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300 py-4",
                isScrolled
                    ? "bg-background/80 backdrop-blur-md border-b border-border/40"
                    : "bg-transparent"
            )}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold tracking-tight font-display uppercase relative z-10">
                    {portfolioData.hero.name}
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-2">
                    <ul className="flex items-center gap-1 bg-secondary/50 p-1 rounded-full border border-border/40 backdrop-blur-sm">
                        {navItems.map((item, index) => (
                            <li key={item.name} className="relative">
                                <Link
                                    href={item.href}
                                    target={item.external ? "_blank" : undefined}
                                    rel={item.external ? "noopener noreferrer" : undefined}
                                    className="relative z-10 px-4 py-2 block text-sm font-medium transition-colors uppercase tracking-wide hover:text-foreground"
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    {item.name}
                                </Link>
                                <AnimatePresence>
                                    {hoveredIndex === index && (
                                        <motion.span
                                            className="absolute inset-0 bg-background rounded-full shadow-sm border border-border/50"
                                            layoutId="hoverBackground"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1, transition: { duration: 0.15 } }}
                                            exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
                                        />
                                    )}
                                </AnimatePresence>
                            </li>
                        ))}
                    </ul>

                    <div className="ml-4 flex items-center gap-4">
                        <ThemeToggle />
                    </div>
                </nav>

                {/* Mobile Menu Toggle */}
                <div className="flex items-center gap-4 md:hidden">
                    <ThemeToggle />
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 -mr-2 text-foreground"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-b bg-background absolute top-full w-full left-0 overflow-hidden"
                    >
                        <div className="container px-4 py-6 space-y-4 flex flex-col">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    target={item.external ? "_blank" : undefined}
                                    rel={item.external ? "noopener noreferrer" : undefined}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg font-medium hover:text-primary transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
