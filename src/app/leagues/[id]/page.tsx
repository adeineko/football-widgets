"use client";

import { useState, useEffect } from 'react';
import * as React from 'react';
import PhaseDetails from '@/components/phaseDetailsNavBar';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
          <Accordion key={phase.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${phase.id}-content`}
              id={`panel-${phase.id}-header`}
            >
              <Typography>{phase.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <PhaseDetails id={phase.id} name={phase.name} />
            </AccordionDetails>
          </Accordion>
        ))}
      </ul>
    </div>
  );
}
