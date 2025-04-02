import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { pricingPackages } from "@/data/packages";
import { Package } from "@/types";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const { cart, updateQuantity, removeItem, clearCart } = useCart();
  const [removingItemId, setRemovingItemId] = useState(null);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

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

  const calculateSubtotal = () => {
    return cartItemsWithDetails.reduce((total, item) => {
      return total + (item.package.price * item.quantity);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.07; // Assuming 7% tax
  const total = subtotal + tax;

  // Handle quantity change with bounds checking
  const handleQuantityChange = (packageId, newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      updateQuantity(packageId, newQuantity);
    }
  };

  // Handle removing an item with confirmation
  const handleRemoveItem = (packageId) => {
    setRemovingItemId(packageId);
    setTimeout(() => {
      removeItem(packageId);
      setRemovingItemId(null);
    }, 300);
  };

  // Handle clearing cart with confirmation
  const handleClearCart = () => {
    setShowConfirmClear(false);
    clearCart();
  };

  // Recommended items based on cart (simplified example)
  const recommendedItems = pricingPackages
    .filter(pkg => !cart.items.some(item => item.packageId === pkg.id))
    .slice(0, 3);

  if (cart.items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-10">
              <div className="flex flex-col items-center mb-6">
                <ShoppingBag className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
                <p className="text-xl mb-2">Your cart is empty</p>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Looks like you haven't added any services to your cart yet.</p>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild variant="default" className="bg-conison-600 hover:bg-conison-700">
                  <Link to="/services">Browse Services</Link>
                </Button>
                {recommendedItems.length > 0 && (
                  <Button asChild variant="outline">
                    <Link to={`/services/${recommendedItems[0].id}`}>Popular Service</Link>
                  </Button>
                )}
              </div>
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
          <div className="flex items-center mb-6">
            <h1 className="text-3xl font-bold">Your Cart</h1>
            <span className="ml-4 bg-conison-100 dark:bg-conison-900 text-conison-800 dark:text-conison-200 px-3 py-1 rounded-full text-sm">
              {cart.items.length} {cart.items.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden mb-8">
            <div className="p-6">
              <div className="hidden sm:flex justify-between items-center pb-4 border-b dark:border-gray-700">
                <h2 className="text-lg font-semibold">Service</h2>
                <div className="flex items-center space-x-16">
                  <span className="text-lg font-semibold">Quantity</span>
                  <span className="text-lg font-semibold">Price</span>
                  <span className="w-6"></span>
                </div>
              </div>
              
              <AnimatePresence>
                {cartItemsWithDetails.map(item => (
                  <motion.div 
                    key={item.packageId}
                    initial={{ opacity: 1, height: "auto" }}
                    animate={{ 
                      opacity: removingItemId === item.packageId ? 0 : 1,
                      height: removingItemId === item.packageId ? 0 : "auto" 
                    }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="py-4 border-b last:border-b-0 dark:border-gray-700"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-medium text-lg">{item.package.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.package.description}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Delivery: {item.package.timeframe}</p>
                      </div>
                      
                      <div className="flex flex-row sm:flex-col md:flex-row items-center justify-between sm:space-x-6 md:space-x-10">
                        <div className="flex items-center">
                          <span className="block sm:hidden text-sm font-medium mr-3">Qty:</span>
                          <div className="flex items-center border rounded-md overflow-hidden dark:border-gray-600">
                            <button
                              onClick={() => handleQuantityChange(item.packageId, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-3 py-1 text-center w-10">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.packageId, item.quantity + 1)}
                              disabled={item.quantity >= 10}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"
                              aria-label="Increase quantity"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                        
                        <div className="text-right sm:w-20 font-medium">
                          <span className="block sm:hidden text-sm font-medium">Price:</span>
                          ${(item.package.price * item.quantity).toFixed(2)}
                        </div>
                        
                        <button 
                          onClick={() => handleRemoveItem(item.packageId)}
                          className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          aria-label={`Remove ${item.package.title} from cart`}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800/80 p-6 border-t dark:border-gray-700">
              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                <div className="relative">
                  {showConfirmClear ? (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Are you sure?</span>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={handleClearCart}
                      >
                        Yes, Clear
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setShowConfirmClear(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      onClick={() => setShowConfirmClear(true)}
                      className="text-gray-500"
                    >
                      Clear Cart
                    </Button>
                  )}
                </div>
                
                <div className="bg-white dark:bg-gray-700 shadow-sm rounded-md p-4 sm:min-w-[240px]">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-300">Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-300">Estimated tax:</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t dark:border-gray-600 my-2 pt-2">
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Button asChild variant="outline" className="flex items-center gap-2">
              <Link to="/services">
                <ArrowLeft size={16} />
                Continue Shopping
              </Link>
            </Button>
            
            <Button 
              asChild 
              className="w-full md:w-auto bg-conison-600 hover:bg-conison-700"
            >
              <Link to="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>

          {/* Related services */}
          {recommendedItems.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold mb-4">You Might Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {recommendedItems.map(item => (
                  <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
                    <h3 className="font-medium mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">${item.price.toFixed(2)}</span>
                      <Button asChild size="sm" variant="outline">
                        <Link to={`/services/${item.id}`}>View</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;