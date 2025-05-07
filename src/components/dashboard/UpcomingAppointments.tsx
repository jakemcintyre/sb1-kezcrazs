import React from 'react';
import { Calendar } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { formatDate, getDaysFromToday, getDueStatusColor } from '../../utils/formatters';
import Avatar from '../common/Avatar';

const UpcomingAppointments: React.FC = () => {
  const { appointments, contacts } = useAppContext();
  
  const upcomingAppointments = [...appointments]
    .filter(appointment => new Date(appointment.startTime) > new Date())
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
    .slice(0, 3);
  
  const getContactDetails = (contactId: string) => {
    return contacts.find(contact => contact.id === contactId);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
      <h2 className="font-semibold text-lg text-gray-800 dark:text-white mb-4">Upcoming Appointments</h2>
      
      {upcomingAppointments.length > 0 ? (
        <div className="space-y-4">
          {upcomingAppointments.map(appointment => {
            const contact = getContactDetails(appointment.contactId);
            const daysAway = getDaysFromToday(appointment.startTime);
            const dueColor = getDueStatusColor(appointment.startTime);
            
            return (
              <div key={appointment.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-md">
                  <Calendar size={20} className="text-blue-600 dark:text-blue-400" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-900 dark:text-white">{appointment.title}</h3>
                    <span className={`text-xs font-medium ${dueColor}`}>
                      {daysAway === 0 ? 'Today' : daysAway === 1 ? 'Tomorrow' : `In ${daysAway} days`}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {formatDate(appointment.startTime)}
                  </p>
                  
                  {contact && (
                    <div className="flex items-center mt-2">
                      <Avatar name={contact.name} imageUrl={contact.avatar} size="sm" />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{contact.name}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">No upcoming appointments</p>
      )}
    </div>
  );
};

export default UpcomingAppointments;