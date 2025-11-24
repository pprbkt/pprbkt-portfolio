'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Because apparently the default cursor wasn't fancy enough
export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // Schrödinger's cursor

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Physics because regular cursors are for peasants
  const springConfig = { damping: 35, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Stalking the mouse since 2024
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave2 = () => setIsVisible(false);
    const handleMouseEnter2 = () => setIsVisible(true);

    // Subscribe to mouse gossip
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave2);
    document.addEventListener('mouseenter', handleMouseEnter2);

    // Find all the clickable things (there are many)
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, .cursor-pointer, [data-cursor="pointer"]'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });

      return interactiveElements;
    };

    let interactiveElements = addHoverListeners();

    // Watch for DOM changes like a helicopter parent
    const observer = new MutationObserver(() => {
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      interactiveElements = addHoverListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      // Unsubscribe from the mouse newsletter
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave2);
      document.removeEventListener('mouseenter', handleMouseEnter2);

      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });

      observer.disconnect();
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot - the star of the show */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[99999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isClicking ? 0.6 : isHovering ? 1.3 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          scale: { type: 'spring', stiffness: 400, damping: 30 },
          opacity: { duration: 0.15 },
        }}
      />

      {/* Cursor ring - because one circle wasn't enough */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-2 border-white rounded-full pointer-events-none z-[99998] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-12px',
          translateY: '-12px',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isClicking ? 0.3 : isHovering ? 0.6 : 0.4,
        }}
        transition={{
          scale: { type: 'spring', stiffness: 300, damping: 35 },
          opacity: { duration: 0.2 },
        }}
      />

      {/* Cursor glow effect - for that premium feel */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 bg-white rounded-full pointer-events-none z-[99997] opacity-10 blur-md"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-24px',
          translateY: '-24px',
        }}
        animate={{
          scale: isHovering ? 1.2 : 0.8,
          opacity: isHovering ? 0.2 : 0.1,
        }}
        transition={{
          scale: { type: 'spring', stiffness: 200, damping: 40 },
          opacity: { duration: 0.3 },
        }}
      />

      {/* Outer light emission - because subtle is overrated */}
      <motion.div
        className="fixed top-0 left-0 w-24 h-24 bg-white rounded-full pointer-events-none z-[99996] opacity-5 blur-lg"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-36px',
          translateY: '-36px',
        }}
        animate={{
          scale: isHovering ? 1.3 : 0.9,
          opacity: isHovering ? 0.08 : 0.03,
        }}
        transition={{
          scale: { type: 'spring', stiffness: 150, damping: 50 },
          opacity: { duration: 0.4 },
        }}
      />

      {/* Soft ambient light - the finishing touch of overkill */}
      <motion.div
        className="fixed top-0 left-0 w-32 h-32 bg-white rounded-full pointer-events-none z-[99995] opacity-3 blur-xl"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-48px',
          translateY: '-48px',
        }}
        animate={{
          scale: isHovering ? 1.1 : 0.7,
          opacity: isHovering ? 0.06 : 0.02,
        }}
        transition={{
          scale: { type: 'spring', stiffness: 100, damping: 60 },
          opacity: { duration: 0.5 },
        }}
      />
    </>
  );
}
