
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  quote: string;
  author: string;
  position: string;
  image?: string;
  className?: string;
}

const TestimonialCard = ({ 
  quote, 
  author, 
  position, 
  image, 
  className 
}: TestimonialCardProps) => {
  return (
    <div className={cn(
      "bg-white p-8 rounded-lg shadow-md border border-gray-100",
      className
    )}>
      <div className="flex flex-col h-full">
        <div className="mb-6 text-conison-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
          </svg>
        </div>
        <p className="text-gray-700 mb-6 flex-grow">{quote}</p>
        <div className="flex items-center">
          {image && (
            <div className="mr-4">
              <img 
                src={image} 
                alt={author} 
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
          )}
          <div>
            <h4 className="font-semibold text-gray-900">{author}</h4>
            <p className="text-sm text-gray-600">{position}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
