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
    <div className="w-full relative overflow-hidden min-h-screen flex items-center mb-16 sm:mb-24">
      {/* Blob decoration elements - adjusted for better mobile appearance */}
      <div className="absolute -top-16 -left-16 xs:-top-20 xs:-left-20 sm:-top-40 sm:-left-40 w-48 xs:w-64 sm:w-96 h-48 xs:h-64 sm:h-96 bg-red-600 opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-16 -right-16 xs:-bottom-20 xs:-right-20 sm:-bottom-40 sm:-right-40 w-48 xs:w-64 sm:w-96 h-48 xs:h-64 sm:h-96 bg-blue-600 opacity-10 rounded-full blur-3xl"></div>
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="/images/agung-raharja-urbSCgUxfQ0-unsplash.jpg" 
          alt="Modern technology workspace" 
          className="w-full h-full object-cover"
          aria-hidden="true"
          loading="eager"
        />
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-900/70 to-gray-900/80"
        ></div>
      </div>
      
      {/* Diagonal lines pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{ 
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/grid-pattern.svg)`,
        backgroundRepeat: 'repeat',
        backgroundSize: '5px 5px',
        backgroundPosition: 'center',
      }}></div>
      
      <div className="container mx-auto relative z-10 px-3 xs:px-4 sm:px-6">
        <motion.div 
          className="flex gap-4 xs:gap-5 sm:gap-8 py-8 xs:py-12 sm:py-16 md:py-20 items-center justify-center flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex gap-3 xs:gap-4 sm:gap-6 flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-full overflow-hidden px-3 xs:px-4 sm:px-6 py-1 xs:py-1.5 sm:py-2 mb-1 xs:mb-2 sm:mb-4"
              style={{
                background: isDarkMode 
                  ? 'linear-gradient(to right, rgba(220, 38, 38, 0.15), rgba(37, 99, 235, 0.15))' 
                  : 'linear-gradient(to right, rgba(220, 38, 38, 0.2), rgba(37, 99, 235, 0.2))',
                borderRadius: '9999px',
                border: '1px solid rgba(220, 38, 38, 0.3)',
                boxShadow: '0 0 20px rgba(220, 38, 38, 0.2)'
              }}
            >
              {/* Multiple background layers for depth */}
              <div className="absolute inset-0 opacity-30" 
                style={{ 
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(220, 38, 38, 0.1) 10px, rgba(220, 38, 38, 0.1) 20px)',
                }} 
              />
              <div className="absolute inset-0 opacity-30" 
                style={{ 
                  backgroundImage: 'repeating-linear-gradient(135deg, transparent, transparent 15px, rgba(37, 99, 235, 0.1) 15px, rgba(37, 99, 235, 0.1) 30px)',
                }} 
              />
              <div className="absolute inset-0" 
                style={{ 
                  backgroundImage: 'linear-gradient(to right, rgba(220, 38, 38, 0.05), rgba(37, 99, 235, 0.05), rgba(220, 38, 38, 0.05))',
                  backgroundSize: '600px 100%',
                  animation: 'shimmer 3s infinite linear'
                }} 
              />
              <span className="relative z-10 text-xs sm:text-sm font-medium" 
                style={{ 
                  color: isDarkMode ? '#fecaca' : '#b91c1c' 
                }}
              >
                Technology Solutions Provider
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto text-center font-bold tracking-tight leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="text-white">
                Conison
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600 ml-1 xs:ml-2 sm:ml-4">
                Technologies
              </span>
            </motion.h1>
            
            {/* Rotating adjectives with better spacing and responsive height */}
            <div className="relative flex w-full justify-center overflow-hidden text-center h-12 xs:h-16 sm:h-20 md:h-24 my-1 sm:my-2">
              {/* Show static first title for immediate LCP */}
              {!animationsEnabled && (
                <span className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500">
                  {titles[0]}
                </span>
              )}
              
              {/* Only render animations after initial load */}
              <AnimatePresence mode="wait">
                {animationsEnabled && (
                  <motion.span
                    key={titleNumber}
                    className="absolute text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500"
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
              className="text-sm xs:text-base sm:text-lg md:text-xl leading-relaxed max-w-xs xs:max-w-lg sm:max-w-xl md:max-w-2xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                color: isDarkMode ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.95)'
              }}
            >
              <span className="font-medium">Empowering businesses with innovative digital solutions.</span>
              <br className="hidden xs:block" />
              <span className="opacity-90">From web development to AI integration, we transform your vision into reality.</span>
            </motion.p>
          </div>
          
          <motion.div 
            className="flex flex-col xs:flex-row gap-2 xs:gap-3 sm:gap-4 mt-8 xs:mt-10 sm:mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Link to="/contact">
              <Button 
                size="lg" 
                className="group gap-1.5 xs:gap-2 sm:gap-3 px-3 xs:px-4 sm:px-6 py-1.5 xs:py-2 sm:py-5 md:py-6 text-xs xs:text-sm sm:text-base bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border-0 rounded-xl shadow-sm w-full xs:w-auto" 
                variant="outline"
              >
                Schedule a call 
                <PhoneCall className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform" />
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                size="lg" 
                className="group gap-1.5 xs:gap-2 sm:gap-3 px-3 xs:px-4 sm:px-6 py-1.5 xs:py-2 sm:py-5 md:py-6 text-xs xs:text-sm sm:text-base bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white border-0 rounded-xl shadow-md w-full xs:w-auto"
              >
                Get started today
                <ArrowRight className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
          
          {/* Stats section - Made more responsive */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 xs:gap-4 sm:gap-8 mt-8 xs:mt-12 sm:mt-16 w-full max-w-[280px] xs:max-w-xs sm:max-w-xl md:max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <div className="text-center px-2 xs:px-3 sm:px-6 text-white/90">
              <div className="text-xl xs:text-2xl sm:text-3xl font-bold mb-0.5 xs:mb-1 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-500">500+</div>
              <div className="text-[10px] xs:text-xs sm:text-sm text-gray-400">Happy Clients</div>
            </div>
            <div className="text-center px-2 xs:px-3 sm:px-6 text-white/90">
              <div className="text-xl xs:text-2xl sm:text-3xl font-bold mb-0.5 xs:mb-1 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-500">98%</div>
              <div className="text-[10px] xs:text-xs sm:text-sm text-gray-400">Success Rate</div>
            </div>
            <div className="text-center px-2 xs:px-3 sm:px-6 text-white/90">
              <div className="text-xl xs:text-2xl sm:text-3xl font-bold mb-0.5 xs:mb-1 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-500">12+</div>
              <div className="text-[10px] xs:text-xs sm:text-sm text-gray-400">Years Experience</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Added visual separator for better transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
    </div>
  );
}

export default AnimatedHero;