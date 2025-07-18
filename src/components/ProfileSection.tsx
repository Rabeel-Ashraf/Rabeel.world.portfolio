import React from 'react';
import { motion } from 'framer-motion';
import { 
  EnvelopeIcon, 
  CodeBracketIcon, 
  CogIcon, 
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import { Github, Linkedin, Mail } from 'lucide-react';
import EarthObject from './EarthObject';

const ProfileSection = () => {
  const personalInfo = {
    name: 'Rabeel Ashraf',
    email: 'mrperfect6ft@gmail.com',
    role: 'Full Stack Developer & Backend Engineer',
    otherTitles: [
      'AI Agent Creator',
      'Mechanical & Safety Engineer',
      'Climate Change Advocate'
    ],
    languages: ['JavaScript', 'Python', 'React', 'Node.js', 'Tailwind CSS', 'Three.js']
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <motion.div 
        className="text-center space-y-6"
        variants={itemVariants}
      >
        <h1 className="text-5xl md:text-6xl font-bold text-white">
          {personalInfo.name}
        </h1>
        <p className="text-xl md:text-2xl text-purple-400 font-semibold">
          {personalInfo.role}
        </p>
        
        {/* Social Links */}
        <motion.div 
          className="flex justify-center space-x-6"
          variants={itemVariants}
        >
          <motion.a
            href="https://github.com/Rabeel-Ashraf"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-800/50 rounded-full border border-purple-500/30 hover:border-purple-500 transition-all duration-300"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="h-6 w-6 text-gray-300 hover:text-purple-400" />
          </motion.a>
          
          <motion.a
            href="https://linkedin.com/in/rabeel-ashraf-721105204"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-800/50 rounded-full border border-purple-500/30 hover:border-purple-500 transition-all duration-300"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Linkedin className="h-6 w-6 text-gray-300 hover:text-purple-400" />
          </motion.a>
          
          <motion.a
            href="mailto:mrperfect6ft@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-800/50 rounded-full border border-purple-500/30 hover:border-purple-500 transition-all duration-300"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="h-6 w-6 text-gray-300 hover:text-purple-400" />
          </motion.a>
        </motion.div>

        <motion.div className="flex items-center justify-center space-x-2" whileHover={{ scale: 1.05 }}>
          <EnvelopeIcon className="h-5 w-5 text-gray-400" />
          <a 
            href={`mailto:${personalInfo.email}`}
            className="text-gray-300 hover:text-purple-400 transition-colors"
          >
            {personalInfo.email}
          </a>
        </motion.div>
      </motion.div>

      {/* About Me Card */}
      <motion.div 
        className="bg-gray-800/50 backdrop-blur-md rounded-xl p-8 border border-purple-500/20"
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
      >
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <CodeBracketIcon className="h-6 w-6 mr-2 text-purple-400" />
          About Me
        </h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-purple-400 mb-3">Other Titles</h4>
            <div className="flex flex-wrap gap-2">
              {personalInfo.otherTitles.map((title, index) => (
                <motion.span
                  key={index}
                  className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm border border-purple-500/30"
                  whileHover={{ scale: 1.05 }}
                >
                  {title}
                </motion.span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-purple-400 mb-3">Languages & Technologies</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {personalInfo.languages.map((lang, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-2 p-2 bg-gray-700/50 rounded-lg"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(147, 51, 234, 0.1)' }}
                >
                  <CogIcon className="h-4 w-4 text-green-400" />
                  <span className="text-gray-300">{lang}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* 3D Vision Section */}
      <motion.div
        className="bg-gray-800/50 backdrop-blur-md rounded-xl p-8 border border-purple-500/20"
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
      >
        <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
          <GlobeAltIcon className="h-6 w-6 mr-2 text-purple-400" />
          My 3D Vision
        </h3>
        <p className="text-gray-300 mb-6">
          Exploring the intersection of identity and interactivity through motion and 3D.
          This rotating Earth demonstrates my ability to integrate advanced 3D graphics with modern web technologies.
        </p>

        {/* Floating Profile Image */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="relative mx-auto mb-6 w-36 h-36 md:w-44 md:h-44"
        >
          {/* Outer Glowing Ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 animate-pulse opacity-30 blur-xl"></div>

          {/* Profile Image with glow border */}
          <div className="relative w-full h-full rounded-full overflow-hidden border-[5px] border-purple-500 shadow-[0_0_40px_#a855f7] hover:scale-105 transition duration-700 ease-in-out">
            <img
              src="/rabeel.jpg"
              alt="Rabeel Ashraf"
              className="w-full h-full object-cover"
              onError={(e) => {
                console.log('Image failed to load');
                e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face';
              }}
              onLoad={() => console.log('Image loaded successfully')}
            />
          </div>
        </motion.div>

        <EarthObject />
      </motion.div>
    </motion.div>
  );
};

export default ProfileSection;