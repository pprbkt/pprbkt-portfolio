"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Project {
    title: string;
    description: string;
    tags: string[];
    link: string;
    image?: string;
}

interface ProjectCardProps {
    project: Project;
    index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }} // Reduced delay for smoother grid load
            className="group cursor-pointer"
        >
            <Link href={project.link} className="block space-y-4">
                <div className="aspect-[4/3] relative overflow-hidden rounded-md bg-muted">
                    {/* Placeholder Gradient/Image - Replace with next/image in real implementation */}
                    {/* Using a different gradient based on index to add variety if no image */}
                    <div className={cn(
                        "absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105",
                        index % 2 === 0 ? "bg-gradient-to-tr from-muted-foreground/10 to-muted" : "bg-gradient-to-bl from-muted to-muted-foreground/10"
                    )} />

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-300 delay-75">
                            <ArrowUpRight className="h-8 w-8" />
                        </div>
                    </div>

                    {/* Project Tag Overlay */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2 pointer-events-none">
                        {project.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="px-3 py-1 text-xs font-medium bg-background/80 backdrop-blur text-foreground rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="space-y-1">
                    <h3 className="text-2xl font-bold font-display group-hover:text-muted-foreground transition-colors duration-300">
                        {project.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2">
                        {project.description}
                    </p>
                </div>
            </Link>
        </motion.div>
    );
}
