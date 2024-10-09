"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Container, Typography, Button } from '@mui/material';

export default function NotFound() {
  const router = useRouter();

  return (
    <Container sx={{ textAlign: 'center', mt: 10 }}>

      <Typography variant="h3" component="h1" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="h6" component="p" gutterBottom>
        Sorry, the page you're looking for doesn't exist.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push('/')}
        sx={{ mt: 2 }}
      >
        Return Home
      </Button>
    </Container>
  );
}
