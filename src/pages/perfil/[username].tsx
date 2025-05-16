import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { fetchCanvaProfile } from '../../utils/canva-api';
import { CanvaProfileResponse } from '../../types/canva';
import ProfileCard from '../../components/ProfileCard';
import ProfileSkeleton from '../../components/ProfileSkeleton';
import ErrorDisplay from '../../components/ErrorDisplay';
import Link from 'next/link';

export default function PerfilPage() {
  const router = useRouter();
  const { username } = router.query;
  
  const [profile, setProfile] = useState<CanvaProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;
    
    async function loadProfile() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCanvaProfile(username as string);
        console.log('Dados de perfil recebidos:', data); // Log para debug
        setProfile(data);
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
        setError('Não foi possível encontrar o perfil solicitado. Verifique se o nome de usuário está correto e tente novamente.');
      } finally {
        setLoading(false);
      }
    }
    
    loadProfile();
  }, [username]);

  const pageTitle = profile 
    ? `${profile.displayName} (@${profile.brandname}) | Perfil Canva` 
    : 'Carregando Perfil | Canva Profile';

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={`Perfil do Canva de ${username || ''}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <Link href="/" className="inline-flex items-center text-canva-blue hover:text-canva-purple transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Voltar
            </Link>
            <h1 className="text-3xl font-bold text-center mt-4">Perfil do Canva</h1>
          </header>
          
          {loading && <ProfileSkeleton />}
          {error && <ErrorDisplay message={error} />}
          {!loading && !error && profile && <ProfileCard profile={profile} />}
        </div>
      </main>
    </>
  );
}
