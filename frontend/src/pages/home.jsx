import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchEvents();
    fetchAnnouncements();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/events'); // ← FIXED
      setEvents(res.data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching events:', error);
      // Sample data for demo
      setEvents([
        { _id: 1, title: 'Sunday Service', description: 'Join us for worship and teaching', date: new Date(), time: '9:00 AM' },
        { _id: 2, title: 'Prayer Meeting', description: 'Wednesday night prayer', date: new Date(), time: '6:00 PM' },
        { _id: 3, title: 'Youth Fellowship', description: 'Youth gathering and activities', date: new Date(), time: '4:00 PM' }
      ]);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/announcements'); // ← ADDED if you have this endpoint
      setAnnouncements(res.data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching announcements:', error);
      // Sample data for demo
      setAnnouncements([
        { id: 1, title: 'Sunday Service', description: 'Join us this Sunday at 9:00 AM' },
        { id: 2, title: 'Prayer Meeting', description: 'Wednesday Prayer Meeting at 6:00 PM' },
        { id: 3, title: 'Bible Study', description: 'New members Bible study starting soon' }
      ]);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-900 text-white">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold mb-4">Every Nation Church Nairobi</h1>
          <p className="text-xl mb-8">Making disciples, transforming nations</p>
          <Link 
            to="/about" 
            className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
          >
            Visit Us
          </Link>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Announcements & Events</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map(event => (
              <div key={event._id} className="bg-gray-50 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="text-sm text-blue-700">
                  {new Date(event.date).toLocaleDateString()} • {event.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Get Connected</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="text-4xl mb-4">🙏</div>
              <h3 className="text-xl font-semibold mb-3">Join Our Services</h3>
              <p className="text-gray-600">Experience uplifting worship and biblical teaching</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-3">Meet Our Community</h3>
              <p className="text-gray-600">Connect with believers and grow together</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold mb-3">Serve With Us</h3>
              <p className="text-gray-600">Discover opportunities to serve in various ministries</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;