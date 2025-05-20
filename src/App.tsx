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
import { motion } from 'framer-motion';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <motion.h2
        className="text-3xl font-bold"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome back, King!
      </motion.h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: 'New Leads', value: '12', color: 'bg-green-500' },
          { title: 'Active Chats', value: '5', color: 'bg-blue-500' },
          { title: 'Tasks Today', value: '7', color: 'bg-yellow-500' },
        ].map((card, i) => (
          <motion.div
            key={i}
            className={`rounded-xl p-6 text-white shadow-lg ${card.color}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <h3 className="text-xl font-semibold">{card.title}</h3>
            <p className="text-3xl mt-2">{card.value}</p>
          </motion.div>
        ))}
      </div>

      {/* KingBot Overview */}
      <motion.div
        className="bg-white rounded-xl shadow p-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
      >
        <h3 className="text-xl font-bold mb-2">KingBot’s Daily Summary</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>2 high-priority leads to follow up</li>
          <li>3 chats flagged as sales opportunities</li>
          <li>1 scheduled reminder for 4 PM call</li>
        </ul>
      </motion.div>

      {/* Animated Footer */}
      <motion.p
        className="text-center text-sm text-gray-400 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        Powered by KingBot AI – always watching, always helping.
      </motion.p>
    </div>
  );
};

const Messages = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [reply, setReply] = useState('');
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: 'Client A',
      messages: [
        { from: 'them', text: 'Hey, are you available tomorrow?', time: '9:12 AM' },
        { from: 'me', text: 'Yes! What time works for you?', time: '9:14 AM' },
      ],
    },
    {
      id: 2,
      name: 'Facebook Lead',
      messages: [
        { from: 'them', text: 'Thanks for the quote!', time: '8:03 AM' },
        { from: 'me', text: 'Let me know if you have any questions.', time: '8:07 AM' },
      ],
    },
  ]);

  const selectedConv = conversations.find((c) => c.id === selected);

  const handleSend = () => {
    if (!reply.trim() || selected === null) return;

    const updated = conversations.map((conv) => {
      if (conv.id === selected) {
        return {
          ...conv,
          messages: [
            ...conv.messages,
            { from: 'me', text: reply.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
          ],
        };
      }
      return conv;
    });

    setConversations(updated);
    setReply('');
  };

  return (
    <div className="flex flex-col h-full">
      {!selectedConv ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Messages</h2>
          <ul className="space-y-3">
            {conversations.map((conv) => (
              <li
                key={conv.id}
                onClick={() => setSelected(conv.id)}
                className="bg-white p-4 rounded-lg shadow hover:bg-gray-100 transition cursor-pointer"
              >
                <h3 className="text-lg font-semibold">{conv.name}</h3>
                <p className="text-gray-600 truncate">{conv.messages[0].text}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setSelected(null)}
              className="text-sm text-blue-600 underline"
            >
              ← Back
            </button>
            <h2 className="text-xl font-semibold">{selectedConv.name}</h2>
            <div />
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 mb-4 p-2 rounded bg-white shadow-inner">
            {selectedConv.messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[75%] p-3 rounded-xl shadow-sm ${
                  msg.from === 'me'
                    ? 'bg-blue-500 text-white ml-auto'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <span className="block text-[10px] text-right text-gray-300 mt-1">
                  {msg.time}
                </span>
              </div>
            ))}
          </div>

          <div className="flex border rounded overflow-hidden">
            <input
              type="text"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 outline-none"
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-4 font-semibold"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
