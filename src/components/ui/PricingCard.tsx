
import { Button } from "./button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: PricingFeature[];
  ctaLink: string;
  ctaText: string;
  featured?: boolean;
  className?: string;
}

const PricingCard = ({
  title,
  price,
  description,
  features,
  ctaLink,
  ctaText,
  featured = false,
  className,
}: PricingCardProps) => {
  return (
    <div
      className={cn(
        "flex flex-col h-full rounded-lg border bg-white p-6 shadow-sm transition-all duration-200",
        featured ? "border-conison-500 shadow-md transform hover:-translate-y-1" : "border-gray-200 hover:shadow",
        className
      )}
    >
      {featured && (
        <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
          <div className="bg-conison-500 text-white text-xs uppercase font-bold py-1 px-3 rounded-full">
            Popular
          </div>
        </div>
      )}

      <div className="mb-5">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <div className="mt-3 mb-4">
          <span className="text-3xl font-bold text-gray-900">{price}</span>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>

      <ul className="mb-6 space-y-3 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <div className={`flex-shrink-0 mr-2 mt-1 ${feature.included ? "text-conison-500" : "text-gray-400"}`}>
              <Check size={16} />
            </div>
            <span className={feature.included ? "text-gray-700" : "text-gray-500"}>{feature.text}</span>
          </li>
        ))}
      </ul>

      <Button
        asChild
        className={cn(
          "mt-auto",
          featured ? "bg-conison-600 hover:bg-conison-700" : "bg-white text-conison-600 border-conison-600 hover:bg-conison-50"
        )}
        variant={featured ? "default" : "outline"}
      >
        <Link to={ctaLink}>{ctaText}</Link>
      </Button>
    </div>
  );
};

export default PricingCard;
