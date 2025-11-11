import React, { useState, useEffect } from 'react';
import { submitAppointment } from '../services/appointmentService';
import Header from '../components/Header';
import CustomerAndServiceSection from '../components/CustomerAndServiceSection';
import AppointmentScheduling from '../components/appointment';
import BookingSummary from '../components/summary';
import SimpleNavbar from '../components/simpleNavbar';
import Hero from '../components/hero';

// Alert Component
const Alert = ({ message, type = 'success', onClose }) => {
  if (!message) return null;
  
  const bgColor = type === 'success' ? 'bg-green-100 border-green-500 text-green-700' : 'bg-red-100 border-red-500 text-red-700';
  
  return (
    <div className={`fixed top-4 right-4 border-l-4 p-4 ${bgColor} shadow-lg rounded max-w-md z-50`}>
      <div className="flex justify-between items-center">
        <p className="font-medium">{message}</p>
        <button 
          onClick={onClose}
          className="ml-4 text-gray-500 hover:text-gray-700"
          aria-label="Close alert"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
// Main App Component
const Home = () => {
// Initialize all form fields with empty strings to prevent uncontrolled to controlled warning
const initialFormState = {
  fullName: '',
  phoneNo: '',
  email: '',
  vehicleMake: '',
  vehicleModel: '',
  year: '',
  carNo: '',
  region: '',
  branch: ''
};

const [formData, setFormData] = useState(initialFormState);
const [selectedService, setSelectedService] = useState('Oil Change');
const [selectedDate, setSelectedDate] = useState('');
const [selectedTime, setSelectedTime] = useState('');
const [isSubmitting, setIsSubmitting] = useState(false);
const [alert, setAlert] = useState({ message: '', type: 'success' });

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    // Hide alert after 5 seconds
    setTimeout(() => setAlert({ message: '', type: 'success' }), 5000);
  };

  const handleBooking = async () => {
    if (isSubmitting) return; // Prevent multiple submissions
    
    try {
      setIsSubmitting(true);
      console.log('Starting appointment booking...');
      
      // Basic form validation
      if (!formData.fullName || !formData.phoneNo || !selectedDate || !selectedTime) {
        throw new Error('Please fill in all required fields');
      }

      const result = await submitAppointment({
        fullName: formData.fullName.trim(),
        phone: formData.phoneNo.trim(),
        email: formData.email?.trim() || '',
        vehicleMake: formData.vehicleMake.trim(),
        vehicleModel: formData.vehicleModel?.trim() || '',
        carNumber: formData.carNo.trim(),
        serviceType: selectedService,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
        region: formData.region || 'Default',
        branch: formData.branch || 'Default'
      });
      
      console.log('Appointment booking result:', result);
      
      if (result.success) {
        showAlert('Appointment booked successfully!', 'success');
        
        // Reset form to initial state
        setFormData(initialFormState);
        setSelectedService('Oil Change');
        setSelectedDate('');
        setSelectedTime('');
        
        // Scroll to top to see the success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error('Failed to get confirmation of booking');
      }
      
    } catch (error) {
      console.error('Error in handleBooking:', error);
      showAlert(error.message || 'Failed to book appointment. Please check the console for more details.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleNavbar />
      <Hero />
      <Alert 
        message={alert.message} 
        type={alert.type} 
        onClose={() => setAlert({ message: '', type: 'success' })} 
      />
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Customer & Service Section */}
        <CustomerAndServiceSection 
          formData={formData}
          onFormChange={handleFormChange}
          selectedService={selectedService}
          onServiceChange={setSelectedService}
        />
        
        {/* Availability Calendar Section */}
        <section className="mt-8 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Select Date & Time
            </h2>
            <AppointmentScheduling
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onDateChange={setSelectedDate}
              onTimeChange={setSelectedTime}
            />
          </div>
          
          {/* Booking Summary */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Booking Summary
            </h2>
            <BookingSummary
              formData={formData}
              selectedService={selectedService}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onBooking={handleBooking}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;



