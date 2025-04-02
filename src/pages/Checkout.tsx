import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  ArrowLeft, 
  ChevronRight, 
  Check, 
  AlertCircle,
  Phone,
  Smartphone
} from "lucide-react";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

// List of countries
const COUNTRIES = [
  "United States", "Canada", "United Kingdom", "Australia", 
  "Germany", "France", "Japan", "China", "Brazil", "South Africa",
  "Kenya", "Nigeria", "Ghana", "Egypt", "Morocco", "South Sudan"
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  sameAsShipping: boolean;
  billingAddress: string;
  billingCity: string;
  billingState: string;
  billingZipCode: string;
  billingCountry: string;
  paymentMethod: string;
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
  receiveUpdates?: boolean;
  savePaymentInfo?: boolean;
}

// Define type aliases for errors and fieldTouched
type FormErrors = Partial<FormData>;
type FieldTouched = Partial<Record<keyof FormData, boolean>>;

const Checkout = () => {
  const { cart, clearCart, totalItems } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Calculate cart metrics
  const items = cart?.items || [];
  
  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const subtotal = calculateSubtotal();
  const taxRate = 0.07; // 7% tax rate
  const tax = subtotal * taxRate;
  const total = subtotal + tax;
  
  // Checkout step tracking
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [progress, setProgress] = useState(33);
  
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    sameAsShipping: true,
    billingAddress: "",
    billingCity: "",
    billingState: "",
    billingZipCode: "",
    billingCountry: "United States",
    paymentMethod: "credit-card",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldTouched, setFieldTouched] = useState<FieldTouched>({});

  // Update progress based on checkout step
  useEffect(() => {
    if (checkoutStep === 1) setProgress(33);
    else if (checkoutStep === 2) setProgress(66);
    else if (checkoutStep === 3) setProgress(100);
  }, [checkoutStep]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldTouched((prev) => ({ ...prev, [name]: true }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldTouched((prev) => ({ ...prev, [name]: true }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (name) => {
    setFormData((prev) => {
      const newState = { ...prev, [name]: !prev[name] };
      
      // If toggling sameAsShipping, copy shipping details to billing
      if (name === "sameAsShipping" && !prev[name]) {
        return {
          ...newState,
          billingAddress: prev.address,
          billingCity: prev.city,
          billingState: prev.state,
          billingZipCode: prev.zipCode,
          billingCountry: prev.country
        };
      }
      
      return newState;
    });
  };

  const handlePaymentMethodChange = (value) => {
    setFormData((prev) => ({ ...prev, paymentMethod: value }));
  };
  
  const formatCardNumber = (value) => {
    // Remove non-digits
    const digits = value.replace(/\D/g, '');
    
    // Limit to 16 digits
    const trimmed = digits.slice(0, 16);
    
    // Insert spaces every 4 digits
    let formatted = '';
    for (let i = 0; i < trimmed.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += ' ';
      }
      formatted += trimmed[i];
    }
    
    return formatted;
  };
  
  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData((prev) => ({ ...prev, cardNumber: formatted }));
    setFieldTouched((prev) => ({ ...prev, cardNumber: true }));
    
    if (errors.cardNumber) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.cardNumber;
        return newErrors;
      });
    }
  };
  
  const formatExpiryDate = (value) => {
    // Remove non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format as MM/YY
    if (digits.length <= 2) {
      return digits;
    }
    
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
  };
  
  const handleExpiryDateChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    setFormData((prev) => ({ ...prev, expiryDate: formatted }));
    setFieldTouched((prev) => ({ ...prev, expiryDate: true }));
    
    if (errors.expiryDate) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.expiryDate;
        return newErrors;
      });
    }
  };

  // Validate form based on current step
  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (checkoutStep === 1) {
      // Validate contact info
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
      if (!formData.phone) {
        newErrors.phone = "Phone number is required";
      } else if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
        newErrors.phone = "Invalid phone number format";
      }
    } else if (checkoutStep === 2) {
      // Validate shipping info
      if (!formData.address) newErrors.address = "Address is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.state) newErrors.state = "State/Province is required";
      if (!formData.zipCode) newErrors.zipCode = "Zip/Postal code is required";
      
      // Validate billing if different from shipping
      if (!formData.sameAsShipping) {
        if (!formData.billingAddress) newErrors.billingAddress = "Billing address is required";
        if (!formData.billingCity) newErrors.billingCity = "Billing city is required";
        if (!formData.billingState) newErrors.billingState = "Billing state/province is required";
        if (!formData.billingZipCode) newErrors.billingZipCode = "Billing zip/postal code is required";
      }
    } else if (checkoutStep === 3 && formData.paymentMethod === "credit-card") {
      // Validate credit card info
      if (!formData.cardName) newErrors.cardName = "Name on card is required";
      
      if (!formData.cardNumber) {
        newErrors.cardNumber = "Card number is required";
      } else if (formData.cardNumber.replace(/\D/g, '').length < 16) {
        newErrors.cardNumber = "Invalid card number";
      }
      
      if (!formData.expiryDate) {
        newErrors.expiryDate = "Expiry date is required";
      } else {
        const [month, year] = formData.expiryDate.split('/').map(Number);
        const currentYear = new Date().getFullYear() % 100;
        const currentMonth = new Date().getMonth() + 1;
        
        if (!month || !year || month > 12 || month < 1) {
          newErrors.expiryDate = "Invalid expiry date";
        } else if ((year < currentYear) || (year === currentYear && month < currentMonth)) {
          newErrors.expiryDate = "Card has expired";
        }
      }
      
      if (!formData.cvv) {
        newErrors.cvv = "CVV is required";
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = "Invalid CVV";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateForm()) {
      setCheckoutStep(prevStep => prevStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    setCheckoutStep(prevStep => prevStep - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      });
      navigate("/services");
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase. You will receive a confirmation email shortly.",
      });
      
      clearCart();
      navigate("/thank-you");
    } catch (error) {
      toast({
        title: "Error processing order",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-6">Your cart is empty</h1>
          <p className="mb-8 text-gray-600 dark:text-gray-400">Add some items to your cart before proceeding to checkout.</p>
          <Button asChild className="bg-conison-600 hover:bg-conison-700">
            <Link to="/services">Browse Services</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  // Format order items for display
  const orderItems = items.map(item => {
    // Get package data if needed
    let packageData = null;
    if (item.packageId) {
      // Here you would fetch package data using packageId
      // For now we'll use dummy data
      packageData = {
        title: item.name,
        price: item.price,
        image: item.image
      };
    }
    
    return {
      id: item.packageId || item.id,
      name: packageData?.title || item.name,
      price: packageData?.price || item.price,
      quantity: item.quantity,
      image: packageData?.image || item.image || "/api/placeholder/60/60"
    };
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-2 mb-4" />
          <div className="flex justify-between text-sm">
            <div className={`flex flex-col items-center ${checkoutStep >= 1 ? 'text-conison-600 dark:text-conison-400' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                checkoutStep >= 1 
                  ? 'bg-conison-100 dark:bg-conison-900 text-conison-600 dark:text-conison-400' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
              }`}>
                {checkoutStep > 1 ? <Check size={16} /> : "1"}
              </div>
              <span>Information</span>
            </div>
            <div className={`flex flex-col items-center ${checkoutStep >= 2 ? 'text-conison-600 dark:text-conison-400' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                checkoutStep >= 2 
                  ? 'bg-conison-100 dark:bg-conison-900 text-conison-600 dark:text-conison-400' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
              }`}>
                {checkoutStep > 2 ? <Check size={16} /> : "2"}
              </div>
              <span>Shipping</span>
            </div>
            <div className={`flex flex-col items-center ${checkoutStep >= 3 ? 'text-conison-600 dark:text-conison-400' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                checkoutStep >= 3 
                  ? 'bg-conison-100 dark:bg-conison-900 text-conison-600 dark:text-conison-400' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
              }`}>
                3
              </div>
              <span>Payment</span>
            </div>
          </div>
        </div>

        <div className="flex items-center mb-6">
          <Link to="/cart" className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-conison-600 dark:hover:text-conison-400 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to cart
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-center flex-grow mr-8">
            {checkoutStep === 1 ? "Contact Information" : 
             checkoutStep === 2 ? "Shipping Address" : 
             "Payment Details"}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 order-1">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Contact Information */}
              {checkoutStep === 1 && (
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <Label htmlFor="firstName" className="mb-1 block">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={errors.firstName && fieldTouched.firstName ? "border-red-500" : ""}
                        placeholder="John"
                      />
                      {errors.firstName && fieldTouched.firstName && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle size={12} className="mr-1" />
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="mb-1 block">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={errors.lastName && fieldTouched.lastName ? "border-red-500" : ""}
                        placeholder="Doe"
                      />
                      {errors.lastName && fieldTouched.lastName && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle size={12} className="mr-1" />
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="mb-1 block">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={errors.email && fieldTouched.email ? "border-red-500" : ""}
                        placeholder="john.doe@example.com"
                      />
                      {errors.email && fieldTouched.email && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle size={12} className="mr-1" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone" className="mb-1 block">Phone Number</Label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                          <Phone size={16} className="text-gray-400" />
                        </div>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`pl-10 ${errors.phone && fieldTouched.phone ? "border-red-500" : ""}`}
                          placeholder="(123) 456-7890"
                        />
                      </div>
                      {errors.phone && fieldTouched.phone && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle size={12} className="mr-1" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="receiveUpdates"
                        checked={formData.receiveUpdates}
                        onCheckedChange={() => handleCheckboxChange("receiveUpdates")}
                      />
                      <Label htmlFor="receiveUpdates" className="text-sm font-normal">
                        Email me with news and offers
                      </Label>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Shipping Information */}
              {checkoutStep === 2 && (
                <>
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="address" className="mb-1 block">Street Address</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className={errors.address && fieldTouched.address ? "border-red-500" : ""}
                          placeholder="123 Main St"
                        />
                        {errors.address && fieldTouched.address && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle size={12} className="mr-1" />
                            {errors.address}
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city" className="mb-1 block">City</Label>
                          <Input
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className={errors.city && fieldTouched.city ? "border-red-500" : ""}
                            placeholder="New York"
                          />
                          {errors.city && fieldTouched.city && (
                            <p className="text-red-500 text-sm mt-1 flex items-center">
                              <AlertCircle size={12} className="mr-1" />
                              {errors.city}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="state" className="mb-1 block">State/Province</Label>
                          <Input
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className={errors.state && fieldTouched.state ? "border-red-500" : ""}
                            placeholder="NY"
                          />
                          {errors.state && fieldTouched.state && (
                            <p className="text-red-500 text-sm mt-1 flex items-center">
                              <AlertCircle size={12} className="mr-1" />
                              {errors.state}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="zipCode" className="mb-1 block">Zip/Postal Code</Label>
                          <Input
                            id="zipCode"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            className={errors.zipCode && fieldTouched.zipCode ? "border-red-500" : ""}
                            placeholder="10001"
                          />
                          {errors.zipCode && fieldTouched.zipCode && (
                            <p className="text-red-500 text-sm mt-1 flex items-center">
                              <AlertCircle size={12} className="mr-1" />
                              {errors.zipCode}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="country" className="mb-1 block">Country</Label>
                          <Select 
                            value={formData.country} 
                            onValueChange={(value) => handleSelectChange("country", value)}
                          >
                            <SelectTrigger id="country" className={errors.country && fieldTouched.country ? "border-red-500" : ""}>
                              <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                            <SelectContent>
                              {COUNTRIES.map(country => (
                                <SelectItem key={country} value={country}>
                                  {country}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.country && fieldTouched.country && (
                            <p className="text-red-500 text-sm mt-1 flex items-center">
                              <AlertCircle size={12} className="mr-1" />
                              {errors.country}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold">Billing Address</h2>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="sameAsShipping"
                          checked={formData.sameAsShipping}
                          onCheckedChange={() => handleCheckboxChange("sameAsShipping")}
                        />
                        <Label htmlFor="sameAsShipping" className="text-sm font-normal">
                          Same as shipping address
                        </Label>
                      </div>
                    </div>

                    {!formData.sameAsShipping && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="billingAddress" className="mb-1 block">Street Address</Label>
                          <Input
                            id="billingAddress"
                            name="billingAddress"
                            value={formData.billingAddress}
                            onChange={handleInputChange}
                            className={errors.billingAddress && fieldTouched.billingAddress ? "border-red-500" : ""}
                            placeholder="123 Main St"
                          />
                          {errors.billingAddress && fieldTouched.billingAddress && (
                            <p className="text-red-500 text-sm mt-1 flex items-center">
                              <AlertCircle size={12} className="mr-1" />
                              {errors.billingAddress}
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="billingCity" className="mb-1 block">City</Label>
                            <Input
                              id="billingCity"
                              name="billingCity"
                              value={formData.billingCity}
                              onChange={handleInputChange}
                              className={errors.billingCity && fieldTouched.billingCity ? "border-red-500" : ""}
                              placeholder="New York"
                            />
                            {errors.billingCity && fieldTouched.billingCity && (
                              <p className="text-red-500 text-sm mt-1 flex items-center">
                                <AlertCircle size={12} className="mr-1" />
                                {errors.billingCity}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="billingState" className="mb-1 block">State/Province</Label>
                            <Input
                              id="billingState"
                              name="billingState"
                              value={formData.billingState}
                              onChange={handleInputChange}
                              className={errors.billingState && fieldTouched.billingState ? "border-red-500" : ""}
                              placeholder="NY"
                            />
                            {errors.billingState && fieldTouched.billingState && (
                              <p className="text-red-500 text-sm mt-1 flex items-center">
                                <AlertCircle size={12} className="mr-1" />
                                {errors.billingState}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="billingZipCode" className="mb-1 block">Zip/Postal Code</Label>
                            <Input
                              id="billingZipCode"
                              name="billingZipCode"
                              value={formData.billingZipCode}
                              onChange={handleInputChange}
                              className={errors.billingZipCode && fieldTouched.billingZipCode ? "border-red-500" : ""}
                              placeholder="10001"
                            />
                            {errors.billingZipCode && fieldTouched.billingZipCode && (
                              <p className="text-red-500 text-sm mt-1 flex items-center">
                                <AlertCircle size={12} className="mr-1" />
                                {errors.billingZipCode}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="billingCountry" className="mb-1 block">Country</Label>
                            <Select 
                              value={formData.billingCountry} 
                              onValueChange={(value) => handleSelectChange("billingCountry", value)}
                            >
                              <SelectTrigger id="billingCountry" className={errors.billingCountry && fieldTouched.billingCountry ? "border-red-500" : ""}>
                                <SelectValue placeholder="Select a country" />
                              </SelectTrigger>
                              <SelectContent>
                                {COUNTRIES.map(country => (
                                  <SelectItem key={country} value={country}>
                                    {country}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {errors.billingCountry && fieldTouched.billingCountry && (
                              <p className="text-red-500 text-sm mt-1 flex items-center">
                                <AlertCircle size={12} className="mr-1" />
                                {errors.billingCountry}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Step 3: Payment Information */}
              {checkoutStep === 3 && (
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={handlePaymentMethodChange}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3 border p-4 rounded-md dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <RadioGroupItem value="credit-card" id="credit-card" />
                      <Label htmlFor="credit-card" className="flex items-center cursor-pointer">
                        <CreditCard className="h-5 w-5 mr-2" />
                        Credit / Debit Card
                      </Label>
                      <div className="ml-auto flex space-x-2">
                        <img src="/api/placeholder/30/20" alt="Visa" className="h-6" />
                        <img src="/api/placeholder/30/20" alt="Mastercard" className="h-6" />
                        <img src="/api/placeholder/30/20" alt="Amex" className="h-6" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 border p-4 rounded-md dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <RadioGroupItem value="mobile-money" id="mobile-money" />
                      <Label htmlFor="mobile-money" className="flex items-center cursor-pointer">
                        <Smartphone className="h-5 w-5 mr-2" />
                        Mobile Money
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 border p-4 rounded-md dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                      <Label htmlFor="bank-transfer" className="cursor-pointer">
                        Bank Transfer
                      </Label>
                    </div>
                  </RadioGroup>

                  {formData.paymentMethod === "credit-card" && (
                    <div className="mt-6 space-y-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                      <div>
                        <Label htmlFor="cardName" className="mb-1 block">Name on Card</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          className={errors.cardName && fieldTouched.cardName ? "border-red-500" : ""}
                          placeholder="John Doe"
                        />
                        {errors.cardName && fieldTouched.cardName && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle size={12} className="mr-1" />
                            {errors.cardName}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="cardNumber" className="mb-1 block">Card Number</Label>
                        <div className="relative">
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleCardNumberChange}
                            className={`pr-10 ${errors.cardNumber && fieldTouched.cardNumber ? "border-red-500" : ""}`}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <CreditCard size={16} className="text-gray-400" />
                          </div>
                        </div>
                        {errors.cardNumber && fieldTouched.cardNumber && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle size={12} className="mr-1" />
                            {errors.cardNumber}
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate" className="mb-1 block">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleExpiryDateChange}
                            className={errors.expiryDate && fieldTouched.expiryDate ? "border-red-500" : ""}
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                          {errors.expiryDate && fieldTouched.expiryDate && (
                            <p className="text-red-500 text-sm mt-1 flex items-center">
                              <AlertCircle size={12} className="mr-1" />
                              {errors.expiryDate}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="cvv" className="mb-1 block">CVV</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            className={errors.cvv && fieldTouched.cvv ? "border-red-500" : ""}
                            placeholder="123"
                            maxLength={4}
                            type="password"
                          />
                          {errors.cvv && fieldTouched.cvv && (
                            <p className="text-red-500 text-sm mt-1 flex items-center">
                              <AlertCircle size={12} className="mr-1" />
                              {errors.cvv}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === "mobile-money" && (
                    <div className="mt-6 space-y-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        You'll receive instructions on your phone to complete the payment.
                      </p>
                      <div>
                        <Label htmlFor="mobileNumber" className="mb-1 block">Mobile Number</Label>
                        <Input
                          id="mobileNumber"
                          placeholder="+1 (123) 456-7890"
                          defaultValue={formData.phone}
                        />
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === "bank-transfer" && (
                    <div className="mt-6 space-y-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        After placing your order, you'll receive our bank details to complete the transfer.
                        Your order will be processed once the payment is confirmed.
                      </p>
                    </div>
                  )}

                  <div className="flex items-center space-x-2 mt-6">
                    <Checkbox
                      id="savePaymentInfo"
                      checked={formData.savePaymentInfo}
                      onCheckedChange={() => handleCheckboxChange("savePaymentInfo")}
                    />
                    <Label htmlFor="savePaymentInfo" className="text-sm font-normal">
                      Save payment information for future purchases
                    </Label>
                  </div>
                </div>
              )}

              {/* Navigation buttons based on step */}
              <div className="flex justify-between mt-8">
                {checkoutStep > 1 && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handlePrevStep}
                    className="flex items-center"
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    Back
                  </Button>
                )}
                
                {checkoutStep < 3 ? (
                  <Button 
                    type="button" 
                    onClick={handleNextStep}
                    className="ml-auto bg-conison-600 hover:bg-conison-700 flex items-center"
                  >
                    Continue
                    <ChevronRight size={16} className="ml-2" />
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    className="ml-auto bg-conison-600 hover:bg-conison-700 flex items-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : `Place Order • $${total.toFixed(2)}`}
                  </Button>
                )}
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 order-2">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 sticky top-24">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-2">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex items-start space-x-3">
                      <div className="w-14 h-14 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.name}</p>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Qty: {item.quantity}
                          </p>
                          <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {orderItems.length > 2 && (
                  <Button variant="link" className="text-sm text-conison-600 dark:text-conison-400 p-0 h-auto">
                    {`View all ${orderItems.length} items`}
                  </Button>
                )}
              </div>
              
              <div className="p-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-gray-600 dark:text-gray-400">Subtotal</p>
                    <p>${subtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600 dark:text-gray-400">Tax ({(taxRate * 100).toFixed(0)}%)</p>
                    <p>${tax.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600 dark:text-gray-400">Shipping</p>
                    <p>Free</p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between font-semibold text-lg">
                  <p>Total</p>
                  <p>${total.toFixed(2)}</p>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Truck className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>Free shipping on all orders</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <ShieldCheck className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>Secure payment processing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;