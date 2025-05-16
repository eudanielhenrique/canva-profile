import React from 'react';

export default function ProfileSkeleton() {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 animate-pulse">
        {/* Avatar placeholder */}
        <div className="relative w-40 h-40 rounded-full bg-gray-200"></div>
        
        <div className="flex-1 w-full">
          {/* Nome e username placeholders */}
          <div className="mb-4 space-y-3">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-5 bg-gray-200 rounded w-1/2"></div>
          </div>
          
          {/* Card de informações placeholder */}
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 space-y-4">
            <div className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-gray-300 mr-2"></div>
              <div className="h-5 bg-gray-300 rounded w-1/3"></div>
            </div>
            
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center">
                <div className="h-4 bg-gray-200 rounded w-24 mb-2 sm:mb-0"></div>
                <div className="h-6 bg-gray-200 rounded sm:ml-4 w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Efeito de brilho */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="skeleton-shine"></div>
      </div>
    </div>
  );
}
