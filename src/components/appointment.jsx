import React, { useState } from 'react';
import AvailabilityCalendar from './AvailabilityCalendar';
import { CustomAlert, SuccessAlert } from './CustomAlert';

const Appointment = ({ selectedDate = '', selectedTime = '', onDateChange, onTimeChange }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pendingTime, setPendingTime] = useState(selectedTime);
  const [pendingDate, setPendingDate] = useState(selectedDate);
  
  // Update pending states when props change
  React.useEffect(() => {
    setPendingTime(selectedTime);
  }, [selectedTime]);
  
  React.useEffect(() => {
    setPendingDate(selectedDate);
  }, [selectedDate]);
  
  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
// Appointment Scheduling Component
    const timeSlots = [
      '8:00 AM - 8:30 AM',
      '9:00 AM - 9:30 AM',
      '10:00 AM - 10:30 AM',
      '1:00 PM - 1:30 PM',
      '2:00 PM - 2:30 PM'
    ];
  
    // Handle time selection from the calendar
  const handleCalendarTimeSelect = (timeRange) => {
    const startTime = timeRange.split(' - ')[0];
    onTimeChange(startTime);
  };

  const handleBookAppointment = () => {
    if (selectedDate && selectedTime) {
      setPendingTime(selectedTime);
      setPendingDate(selectedDate);
      setShowConfirm(true);
    }
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    setShowSuccess(true);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg relative">
      {/* Confirmation Dialog */}
      <CustomAlert
        isOpen={showConfirm}
        onClose={handleCancel}
        title="Confirm Appointment"
        message={`Are you sure you want to book an appointment for ${formatDate(pendingDate)} at ${pendingTime}?`}
        onConfirm={handleConfirm}
      />
      
      {/* Success Notification */}
      <SuccessAlert
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="Your appointment has been confirmed!"
      />
      <h2 className="text-lg font-semibold mb-4">Appointment Scheduling</h2>
      
      <div className="mb-6">
        <AvailabilityCalendar 
          selectedDate={selectedDate} 
          selectedTime={selectedTime ? `${selectedTime} - ${parseInt(selectedTime.split(':')[0])}:30 ${selectedTime.split(' ')[1]}` : ''}
          onDateSelect={onDateChange} 
          onTimeSelect={handleCalendarTimeSelect}
        />
      </div>
  
        <div>
          <label className="block text-sm text-gray-600 mb-2">Available Time Slots</label>
          <div className="grid grid-cols-2 gap-3">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => onTimeChange(time.split(' - ')[0])}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  selectedTime === time.split(' - ')[0]
                    ? 'bg-[#EB0A1E] text-white hover:bg-[#D0091A] active:bg-[#B80716] border border-[#EB0A1E]'
                    : 'bg-white text-[#EB0A1E] hover:bg-red-50 border border-[#EB0A1E]'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
        
      
      </div>
    );
  };

export default Appointment;