import { LeagueType } from '@/app/leagues/page';
import Link from 'next/link';
import { Container, Grid, Card, CardActionArea, CardContent, Typography } from '@mui/material';

export default function LeagueGrid({ leagues }: LeagueType) {
    return (
        <Container sx={{ py: 4 }}>
            <Grid container spacing={4}>
                {leagues.map((league) => (
                    <Grid item key={league.id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardActionArea component={Link} href={`/leagues/${league.id}`}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {league.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
