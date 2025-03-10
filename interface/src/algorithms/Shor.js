import { Qubit } from '../../src/core/qubit.js';
import { QuantumRegister } from '../../src/core/quantumRegister.js';

export class Shor {
  constructor(n, N) {
    this.n = n; // número de qubits para o registro de fase
    this.N = N; // número a ser fatorado
    this.register = new QuantumRegister(2 * n); // registro de fase + registro de valor
  }

  // Função modular exponencial
  modExp(a, x, N) {
    let result = 1;
    for (let i = 0; i < x; i++) {
      result = (result * a) % N;
    }
    return result;
  }

  // Transformada de Fourier Quântica (QFT)
  qft() {
    for (let i = 0; i < this.n; i++) {
      this.register.applyHadamard(i);
      for (let j = i + 1; j < this.n; j++) {
        const angle = Math.PI / Math.pow(2, j - i);
        this.register.applyPhase(j, angle);
      }
    }
  }

  // Oráculo para fatoração
  oracle() {
    // Implementação simplificada do oráculo
    for (let i = 0; i < this.n; i++) {
      const phase = this.modExp(2, i, this.N);
      this.register.applyPhase(i, phase);
    }
  }

  // Executa o algoritmo
  async execute() {
    // Inicialização
    for (let i = 0; i < this.n; i++) {
      this.register.applyHadamard(i);
    }

    // Aplica o oráculo
    this.oracle();

    // Aplica QFT inversa
    this.qft();

    // Medição
    const result = this.register.measureAll();
    return result;
  }

  // Encontra fatores do número N
  findFactors(result) {
    const phase = parseInt(result.slice(0, this.n).join(''), 2) / Math.pow(2, this.n);
    const period = Math.round(1 / phase);
    
    if (period % 2 === 0) {
      const a = Math.pow(2, period / 2) % this.N;
      const b = (a + 1) % this.N;
      const gcd = this.calculateGCD(a, b);
      return [gcd, this.N / gcd];
    }
    
    return null;
  }

  // Calcula o máximo divisor comum
  calculateGCD(a, b) {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }
} 