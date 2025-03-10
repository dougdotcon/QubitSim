import { Qubit } from '../../src/core/qubit.js';
import { QuantumRegister } from '../../src/core/quantumRegister.js';

export class BernsteinVazirani {
  constructor(n, a, b) {
    this.n = n; // número de qubits
    this.a = a; // string de bits que representa a função
    this.b = b; // bit de paridade
    this.register = new QuantumRegister(n + 1); // n qubits de entrada + 1 qubit auxiliar
  }

  // Oráculo que implementa a função f(x) = a·x ⊕ b
  oracle() {
    // Aplica CNOT controlado pelos qubits de entrada no qubit auxiliar
    for (let i = 0; i < this.n; i++) {
      if (this.a[i] === '1') {
        this.register.applyCNOT(i, this.n);
      }
    }

    // Aplica X no qubit auxiliar se b = 1
    if (this.b === '1') {
      this.register.applyPauliX(this.n);
    }
  }

  // Executa o algoritmo
  async execute() {
    // Inicialização
    this.register.applyHadamard(this.n); // Aplica H no qubit auxiliar

    // Aplica H em todos os qubits de entrada
    for (let i = 0; i < this.n; i++) {
      this.register.applyHadamard(i);
    }

    // Aplica o oráculo
    this.oracle();

    // Aplica H em todos os qubits de entrada novamente
    for (let i = 0; i < this.n; i++) {
      this.register.applyHadamard(i);
    }

    // Medição
    const result = this.register.measureAll();
    return result;
  }

  // Verifica se encontrou a string correta
  isSuccess(result) {
    const measuredString = result.slice(0, -1).join('');
    return measuredString === this.a;
  }
} 