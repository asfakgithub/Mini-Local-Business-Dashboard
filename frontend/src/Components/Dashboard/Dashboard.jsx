import React, { useState } from 'react';
import BusinessCard from '../BusinessCard/BusinessCard';
import BusinessList from '../BusinessList/BusinessList';

const Dashboard = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: ''
  });
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showList, setShowList] = useState(false);
  
  const API_BASE_URL = 'https://mini-local-business-dashboard-backend.onrender.com';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.location.trim()) {
      setError('Both fields are required');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/business-data`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch business data');
      }
      
      const data = await response.json();
      setBusinessData(data);
      setShowList(false);
    } catch (err) {
      setError(err.message || 'Failed to fetch business data');
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async () => {
    if (!businessData) return;
    
    setLoading(true);
    
    try {
      const response = await fetch(
        `${API_BASE_URL}/regenerate-headline?name=${encodeURIComponent(formData.name)}&location=${encodeURIComponent(formData.location)}`
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to regenerate headline');
      }
      
      const { headline } = await response.json();
      setBusinessData({
        ...businessData,
        headline
      });
    } catch (err) {
      setError(err.message || 'Failed to regenerate headline');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">
        Business Performance Dashboard
      </h1>
      
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Business Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Cake & Co"
                disabled={loading}
              />
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Mumbai"
                disabled={loading}
              />
            </div>
          </div>
          
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </span>
              ) : 'Get Business Data'}
            </button>
            
            <button
              type="button"
              onClick={() => setShowList(!showList)}
              className="px-6 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors"
            >
              {showList ? 'Hide Business List' : 'View All Businesses'}
            </button>
          </div>
        </form>
      </div>
      
      {showList ? (
        <BusinessList />
      ) : (
        businessData && (
          <BusinessCard 
            data={businessData} 
            onRegenerate={handleRegenerate}
            loading={loading}
          />
        )
      )}
    </div>
  );
};

export default Dashboard;
