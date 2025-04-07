import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Lightbulb, 
  Rocket, 
  Handshake, 
  ArrowRight, 
  Play, 
  Globe, 
  Target 
} from 'lucide-react';
import { useDarkMode } from '../context/DarkModeContext';

const AboutPage = () => {
  const { isDarkMode } = useDarkMode();

  const values = [
    {
      icon: Users,
      title: 'Client-Centric',
      description: 'Putting our clients\' needs and goals at the core of every solution we develop.',
      color: 'text-blue-600'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Continuously exploring cutting-edge technologies to deliver forward-thinking solutions.',
      color: 'text-yellow-500'
    },
    {
      icon: Rocket,
      title: 'Excellence',
      description: 'Committed to delivering high-quality, impactful results that exceed expectations.',
      color: 'text-green-600'
    },
    {
      icon: Handshake,
      title: 'Integrity',
      description: 'Maintaining the highest standards of professional ethics and transparency.',
      color: 'text-purple-600'
    }
  ];

  const teamMembers = [
    {
      name: 'John Doe',
      role: 'Founder & CEO',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      bio: 'Tech visionary with 15 years of experience in digital transformation.'
    },
    {
      name: 'Jane Smith',
      role: 'Chief Technology Officer',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
      bio: 'Expert in cutting-edge software architecture and innovation strategies.'
    },
    {
      name: 'Michael Johnson',
      role: 'Creative Director',
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
      bio: 'Award-winning designer specializing in user experience and brand identity.'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
    >
      {/* Hero Section */}
      <motion.section 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-24 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 max-w-3xl mx-auto">
            Transforming Businesses Through Technology
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            We are a passionate team of innovators, dedicated to crafting digital solutions that drive growth, efficiency, and meaningful connections.
          </p>
        </div>
      </motion.section>

      {/* Our Story Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold mb-6">Our Journey</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Founded in 2023, Conison Technologies emerged from a vision to bridge technological innovation with business potential. 
              What started as a small team of passionate developers has evolved into a comprehensive digital solutions provider.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Our mission is simple yet powerful: to empower businesses with transformative technology that creates lasting impact.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition"
            >
              <span>Learn More About Our Mission</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
          >
            <div className="flex items-center space-x-4 mb-6">
              <Globe className="w-12 h-12 text-blue-600" />
              <h3 className="text-2xl font-semibold">Global Perspective</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              With a global mindset, we leverage diverse expertise to deliver innovative solutions that transcend geographical boundaries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white dark:bg-gray-750 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group"
              >
                <div className={`mb-4 ${value.color} bg-opacity-10 p-4 rounded-full inline-block`}>
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                <div className="relative">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-sm">{member.role}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              Let's collaborate and turn your digital vision into reality. Our team is ready to provide innovative solutions that drive your success.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-700 rounded-lg hover:bg-blue-50 transition-all shadow-lg"
            >
              <span className="mr-2">Start Your Project</span>
              <Target className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutPage;