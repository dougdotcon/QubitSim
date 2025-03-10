import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Home from './components/Home';
import DeutschJozsaVisualizer from './components/DeutschJozsaVisualizer';
import GroverVisualizer from './components/GroverVisualizer';
import ShorVisualizer from './components/ShorVisualizer';
import BernsteinVaziraniVisualizer from './components/BernsteinVaziraniVisualizer';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/deutsch-jozsa" element={<DeutschJozsaVisualizer />} />
          <Route path="/grover" element={<GroverVisualizer />} />
          <Route path="/shor" element={<ShorVisualizer />} />
          <Route path="/bernstein-vazirani" element={<BernsteinVaziraniVisualizer />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 