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
  const [selected, setSelected] = useState<number | null>(null);

  const conversations = [
    {
      id: 1,
      name: 'Client A',
      messages: [
        { from: 'them', text: 'Hey, are you available tomorrow?' },
        { from: 'me', text: 'Yes! What time works for you?' },
      ],
    },
    {
      id: 2,
      name: 'Facebook Lead',
      messages: [
        { from: 'them', text: 'Thanks for the quote!' },
        { from: 'me', text: 'Let me know if you have any questions.' },
      ],
    },
  ];

  const selectedConv = conversations.find((c) => c.id === selected);

  return (
    <div className="flex flex-col h-full">
      {!selectedConv ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">Messages</h2>
          <ul className="space-y-3">
            {conversations.map((conv) => (
              <li
                key={conv.id}
                onClick={() => setSelected(conv.id)}
                className="bg-white p-4 rounded shadow hover:bg-gray-100 cursor-pointer"
              >
                <h3 className="font-bold">{conv.name}</h3>
                <p className="text-gray-700">{conv.messages[0].text}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex flex-col flex-1">
          <button
            onClick={() => setSelected(null)}
            className="text-sm text-blue-500 mb-2 underline"
          >
            ← Back to messages
          </button>
          <h2 className="text-xl font-semibold mb-2">{selectedConv.name}</h2>
          <div className="flex-1 overflow-y-auto space-y-2 mb-4">
            {selectedConv.messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded max-w-xs ${
                  msg.from === 'me'
                    ? 'bg-blue-500 text-white self-end ml-auto'
                    : 'bg-gray-200 text-gray-900 self-start'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 p-2 border rounded-l"
            />
            <button className="bg-blue-600 text-white px-4 rounded-r">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
