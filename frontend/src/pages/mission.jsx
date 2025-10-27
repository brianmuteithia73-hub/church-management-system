import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Mission = () => {
  const [missionData, setMissionData] = useState(null);

  useEffect(() => {
    fetchMissionData();
  }, []);

  const fetchMissionData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/mission'); // ← FIXED THIS LINE
      setMissionData(res.data);
    } catch (error) {
      console.error('Error fetching mission data:', error);
      // Sample data for demo
      setMissionData({
        vision: 'To reach as many campus student as possible in order to make our world a better place to be as young christians.',
        mission: 'We exist to love and honour God, love people, make deciples who will in  turn transform society.',
        values: [
          {
            title: 'Christ-Centered',
            description: 'We place Christ at the center of everything we do.'
          },
          {
            title: 'Spirit-Empowered',
            description: 'We rely on the Holy Spirit for guidance and power.'
          },
          {
            title: 'Socially Responsible',
            description: 'We serve our communities with compassion and love.'
          }
        ],
        bibleVerse: {
          text: 'Go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.',
          reference: 'Matthew 28:19'
        }
      });
    }
  };

  if (!missionData) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
          <div className="h-4 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded mb-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Mission & Vision</h1>
          <p className="text-xl opacity-90">Making disciples, transforming nations</p>
        </div>
      </section>

      {/* Bible Verse */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <blockquote className="text-2xl italic text-gray-700 mb-4">
            "{missionData.bibleVerse.text}"
          </blockquote>
          <cite className="text-lg text-blue-900 font-semibold">
            - {missionData.bibleVerse.reference}
          </cite>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">Our Vision</h2>
            <div className="bg-white rounded-lg shadow-md p-8">
              <p className="text-xl text-gray-700 leading-relaxed text-center">
                {missionData.vision}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">Our Mission</h2>
            <div className="bg-blue-50 rounded-lg shadow-md p-8 border-l-4 border-blue-900">
              <p className="text-xl text-gray-700 leading-relaxed">
                {missionData.mission}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-blue-900">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {missionData.values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl text-blue-900">{(index + 1)}</span>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-blue-900">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Us in Our Mission</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Become part of a community dedicated to making a difference in Nairobi and beyond.
          </p>
          <div className="space-x-4">
            <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
              Visit Our Services
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition duration-300">
              Get Involved
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mission;