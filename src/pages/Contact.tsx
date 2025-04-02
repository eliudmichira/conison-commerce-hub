
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, Mail, MapPin, Phone, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    service: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent!",
        description: "We've received your message and will get back to you soon.",
        duration: 5000,
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        service: "",
      });
    }, 1500);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-conison-950 text-white py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Have a question or ready to start your project? We're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info + Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <SectionHeading 
                title="Contact Information" 
                centered={false}
                className="mb-8"
              />
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-conison-100 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-conison-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Our Location</h3>
                    <p className="text-gray-600">Juba Town, near Baping Insurance, South Sudan</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-conison-100 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-conison-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Email Us</h3>
                    <p className="text-gray-600">
                      <a href="mailto:conisonstech@gmail.com" className="hover:text-conison-600 transition-colors">conisonstech@gmail.com</a>
                    </p>
                    <p className="text-gray-600">
                      <a href="mailto:arendeelisha97@gmail.com" className="hover:text-conison-600 transition-colors">arendeelisha97@gmail.com</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-conison-100 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-conison-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Call Us</h3>
                    <p className="text-gray-600">
                      <a href="tel:+211920504110" className="hover:text-conison-600 transition-colors">+211 920 504 110</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-conison-100 p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-conison-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Business Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Saturday: 10:00 AM - 2:00 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
              
              {/* Social Media */}
              <div className="mt-10">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-gray-100 hover:bg-conison-100 p-3 rounded-full text-gray-600 hover:text-conison-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-gray-100 hover:bg-conison-100 p-3 rounded-full text-gray-600 hover:text-conison-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-gray-100 hover:bg-conison-100 p-3 rounded-full text-gray-600 hover:text-conison-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-gray-100 hover:bg-conison-100 p-3 rounded-full text-gray-600 hover:text-conison-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </a>
                  <a href="https://wa.me/211920504110" target="_blank" rel="noopener noreferrer" className="bg-gray-100 hover:bg-conison-100 p-3 rounded-full text-gray-600 hover:text-conison-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <SectionHeading 
                title="Send Us a Message" 
                centered={false}
                className="mb-8"
              />
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name*
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address*
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+211 XX XXX XXXX"
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                    Service You're Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-conison-500 focus:outline-none focus:ring-conison-500"
                  >
                    <option value="">Select a service</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Web Development">Web Development</option>
                    <option value="App Development">App Development</option>
                    <option value="Branding">Branding & Design</option>
                    <option value="IT Solutions">IT Solutions</option>
                    <option value="Video Production">Video Production</option>
                    <option value="Business Consultancy">Business Consultancy</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject*
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message*
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project or inquiry..."
                    className="w-full min-h-[150px]"
                  />
                </div>
                
                <div>
                  <Button 
                    type="submit"
                    className="w-full bg-conison-600 hover:bg-conison-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : "Send Message"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Find Us" 
            subtitle="Visit our office in Juba Town, near Baping Insurance"
          />
          
          <div className="mt-8 rounded-lg overflow-hidden shadow-md h-[400px]">
            {/* Replace with actual Google Maps iframe */}
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <p className="text-gray-600">Google Maps or OpenStreetMap would be embedded here</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
