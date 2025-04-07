import React from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaGlobe, FaUsers, FaLightbulb, FaHandshake, FaLinkedin, FaTwitter } from 'react-icons/fa';
import '../styles/animations.css';
import ParticleBackground from '../components/ParticleBackground';

const AboutContactPage = () => {
  const { isDarkMode } = useDarkMode();

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: 'John Doe',
      role: 'CEO & Founder',
      image: '/images/team/member1.jpg',
      bio: 'Over 15 years of experience in tech leadership and business strategy.',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'CTO',
      image: '/images/team/member2.jpg',
      bio: 'Expert in software architecture and emerging technologies.',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    },
    {
      id: 3,
      name: 'Michael Johnson',
      role: 'Lead Developer',
      image: '/images/team/member3.jpg',
      bio: 'Full-stack engineer with expertise in React and Node.js.',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    },
    {
      id: 4,
      name: 'Sarah Williams',
      role: 'UI/UX Designer',
      image: '/images/team/member4.jpg',
      bio: 'Creative designer focused on building intuitive user experiences.',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}>
      {/* Hero Section with Particles */}
      <section className="relative py-20">
        <ParticleBackground />
        <div className="absolute inset-0 bg-gradient-to-r from-conison-magenta/20 to-conison-magenta/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-conison-magenta">Conison</span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Empowering businesses with innovative digital solutions and creative services.
            </p>
          </div>
        </div>
      </section>

      {/* Animated Background for the rest of the content */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-dots-dark' : 'bg-dots-light'}`}></div>
        <div className="absolute inset-0 opacity-50">
          <div className="absolute w-96 h-96 -left-48 -top-48 bg-conison-magenta/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute w-96 h-96 -right-48 -top-48 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute w-96 h-96 -left-48 -bottom-48 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          <div className="absolute w-96 h-96 -right-48 -bottom-48 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-6000"></div>
        </div>
      </div>

      {/* About Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="mb-4">
                Founded in Nairobi, Kenya, Conison Technologies has been at the forefront of digital innovation,
                helping businesses transform their ideas into reality through cutting-edge technology and creative solutions.
              </p>
              <p className="mb-4">
                Our team of experts combines technical expertise with creative vision to deliver exceptional results
                that drive business growth and success.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="flex items-center space-x-3">
                  <FaUsers className="text-conison-magenta text-2xl" />
                  <div>
                    <h3 className="font-semibold">Expert Team</h3>
                    <p className="text-sm">Skilled professionals</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaLightbulb className="text-conison-magenta text-2xl" />
                  <div>
                    <h3 className="font-semibold">Innovation</h3>
                    <p className="text-sm">Creative solutions</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaHandshake className="text-conison-magenta text-2xl" />
                  <div>
                    <h3 className="font-semibold">Partnership</h3>
                    <p className="text-sm">Collaborative approach</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaGlobe className="text-conison-magenta text-2xl" />
                  <div>
                    <h3 className="font-semibold">Global Reach</h3>
                    <p className="text-sm">Worldwide services</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={`rounded-lg overflow-hidden shadow-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} h-[500px]`}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8130733176874!2d36.8211593147539!3d-1.292359599054309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d5b5f5c5f5%3A0x5f5f5f5f5f5f5f5f!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2ske!4v1620000000000!5m2!1sen!2ske"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Meet the talented professionals who make our success possible.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div 
                key={member.id} 
                className={`rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${member.name.replace(' ', '+')}&background=random&color=fff&size=256`;
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl">{member.name}</h3>
                  <p className="text-conison-magenta font-medium mb-2">{member.role}</p>
                  <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {member.bio}
                  </p>
                  <div className="flex space-x-3">
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" 
                      className="text-gray-500 hover:text-conison-magenta transition-colors">
                      <FaLinkedin size={20} />
                    </a>
                    <a href={member.twitter} target="_blank" rel="noopener noreferrer"
                      className="text-gray-500 hover:text-conison-magenta transition-colors">
                      <FaTwitter size={20} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              We'd love to hear from you. Contact us for any inquiries or to discuss your project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className={`p-8 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <FaPhone className="text-conison-magenta mt-1" />
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <a href="tel:+254796881472" className="hover:text-conison-magenta transition-colors">
                      +254 796 881 472
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <FaEnvelope className="text-conison-magenta mt-1" />
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <a href="mailto:info@conison.com" className="hover:text-conison-magenta transition-colors">
                      info@conison.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <FaMapMarkerAlt className="text-conison-magenta mt-1" />
                  <div>
                    <h4 className="font-semibold">Location</h4>
                    <p>Nairobi, Kenya</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <FaClock className="text-conison-magenta mt-1" />
                  <div>
                    <h4 className="font-semibold">Working Hours</h4>
                    <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className={`p-8 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <h3 className="text-2xl font-semibold mb-6">Send us a Message</h3>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                    }`}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                    }`}
                    placeholder="Your email"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                    }`}
                    placeholder="Subject"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    rows="4"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                    }`}
                    placeholder="Your message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-conison-magenta text-white py-3 px-6 rounded-lg hover:bg-conison-magenta-dark transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutContactPage; 