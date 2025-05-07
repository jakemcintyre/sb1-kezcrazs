import React from 'react';
import { useAppContext } from '../../context/AppContext';
import Avatar from '../common/Avatar';
import { formatDate, formatTimeRange } from '../../utils/formatters';
import { Calendar, List, Plus } from 'lucide-react';

const AppointmentsView: React.FC = () => {
  const { appointments, contacts } = useAppContext();
  const [viewMode, setViewMode] = React.useState<'list' | 'calendar'>('list');
  
  const upcomingAppointments = [...appointments]
    .filter(appointment => new Date(appointment.startTime) > new Date())
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  
  const getContactDetails = (contactId: string) => {
    return contacts.find(contact => contact.id === contactId);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Appointments</h1>
        
        <div className="flex space-x-2">
          <div className="flex p-1 bg-gray-100 dark:bg-gray-700 rounded-md">
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded ${
                viewMode === 'list' 
                  ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <List size={18} />
            </button>
            <button 
              onClick={() => setViewMode('calendar')}
              className={`p-1.5 rounded ${
                viewMode === 'calendar' 
                  ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <Calendar size={18} />
            </button>
          </div>
          
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200">
            <Plus size={16} />
            <span>New Appointment</span>
          </button>
        </div>
      </div>
      
      {viewMode === 'list' ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50 text-left">
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Reminder</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {upcomingAppointments.map(appointment => {
                  const contact = getContactDetails(appointment.contactId);
                  
                  return (
                    <tr 
                      key={appointment.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-md mr-3">
                            <Calendar size={16} className="text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{appointment.title}</p>
                            {appointment.description && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {appointment.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {contact && (
                          <div className="flex items-center">
                            <Avatar name={contact.name} imageUrl={contact.avatar} size="sm" />
                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{contact.name}</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm text-gray-900 dark:text-white">{formatDate(appointment.startTime)}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {formatTimeRange(appointment.startTime, appointment.endTime)}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {appointment.location || 'No location'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          appointment.reminderSet 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                          {appointment.reminderSet ? 'Set' : 'Not set'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {upcomingAppointments.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">No upcoming appointments</p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="text-center py-8">
            <Calendar size={48} className="mx-auto text-blue-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Calendar View</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Calendar view would display appointments on a monthly, weekly, or daily calendar
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsView;