import React, { useState } from 'react';

const notificationTemplates = [
  {
    id: 1,
    name: 'Appointment Confirmation',
    type: 'email',
    subject: 'Your Appointment is Confirmed',
    content: 'Hello {customer_name}, your appointment for {service_name} on {appointment_date} at {appointment_time} has been confirmed. Thank you for choosing us!',
    isActive: true
  },
  {
    id: 2,
    name: '24-Hour Reminder',
    type: 'sms',
    content: 'Reminder: Your {service_name} appointment is scheduled for tomorrow at {appointment_time}. Reply YES to confirm or CALL to reschedule.',
    isActive: true
  },
  {
    id: 3,
    name: 'Service Complete',
    type: 'whatsapp',
    content: '🚗 Your vehicle is ready for pickup! Total: {amount}. Please visit us at {location} to collect your vehicle. Thank you for your business!',
    isActive: true
  },
];

const recentNotifications = [
  {
    id: 1,
    recipient: 'John Doe (john@example.com)',
    type: 'Email',
    template: 'Appointment Confirmation',
    status: 'Delivered',
    sentAt: '2023-11-10 10:30 AM',
    content: 'Your appointment for Oil Change on 2023-11-11 at 10:00 AM has been confirmed.'
  },
  {
    id: 2,
    recipient: '+1 (555) 123-4567',
    type: 'SMS',
    template: '24-Hour Reminder',
    status: 'Pending',
    sentAt: 'Scheduled for 2023-11-10 10:00 AM',
    content: 'Reminder: Your Oil Change appointment is scheduled for tomorrow at 10:00 AM.'
  },
];

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('templates');
  const [showNewTemplateModal, setShowNewTemplateModal] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    type: 'email',
    subject: '',
    content: ''
  });

  const handleNewTemplate = () => {
    // In a real app, you would save this to your backend
    console.log('New template:', newTemplate);
    setShowNewTemplateModal(false);
    setNewTemplate({ name: '', type: 'email', subject: '', content: '' });
  };

  return (
    <div className="ml-64 p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Notification Center</h1>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('templates')}
            className={`${activeTab === 'templates' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Message Templates
          </button>
          <button
            onClick={() => setActiveTab('recent')}
            className={`${activeTab === 'recent' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Recent Notifications
          </button>
          <button
            onClick={() => setActiveTab('send')}
            className={`${activeTab === 'send' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Send New Message
          </button>
        </nav>
      </div>

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div>
          <div className="sm:flex sm:items-center mb-4">
            <div className="sm:flex-auto">
              <h2 className="text-lg font-medium text-gray-900">Message Templates</h2>
              <p className="mt-1 text-sm text-gray-700">
                Manage your notification templates for automated messages.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button
                type="button"
                onClick={() => setShowNewTemplateModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                + New Template
              </button>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <ul className="divide-y divide-gray-200">
              {notificationTemplates.map((template) => (
                <li key={template.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-blue-600 truncate">
                          {template.name}
                        </span>
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {template.type.toUpperCase()}
                        </span>
                        {template.isActive && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        )}
                      </div>
                      {template.subject && (
                        <p className="mt-1 text-sm text-gray-500">
                          <span className="font-medium">Subject:</span> {template.subject}
                        </p>
                      )}
                      <p className="mt-1 text-sm text-gray-500 truncate">
                        {template.content}
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                      <button className="bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus:outline-none">
                        Edit
                      </button>
                      <button className="ml-4 bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus:outline-none">
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Recent Notifications Tab */}
      {activeTab === 'recent' && (
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Notifications</h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Recipient
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Template
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sent At
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentNotifications.map((notification) => (
                    <tr key={notification.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {notification.recipient}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {notification.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {notification.template}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${notification.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {notification.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {notification.sentAt}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Send New Message Tab */}
      {activeTab === 'send' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Send New Message</h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>Select a customer and template to send a new message.</p>
            </div>
            <div className="mt-5">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="customer" className="block text-sm font-medium text-gray-700">
                    Customer
                  </label>
                  <select
                    id="customer"
                    name="customer"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option>Select a customer</option>
                    <option>John Doe (john@example.com)</option>
                    <option>Jane Smith (jane@example.com)</option>
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="template" className="block text-sm font-medium text-gray-700">
                    Template
                  </label>
                  <select
                    id="template"
                    name="template"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option>Select a template</option>
                    <option>Appointment Confirmation</option>
                    <option>24-Hour Reminder</option>
                    <option>Service Complete</option>
                  </select>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <div className="mt-1">
                    <textarea
                      rows={4}
                      name="message"
                      id="message"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                      defaultValue={''}
                      placeholder="Enter your message here..."
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <div className="flex items-center">
                    <input
                      id="send-now"
                      name="send-method"
                      type="radio"
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                      defaultChecked
                    />
                    <label htmlFor="send-now" className="ml-3">
                      <span className="block text-sm font-medium text-gray-700">Send now</span>
                    </label>
                  </div>
                  <div className="flex items-center mt-4">
                    <input
                      id="schedule"
                      name="send-method"
                      type="radio"
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <label htmlFor="schedule" className="ml-3">
                      <span className="block text-sm font-medium text-gray-700">Schedule for later</span>
                    </label>
                    <input
                      type="datetime-local"
                      className="ml-4 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Send Message
                </button>
                <button
                  type="button"
                  className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save as Draft
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Template Modal */}
      {showNewTemplateModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Create New Template</h3>
                  <div className="mt-5">
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-6">
                        <label htmlFor="template-name" className="block text-sm font-medium text-gray-700">
                          Template Name
                        </label>
                        <input
                          type="text"
                          name="template-name"
                          id="template-name"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={newTemplate.name}
                          onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                        />
                      </div>

                      <div className="sm:col-span-6">
                        <label htmlFor="message-type" className="block text-sm font-medium text-gray-700">
                          Message Type
                        </label>
                        <select
                          id="message-type"
                          name="message-type"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                          value={newTemplate.type}
                          onChange={(e) => setNewTemplate({...newTemplate, type: e.target.value})}
                        >
                          <option value="email">Email</option>
                          <option value="sms">SMS</option>
                          <option value="whatsapp">WhatsApp</option>
                        </select>
                      </div>

                      {newTemplate.type === 'email' && (
                        <div className="sm:col-span-6">
                          <label htmlFor="email-subject" className="block text-sm font-medium text-gray-700">
                            Email Subject
                          </label>
                          <input
                            type="text"
                            name="email-subject"
                            id="email-subject"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={newTemplate.subject}
                            onChange={(e) => setNewTemplate({...newTemplate, subject: e.target.value})}
                          />
                        </div>
                      )}

                      <div className="sm:col-span-6">
                        <label htmlFor="template-content" className="block text-sm font-medium text-gray-700">
                          Message Content
                        </label>
                        <div className="mt-1">
                          <textarea
                            rows={4}
                            name="template-content"
                            id="template-content"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                            value={newTemplate.content}
                            onChange={(e) => setNewTemplate({...newTemplate, content: e.target.value})}
                            placeholder="Enter your message here..."
                          />
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          Use placeholders like {'{customer_name}'}, {'{service_name}'}, etc.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                  onClick={handleNewTemplate}
                >
                  Create Template
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setShowNewTemplateModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
