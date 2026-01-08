"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

// --- CONFIGURATION START ---
// Edit these to change the network graph content
// positions are percentage-based (0-100)
interface Node {
    id: string;
    label: string;
    x: number;
    y: number;
    size?: number;
}

interface Link {
    source: string;
    target: string;
}

const NODES: Node[] = [
    { id: "ai", label: "Artificial Intelligence", x: 50, y: 50, size: 20 },
    { id: "ml", label: "Machine Learning", x: 80, y: 30, size: 15 },
    { id: "nlp", label: "NLP", x: 70, y: 70, size: 12 },
    { id: "cv", label: "Computer Vision", x: 30, y: 40, size: 14 },
    { id: "web", label: "Web Dev", x: 20, y: 80, size: 16 },
    { id: "cloud", label: "Cloud Infra", x: 40, y: 15, size: 12 },
    { id: "data", label: "Data Science", x: 90, y: 60, size: 10 },
];

const LINKS: Link[] = [
    { source: "ai", target: "ml" },
    { source: "ai", target: "cv" },
    { source: "ai", target: "nlp" },
    { source: "ml", target: "data" },
    { source: "web", target: "cloud" },
    { source: "web", target: "ai" }, // Full stack AI integration
    { source: "ml", target: "cloud" },
];
// --- CONFIGURATION END ---

export function KnowledgeGraph() {
    // Zoom & Pan State
    const [viewBox, setViewBox] = useState({ x: 0, y: 0, w: 100, h: 100 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    // Helper to find node coordinates
    const getNode = (id: string) => NODES.find(n => n.id === id);

    // Robust Wheel Handler (Native non-passive listener)
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            const scaleFactor = 1.1;
            const direction = e.deltaY > 0 ? 1 : -1;

            setViewBox(prev => {
                const newW = direction > 0 ? prev.w * scaleFactor : prev.w / scaleFactor;
                const newH = direction > 0 ? prev.h * scaleFactor : prev.h / scaleFactor;

                // Clamp zoom
                if (newW > 200 || newW < 20) return prev;

                return {
                    ...prev,
                    w: newW,
                    h: newH,
                    x: prev.x + (prev.w - newW) / 2,
                    y: prev.y + (prev.h - newH) / 2
                };
            });
        };

        container.addEventListener('wheel', onWheel, { passive: false });
        return () => container.removeEventListener('wheel', onWheel);
    }, []);

    // Pan Handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        const dx = (e.clientX - dragStart.x) * (viewBox.w / 500); // Scale sensitivity
        const dy = (e.clientY - dragStart.y) * (viewBox.h / 500);
        setViewBox(prev => ({ ...prev, x: prev.x - dx, y: prev.y - dy }));
        setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div
            ref={containerRef}
            className="w-full h-[600px] lg:h-[800px] relative rounded-xl bg-background/20 backdrop-blur-sm overflow-hidden mt-12 cursor-move hover:bg-background/30 transition-colors"
        >

            {/* Background Decor */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <svg width="100%" height="100%">
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <div className="absolute top-4 left-4 text-[10px] font-mono text-muted-foreground/40 select-none">
                {"/// KNOWLEDGE_NET [INTERACTIVE]"}
            </div>

            <div className="absolute bottom-4 right-4 text-[10px] font-mono text-muted-foreground/40 select-none">
                SCROLL TO ZOOM / DRAG TO PAN
            </div>

            <svg
                className="w-full h-full p-0"
                viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
                preserveAspectRatio="xMidYMid meet"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                {/* Links */}
                {LINKS.map((link, i) => {
                    const source = getNode(link.source);
                    const target = getNode(link.target);
                    if (!source || !target) return null;

                    return (
                        <motion.line
                            key={i}
                            x1={source.x}
                            y1={source.y}
                            x2={target.x}
                            y2={target.y}
                            stroke="currentColor"
                            strokeWidth="0.2"
                            className="text-muted-foreground/40"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.5, delay: i * 0.1 }}
                        />
                    );
                })}

                {/* Nodes */}
                {NODES.map((node, i) => (
                    <motion.g
                        key={node.id}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                    >
                        {/* Pulse Effect - Uniform & Reduced */}
                        <motion.circle
                            cx={node.x}
                            cy={node.y}
                            r={3} // Reduced pulse base radius
                            fill="currentColor"
                            className="text-accent/20"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }} // Reduced scale and opacity
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                        />

                        {/* Core Node - Uniform Size */}
                        <circle
                            cx={node.x}
                            cy={node.y}
                            r={1.5} // Fixed uniform radius
                            fill="currentColor"
                            className="text-accent"
                        />

                        {/* Label - Smaller Text */}
                        <text
                            x={node.x}
                            y={node.y + 4}
                            textAnchor="middle"
                            fontSize="2"
                            className="fill-muted-foreground font-mono uppercase tracking-wider select-none"
                            style={{ pointerEvents: 'none' }}
                        >
                            {node.label}
                        </text>
                    </motion.g>
                ))}
            </svg>
        </div>
    );
}
