import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          QubitSim
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Início
          </Button>
          <Button color="inherit" component={RouterLink} to="/deutsch-jozsa">
            Deutsch-Jozsa
          </Button>
          <Button color="inherit" component={RouterLink} to="/grover">
            Grover
          </Button>
          <Button color="inherit" component={RouterLink} to="/shor">
            Shor
          </Button>
          <Button color="inherit" component={RouterLink} to="/bernstein-vazirani">
            Bernstein-Vazirani
          </Button>
          <Button color="inherit" component={RouterLink} to="/playground">
            Playground (Unified Physics)
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
} 