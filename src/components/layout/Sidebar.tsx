import React from 'react';
import { 
  Calendar, 
  CheckSquare, 
  Home, 
  MessageSquare, 
  Users, 
  BarChart3, 
  Settings
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  activePage: string;
  setActivePage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, activePage, setActivePage }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'inbox', label: 'Inbox', icon: MessageSquare, badge: 3 },
    { id: 'contacts', label: 'Contacts', icon: Users },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'reminders', label: 'Reminders', icon: CheckSquare, badge: 2 },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div 
      className={`${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed inset-y-0 left-0 z-20 w-64 bg-white dark:bg-gray-900 shadow-lg transform 
        transition-transform duration-200 ease-in-out lg:translate-x-0 pt-20`}
    >
      <div className="flex flex-col h-full">
        <nav className="flex-1 px-2 py-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex items-center w-full px-4 py-3 text-left rounded-lg transition-colors duration-200 
                ${
                  activePage === item.id
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
            >
              <item.icon size={18} className="mr-3" />
              <span className="font-medium">{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                ME
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Your Name</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Business Owner</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;