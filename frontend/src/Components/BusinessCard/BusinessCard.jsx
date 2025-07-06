import React from 'react';

const BusinessCard = ({ data, onRegenerate, loading }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Google Business Profile</h2>
            <p className="text-gray-500 text-sm">Performance snapshot</p>
          </div>
          
          <div className="flex items-center">
            {/* <span className="text-3xl font-bold text-yellow-500 mr-1">★</span> */}
            <div>
              <p className="text-2xl font-bold text-gray-900">Rating : {data.rating}</p>
              <p className="text-gray-500 text-sm">Reviews : {data.reviews} reviews</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-5">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">SEO Content Performance</h3>
          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <p className="text-blue-800 font-medium">{data.headline}</p>
          </div>
          
          <button
            onClick={onRegenerate}
            disabled={loading}
            className={`flex items-center px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Regenerating...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                Regenerate SEO Headline
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;