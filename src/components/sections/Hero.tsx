"use client";

import { Button } from "@/components/ui/button";
import { portfolioData } from "@/data/portfolio";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { HeroBackground } from "@/components/layout/HeroBackground";
import { Marquee } from "@/components/ui/Marquee";

export function Hero() {
    // Split name for styling flexibility "DHANUSH H S" -> "DHANUSH" "H S"
    const nameParts = portfolioData.hero.name.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* 3D Interactive Background */}
            <HeroBackground />

            <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-10 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-6"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full border border-border bg-background/50 backdrop-blur-sm text-sm font-medium text-muted-foreground">
                        {portfolioData.hero.role}
                    </span>

                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight font-display text-foreground leading-[0.9] uppercase">
                        HI! I&apos;M <br />
                        <span className="text-muted-foreground/30">{firstName} {lastName}</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto font-light">
                        {portfolioData.hero.headline} <br />
                        Based in {portfolioData.hero.location}.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-6"
                >
                    <Link href="#work">
                        <Button size="lg" className="min-w-[180px] h-14 rounded-full text-lg gap-2 bg-foreground text-background hover:bg-foreground/90">
                            {portfolioData.hero.cta.primary} <ArrowRight className="h-5 w-5" />
                        </Button>
                    </Link>
                </motion.div>
            </div>

            {/* Decorative Text Parallax/Marquee */}
            <div className="absolute bottom-10 w-full opacity-5 pointer-events-none select-none z-0">
                <Marquee duration={80}>
                    <span className="text-[8rem] md:text-[10rem] font-bold font-display leading-none uppercase">
                        {portfolioData.hero.role} — {portfolioData.hero.name} —
                    </span>
                </Marquee>
            </div>

            {/* Printstream Deco Elements */}
            <div className="absolute top-24 left-10 md:left-20 text-[10px] font-mono text-muted-foreground/40 hidden md:block select-none pointer-events-none">
                {"/// SYSTEM_READY"} <br />
                LOC: {portfolioData.hero.location.toUpperCase()}
            </div>
            <div className="absolute bottom-24 right-10 md:right-20 text-[10px] font-mono text-muted-foreground/40 hidden md:block text-right select-none pointer-events-none">
                XX_INIT_SEQ <br />
                VER. 2.0.4
            </div>
        </section>
    );
}
