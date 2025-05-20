import React from 'react';

export default function App() {
  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col p-4">
        {<img
  src="/chatking-logo.png"
  alt="ChatKing Logo"
  className="w-40 h-auto mb-6"
/>}
        <div className="flex items-center space-x-2 mb-6">
          <span className="text-yellow-400 text-2xl">👑</span>
          <h1 className="text-2xl font-bold tracking-wide">ChatKing</h1>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-2">
          <a href="#" className="hover:bg-blue-800 p-2 rounded">Dashboard</a>
          <a href="#" className="hover:bg-blue-800 p-2 rounded">Messages</a>
          <a href="#" className="hover:bg-blue-800 p-2 rounded">Contacts</a>
          <a href="#" className="hover:bg-blue-800 p-2 rounded">Settings</a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-50 text-gray-800">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Welcome, King!</h2>
          <button className="bg-yellow-400 text-black px-4 py-2 rounded shadow hover:bg-yellow-500">
            New Message
          </button>
        </header>

        <section className="p-6">
          <h3 className="text-lg font-bold mb-2">Today's Overview</h3>
          <p>This is where KingBot will post your daily summary, task list, and leads.</p>
        </section>
      </main>
    </div>
  );
}
