import { useEffect, useState } from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type RankType = {
  team: {
    name: string;
    logoUrl: string;
  };
  ranking: number;
  points: number;
  matchesWon: number;
  matchesLost: number;
  matchesDraw: number;
  matchesPlayed: number;
  goals: number;
  diffGoals: number;
};

type RankingsType = {
  phaseId: number;
  phaseName: string;
  ranking: RankType[];
};

interface PhaseRankingProps {
  id: number;
  name?: string;
}

export default function PhaseRanking({ id }: PhaseRankingProps) {

  // State to hold rankings for each phase
  const [rankingsData, setRankingsData] = useState<RankingsType>();
  const [loadingRankings, setLoadingRankings] = useState<boolean>(true);

  useEffect(() => {

    async function fetchRanking() {
      try {
        const res = await fetch(
          `https://sportify.mediahuisgroup.com/api/v1/phases/${id}/ranking?lang=nl`
        );
        const rankingData = (await res.json()) as RankingsType;

        setRankingsData(rankingData);
      } catch (err) {
        setError(`Failed to load rankings for phase ${phase.name}`);
      } finally {
        setLoadingRankings(false);
      }
    }
    fetchRanking();
  }, [id]);

  if (loadingRankings) return <div>Loading phases...</div>;
  if (!rankingsData) return <div>404</div>;

  // <div>No ranking data available for {phase.name}.</div>
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="ranking table">
        <TableHead>
          <TableRow>
            <TableCell>Position</TableCell>
            <TableCell>Team Name</TableCell>
            <TableCell align="right">Matches Won</TableCell>
            <TableCell align="right">Matches Lost</TableCell>
            <TableCell align="right">Matches Drawn</TableCell>
            <TableCell align="right">Matches Played</TableCell>
            <TableCell align="right">Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rankingsData.ranking.map((ranking) => (
            <TableRow
              key={ranking.ranking}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {ranking.ranking}
              </TableCell>
              <TableCell>{ranking.team.name}</TableCell>
              <TableCell align="right">{ranking.matchesWon}</TableCell>
              <TableCell align="right">{ranking.matchesLost}</TableCell>
              <TableCell align="right">{ranking.matchesDraw}</TableCell>
              <TableCell align="right">{ranking.matchesPlayed}</TableCell>
              <TableCell align="right">{ranking.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}