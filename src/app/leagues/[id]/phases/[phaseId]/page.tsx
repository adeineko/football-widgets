"use client"

import { useEffect, useState } from 'react';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type RankType = {
    team: {
        name: string,
        logoUrl: string
    },
    ranking: number,
    points: number,
    matchesWon: number,
    matchesLost: number,
    matchesDraw: number,
    matchesPlayed: number,
    goals: number,
    diffGoals: number
}

type RankingsType = {
    phaseId: number,
    phaseName: string,
    ranking: RankType[],
}
export default function PhaseDetails({ params }: { params: { phaseId: number } }) {
    const phaseId = params.phaseId;
    const [ranking, setRanking] = useState([] as RankType[]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchRanking() {
            setLoading(true);
            try {
                const res = await fetch(`https://sportify.mediahuisgroup.com/api/v1/phases/${phaseId}/ranking?lang=nl`);
                const data = await res.json() as RankingsType;
                console.log(data);
                setRanking(data.ranking);
                setLoading(false);
            } catch (err) {
                setError('Failed to load');
                setLoading(false);
            }
        }
        fetchRanking();
    }, [phaseId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    function createData(
        ranking: number,
        name: string,
        matchesWon: number,
        matchesLost: number,
        matchesDraw: number,
        matchesPlayed: number,
        points: number,
    ) {
        return { ranking, name, matchesWon, matchesLost, matchesDraw, matchesPlayed, points };
    }

    const rows = ranking.map((rankings) => (
        createData(
            rankings.ranking,
            rankings.team.name,
            rankings.matchesWon,
            rankings.matchesLost,
            rankings.matchesDraw,
            rankings.matchesPlayed,
            rankings.points
        )
    ));




    return (
        <div>
            <h2>Ranking 1</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                        {rows.map((row) => (
                            <TableRow
                                key={row.ranking}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.ranking}
                                </TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.matchesWon}</TableCell>
                                <TableCell align="right">{row.matchesLost}</TableCell>
                                <TableCell align="right">{row.matchesDraw}</TableCell>
                                <TableCell align="right">{row.matchesPlayed}</TableCell>
                                <TableCell align="right">{row.points}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}