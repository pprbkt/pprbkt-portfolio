import { Variants } from 'framer-motion';
import { useState, useEffect } from 'react';

// Enhanced scroll animation variants
export const scrollAnimations = {
  // Fade and slide animations
  fadeInUp: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -60 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  
  fadeInDown: {
    initial: { opacity: 0, y: -60 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 60 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  
  fadeInLeft: {
    initial: { opacity: 0, x: -80 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 80 },
    transition: { duration: 0.7, ease: 'easeOut' }
  },
  
  fadeInRight: {
    initial: { opacity: 0, x: 80 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -80 },
    transition: { duration: 0.7, ease: 'easeOut' }
  },

  // Scale animations
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.2 },
    transition: { duration: 0.5, ease: 'easeOut' }
  },

  scaleInBounce: {
    initial: { opacity: 0, scale: 0.3 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { 
      duration: 0.6, 
      ease: 'easeOut',
      scale: {
        type: 'spring',
        damping: 10,
        stiffness: 100
      }
    }
  },

  // Rotation animations
  rotateIn: {
    initial: { opacity: 0, rotate: -180, scale: 0.5 },
    animate: { opacity: 1, rotate: 0, scale: 1 },
    exit: { opacity: 0, rotate: 180, scale: 0.5 },
    transition: { duration: 0.8, ease: 'easeOut' }
  },

  // Flip animations
  flipX: {
    initial: { opacity: 0, rotateX: -90 },
    animate: { opacity: 1, rotateX: 0 },
    exit: { opacity: 0, rotateX: 90 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },

  flipY: {
    initial: { opacity: 0, rotateY: -90 },
    animate: { opacity: 1, rotateY: 0 },
    exit: { opacity: 0, rotateY: 90 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },

  // Elastic animations
  elasticIn: {
    initial: { opacity: 0, scale: 0, rotate: -180 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    exit: { opacity: 0, scale: 0, rotate: 180 },
    transition: { 
      duration: 0.8,
      type: 'spring',
      damping: 8,
      stiffness: 100
    }
  },

  // Blur animations
  blurIn: {
    initial: { opacity: 0, filter: 'blur(20px)', y: 50 },
    animate: { opacity: 1, filter: 'blur(0px)', y: 0 },
    exit: { opacity: 0, filter: 'blur(20px)', y: -50 },
    transition: { duration: 0.8, ease: 'easeOut' }
  },

  // Typewriter effect
  typewriter: {
    initial: { width: 0 },
    animate: { width: '100%' },
    transition: { duration: 2, ease: 'linear' }
  },

  // Stagger container
  staggerContainer: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },

  // Page transition
  pageTransition: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5, ease: 'easeInOut' }
  }
};

// Animation variants for different scroll directions
export const scrollDirectionAnimations = {
  scrollingDown: {
    fadeInUp: scrollAnimations.fadeInUp,
    fadeInLeft: scrollAnimations.fadeInLeft,
    scaleIn: scrollAnimations.scaleIn,
    rotateIn: scrollAnimations.rotateIn,
    blurIn: scrollAnimations.blurIn
  },
  
  scrollingUp: {
    fadeInDown: scrollAnimations.fadeInDown,
    fadeInRight: scrollAnimations.fadeInRight,
    scaleInBounce: scrollAnimations.scaleInBounce,
    flipX: scrollAnimations.flipX,
    elasticIn: scrollAnimations.elasticIn
  }
};

// Custom hook for scroll direction detection
export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      
      if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || lastScrollY - scrollY > 10)) {
        setScrollDirection(direction);
      }
      setLastScrollY(scrollY > 0 ? scrollY : 0);
    };

    window.addEventListener('scroll', updateScrollDirection);
    return () => window.removeEventListener('scroll', updateScrollDirection);
  }, [scrollDirection, lastScrollY]);

  return scrollDirection;
};

// Helper function to get random animation
export const getRandomAnimation = (scrollDirection: 'up' | 'down' | null) => {
  if (!scrollDirection) return scrollAnimations.fadeInUp;
  
  const animations = scrollDirection === 'down' 
    ? Object.values(scrollDirectionAnimations.scrollingDown)
    : Object.values(scrollDirectionAnimations.scrollingUp);
    
  return animations[Math.floor(Math.random() * animations.length)];
};

// Sequential animation selector
let animationIndex = 0;
export const getSequentialAnimation = (scrollDirection: 'up' | 'down' | null) => {
  if (!scrollDirection) return scrollAnimations.fadeInUp;
  
  const animations = scrollDirection === 'down' 
    ? Object.values(scrollDirectionAnimations.scrollingDown)
    : Object.values(scrollDirectionAnimations.scrollingUp);
    
  const animation = animations[animationIndex % animations.length];
  animationIndex++;
  return animation;
};
