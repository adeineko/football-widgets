import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';


interface MatchType {
  teamHome: string;
  teamGuest: string;
  date: string;
  score?: {
    home: number;
    guest: number;
  };
  logoHome?: string;
  logoGuest?: string;
}

interface MatchdayType {
  matchday: number;
  matches: MatchType[];
}

interface MatchesDataType {
  phaseId: number;
  phaseName: string;
  lastMatchday: number;
  matchdays: MatchdayType[];
}

interface PhaseCalendarProps {
  id: number;
  name?: string;
}

export default function Matches({ id, name }: PhaseCalendarProps) {
  const [matchesData, setMatchesData] = useState<MatchesDataType | null>(null);
  const [loadingMatches, setLoadingMatches] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentMatchdayIndex, setCurrentMatchdayIndex] = useState<number>(0);

  useEffect(() => {
    async function fetchMatches() {
      try {
        const res = await fetch(
          `https://sportify.mediahuisgroup.com/api/v1/phases/${id}/matches?lang=nl`
        );
        const data = (await res.json()) as MatchesDataType;
        setMatchesData(data);
      } catch (err: any) {
        setError(`Failed to load matches for phase ${name}: ${err.message}`);
      } finally {
        setLoadingMatches(false);
      }
    }
    fetchMatches();
  }, [id, name]);

  if (loadingMatches) return <div>Loading matches...</div>;
  if (error) return <div>{error}</div>;
  if (!matchesData || !matchesData.matchdays || matchesData.matchdays.length === 0) {
    return <div>No match data available for this phase.</div>;
  }

  const matchdays = matchesData.matchdays;
  const matchday = matchdays[currentMatchdayIndex];

  const handlePrev = () => {
    setCurrentMatchdayIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentMatchdayIndex((prev) =>
      Math.min(prev + 1, matchdays.length - 1)
    );
  };

  return (
    <div>
      <div>
        <Button onClick={handlePrev} disabled={currentMatchdayIndex === 0}>
          Previous
        </Button>
        <span>
          Matchday {matchday.matchday} of {matchdays.length}
        </span>
        <Button
          onClick={handleNext}
          disabled={currentMatchdayIndex === matchdays.length - 1}
        >
          Next
        </Button>
      </div>
      {matchday.matches.map((match, idx) => (
        <div
          key={idx}
          style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}
        >
          <p>
            <strong>{match.teamHome}</strong> vs{' '}
            <strong>{match.teamGuest}</strong>
          </p>
          {match.score ? (
            <p>
              Score: {match.score.home} - {match.score.guest}
            </p>
          ) : (
            <p>
              Date:{' '}
              {new Date(match.date).toLocaleString('nl-NL', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
