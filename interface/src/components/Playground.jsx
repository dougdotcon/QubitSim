import React, { useState, useEffect } from 'react';
import { Paper, Button, Typography, Box, Grid, Slider } from '@mui/material';
import { Qubit, Complex } from '../../../src/core/quantumRegister.js'; // Use re-exported Qubit
import BlochSphere from './BlochSphere';
import { calculateVacuumFluctuation } from '../../../src/core/unified_physics.js';

export default function Playground() {
    const [qubit, setQubit] = useState(new Qubit()); // Init state |0>
    const [noiseIntensity, setNoiseIntensity] = useState(0.001);
    const [autoNoise, setAutoNoise] = useState(false);

    // Function to apply a gate and update state
    const applyGate = (gateName) => {
        // Clone logic for immutability (conceptually)
        // Qubit class is mutable in this implementation
        // We need to trigger re-render
        const newQubit = new Qubit(qubit.alpha, qubit.beta);

        switch (gateName) {
            case 'H':
                newQubit.applyHadamard();
                break;
            case 'X':
                newQubit.applyPauliX();
                break;
            case 'Y':
                newQubit.applyPauliY();
                break;
            case 'Z':
                newQubit.applyPauliZ();
                break;
            default:
                break;
        }
        setQubit(newQubit);
    };

    const applyNoise = () => {
        const newQubit = new Qubit(qubit.alpha, qubit.beta);
        newQubit.applyVacuumFluctuations(noiseIntensity);
        setQubit(newQubit);
    };

    const resetQubit = () => {
        setQubit(new Qubit());
    };

    useEffect(() => {
        let interval;
        if (autoNoise) {
            interval = setInterval(() => {
                applyNoise();
            }, 500); // Apply noise every 500ms
        }
        return () => clearInterval(interval);
    }, [autoNoise, qubit, noiseIntensity]);

    return (
        <Paper elevation={3} sx={{ p: 3, m: 2 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>
                        Playground Quântico & Física Unificada
                    </Typography>
                    <Typography variant="body1">
                        Explore o estado de um único Qubit na Esfera de Bloch e observe os efeitos da Decoerência Entrópica em tempo real.
                    </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" gutterBottom>Portas Lógicas</Typography>
                        <Button variant="outlined" onClick={() => applyGate('X')} sx={{ mr: 1 }}>Bit Flip (X)</Button>
                        <Button variant="outlined" onClick={() => applyGate('H')} sx={{ mr: 1 }}>Hadamard (H)</Button>
                        <Button variant="outlined" onClick={() => applyGate('Z')} sx={{ mr: 1 }}>Phase Flip (Z)</Button>
                        <Button variant="outlined" color="secondary" onClick={resetQubit} sx={{ ml: 2 }}>Reset |0⟩</Button>
                    </Box>

                    <Box sx={{ mb: 4, p: 2, border: '1px solid #444', borderRadius: 2 }}>
                        <Typography variant="h6" color="warning.main" gutterBottom>
                            Controle de Vácuo (Entropic Noise)
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Intensidade da flutuação (Ω effect): {noiseIntensity}
                        </Typography>
                        <Slider
                            value={noiseIntensity}
                            onChange={(_, val) => setNoiseIntensity(val)}
                            min={0}
                            max={0.1}
                            step={0.001}
                        />
                        <Button
                            variant={autoNoise ? "contained" : "outlined"}
                            color={autoNoise ? "error" : "primary"}
                            onClick={() => setAutoNoise(!autoNoise)}
                        >
                            {autoNoise ? "Parar Simulação de Vácuo" : "Iniciar Simulação de Vácuo"}
                        </Button>
                    </Box>

                    <Box>
                        <Typography variant="h6">Estado Atual:</Typography>
                        <Typography variant="mono" sx={{ fontFamily: 'monospace' }}>
                            α: {qubit.alpha.format()}
                        </Typography>
                        <Typography variant="mono" sx={{ fontFamily: 'monospace' }}>
                            β: {qubit.beta.format()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Probabilidade |0⟩: {(qubit.alpha.magnitude() ** 2 * 100).toFixed(1)}%
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Probabilidade |1⟩: {(qubit.beta.magnitude() ** 2 * 100).toFixed(1)}%
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} md={6} display="flex" justifyContent="center" alignItems="center">
                    <BlochSphere qubit={qubit} />
                </Grid>
            </Grid>
        </Paper>
    );
}
