import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Bem-vindo ao QubitSim
      </Typography>
      <Typography variant="body1" paragraph>
        Explore diferentes algoritmos quânticos através de visualizações interativas.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Algoritmo de Deutsch-Jozsa
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Determina se uma função é constante ou balanceada.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={RouterLink} to="/deutsch-jozsa">
                Explorar
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Algoritmo de Grover
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Busca não estruturada em uma base de dados.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={RouterLink} to="/grover">
                Explorar
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Algoritmo de Shor
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fatoração de números inteiros.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={RouterLink} to="/shor">
                Explorar
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Algoritmo de Bernstein-Vazirani
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Encontra uma string oculta em uma função linear.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={RouterLink} to="/bernstein-vazirani">
                Explorar
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
} 