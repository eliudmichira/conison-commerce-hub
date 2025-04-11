// components/ThreeJsParticleHero.js
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import * as THREE from 'three';

const ThreeJsParticleHero = () => {
  const { isDarkMode } = useDarkMode();
  const mountRef = useRef(null);
  
  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = 5;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    
    // Particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    
    const posArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);
    
    // Fill with random positions
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Create a sphere of particles
      const radius = 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = radius * Math.cos(phi);
      
      // Randomize scales for each particle
      scaleArray[i/3] = Math.random();
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
    
    // Particle material
    const particlesMaterial = new THREE.PointsMaterial({
      size: isDarkMode ? 0.02 : 0.03,
      sizeAttenuation: true,
      color: isDarkMode ? 0x9fa8da : 0x555356,
      transparent: true,
      opacity: isDarkMode ? 0.8 : 0.85
    });
    
    // Create the particle system
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Mouse interaction
    const mouse = {
      x: undefined,
      y: undefined
    };
    
    window.addEventListener('mousemove', (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate slowly
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0005;
      
      // Follow mouse movement with slight delay
      if (mouse.x && mouse.y) {
        particlesMesh.rotation.x += (mouse.y * 0.1 - particlesMesh.rotation.x) * 0.05;
        particlesMesh.rotation.y += (mouse.x * 0.1 - particlesMesh.rotation.y) * 0.05;
      }
      
      renderer.render(scene, camera);
    };
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      
      // Clean up Three.js resources
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      scene.remove(particlesMesh);
    };
  }, [isDarkMode]);
  
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Three.js container */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 z-0"
      />
      
      {/* Gradient overlay */}
      <div className={`absolute inset-0 ${isDarkMode ? 
        'bg-gradient-to-br from-blue-600/70 via-indigo-700/70 to-purple-800/70' : 
        'bg-gradient-to-br from-cyan-500/60 via-magenta-600/60 to-yellow-500/60'} z-10`}></div>
      
      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="mb-6 inline-block">
          <svg className="w-20 h-20 mx-auto mb-4" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="2" />
            <path d="M30 50L45 65L70 35" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h2 className="text-xl font-medium text-white/80 tracking-wider uppercase">Conison Technologies</h2>
        </div>
        
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
          Innovative Digital Solutions
        </h1>
        
        <p className="text-xl sm:text-2xl text-white/90 mb-10 max-w-3xl mx-auto font-light">
          We transform complex challenges into elegant technological solutions
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            to="/quote-request"
            className="group relative overflow-hidden bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold border border-white/30 hover:bg-white/20 transition-all shadow-lg"
          >
            <span className="relative z-10">Get Started</span>
            <span className="absolute inset-0 bg-gradient-to-r from-conison-magenta to-conison-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Link>
          
          <Link
            to="/services"
            className="group bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold border border-white/30 hover:bg-white/20 transition-all shadow-lg"
          >
            <span>Explore Services</span>
          </Link>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};

export default ThreeJsParticleHero;