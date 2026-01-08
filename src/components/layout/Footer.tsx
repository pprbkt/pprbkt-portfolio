"use client";

import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";
import { portfolioData } from "@/data/portfolio";

export function Footer() {
    return (
        <footer className="bg-muted/50 border-t">
            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} {portfolioData.hero.name}. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <Link
                            href={portfolioData.socials.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Github className="h-5 w-5" />
                            <span className="sr-only">GitHub</span>
                        </Link>
                        <Link
                            href={portfolioData.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Linkedin className="h-5 w-5" />
                            <span className="sr-only">LinkedIn</span>
                        </Link>
                        <Link
                            href={portfolioData.socials.x}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Twitter className="h-5 w-5" />
                            <span className="sr-only">X (Twitter)</span>
                        </Link>
                        <Link
                            href={`mailto:${portfolioData.socials.email}`}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Mail className="h-5 w-5" />
                            <span className="sr-only">Email</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
