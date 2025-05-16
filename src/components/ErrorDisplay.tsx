import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

export default function ErrorDisplay({ message }: ErrorDisplayProps) {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 border border-red-100">
      <div className="flex flex-col items-center sm:flex-row sm:items-start text-center sm:text-left">
        <div className="flex-shrink-0 mx-auto sm:mx-0 mb-4 sm:mb-0 sm:mr-4">
          <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-medium text-gray-900">Não foi possível encontrar o perfil</h2>
          <p className="mt-2 text-sm text-gray-600">{message}</p>
          <div className="mt-4 bg-gray-50 p-3 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700">Sugestões:</h3>
            <ul className="mt-2 text-sm text-gray-600 list-disc list-inside space-y-1">
              <li>Verifique se o nome de usuário está correto</li>
              <li>Confirme se o perfil é público no Canva</li>
              <li>Tente com outro nome de usuário (ex: "phdanielhenrique")</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
