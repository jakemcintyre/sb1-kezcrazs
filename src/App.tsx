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
          <button
