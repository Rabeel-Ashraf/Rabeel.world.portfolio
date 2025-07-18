import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import ProfileSection from './components/ProfileSection';
import GallerySection from './components/GallerySection';
import WorkSection from './components/WorkSection';
import NotFound from './components/NotFound';
import EnhancedTouchEffects from './components/EnhancedTouchEffects';
import GlobalTouchHandler from './components/GlobalTouchHandler';

const MainPortfolio = () => {
  const [currentSection, setCurrentSection] = useState('Profile');

  const sectionVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.4, 0, 0.2, 1] // Custom cubic-bezier for smoother animation
      }
    },
    exit: { 
      opacity: 0, 
      x: -100,
      transition: { 
        duration: 0.4, 
        ease: [0.4, 0, 1, 1] // Smooth exit animation
      }
    }
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'Profile':
        return <ProfileSection />;
      case 'Gallery':
        return <GallerySection />;
      case 'Work':
        return <WorkSection />;
      default:
        return <ProfileSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative">
      
      <Header 
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />
      
      <main className="relative z-10 pt-20 pb-16 will-change-scroll">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="min-h-screen will-change-transform"
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900/80 backdrop-blur-md border-t border-purple-500/20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-400">
                © 2024 Rabeel Ashraf. All rights reserved.
              </p>
              <p className="text-sm text-gray-500">
                Domain: rabeel.world
              </p>
            </div>
            <div className="flex space-x-6">
              <motion.a
                href="mailto:mrperfect6ft@gmail.com"
                className="text-gray-400 hover:text-purple-400 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                Email
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                LinkedIn
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                GitHub
              </motion.a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <Router>
      <GlobalTouchHandler />
      <EnhancedTouchEffects />
      <Routes>
        <Route path="/" element={<MainPortfolio />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;