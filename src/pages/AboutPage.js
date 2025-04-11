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
import ParticleBackground from '../components/ParticleBackground';

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
      color: 'text-primary-blue'
    },
    {
      icon: Users,
      title: 'Client Partnership',
      description: 'Building collaborative relationships with clients, understanding their unique needs, and becoming an extension of their team.',
      color: 'text-primary-purple'
    },
    {
      icon: Rocket,
      title: 'Excellence',
      description: 'Committed to delivering high-quality, performant, and scalable solutions that exceed expectations and create long-term value.',
      color: 'text-primary-teal'
    },
    {
      icon: Handshake,
      title: 'Integrity',
      description: 'Operating with transparency, honesty, and ethical standards in all our business relationships and practices.',
      color: 'text-primary-purple'
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

  const teamMembers = [
    {
      name: 'John Doe',
      role: 'CEO & Founder',
      image: 'https://cdn.pixabay.com/photo/2017/08/01/01/33/people-2563491_1280.jpg',
      description: 'Visionary leader with 15+ years of experience in technology and business development.'
    },
    {
      name: 'Jane Smith',
      role: 'CTO',
      image: 'https://cdn.pixabay.com/photo/2017/08/01/01/33/people-2563491_1280.jpg',
      description: 'Technical expert specializing in software architecture and innovation.'
    },
    {
      name: 'Mike Johnson',
      role: 'Lead Developer',
      image: 'https://cdn.pixabay.com/photo/2017/08/01/01/33/people-2563491_1280.jpg',
      description: 'Full-stack developer with expertise in modern web technologies.'
    },
    {
      name: 'Sarah Williams',
      role: 'UX Designer',
      image: 'https://cdn.pixabay.com/photo/2017/08/01/01/33/people-2563491_1280.jpg',
      description: 'Creative designer focused on user experience and interface design.'
    }
  ];

  const officeImages = [
    {
      src: 'https://cdn.pixabay.com/photo/2017/08/01/01/33/people-2563491_1280.jpg',
      alt: 'Our modern office space',
      caption: 'Innovative Workspace'
    },
    {
      src: 'https://cdn.pixabay.com/photo/2017/08/01/01/33/people-2563491_1280.jpg',
      alt: 'Team collaboration area',
      caption: 'Collaboration Hub'
    },
    {
      src: 'https://cdn.pixabay.com/photo/2017/08/01/01/33/people-2563491_1280.jpg',
      alt: 'Meeting room',
      caption: 'Creative Meetings'
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-conison.gray-900' : 'bg-white'}`}>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary-blue via-primary-purple to-primary-teal text-white">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <ParticleBackground />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white"
            >
              About Conison
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-xl text-white/90"
            >
              Empowering businesses with innovative technology solutions
            </motion.p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Founded in 2020, Conison Technologies has grown from a small startup to a leading technology solutions provider. Our journey has been marked by innovation, dedication, and a commitment to excellence.
              </p>
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We believe in creating technology that makes a difference, solving real-world problems, and helping businesses thrive in the digital age.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {officeImages.map((image, index) => (
                <div key={index} className="relative group overflow-hidden rounded-lg">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-sm">{image.caption}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className={`py-24 ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block">
              <h2 className="text-sm font-bold text-primary-teal uppercase tracking-wider mb-2">Our Core Values</h2>
              <div className="h-1 w-20 bg-primary-teal rounded-full mb-6 mx-auto"></div>
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
              <h2 className="text-sm font-bold text-primary-teal uppercase tracking-wider mb-2">Meet Our Team</h2>
              <div className="h-1 w-20 bg-primary-teal rounded-full mb-6 mx-auto"></div>
            </div>
            <h3 className={`text-3xl md:text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              The People Behind Our Success
            </h3>
            <p className={`text-lg max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Our diverse team of experts brings together years of experience and a passion for innovation to deliver exceptional results for our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all ${
                  isDarkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
                }`}
              >
                <div className="relative h-64">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className={`text-primary-teal mb-4`}>{member.role}</p>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 bg-gradient-to-r from-primary-blue to-primary-teal text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to Transform Your Business?
          </h2>
          <p className="mt-4 text-lg text-white/90">
            Let's discuss how we can help you achieve your goals
          </p>
          <div className="mt-8">
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-primary-blue bg-white hover:bg-white/90 transition-colors"
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