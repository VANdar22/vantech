import React from 'react';

const Service = ({ selectedService, onServiceChange }) => {
  const services = [
    { id: 'oil-change', name: 'Oil Change' },
    { id: 'tire-rotation', name: 'Tire Rotation' },
    { id: 'brake-service', name: 'Brake Service' },
    { id: 'maintenance', name: 'General Maintenance' },
    { id: 'battery-check', name: 'Battery Check' },
    { id: 'diagnostics', name: 'Engine Diagnostics' }
  ];

  return (
    <div className="w-full">
      <div className="space-y-3">
        <fieldset>
          <legend className="sr-only">Select a service</legend>
          <div className="space-y-2">
            {services.map((service) => (
              <div key={service.id} className="group">
                <input
                  id={service.id}
                  name="service"
                  type="radio"
                  checked={selectedService === service.name}
                  onChange={() => onServiceChange(service.name)}
                  className="hidden"
                />
                <label 
                  htmlFor={service.id}
                  className={`flex items-center py-3 px-0 cursor-pointer transition-colors border-b border-gray-100 ${
                    selectedService === service.name 
                      ? 'text-[#EB0A1E]' 
                      : 'text-gray-900 hover:text-[#EB0A1E]'
                  }`}
                >
                  <div className={`flex items-center justify-center w-5 h-5 rounded-full border mr-3 ${
                    selectedService === service.name 
                      ? 'border-[#EB0A1E] bg-[#EB0A1E]' 
                      : 'border-gray-300 group-hover:border-[#EB0A1E]'
                  }`}>
                    {selectedService === service.name && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="font-medium">{service.name}</span>
                </label>
              </div>
            ))}
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default Service;