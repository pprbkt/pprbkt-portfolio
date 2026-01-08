"use client";

import { ProjectCard } from "@/components/ui/ProjectCard";
import { portfolioData } from "@/data/portfolio";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";

export function Work() {
    return (
        <section id="work" className="py-24 bg-background">
            <div className="container px-4 md:px-6 space-y-16">
                <SectionReveal variant="blur">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <div className="space-y-2">
                            <span className="text-sm font-medium text-accent uppercase tracking-wider">
                                Selected Works
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight font-display">
                                FEATURED <br /> PROJECTS
                            </h2>
                        </div>
                        <div className="flex flex-col items-start md:items-end gap-6">
                            <p className="text-muted-foreground max-w-[400px] text-lg md:text-right">
                                A curated selection of projects demonstrating my expertise in
                                full-stack development and design.
                            </p>
                            <Link href="/works">
                                <Button variant="outline" className="rounded-full border-foreground/20 hover:bg-foreground hover:text-background transition-colors gap-2">
                                    View All Projects <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </SectionReveal>

                <SectionReveal variant="stagger" className="grid gap-8 md:grid-cols-2">
                    {portfolioData.projects.slice(0, 4).map((project, index) => (
                        <RevealItem key={index} variant="scale">
                            <ProjectCard project={project} index={index} />
                        </RevealItem>
                    ))}
                </SectionReveal>
            </div>
        </section>
    );
}
