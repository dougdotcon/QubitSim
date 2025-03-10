import { Qubit } from '../../src/core/qubit.js';
import { QuantumRegister } from '../../src/core/quantumRegister.js';

export class Grover {
  constructor(n, target) {
    this.n = n; // número de qubits
    this.target = target; // elemento a ser encontrado
    this.register = new QuantumRegister(n);
    this.iterations = Math.floor(Math.PI * Math.sqrt(2 ** n) / 4);
  }

  // Operador de difusão
  diffusion() {
    // Aplica H em todos os qubits
    for (let i = 0; i < this.n; i++) {
      this.register.applyHadamard(i);
    }

    // Aplica a porta de fase
    this.register.applyPhase(this.target, Math.PI);

    // Aplica H em todos os qubits novamente
    for (let i = 0; i < this.n; i++) {
      this.register.applyHadamard(i);
    }
  }

  // Oráculo que marca o elemento alvo
  oracle() {
    // Aplica uma porta de fase negativa no estado alvo
    this.register.applyPhase(this.target, Math.PI);
  }

  // Executa o algoritmo
  async execute() {
    // Inicialização
    for (let i = 0; i < this.n; i++) {
      this.register.applyHadamard(i);
    }

    // Iterações de Grover
    for (let i = 0; i < this.iterations; i++) {
      this.oracle();
      this.diffusion();
    }

    // Medição
    const result = this.register.measureAll();
    return result;
  }

  // Verifica se encontrou o elemento alvo
  isSuccess(result) {
    return result.join('') === this.target.toString(2).padStart(this.n, '0');
  }
} 