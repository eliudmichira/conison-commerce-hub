
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import TestimonialCard from "@/components/ui/TestimonialCard";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    quote: "Conison Technologies transformed our online presence with their exceptional web development and digital marketing services. Our customer engagement has increased significantly.",
    author: "Sarah Johnson",
    position: "CEO, JubaCommerce",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    quote: "The branding package we received was outstanding. The team at Conison understood our vision perfectly and delivered beyond our expectations.",
    author: "Michael Kur",
    position: "Marketing Director, Unity Bank",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    quote: "Working with Conison on our digital transformation journey has been seamless. Their IT consultancy services helped us modernize our operations effectively.",
    author: "James Deng",
    position: "Operations Manager, Savanna Solutions",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    quote: "The video production team at Conison captured our company event beautifully. The quality and creativity in their work is truly remarkable.",
    author: "Achol Majok",
    position: "Events Coordinator, Highland Hotels",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(3);
      } else if (window.innerWidth >= 768) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + visibleCount >= testimonials.length 
        ? 0 
        : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex <= 0 
        ? Math.max(0, testimonials.length - visibleCount) 
        : prevIndex - 1
    );
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="What Our Clients Say"
          subtitle="Don't just take our word for it, hear from some of our satisfied clients."
        />

        <div className="relative">
          <div 
            ref={containerRef}
            className="overflow-hidden"
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
                width: `${(testimonials.length / visibleCount) * 100}%`
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="px-3"
                  style={{ width: `${100 / testimonials.length * visibleCount}%` }}
                >
                  <TestimonialCard
                    quote={testimonial.quote}
                    author={testimonial.author}
                    position={testimonial.position}
                    image={testimonial.image}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={nextSlide}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
