import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import MessageList from './MessageList';
import MessageDetail from './MessageDetail';
import { Filter } from 'lucide-react';

const InboxView: React.FC = () => {
  const { selectedContactId } = useAppContext();
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const filterOptions = [
    { id: 'all', label: 'All Messages' },
    { id: 'unread', label: 'Unread' },
    { id: 'facebook', label: 'Facebook' },
    { id: 'instagram', label: 'Instagram' },
    { id: 'linkedin', label: 'LinkedIn' },
    { id: 'google', label: 'Google Business' }
  ];

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Inbox</h1>
        
        <div className="relative">
          <button 
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white
              bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-3 py-1.5"
          >
            <Filter size={16} />
            <span>Filter</span>
          </button>
          
          {filterOpen && (
            <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 
              border border-gray-200 dark:border-gray-700 py-1">
              {filterOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => {
                    setActiveFilter(option.id);
                    setFilterOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    activeFilter === option.id
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100%-50px)]">
        <div className="lg:col-span-1 h-full overflow-hidden flex flex-col">
          <MessageList activeFilter={activeFilter} />
        </div>
        
        <div className="lg:col-span-2 h-full overflow-hidden">
          {selectedContactId ? (
            <MessageDetail contactId={selectedContactId} />
          ) : (
            <div className="h-full flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageList size={24} className="text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">No conversation selected</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Select a conversation from the list to view the messages
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InboxView;