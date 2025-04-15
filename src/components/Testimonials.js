import React, { memo } from 'react';
import { FaStar } from 'react-icons/fa';

// TestimonialCard component for individual testimonials
const TestimonialCard = memo(({ testimonial }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h4 className="font-medium text-gray-900 dark:text-gray-100">{testimonial.name}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.position}</p>
        </div>
      </div>
      <div className="text-gray-600 dark:text-gray-300 italic">
        "{testimonial.text}"
      </div>
      <div className="mt-4">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`w-5 h-5 ${
                i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
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
      name: "Nia Johnson",
      title: "CEO, AfroTech Solutions",
      quote: "Conison Technologies transformed our digital presence. Their team's expertise and dedication to our project was exceptional.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 2,
      name: "Kwame Mensah",
      title: "CTO, Digital Africa",
      quote: "The level of professionalism and technical expertise demonstrated by Conison Technologies is unmatched. They delivered our project on time and exceeded our expectations.",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 3,
      name: "Aisha Bello",
      title: "Marketing Director, Pan-African Tech",
      quote: "Working with Conison Technologies was a game-changer for our business. Their innovative solutions and attention to detail helped us achieve our digital transformation goals.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    }
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">What Our Clients Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayTestimonials.map(testimonial => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <a
          href="https://web.facebook.com/Conisontech213/reviews"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Read More Reviews on Facebook
        </a>
      </div>
    </div>
  );
};

export default memo(Testimonials); 