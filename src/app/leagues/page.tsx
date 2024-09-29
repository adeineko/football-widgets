"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LeaguesPage() {
  const [leagues, setLeagues] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch leagues on page load
    async function fetchLeagues() {
      setLoading(true);
      try {
        const res = await fetch('https://sportify.mediahuisgroup.com/api/v1/sports/1/leagues?lang=nl');
        const data = await res.json();
        setLeagues(data.leagues);
        setLoading(false);
      } catch (err) {
        setError('Failed to load leagues');
        setLoading(false);
      }
    }
    fetchLeagues();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (leagues.length === 0) return <div>No leagues available</div>;

  return (
    <div>
      <h1>Select a League</h1>
      <ul>
        {leagues.map((league) => (
          <li key={league.id}>
            <Link href={`/leagues/${league.id}`}>
              <button>{league.name}</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
