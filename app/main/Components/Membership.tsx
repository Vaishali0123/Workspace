"use client";

import React from "react";

interface Plan {
  title: string;
  price: string;
  period: string;
  buttonText: string;
  features: string[];
  recommended?: boolean;
  active?: boolean;
}

const plans: Plan[] = [
  {
    title: "Free",
    price: "₹0",
    period: "forever",
    buttonText: "Active",
    features: [
      "Product Listing (5 products)",
      "Basic analytics",
      "Create Communities (2)",
      "Limited prosite tools",
    ],
    active: true,
  },
  {
    title: "Plus",
    price: "₹499",
    period: "/month",
    buttonText: "Get Started",
    features: [
      "Verification Badge",
      "Product Listing (5 products)",
      "Advanced Analytics",
      "20% platform Fees",
      "Create Communities (3)",
      "Basic tools for prosite",
    ],
    recommended: true,
  },
  {
    title: "Pro",
    price: "₹1999",
    period: "/month",
    buttonText: "Get Started",
    features: [
      "Verification Badge",
      "Product Listing (20 products)",
      "Advanced analytics",
      "3% platform fees",
      "Create Communities (5)",
      "Advanced tools for prosite",
    ],
  },
  {
    title: "Premium",
    price: "₹3499",
    period: "/month",
    buttonText: "Get Started",
    features: [
      "Verification Badge",
      "Product Listing (50 products)",
      "Advanced analytics",
      "1% platform fees",
      "Create Communities (10)",
      "Advanced tools for prosite",
    ],
  },
];

interface Props {
  onClose: () => void;
}

const SubscriptionPlans: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[1000]  bg-black/40 flex items-center justify-center">
      <div className="max-w-6xl  w-full mx-4 z-[1100] bg-white rounded-2xl shadow-2xl p-8 relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4  right-4  text-gray-600 hover:text-red-500 text-2xl font-bold"
        >
          ×
        </button>

        <h2 className="text-3xl font-bold  text-blue-800 mb-2 text-center">
          Subscription Plans
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Choose a plan that best suits your business. Start 1-month free trial:
          no obligation, no activation fee.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center bg-blue-50 rounded-xl border-2 p-6 transition-all
                ${
                  plan.recommended
                    ? "border-blue-800 bg-blue-100"
                    : "border-blue-100"
                }
                ${plan.active ? "border-blue-600" : ""}`}
            >
              <h3 className="text-xl font-semibold text-blue-800">
                {plan.title}
              </h3>
              <p className="text-3xl font-bold text-blue-900 mt-4">
                {plan.price}
              </p>
              <span className="text-gray-500">{plan.period}</span>

              <button
                className={`mt-6 mb-4 w-full py-2 rounded-lg font-medium
                  ${
                    plan.active
                      ? "bg-blue-600 text-white"
                      : "bg-blue-800 text-white hover:bg-blue-700"
                  }
                `}
              >
                {plan.buttonText}
              </button>

              <ul className="text-left space-y-2 text-sm text-gray-700">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-600">✔️</span> {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a href="#" className="text-blue-700 font-medium underline">
            Compare all features
          </a>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
