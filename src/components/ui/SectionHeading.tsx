
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

const SectionHeading = ({ 
  title, 
  subtitle, 
  centered = true,
  className 
}: SectionHeadingProps) => {
  return (
    <div className={cn(
      "mb-12", 
      centered && "text-center",
      className
    )}>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
      {subtitle && (
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
      )}
      <div className={cn(
        "h-1 w-24 bg-conison-600 mt-4", 
        centered && "mx-auto"
      )} />
    </div>
  );
};

export default SectionHeading;
