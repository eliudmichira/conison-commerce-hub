import React, { memo } from 'react';

// TestimonialCard component for individual testimonials
const TestimonialCard = memo(({ testimonial }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md">
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        "{testimonial.text}"
      </p>
      <div className="flex items-center">
        <img 
          src={testimonial.avatar || `/images/avatars/avatar-${testimonial.id}.jpg`} 
          alt={testimonial.name} 
          className="w-12 h-12 rounded-full mr-4 object-cover"
          loading="lazy"
        />
        <div>
          <h4 className="font-medium text-gray-900 dark:text-gray-100">{testimonial.name}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.position}</p>
        </div>
      </div>
    </div>
  );
});

// Main Testimonials component
const Testimonials = ({ testimonials = [] }) => {
  // Default testimonials if none are provided
  const defaultTestimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "CEO, TechStart",
      text: "Conison Technologies transformed our online presence. Their team delivered beyond our expectations with a website that perfectly captures our brand identity.",
      avatar: "/images/avatars/avatar-1.jpg"
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Marketing Director, InnovateX",
      text: "The custom app developed by Conison has streamlined our operations and increased customer engagement by 45%. Their ongoing support has been exceptional.",
      avatar: "/images/avatars/avatar-2.jpg"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "Founder, EcoSolutions",
      text: "Working with Conison on our e-commerce platform was a game-changer. Sales increased by 60% within three months of launch. Highly recommended!",
      avatar: "/images/avatars/avatar-3.jpg"
    }
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayTestimonials.map(testimonial => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Testimonials); 