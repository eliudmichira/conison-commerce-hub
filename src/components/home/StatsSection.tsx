
import { useEffect, useState, useRef } from "react";
import { Users, Award, BarChart, Clock } from "lucide-react";

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  duration?: number;
  suffix?: string;
}

const StatItem = ({ icon, value, label, duration = 2000, suffix = "" }: StatItemProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const increment = Math.ceil(value / (duration / 16));
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => {
      clearInterval(timer);
    };
  }, [isVisible, value, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="inline-flex items-center justify-center p-3 bg-conison-100 text-conison-600 rounded-full mb-4">
        {icon}
      </div>
      <div className="text-4xl font-bold text-gray-900 mb-2">
        {count}{suffix}
      </div>
      <p className="text-gray-600">{label}</p>
    </div>
  );
};

const StatsSection = () => {
  const stats = [
    {
      icon: <Users className="h-8 w-8" />,
      value: 250,
      label: "Satisfied Clients",
      suffix: "+",
    },
    {
      icon: <Award className="h-8 w-8" />,
      value: 520,
      label: "Projects Completed",
      suffix: "+",
    },
    {
      icon: <BarChart className="h-8 w-8" />,
      value: 98,
      label: "Success Rate",
      suffix: "%",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      value: 5,
      label: "Years Experience",
      suffix: "+",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
