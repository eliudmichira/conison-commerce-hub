import React, { useEffect, useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
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
    if (titleNumber === titles.length - 1) {
      setTitleNumber(0);
    } else {
      setTitleNumber(titleNumber + 1);
    }
  }, [titleNumber, titles.length]);

  useEffect(() => {
    // Only start title rotation after animations are enabled
    if (!animationsEnabled) return;
    
    const timeoutId = setTimeout(rotateTitles, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, animationsEnabled, rotateTitles]);

  return (
    <div className="w-full relative">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg" 
          alt="Diverse tech team collaborating" 
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-gray-900/80' : 'bg-gradient-to-r from-accent-cyan/90 via-accent-magenta/90 to-accent-yellow/90'}`}></div>
      </div>

      {/* Geometric Pattern Overlay */}
      <div className={`absolute inset-0 ${isDarkMode ? 'opacity-15' : 'opacity-10'} pointer-events-none`}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke={isDarkMode ? "white" : "black"} strokeWidth="0.5" opacity="0.5"/>
            </pattern>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <rect width="80" height="80" fill="url(#smallGrid)"/>
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke={isDarkMode ? "white" : "black"} strokeWidth="1" opacity="0.8"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div 
          className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col"
          style={{ contentVisibility: 'auto' }}
        >
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-white">Conison Technologies</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {/* Show static first title for immediate LCP */}
                {!animationsEnabled && (
                  <span className="font-semibold text-white">{titles[0]}</span>
                )}
                
                {/* Only render animations after initial load */}
                {animationsEnabled && titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold text-white"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-white/90 max-w-2xl text-center font-medium">
              Empowering businesses with innovative digital solutions.
              From web development to AI integration, we transform your vision into reality.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Link to="/contact">
              <Button size="lg" className="gap-4 bg-white/10 text-white hover:bg-white/20 border-0" variant="outline">
                Jump on a call <PhoneCall className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" className="gap-4 bg-white text-gray-900 hover:bg-white/90 border-0">
                Sign up here <MoveRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimatedHero; 