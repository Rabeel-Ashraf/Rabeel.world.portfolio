import React from 'react';
import { motion } from 'framer-motion';
import { 
  RocketLaunchIcon, 
  CpuChipIcon, 
  GlobeAltIcon,
  ShieldCheckIcon,
  BeakerIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const GallerySection = () => {
  const projects = [
    {
      title: 'AI Agent Creator',
      description: 'Advanced AI-powered agent creation platform with natural language processing and machine learning capabilities.',
      tech: ['Python', 'TensorFlow', 'React', 'Node.js'],
      icon: CpuChipIcon,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'MERN Stack Analytics',
      description: 'Full-stack data analytics dashboard with real-time visualization and automated reporting features.',
      tech: ['MongoDB', 'Express', 'React', 'Node.js'],
      icon: ChartBarIcon,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Eco-Safety App',
      description: 'Climate change awareness platform with environmental impact tracking and safety protocol management.',
      tech: ['React Native', 'Firebase', 'Three.js'],
      icon: ShieldCheckIcon,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'Web3 Portfolio',
      description: 'Decentralized portfolio platform with blockchain integration and NFT showcase capabilities.',
      tech: ['Solidity', 'Web3.js', 'React', 'IPFS'],
      icon: GlobeAltIcon,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Mechanical Design Suite',
      description: 'CAD-integrated web application for mechanical engineering calculations and 3D visualization.',
      tech: ['Three.js', 'WebGL', 'TypeScript'],
      icon: BeakerIcon,
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Space Tech Simulator',
      description: 'Interactive space mission planning tool with orbital mechanics and trajectory optimization.',
      tech: ['JavaScript', 'WebGL', 'Physics Engine'],
      icon: RocketLaunchIcon,
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
      <motion.div 
        className="text-center space-y-4"
        variants={itemVariants}
      >
        <h2 className="text-4xl font-bold text-white">Project Gallery</h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Explore my collection of innovative projects spanning AI, web development, 
          mechanical engineering, and climate technology.
        </p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              y: -5,
              boxShadow: '0 20px 40px rgba(147, 51, 234, 0.3)'
            }}
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${project.color}`}>
                  <project.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, techIndex) => (
                  <motion.span
                    key={techIndex}
                    className="px-2 py-1 bg-purple-600/20 text-purple-300 rounded text-sm border border-purple-500/30"
                    whileHover={{ scale: 1.1 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
              
              <motion.button
                className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Project
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default GallerySection;