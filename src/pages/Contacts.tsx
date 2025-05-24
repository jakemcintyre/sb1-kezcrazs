import React from 'react';
import { useAppContext } from '../../context/AppContext';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import PlatformIcon from '../common/PlatformIcon';
import { formatDate, getLeadStatusColor, getPriority } from '../../utils/helpers';
import { Calendar, CheckSquare, MessageSquare, Plus } from 'lucide-react';

const mockContacts = [
  {
    id: '1',
    name: 'Jane Doe',
    platform: 'Facebook',
    status: 'new',
    lastMessage: 'Interested in a 12K mini-split.',
    date: '2025-05-20',
  },
  {
    id: '2',
    name: 'John Smith',
    platform: 'WhatsApp',
    status: 'follow-up',
    lastMessage: 'Wants delivery by Friday.',
    date: '2025-05-19',
  },
];

const ContactsPage: React.FC = () => {
  return (
    <div className="p-4 space-y-4 text-white">
      <h1 className="text-2xl font-bold text-blue-900">Contacts</h1>
      {mockContacts.map((contact) => (
        <div key={contact.id} className="bg-white p-4 rounded-lg shadow">
          <p className="text-lg font-semibold">{contact.name}</p>
          <p className="text-sm text-gray-500">{contact.platform}</p>
          <p className="text-sm">{contact.lastMessage}</p>
          <p className="text-xs text-gray-400">{contact.date}</p>
        </div>
      ))}
    </div>
  );
};

export default ContactsPage;
