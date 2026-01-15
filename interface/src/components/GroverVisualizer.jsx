import React, { useState } from 'react';
import { Paper, Button, Typography, Box, Grid, Slider, TextField } from '@mui/material';
import { Grover } from '../algorithms/Grover';
import { Complex } from '../../../src/core/quantumRegister.js'; // Importação necessária para o oracle
import QuantumGraph from './QuantumGraph';

export default function GroverVisualizer() {
  const [algorithm, setAlgorithm] = useState(null);
  const [result, setResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [n, setN] = useState(2);
  const [target, setTarget] = useState(1);

  const initializeAlgorithm = () => {
    // Definir função oráculo baseada no alvo
    const oracleFunc = (register) => {
      // Simulação de Oráculo de Fase: Inverte o sinal da amplitude do estado alvo
      // |x> -> -|x> se x == target
      // Em um circuito real, isso seria um Multi-Controlled Z com X gates para selecionar o estado.
      // Como estamos simulando a física:
      register.amplitudes = register.amplitudes.map((amp, idx) => {
        if (idx === target) {
          // Inverte sinal: multiply by -1
          return new Complex(-amp.real, -amp.imag);
        }
        return amp;
      });
    };

    const grover = new Grover(n, oracleFunc);
    setAlgorithm(grover);
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
            Algoritmo de Grover
          </Typography>
          <Typography variant="body1" paragraph>
            Este algoritmo busca um elemento específico em uma lista não ordenada.
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 2 }}>
            <Typography gutterBottom>
              Número de Qubits: {n}
            </Typography>
            <Slider
              value={n}
              onChange={(_, value) => setN(value)}
              min={2}
              max={4}
              step={1}
              valueLabelDisplay="auto"
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <TextField
              label="Elemento Alvo"
              type="number"
              value={target}
              onChange={(e) => setTarget(parseInt(e.target.value))}
              inputProps={{ min: 0, max: 2 ** n - 1 }}
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
              {isRunning ? 'Executando...' : 'Executar Algoritmo'}
            </Button>
          </Box>

          {result && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">Resultado:</Typography>
              <Typography>
                {algorithm.isSuccess(result) ? 'Elemento encontrado!' : 'Elemento não encontrado'}
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