"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PrintstreamPattern } from "./PrintstreamPattern";

// Define Project interface locally if not exported from data/portfolio
// or import it if available. Using the structure seen in the file view.
interface Project {
    title: string;
    description: string;
    tags: string[];
    link: string;
    image?: string;
    // adding optional fields to match potential new data structure or fallback
    links?: {
        demo?: string;
        github?: string;
    };
}

interface ProjectCardProps {
    project: Project;
    index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
    // Fallback for link if project.links structure is different
    const projectLink = project.link || project.links?.demo || "#";

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative h-full"
        >
            <Link href={projectLink} className="block h-full">
                <div
                    className={cn(
                        "relative h-full flex flex-col justify-between overflow-hidden rounded-3xl border border-border/50 bg-secondary/10 p-8 transition-all duration-500",
                        "hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/5",
                        // Pearlescent effect
                        "group-hover:bg-[url('/noise.png')] group-hover:bg-pearlescent group-hover:animate-holo-pan group-hover:bg-[length:200%_100%]"
                    )}
                >
                    {/* Subtle XX Pattern on Hover */}
                    <PrintstreamPattern className="opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500" />

                    {/* Top Section */}
                    <div className="z-10 flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-medium text-muted-foreground group-hover:text-accent transition-colors">
                                REQ.0{index + 1}
                            </span>
                            <div className="p-2 rounded-full bg-background/50 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                                <ArrowUpRight className="w-4 h-4" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-3xl font-bold font-display leading-tight group-hover:translate-x-1 transition-transform duration-300">
                                {project.title}
                            </h3>
                            <p className="text-muted-foreground line-clamp-3 group-hover:text-foreground/80 transition-colors">
                                {project.description}
                            </p>
                        </div>
                    </div>

                    {/* Bottom Tags */}
                    <div className="mt-8 flex flex-wrap gap-2 z-10">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full border border-border/50 bg-background/30 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm group-hover:border-accent/20 group-hover:text-foreground transition-colors"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
