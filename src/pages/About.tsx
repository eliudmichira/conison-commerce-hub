
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, Users, Target, Zap, Award } from "lucide-react";

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-conison-950 text-white py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Conison Technologies</h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Building digital success stories in South Sudan and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading 
                title="Our Story" 
                centered={false}
                className="mb-6"
              />
              <p className="text-gray-600 mb-6">
                Conison Technologies was founded with a vision to bridge the digital divide in South Sudan and empower local businesses with world-class digital solutions. What started as a small web design studio has grown into a comprehensive digital services agency serving clients across various industries.
              </p>
              <p className="text-gray-600 mb-6">
                Our journey began when our founder recognized the need for professional digital services in the growing South Sudanese market. With determination and a commitment to excellence, we've built a team of skilled professionals dedicated to helping businesses thrive in the digital landscape.
              </p>
              <p className="text-gray-600">
                Today, we pride ourselves on delivering innovative solutions that combine global best practices with local market understanding, creating meaningful digital experiences that drive business growth.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                  alt="Conison Technologies office" 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-conison-600 text-white py-4 px-6 rounded-lg shadow-lg">
                <p className="font-bold">Founded in 2020</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Our Mission & Vision" 
            subtitle="Driving digital transformation across South Sudan and beyond"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="bg-conison-100 p-3 rounded-full mr-4">
                  <Target className="h-8 w-8 text-conison-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-600">
                To empower businesses in South Sudan with innovative digital solutions that drive growth, enhance customer experiences, and foster sustainable success in an increasingly digital world.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="bg-conison-100 p-3 rounded-full mr-4">
                  <Zap className="h-8 w-8 text-conison-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-600">
                To be the leading digital services provider in South Sudan, known for excellence, innovation, and meaningful impact on the digital landscape of the region and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Our Core Values" 
            subtitle="The principles that guide everything we do"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <div className="p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-conison-600 mb-4">
                <Check className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in everything we do, delivering solutions that exceed expectations and stand the test of time.
              </p>
            </div>
            
            <div className="p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-conison-600 mb-4">
                <Check className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                We embrace creativity and forward-thinking approaches to solve complex problems and create meaningful digital experiences.
              </p>
            </div>
            
            <div className="p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-conison-600 mb-4">
                <Check className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Integrity</h3>
              <p className="text-gray-600">
                We conduct our business with honesty, transparency, and ethical standards that build trust and lasting relationships.
              </p>
            </div>
            
            <div className="p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-conison-600 mb-4">
                <Check className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Impact</h3>
              <p className="text-gray-600">
                We measure our success by the positive impact we create for our clients, their customers, and the broader community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Meet Our Team" 
            subtitle="The talented people behind Conison Technologies"
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {/* Team members would go here - using placeholders for now */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="aspect-w-3 aspect-h-4">
                <img 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="Team Member" 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">John Deng</h3>
                <p className="text-conison-600 font-medium mb-3">Founder & CEO</p>
                <p className="text-gray-600 text-sm">
                  Digital entrepreneur with over 10 years of experience in technology and business development.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="aspect-w-3 aspect-h-4">
                <img 
                  src="https://randomuser.me/api/portraits/women/44.jpg" 
                  alt="Team Member" 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Sara Ayen</h3>
                <p className="text-conison-600 font-medium mb-3">Creative Director</p>
                <p className="text-gray-600 text-sm">
                  Award-winning designer with expertise in branding and user experience design.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="aspect-w-3 aspect-h-4">
                <img 
                  src="https://randomuser.me/api/portraits/men/22.jpg" 
                  alt="Team Member" 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">David Majok</h3>
                <p className="text-conison-600 font-medium mb-3">Development Lead</p>
                <p className="text-gray-600 text-sm">
                  Technical expert specializing in web and mobile application development.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="aspect-w-3 aspect-h-4">
                <img 
                  src="https://randomuser.me/api/portraits/women/29.jpg" 
                  alt="Team Member" 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Lily Acuil</h3>
                <p className="text-conison-600 font-medium mb-3">Marketing Strategist</p>
                <p className="text-gray-600 text-sm">
                  Digital marketing expert with a passion for data-driven campaign strategies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Clients/Partners */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Our Clients & Partners" 
            subtitle="Trusted by leading organizations across South Sudan"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center mt-12">
            {/* Client logos would go here - using placeholders */}
            <div className="grayscale hover:grayscale-0 transition-all duration-300">
              <img src="https://via.placeholder.com/150x80?text=Client+Logo" alt="Client" className="h-16" />
            </div>
            <div className="grayscale hover:grayscale-0 transition-all duration-300">
              <img src="https://via.placeholder.com/150x80?text=Client+Logo" alt="Client" className="h-16" />
            </div>
            <div className="grayscale hover:grayscale-0 transition-all duration-300">
              <img src="https://via.placeholder.com/150x80?text=Client+Logo" alt="Client" className="h-16" />
            </div>
            <div className="grayscale hover:grayscale-0 transition-all duration-300">
              <img src="https://via.placeholder.com/150x80?text=Client+Logo" alt="Client" className="h-16" />
            </div>
            <div className="grayscale hover:grayscale-0 transition-all duration-300">
              <img src="https://via.placeholder.com/150x80?text=Client+Logo" alt="Client" className="h-16" />
            </div>
            <div className="grayscale hover:grayscale-0 transition-all duration-300">
              <img src="https://via.placeholder.com/150x80?text=Client+Logo" alt="Client" className="h-16" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-conison-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Join Our Growing List of Satisfied Clients
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Ready to transform your digital presence? Let's start a conversation about how we can help your business grow.
            </p>
            <div className="flex justify-center">
              <Button asChild size="lg" className="bg-white text-conison-600 hover:bg-gray-100">
                <Link to="/contact">Contact Us Today</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
