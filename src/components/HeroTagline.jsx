import React from 'react';
import { motion } from 'framer-motion';
import { useDarkMode } from '../context/DarkModeContext';

const HeroTagline = ({ className }) => {
  const { isDarkMode } = useDarkMode();
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className={`${className} my-8 mx-auto max-w-4xl text-center px-4`}>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative"
      >
        <motion.h2 
          variants={item}
          className={`text-2xl md:text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-conison-gray'}`}
        >
          We deliver <span className="text-conison-magenta">cutting-edge solutions</span> tailored to your business needs.
        </motion.h2>
        
        <motion.div 
          variants={item}
          className={`
            p-6 md:p-8 
            rounded-lg
            shadow-lg
            ${isDarkMode 
              ? 'bg-gradient-to-r from-gray-800 to-gray-900 shadow-conison-magenta/20' 
              : 'bg-gradient-to-r from-white to-gray-50 shadow-conison-cyan/20'
            }
            border-l-4 border-conison-magenta
            max-w-3xl mx-auto
          `}
        >
          <p className={`text-xl md:text-2xl leading-relaxed ${isDarkMode ? 'text-gray-200' : 'text-conison-gray'}`}>
            Our expertise spans across 
            <span className="font-bold text-conison-cyan mx-1 whitespace-nowrap">web development</span>, 
            <span className="font-bold text-conison-magenta mx-1 whitespace-nowrap">mobile applications</span>, and 
            <span className="font-bold text-conison-yellow mx-1 whitespace-nowrap bg-conison-gray px-2 py-0.5 rounded-md">digital transformation</span> 
            strategies.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="absolute -z-10 w-full h-full top-0 left-0 flex justify-center items-center opacity-10"
        >
          <div className="w-56 h-56 rounded-full bg-conison-magenta blur-3xl"></div>
          <div className="w-56 h-56 rounded-full bg-conison-cyan blur-3xl -ml-20"></div>
          <div className="w-56 h-56 rounded-full bg-conison-yellow blur-3xl -ml-20"></div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroTagline; 