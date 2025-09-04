// Scroll configuration and utility functions

export interface ParallaxConfig {
  speed: number;
  direction: 'up' | 'down';
  offset: [string, string];
}

// Predefined parallax configurations for different element types
export const parallaxConfigs = {
  background: {
    speed: 0.3,
    direction: 'up' as const,
    offset: ["start end", "end start"] as [string, string]
  },
  hero: {
    speed: 0.5,
    direction: 'up' as const,
    offset: ["start end", "end start"] as [string, string]
  },
  content: {
    speed: 0.7,
    direction: 'up' as const,
    offset: ["start end", "end start"] as [string, string]
  },
  floating: {
    speed: 0.4,
    direction: 'down' as const,
    offset: ["start end", "end start"] as [string, string]
  }
};

// Animation variants for consistent motion across components
export const animationVariants = {
  fadeInUp: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  },
  fadeInRight: {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, ease: "easeOut" }
  },
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  },
  float: {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }
};

// Stagger delays for multiple elements
export const getStaggerDelay = (index: number, baseDelay: number = 0): number => {
  return baseDelay + (index * 0.1);
};

// Calculate parallax transform values
export const calculateParallax = (
  scrollProgress: number,
  speed: number,
  direction: 'up' | 'down' = 'up'
): number => {
  const multiplier = direction === 'up' ? -1 : 1;
  return scrollProgress * speed * 200 * multiplier;
};

// Easing functions for smooth animations
export const easing = {
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeOutQuart: [0.25, 1, 0.5, 1],
  spring: { type: "spring", stiffness: 100, damping: 15 }
};

// Intersection Observer options for different use cases
export const intersectionOptions = {
  onEnter: {
    threshold: 0.1,
    rootMargin: "0px 0px -10% 0px"
  },
  onVisible: {
    threshold: 0.5,
    rootMargin: "0px"
  },
  forNavigation: {
    threshold: 0.5,
    rootMargin: "-20% 0px -20% 0px"
  }
};

// Debounce function for scroll events (arrow function to avoid TS 'this' error)
export const debounce = (func: Function, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
