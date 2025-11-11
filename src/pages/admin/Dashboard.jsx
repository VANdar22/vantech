import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import AppointmentsList from './AppointmentsList';
import { startOfDay, endOfDay, parseISO, isToday } from 'date-fns';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    vehicle_make: '',
    vehicle_model: '',
    car_number: '',
    service_type: '',
    appointment_date: '',
    appointment_time: '',
    status: 'pending',
    notes: ''
  });
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    today: 0,
    completed: 0,
    canceled: 0
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Open edit modal with appointment data
  const handleEditClick = (appointment) => {
    setEditingAppointment(appointment);
    setFormData({
      full_name: appointment.full_name || '',
      phone: appointment.phone || '',
      email: appointment.email || '',
      vehicle_make: appointment.vehicle_make || '',
      vehicle_model: appointment.vehicle_model || '',
      car_number: appointment.car_number || '',
      service_type: appointment.service_type || '',
      appointment_date: appointment.appointment_date || '',
      appointment_time: appointment.appointment_time || '',
      status: appointment.status || 'pending',
      notes: appointment.notes || ''
    });
    setShowEditModal(true);
  };

  // Save edited appointment
  const handleSaveAppointment = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      const updates = {
        ...formData,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('appointments')
        .update(updates)
        .eq('id', editingAppointment.id);

      if (error) throw error;

      setShowEditModal(false);
      fetchAppointments();
    } catch (error) {
      console.error('Error updating appointment:', error);
      alert('Failed to update appointment');
    } finally {
      setLoading(false);
    }
  };

  // Delete appointment
  const handleDeleteAppointment = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment? This cannot be undone.')) {
      try {
        setLoading(true);
        const { error } = await supabase
          .from('appointments')
          .delete()
          .eq('id', id);

        if (error) throw error;

        fetchAppointments();
      } catch (error) {
        console.error('Error deleting appointment:', error);
        alert('Failed to delete appointment');
      } finally {
        setLoading(false);
      }
    }
  };



  // Calculate statistics from appointments data
  const calculateStats = (appointments) => {
    console.log('Calculating stats for appointments:', appointments);
    if (!appointments || !Array.isArray(appointments)) {
      console.log('No valid appointments data, returning zero stats');
      return { total: 0, pending: 0, today: 0, completed: 0, canceled: 0 };
    }
    
    const now = new Date();
    const todayString = now.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    console.log('Today string for comparison:', todayString);
    
    const stats = appointments.reduce((acc, appt) => {
      if (!appt) return acc;
      
      console.log('Processing appointment:', {
        id: appt.id,
        status: appt.status,
        date: appt.appointment_date,
        isToday: appt.appointment_date === todayString
      });
      
      const isAppointmentToday = appt.appointment_date === todayString;
      
      return {
        total: acc.total + 1,
        pending: appt.status === 'pending' ? acc.pending + 1 : acc.pending,
        today: isAppointmentToday ? acc.today + 1 : acc.today,
        completed: appt.status === 'completed' ? acc.completed + 1 : acc.completed,
        canceled: appt.status === 'canceled' ? acc.canceled + 1 : acc.canceled,
      };
    }, { total: 0, pending: 0, today: 0, completed: 0, canceled: 0 });
    
    console.log('Final calculated stats:', stats);
    return stats;
  };

  // Fetch appointments from Supabase
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      console.log('Fetching appointments...');
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('appointment_date', { ascending: true })
        .order('appointment_time', { ascending: true });
      
      if (error) throw error;
      
      console.log('Fetched appointments:', data);
      setAppointments(data || []);
      const newStats = calculateStats(data || []);
      console.log('Calculated stats:', newStats);
      setStats(newStats);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  // Set up real-time subscription with error handling
  useEffect(() => {
    console.log('Setting up real-time subscription...');
    let subscription;
    
    const setupSubscription = async () => {
      try {
        console.log('Performing initial fetch...');
        await fetchAppointments();
        
        console.log('Setting up real-time channel...');
        subscription = supabase.channel('dashboard_changes')
          .on('postgres_changes', 
            { 
              event: '*',
              schema: 'public',
              table: 'appointments'
            },
            (payload) => {
              console.log('Change received in real-time:', {
                event: payload.eventType,
                table: payload.table,
                new: payload.new,
                old: payload.old
              });
              fetchAppointments();
            }
          )
          .subscribe((status, err) => {
            console.log('Subscription status:', status);
            if (err) console.error('Subscription error:', err);
            if (status === 'CHANNEL_ERROR') {
              console.error('Channel error - attempting to resubscribe...');
              setTimeout(setupSubscription, 1000);
            } else if (status === 'SUBSCRIBED') {
              console.log('Successfully subscribed to real-time updates');
            }
          });
          
      } catch (error) {
        console.error('Error in setupSubscription:', error);
        // Retry after a delay if there's an error
        console.log('Retrying subscription setup in 2 seconds...');
        setTimeout(setupSubscription, 2000);
      }
    };
    
    setupSubscription();
    
    return () => {
      if (subscription) {
        console.log('Cleaning up real-time subscription');
        supabase.removeChannel(subscription).then(() => {
          console.log('Successfully unsubscribed');
        }).catch(err => {
          console.error('Error unsubscribing:', err);
        });
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4 md:p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-500">Total Appointments</h3>
            <p className="text-3xl font-bold text-indigo-600">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-500">Today's Appointments</h3>
            <p className="text-3xl font-bold text-green-600">{stats.today}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-500">Pending</h3>
            <p className="text-3xl font-bold text-yellow-500">{stats.pending}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-500">Completed</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.completed}</p>
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Recent Appointments</h2>
          </div>
          <AppointmentsList isEmbedded={true} />
        </div>
      </div>

      {/* Edit Appointment Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Edit Appointment</h3>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XCircleIcon className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={handleSaveAppointment} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Vehicle Make</label>
                    <input
                      type="text"
                      name="vehicle_make"
                      value={formData.vehicle_make}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Vehicle Model</label>
                    <input
                      type="text"
                      name="vehicle_model"
                      value={formData.vehicle_model}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">License Plate</label>
                    <input
                      type="text"
                      name="car_number"
                      value={formData.car_number}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Service Type</label>
                    <select
                      name="service_type"
                      value={formData.service_type}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    >
                      <option value="">Select a service</option>
                      <option value="Oil Change">Oil Change</option>
                      <option value="Tire Rotation">Tire Rotation</option>
                      <option value="Brake Service">Brake Service</option>
                      <option value="Battery Check">Battery Check</option>
                      <option value="General Inspection">General Inspection</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="canceled">Canceled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Appointment Date</label>
                    <input
                      type="date"
                      name="appointment_date"
                      value={formData.appointment_date}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Appointment Time</label>
                    <input
                      type="time"
                      name="appointment_time"
                      value={formData.appointment_time}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Notes</label>
                    <textarea
                      name="notes"
                      rows="3"
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
