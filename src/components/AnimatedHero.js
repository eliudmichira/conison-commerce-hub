import React, { useEffect, useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoveRight, PhoneCall, ArrowRight } from "lucide-react";
import { Button } from "./ui/button.jsx";
import { Link } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";

function AnimatedHero() {
  const { isDarkMode } = useDarkMode();
  const [titleNumber, setTitleNumber] = useState(0);
  const [animationsEnabled, setAnimationsEnabled] = useState(false);
  
  const titles = useMemo(
    () => ["innovative", "transformative", "powerful", "scalable", "secure"],
    []
  );

  // Enable animations after initial render to prioritize LCP
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationsEnabled(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Memoize the title rotation logic
  const rotateTitles = useCallback(() => {
    setTitleNumber(prev => (prev === titles.length - 1 ? 0 : prev + 1));
  }, [titles.length]);

  useEffect(() => {
    // Only start title rotation after animations are enabled
    if (!animationsEnabled) return;
    
    const timeoutId = setTimeout(rotateTitles, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, animationsEnabled, rotateTitles]);

  return (
    <div className="w-full relative overflow-hidden min-h-[80vh] flex items-center">
      {/* Blob decoration elements */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600 opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-600 opacity-10 rounded-full blur-3xl"></div>
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="/images/services/hero-bg.jpg" 
          alt="" 
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
        <div 
          className={`absolute inset-0 ${
            isDarkMode 
              ? 'bg-gradient-to-br from-gray-900/90 via-gray-900/85 to-gray-900/95' 
              : 'bg-gradient-to-br from-white/90 via-white/85 to-white/95'
          }`}
        ></div>
      </div>
      
      {/* Diagonal lines pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{ 
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/grid-pattern.svg)`,
        backgroundRepeat: 'repeat',
        backgroundSize: '10px 10px'
      }}></div>
      
      <div className="container mx-auto relative z-10 px-4">
        <motion.div 
          className="flex gap-8 py-20 items-center justify-center flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex gap-6 flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-6 py-2 border border-purple-500/20 mb-4"
            >
              <span className={`text-sm font-medium ${isDarkMode ? "text-purple-300" : "text-purple-700"}`}>
                Technology Solutions Provider
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl max-w-3xl mx-auto text-center font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className={isDarkMode ? "text-white" : "text-gray-900"}>
                Conison
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 ml-4">
                Technologies
              </span>
            </motion.h1>
            
            {/* Rotating adjectives with better spacing */}
            <div className="relative flex w-full justify-center overflow-hidden text-center h-24 md:h-28 my-2">
              {/* Show static first title for immediate LCP */}
              {!animationsEnabled && (
                <span className="text-4xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                  {titles[0]}
                </span>
              )}
              
              {/* Only render animations after initial load */}
              <AnimatePresence mode="wait">
                {animationsEnabled && (
                  <motion.span
                    key={titleNumber}
                    className="absolute text-4xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 100,
                      damping: 20
                    }}
                  >
                    {titles[titleNumber]}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <motion.p 
              className={`text-lg md:text-xl leading-relaxed ${
                isDarkMode ? "text-white/80" : "text-gray-700"
              } max-w-2xl mx-auto text-center`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Empowering businesses with innovative digital solutions.
              <br />
              From web development to AI integration, we transform your vision into reality.
            </motion.p>
          </div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Link to="/contact">
              <Button 
                size="lg" 
                className={`group gap-3 px-6 py-6 text-base ${
                  isDarkMode 
                    ? "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm" 
                    : "bg-gray-900/5 text-gray-800 hover:bg-gray-900/10 backdrop-blur-sm"
                } border-0 rounded-xl shadow-sm`} 
                variant="outline"
              >
                Schedule a call 
                <PhoneCall className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                size="lg" 
                className="group gap-3 px-6 py-6 text-base bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-xl shadow-md"
              >
                Get started today
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
          
          {/* Stats section */}
          <motion.div 
            className="flex flex-wrap justify-center gap-8 mt-16 w-full max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <div className={`text-center px-6 ${isDarkMode ? "text-white/90" : "text-gray-800"}`}>
              <div className="text-3xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">500+</div>
              <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Happy Clients</div>
            </div>
            <div className={`text-center px-6 ${isDarkMode ? "text-white/90" : "text-gray-800"}`}>
              <div className="text-3xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">98%</div>
              <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Success Rate</div>
            </div>
            <div className={`text-center px-6 ${isDarkMode ? "text-white/90" : "text-gray-800"}`}>
              <div className="text-3xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">12+</div>
              <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Years Experience</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default AnimatedHero;