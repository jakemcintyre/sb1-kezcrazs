import React from 'react';
import { Bell, Menu, Moon, Search, Sun } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { isDarkMode, toggleDarkMode } = useAppContext();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 px-4 flex items-center justify-between fixed top-0 left-0 right-0 z-10 transition-colors duration-200">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700 lg:hidden"
        >
          <Menu size={20} />
        </button>
        
        <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400 ml-2 hidden sm:block">MessageHub</h1>
      </div>
      
      <div className="w-1/3 hidden md:block">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search messages, contacts, appointments..."
            className="w-full py-2 pl-10 pr-4 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 
              border-0 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 
          text-gray-700 dark:text-gray-300 transition-colors duration-200 relative">
          <Bell size={18} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 
            text-gray-700 dark:text-gray-300 transition-colors duration-200"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
          ME
        </div>
      </div>
    </header>
  );
};

export default Header;