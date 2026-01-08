"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function Contact() {
    return (
        <section id="contact" className="py-24 bg-background relative overflow-hidden">
            <div className="container px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center text-center space-y-10">
                    <SectionReveal variant="blur" className="space-y-4">
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter font-display">
                            LET&apos;S WORK <br /> TOGETHER
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
                            Have a project in mind? Let&apos;s build something amazing.
                        </p>
                    </SectionReveal>

                    <SectionReveal variant="scale" delay={0.2}>
                        <a href={`mailto:${portfolioData.socials.email}`} className="inline-block">
                            <Button size="lg" className="h-20 px-10 rounded-full text-xl gap-3 bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-105 transition-all duration-300">
                                {portfolioData.socials.email} <ArrowUpRight className="h-6 w-6" />
                            </Button>
                        </a>
                    </SectionReveal>

                    <SectionReveal variant="blur" delay={0.4} className="flex flex-wrap justify-center gap-x-8 gap-y-4 pt-12 w-full max-w-4xl border-t border-border/50">
                        <a href={portfolioData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors text-center">LinkedIn</a>
                        <a href={portfolioData.socials.github} target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors text-center">GitHub</a>
                        <a href={portfolioData.socials.x} target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors text-center">X (Twitter)</a>
                        <a href={portfolioData.socials.website} target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors text-center">Website</a>
                        <span className="text-lg font-medium text-muted-foreground text-center">{portfolioData.socials.phone}</span>
                    </SectionReveal>
                </div>
            </div>
        </section>
    );
}
