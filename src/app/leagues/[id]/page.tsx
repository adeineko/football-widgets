"use client";

import { useState, useEffect } from 'react';
import * as React from 'react';
import PhaseRanking from './phaseRanking';

interface PhaseType {
  id: number;
  name: string;
  order: number;
  matchdays: number;
  lastMatchday: number;
}
export default function LeagueDetails({ params }: { params: { id: number } }) {

  const leagueId = params.id;
  const [phases, setPhases] = useState<PhaseType[]>();
  const [loadingPhases, setLoadingPhases] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPhases() {
      setLoadingPhases(true);
      try {
        const res = await fetch(
          `https://sportify.mediahuisgroup.com/api/v1/leagues/${leagueId}/phases?lang=nl`
        );
        const data = await res.json();
        setPhases(data.phases);
      } catch (err: any) {
        setError(`Failed to load phases: ${err.message}`);
      } finally {
        setLoadingPhases(false);
      }
    }
    fetchPhases();
  }, [leagueId]);


  if (loadingPhases) return <div>Loading phases...</div>;
  if (!phases || phases.length < 1) return <div>404</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Phases for League {leagueId}</h1>
      <ul>
        {phases.map((phase) => (
          <li key={phase.id}>
            <h2>{phase.name}</h2>
            <PhaseRanking id={phase.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
