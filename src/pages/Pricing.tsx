
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import PricingCard from "@/components/ui/PricingCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const pricingPackages = [
  {
    title: "Logo Design",
    price: "$50",
    description: "Professional logo design to establish your brand identity",
    features: [
      { text: "2 Concept Designs", included: true },
      { text: "3 Revisions", included: true },
      { text: "Final Files (PNG, JPG, SVG)", included: true },
      { text: "Brand Guidelines", included: false },
      { text: "Social Media Kit", included: false },
      { text: "Stationery Design", included: false },
    ],
    ctaLink: "/contact",
    ctaText: "Get Started",
    featured: false,
  },
  {
    title: "Essential Branding Package",
    price: "$125",
    description: "Complete brand identity package for startups and small businesses",
    features: [
      { text: "Logo Design (3 Concepts)", included: true },
      { text: "5 Revisions", included: true },
      { text: "Brand Guidelines", included: true },
      { text: "Business Card Design", included: true },
      { text: "Social Media Kit", included: true },
      { text: "Stationery Design", included: false },
    ],
    ctaLink: "/contact",
    ctaText: "Get Started",
    featured: true,
  },
  {
    title: "Full Branding Package",
    price: "$300",
    description: "Comprehensive branding solution for established businesses",
    features: [
      { text: "Logo Design (5 Concepts)", included: true },
      { text: "Unlimited Revisions", included: true },
      { text: "Brand Guidelines", included: true },
      { text: "Business Card & Stationery", included: true },
      { text: "Social Media Kit", included: true },
      { text: "Website Landing Page", included: true },
    ],
    ctaLink: "/contact",
    ctaText: "Get Started",
    featured: false,
  },
  {
    title: "Complete Branding & Profile Package",
    price: "$450",
    description: "Everything you need for a professional brand presence",
    features: [
      { text: "Everything in Full Branding", included: true },
      { text: "Company Profile Design", included: true },
      { text: "Brochure Design", included: true },
      { text: "Presentation Template", included: true },
      { text: "Email Signature", included: true },
      { text: "1 Month Social Media Management", included: true },
    ],
    ctaLink: "/contact",
    ctaText: "Get Started",
    featured: false,
  },
];

const additionalServices = [
  {
    category: "Web Development",
    items: [
      { service: "Basic Website (5 pages)", price: "$350" },
      { service: "E-commerce Website", price: "$800" },
      { service: "Custom Web Application", price: "From $1,500" },
      { service: "Website Maintenance", price: "$100/month" },
    ]
  },
  {
    category: "Digital Marketing",
    items: [
      { service: "Social Media Management", price: "$250/month" },
      { service: "SEO Package", price: "$300/month" },
      { service: "PPC Campaign Management", price: "$400/month" },
      { service: "Email Marketing Campaign", price: "$150/month" },
    ]
  },
  {
    category: "Video Production",
    items: [
      { service: "Corporate Video", price: "From $500" },
      { service: "Product Commercial", price: "From $300" },
      { service: "Event Coverage", price: "From $250" },
      { service: "Animation & Motion Graphics", price: "From $400" },
    ]
  },
];

const Pricing = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-conison-950 text-white py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">2025 Rate Card</h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Transparent pricing for our comprehensive range of digital services.
            </p>
          </div>
        </div>
      </section>

      {/* Branding Packages */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Branding Packages" 
            subtitle="Choose the perfect branding package to establish your company's visual identity"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPackages.map((pkg, index) => (
              <PricingCard
                key={index}
                title={pkg.title}
                price={pkg.price}
                description={pkg.description}
                features={pkg.features}
                ctaLink={pkg.ctaLink}
                ctaText={pkg.ctaText}
                featured={pkg.featured}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Additional Services" 
            subtitle="Explore our other services with competitive pricing"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalServices.map((category, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{category.category}</h3>
                <ul className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-700">{item.service}</span>
                      <span className="font-semibold text-gray-900">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Quote */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-lg p-8 lg:p-12 max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Need a Custom Solution?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              We understand that every business has unique needs. Contact us for a personalized quote tailored to your specific requirements.
            </p>
            <Button asChild className="bg-conison-600 hover:bg-conison-700">
              <Link to="/contact">Request Custom Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Frequently Asked Questions" 
            subtitle="Find answers to common questions about our pricing and services"
          />
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you offer discounts for startups?</h3>
              <p className="text-gray-600">Yes, we offer special startup packages and discounts to support new businesses. Contact us to learn more about our startup-friendly pricing options.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept bank transfers, mobile money, and major credit cards. For larger projects, we can arrange flexible payment schedules.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does each service take to complete?</h3>
              <p className="text-gray-600">Delivery times vary by service: logo design (3-5 days), branding packages (1-2 weeks), websites (2-4 weeks), and custom development projects (4-8 weeks).</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you offer ongoing support after project completion?</h3>
              <p className="text-gray-600">Yes, we provide ongoing support and maintenance services for all our projects. We offer various support packages to suit your needs and budget.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-conison-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Contact us today for a free consultation and take the first step towards achieving your digital goals.
            </p>
            <div className="flex justify-center">
              <Button asChild size="lg" className="bg-white text-conison-600 hover:bg-gray-100">
                <Link to="/contact">Get a Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
