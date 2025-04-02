
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const businessChallenges = [
  {
    id: "visibility",
    title: "Struggling with online visibility?",
    description: "Our digital marketing strategies help East African businesses get discovered by the right audience.",
    cta: "Boost Your Visibility",
    link: "/services/digital-marketing"
  },
  {
    id: "website",
    title: "Need a website that converts?",
    description: "We build responsive, user-friendly websites optimized for African markets and connectivity.",
    cta: "Get a Professional Website",
    link: "/services/web-app-development"
  },
  {
    id: "brand",
    title: "Want to stand out from competitors?",
    description: "Our branding solutions help you build a distinct, memorable identity in your market.",
    cta: "Elevate Your Brand",
    link: "/services/branding"
  },
  {
    id: "tech",
    title: "Facing technology challenges?",
    description: "Our IT solutions are tailored to the unique needs of businesses in South Sudan and East Africa.",
    cta: "Solve Tech Challenges",
    link: "/services/it-tech-solutions"
  }
];

const HeroSection = () => {
  const [activeChallengeIndex, setActiveChallengeIndex] = useState(0);
  const activeChallenge = businessChallenges[activeChallengeIndex];

  // Auto-rotate challenges every 5 seconds
  setTimeout(() => {
    setActiveChallengeIndex((prev) => (prev + 1) % businessChallenges.length);
  }, 5000);

  return (
    <section className="relative bg-gradient-to-r from-gray-900 to-conison-950 text-white py-24 md:py-32">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            We Design It. <span className="text-conison-400">Dream It.</span>
          </h1>
          
          <div className="min-h-[120px]">
            <div className="animate-fade-in">
              <h2 className="text-2xl md:text-3xl font-semibold mb-2">{activeChallenge.title}</h2>
              <p className="text-lg text-gray-300 mb-6">{activeChallenge.description}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 mb-8">
            {businessChallenges.map((challenge, index) => (
              <button
                key={challenge.id}
                className={`w-3 h-3 rounded-full transition-all ${index === activeChallengeIndex ? 'bg-conison-500 w-6' : 'bg-gray-400 bg-opacity-50'}`}
                onClick={() => setActiveChallengeIndex(index)}
                aria-label={`View ${challenge.title}`}
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-4 animate-fade-in">
            <Button asChild size="lg" className="bg-conison-600 hover:bg-conison-700">
              <Link to={activeChallenge.link}>{activeChallenge.cta}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              <Link to="/contact">Get a Free Consultation</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
