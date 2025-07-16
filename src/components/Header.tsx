import React from 'react';
import { motion } from 'framer-motion';
import { CodeBracketIcon, CubeIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  currentSection: string;
  setCurrentSection: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentSection, setCurrentSection }) => {
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-purple-500/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <CubeIcon className="h-8 w-8 text-purple-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Rabeel Ashraf
            </h1>
          </motion.div>
          
          <nav className="hidden md:flex space-x-8">
            {['Profile', 'Gallery', 'Work'].map((section) => (
              <motion.button
                key={section}
                onClick={() => setCurrentSection(section)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  currentSection === section
                    ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
                    : 'text-gray-300 hover:text-purple-400 hover:bg-purple-600/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {section}
              </motion.button>
            ))}
          </nav>

          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <CodeBracketIcon className="h-6 w-6 text-green-400" />
            <span className="text-sm text-gray-400">Available for hire</span>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;