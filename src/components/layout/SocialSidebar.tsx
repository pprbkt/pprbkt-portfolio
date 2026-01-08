"use client";

import { Github, Linkedin, Globe, Mail, Twitter } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export function SocialSidebar() {
    const socials = [
        { icon: Github, href: portfolioData.socials.github, label: "Github" },
        { icon: Linkedin, href: portfolioData.socials.linkedin, label: "LinkedIn" },
        { icon: Twitter, href: portfolioData.socials.x, label: "X (Twitter)" },
        { icon: Globe, href: portfolioData.socials.website, label: "Website" },
        { icon: Mail, href: `mailto:${portfolioData.socials.email}`, label: "Email" },
    ];

    return (
        <div className="fixed left-6 bottom-0 z-40 hidden md:flex flex-col items-center gap-6">
            <span className="writing-mode-vertical text-[10px] font-mono text-muted-foreground/30 tracking-widest mb-2 select-none">
                {"/// CONNECT"}
            </span>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="flex flex-col items-center gap-6 after:content-[''] after:w-[1px] after:h-24 after:bg-foreground/20 after:mt-2"
            >
                {socials.map((social, index) => (
                    <Link
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/60 hover:text-foreground hover:-translate-y-1 transition-all duration-300"
                        aria-label={social.label}
                    >
                        <social.icon className="h-5 w-5" />
                    </Link>
                ))}
            </motion.div>
        </div>
    );
}
