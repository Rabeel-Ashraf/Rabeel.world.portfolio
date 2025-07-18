import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TouchEffect {
  id: number;
  x: number;
  y: number;
  type: 'ripple' | 'particles' | 'glow';
}

const EnhancedTouchEffects = () => {
  const [effects, setEffects] = useState<TouchEffect[]>();

  useEffect(() => {
    let effectId = 0;

    const createEffect = (x: number, y: number) => {
      const types: TouchEffect['type'][] = ['ripple', 'particles', 'glow'];
      const randomType = types[Math.floor(Math.random() * types.length)];
      
      const newEffect: TouchEffect = {
        id: effectId++,
        x,
        y,
        type: randomType
      };

      setEffects(prev => [...(prev || []), newEffect]);

      // Remove effect after animation
      setTimeout(() => {
        setEffects(prev => prev?.filter(effect => effect.id !== newEffect.id) || []);
      }, 1500);
    };

    const handleTouch = (e: TouchEvent) => {
      e.preventDefault();
      Array.from(e.touches).forEach(touch => {
        createEffect(touch.clientX, touch.clientY);
      });
    };

    const handleClick = (e: MouseEvent) => {
      createEffect(e.clientX, e.clientY);
    };

    // Add event listeners
    document.addEventListener('touchstart', handleTouch, { passive: false });
    document.addEventListener('click', handleClick, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouch);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const renderEffect = (effect: TouchEffect) => {
    const baseProps = {
      key: effect.id,
      initial: { opacity: 1, scale: 0 },
      animate: { opacity: 0, scale: 1 },
      exit: { opacity: 0 },
      style: {
        position: 'fixed' as const,
        left: effect.x,
        top: effect.y,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none' as const,
        zIndex: 9999,
      }
    };

    switch (effect.type) {
      case 'ripple':
        return (
          <motion.div
            {...baseProps}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-20 h-20 border-2 border-cyan-400 rounded-full"
            animate={{ 
              opacity: [1, 0.5, 0], 
              scale: [0, 2, 3],
              borderWidth: [2, 1, 0]
            }}
          />
        );

      case 'particles':
        return (
          <motion.div {...baseProps} className="relative">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                initial={{ 
                  x: 0, 
                  y: 0, 
                  opacity: 1,
                  scale: 1
                }}
                animate={{
                  x: Math.cos(i * 45 * Math.PI / 180) * 40,
                  y: Math.sin(i * 45 * Math.PI / 180) * 40,
                  opacity: 0,
                  scale: 0.5
                }}
                transition={{ 
                  duration: 1,
                  ease: 'easeOut',
                  delay: i * 0.05
                }}
              />
            ))}
          </motion.div>
        );

      case 'glow':
        return (
          <motion.div
            {...baseProps}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-md"
            animate={{ 
              opacity: [1, 0.8, 0], 
              scale: [0, 1.5, 2],
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {effects?.map(renderEffect)}
    </AnimatePresence>
  );
};

export default EnhancedTouchEffects;