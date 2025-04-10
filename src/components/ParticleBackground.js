// components/ParticleBackground.js
import React, { useEffect, useRef, useState } from 'react';
import { useDarkMode } from '../context/DarkModeContext';

const ParticleBackground = () => {
  const { isDarkMode } = useDarkMode();
  const particlesContainerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize particles only after critical content has loaded
  useEffect(() => {
    // Using requestIdleCallback to wait until browser is idle
    const initParticles = () => {
      if (typeof window !== 'undefined' && window.particlesJS) {
        window.particlesJS('particles-js', {
          "particles": {
            "number": {
              "value": 40, // Reduced from 80
              "density": {
                "enable": true,
                "value_area": 800
              }
            },
            "color": {
              "value": isDarkMode ? ["#00adee", "#ec008c", "#fce300"] : ["#00adee", "#ec008c", "#555356"]
            },
            "shape": {
              "type": "circle",
              "stroke": {
                "width": 0,
                "color": "#000000"
              }
            },
            "opacity": {
              "value": isDarkMode ? 0.6 : 0.5, // Reduced opacity
              "random": true,
              "anim": {
                "enable": true,
                "speed": 1,
                "opacity_min": isDarkMode ? 0.3 : 0.25,
                "sync": false
              }
            },
            "size": {
              "value": isDarkMode ? 3 : 3.5, // Smaller particles
              "random": true,
              "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
              }
            },
            "line_linked": {
              "enable": true,
              "distance": 150,
              "color": isDarkMode ? "#fce300" : "#555356",
              "opacity": isDarkMode ? 0.5 : 0.45, // Reduced opacity
              "width": isDarkMode ? 1 : 1.25 // Thinner lines
            },
            "move": {
              "enable": true,
              "speed": 2, // Slower movement
              "direction": "none",
              "random": false,
              "straight": false,
              "out_mode": "out",
              "bounce": false,
              "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
              }
            }
          },
          "interactivity": {
            "detect_on": "canvas", // Changed from window to canvas
            "events": {
              "onhover": {
                "enable": true,
                "mode": "repulse"
              },
              "onclick": {
                "enable": true,
                "mode": "push"
              },
              "resize": true
            },
            "modes": {
              "grab": {
                "distance": 180,
                "line_linked": {
                  "opacity": 1
                }
              },
              "bubble": {
                "distance": 250,
                "size": 6,
                "duration": 2,
                "opacity": 0.8,
                "speed": 3
              },
              "repulse": {
                "distance": 100,
                "duration": 0.4
              },
              "push": {
                "particles_nb": 4
              },
              "remove": {
                "particles_nb": 2
              }
            }
          },
          "retina_detect": false // Disabled retina detection for better performance
        });
        setIsLoaded(true);
      }
    };

    // Delay particles initialization until after critical content loads
    const timer = setTimeout(() => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(initParticles);
      } else {
        setTimeout(initParticles, 2000); // Fallback with 2 second delay
      }
    }, 1000);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      if (typeof window !== 'undefined' && window.pJSDom && window.pJSDom.length > 0) {
        // This will destroy the particles instance when component unmounts
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        window.pJSDom = [];
      }
    };
  }, [isDarkMode]);

  // Add animation visibility detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Apply to all animated elements
    document.querySelectorAll('.animate-fadeIn').forEach(el => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.animate-fadeIn').forEach(el => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Listen for dark mode changes
  useEffect(() => {
    const handleDarkModeChange = (event) => {
      if (isLoaded && typeof window !== 'undefined' && window.particlesJS && window.pJSDom && window.pJSDom.length > 0) {
        try {
          // Get the particles.js instance
          const particlesJS = window.pJSDom[0].pJS;
          
          const isDarkModeEnabled = event.detail.enabled;
          
          // Update particle colors and settings based on dark mode
          particlesJS.particles.color.value = isDarkModeEnabled ? ["#00adee", "#ec008c", "#fce300"] : ["#00adee", "#ec008c", "#555356"];
          particlesJS.particles.line_linked.color = isDarkModeEnabled ? "#fce300" : "#555356";
          particlesJS.particles.line_linked.opacity = isDarkModeEnabled ? 0.5 : 0.45;
          particlesJS.particles.line_linked.width = isDarkModeEnabled ? 1 : 1.25;
          
          // Adjust opacity and size for better visibility in dark mode
          particlesJS.particles.opacity.value = isDarkModeEnabled ? 0.6 : 0.5;
          particlesJS.particles.opacity.anim.opacity_min = isDarkModeEnabled ? 0.3 : 0.25;
          particlesJS.particles.size.value = isDarkModeEnabled ? 3 : 3.5;
          
          // Apply the changes
          particlesJS.fn.particlesRefresh();
        } catch (error) {
          console.error("Error updating particles colors:", error);
        }
      }
    };

    window.addEventListener('darkModeToggle', handleDarkModeChange);
    return () => {
      window.removeEventListener('darkModeToggle', handleDarkModeChange);
    };
  }, [isLoaded]);

  return (
    <div 
      id="particles-js" 
      ref={particlesContainerRef}
      className="particles-container" 
      style={{
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out'
      }} 
    />
  );
};

export default ParticleBackground;