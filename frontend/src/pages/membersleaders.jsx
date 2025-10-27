import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MembersLeaders = () => {
  const [members, setMembers] = useState([]);
  const [leaders, setLeaders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [ministryFilter, setMinistryFilter] = useState('');

  useEffect(() => {
    fetchMembers();
    fetchLeaders();
  }, []);

  const fetchMembers = async () => {
    try {
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (ministryFilter) params.ministry = ministryFilter;
      
      const res = await axios.get('http://localhost:5000/api/members', { params }); // ← FIXED
      setMembers(res.data);
    } catch (error) {
      console.error('Error fetching members:', error);
      // Sample data for demo
      setMembers([
        { _id: 1, name: 'John Doe', email: 'john@example.com', phone: '+254700000001', ministry: 'Worship' },
        { _id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+254700000002', ministry: 'Ushering' },
        { _id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '+254700000003', ministry: 'Media' },
        { _id: 4, name: 'Sarah Williams', email: 'sarah@example.com', phone: '+254700000004', ministry: 'Children' }
      ]);
    }
  };

  const fetchLeaders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/leaders'); // ← FIXED
      setLeaders(res.data);
    } catch (error) {
      console.error('Error fetching leaders:', error);
      // Sample data for demo
      setLeaders([
        { _id: 1, name: 'Pastor James Kariuki', role: 'Senior Pastor', email: 'pastor@example.com', phone: '+254700000005', bio: 'Leading the church with vision and passion.', ministry: 'Leadership' },
        { _id: 2, name: 'Elder Mary Wanjiku', role: 'Elder', email: 'mary@example.com', phone: '+254700000006', bio: 'Serving the congregation with wisdom and grace.', ministry: 'Leadership' },
        { _id: 3, name: 'Deacon Peter Maina', role: 'Deacon', email: 'peter@example.com', phone: '+254700000007', bio: 'Overseeing church operations and outreach.', ministry: 'Administration' }
      ]);
    }
  };

  const ministries = ['Worship', 'Ushering', 'Media', 'Children', 'Youth', 'Prayer', 'Evangelism', 'Hospitality'];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12 text-blue-900">Our Church Family</h1>
      
      {/* Search and Filter */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <select
              value={ministryFilter}
              onChange={(e) => setMinistryFilter(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Ministries</option>
              {ministries.map(ministry => (
                <option key={ministry} value={ministry}>{ministry}</option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={fetchMembers}
          className="mt-4 bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition duration-300"
        >
          Apply Filters
        </button>
      </div>

      {/* Leaders Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Church Leadership</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leaders.map(leader => (
            <div key={leader._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <div className="text-6xl">👨‍💼</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-blue-900">{leader.name}</h3>
                <p className="text-blue-700 font-medium mb-3">{leader.role}</p>
                <p className="text-gray-600 text-sm mb-4">{leader.bio}</p>
                <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full inline-block">
                  {leader.ministry}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Members Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Church Members</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Ministry</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Phone</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Email</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {members.map(member => (
                  <tr key={member._id} className="hover:bg-gray-50 transition duration-300">
                    <td className="px-6 py-4 font-medium text-gray-900">{member.name}</td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                        {member.ministry}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{member.phone}</td>
                    <td className="px-6 py-4 text-gray-600">{member.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MembersLeaders;