import React from 'react';
import { CanvaProfileResponse } from '../types/canva';

interface ProfileCardProps {
  profile: CanvaProfileResponse;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 transition-all hover:shadow-xl border border-gray-100">
      <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
        {/* Avatar com efeito de gradiente na borda */}
        <div className="relative w-40 h-40 p-1 rounded-full bg-gradient-to-r from-canva-purple to-canva-blue">
          {profile.avatar && profile.avatar.sizes && profile.avatar.sizes["200"] ? (
            <img 
              src={profile.avatar.sizes["200"].url} 
              alt={`Foto de perfil de ${profile.displayName}`} 
              className="w-full h-full object-cover rounded-full border-2 border-white"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-full">
              <svg className="h-20 w-20 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
              </svg>
            </div>
          )}
        </div>
        
        <div className="flex-1 text-center md:text-left">
          {/* Cabeçalho do perfil com nome e username */}
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-800">{profile.displayName}</h1>
            <p className="text-lg text-canva-purple font-medium">@{profile.brandname}</p>
          </div>
          
          {/* Card de informações com design mais moderno */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h2 className="flex items-center text-lg font-semibold text-gray-700 mb-4">
              <svg className="h-5 w-5 mr-2 text-canva-blue" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Informações do Perfil
            </h2>
            
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="text-sm font-medium text-gray-500 sm:w-32">ID:</span>
                <span className="font-mono text-md bg-gray-100 px-2 py-1 rounded text-canva-purple mt-1 sm:mt-0">{profile.id}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="text-sm font-medium text-gray-500 sm:w-32">Nome:</span>
                <span className="font-medium text-gray-800 mt-1 sm:mt-0">{profile.displayName}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="text-sm font-medium text-gray-500 sm:w-32">Username:</span>
                <span className="font-medium text-canva-blue mt-1 sm:mt-0">@{profile.brandname}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="text-sm font-medium text-gray-500 sm:w-32">Status:</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 sm:mt-0 ${
                  profile.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  <span className={`h-2 w-2 rounded-full mr-1.5 ${
                    profile.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
                  }`}></span>
                  {profile.status === 'active' ? 'Ativo' : profile.status}
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="text-sm font-medium text-gray-500 sm:w-32">Desde:</span>
                <span className="text-gray-700 mt-1 sm:mt-0">
                  {new Date(profile.creationDate).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
