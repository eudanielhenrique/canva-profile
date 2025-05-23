import React, { useState } from 'react';
import Head from 'next/head';
import { fetchCanvaProfile } from '../utils/canva-api';
import { CanvaProfileResponse } from '../types/canva';
import ProfileCard from '../components/ProfileCard';
import ProfileSkeleton from '../components/ProfileSkeleton';
import ErrorDisplay from '../components/ErrorDisplay';
import RawResponseViewer from '../components/RawResponseViewer';

export default function Home() {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState<CanvaProfileResponse | null>(null);
  const [rawResponse, setRawResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    
    try {
      setLoading(true);
      setError(null);
      const result = await fetchCanvaProfile(username.trim());
      
      // Verificar a estrutura da resposta e extrair os dados apropriados
      if (result.profile && result.rawResponse) {
        // Nova estrutura com profile e rawResponse
        setProfile(result.profile);
        setRawResponse(result.rawResponse);
      } else {
        // Estrutura antiga, apenas o perfil
        setProfile(result as CanvaProfileResponse);
        setRawResponse(null);
      }
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
      setError('Não foi possível encontrar o perfil solicitado. Verifique se o nome de usuário está correto e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>
          {profile ? `${profile.displayName} (@${profile.brandname})` : 'Canva Profile Viewer'}
        </title>
        <meta name="description" content="Visualize informações de perfis públicos do Canva" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header com logo e título */}
        <header className="bg-white shadow-sm">
          <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="h-10 w-10 rounded-full bg-gradient-to-r from-canva-purple to-canva-blue flex items-center justify-center text-white font-bold text-2xl">C</span>
              </div>
              <h1 className="ml-3 text-2xl font-bold text-gray-900">Canva Profile Viewer</h1>
            </div>
            <div className="text-sm text-gray-500">
              Visualize informações de perfis públicos
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Formulário de busca */}
          <div className="bg-white shadow-md rounded-xl border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Buscar perfil do Canva</h2>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">@</span>
                    </div>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="focus:ring-canva-blue focus:border-canva-blue block w-full pl-8 pr-12 sm:text-md border-gray-300 rounded-lg py-3"
                      placeholder="Digite um nome de usuário (ex: phdanielhenrique)"
                      required
                      aria-label="Nome de usuário do Canva"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`inline-flex items-center justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
                    loading ? 'bg-gray-400' : 'bg-canva-blue hover:bg-canva-purple'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-canva-blue transition-all duration-200`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Buscando...
                    </>
                  ) : (
                    <>
                      <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                      Buscar Perfil
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Área de resultado */}
          <div className="mt-8">
            {loading && <ProfileSkeleton />}
            {error && <ErrorDisplay message={error} />}
            
            {!loading && !error && profile && (
              <div className="space-y-8">
                <ProfileCard profile={profile} />
                
                {rawResponse && (
                  <div className="bg-gray-900 rounded-xl shadow-lg p-4 overflow-x-auto">
                    <h2 className="text-white text-lg font-bold mb-2">Resposta Bruta da API:</h2>
                    <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap break-words">
                      {rawResponse}
                    </pre>
                  </div>
                )}
              </div>
            )}
            
            {!loading && !error && !profile && (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
                <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">Nenhum perfil exibido</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Digite um nome de usuário do Canva para ver suas informações.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setUsername('phdanielhenrique')}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-canva-blue bg-gray-50 hover:bg-gray-100"
                  >
                    Experimente com "phdanielhenrique"
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center md:flex-row md:justify-between">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} Canva Profile Viewer. Não afiliado ao Canva.
              </p>
              <div className="mt-4 md:mt-0">
                <a 
                  href="https://www.canva.com/p/phdanielhenrique/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-canva-blue hover:text-canva-purple flex items-center transition-colors"
                >
                  <span className="mr-1">Desenvolvido por Daniel H</span>
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
