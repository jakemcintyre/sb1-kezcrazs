import React from 'react';
import { useAppContext } from '../../context/AppContext';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import PlatformIcon from '../common/PlatformIcon';
import { formatDate, getLeadStatusColor, getPriorityColor } from '../../utils/formatters';
import { Calendar, CheckSquare, MessageSquare, Plus, Search, UserPlus } from 'lucide-react';

const ContactsView: React.FC = () => {
  const { contacts, messages, appointments, reminders, setSelectedContactId } = useAppContext();
  
  const sortedContacts = [...contacts].sort((a, b) => {
    // Sort by lead status priority
    const statusPriority = { new: 0, contacted: 1, qualified: 2, negotiating: 3, closed: 4, lost: 5 };
    return statusPriority[a.leadStatus as keyof typeof statusPriority] - statusPriority[b.leadStatus as keyof typeof statusPriority];
  });
  
  const getContactMetrics = (contactId: string) => {
    const unreadMessages = messages.filter(m => m.contactId === contactId && m.status === 'unread').length;
    const upcomingAppointments = appointments.filter(a => a.contactId === contactId && new Date(a.startTime) > new Date()).length;
    const pendingReminders = reminders.filter(r => r.contactId === contactId && !r.completed).length;
    
    return { unreadMessages, upcomingAppointments, pendingReminders };
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Contacts</h1>
        
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200">
          <UserPlus size={16} />
          <span>Add Contact</span>
        </button>
      </div>
      
      <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg p-2 shadow-sm">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search contacts..."
            className="w-full py-2 pl-10 pr-4 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 
              border-0 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50 text-left">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Platforms</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Contact</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Activity</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {sortedContacts.map(contact => {
                const { unreadMessages, upcomingAppointments, pendingReminders } = getContactMetrics(contact.id);
                const leadStatusClass = getLeadStatusColor(contact.leadStatus);
                const priorityClass = getPriorityColor(contact.priority);
                
                return (
                  <tr 
                    key={contact.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Avatar name={contact.name} imageUrl={contact.avatar} size="md" />
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{contact.name}</p>
                          {contact.notes && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-xs truncate">
                              {contact.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge text={contact.leadStatus} className={leadStatusClass} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge text={contact.priority} className={priorityClass} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-1">
                        {contact.platforms.map(platform => (
                          <PlatformIcon key={platform} platform={platform} />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {contact.lastContact ? formatDate(contact.lastContact) : 'Never'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-3">
                        {unreadMessages > 0 && (
                          <div className="flex items-center text-sm">
                            <MessageSquare size={14} className="text-blue-500 mr-1" />
                            <span>{unreadMessages}</span>
                          </div>
                        )}
                        {upcomingAppointments > 0 && (
                          <div className="flex items-center text-sm">
                            <Calendar size={14} className="text-purple-500 mr-1" />
                            <span>{upcomingAppointments}</span>
                          </div>
                        )}
                        {pendingReminders > 0 && (
                          <div className="flex items-center text-sm">
                            <CheckSquare size={14} className="text-green-500 mr-1" />
                            <span>{pendingReminders}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button 
                        onClick={() => setSelectedContactId(contact.id)}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContactsView;