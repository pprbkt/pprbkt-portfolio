"use client";

import { ProjectCard } from "@/components/ui/ProjectCard";
import { portfolioData } from "@/data/portfolio";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WorksPage() {
    return (
        <div className="min-h-screen bg-background pt-32 pb-24">
            <div className="container px-4 md:px-6 space-y-16">
                <div className="flex flex-col items-start gap-8">
                    <Link href="/">
                        <Button variant="ghost" className="gap-2 pl-0 hover:bg-transparent hover:text-accent transition-colors">
                            <ArrowLeft className="h-5 w-5" /> Back to Home
                        </Button>
                    </Link>

                    <div className="space-y-4">
                        <span className="text-sm font-medium text-accent uppercase tracking-wider">
                            Portfolio
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight font-display">
                            ALL PROJECTS
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-[600px]">
                            A comprehensive list of my work, experiments, and open-source contributions.
                        </p>
                    </div>
                </div>

                <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
                    {portfolioData.projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                    {/* Duplicating projects to simulate a larger portfolio list for the demo */}
                    {portfolioData.projects.map((project, index) => (
                        <ProjectCard key={`dup-${index}`} project={project} index={index + 4} />
                    ))}
                </div>
            </div>
        </div>
    );
}
