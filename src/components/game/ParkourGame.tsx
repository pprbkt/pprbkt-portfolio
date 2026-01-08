"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

interface Rect {
    x: number;
    y: number;
    w: number;
    h: number;
    type?: "platform" | "goal" | "danger";
}

// Harder Level Design (Grid based: 40px blocks)
const LEVEL_ONE: Rect[] = [
    { x: 40, y: 520, w: 120, h: 40, type: "platform" },   // Start
    { x: 240, y: 440, w: 80, h: 40, type: "platform" },   // Precision Jump 1
    { x: 400, y: 360, w: 40, h: 40, type: "platform" },   // Tiny Block
    { x: 520, y: 240, w: 80, h: 40, type: "platform" },   // High Jump
    { x: 700, y: 320, w: 40, h: 40, type: "platform" },   // Drop precision
    { x: 860, y: 280, w: 80, h: 40, type: "platform" },   // Recovery
    { x: 1040, y: 200, w: 40, h: 40, type: "platform" },  // Final tiny step
    { x: 1140, y: 160, w: 60, h: 60, type: "goal" },      // High Goal
    // Danger Floor
    { x: 0, y: 580, w: 1200, h: 20, type: "danger" },
    // Ceiling Spikes (Optional difficulty)
    { x: 480, y: 160, w: 160, h: 20, type: "danger" },
];

export function ParkourGame() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameState, setGameState] = useState<"playing" | "won" | "died">("playing");
    const { resolvedTheme } = useTheme();

    // Game State Refs
    const player = useRef({
        x: 100,
        y: 400,
        w: 30, // Slightly smaller than a block
        h: 30,
        vx: 0,
        vy: 0,
        grounded: false,
    });

    const keys = useRef({
        left: false,
        right: false,
        up: false,
    });

    const resetGame = () => {
        player.current = { x: 100, y: 400, w: 30, h: 30, vx: 0, vy: 0, grounded: false };
        setGameState("playing");
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Theme Colors
        const isDark = resolvedTheme === "dark";
        const colors = {
            bg: isDark ? "#09090B" : "#FFFFFF",         // zinc-950 vs white
            fg: isDark ? "#FAFAFA" : "#09090B",         // zinc-50 vs zinc-950
            accent: "#D2F24D",                          // lime
            danger: "#EF4444",                          // red-500
            grid: isDark ? "#27272A" : "#E4E4E7",       // zinc-800 vs zinc-200
        };

        let animationFrameId: number;

        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key.toLowerCase()) {
                case "a": case "arrowleft": keys.current.left = true; break;
                case "d": case "arrowright": keys.current.right = true; break;
                case " ": case "w": case "arrowup":
                    if (!keys.current.up && player.current.grounded) {
                        player.current.vy = -13;
                        player.current.grounded = false;
                    }
                    keys.current.up = true;
                    break;
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            switch (e.key.toLowerCase()) {
                case "a": case "arrowleft": keys.current.left = false; break;
                case "d": case "arrowright": keys.current.right = false; break;
                case " ": case "w": case "arrowup": keys.current.up = false; break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        // Physics Constants
        const GRAVITY = 0.6;
        const FRICTION = 0.82;
        const SPEED = 7;
        const ACCEL = 1.2;

        const update = () => {
            if (gameState !== "playing") return;

            const p = player.current;

            if (keys.current.left && p.vx > -SPEED) p.vx -= ACCEL;
            if (keys.current.right && p.vx < SPEED) p.vx += ACCEL;

            p.vx *= FRICTION;
            p.vy += GRAVITY;
            p.x += p.vx;
            p.y += p.vy;
            p.grounded = false;

            // Logic for collision (unchanged for brevity, but logic holds)
            for (const obj of LEVEL_ONE) {
                if (
                    p.x < obj.x + obj.w && p.x + p.w > obj.x &&
                    p.y < obj.y + obj.h && p.y + p.h > obj.y
                ) {
                    if (obj.type === "danger") { setGameState("died"); return; }
                    if (obj.type === "goal") { setGameState("won"); return; }

                    const overlapX = (p.w + obj.w) / 2 - Math.abs((p.x + p.w / 2) - (obj.x + obj.w / 2));
                    const overlapY = (p.h + obj.h) / 2 - Math.abs((p.y + p.h / 2) - (obj.y + obj.h / 2));

                    if (overlapX < overlapY) {
                        if (p.vx > 0) p.x = obj.x - p.w; else p.x = obj.x + obj.w;
                        p.vx = 0;
                    } else {
                        if (p.vy > 0) { p.y = obj.y - p.h; p.grounded = true; }
                        else { p.y = obj.y + obj.h; }
                        p.vy = 0;
                    }
                }
            }

            if (p.x < 0) p.x = 0;
            if (p.x + p.w > canvas.width) p.x = canvas.width - p.w;
        };

        const drawPixelBlock = (x: number, y: number, w: number, h: number, style: string) => {
            const blockSize = 10;
            ctx.fillStyle = style;

            // Draw main block
            ctx.fillRect(x, y, w, h);

            // "Pixel" Texture overlay
            ctx.fillStyle = "rgba(0,0,0,0.1)";
            for (let i = x; i < x + w; i += blockSize) {
                ctx.fillRect(i, y + h - blockSize, blockSize, blockSize); // Bottom shadow
                ctx.fillRect(i + w - blockSize, y, blockSize, h); // Right shadow
            }

            // Highlight
            ctx.fillStyle = "rgba(255,255,255,0.1)";
            ctx.fillRect(x, y, w, blockSize); // Top highlight
            ctx.fillRect(x, y, blockSize, h); // Left highlight

            // Inner grid lines for "Terraria" brick look
            ctx.strokeStyle = colors.bg;
            ctx.lineWidth = 2;
            ctx.beginPath();
            for (let i = x; i <= x + w; i += 40) { ctx.moveTo(i, y); ctx.lineTo(i, y + h); }
            for (let j = y; j <= y + h; j += 40) { ctx.moveTo(x, j); ctx.lineTo(x + w, j); }
            ctx.stroke();
        };

        const draw = () => {
            // Clear
            ctx.fillStyle = colors.bg;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Background Grid (Printstream Style)
            ctx.strokeStyle = colors.grid;
            ctx.lineWidth = 1;
            const gridSize = 40;
            ctx.beginPath();
            for (let x = 0; x <= canvas.width; x += gridSize) { ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); }
            for (let y = 0; y <= canvas.height; y += gridSize) { ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); }
            ctx.stroke();

            // Draw Level Blocks
            for (const obj of LEVEL_ONE) {
                if (obj.type === "platform") drawPixelBlock(obj.x, obj.y, obj.w, obj.h, colors.fg);
                else if (obj.type === "danger") {
                    ctx.fillStyle = colors.danger;
                    // Draw Spikes
                    for (let i = obj.x; i < obj.x + obj.w; i += 40) {
                        ctx.beginPath();
                        ctx.moveTo(i, obj.y + 40);
                        ctx.lineTo(i + 20, obj.y);
                        ctx.lineTo(i + 40, obj.y + 40);
                        ctx.fill();
                    }
                }
                else if (obj.type === "goal") drawPixelBlock(obj.x, obj.y, obj.w, obj.h, colors.accent);
            }

            // Draw Player (Pixel Character)
            ctx.fillStyle = isDark ? colors.accent : colors.fg;
            ctx.fillRect(player.current.x, player.current.y, player.current.w, player.current.h);
            // Player face/visor
            ctx.fillStyle = isDark ? "black" : "white";
            ctx.fillRect(player.current.x + 18, player.current.y + 6, 8, 4);

        };

        const loop = () => {
            update();
            draw();
            if (gameState === "playing") {
                animationFrameId = requestAnimationFrame(loop);
            }
        };
        loop();

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
            cancelAnimationFrame(animationFrameId);
        };
    }, [gameState, resolvedTheme]);

    return (
        <div className="relative w-full h-full flex items-center justify-center p-4">
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-border">
                <canvas
                    ref={canvasRef}
                    width={1200}
                    height={600}
                    className="w-full max-w-[1200px] aspect-[2/1] object-contain transition-colors duration-500"
                />

                {gameState === "died" && (
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4 animate-in fade-in zoom-in">
                        <h2 className="text-4xl font-display font-bold text-destructive uppercase">System Failure</h2>
                        <Button onClick={resetGame} size="lg" className="rounded-full">
                            <RefreshCw className="mr-2 h-4 w-4" /> RESTART LOOP
                        </Button>
                    </div>
                )}

                {gameState === "won" && (
                    <div className="absolute inset-0 bg-[#D2F24D]/90 backdrop-blur-md flex flex-col items-center justify-center gap-4 animate-in fade-in zoom-in">
                        <h2 className="text-4xl font-display font-bold text-black uppercase">Sequence Complete</h2>
                        <p className="text-black/80 font-mono">Easter egg claimed.</p>
                        <div className="flex gap-4">
                            <Button onClick={resetGame} variant="outline" className="border-black text-black hover:bg-black/10">
                                Replay
                            </Button>
                            <Link href="/">
                                <Button className="bg-black text-white hover:bg-black/80">
                                    <ArrowLeft className="mr-2 h-4 w-4" /> Return Home
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            <div className="absolute top-8 left-8">
                <Link href="/">
                    <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
                    </Button>
                </Link>
            </div>
        </div>
    );
}
