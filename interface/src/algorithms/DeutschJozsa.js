import { Qubit } from '../../src/core/qubit.js';
import { QuantumRegister } from '../../src/core/quantumRegister.js';

export class DeutschJozsa {
  constructor(n) {
    this.n = n; // número de qubits
    this.register = new QuantumRegister(n + 1); // n qubits de entrada + 1 qubit auxiliar
  }

  // Função oráculo que simula uma função f: {0,1}^n -> {0,1}
  // balanced: retorna 0 para metade das entradas e 1 para a outra metade
  // constant: retorna sempre 0 ou sempre 1
  oracle(balanced = true) {
    if (balanced) {
      // Implementação de uma função balanceada
      return (input) => {
        const sum = input.reduce((a, b) => a + b, 0);
        return sum % 2;
      };
    } else {
      // Implementação de uma função constante
      return () => 0; // ou 1
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
    const f = this.oracle(true); // ou false para função constante
    // Aqui implementaríamos a aplicação do oráculo

    // Aplica H em todos os qubits de entrada novamente
    for (let i = 0; i < this.n; i++) {
      this.register.applyHadamard(i);
    }

    // Medição
    const result = this.register.measureAll();
    return result;
  }

  // Verifica se a função é balanceada ou constante
  isBalanced(result) {
    // Se todos os qubits de entrada são 0, a função é constante
    return result.slice(0, -1).some(bit => bit === 1);
  }
} 