import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/authcontext.jsx';
import axios from 'axios';

const Admin = () => {
  const { admin, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [members, setMembers] = useState([]);
  const [leaders, setLeaders] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (admin) {
      fetchData();
    }
  }, [admin]);

  const fetchData = async () => {
    try {
      const [membersRes, leadersRes, eventsRes] = await Promise.all([
        axios.get('/api/members'),
        axios.get('/api/leaders'),
        axios.get('/api/events')
      ]);
      setMembers(membersRes.data);
      setLeaders(leadersRes.data);
      setEvents(eventsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Sample data for demo
      setMembers([
        { _id: 1, name: 'John Doe', email: 'john@example.com', phone: '+254700000001', ministry: 'Worship' },
        { _id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+254700000002', ministry: 'Ushering' }
      ]);
      setLeaders([
        { _id: 1, name: 'Pastor James Kariuki', role: 'Senior Pastor', email: 'pastor@example.com', phone: '+254700000005', bio: 'Leading the church with vision and passion.', ministry: 'Leadership' }
      ]);
      setEvents([
        { _id: 1, title: 'Sunday Service', description: 'Weekly worship service', date: new Date(), time: '9:00 AM', location: 'Main Sanctuary' }
      ]);
    }
  };

  if (!admin) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-xl">Please log in to access the admin panel.</p>
      </div>
    );
  }

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900">Admin Dashboard</h1>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        </div>
  
        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'text-blue-600'}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`px-4 py-2 rounded ${activeTab === 'members' ? 'bg-blue-600 text-white' : 'text-blue-600'}`}
            >
              Members
            </button>
            <button
              onClick={() => setActiveTab('leaders')}
              className={`px-4 py-2 rounded ${activeTab === 'leaders' ? 'bg-blue-600 text-white' : 'text-blue-600'}`}
            >
              Leaders
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`px-4 py-2 rounded ${activeTab === 'events' ? 'bg-blue-600 text-white' : 'text-blue-600'}`}
            >
              Events
            </button>
          </div>
        </div>
  
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'dashboard' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Overview</h2>
              <p className="text-gray-600">Members: {members.length} — Leaders: {leaders.length} — Events: {events.length}</p>
            </div>
          )}
  
          {activeTab === 'members' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Members</h2>
              <ul>
                {members.map((m) => (
                  <li key={m._id} className="py-2 border-b">
                    {m.name} — {m.email}
                  </li>
                ))}
              </ul>
            </div>
          )}
  
          {activeTab === 'leaders' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Leaders</h2>
              <ul>
                {leaders.map((l) => (
                  <li key={l._id} className="py-2 border-b">
                    {l.name} — {l.role}
                  </li>
                ))}
              </ul>
            </div>
          )}
  
          {activeTab === 'events' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Events</h2>
              <ul>
                {events.map((e) => (
                  <li key={e._id} className="py-2 border-b">
                    {e.title} — {e.date ? new Date(e.date).toLocaleDateString() : 'N/A'}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default Admin;