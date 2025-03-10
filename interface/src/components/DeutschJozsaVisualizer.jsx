import React, { useState } from 'react';
import { Paper, Button, Typography, Box, Grid } from '@mui/material';
import { DeutschJozsa } from '../algorithms/DeutschJozsa';
import QuantumGraph from './QuantumGraph';

export default function DeutschJozsaVisualizer() {
  const [algorithm, setAlgorithm] = useState(null);
  const [result, setResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const initializeAlgorithm = (n) => {
    const dj = new DeutschJozsa(n);
    setAlgorithm(dj);
    setResult(null);
  };

  const runAlgorithm = async () => {
    if (!algorithm) return;
    
    setIsRunning(true);
    try {
      const result = await algorithm.execute();
      setResult(result);
    } catch (error) {
      console.error('Erro ao executar o algoritmo:', error);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, m: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Algoritmo de Deutsch-Jozsa
          </Typography>
          <Typography variant="body1" paragraph>
            Este algoritmo determina se uma função é balanceada ou constante.
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 2 }}>
            <Button
              variant="contained"
              onClick={() => initializeAlgorithm(2)}
              sx={{ mr: 1 }}
            >
              Inicializar (2 qubits)
            </Button>
            <Button
              variant="contained"
              onClick={() => initializeAlgorithm(3)}
              sx={{ mr: 1 }}
            >
              Inicializar (3 qubits)
            </Button>
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={runAlgorithm}
            disabled={!algorithm || isRunning}
          >
            {isRunning ? 'Executando...' : 'Executar Algoritmo'}
          </Button>

          {result && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">Resultado:</Typography>
              <Typography>
                A função é {algorithm.isBalanced(result) ? 'balanceada' : 'constante'}
              </Typography>
              <Typography>
                Medição: {result.join('')}
              </Typography>
            </Box>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <QuantumGraph />
        </Grid>
      </Grid>
    </Paper>
  );
} 