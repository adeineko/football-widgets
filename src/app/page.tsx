"use client"

import { useState, useEffect } from 'react';
import Header from '@/components/header';
import LeagueGrid from '@/components/leagueGrid';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';



export interface LeaguesType {
  id: number;
  sourceId: string;
  name: string;
}
export interface LeagueType {
  leagues: LeaguesType[];
}

export default function LeaguesPage() {
  const [leagues, setLeagues] = useState<LeaguesType[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingLeagues, setLoadingLeagues] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const leagueNameFromQuery = searchParams.get('leagueName') || '';
 

  useEffect(() => {
    async function fetchLeagues() {
      setLoadingLeagues(true);
      try {
        const res = await fetch('https://sportify.mediahuisgroup.com/api/v1/sports/1/leagues?lang=nl');
        const data = (await res.json()) as LeagueType;
        setLeagues(data.leagues);
      } catch (err: any) {
        setError(`Failed to load leagues: ${err.message}`);
      } finally {
        setLoadingLeagues(false);
      }
    }
    fetchLeagues();
  }, [leagueNameFromQuery]);

  if (loadingLeagues) return <div>Loading leagues...</div>;
  if (error) return <div>{error}</div>;
  if (!leagues || leagues.length === 0) {
    return <div>No leagues available.</div>;
  }

  return (
    <>
      <Header />
      <LeagueGrid leagues={leagues} />
    </>
  );
}
