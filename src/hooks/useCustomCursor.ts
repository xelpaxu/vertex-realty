import { useEffect } from 'react';
import { useMotionValue, useSpring, animate } from 'framer-motion';

export const useCustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);
  const cursorScale = useMotionValue(1);

  // Adjusted damping to prevent "looping" or overshooting
  const springConfig = { damping: 30, stiffness: 250, restDelta: 0.001 };
  const smoothX = useSpring(ringX, springConfig);
  const smoothY = useSpring(ringY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverable = target.closest('a, button, select, input, textarea, [data-hover]');
      
      if (isHoverable) {
        animate(cursorScale, 1.5, { duration: 0.2 });
      } else {
        animate(cursorScale, 1, { duration: 0.2 });
      }
    };

    // Hide cursor when it leaves the window
    const handleMouseLeave = () => {
      animate(cursorScale, 0, { duration: 0.2 });
    };
    
    const handleMouseEnter = () => {
      animate(cursorScale, 1, { duration: 0.2 });
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, ringX, ringY, cursorScale]);

  return { cursorX, cursorY, smoothX, smoothY, cursorScale };
};