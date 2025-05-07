import React from 'react';
import { CheckSquare } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { getDaysFromToday, getDueStatusColor, getPriorityColor, truncateText } from '../../utils/formatters';

const PendingReminders: React.FC = () => {
  const { reminders, toggleReminderComplete } = useAppContext();
  
  const pendingReminders = [...reminders]
    .filter(reminder => !reminder.completed)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
      <h2 className="font-semibold text-lg text-gray-800 dark:text-white mb-4">Pending Reminders</h2>
      
      {pendingReminders.length > 0 ? (
        <div className="space-y-3">
          {pendingReminders.map(reminder => {
            const daysAway = getDaysFromToday(reminder.dueDate);
            const dueColor = getDueStatusColor(reminder.dueDate);
            const priorityClass = getPriorityColor(reminder.priority);
            
            return (
              <div key={reminder.id} className="flex items-start space-x-3 border-b border-gray-100 dark:border-gray-700 pb-3 last:border-0">
                <button 
                  onClick={() => toggleReminderComplete(reminder.id)}
                  className="w-5 h-5 rounded-md border-2 border-blue-500 flex-shrink-0 mt-0.5 transition-colors hover:bg-blue-50 dark:hover:bg-blue-900/20"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {truncateText(reminder.title, 50)}
                    </h3>
                    <span className={`text-xs ${dueColor} ml-2`}>
                      {daysAway < 0 
                        ? `${Math.abs(daysAway)} days overdue` 
                        : daysAway === 0 
                          ? 'Due today' 
                          : daysAway === 1 
                            ? 'Due tomorrow' 
                            : `Due in ${daysAway} days`}
                    </span>
                  </div>
                  
                  {reminder.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {truncateText(reminder.description, 60)}
                    </p>
                  )}
                  
                  <div className="mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${priorityClass}`}>
                      {reminder.priority.charAt(0).toUpperCase() + reminder.priority.slice(1)} Priority
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">No pending reminders</p>
      )}
      
      <div className="mt-4 text-center">
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
          View All Reminders
        </button>
      </div>
    </div>
  );
};

export default PendingReminders;