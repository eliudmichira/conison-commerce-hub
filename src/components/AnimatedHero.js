import React, { useEffect, useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

function AnimatedHero() {
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
    <div className="w-full">
      <div className="container mx-auto">
        <div 
          className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col"
          style={{ contentVisibility: 'auto' }}
        >
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-conison-cyan">Technology Solutions for the</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {/* Show static first title for immediate LCP */}
                {!animationsEnabled && (
                  <span className="font-semibold">{titles[0]}</span>
                )}
                
                {/* Only render animations after initial load */}
                {animationsEnabled && titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold"
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

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-conison-gray dark:text-muted-foreground max-w-2xl text-center font-medium">
              We deliver cutting-edge solutions tailored to your business needs.
              Our expertise spans across web development, mobile applications,
              and digital transformation strategies.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Link to="/contact">
              <Button size="lg" className="gap-4" variant="outline">
                Jump on a call <PhoneCall className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" className="gap-4">
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