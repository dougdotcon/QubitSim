import { QuantumMonteCarlo } from "./QuantumMonteCarlo";
import { ParallelTempering } from "./ParallelTempering";

const size = 20;       // Tamanho da matriz de spins
const beta = 1.0;      // Inverso da temperatura
const J = 1.0;         // Interação entre spins
const steps = 100000;  // Número de iterações
const trotterSlices = 10; // Precisão de Suzuki-Trotter

// Criar uma simulação QMC
const qmc = new QuantumMonteCarlo(size, beta, J, steps, trotterSlices);
console.log("Energia média antes do Parallel Tempering:", qmc.runSimulation());

// Aplicando Parallel Tempering
const pt = new ParallelTempering(5, size, J, steps, trotterSlices);
pt.run();
console.log("Parallel Tempering aplicado!");
