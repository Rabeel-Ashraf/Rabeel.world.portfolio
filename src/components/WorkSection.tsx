import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LockClosedIcon, KeyIcon } from '@heroicons/react/24/outline';

const WorkSection = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'rabeel2024') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password. Please try again.');
    }
  };

  const workItems = [
    {
      client: 'TechCorp Solutions',
      project: 'AI-Powered Analytics Platform',
      duration: '6 months',
      technologies: ['Python', 'TensorFlow', 'React', 'AWS'],
      status: 'Completed'
    },
    {
      client: 'EcoTech Industries',
      project: 'Carbon Footprint Tracker',
      duration: '4 months',
      technologies: ['React Native', 'Node.js', 'MongoDB'],
      status: 'In Progress'
    },
    {
      client: 'MechDesign Pro',
      project: '3D CAD Web Interface',
      duration: '8 months',
      technologies: ['Three.js', 'WebGL', 'TypeScript'],
      status: 'Completed'
    }
  ];

  if (!isAuthenticated) {
    return (
      <motion.div 
        className="flex items-center justify-center min-h-[60vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ willChange: 'transform, opacity' }}
      >
        <motion.div 
          className="bg-gray-800/50 backdrop-blur-md rounded-xl p-8 border border-purple-500/20 w-full max-w-md will-change-transform"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="p-4 bg-purple-600/20 rounded-full">
                <LockClosedIcon className="h-12 w-12 text-purple-400" />
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Protected Work Area</h2>
              <p className="text-gray-400">
                This section contains confidential client work. Please enter the password to continue.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <KeyIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                />
              </div>
              
              {error && (
                <motion.p 
                  className="text-red-400 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {error}
                </motion.p>
              )}
              
              <motion.button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Access Work Area
              </motion.button>
            </form>
            
            <p className="text-xs text-gray-500">
              Demo password: rabeel2024
            </p>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div 
        className="text-center space-y-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h2 className="text-4xl font-bold text-white">Client Work</h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Confidential projects and client collaborations showcasing professional development work.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workItems.map((item, index) => (
          <motion.div
            key={index}
            className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-purple-500/20"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white">{item.client}</h3>
                <p className="text-purple-400">{item.project}</p>
              </div>
              
              <div className="text-sm text-gray-400">
                <p>Duration: {item.duration}</p>
                <p>Status: <span className={`${item.status === 'Completed' ? 'text-green-400' : 'text-yellow-400'}`}>{item.status}</span></p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 bg-purple-600/20 text-purple-300 rounded text-sm border border-purple-500/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WorkSection;