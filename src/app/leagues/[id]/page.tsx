"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LeagueDetails({ params }: { params: { id: number } }) {
  const leagueId = params.id;
  const [phases, setPhases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPhases() {
      setLoading(true);
      try {
        const res = await fetch(`https://sportify.mediahuisgroup.com/api/v1/leagues/${leagueId}/phases?lang=nl`);
        const data = await res.json();
        setPhases(data.phases);
        setLoading(false);
      } catch (err) {
        setError('Failed to load');
        setLoading(false);
      }
    }
    fetchPhases();
  }, [leagueId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;


  return (
    <div>
      <h1>Phases for {leagueId}</h1>
      <ul>
        {phases.map((phase) => (
          <li key={phase.id}>
            <Link href={`/leagues/${leagueId}/phases/${phase.id}`}>
              <button>{phase.name}</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
