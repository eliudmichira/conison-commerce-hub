
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  className?: string;
}

const ServiceCard = ({ title, description, icon, link, className }: ServiceCardProps) => {
  return (
    <div className={cn(
      "bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100",
      className
    )}>
      <div className="mb-4 text-conison-600">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 mb-5">{description}</p>
      <Button asChild variant="outline" className="text-conison-600 border-conison-600 hover:bg-conison-50">
        <Link to={link}>Learn More</Link>
      </Button>
    </div>
  );
};

export default ServiceCard;
