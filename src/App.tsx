import React, { useState } from 'react';

export default function App() {
  const [page, setPage] = useState('dashboard');

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return <Dashboard />;
      case 'messages':
        return <Messages />;
      case 'contacts':
        return <Contacts />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col p-4">
        <div className="flex items-center space-x-2 mb-6">
          <span className="text-yellow-400 text-2xl">👑</span>
          <h1 className="text-2xl font-bold tracking-wide">ChatKing</h1>
        </div>
        <nav className="flex flex-col space-y-2">
          <button onClick={() => setPage('dashboard')} className="text-left hover:bg-blue-800 p-2 rounded">Dashboard</button>
          <button onClick={() => setPage('messages')} className="text-left hover:bg-blue-800 p-2 rounded">Messages</button>
          <button onClick={() => setPage('contacts')} className="text-left hover:bg-blue-800 p-2 rounded">Contacts</button>
          <button onClick={() => setPage('settings')} className="text-left hover:bg-blue-800 p-2 rounded">Settings</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        {renderPage()}
      </main>
    </div>
  );
}

// Page Components
const Dashboard = () => (
  <div>
    <h2 className="text-xl font-semibold mb-2">Welcome to ChatKing</h2>
    <p>This is your dashboard. KingBot will give updates here.</p>
  </div>
);

const Messages = () => {
  const conversations = [
    { id: 1, name: 'Client A', lastMessage: 'Are you available tomorrow?', time: '2h ago' },
    { id: 2, name: 'Facebook Lead', lastMessage: 'Thanks for the quote!', time: '5h ago' },
    { id: 3, name: 'Instagram DM', lastMessage: 'Is this unit in stock?', time: '1d ago' },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Messages</h2>
      <ul className="space-y-3">
        {conversations.map((conv) => (
          <li key={conv.id} className="bg-white p-4 rounded shadow hover:bg-gray-100 transition cursor-pointer">
            <div className="flex justify-between">
              <h3 className="font-bold">{conv.name}</h3>
              <span className="text-sm text-gray-400">{conv.time}</span>
            </div>
            <p className="text-gray-700">{conv.lastMessage}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
