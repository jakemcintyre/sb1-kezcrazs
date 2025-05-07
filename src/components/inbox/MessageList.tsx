import React from 'react';
import { useAppContext } from '../../context/AppContext';
import Avatar from '../common/Avatar';
import PlatformIcon from '../common/PlatformIcon';
import { formatDate, getMessageStatusIndicator, truncateText } from '../../utils/formatters';
import { Platform } from '../../types';

interface MessageListProps {
  activeFilter: string;
}

const MessageList: React.FC<MessageListProps> = ({ activeFilter }) => {
  const { messages, contacts, selectedContactId, setSelectedContactId, markMessageAsRead } = useAppContext();

  // Group messages by contactId
  const groupedMessages = messages.reduce((acc, message) => {
    if (!acc[message.contactId]) {
      acc[message.contactId] = [];
    }
    acc[message.contactId].push(message);
    return acc;
  }, {} as Record<string, typeof messages>);
  
  // Get the latest message for each contact
  const latestMessages = Object.entries(groupedMessages).map(([contactId, contactMessages]) => {
    const sortedMessages = [...contactMessages].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    return sortedMessages[0];
  });
  
  // Apply filters
  const filteredMessages = latestMessages.filter(message => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return message.status === 'unread';
    return message.platform === activeFilter as Platform;
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  
  // Get contact details
  const getContactDetails = (contactId: string) => {
    return contacts.find(contact => contact.id === contactId);
  };
  
  // Handle message selection
  const handleSelectMessage = (contactId: string, messageId: string) => {
    setSelectedContactId(contactId);
    if (messageId) {
      markMessageAsRead(messageId);
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 h-full flex flex-col overflow-hidden">
      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
        <input
          type="text"
          placeholder="Search messages..."
          className="w-full px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 border-0 rounded-md 
            focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
        />
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {filteredMessages.length > 0 ? (
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {filteredMessages.map(message => {
              const contact = getContactDetails(message.contactId);
              if (!contact) return null;
              
              const isSelected = selectedContactId === message.contactId;
              const statusIndicator = getMessageStatusIndicator(message.status);
              
              return (
                <div
                  key={message.id}
                  onClick={() => handleSelectMessage(message.contactId, message.id)}
                  className={`flex items-start p-4 cursor-pointer transition-colors duration-200 relative
                    ${isSelected ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                >
                  {message.status === 'unread' && (
                    <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 ${statusIndicator} rounded-r-md`}></span>
                  )}
                  
                  <Avatar name={contact.name} imageUrl={contact.avatar} size="md" />
                  
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-gray-900 dark:text-white truncate">{contact.name}</h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {formatDate(message.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                      {truncateText(message.content, 80)}
                    </p>
                    
                    <div className="flex justify-between items-center mt-2">
                      <PlatformIcon platform={message.platform} />
                      
                      {message.status === 'unread' && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 dark:text-gray-400">No messages found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageList;