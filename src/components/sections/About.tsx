"use client";

import { portfolioData } from "@/data/portfolio";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";

export function About() {
    return (
        <section id="about" className="py-24 bg-secondary/30">
            <div className="container px-4 md:px-6">
                <div className="grid gap-16 lg:grid-cols-2">
                    {/* Left Column: Title & Headline */}
                    <SectionReveal variant="blur">
                        <h2 className="text-sm font-medium text-accent uppercase tracking-wider mb-6">
                            {portfolioData.about.title}
                        </h2>
                        <h3 className="text-3xl md:text-5xl font-bold font-display leading-tight uppercase">
                            {portfolioData.hero.role} BASED IN INDIA, PASSIONATE ABOUT BUILDING INTELLIGENT SYSTEMS.
                        </h3>
                    </SectionReveal>

                    {/* Right Column: Bio, Education, Skills, Achievements */}
                    <div className="space-y-12">
                        {/* Bio */}
                        <SectionReveal variant="blur" delay={0.2}>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {portfolioData.about.description}
                            </p>
                        </SectionReveal>

                        {/* Education */}
                        <SectionReveal variant="stagger" className="space-y-4">
                            <h4 className="text-xl font-bold font-display uppercase border-b border-border/50 pb-2">Education</h4>
                            {portfolioData.about.education.map((edu, index) => (
                                <RevealItem key={index} variant="blur" className="space-y-1">
                                    <div className="flex justify-between items-start flex-wrap gap-2">
                                        <h5 className="font-bold text-foreground">{edu.school}</h5>
                                        <span className="text-sm text-muted-foreground">{edu.period}</span>
                                    </div>
                                    <p className="text-sm font-medium">{edu.degree}</p>
                                    <p className="text-sm text-muted-foreground">{edu.location}</p>
                                    <p className="text-xs text-muted-foreground mt-2 italic">Relevant Coursework: {edu.coursework}</p>
                                </RevealItem>
                            ))}
                        </SectionReveal>

                        {/* Achievements */}
                        <SectionReveal variant="stagger" className="space-y-4">
                            <h4 className="text-xl font-bold font-display uppercase border-b border-border/50 pb-2">Achievements</h4>
                            <ul className="space-y-4">
                                {portfolioData.about.achievements.map((achievement, index) => (
                                    <RevealItem key={index} variant="blur" className="space-y-1">
                                        <div className="flex justify-between items-start flex-wrap gap-2">
                                            <h5 className="font-bold text-foreground">{achievement.title}</h5>
                                            <span className="text-xs font-medium border border-border px-2 py-0.5 rounded-full">{achievement.issuer}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{achievement.desc}</p>
                                    </RevealItem>
                                ))}
                            </ul>
                        </SectionReveal>

                        {/* Skills */}
                        <SectionReveal variant="stagger" className="space-y-6">
                            <h4 className="text-xl font-bold font-display uppercase border-b border-border/50 pb-2">Technical Skills</h4>

                            <div className="space-y-3">
                                <span className="text-sm font-semibold text-foreground block">Languages</span>
                                <RevealItem className="flex flex-wrap gap-2">
                                    {portfolioData.about.skills.languages.map(s => (
                                        <span key={s} className="px-3 py-1 bg-background border rounded-md text-xs font-medium">{s}</span>
                                    ))}
                                </RevealItem>
                            </div>

                            <div className="space-y-3">
                                <span className="text-sm font-semibold text-foreground block">AI/ML Frameworks</span>
                                <RevealItem className="flex flex-wrap gap-2">
                                    {portfolioData.about.skills.frameworks.map(s => (
                                        <span key={s} className="px-3 py-1 bg-background border rounded-md text-xs font-medium">{s}</span>
                                    ))}
                                </RevealItem>
                            </div>

                            <div className="space-y-3">
                                <span className="text-sm font-semibold text-foreground block">Web Tech</span>
                                <RevealItem className="flex flex-wrap gap-2">
                                    {portfolioData.about.skills.web.map(s => (
                                        <span key={s} className="px-3 py-1 bg-background border rounded-md text-xs font-medium">{s}</span>
                                    ))}
                                </RevealItem>
                            </div>
                        </SectionReveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
