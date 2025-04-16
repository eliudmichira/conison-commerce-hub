import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDarkMode } from '../context/DarkModeContext';
import AnimatedHero from '../components/AnimatedHero';
import { 
  FaLaptopCode, FaShoppingCart, 
  FaProjectDiagram, FaRocket,
  FaStar, FaComments
} from 'react-icons/fa';
import { MoveRight, PhoneCall, CheckCircle, ArrowUpRight, Users } from 'lucide-react';
import { Button } from '../components/ui/button';

const HomePage = () => {
  const { isDarkMode } = useDarkMode();

  // Higher quality and more modern images
  const services = [
    {
      Icon: FaLaptopCode,
      title: "Web & App Development",
      description: "Custom websites and applications designed for your business needs and growth objectives.",
      link: "/services/web-development",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
      features: ["Responsive Design", "UI/UX Excellence", "SEO Optimized"]
    },
    {
      Icon: FaShoppingCart,
      title: "Graphic Design",
      description: "Complete online stores with secure checkout, inventory management, and customer analytics.",
      link: "/services/digital-marketing",
      image: "/images/graphics.jpg",
      features: ["Secure Payments", "Inventory System", "Customer Insights"]
    },
    {
      Icon: FaProjectDiagram,
      title: "Branding Identity",
      description: "Strategic planning to maximize your digital presence and achieve business objectives.",
      link: "/services",
      image: "/images/Brand Identity.jpg",
      features: ["Market Analysis", "Competitive Research", "Growth Roadmap"]
    },
    {
      Icon: FaRocket,
      title: "Growth & Marketing",
      description: "Data-driven campaigns that drive traffic, leads, and sustainable business growth.",
      link: "/services/digital-marketing",
      image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
      features: ["SEO/SEM", "Content Strategy", "Conversion Optimization"]
    }
  ];

  // Higher quality testimonial images
  const testimonials = [
    {
      id: 1,
      name: "Kherallah Mayombeek",
      company: "CEO, TechStart Africa",
      quote: "Conison Technologies delivered an outstanding website for my business. Their team was professional, responsive, and delivered exactly what we needed. Highly recommended!",
      rating: 5,
      image: "https://unsplash.com/photos/man-in-black-crew-neck-long-sleeve-shirt-Ft4p5E9HjTQ"
    },
    {
      id: 2,
      name: "Ukumu Kim Diallo",
      company: "Marketing Director, AfroFashion",
      quote: "The team at Conison Technologies transformed our online presence. Their expertise in web development and digital marketing has significantly increased our business growth.",
      rating: 5,
      image: "https://unsplash.com/photos/man-in-blue-formal-suit-29pFbI_D1Sc"
    },
    {
      id: 3,
      name: "Tunde Adebayo",
      company: "Founder, GreenTech Solutions",
      quote: "Working with Conison Technologies was a game-changer for our company. Their innovative solutions and professional approach helped us achieve our digital goals.",
      rating: 5,
      image: "https://unsplash.com/photos/man-writing-on-white-paper-EI50ZDA-l8Y"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <AnimatedHero />

      {/* Core Services Section */}
      <section className={`py-24 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-4 ${
              isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800'
            }`}>
              Our Expertise
            </span>
            <h2 className={`text-3xl md:text-5xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Core Services
            </h2>
            <p className={`text-lg md:text-xl ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            } max-w-2xl mx-auto`}>
              Comprehensive digital solutions tailored to your business needs
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`group h-full relative overflow-hidden rounded-xl ${
                  isDarkMode ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700' : 'bg-white border border-gray-100'
                } shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${
                    isDarkMode 
                      ? 'from-gray-900/90 to-transparent' 
                      : 'from-gray-900/80 to-transparent'
                  }`} />
                  <div className="absolute bottom-4 left-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-800'
                    }`}>
                      <service.Icon className="mr-1" /> {service.title.split(' ')[0]}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-3 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {service.title}
                  </h3>
                  <p className={`${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  } mb-4`}>
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className={`flex items-center ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        <CheckCircle className={`h-4 w-4 mr-2 ${
                          isDarkMode ? 'text-blue-400' : 'text-blue-600'
                        }`} />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    to={service.link}
                    className={`inline-flex items-center ${
                      isDarkMode 
                        ? 'text-blue-400 hover:text-blue-300' 
                        : 'text-blue-600 hover:text-blue-500'
                    } font-medium group/link`}
                  >
                    Learn more
                    <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className={`py-24 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-4 ${
                isDarkMode ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-800'
              }`}>
                Why Us
              </span>
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Why Choose Conison Technologies?
              </h2>
              <p className={`text-lg mb-8 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                We combine innovation, expertise, and client-focused solutions to deliver exceptional results for businesses of all sizes.
              </p>
              
              <div className="space-y-6">
                <div className={`flex items-start gap-4 p-5 rounded-xl ${
                  isDarkMode ? 'bg-gray-700/50' : 'bg-white'
                } shadow-sm`}>
                  <div className={`p-3 rounded-lg ${
                    isDarkMode ? 'bg-blue-500/20' : 'bg-blue-50'
                  }`}>
                    <Users className={`h-6 w-6 ${
                      isDarkMode ? 'text-blue-300' : 'text-blue-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold mb-2 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Expert Team
                    </h3>
                    <p className={`${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Our specialists bring years of industry experience to every project, ensuring cutting-edge solutions.
                    </p>
                  </div>
                </div>
                
                <div className={`flex items-start gap-4 p-5 rounded-xl ${
                  isDarkMode ? 'bg-gray-700/50' : 'bg-white'
                } shadow-sm`}>
                  <div className={`p-3 rounded-lg ${
                    isDarkMode ? 'bg-purple-500/20' : 'bg-purple-50'
                  }`}>
                    <FaRocket className={`h-6 w-6 ${
                      isDarkMode ? 'text-purple-300' : 'text-purple-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold mb-2 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Results-Driven Approach
                    </h3>
                    <p className={`${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      We focus on delivering measurable outcomes that directly impact your business growth.
                    </p>
                  </div>
                </div>
                
                <div className={`flex items-start gap-4 p-5 rounded-xl ${
                  isDarkMode ? 'bg-gray-700/50' : 'bg-white'
                } shadow-sm`}>
                  <div className={`p-3 rounded-lg ${
                    isDarkMode ? 'bg-teal-500/20' : 'bg-teal-50'
                  }`}>
                    <FaComments className={`h-6 w-6 ${
                      isDarkMode ? 'text-teal-300' : 'text-teal-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold mb-2 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Client Partnership
                    </h3>
                    <p className={`${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      We build long-term relationships through transparent communication and exceptional service.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="aspect-video overflow-hidden rounded-xl shadow-2xl relative">
              <img 
                src="/images/digital-transformation.jpg" 
                alt="Digital transformation showcase"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30 flex items-end">
                <div className="p-6 w-full">
                  <h3 className="text-white text-xl font-bold mb-2">Digital Transformation Solutions</h3>
                  <p className="text-white/80">Empowering businesses with innovative technology</p>
                </div>
              </div>
            </div>
              
              <div className="absolute -bottom-8 -left-8 max-w-xs">
                <div className={`p-4 rounded-lg shadow-lg ${
                  isDarkMode ? 'bg-gray-700 border border-gray-600' : 'bg-white'
                }`}>
                  <div className="flex gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 h-4 w-4" />
                    ))}
                  </div>
                  <p className={`text-sm mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    "Outstanding service and results. Highly recommended!"
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <img 
                        src="images/Affluent Black.png" 
                        alt="Client testimonial" 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <span className={`text-xs font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      David Michira, CEO at NextLevel
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.company}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="w-5 h-5 text-yellow-400" />
                  ))}
                  {[...Array(5 - testimonial.rating)].map((_, i) => (
                    <FaStar key={i + testimonial.rating} className="w-5 h-5 text-gray-300" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  "{testimonial.quote}"
                </p>
              </div>
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
      </section>

      {/* CTA Section - Fixed the pattern issue */}
      <section 
        className={`relative py-16 px-4 sm:px-6 lg:px-8 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-gray-800 to-gray-900' 
            : 'bg-gradient-to-br from-blue-50 to-indigo-100'
        }`}
      >
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute w-full h-full bg-repeat"
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                 backgroundSize: '30px 30px'
               }}
          ></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className={`text-3xl md:text-5xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Ready to Transform Your Business?
            </h2>
            <p className={`text-lg md:text-xl mb-10 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Let's discuss how our solutions can help you achieve your digital goals and drive your business forward
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button 
                  size="lg" 
                  className={`group gap-3 px-8 py-6 text-lg ${
                    isDarkMode 
                      ? 'bg-white text-gray-900 hover:bg-gray-100' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`} 
                >
                  Get Started 
                  <MoveRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  size="lg" 
                  className={`gap-3 px-8 py-6 text-lg ${
                    isDarkMode
                      ? 'bg-transparent border border-white text-white hover:bg-white/10' 
                      : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'
                  }`}
                  variant="outline"
                >
                  Contact Us <PhoneCall className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;