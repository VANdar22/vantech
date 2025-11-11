import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { format } from 'date-fns';

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    fetchAppointments();

    // Set up real-time subscription
    const subscription = supabase
      .channel('appointments_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'appointments' 
        }, 
        () => {
          fetchAppointments();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('appointments')
        .select('*')
        .order('appointment_date', { ascending: true })
        .order('appointment_time', { ascending: true });

      const { data, error } = await query;
      
      if (error) throw error;
      
      setAppointments(data || []);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('appointments')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
      
      if (error) throw error;
      
      await fetchAppointments();
      return true;
    } catch (err) {
      console.error('Error updating status:', err);
      alert(`Failed to update appointment: ${err.message}`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.phone?.includes(searchTerm) ||
      appointment.car_number?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    const matchesDate = !dateFilter || appointment.appointment_date === dateFilter;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
      confirmed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Confirmed' },
      completed: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Completed' },
      canceled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Canceled' },
    };
    
    const statusInfo = statusClasses[status] || { bg: 'bg-gray-100', text: 'text-gray-800', label: status };
    
    return (
      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusInfo.bg} ${statusInfo.text}`}>
        {statusInfo.label}
      </span>
    );
  };

  const handleStatusUpdate = async (id, currentStatus, newStatus) => {
    if (window.confirm(`Are you sure you want to mark this appointment as ${newStatus}?`)) {
      const success = await updateStatus(id, newStatus);
      if (success) {
        alert(`Appointment has been ${newStatus} successfully!`);
      }
    }
  };

  if (loading && appointments.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Appointments</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all appointments including customer details, vehicle information, and service requests.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search</label>
          <input
            type="text"
            name="search"
            id="search"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Search by name, phone, or car number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div>
          <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700">Status</label>
          <select
            id="status-filter"
            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            id="date-filter"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Appointments Table */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Customer
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Vehicle
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Service
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Date & Time
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((appointment) => (
                      <tr key={appointment.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            <div>
                              <div className="font-medium text-gray-900">{appointment.full_name}</div>
                              <div className="text-gray-500">{appointment.phone}</div>
                              <div className="text-gray-500 text-xs">{appointment.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="text-gray-900">{appointment.vehicle_make} {appointment.vehicle_model}</div>
                          <div className="text-gray-500">{appointment.car_number}</div>
                          {appointment.vin && <div className="text-gray-400 text-xs">VIN: {appointment.vin}</div>}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {appointment.service_type}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div>{format(new Date(appointment.appointment_date), 'MMM d, yyyy')}</div>
                          <div className="text-gray-500">{appointment.appointment_time}</div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          {getStatusBadge(appointment.status)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="flex flex-col space-y-2">
                            {appointment.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleStatusUpdate(appointment.id, 'pending', 'confirmed')}
                                  className="inline-flex items-center justify-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                  disabled={loading}
                                >
                                  ✓ Confirm
                                </button>
                                <button
                                  onClick={() => handleStatusUpdate(appointment.id, 'pending', 'canceled')}
                                  className="inline-flex items-center justify-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                  disabled={loading}
                                >
                                  ✕ Cancel
                                </button>
                              </>
                            )}
                            {appointment.status === 'confirmed' && (
                              <>
                                <button
                                  onClick={() => handleStatusUpdate(appointment.id, 'confirmed', 'completed')}
                                  className="inline-flex items-center justify-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                  disabled={loading}
                                >
                                  ✓ Mark Completed
                                </button>
                                <button
                                  onClick={() => handleStatusUpdate(appointment.id, 'confirmed', 'canceled')}
                                  className="inline-flex items-center justify-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                  disabled={loading}
                                >
                                  ✕ Cancel
                                </button>
                              </>
                            )}
                            {(appointment.status === 'completed' || appointment.status === 'canceled') && (
                              <button
                                onClick={() => handleStatusUpdate(appointment.id, appointment.status, 'pending')}
                                className="inline-flex items-center justify-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                disabled={loading}
                              >
                                ↻ Reset to Pending
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                        {loading ? 'Loading...' : 'No appointments found'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsList;
