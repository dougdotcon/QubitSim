import { QuantumRegister, Qubit, Complex } from '../../../src/core/quantumRegister.js';

export class Grover {
  /**
   * Inicializa o algoritmo de Grover
   * @param {number} n - Número de qubits
   * @param {Function} oracleFunc - Função oráculo que atua no registro (caixa preta)
   */
  constructor(n, oracleFunc) {
    this.n = n;
    this.register = new QuantumRegister(n);
    this.oracleFunc = oracleFunc;
    this.iterations = Math.floor(Math.PI * Math.sqrt(2 ** n) / 4);
  }

  // Operador de difusão (Inversão sobre a média)
  diffusion() {
    // 1. Aplica H em todos os qubits
    for (let i = 0; i < this.n; i++) {
      this.register.applyHadamard(i);
    }

    // 2. Aplica X em todos os qubits
    for (let i = 0; i < this.n; i++) {
      this.register.applyPauliX(i);
    }

    // 3. Fase condicional (simulada)
    // Em um hardware real, isso seria um Controlled-Z multicontrolado
    // Aqui, aplicamos a inversão de fase no estado |11..1> (que era |00..0> antes do X)
    this.register.amplitudes = this.register.amplitudes.map((amp, idx) => {
      // Verifica se é o estado |11...1> (todos os bits 1)
      if (idx === this.register.numStates - 1) {
        return new Complex(-amp.real, -amp.imag);
      }
      return amp;
    });

    // 4. Desfaz X
    for (let i = 0; i < this.n; i++) {
      this.register.applyPauliX(i);
    }

    // 5. Desfaz H
    for (let i = 0; i < this.n; i++) {
      this.register.applyHadamard(i);
    }
  }

  // Executa o algoritmo
  async execute() {
    // 1. Superposição inicial
    for (let i = 0; i < this.n; i++) {
      this.register.applyHadamard(i);
    }

    // 2. Iterações de Grover
    for (let i = 0; i < this.iterations; i++) {
      // Aplica o oráculo cego (passado construtor)
      this.oracleFunc(this.register);

      this.diffusion();
    }

    // 3. Medição
    const result = this.register.measureAll();
    return result;
  }
} 