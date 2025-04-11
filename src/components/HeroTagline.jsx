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