import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Petal {
  id: number;
  x: number;
  y: number;
  rotation: number;
  delay: number;
  createdAt: number;
  driftX: number;
  driftY: number;
  finalRotation: number;
}

export default function CherryBlossomEffect() {
  const [petals, setPetals] = useState<Petal[]>([]);
  const petalIdRef = useRef(0);
  const throttleRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Throttle petal generation to prevent overwhelming performance
      if (throttleRef.current) {
        return;
      }

      throttleRef.current = setTimeout(() => {
        throttleRef.current = null;
      }, 50); // Generate petal every 50ms max

      const driftX = (Math.random() * 80 - 40);
      const fallDistance = 250 + Math.random() * 150;
      const baseRotation = Math.random() * 360;
      
      const newPetal: Petal = {
        id: petalIdRef.current++,
        x: e.clientX,
        y: e.clientY,
        rotation: baseRotation,
        delay: Math.random() * 0.2,
        createdAt: Date.now(),
        driftX,
        driftY: fallDistance,
        finalRotation: baseRotation + 360 + Math.random() * 180,
      };

      setPetals((prev) => [...prev.slice(-20), newPetal]); // Keep max 20 petals
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (throttleRef.current) {
        clearTimeout(throttleRef.current);
      }
    };
  }, []);

  // Clean up old petals
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setPetals((prev) => prev.filter((p) => now - p.createdAt < 3000));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="cherry-blossom-container">
      <AnimatePresence>
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            className="cherry-petal"
            initial={{
              x: petal.x,
              y: petal.y,
              opacity: 1,
              scale: 1,
              rotate: petal.rotation,
            }}
            animate={{
              x: petal.x + petal.driftX,
              y: petal.y + petal.driftY,
              opacity: [1, 0.9, 0.5, 0.2, 0],
              scale: [1, 0.95, 0.7, 0.4, 0.2],
              rotate: petal.finalRotation,
            }}
            transition={{
              duration: 3.5 + Math.random() * 1.5,
              delay: petal.delay,
              ease: [0.4, 0.0, 0.2, 1], // More natural falling motion
            }}
            exit={{ opacity: 0 }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
