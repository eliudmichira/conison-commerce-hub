
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Video, Film, Clapperboard, Camera } from "lucide-react";

const videoServices = [
  {
    title: "Corporate Videos & Commercial Ads",
    description: "Professional video content to showcase your brand and products with high-quality production value.",
    icon: <Video className="h-10 w-10" />,
    link: "/contact?service=corporate-videos"
  },
  {
    title: "Motion Graphics & Animation",
    description: "Engaging animated content to explain complex ideas simply and captivate your audience.",
    icon: <Film className="h-10 w-10" />,
    link: "/contact?service=motion-graphics"
  },
  {
    title: "Photography & Videography",
    description: "High-quality visual content for marketing and branding purposes, from product shots to team photography.",
    icon: <Camera className="h-10 w-10" />,
    link: "/contact?service=photography"
  },
  {
    title: "Event Coverage",
    description: "Comprehensive documentation of your corporate and social events with professional equipment and editing.",
    icon: <Clapperboard className="h-10 w-10" />,
    link: "/contact?service=event-coverage"
  }
];

const VideoProduction = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-conison-950 text-white py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-30"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Video Production & Creative Content</h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Captivate your audience with high-quality video content that tells your brand story and delivers results.
            </p>
            <Button asChild size="lg" className="bg-conison-600 hover:bg-conison-700">
              <Link to="/contact?service=video-production">Get a Free Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Our Video Production Services" 
            subtitle="Professional video content creation to help your business stand out in the digital landscape"
            centered={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {videoServices.map((service, index) => (
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

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Our Production Process" 
            subtitle="A streamlined approach to delivering exceptional video content"
            centered={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-conison-100 text-conison-600 flex items-center justify-center mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Discovery & Planning</h3>
              <p className="text-gray-600">
                We begin with understanding your goals, target audience, and message. Then we develop a comprehensive production plan including script, storyboard, and timeline.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-conison-100 text-conison-600 flex items-center justify-center mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Production & Filming</h3>
              <p className="text-gray-600">
                Our professional crew handles all aspects of filming with state-of-the-art equipment. We manage lighting, sound, direction, and all technical aspects for optimal quality.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-conison-100 text-conison-600 flex items-center justify-center mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Post-Production & Delivery</h3>
              <p className="text-gray-600">
                We edit, color-grade, and add sound design to create a polished final product. After your review and approval, we deliver in multiple formats optimized for your platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Featured Projects" 
            subtitle="Examples of our video production work for clients across various industries"
            centered={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {/* Project 1 */}
            <div className="overflow-hidden rounded-lg shadow-sm border border-gray-100">
              <div className="aspect-video bg-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-400">Video Thumbnail</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">Corporate Brand Video</h3>
                <p className="text-gray-600 mb-4">A comprehensive brand video for a financial services company highlighting their values and services.</p>
                <Button variant="outline" className="w-full">View Project</Button>
              </div>
            </div>
            
            {/* Project 2 */}
            <div className="overflow-hidden rounded-lg shadow-sm border border-gray-100">
              <div className="aspect-video bg-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-400">Video Thumbnail</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">Product Animation</h3>
                <p className="text-gray-600 mb-4">An explainer animation for a tech startup showcasing their innovative mobile application.</p>
                <Button variant="outline" className="w-full">View Project</Button>
              </div>
            </div>
            
            {/* Project 3 */}
            <div className="overflow-hidden rounded-lg shadow-sm border border-gray-100">
              <div className="aspect-video bg-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-400">Video Thumbnail</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">Event Coverage</h3>
                <p className="text-gray-600 mb-4">Comprehensive documentation of a major corporate conference with interviews and highlights.</p>
                <Button variant="outline" className="w-full">View Project</Button>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button asChild className="bg-conison-600 hover:bg-conison-700">
              <Link to="/portfolio?category=video">View All Video Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Video Production Packages" 
            subtitle="Flexible options to suit your video production needs and budget"
            centered={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 flex flex-col">
              <h3 className="text-xl font-bold mb-3">Basic Video Package</h3>
              <div className="text-3xl font-bold mb-4">$499</div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start">
                  <span className="text-conison-600 mr-2">✓</span>
                  <span>Up to 2 hours of filming</span>
                </li>
                <li className="flex items-start">
                  <span className="text-conison-600 mr-2">✓</span>
                  <span>Professional editing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-conison-600 mr-2">✓</span>
                  <span>1-2 minute final video</span>
                </li>
                <li className="flex items-start">
                  <span className="text-conison-600 mr-2">✓</span>
                  <span>Basic color correction</span>
                </li>
                <li className="flex items-start">
                  <span className="text-conison-600 mr-2">✓</span>
                  <span>1 round of revisions</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full">Select Package</Button>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md border-2 border-conison-500 flex flex-col relative">
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <div className="bg-conison-500 text-white text-xs uppercase font-bold py-1 px-3 rounded-full">
                  Popular
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Standard Video Package</h3>
              <div className="text-3xl font-bold mb-4">$999</div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start">
                  <span className="text-conison-600 mr-2">✓</span>
                  <span>Up to 4 hours of filming</span>
                </li>
                <li className="flex items-start">
                  <span className="text-conison-600 mr-2">✓</span>
                  <span>Professional editing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-conison-600 mr-2">✓</span>
                  <span>2-3 minute final video</span>
                </li>
                <li className="flex items-start">
                  <span className="text-conison-600 mr-2">✓</span>
                  <span>Advanced color grading</span>
                </li>
                <li className="flex items-start">
                  <span className="text-conison-600 mr-2">✓</span>
                  <span>Custom motion graphics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-conison-600 mr-2">✓</span>
                  <span>2 rounds of revisions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-conison-600 mr-2">✓</span>
                  <span>Licensed background music</span>
                </li>
              </ul>
              <Button className="w-full bg-conison-600 hover:bg-conison-700">Select Package</Button>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 flex flex-col">
              <h3 className="text-xl font-bold mb-3">Premium Video Package</h3>
              <div className="text-3xl font-bold mb-4">$1,899</div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start">
                  <span className="text-conison-600 mr-2">✓</span>
                  <span>Full day filming (8 hours)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-conison-600 mr-2">✓</span>
                  <span>Professional editing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-conison-600 mr-2">✓</span>
                  <span>3-5 minute final video</span>
                </li>
                <li className="flex items-start">
                  <span className="text-conison-600 mr-2">✓</span>
                  <span>Advanced color grading</span>
                </li>
                <li className="flex items-start">
                  <span className="text-conison-600 mr-2">✓</span>
                  <span>Premium motion graphics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-conison-600 mr-2">✓</span>
                  <span>3 rounds of revisions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-conison-600 mr-2">✓</span>
                  <span>Licensed background music</span>
                </li>
                <li className="flex items-start">
                  <span className="text-conison-600 mr-2">✓</span>
                  <span>Script development assistance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-conison-600 mr-2">✓</span>
                  <span>Multiple format outputs</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full">Select Package</Button>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-lg text-gray-600 mb-6">Need a custom solution? We offer tailored video production packages to match your specific requirements.</p>
            <Button asChild size="lg" className="bg-conison-600 hover:bg-conison-700">
              <Link to="/contact?service=custom-video">Request Custom Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Frequently Asked Questions" 
            subtitle="Answers to common questions about our video production services"
            centered={true}
          />
          
          <div className="max-w-3xl mx-auto mt-12 space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">How long does it take to produce a video?</h3>
              <p className="text-gray-600">
                Timeline varies depending on the complexity of the project. A standard corporate video typically takes 2-4 weeks from initial concept to final delivery, including planning, filming, and post-production.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">What information do you need from me before starting?</h3>
              <p className="text-gray-600">
                We'll need to understand your objectives, target audience, key messages, preferred style, and any branding guidelines. We'll guide you through this process with our creative brief and planning sessions.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">Can you help with script writing?</h3>
              <p className="text-gray-600">
                Yes, our team includes experienced scriptwriters who can develop compelling narratives for your video based on your goals and key messages. This service is included in our premium packages.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">What file formats will I receive?</h3>
              <p className="text-gray-600">
                We deliver videos in high-resolution formats suitable for your needs, typically including MP4 and other formats optimized for web, social media, and broadcast use as required.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">Do you provide raw footage?</h3>
              <p className="text-gray-600">
                Raw footage is available at an additional cost. Most clients find that our edited final versions meet their needs, but we understand some projects require access to the original files.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-conison-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Create Your Next Video Project?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Contact us today for a free consultation and take the first step towards engaging your audience with professional video content.
            </p>
            <div className="flex justify-center">
              <Button asChild size="lg" className="bg-white hover:bg-gray-100 text-conison-600">
                <Link to="/contact?service=video-production">Get a Free Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default VideoProduction;
