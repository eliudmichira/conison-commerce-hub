import { PricingSection } from "@/components/blocks/pricing-section"

export const PAYMENT_FREQUENCIES = ["monthly", "yearly"]

export const TIERS = [
  {
    id: "logo-design",
    name: "Logo Design",
    price: {
      monthly: 50,
      yearly: 40,
    },
    description: "Professional logo design to establish your brand identity",
    features: [
      "2 Concept Designs",
      "3 Revisions",
      "Final Files (PNG, JPG, SVG)",
      "Quick Turnaround",
      "Commercial Usage Rights"
    ],
    cta: "Get Started",
  },
  {
    id: "essential-branding",
    name: "Essential Branding",
    price: {
      monthly: 125,
      yearly: 100,
    },
    description: "Complete brand identity package for startups and small businesses",
    features: [
      "Logo Design (3 Concepts)",
      "5 Revisions",
      "Brand Guidelines",
      "Business Card Design",
      "Social Media Kit",
      "Priority Support"
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    id: "full-branding",
    name: "Full Branding",
    price: {
      monthly: 300,
      yearly: 240,
    },
    description: "Comprehensive branding solution for established businesses",
    features: [
      "Logo Design (5 Concepts)",
      "Unlimited Revisions",
      "Brand Guidelines",
      "Business Card & Stationery",
      "Social Media Kit",
      "Website Landing Page"
    ],
    cta: "Contact Sales",
  },
  {
    id: "enterprise",
    name: "Complete Package",
    price: {
      monthly: 450,
      yearly: 360,
    },
    description: "Everything you need for a professional brand presence",
    features: [
      "Everything in Full Branding",
      "Company Profile Design",
      "Brochure Design",
      "Presentation Template",
      "Email Signature",
      "1 Month Social Media Management"
    ],
    cta: "Contact Us",
    highlighted: true,
  },
]

export function PricingSectionDemo() {
  return (
    <div className="relative flex justify-center items-center w-full mt-20">
      <div className="absolute inset-0 -z-10">
        <div className="h-full w-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:35px_35px] opacity-30 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>
      <PricingSection
        title="Branding & Design Packages"
        subtitle="Professional branding solutions to establish your company's visual identity"
        frequencies={PAYMENT_FREQUENCIES}
        tiers={TIERS}
      />
    </div>
  );
} 