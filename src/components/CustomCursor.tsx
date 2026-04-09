import { motion } from 'framer-motion';
import { useCustomCursor } from '../hooks/useCustomCursor';

export default function CustomCursor() {
  const { cursorX, cursorY, smoothX, smoothY, cursorScale } = useCustomCursor();

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{
          x: cursorX,
          y: cursorY,
          scale: cursorScale,
        }}
      />
      <motion.div
        className="cursor-ring"
        style={{
          x: smoothX,
          y: smoothY,
          scale: cursorScale,
        }}
      />
    </>
  );
}