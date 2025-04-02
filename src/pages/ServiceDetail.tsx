
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Package } from "@/types";
import { pricingPackages } from "@/data/packages";

const ServiceDetail = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { addItem } = useCart();
  
  // In a real application, fetch the service details based on the serviceId
  // This is a placeholder implementation
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">{serviceId?.replace(/-/g, ' ')}</h1>
          
          <div className="bg-white shadow-md rounded-lg p-6 mb-10">
            <h2 className="text-2xl font-semibold mb-4">Service Overview</h2>
            <p className="text-gray-700 mb-6">
              This is a detailed description of the service. It should explain what the service is,
              why it's important, and how it can benefit the client's business.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">Features & Benefits</h3>
            <ul className="list-disc pl-5 mb-6 space-y-2">
              <li>Feature 1 with its benefits explained</li>
              <li>Feature 2 with its benefits explained</li>
              <li>Feature 3 with its benefits explained</li>
              <li>Feature 4 with its benefits explained</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-3">Our Process</h3>
            <ol className="list-decimal pl-5 mb-6 space-y-2">
              <li>Step 1: Initial consultation</li>
              <li>Step 2: Research and planning</li>
              <li>Step 3: Implementation</li>
              <li>Step 4: Review and approval</li>
              <li>Step 5: Delivery and support</li>
            </ol>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Pricing Options</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pricingPackages.slice(0, 3).map((pkg: Package) => (
                <div 
                  key={pkg.id} 
                  className={`border rounded-lg p-6 ${pkg.featured ? 'border-conison-500 bg-conison-50' : 'border-gray-200'}`}
                >
                  <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
                  <p className="text-3xl font-bold mb-4">${pkg.price}</p>
                  <p className="text-gray-600 mb-4">{pkg.description}</p>
                  
                  <h4 className="font-semibold mb-2">Includes:</h4>
                  <ul className="space-y-1 mb-6">
                    {pkg.deliverables.slice(0, 4).map((item, index) => (
                      <li key={index} className="text-sm">{item}</li>
                    ))}
                  </ul>
                  
                  <Button 
                    className="w-full" 
                    onClick={() => addItem(pkg.id)}
                  >
                    Add to Cart
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button asChild variant="outline">
                <a href="/pricing">View All Pricing Options</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServiceDetail;
