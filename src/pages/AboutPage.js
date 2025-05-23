import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import { 
  Users, 
  Smartphone, 
  Zap,
  Rocket, 
  Handshake, 
  ArrowRight, 
  Target,
  TrendingUp,
  Cloud,
  ExternalLink,
  Shield,
} from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import { Button } from '../components/ui/button';

const AboutPage = () => {
  const { isDarkMode } = useDarkMode();
  
  // Company information
  const companyInfo = {
    founded: "Established in 2023",
    mission: "Empowering businesses through innovative technological solutions and exceptional digital experiences",
    description: "Conison Technologies is a forward-thinking tech company specializing in web development, mobile applications, cloud solutions, and digital marketing services designed to help businesses thrive in the digital landscape."
  };

  // Core values with enhanced descriptions
  const values = [
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Constantly exploring emerging technologies to deliver cutting-edge solutions that keep our clients ahead of the competition.',
      color: 'text-red-500',
      bgColor: isDarkMode ? 'bg-red-500/20' : 'bg-red-100'
    },
    {
      icon: Users,
      title: 'Client Partnership',
      description: 'Building collaborative relationships with clients, understanding their unique needs, and becoming an extension of their team.',
      color: 'text-red-500',
      bgColor: isDarkMode ? 'bg-red-500/20' : 'bg-red-100'
    },
    {
      icon: Rocket,
      title: 'Excellence',
      description: 'Committed to delivering high-quality, performant, and scalable solutions that exceed expectations and create long-term value.',
      color: 'text-red-500',
      bgColor: isDarkMode ? 'bg-red-500/20' : 'bg-red-100'
    },
    {
      icon: Handshake,
      title: 'Integrity',
      description: 'Operating with transparency, honesty, and ethical standards in all our business relationships and practices.',
      color: 'text-red-500',
      bgColor: isDarkMode ? 'bg-red-500/20' : 'bg-red-100'
    }
  ];

  // Expertise areas with enhanced visuals
  const expertise = [
    {
      icon: Smartphone,
      title: 'Mobile Applications',
      description: 'Native and cross-platform mobile solutions for iOS and Android that deliver exceptional user experiences.',
      color: 'from-red-600 to-blue-600',
      iconBg: isDarkMode ? 'bg-red-500/20' : 'bg-red-100',
      iconColor: 'text-red-500'
    },
    {
      icon: Cloud,
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and migration services to optimize performance and reduce operational costs.',
      color: 'from-red-600 to-blue-600',
      iconBg: isDarkMode ? 'bg-red-500/20' : 'bg-red-100',
      iconColor: 'text-red-500'
    },
    {
      icon: TrendingUp,
      title: 'Digital Marketing',
      description: 'Strategic marketing services including SEO, social media management, and content creation to boost your online presence.',
      color: 'from-red-600 to-blue-600',
      iconBg: isDarkMode ? 'bg-red-500/20' : 'bg-red-100',
      iconColor: 'text-red-500'
    }
  ];

  // Team members with high-quality images
  const teamMembers = [
    {
      name: 'Abraham Deng Garang',
      role: 'Client Engagement Officer',
      image: '/images/Abraham Deng Garang.jpeg',
      description: 'Visionary leader with 15+ years of experience in technology and business development.',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
      }
    },
    {
      name: 'Eliud Samwels',
      role: 'CTO',
      image: '/images/Eliud Samwel.jpeg',
      description: 'Technical expert specializing in software architecture and innovation.',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
      }
    },
    {
      name: 'Dennis Muasya',
      role: 'Lead Developer',
      image: '/images/Dennis Mutisya.jpeg',
      description: 'Full-stack developer with expertise in modern web technologies.',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
      }
    },
    {
      name: 'Elisha Arende',
      role: 'UX Designer',
      image: process.env.PUBLIC_URL + '/images/arende.png',
      description: 'Creative designer focused on user experience and interface design.',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
      }
    }
  ];

  // Office images with high-quality alternatives
  const officeImages = [
    {
      src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      alt: 'Our modern office space',
      caption: 'Innovative Workspace'
    },
    {
      src: '/images/Teamwork Collaboration.png',
      alt: 'Meeting room',
      caption: 'Creative Meetings'
    }
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-r from-red-600 to-blue-600 text-white">
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <ParticleBackground />
        </div>
        <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span 
              className="inline-block px-4 py-1 rounded-full bg-white/30 backdrop-blur-sm text-white text-sm font-bold mb-4 shadow-md"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Established in 2023
            </motion.span>
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-md"
            >
              About Conison Technologies
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-xl text-white font-medium max-w-2xl mx-auto drop-shadow-md"
            >
              {companyInfo.mission}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                isDarkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-800'
              }`}>
                Our Journey
              </span>
              <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Our Story
              </h2>
              <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Founded in 2023, Conison Technologies has quickly established itself as an emerging technology solutions provider. Our journey has been defined by innovation, dedication, and a commitment to excellence.
              </p>
              <p className={`text-lg mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We believe in creating technology that makes a difference, solving real-world problems, and helping businesses thrive in the digital age.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  <Users className="h-5 w-5 text-red-500" />
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                    25+ Team Members
                  </span>
                </div>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  <Target className="h-5 w-5 text-red-500" />
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                    50+ Projects Completed
                  </span>
                </div>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  <Shield className="h-5 w-5 text-red-500" />
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                    100% Client Satisfaction
                  </span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-2 gap-4 h-full"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {officeImages.map((image, index) => (
                <motion.div 
                  key={index} 
                  className={`relative group overflow-hidden rounded-xl shadow-lg ${index === 2 ? 'col-span-2' : ''}`}
                  variants={fadeInUp}
                >
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <p className="text-white font-medium">{image.caption}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className={`py-24 ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
              isDarkMode ? 'bg-teal-900/30 text-teal-400' : 'bg-teal-100 text-teal-800'
            }`}>
              Our Core Values
            </span>
            <h3 className={`text-3xl md:text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Principles That Guide Our Work
            </h3>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              At Conison, we're driven by a set of core values that shape how we work, collaborate, and serve our clients.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all h-full ${
                  isDarkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
                }`}
              >
                <div className={`mb-6 ${value.color} ${value.bgColor} p-4 rounded-2xl inline-block`}>
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {value.title}
                </h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Expertise Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
              isDarkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-800'
            }`}>
              What We Do Best
            </span>
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Our Expertise
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              We specialize in delivering cutting-edge solutions across multiple domains
            </p>
          </motion.div>

          <motion.div 
            className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {expertise.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`p-8 rounded-xl shadow-lg hover:shadow-xl transition-all ${
                  isDarkMode ? 'bg-gray-800 hover:bg-gray-750 border border-gray-700' : 'bg-white hover:bg-gray-50 border border-gray-100'
                }`}
              >
                <div className={`${item.iconBg} ${item.iconColor} p-4 rounded-xl inline-block mb-6`}>
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {item.title}
                </h3>
                <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {item.description}
                </p>
                <Link to={`/services#${item.title.toLowerCase().replace(/\s+/g, '-')}`} className={`inline-flex items-center ${
                  isDarkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'
                } font-medium`}>
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className={`py-24 ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
              isDarkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-800'
            }`}>
              Our Team
            </span>
            <h3 className={`text-3xl md:text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              The People Behind Our Success
            </h3>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Our diverse team of experts brings together years of experience and a passion for innovation to deliver exceptional results for our clients.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all group ${
                  isDarkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
                }`}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" 
                        className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                        <ExternalLink className="w-4 h-4 text-white" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {member.name}
                  </h3>
                  <p className={`text-red-500 mb-4`}>{member.role}</p>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-blue-600 opacity-90"></div>
        <div className="absolute inset-0 opacity-10" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
             }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Let's discuss how we can help you achieve your goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button 
                  size="lg" 
                  className="group gap-3 px-8 py-6 text-base bg-white text-red-600 hover:bg-white/90"
                >
                  Get in Touch
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/services">
                <Button 
                  size="lg" 
                  className="gap-3 px-8 py-6 text-base bg-transparent border border-white text-white hover:bg-white/10"
                  variant="outline"
                >
                  View Our Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;