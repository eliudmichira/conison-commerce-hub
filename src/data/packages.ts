
import { Package } from "@/types";

export const pricingPackages: Package[] = [
  {
    id: "logo-design",
    title: "Logo Design",
    price: 50,
    description: "Professional logo design with unlimited revisions until satisfaction.",
    deliverables: [
      "3 Logo Design Samples to choose from",
      "Unlimited Revisions (until completely satisfied)",
      "Final files in PNG, JPG, and Vector format"
    ],
    timeframe: "48–72 hours",
    fileFormats: ["AI", "PNG", "JPG", "PDF", "EPS"],
  },
  {
    id: "essential-branding",
    title: "Essential Branding Package",
    price: 125,
    description: "Core branding elements for your business identity.",
    deliverables: [
      "Logo Design",
      "Business Card Design",
      "Letterhead Design",
      "Social Media Profile & Cover Image",
      "3D Mockup Presentation"
    ],
    timeframe: "72 hours",
    fileFormats: ["AI", "PSD", "PNG", "JPG", "PDF"],
  },
  {
    id: "full-branding",
    title: "Full Branding Package",
    price: 300,
    description: "Comprehensive branding solution for established businesses.",
    featured: true,
    deliverables: [
      "Logo Design",
      "Letterhead Design",
      "3D Logo",
      "Business Card Design",
      "Receipt Design",
      "Invoice Design",
      "Stamp Design",
      "Branded Email Signature",
      "Roll-Up Banner Design"
    ],
    timeframe: "72 hours",
    fileFormats: ["AI", "PSD", "PNG", "JPG", "PDF", "EPS"],
  },
  {
    id: "complete-branding",
    title: "Complete Branding & Profile Package",
    price: 450,
    description: "All-inclusive branding solution with company profile and digital assets.",
    deliverables: [
      "Everything in the Full Branding Package",
      "Company Profile (Writing & Design)",
      "Basic Website Landing Page (One Page)",
      "5 Social Media Post Templates (Branded for Business)",
      "One Free Revision on All Designs"
    ],
    timeframe: "72 hours",
    fileFormats: ["AI", "PSD", "PNG", "JPG", "PDF", "HTML", "CSS"],
  }
];
