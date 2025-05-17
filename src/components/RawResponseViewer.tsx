import React, { useState } from 'react';

interface RawResponseViewerProps {
  rawResponse: string;
}

export default function RawResponseViewer({ rawResponse }: RawResponseViewerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <h2 className="text-white text-lg font-bold">Resposta Bruta da API</h2>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-white rounded text-sm"
        >
          {isExpanded ? 'Recolher' : 'Expandir'}
        </button>
      </div>
      
      <div className={`transition-all duration-300 ${isExpanded ? 'max-h-[500px]' : 'max-h-40'} overflow-auto`}>
        <pre className="p-4 text-green-400 text-sm font-mono whitespace-pre-wrap break-words">
          {rawResponse || '(Resposta bruta não disponível)'}
        </pre>
      </div>
      
      {!isExpanded && (
        <div className="bg-gradient-to-t from-gray-900 to-transparent h-8 relative bottom-8 w-full"></div>
      )}
    </div>
  );
}
