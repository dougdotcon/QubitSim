import React, { useState } from 'react';
import { Paper, Button, Typography, Box, Grid, TextField, CircularProgress } from '@mui/material';
import { Shor } from '../algorithms/Shor';
import QuantumGraph from './QuantumGraph';

export default function ShorVisualizer() {
  const [algorithm, setAlgorithm] = useState(null);
  const [result, setResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [numberToFactor, setNumberToFactor] = useState(15); // Número a ser fatorado
  const [numQubits, setNumQubits] = useState(4); // Número de qubits

  const initializeAlgorithm = () => {
    const shor = new Shor(numQubits, numberToFactor);
    setAlgorithm(shor);
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
            Algoritmo de Shor (Versão Simplificada)
          </Typography>
          <Typography variant="body1" paragraph>
            Este algoritmo encontra os fatores primos de um número composto.
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Número a ser fatorado"
              type="number"
              value={numberToFactor}
              onChange={(e) => setNumberToFactor(parseInt(e.target.value))}
              inputProps={{ min: 2, max: 100 }}
              fullWidth
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <TextField
              label="Número de qubits"
              type="number"
              value={numQubits}
              onChange={(e) => setNumQubits(parseInt(e.target.value))}
              inputProps={{ min: 2, max: 8 }}
              fullWidth
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Button
              variant="contained"
              onClick={initializeAlgorithm}
              sx={{ mr: 1 }}
            >
              Inicializar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={runAlgorithm}
              disabled={!algorithm || isRunning}
            >
              {isRunning ? (
                <>
                  <CircularProgress size={24} sx={{ mr: 1 }} />
                  Executando...
                </>
              ) : (
                'Executar Algoritmo'
              )}
            </Button>
          </Box>

          {result && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">Resultado:</Typography>
              <Typography>
                Medição: {result.join('')}
              </Typography>
              {algorithm.findFactors(result) && (
                <Typography>
                  Fatores encontrados: {algorithm.findFactors(result).join(' × ')}
                </Typography>
              )}
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