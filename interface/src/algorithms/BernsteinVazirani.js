import { QuantumRegister } from '../../../src/core/quantumRegister.js';

export class BernsteinVazirani {
  /**
   * Inicializa o algoritmo de Bernstein-Vazirani
   * @param {number} n - Número de qubits de entrada (tamanho da string secreta)
   * @param {Function} oracleFunc - Função oráculo caixa-preta U_f
   */
  constructor(n, oracleFunc) {
    this.n = n;
    this.oracleFunc = oracleFunc;
    // Registro: n qubits de entrada + 1 qubit auxiliar (ancilla)
    this.register = new QuantumRegister(n + 1);
  }

  // Executa o algoritmo
  async execute() {
    // 1. Inicialização do estado
    // Qubits de entrada (0 a n-1) iniciam em |0>
    // Qubit auxiliar (n) inicia em |0> -> X -> |1> -> H -> |->

    // Prepara ancilla em |-> para Phase Kickback
    this.register.applyPauliX(this.n);      // |0> -> |1>
    this.register.applyHadamard(this.n);    // |1> -> |-> = (|0> - |1>)/√2

    // 2. Superposição nos qubits de entrada
    for (let i = 0; i < this.n; i++) {
      this.register.applyHadamard(i);
    }

    // Estado atual: |+>|+>...|+>|->

    // 3. Consulta ao Oráculo (Caixa Preta)
    // O oráculo aplica f(x) via CNOTs, que devido ao alvo ser |->,
    // induz um kickback de fase (-1)^f(x) nos qubits de controle.
    this.oracleFunc(this.register);

    // 4. Interferência (Hadamard na saída)
    // Isso transforma a fase (-1)^{a.x} de volta para a base computacional
    // revelando a string 'a'.
    for (let i = 0; i < this.n; i++) {
      this.register.applyHadamard(i);
    }

    // 5. Medição
    // Medimos apenas os qubits de entrada (0 a n-1)
    const result = this.register.measureAll();

    // Retorna apenas a parte da mensagem (descarta ancilla)
    return result.slice(0, this.n);
  }
}