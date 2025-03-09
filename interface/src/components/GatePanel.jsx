import React from 'react';
import { Paper, Grid, IconButton, Tooltip } from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  SwapHoriz as SwapIcon,
} from '@mui/icons-material';

const gates = [
  { id: 'H', label: 'Hadamard', symbol: 'H' },
  { id: 'X', label: 'Pauli-X', symbol: 'X' },
  { id: 'Y', label: 'Pauli-Y', symbol: 'Y' },
  { id: 'Z', label: 'Pauli-Z', symbol: 'Z' },
  { id: 'CNOT', label: 'CNOT', symbol: '⊕' },
];

export default function GatePanel({ onAddGate, onRemoveGate, onSwapGates }) {
  return (
    <Paper className="control-panel" elevation={3}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h3>Portas Quânticas</h3>
        </Grid>
        {gates.map((gate) => (
          <Grid item xs={6} key={gate.id}>
            <Tooltip title={gate.label}>
              <IconButton
                onClick={() => onAddGate(gate)}
                color="primary"
                size="large"
              >
                <div className="gate-symbol">{gate.symbol}</div>
              </IconButton>
            </Tooltip>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Tooltip title="Remover Porta">
            <IconButton onClick={onRemoveGate} color="error">
              <RemoveIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Trocar Portas">
            <IconButton onClick={onSwapGates} color="primary">
              <SwapIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Paper>
  );
} 