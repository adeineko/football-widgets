import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import PhaseRanking from '@/app/leagues/[id]/phaseRanking';
import Matches from '@/app/leagues/[id]/matchesCalendar';

interface PhaseDetailsProps {
  id: number;
  name?: string;
}

export default function PhaseDetails({ id, name }: PhaseDetailsProps) {
  const [tabIndex, setTabIndex] = useState(0); 

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ width: '100%', marginTop: 2 }}>
      <Tabs value={tabIndex} onChange={handleChange} aria-label="phase tabs">
        <Tab label="Rankings" />
        <Tab label="Calendar" />
      </Tabs>
      <Box sx={{ padding: 2 }}>
        {tabIndex === 0 && <PhaseRanking id={id} name={name} />}
        {tabIndex === 1 && <Matches id={id} name={name} />}
      </Box>
    </Box>
  );
}
