'use client'; // Error components must be Client Components

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use 'next/router' if you're using the Pages Router
import { Container, Typography, Button, Box } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error:', error);
  }, [error]);

  return (
    <Container sx={{ textAlign: 'center', mt: 10 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <ErrorOutlineIcon color="error" sx={{ fontSize: 80 }} />
      </Box>

      <Typography variant="h4" component="h1" gutterBottom>
        Something went wrong!
      </Typography>
      <Typography variant="body1" gutterBottom>
        An unexpected error occurred. Please try again.
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => reset()}
          sx={{ mr: 2 }}
        >
          Try Again
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => router.push('/')}
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
}
