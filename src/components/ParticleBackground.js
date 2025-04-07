// components/ParticleBackground.js
import React, { useEffect, useRef } from 'react';
import { useDarkMode } from '../context/DarkModeContext';

const ParticleBackground = () => {
  const { isDarkMode } = useDarkMode();
  const particlesContainerRef = useRef(null);

  // Initialize particles when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined' && window.particlesJS) {
      window.particlesJS('particles-js', {
        "particles": {
          "number": {
            "value": 80,
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
            "value": isDarkMode ? 0.8 : 0.75,
            "random": true,
            "anim": {
              "enable": true,
              "speed": 1,
              "opacity_min": isDarkMode ? 0.5 : 0.45,
              "sync": false
            }
          },
          "size": {
            "value": isDarkMode ? 4 : 4.5,
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
            "opacity": isDarkMode ? 0.7 : 0.65,
            "width": isDarkMode ? 1.5 : 1.75
          },
          "move": {
            "enable": true,
            "speed": 3,
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
          "detect_on": "window",
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
        "retina_detect": true
      });
    }

    // Cleanup function
    return () => {
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
      if (typeof window !== 'undefined' && window.particlesJS && window.pJSDom && window.pJSDom.length > 0) {
        try {
          // Get the particles.js instance
          const particlesJS = window.pJSDom[0].pJS;
          
          const isDarkModeEnabled = event.detail.enabled;
          
          // Update particle colors and settings based on dark mode
          particlesJS.particles.color.value = isDarkModeEnabled ? ["#00adee", "#ec008c", "#fce300"] : ["#00adee", "#ec008c", "#555356"];
          particlesJS.particles.line_linked.color = isDarkModeEnabled ? "#fce300" : "#555356";
          particlesJS.particles.line_linked.opacity = isDarkModeEnabled ? 0.7 : 0.65;
          particlesJS.particles.line_linked.width = isDarkModeEnabled ? 1.5 : 1.75;
          
          // Adjust opacity and size for better visibility in dark mode
          particlesJS.particles.opacity.value = isDarkModeEnabled ? 0.8 : 0.75;
          particlesJS.particles.opacity.anim.opacity_min = isDarkModeEnabled ? 0.5 : 0.45;
          particlesJS.particles.size.value = isDarkModeEnabled ? 4 : 4.5;
          
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
  }, []);

  return (
    <div 
      id="particles-js" 
      ref={particlesContainerRef}
      className="particles-container" 
      style={{
        opacity: 1
      }} 
    />
  );
};

export default ParticleBackground;