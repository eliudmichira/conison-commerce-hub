
import React from "react";

// Service types
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: ServiceCategory;
  price?: number;
  features: string[];
  link: string;
}

export type ServiceCategory = 
  | "digital-marketing"
  | "web-development"
  | "video-production"
  | "it-solutions"
  | "branding"
  | "consultancy";

// Package types
export interface Package {
  id: string;
  title: string;
  price: number;
  description: string;
  deliverables: string[];
  timeframe: string;
  fileFormats: string[];
  featured?: boolean;
}

// Order types
export interface CartItem {
  packageId: string;
  quantity: number;
  customizations?: Record<string, any>;
}

export interface Order {
  id: string;
  customer: CustomerInfo;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  createdAt: Date;
}

export type OrderStatus = 
  | "pending"
  | "payment-processing"
  | "confirmed"
  | "in-progress"
  | "completed"
  | "cancelled";

export type PaymentMethod = 
  | "m-pesa"
  | "mtn"
  | "airtel"
  | "m-gurush"
  | "credit-card"
  | "debit-card"
  | "paypal"
  | "bank-transfer";

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  company?: string;
  specifications?: string;
  preferredContact: string;
}
