import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactsPage from './pages/Contacts';

function App() {
  return (
    <Router>
      <div className="h-screen flex">
        {/* Sidebar */}
        <aside className="w-64 bg-blue-900 text-white p-4">
          <img src="/chatking-logo.png" alt="ChatKing Logo" className="w-10 h-auto mb-4" />
          <div className="flex items-center space-x-2">
            <span className="text-yellow-400 text-2xl">👑</span>
            <h1 className="text-2xl font-bold tracking-tight">ChatKing</h1>
          </div>
          <nav className="flex flex-col space-y-2 mt-6">
            <a href="/" className="hover:bg-blue-800 px-4 py-2">Dashboard</a>
            <a href="/contacts" className="hover:bg-blue-800 px-4 py-2">Contacts</a>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<h1 className="text-3xl font-bold">Welcome to ChatKing Dashboard</h1>} />
            <Route path="/contacts" element={<ContactsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default ContactsPage;
