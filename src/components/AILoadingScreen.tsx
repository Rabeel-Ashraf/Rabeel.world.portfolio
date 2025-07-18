import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AILoadingScreenProps {
  onComplete: () => void;
}

const AILoadingScreen: React.FC<AILoadingScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Wait for fade out animation
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Animated Background Grid */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />
          </div>

          {/* Central Loading Content */}
          <div className="relative z-10 text-center space-y-8">
            {/* AI Spinner */}
            <motion.div
              className="relative mx-auto w-24 h-24"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              {/* Outer Ring */}
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 border-r-blue-400 animate-spin" />
              
              {/* Inner Ring */}
              <motion.div
                className="absolute inset-2 rounded-full border-2 border-transparent border-b-cyan-300 border-l-blue-300"
                animate={{ rotate: -360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Core Orb */}
              <div className="absolute inset-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_30px_rgba(0,255,255,0.8)] animate-pulse" />
            </motion.div>

            {/* Loading Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="space-y-4"
            >
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                Loading AI Space...
              </h1>
              
              {/* Progress Dots */}
              <div className="flex justify-center space-x-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-cyan-400 rounded-full"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Scanning Lines */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
              <div className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AILoadingScreen;