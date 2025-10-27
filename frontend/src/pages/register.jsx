import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    ministry: '',
    role: 'member', // 'member' or 'leader'
    bio: '',
    position: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const ministries = [
    'Worship', 'Ushering', 'Media', 'Children', 
    'Youth', 'Prayer', 'Evangelism', 'Hospitality', 'Administration'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      let endpoint = '';
      let data = {};

      if (formData.role === 'member') {
        endpoint = '/api/members';
        data = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          ministry: formData.ministry
        };
      } else {
        endpoint = '/api/leaders';
        data = {
          name: formData.name,
          role: formData.position || 'Leader',
          email: formData.email,
          phone: formData.phone,
          bio: formData.bio,
          ministry: formData.ministry
        };
      }

      await axios.post(endpoint, data);
      setMessage(`Successfully registered as ${formData.role}! We will contact you soon.`);
      setFormData({
        name: '',
        email: '',
        phone: '',
        ministry: '',
        role: 'member',
        bio: '',
        position: ''
      });
    } catch (error) {
      console.error('Registration error:', error);
      setMessage(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-blue-900 mb-4">Join Our Church Family</h1>
              <p className="text-gray-600">Register as a member or leader to get connected</p>
            </div>

            {message && (
              <div className={`mb-6 p-4 rounded-lg ${
                message.includes('Successfully') 
                  ? 'bg-green-100 text-green-700 border border-green-300' 
                  : 'bg-red-100 text-red-700 border border-red-300'
              }`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  I want to register as:
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value="member"
                      checked={formData.role === 'member'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Church Member
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value="leader"
                      checked={formData.role === 'leader'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Church Leader
                  </label>
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+254700000000"
                  />
                </div>

                <div>
                  <label htmlFor="ministry" className="block text-sm font-medium text-gray-700 mb-2">
                    Ministry Interest *
                  </label>
                  <select
                    id="ministry"
                    name="ministry"
                    required
                    value={formData.ministry}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Ministry</option>
                    {ministries.map(ministry => (
                      <option key={ministry} value={ministry}>{ministry}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Leader-specific fields */}
              {formData.role === 'leader' && (
                <>
                  <div>
                    <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                      Position/Role *
                    </label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      required={formData.role === 'leader'}
                      value={formData.position}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Small Group Leader, Worship Team Member"
                    />
                  </div>

                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                      Brief Bio/Experience
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows="4"
                      value={formData.bio}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tell us about your experience and passion for ministry..."
                    ></textarea>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
              >
                {loading ? 'Registering...' : 'Register Now'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already registered?{' '}
                <Link to="/members-leaders" className="text-blue-900 hover:underline">
                  View our directory
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;