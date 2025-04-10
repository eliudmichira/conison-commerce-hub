import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Rocket, 
  Handshake, 
  ArrowRight, 
  Target,
  Code,
  TrendingUp,
  Zap,
  Smartphone,
  Monitor,
  Database,
  Cloud,
  Palette,
  Server,
  Shield
} from 'lucide-react';
import { useDarkMode } from '../context/DarkModeContext';

const AboutPage = () => {
  const { isDarkMode } = useDarkMode();
  
  // Real company information from Conison's Facebook page
  const companyInfo = {
    founded: "Established in 2023",
    mission: "Empowering businesses through innovative technological solutions and exceptional digital experiences",
    description: "Conison Technologies is a forward-thinking tech company specializing in web development, mobile applications, cloud solutions, and digital marketing services designed to help businesses thrive in the digital landscape."
  };

  const values = [
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Constantly exploring emerging technologies to deliver cutting-edge solutions that keep our clients ahead of the competition.',
      color: 'text-yellow-500'
    },
    {
      icon: Users,
      title: 'Client Partnership',
      description: 'Building collaborative relationships with clients, understanding their unique needs, and becoming an extension of their team.',
      color: 'text-blue-600'
    },
    {
      icon: Rocket,
      title: 'Excellence',
      description: 'Committed to delivering high-quality, performant, and scalable solutions that exceed expectations and create long-term value.',
      color: 'text-green-600'
    },
    {
      icon: Handshake,
      title: 'Integrity',
      description: 'Operating with transparency, honesty, and ethical standards in all our business relationships and practices.',
      color: 'text-purple-600'
    }
  ];

  const expertise = [
    {
      icon: Monitor,
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern frameworks and responsive design principles.',
      color: 'from-blue-500 to-cyan-400'
    },
    {
      icon: Smartphone,
      title: 'Mobile Applications',
      description: 'Native and cross-platform mobile solutions for iOS and Android that deliver exceptional user experiences.',
      color: 'from-green-500 to-emerald-400'
    },
    {
      icon: Cloud,
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and migration services to optimize performance and reduce operational costs.',
      color: 'from-purple-500 to-violet-400'
    },
    {
      icon: TrendingUp,
      title: 'Digital Marketing',
      description: 'Strategic marketing services including SEO, social media management, and content creation to boost your online presence.',
      color: 'from-pink-500 to-rose-400'
    },
    {
      icon: Database,
      title: 'Data Management',
      description: 'Comprehensive database solutions for secure, efficient, and scalable data operations and business intelligence.',
      color: 'from-amber-500 to-yellow-400'
    },
    {
      icon: Code,
      title: 'Custom Software',
      description: 'Bespoke software solutions tailored to your specific business requirements and integration needs.',
      color: 'from-indigo-500 to-blue-400'
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-conison.gray-900' : 'bg-white'}`}>
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-4xl sm:text-5xl md:text-6xl font-bold ${isDarkMode ? 'text-white' : 'text-conison.gray-900'}`}
            >
              About Conison
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`mt-6 text-xl ${isDarkMode ? 'text-conison.gray-400' : 'text-conison.gray-600'}`}
            >
              Empowering businesses with innovative technology solutions
            </motion.p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-block">
              <h2 className="text-sm font-bold text-conison-magenta uppercase tracking-wider mb-2">Our Story</h2>
              <div className="h-1 w-20 bg-conison-magenta rounded-full mb-6"></div>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold">Driving Digital Transformation</h3>
            
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {companyInfo.description}
            </p>
            
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {companyInfo.founded}, we've been dedicated to helping businesses adapt to the digital era with comprehensive tech solutions tailored to their unique needs.
            </p>
            
            <div className="py-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                  <Target className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Our Mission</h4>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{companyInfo.mission}</p>
                </div>
              </div>
            </div>
            
            <Link 
              to="/portfolio" 
              className="inline-flex items-center text-conison-magenta hover:text-purple-700 font-semibold transition-colors group"
            >
              <span>View Our Success Stories</span>
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                alt="Conison Team Collaboration" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
                <div className="p-6">
                  <div className="text-white text-lg font-semibold">Collaborative Excellence</div>
                  <div className="text-blue-200 text-sm">Our team working together to deliver outstanding results</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-10 -right-10 z-0 w-64 h-64 bg-gradient-to-r from-conison-magenta to-blue-600 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute -top-10 -left-10 z-0 w-64 h-64 bg-gradient-to-r from-yellow-400 to-orange-600 rounded-full blur-3xl opacity-20"></div>
          </motion.div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className={`py-24 ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block">
              <h2 className="text-sm font-bold text-conison-magenta uppercase tracking-wider mb-2">Our Core Values</h2>
              <div className="h-1 w-20 bg-conison-magenta rounded-full mb-6 mx-auto"></div>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Principles That Guide Our Work</h3>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              At Conison, we're driven by a set of core values that shape how we work, collaborate, and serve our clients.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all h-full ${
                  isDarkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
                }`}
              >
                <div className={`mb-6 ${value.color} bg-opacity-10 p-4 rounded-2xl inline-block`}>
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">
                  {value.title}
                </h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Expertise Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-conison.gray-900'}`}>
              Our Expertise
            </h2>
            <p className={`mt-4 text-lg ${isDarkMode ? 'text-conison.gray-400' : 'text-conison.gray-600'}`}>
              We specialize in delivering cutting-edge solutions across multiple domains
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {expertise.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`p-6 rounded-lg ${isDarkMode ? 'bg-conison.gray-800' : 'bg-conison.gray-50'}`}
              >
                <div className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? 'text-conison-magenta' : 'text-conison-magenta'}`}>
                  <item.icon className="w-12 h-12" />
                </div>
                <h3 className={`text-xl font-semibold text-center ${isDarkMode ? 'text-white' : 'text-conison.gray-900'}`}>
                  {item.title}
                </h3>
                <p className={`mt-4 text-center ${isDarkMode ? 'text-conison.gray-400' : 'text-conison.gray-600'}`}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className={`py-24 ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block">
              <h2 className="text-sm font-bold text-conison-magenta uppercase tracking-wider mb-2">Meet Our Team</h2>
              <div className="h-1 w-20 bg-conison-magenta rounded-full mb-6 mx-auto"></div>
            </div>
            <h3 className={`text-3xl md:text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              The People Behind Our Success
            </h3>
            <p className={`text-lg max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Our diverse team of experts brings together years of experience and a passion for innovation to deliver exceptional results for our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`rounded-xl overflow-hidden shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
                  alt="John Doe - CEO" 
                  className="w-full h-64 object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              </div>
              <div className="p-6">
                <h4 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>John Doe</h4>
                <p className="text-conison-magenta font-medium mb-3">Chief Executive Officer</p>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  With over 15 years of experience in the tech industry, John leads our company with vision and strategic insight.
                </p>
              </div>
            </motion.div>

            {/* Team Member 2 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`rounded-xl overflow-hidden shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80" 
                  alt="Jane Smith - CTO" 
                  className="w-full h-64 object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              </div>
              <div className="p-6">
                <h4 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Jane Smith</h4>
                <p className="text-conison-magenta font-medium mb-3">Chief Technology Officer</p>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  Jane brings deep technical expertise and a forward-thinking approach to guiding our technology development.
                </p>
              </div>
            </motion.div>

            {/* Team Member 3 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={`rounded-xl overflow-hidden shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
                  alt="Michael Johnson - Lead Developer" 
                  className="w-full h-64 object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              </div>
              <div className="p-6">
                <h4 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Michael Johnson</h4>
                <p className="text-conison-magenta font-medium mb-3">Lead Developer</p>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  Michael's coding expertise and problem-solving skills help us build robust and scalable solutions for our clients.
                </p>
              </div>
            </motion.div>

            {/* Team Member 4 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={`rounded-xl overflow-hidden shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
                  alt="Sarah Williams - Design Director" 
                  className="w-full h-64 object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              </div>
              <div className="p-6">
                <h4 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Sarah Williams</h4>
                <p className="text-conison-magenta font-medium mb-3">Design Director</p>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  Sarah's creative vision and user-centered approach ensure our products deliver exceptional experiences.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/login" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-conison-magenta hover:bg-conison-magenta-dark transition-colors"
            >
              Members Login
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-conison.gray-800' : 'bg-conison.gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-conison.gray-900'}`}>
            Ready to Transform Your Business?
          </h2>
          <p className={`mt-4 text-lg ${isDarkMode ? 'text-conison.gray-400' : 'text-conison.gray-600'}`}>
            Let's discuss how we can help you achieve your goals
          </p>
          <div className="mt-8">
            <a
              href="/contact"
              className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-conison-magenta hover:bg-conison-magenta-600 transition-colors`}
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;