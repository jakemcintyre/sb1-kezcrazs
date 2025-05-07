import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import Avatar from '../common/Avatar';
import { formatDate, getLeadStatusColor, getPriorityColor } from '../../utils/formatters';
import PlatformIcon from '../common/PlatformIcon';
import { Calendar, CheckSquare, Clock, Info, Phone, SendHorizontal } from 'lucide-react';
import Badge from '../common/Badge';

interface MessageDetailProps {
  contactId: string;
}

const MessageDetail: React.FC<MessageDetailProps> = ({ contactId }) => {
  const { contacts, messages, appointments, reminders } = useAppContext();
  const [newMessage, setNewMessage] = useState('');
  
  const contact = contacts.find(c => c.id === contactId);
  
  if (!contact) {
    return (
      <div className="h-full flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg">
        <p className="text-gray-500 dark:text-gray-400">Contact not found</p>
      </div>
    );
  }
  
  const contactMessages = messages
    .filter(m => m.contactId === contactId)
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  
  const contactAppointments = appointments
    .filter(a => a.contactId === contactId)
    .filter(a => new Date(a.startTime) > new Date())
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  
  const contactReminders = reminders
    .filter(r => r.contactId === contactId && !r.completed)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  
  const leadStatusClass = getLeadStatusColor(contact.leadStatus);
  const priorityClass = getPriorityColor(contact.priority);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would actually send the message here
    setNewMessage('');
  };
  
  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Avatar name={contact.name} imageUrl={contact.avatar} size="md" />
          <div className="ml-3">
            <h2 className="font-semibold text-gray-900 dark:text-white">{contact.name}</h2>
            <div className="flex items-center space-x-2 mt-1">
              <Badge text={contact.leadStatus} className={leadStatusClass} />
              <Badge text={contact.priority} className={priorityClass} />
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300">
            <Phone size={16} />
          </button>
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300">
            <Calendar size={16} />
          </button>
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300">
            <Info size={16} />
          </button>
        </div>
      </div>
      
      <div className="p-4 bg-gray-50 dark:bg-gray-700/30">
        <div className="flex flex-wrap gap-2">
          {contact.platforms.map(platform => (
            <div key={platform} className="flex items-center bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700">
              <PlatformIcon platform={platform} />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">{platform}</span>
            </div>
          ))}
          
          {contactAppointments.length > 0 && (
            <div className="flex items-center bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700">
              <Calendar size={14} className="text-blue-600" />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {contactAppointments.length} upcoming
              </span>
            </div>
          )}
          
          {contactReminders.length > 0 && (
            <div className="flex items-center bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700">
              <CheckSquare size={14} className="text-green-600" />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {contactReminders.length} to-do
              </span>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
        <div className="space-y-4">
          {contactMessages.map(message => {
            const isOutgoing = message.isOutgoing;
            
            return (
              <div key={message.id} className={`flex ${isOutgoing ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] ${
                  isOutgoing 
                    ? 'bg-blue-600 text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg' 
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-lg rounded-tr-lg rounded-br-lg border border-gray-200 dark:border-gray-700'
                } p-3 shadow-sm`}>
                  <p className="text-sm">{message.content}</p>
                  <div className={`flex items-center justify-end mt-1 text-xs ${
                    isOutgoing ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    <Clock size={10} className="mr-1" />
                    <span>{formatDate(message.timestamp)}</span>
                    <PlatformIcon platform={message.platform} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-md 
              focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition-colors duration-200 
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SendHorizontal size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageDetail;