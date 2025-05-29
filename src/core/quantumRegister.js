import { Qubit, Complex } from "./qubit.js";

/**
 * Classe QuantumRegister - Implementação correta de um registro quântico
 * Representa um sistema de múltiplos qubits usando produto tensorial
 * Estado: |ψ⟩ = Σ αᵢ|i⟩ onde i são todos os estados possíveis de n qubits
 */
export class QuantumRegister {
  /**
   * Cria um novo registro quântico
   * @param {number} numQubits - Número de qubits no registro
   */
  constructor(numQubits) {
    this.numQubits = numQubits;
    this.numStates = Math.pow(2, numQubits);

    // Inicializa no estado |00...0⟩
    this.amplitudes = new Array(this.numStates).fill(null).map((_, i) =>
      new Complex(i === 0 ? 1 : 0, 0)
    );

    this.normalize();
  }

  /**
   * Normaliza o estado quântico
   */
  normalize() {
    const norm = Math.sqrt(
      this.amplitudes.reduce((sum, amp) => sum + amp.magnitude() ** 2, 0)
    );

    if (norm > 0) {
      this.amplitudes = this.amplitudes.map(amp =>
        new Complex(amp.real / norm, amp.imag / norm)
      );
    }
  }

  /**
   * Adiciona um qubit ao registro (produto tensorial)
   * @param {Qubit} qubit - Qubit a ser adicionado
   */
  addQubit(qubit) {
    const oldAmplitudes = [...this.amplitudes];
    const newNumQubits = this.numQubits + 1;
    const newNumStates = Math.pow(2, newNumQubits);

    this.amplitudes = new Array(newNumStates).fill(null).map(() => new Complex(0, 0));

    // Produto tensorial: |ψ⟩ ⊗ |φ⟩
    for (let i = 0; i < oldAmplitudes.length; i++) {
      // Estado |i⟩ ⊗ |0⟩
      this.amplitudes[i * 2] = oldAmplitudes[i].multiply(qubit.alpha);
      // Estado |i⟩ ⊗ |1⟩
      this.amplitudes[i * 2 + 1] = oldAmplitudes[i].multiply(qubit.beta);
    }

    this.numQubits = newNumQubits;
    this.numStates = newNumStates;
    this.normalize();
  }

  /**
   * Aplica a porta Hadamard no qubit especificado
   * @param {number} targetQubit - Índice do qubit (0-indexado)
   */
  applyHadamard(targetQubit) {
    if (targetQubit >= this.numQubits) {
      throw new Error(`Qubit ${targetQubit} não existe no registro`);
    }

    const sqrt2 = Math.sqrt(2);
    const newAmplitudes = new Array(this.numStates).fill(null).map(() => new Complex(0, 0));

    for (let state = 0; state < this.numStates; state++) {
      const bit = (state >> (this.numQubits - 1 - targetQubit)) & 1;
      const flippedState = state ^ (1 << (this.numQubits - 1 - targetQubit));

      if (bit === 0) {
        // |0⟩ -> (|0⟩ + |1⟩)/√2
        newAmplitudes[state] = newAmplitudes[state].add(
          this.amplitudes[state].multiply(new Complex(1/sqrt2, 0))
        );
        newAmplitudes[flippedState] = newAmplitudes[flippedState].add(
          this.amplitudes[state].multiply(new Complex(1/sqrt2, 0))
        );
      } else {
        // |1⟩ -> (|0⟩ - |1⟩)/√2
        newAmplitudes[flippedState] = newAmplitudes[flippedState].add(
          this.amplitudes[state].multiply(new Complex(1/sqrt2, 0))
        );
        newAmplitudes[state] = newAmplitudes[state].add(
          this.amplitudes[state].multiply(new Complex(-1/sqrt2, 0))
        );
      }
    }

    this.amplitudes = newAmplitudes;
  }

  /**
   * Aplica a porta Pauli-X no qubit especificado
   * @param {number} targetQubit - Índice do qubit (0-indexado)
   */
  applyPauliX(targetQubit) {
    if (targetQubit >= this.numQubits) {
      throw new Error(`Qubit ${targetQubit} não existe no registro`);
    }

    const newAmplitudes = new Array(this.numStates).fill(null).map(() => new Complex(0, 0));

    for (let state = 0; state < this.numStates; state++) {
      const flippedState = state ^ (1 << (this.numQubits - 1 - targetQubit));
      newAmplitudes[flippedState] = this.amplitudes[state];
    }

    this.amplitudes = newAmplitudes;
  }

  /**
   * Aplica a porta Pauli-Y no qubit especificado
   * @param {number} targetQubit - Índice do qubit (0-indexado)
   */
  applyPauliY(targetQubit) {
    if (targetQubit >= this.numQubits) {
      throw new Error(`Qubit ${targetQubit} não existe no registro`);
    }

    const newAmplitudes = new Array(this.numStates).fill(null).map(() => new Complex(0, 0));

    for (let state = 0; state < this.numStates; state++) {
      const bit = (state >> (this.numQubits - 1 - targetQubit)) & 1;
      const flippedState = state ^ (1 << (this.numQubits - 1 - targetQubit));

      if (bit === 0) {
        // |0⟩ -> i|1⟩
        newAmplitudes[flippedState] = this.amplitudes[state].multiply(new Complex(0, 1));
      } else {
        // |1⟩ -> -i|0⟩
        newAmplitudes[flippedState] = this.amplitudes[state].multiply(new Complex(0, -1));
      }
    }

    this.amplitudes = newAmplitudes;
  }

  /**
   * Aplica a porta Pauli-Z no qubit especificado
   * @param {number} targetQubit - Índice do qubit (0-indexado)
   */
  applyPauliZ(targetQubit) {
    if (targetQubit >= this.numQubits) {
      throw new Error(`Qubit ${targetQubit} não existe no registro`);
    }

    for (let state = 0; state < this.numStates; state++) {
      const bit = (state >> (this.numQubits - 1 - targetQubit)) & 1;
      if (bit === 1) {
        this.amplitudes[state] = new Complex(-this.amplitudes[state].real, -this.amplitudes[state].imag);
      }
    }
  }

  /**
   * Aplica a porta CNOT (Controlled-NOT)
   * @param {number} controlQubit - Índice do qubit de controle
   * @param {number} targetQubit - Índice do qubit alvo
   */
  applyCNOT(controlQubit, targetQubit) {
    if (controlQubit >= this.numQubits || targetQubit >= this.numQubits) {
      throw new Error(`Qubit inválido no registro`);
    }

    const newAmplitudes = new Array(this.numStates).fill(null).map(() => new Complex(0, 0));

    for (let state = 0; state < this.numStates; state++) {
      const controlBit = (state >> (this.numQubits - 1 - controlQubit)) & 1;

      if (controlBit === 1) {
        // Se controle é |1⟩, aplica X no target
        const flippedState = state ^ (1 << (this.numQubits - 1 - targetQubit));
        newAmplitudes[flippedState] = this.amplitudes[state];
      } else {
        // Se controle é |0⟩, mantém o estado
        newAmplitudes[state] = this.amplitudes[state];
      }
    }

    this.amplitudes = newAmplitudes;
  }

  /**
   * Aplica uma porta de fase no qubit especificado
   * @param {number} targetQubit - Índice do qubit
   * @param {number} phase - Fase em radianos
   */
  applyPhase(targetQubit, phase) {
    if (targetQubit >= this.numQubits) {
      throw new Error(`Qubit ${targetQubit} não existe no registro`);
    }

    const phaseComplex = Complex.fromPolar(1, phase);

    for (let state = 0; state < this.numStates; state++) {
      const bit = (state >> (this.numQubits - 1 - targetQubit)) & 1;
      if (bit === 1) {
        this.amplitudes[state] = this.amplitudes[state].multiply(phaseComplex);
      }
    }
  }

  /**
   * Mede todos os qubits do registro
   * @returns {Array<number>} Array com os resultados das medições (0s e 1s)
   */
  measureAll() {
    // Calcula probabilidades de cada estado
    const probabilities = this.amplitudes.map(amp => amp.magnitude() ** 2);

    // Escolhe um estado baseado nas probabilidades
    const random = Math.random();
    let cumulativeProb = 0;
    let measuredState = 0;

    for (let i = 0; i < probabilities.length; i++) {
      cumulativeProb += probabilities[i];
      if (random < cumulativeProb) {
        measuredState = i;
        break;
      }
    }

    // Colapsa para o estado medido
    this.amplitudes.fill(new Complex(0, 0));
    this.amplitudes[measuredState] = new Complex(1, 0);

    // Converte o estado para array de bits
    const result = [];
    for (let i = this.numQubits - 1; i >= 0; i--) {
      result.push((measuredState >> i) & 1);
    }

    return result;
  }

  /**
   * Mede um qubit específico
   * @param {number} targetQubit - Índice do qubit a ser medido
   * @returns {number} 0 ou 1
   */
  measureQubit(targetQubit) {
    if (targetQubit >= this.numQubits) {
      throw new Error(`Qubit ${targetQubit} não existe no registro`);
    }

    // Calcula probabilidade de medir |0⟩
    let prob0 = 0;
    for (let state = 0; state < this.numStates; state++) {
      const bit = (state >> (this.numQubits - 1 - targetQubit)) & 1;
      if (bit === 0) {
        prob0 += this.amplitudes[state].magnitude() ** 2;
      }
    }

    const result = Math.random() < prob0 ? 0 : 1;

    // Colapsa o estado
    const newAmplitudes = new Array(this.numStates).fill(null).map(() => new Complex(0, 0));
    let norm = 0;

    for (let state = 0; state < this.numStates; state++) {
      const bit = (state >> (this.numQubits - 1 - targetQubit)) & 1;
      if (bit === result) {
        newAmplitudes[state] = this.amplitudes[state];
        norm += this.amplitudes[state].magnitude() ** 2;
      }
    }

    // Renormaliza
    if (norm > 0) {
      const normFactor = Math.sqrt(norm);
      for (let i = 0; i < this.numStates; i++) {
        newAmplitudes[i] = new Complex(
          newAmplitudes[i].real / normFactor,
          newAmplitudes[i].imag / normFactor
        );
      }
    }

    this.amplitudes = newAmplitudes;
    return result;
  }

  /**
   * Calcula a paridade (XOR) de todos os qubits sem colapsar o estado
   * @returns {number} Paridade esperada (0 ou 1)
   */
  checkParity() {
    let expectedParity = 0;

    for (let state = 0; state < this.numStates; state++) {
      const probability = this.amplitudes[state].magnitude() ** 2;

      // Conta número de 1s no estado
      let parity = 0;
      for (let i = 0; i < this.numQubits; i++) {
        parity ^= (state >> i) & 1;
      }

      expectedParity += parity * probability;
    }

    return Math.round(expectedParity);
  }

  /**
   * Retorna o estado atual do registro como string
   * @returns {string} Representação do estado quântico
   */
  getState() {
    let result = "";

    for (let i = 0; i < this.numStates; i++) {
      const amplitude = this.amplitudes[i];

      if (Math.abs(amplitude.real) > 1e-10 || Math.abs(amplitude.imag) > 1e-10) {
        if (result.length > 0) {
          result += " + ";
        }

        // Converte índice para string binária
        const binaryState = i.toString(2).padStart(this.numQubits, '0');

        if (Math.abs(amplitude.imag) < 1e-10) {
          result += `${amplitude.real.toFixed(3)}|${binaryState}⟩`;
        } else {
          result += `(${amplitude.real.toFixed(3)}${amplitude.imag >= 0 ? '+' : ''}${amplitude.imag.toFixed(3)}i)|${binaryState}⟩`;
        }
      }
    }

    return result || `1.000|${'0'.repeat(this.numQubits)}⟩`;
  }

  /**
   * Retorna as probabilidades de todos os estados
   * @returns {Array<number>} Array com as probabilidades
   */
  getProbabilities() {
    return this.amplitudes.map(amp => amp.magnitude() ** 2);
  }

  /**
   * Cria uma cópia do registro quântico
   * @returns {QuantumRegister} Nova instância com o mesmo estado
   */
  clone() {
    const newRegister = new QuantumRegister(this.numQubits);
    newRegister.amplitudes = this.amplitudes.map(amp =>
      new Complex(amp.real, amp.imag)
    );
    return newRegister;
  }
}
