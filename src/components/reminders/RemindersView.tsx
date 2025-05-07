import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import Avatar from '../common/Avatar';
import { formatDate, getDueStatusColor, getPriorityColor } from '../../utils/formatters';
import { Calendar, CheckSquare, Clock, Filter, Plus } from 'lucide-react';

const RemindersView: React.FC = () => {
  const { reminders, contacts, toggleReminderComplete } = useAppContext();
  const [showCompleted, setShowCompleted] = useState(false);
  
  const filteredReminders = [...reminders]
    .filter(reminder => showCompleted || !reminder.completed)
    .sort((a, b) => {
      // First by completion status
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      // Then by due date
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  
  const getContactDetails = (contactId: string | undefined) => {
    if (!contactId) return null;
    return contacts.find(contact => contact.id === contactId);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Reminders</h1>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowCompleted(!showCompleted)}
            className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white
              bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-3 py-1.5"
          >
            <Filter size={16} />
            <span>{showCompleted ? 'Hide Completed' : 'Show Completed'}</span>
          </button>
          
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200">
            <Plus size={16} />
            <span>New Reminder</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredReminders.map(reminder => {
          const contact = getContactDetails(reminder.contactId);
          const dueColor = getDueStatusColor(reminder.dueDate);
          const priorityClass = getPriorityColor(reminder.priority);
          
          return (
            <div 
              key={reminder.id}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border-l-4 ${
                reminder.completed 
                  ? 'border-gray-300 dark:border-gray-600' 
                  : dueColor.includes('red') 
                    ? 'border-red-500' 
                    : dueColor.includes('amber') 
                      ? 'border-amber-500' 
                      : dueColor.includes('orange') 
                        ? 'border-orange-500' 
                        : 'border-green-500'
              }`}
            >
              <div className="flex items-start space-x-3">
                <button 
                  onClick={() => toggleReminderComplete(reminder.id)}
                  className={`mt-1 w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-colors ${
                    reminder.completed 
                      ? 'bg-green-500 text-white' 
                      : 'border-2 border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                  }`}
                >
                  {reminder.completed && <CheckSquare size={14} />}
                </button>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className={`font-medium text-gray-900 dark:text-white ${reminder.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
                      {reminder.title}
                    </h3>
                    <span className={`text-xs font-medium ${reminder.completed ? 'text-gray-500 dark:text-gray-400' : dueColor}`}>
                      {formatDate(reminder.dueDate)}
                    </span>
                  </div>
                  
                  {reminder.description && (
                    <p className={`text-sm mt-1 ${
                      reminder.completed ? 'text-gray-400 dark:text-gray-500 line-through' : 'text-gray-600 dark:text-gray-300'
                    }`}>
                      {reminder.description}
                    </p>
                  )}
                  
                  <div className="flex justify-between items-center mt-3">
                    <div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        reminder.completed 
                          ? 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400' 
                          : priorityClass
                      }`}>
                        {reminder.priority.charAt(0).toUpperCase() + reminder.priority.slice(1)}
                      </span>
                    </div>
                    
                    {contact && (
                      <div className="flex items-center">
                        <Avatar name={contact.name} imageUrl={contact.avatar} size="sm" />
                        <span className="ml-2 text-xs text-gray-600 dark:text-gray-400">{contact.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {filteredReminders.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
          <CheckSquare size={48} className="mx-auto text-blue-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No reminders found</h3>
          <p className="text-gray-500 dark:text-gray-400">
            {showCompleted 
              ? "You don't have any reminders yet" 
              : "You've completed all your reminders!"}
          </p>
        </div>
      )}
    </div>
  );
};

export default RemindersView;