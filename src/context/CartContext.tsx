
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { CartItem } from "@/types";
import { toast } from "@/components/ui/use-toast";

interface CartState {
  items: CartItem[];
  subtotal: number;
}

type CartAction = 
  | { type: "ADD_ITEM"; payload: { packageId: string; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { packageId: string; quantity: number } }
  | { type: "CLEAR_CART" };

const initialState: CartState = {
  items: [],
  subtotal: 0
};

// Try to load cart from localStorage
const loadCartFromStorage = (): CartState => {
  if (typeof window === "undefined") return initialState;
  
  try {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : initialState;
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error);
    return initialState;
  }
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        item => item.packageId === action.payload.packageId
      );
      
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
        
        return {
          ...state,
          items: updatedItems
        };
      } else {
        // Add new item
        return {
          ...state,
          items: [...state.items, { 
            packageId: action.payload.packageId, 
            quantity: action.payload.quantity 
          }]
        };
      }
    }
    
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(item => item.packageId !== action.payload)
      };
      
    case "UPDATE_QUANTITY": {
      const updatedItems = state.items.map(item => 
        item.packageId === action.payload.packageId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      
      return {
        ...state,
        items: updatedItems
      };
    }
    
    case "CLEAR_CART":
      return initialState;
      
    default:
      return state;
  }
};

// Create context
interface CartContextType {
  cart: CartState;
  addItem: (packageId: string, quantity?: number) => void;
  removeItem: (packageId: string) => void;
  updateQuantity: (packageId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, loadCartFromStorage());
  
  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  
  const addItem = (packageId: string, quantity = 1) => {
    dispatch({ type: "ADD_ITEM", payload: { packageId, quantity } });
    toast({
      title: "Item added to cart",
      description: "Your item has been added to the cart successfully."
    });
  };
  
  const removeItem = (packageId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: packageId });
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart."
    });
  };
  
  const updateQuantity = (packageId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { packageId, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart."
    });
  };
  
  const totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <CartContext.Provider value={{ 
      cart, 
      addItem, 
      removeItem, 
      updateQuantity, 
      clearCart,
      totalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
