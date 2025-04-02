import { Pricing } from "@/components/blocks/pricing";

export function PricingDemo() {
  const plans = [
    {
      name: "Logo Design",
      price: "50",
      yearlyPrice: "40",
      period: "project",
      features: [
        "2 Concept Designs",
        "3 Revisions",
        "Final Files (PNG, JPG, SVG)",
        "Quick Turnaround",
        "Commercial Usage Rights"
      ],
      description: "Professional logo design to establish your brand identity",
      buttonText: "Get Started",
      href: "/contact",
      isPopular: false
    },
    {
      name: "Essential Branding",
      price: "125",
      yearlyPrice: "100",
      period: "package",
      features: [
        "Logo Design (3 Concepts)",
        "5 Revisions",
        "Brand Guidelines",
        "Business Card Design",
        "Social Media Kit",
        "Priority Support"
      ],
      description: "Complete brand identity package for startups and small businesses",
      buttonText: "Get Started",
      href: "/contact",
      isPopular: true
    },
    {
      name: "Full Branding",
      price: "300",
      yearlyPrice: "240",
      period: "package",
      features: [
        "Logo Design (5 Concepts)",
        "Unlimited Revisions",
        "Brand Guidelines",
        "Business Card & Stationery",
        "Social Media Kit",
        "Website Landing Page"
      ],
      description: "Comprehensive branding solution for established businesses",
      buttonText: "Contact Sales",
      href: "/contact",
      isPopular: false
    }
  ];

  return (
    <Pricing 
      plans={plans} 
      title="Branding & Design Packages"
      description="Professional branding solutions to establish your company's visual identity.\nAll packages include commercial usage rights and dedicated support."
    />
  );
} 