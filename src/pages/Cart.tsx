
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { pricingPackages } from "@/data/packages";
import { Package } from "@/types";
import { Trash2 } from "lucide-react";

const Cart = () => {
  const { cart, updateQuantity, removeItem, clearCart } = useCart();

  // Find package details for each cart item
  const cartItemsWithDetails = cart.items.map(item => {
    const packageDetails = pricingPackages.find(pkg => pkg.id === item.packageId);
    return {
      ...item,
      package: packageDetails || {
        id: item.packageId,
        title: "Unknown Package",
        price: 0,
        description: "",
        deliverables: [],
        timeframe: "",
        fileFormats: []
      }
    };
  });

  const calculateTotal = () => {
    return cartItemsWithDetails.reduce((total, item) => {
      return total + (item.package.price * item.quantity);
    }, 0);
  };

  const total = calculateTotal();

  if (cart.items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
            <div className="bg-white shadow-md rounded-lg p-10">
              <p className="text-xl mb-6">Your cart is empty</p>
              <Button asChild>
                <Link to="/services">Browse Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
          
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
            <div className="p-6">
              <div className="flex justify-between items-center pb-4 border-b">
                <h2 className="text-lg font-semibold">Item</h2>
                <div className="flex items-center space-x-16">
                  <span className="text-lg font-semibold">Quantity</span>
                  <span className="text-lg font-semibold">Price</span>
                  <span className="w-6"></span>
                </div>
              </div>
              
              {cartItemsWithDetails.map(item => (
                <div key={item.packageId} className="py-4 border-b last:border-0">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <h3 className="font-medium">{item.package.title}</h3>
                      <p className="text-sm text-gray-600">{item.package.description}</p>
                    </div>
                    
                    <div className="flex items-center space-x-10">
                      <div className="flex items-center">
                        <select
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.packageId, parseInt(e.target.value))}
                          className="border rounded p-1"
                        >
                          {[1, 2, 3, 4, 5].map(num => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="w-20 text-right">
                        ${(item.package.price * item.quantity).toFixed(2)}
                      </div>
                      
                      <button 
                        onClick={() => removeItem(item.packageId)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-50 p-6">
              <div className="flex justify-between items-center">
                <Button 
                  variant="outline" 
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
                
                <div className="text-right">
                  <div className="text-lg font-medium">Total: ${total.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button asChild variant="outline">
              <Link to="/services">Continue Shopping</Link>
            </Button>
            
            <Button asChild>
              <Link to="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
