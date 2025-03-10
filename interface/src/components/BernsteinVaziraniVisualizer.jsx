import React, { useState } from 'react';
import { Paper, Button, Typography, Box, Grid, TextField, CircularProgress } from '@mui/material';
import { BernsteinVazirani } from '../algorithms/BernsteinVazirani';
import QuantumGraph from './QuantumGraph';

export default function BernsteinVaziraniVisualizer() {
  const [algorithm, setAlgorithm] = useState(null);
  const [result, setResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [numQubits, setNumQubits] = useState(3);
  const [targetString, setTargetString] = useState('101');
  const [parityBit, setParityBit] = useState('0');

  const initializeAlgorithm = () => {
    const bv = new BernsteinVazirani(numQubits, targetString, parityBit);
    setAlgorithm(bv);
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

  const handleTargetStringChange = (e) => {
    const value = e.target.value;
    if (/^[01]*$/.test(value)) {
      setTargetString(value);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, m: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Algoritmo de Bernstein-Vazirani
          </Typography>
          <Typography variant="body1" paragraph>
            Este algoritmo encontra uma string oculta em uma função linear.
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
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
            <TextField
              label="String alvo (binária)"
              value={targetString}
              onChange={handleTargetStringChange}
              inputProps={{ maxLength: numQubits }}
              fullWidth
              helperText="Use apenas 0s e 1s"
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <TextField
              label="Bit de paridade"
              value={parityBit}
              onChange={(e) => setParityBit(e.target.value)}
              inputProps={{ maxLength: 1 }}
              fullWidth
              helperText="Use 0 ou 1"
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
              <Typography>
                {algorithm.isSuccess(result) ? 'String encontrada!' : 'String não encontrada'}
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