"use client";
import React from 'react';
import { LayoutGrid } from '../components/ui/layout-grid';
// Header and Footer are already included in AppLayout
// Service icons removed

const ServicePage = () => {
  const services = [
    {
      title: "Engine Repair",
      description: "Comprehensive engine diagnostics and repair services to keep your vehicle running smoothly.",
      thumbnail: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d8?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Oil Change",
      description: "Professional oil change services to maintain your engine's performance and longevity.",
      thumbnail: "https://images.unsplash.com/photo-1603302576837-37596b2dcf89?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Brake Service",
      description: "Complete brake inspection, repair, and replacement services for your safety.",
      emoji: '🛑'
    },
    {
      title: "Battery Service",
      description: "Battery testing, replacement, and electrical system diagnostics.",
      emoji: '🔋'
    },
    {
      title: "Tire Service",
      description: "Tire rotation, balancing, alignment, and replacement services.",
      emoji: '🛞'
    },
    {
      title: "AC Service",
      description: "Complete air conditioning system service and repair.",
      emoji: '❄️'
    },
    {
      title: "Maintenance",
      description: "Regular maintenance services to prevent costly repairs down the road.",
      emoji: '🔧'
    },
    {
      title: "Diagnostics",
      description: "Advanced diagnostic services to identify and fix any vehicle issues.",
      emoji: '📊'
    }
  ];

  // Service card components
  const ServiceCard = ({ title, description, emoji, thumbnail }) => (
    <div className="p-6 h-full">
      <div className="h-full bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg">
        {thumbnail ? (
          <img 
            src={thumbnail} 
            alt={title} 
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="h-48 bg-gray-100 flex items-center justify-center text-6xl">
            {emoji}
          </div>
        )}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );

  // Define the cards with service information
  const cards = services.map((service, index) => ({
    id: index + 1,
    content: (
      <ServiceCard 
        key={service.title}
        title={service.title} 
        description={service.description}
        icon={service.icon}
        thumbnail={service.thumbnail}
      />
    ),
    className: "col-span-1",
    thumbnail: service.thumbnail,
  }));

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Professional automotive services to keep your vehicle in top condition
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-10 w-full bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="h-full">
                <ServiceCard 
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  thumbnail={service.thumbnail}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Working Hours & Location */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="p-8 md:w-1/2">
                <h2 className="text-2xl font-bold mb-6">Working Hours</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Regular Hours:</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="font-medium">Monday - Friday:</span>
                        <span>8:00 AM - 6:00 PM</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="font-medium">Saturday:</span>
                        <span>9:00 AM - 4:00 PM</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="font-medium">Sunday:</span>
                        <span>Closed</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Available Time Slots:</h3>
                    <ul className="grid grid-cols-2 gap-2">
                      {[
                        '8:00 AM - 8:30 AM',
                        '9:00 AM - 9:30 AM',
                        '10:00 AM - 10:30 AM',
                        '1:00 PM - 1:30 PM',
                        '2:00 PM - 2:30 PM'
                      ].map((slot, index) => (
                        <li key={index} className="text-sm bg-gray-50 p-2 rounded">
                          {slot}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-red-600 text-white md:w-1/2">
                <h2 className="text-2xl font-bold mb-4">Our Locations</h2>
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                  {/* Location Item Template */}
                  <div className="bg-red-700 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="bg-red-600 p-2 rounded-md">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">Greater Accra Region</h3>
                        <ul className="mt-2 space-y-2 text-sm">
                          <li className="flex justify-between">
                            <span className="text-red-100">East Legon</span>
                            <span>+233 24 123 4567</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-red-100">Spintex</span>
                            <span>+233 24 234 5678</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-700 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="bg-red-600 p-2 rounded-md">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">Ashanti Region</h3>
                        <ul className="mt-2 text-sm">
                          <li className="flex justify-between">
                            <span className="text-red-100">Kumasi Central</span>
                            <span>+233 24 345 6789</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-700 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="bg-red-600 p-2 rounded-md">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">Other Regions</h3>
                        <ul className="mt-2 space-y-2 text-sm">
                          <li className="flex justify-between">
                            <span className="text-red-100">Takoradi (Western)</span>
                            <span>+233 24 456 7890</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-red-100">Koforidua (Eastern)</span>
                            <span>+233 24 567 8901</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-red-100">Ho (Volta)</span>
                            <span>+233 24 678 9012</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
