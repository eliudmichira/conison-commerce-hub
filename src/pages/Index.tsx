
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import StatsSection from "@/components/home/StatsSection";
import CtaSection from "@/components/home/CtaSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <TestimonialsSection />
      <StatsSection />
      <CtaSection />
    </Layout>
  );
};

export default Index;
