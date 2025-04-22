// components/TestimonialCarousel.js
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const TestimonialCarousel = ({ isDarkMode }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Testimonial data
  const testimonials = [
    {
      name: "Sarah Johnson",
      title: "Marketing Director, TechGrow Ltd",
      image: "/images/testimonials/sarah.jpg",
      stars: 5,
      testimonial: "The transparent pricing was a breath of fresh air. We knew exactly what we were getting and for what cost. Conison Technologies delivered our website redesign on time and on budget, with no surprise fees. Their work has directly led to a 40% increase in our lead generation."
    },
    {
      name: "Michael Kimani",
      title: "CEO, LocalEats Delivery",
      image: "/images/testimonials/michael.jpg",
      stars: 5,
      testimonial: "As a startup, budget predictability was crucial for us. Conison's rate card made it easy to plan our expenses, and they worked with us to create a package that fit our needs perfectly. Our e-commerce platform processes hundreds of orders daily without issues."
    },
    {
      name: "Jessica Wambui",
      title: "Marketing Manager, Savannah Tours",
      image: "/images/testimonials/jessica.jpg",
      stars: 4,
      testimonial: "The digital marketing package we chose has transformed our online presence. Within three months, our social media engagement increased by 150% and conversion rates improved significantly. Their pricing was fair and the ROI has been exceptional."
    },
    {
      name: "David Ochieng",
      title: "Founder, EduTech Solutions",
      image: "/images/testimonials/david.jpg",
      stars: 5,
      testimonial: "We needed a complex educational app developed on a tight budget. Conison not only met our technical requirements but also found innovative ways to deliver value while keeping costs manageable. The project came in under budget and has received excellent user feedback."
    }
  ];
  
  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, 6000);
    
    return () => clearInterval(interval);
  }, [activeIndex, isAnimating]);
  
  // Handle slide navigation
  const nextSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  const prevSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  const goToSlide = (index) => {
    if (isAnimating || index === activeIndex) return;
    
    setIsAnimating(true);
    setActiveIndex(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  // Render stars
  const renderStars = (count) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < count ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
      />
    ));
  };

  return (
    <div className="relative">
      {/* Main Carousel */}
      <div className={`rounded-xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg relative`}>
        <div className="relative h-full overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="w-full flex-shrink-0 p-8 md:p-12">
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                  {/* Author Image */}
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-purple-200 dark:border-purple-900">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${testimonial.name.replace(/\s+/g, '+')}&background=random`;
                      }}
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex justify-center md:justify-start mb-3">
                      {renderStars(testimonial.stars)}
                    </div>
                    
                    <div className="relative mb-6">
                      <svg 
                        className="absolute top-0 left-0 transform -translate-x-6 -translate-y-6 h-12 w-12 text-red-200 dark:text-red-900/40" 
                        fill="currentColor" 
                        viewBox="0 0 32 32"
                      >
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                      <p className="text-gray-600 dark:text-gray-300 text-lg italic">
                        {testimonial.testimonial}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-xl">{testimonial.name}</h4>
                      <p className="text-gray-500 dark:text-gray-400">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <button 
          onClick={prevSlide}
          className={`absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center ${
            isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
          } shadow-md z-10`}
          disabled={isAnimating}
        >
          <ChevronLeft className={`w-5 h-5 ${isAnimating ? 'opacity-50' : ''}`} />
        </button>
        
        <button 
          onClick={nextSlide}
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center ${
            isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
          } shadow-md z-10`}
          disabled={isAnimating}
        >
          <ChevronRight className={`w-5 h-5 ${isAnimating ? 'opacity-50' : ''}`} />
        </button>
      </div>
      
      {/* Dots Navigation */}
      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === activeIndex
                ? 'bg-red-600 w-6'
                : isDarkMode ? 'bg-gray-300 w-3 hover:bg-gray-400' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;