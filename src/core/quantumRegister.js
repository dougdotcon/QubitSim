import { Qubit, Complex } from "./qubit.js";
import { calculateVacuumFluctuation } from "./unified_physics.js";

export { Qubit, Complex };

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
   * Aplica decoerência entrópica a todo o registro
   * Simula a perda de informação para o ambiente (vácuo)
   * @param {number} intensity - Intensidade da decoerência
   */
  applyEntropicDecoherence(intensity = 0.001) {
    this.amplitudes = this.amplitudes.map(amp => {
      const fluctuation = calculateVacuumFluctuation(intensity);
      return amp.add(fluctuation);
    });
    this.normalize();
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
          this.amplitudes[state].multiply(new Complex(1 / sqrt2, 0))
        );
        newAmplitudes[flippedState] = newAmplitudes[flippedState].add(
          this.amplitudes[state].multiply(new Complex(1 / sqrt2, 0))
        );
      } else {
        // |1⟩ -> (|0⟩ - |1⟩)/√2
        newAmplitudes[flippedState] = newAmplitudes[flippedState].add(
          this.amplitudes[state].multiply(new Complex(1 / sqrt2, 0))
        );
        newAmplitudes[state] = newAmplitudes[state].add(
          this.amplitudes[state].multiply(new Complex(-1 / sqrt2, 0))
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
    if (targetQubit < 0 || targetQubit >= this.numQubits) {
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
   * Aplica a porta SWAP entre dois qubits
   * @param {number} qubit1 - Índice do primeiro qubit
   * @param {number} qubit2 - Índice do segundo qubit
   */
  applySwap(qubit1, qubit2) {
    if (qubit1 >= this.numQubits || qubit2 >= this.numQubits) {
      console.log(`Throwing error for invalid swap: ${qubit1}, ${qubit2} in size ${this.numQubits}`);
      throw new Error(`Qubit inválido no registro`);
    }
    const newAmplitudes = new Array(this.numStates).fill(null).map(() => new Complex(0, 0));
    for (let state = 0; state < this.numStates; state++) {
      const bit1 = (state >> (this.numQubits - 1 - qubit1)) & 1;
      const bit2 = (state >> (this.numQubits - 1 - qubit2)) & 1;
      if (bit1 !== bit2) {
        const mask = (1 << (this.numQubits - 1 - qubit1)) | (1 << (this.numQubits - 1 - qubit2));
        const swappedState = state ^ mask;
        newAmplitudes[swappedState] = this.amplitudes[state];
      } else {
        newAmplitudes[state] = this.amplitudes[state];
      }
    }
    this.amplitudes = newAmplitudes;
  }

  /**
   * Aplica a porta Toffoli (CCNOT)
   * @param {number} control1 - Primeiro qubit de controle
   * @param {number} control2 - Segundo qubit de controle
   * @param {number} target - Qubit alvo
   */
  applyToffoli(control1, control2, target) {
    if (control1 >= this.numQubits || control2 >= this.numQubits || target >= this.numQubits) {
      throw new Error(`Qubit inválido no registro`);
    }
    const newAmplitudes = new Array(this.numStates).fill(null).map(() => new Complex(0, 0));
    for (let state = 0; state < this.numStates; state++) {
      const b1 = (state >> (this.numQubits - 1 - control1)) & 1;
      const b2 = (state >> (this.numQubits - 1 - control2)) & 1;
      if (b1 === 1 && b2 === 1) {
        const flippedState = state ^ (1 << (this.numQubits - 1 - target));
        newAmplitudes[flippedState] = this.amplitudes[state];
      } else {
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

  applyPhaseS(targetQubit) { this.applyPhase(targetQubit, Math.PI / 2); }
  applyT(targetQubit) { this.applyPhase(targetQubit, Math.PI / 4); }

  applyRX(targetQubit, theta) {
    if (targetQubit >= this.numQubits) throw new Error("Invalid Qubit");
    const cos = Math.cos(theta / 2);
    const sin = Math.sin(theta / 2);
    const newAmplitudes = new Array(this.numStates).fill(null).map(() => new Complex(0, 0));
    for (let state = 0; state < this.numStates; state++) {
      const bit = (state >> (this.numQubits - 1 - targetQubit)) & 1;
      const flipped = state ^ (1 << (this.numQubits - 1 - targetQubit));
      let termStart = this.amplitudes[state];
      if (bit === 0) {
        newAmplitudes[state] = newAmplitudes[state].add(termStart.multiply(new Complex(cos, 0)));
        newAmplitudes[flipped] = newAmplitudes[flipped].add(termStart.multiply(new Complex(0, -sin)));
      } else {
        newAmplitudes[flipped] = newAmplitudes[flipped].add(termStart.multiply(new Complex(0, -sin)));
        newAmplitudes[state] = newAmplitudes[state].add(termStart.multiply(new Complex(cos, 0)));
      }
    }
    this.amplitudes = newAmplitudes;
  }

  applyRY(targetQubit, theta) {
    const cos = Math.cos(theta / 2);
    const sin = Math.sin(theta / 2);
    const newAmplitudes = new Array(this.numStates).fill(null).map(() => new Complex(0, 0));
    for (let state = 0; state < this.numStates; state++) {
      const bit = (state >> (this.numQubits - 1 - targetQubit)) & 1;
      const flipped = state ^ (1 << (this.numQubits - 1 - targetQubit));
      let termStart = this.amplitudes[state];
      if (bit === 0) {
        newAmplitudes[state] = newAmplitudes[state].add(termStart.multiply(new Complex(cos, 0)));
        newAmplitudes[flipped] = newAmplitudes[flipped].add(termStart.multiply(new Complex(sin, 0)));
      } else {
        newAmplitudes[flipped] = newAmplitudes[flipped].add(termStart.multiply(new Complex(-sin, 0)));
        newAmplitudes[state] = newAmplitudes[state].add(termStart.multiply(new Complex(cos, 0)));
      }
    }
    this.amplitudes = newAmplitudes;
  }


  /**
   * Aplica porta S (Fase PI/2)
   */
  applyPhaseS(targetQubit) {
    this.applyPhase(targetQubit, Math.PI / 2);
  }

  /**
   * Aplica porta T (Fase PI/4)
   */
  applyT(targetQubit) {
    this.applyPhase(targetQubit, Math.PI / 4);
  }

  // Rotações arbitrárias (simplificadas para teste, implementação real requer matrizes de rotação completas)
  // RX(theta) = [cos(t/2) -isin(t/2); -isin(t/2) cos(t/2)]
  applyRX(targetQubit, theta) {
    if (targetQubit >= this.numQubits) throw new Error("Invalid Qubit");

    const cos = Math.cos(theta / 2);
    const sin = Math.sin(theta / 2);
    const newAmplitudes = new Array(this.numStates).fill(null).map(() => new Complex(0, 0));

    for (let state = 0; state < this.numStates; state++) {
      const bit = (state >> (this.numQubits - 1 - targetQubit)) & 1;
      const flipped = state ^ (1 << (this.numQubits - 1 - targetQubit));

      // Se bit 0: contribui para 0 (cos) e 1 (-isin)
      // Se bit 1: contribui para 0 (-isin) e 1 (cos)

      let termStart = this.amplitudes[state]; // Amplitute original deste estado

      // Aferição direta na matriz unitária
      if (bit === 0) {
        // |0> -> cos|0> - i*sin|1>
        newAmplitudes[state] = newAmplitudes[state].add(termStart.multiply(new Complex(cos, 0)));
        newAmplitudes[flipped] = newAmplitudes[flipped].add(termStart.multiply(new Complex(0, -sin)));
      } else {
        // |1> -> -i*sin|0> + cos|1>
        newAmplitudes[flipped] = newAmplitudes[flipped].add(termStart.multiply(new Complex(0, -sin)));
        newAmplitudes[state] = newAmplitudes[state].add(termStart.multiply(new Complex(cos, 0)));
      }
    }
    this.amplitudes = newAmplitudes;
  }

  applyRY(targetQubit, theta) {
    // RY(theta) = [cos(t/2) -sin(t/2); sin(t/2) cos(t/2)]
    const cos = Math.cos(theta / 2);
    const sin = Math.sin(theta / 2);
    const newAmplitudes = new Array(this.numStates).fill(null).map(() => new Complex(0, 0));

    for (let state = 0; state < this.numStates; state++) {
      const bit = (state >> (this.numQubits - 1 - targetQubit)) & 1;
      const flipped = state ^ (1 << (this.numQubits - 1 - targetQubit));

      let termStart = this.amplitudes[state];

      if (bit === 0) {
        // |0> -> cos|0> + sin|1>
        newAmplitudes[state] = newAmplitudes[state].add(termStart.multiply(new Complex(cos, 0)));
        newAmplitudes[flipped] = newAmplitudes[flipped].add(termStart.multiply(new Complex(sin, 0)));
      } else {
        // |1> -> -sin|0> + cos|1>
        newAmplitudes[flipped] = newAmplitudes[flipped].add(termStart.multiply(new Complex(-sin, 0)));
        newAmplitudes[state] = newAmplitudes[state].add(termStart.multiply(new Complex(cos, 0)));
      }
    }
    this.amplitudes = newAmplitudes;
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
   * Aplica Porta de Fase Controlada (CPHASE)
   * @param {number} controlQubit
   * @param {number} targetQubit
   * @param {number} angle
   */
  applyControlledPhase(controlQubit, targetQubit, angle) {
    const phaseComplex = Complex.fromPolar(1, angle);

    for (let state = 0; state < this.numStates; state++) {
      const controlBit = (state >> (this.numQubits - 1 - controlQubit)) & 1;
      const targetBit = (state >> (this.numQubits - 1 - targetQubit)) & 1;

      if (controlBit === 1 && targetBit === 1) {
        this.amplitudes[state] = this.amplitudes[state].multiply(phaseComplex);
      }
    }
  }

  /**
   * Aplica QFT Inversa em um subconjunto de qubits
   */
  applyQFTInversePartial(startQubit, numQubits) {
    // Implementação padrão da QFT inversa com portas
    for (let i = startQubit; i < startQubit + numQubits; i++) {
      for (let j = startQubit; j < i; j++) {
        const angle = -Math.PI / Math.pow(2, i - j);
        this.applyControlledPhase(j, i, angle);
      }
      this.applyHadamard(i);
    }
    // Nota: Geralmente precisa de SWAPs no final se a ordem dos bits importar,
    // mas depende da convenção de leitura.
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
