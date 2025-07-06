import React, { useState, useEffect } from 'react';

const BusinessList = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await fetch('https://mini-local-business-dashboard-backend.onrender.com');
        if (!response.ok) {
          throw new Error('Failed to fetch businesses');
        }
        const data = await response.json();
        setBusinesses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Recently Added Businesses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {businesses.map(business => (
          <div key={business._id} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">Business Name : {business.name}</h3>
                <p className="text-gray-600 text-sm">Location : {business.location}</p>
              </div>
              <div className="flex items-center">
                <span className="font-medium">Rating : {business.rating}</span>
                <span className="text-yellow-500 mr-1"> ★</span>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-sm text-gray-700 line-clamp-2">{business.headline}</p>
            </div>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-xs text-gray-500">
                {new Date(business.createdAt).toLocaleDateString()}
              </span>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {business.reviews} reviews
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessList;
