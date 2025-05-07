import React from 'react';
import { useAppContext } from '../../context/AppContext';
import Avatar from '../common/Avatar';
import PlatformIcon from '../common/PlatformIcon';
import { formatDate, truncateText } from '../../utils/formatters';

const RecentMessages: React.FC = () => {
  const { messages, contacts, markMessageAsRead, setSelectedContactId } = useAppContext();
  
  const sortedMessages = [...messages]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);
  
  const getContactDetails = (contactId: string) => {
    return contacts.find(contact => contact.id === contactId);
  };
  
  const handleMessageClick = (messageId: string, contactId: string) => {
    markMessageAsRead(messageId);
    setSelectedContactId(contactId);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
      <h2 className="font-semibold text-lg text-gray-800 dark:text-white mb-4">Recent Messages</h2>
      
      <div className="space-y-3">
        {sortedMessages.map(message => {
          const contact = getContactDetails(message.contactId);
          if (!contact) return null;
          
          return (
            <div 
              key={message.id}
              onClick={() => handleMessageClick(message.id, message.contactId)}
              className={`flex items-start p-3 rounded-lg cursor-pointer transition-colors duration-200
                ${message.status === 'unread' ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
            >
              <Avatar name={contact.name} imageUrl={contact.avatar} size="md" />
              
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900 dark:text-white">{contact.name}</h3>
                  <div className="flex items-center">
                    <PlatformIcon platform={message.platform} />
                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(message.timestamp)}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {truncateText(message.content, 80)}
                </p>
                
                {message.status === 'unread' && (
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-1"></span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 text-center">
        <button 
          onClick={() => setSelectedContactId(null)}
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
        >
          View All Messages
        </button>
      </div>
    </div>
  );
};

export default RecentMessages;