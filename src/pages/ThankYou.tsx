import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

const ThankYou = () => {
  const navigate = useNavigate();
  const { items } = useCart();
  
  // Redirect to home if accessed directly without checkout
  useEffect(() => {
    if (items.length > 0) {
      navigate("/");
    }
  }, [items, navigate]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-3xl text-center">
        <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-20 w-20 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Your order has been received and is now being processed. You will receive an email confirmation shortly.
          </p>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-left">
                <p className="text-gray-600 dark:text-gray-400">Order Number:</p>
                <p className="font-medium">#CON-{Math.floor(100000 + Math.random() * 900000)}</p>
              </div>
              <div className="text-left">
                <p className="text-gray-600 dark:text-gray-400">Date:</p>
                <p className="font-medium">{new Date().toLocaleDateString()}</p>
              </div>
              <div className="text-left">
                <p className="text-gray-600 dark:text-gray-400">Payment Method:</p>
                <p className="font-medium">Credit Card</p>
              </div>
              <div className="text-left">
                <p className="text-gray-600 dark:text-gray-400">Shipping Method:</p>
                <p className="font-medium">Standard Delivery</p>
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            If you have any questions about your order, please contact our customer service team at <a href="mailto:support@conison.com" className="text-conison-600 dark:text-conison-400 hover:underline">support@conison.com</a>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link to="/" className="flex items-center">
                Continue Shopping
              </Link>
            </Button>
            <Button asChild className="bg-conison-600 hover:bg-conison-700">
              <Link to="/services" className="flex items-center">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Browse Services
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ThankYou; 