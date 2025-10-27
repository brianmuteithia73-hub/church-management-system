import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authcontext.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import Navbar from './components/navbar.jsx';
import Footer from './components/footer.jsx';

// Import pages
import Home from './pages/home.jsx';
import Mission from './pages/mission.jsx';
import About from './pages/about.jsx';
import MembersLeaders from './pages/membersleaders.jsx';
import Admin from './pages/admin.jsx';
import Login from './pages/login.jsx';
import Register from './pages/register.jsx';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/mission" element={<Mission />} />
                <Route path="/about" element={<About />} />
                <Route path="/members-leaders" element={<MembersLeaders />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;