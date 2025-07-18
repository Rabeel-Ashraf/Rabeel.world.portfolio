import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Bot, Home, Zap } from 'lucide-react';
import AILoadingScreen from './AILoadingScreen';

const NotFound = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = "Oops! This page is lost in space 🚀";

  // Typing animation effect
  useEffect(() => {
    if (!showContent) return;
    
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [showContent]);

  // Stars background
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 2
  }));

  return (
    <>
      <AILoadingScreen onComplete={() => setShowContent(true)} />
      
      {showContent && (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden flex items-center justify-center">
          {/* Animated Starfield */}
          <div className="absolute inset-0">
            {stars.map((star) => (
              <motion.div
                key={star.id}
                className="absolute bg-cyan-300 rounded-full"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2 + star.delay,
                  repeat: Infinity,
                  delay: star.delay,
                }}
              />
            ))}
          </div>

          {/* Grid Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
          </div>

          {/* Main Content */}
          <motion.div
            className="relative z-10 text-center space-y-12 px-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* Floating AI Orb */}
            <motion.div
              className="relative mx-auto w-32 h-32 mb-8"
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 360]
              }}
              transition={{ 
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 20, repeat: Infinity, ease: "linear" }
              }}
            >
              {/* Outer Glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-30 blur-xl animate-pulse" />
              
              {/* Main Orb */}
              <div className="relative w-full h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 shadow-[0_0_50px_rgba(0,255,255,0.8)] flex items-center justify-center">
                <Bot className="w-16 h-16 text-white animate-pulse" />
              </div>

              {/* Orbiting Particles */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-cyan-300 rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    transformOrigin: '0 0',
                  }}
                  animate={{
                    rotate: 360,
                    x: [0, 60, 0, -60, 0],
                    y: [0, -30, -60, -30, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 1.3,
                    ease: "linear"
                  }}
                />
              ))}
            </motion.div>

            {/* Glowing 404 Text */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h1 className="text-8xl md:text-9xl font-bold font-mono bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent relative">
                404
                <motion.div
                  className="absolute inset-0 text-8xl md:text-9xl font-bold font-mono text-cyan-400 opacity-20 blur-sm"
                  animate={{ 
                    textShadow: [
                      '0 0 20px rgba(0,255,255,0.8)',
                      '0 0 40px rgba(0,255,255,0.4)',
                      '0 0 20px rgba(0,255,255,0.8)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  404
                </motion.div>
              </h1>
            </motion.div>

            {/* Typing Animation */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <p className="text-2xl md:text-3xl text-gray-300 font-light min-h-[3rem] flex items-center justify-center">
                <span className="font-mono">
                  {typedText}
                  <motion.span
                    className="inline-block w-1 h-8 bg-cyan-400 ml-1"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                </span>
              </p>

              {/* Glowing Home Button */}
              <motion.button
                onClick={() => navigate('/')}
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105"
                whileHover={{ 
                  boxShadow: '0 0 30px rgba(0,255,255,0.6)',
                  scale: 1.05 
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2.5 }}
              >
                {/* Button Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                
                {/* Button Content */}
                <div className="relative flex items-center space-x-2">
                  <Home className="w-5 h-5" />
                  <span>Take Me Home</span>
                  <Zap className="w-4 h-4 group-hover:animate-bounce" />
                </div>

                {/* Hover Particles */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-cyan-300 rounded-full"
                      style={{
                        left: `${20 + i * 10}%`,
                        top: '50%',
                      }}
                      animate={{
                        y: [-10, -30, -10],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </motion.div>
              </motion.button>
            </motion.div>

            {/* Bottom Decoration */}
            <motion.div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
            >
              <div className="flex space-x-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-cyan-400 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default NotFound;