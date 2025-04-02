
import { LayoutGrid, Search, Globe, Code, Video, Shield, Brush, BarChart3 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";

const services = [
  {
    title: "Digital Marketing",
    description: "Grow your online presence with SEO, PPC, Social Media, and Email marketing strategies.",
    icon: <Globe className="h-10 w-10" />,
    link: "/services/digital-marketing",
  },
  {
    title: "Web & App Development",
    description: "Custom websites, e-commerce platforms, and mobile apps tailored to your business needs.",
    icon: <Code className="h-10 w-10" />,
    link: "/services/web-app-development",
  },
  {
    title: "Video Production",
    description: "Stunning corporate videos, commercials, motion graphics, photography and event coverage.",
    icon: <Video className="h-10 w-10" />,
    link: "/services/video-production",
  },
  {
    title: "IT & Tech Solutions",
    description: "POS systems, custom software, cloud solutions, CRM/ERP, and cybersecurity services.",
    icon: <Shield className="h-10 w-10" />,
    link: "/services/it-tech-solutions",
  },
  {
    title: "Branding & Identity",
    description: "Logo design, brand identity, company profiles, product packaging, and branded merchandise.",
    icon: <Brush className="h-10 w-10" />,
    link: "/services/branding",
  },
  {
    title: "Business Consultancy",
    description: "Strategic brand development, marketing campaigns, digital transformation, and workshops.",
    icon: <BarChart3 className="h-10 w-10" />,
    link: "/services/business-consultancy",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Services"
          subtitle="Comprehensive digital solutions to help your business grow and succeed in the digital landscape."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              link={service.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
