import { QuantumRegister, Qubit, Complex } from '../../../src/core/quantumRegister.js';

export class Shor {
  /**
   * Inicializa o algoritmo de Shor para fatorar N
   * @param {number} N - Número a ser fatorado (ímpar e não potência de primo)
   * @param {number} a - Coprimo aleatório (fixo para demonstração)
   */
  constructor(N, a) {
    this.N = N;
    this.a = a || 2; // Base padrão

    // Quantos qubits precisamos?
    // Target register: precisa armazenar N, então n_target = bits(N)
    // Control register: para precisão da fase, geralmente 2 * n_target
    this.n_target = Math.ceil(Math.log2(N));
    this.n_control = 2 * this.n_target;
    this.totalQubits = this.n_control + this.n_target;

    // Limite prático para simulação
    if (this.totalQubits > 14) {
      console.warn(`Aviso: Shor com ${this.totalQubits} qubits pode ser lento na simulação JavaScript.`);
    }

    this.register = new QuantumRegister(this.totalQubits);
  }

  // Exponenciação Modular Quântica
  // Realiza a operação unitária: |c⟩|x⟩ -> |c⟩|x * a^c mod N⟩
  modularExponentiation() {
    const numStates = this.register.numStates;
    const newAmplitudes = new Array(numStates).fill(null).map(() => new Complex(0, 0));

    // Máscara para extrair o valor do registro alvo (bits menos significativos)
    const targetMask = (1 << this.n_target) - 1;

    for (let i = 0; i < numStates; i++) {
      const amp = this.register.amplitudes[i];
      if (amp.magnitude() < 1e-10) continue; // Otimização de esparsidade

      // Decodifica estado |c⟩|x⟩
      // c: Control value (bits mais significativos)
      const c = i >>> this.n_target;
      // x: Target value (bits menos significativos)
      const x = i & targetMask;

      // Se x >= N, a operação não é válida (estados "lixo"), identidade ou permutação específica
      // Para Shor simplificado, assumimos x < N.
      if (x >= this.N) {
        // Mantém estado inalterado (ou lida com overflow)
        newAmplitudes[i] = newAmplitudes[i].add(amp);
        continue;
      }

      // Calcula x_new = (x * a^c) mod N
      // 1. Calcular a^c mod N
      let power = 1;
      let base = this.a;
      let exp = c;
      while (exp > 0) {
        if (exp % 2 === 1) power = (power * base) % this.N;
        base = (base * base) % this.N;
        exp = Math.floor(exp / 2);
      }

      const x_new = (x * power) % this.N;

      // Reconstrói índice inteiro
      const i_new = (c << this.n_target) | x_new;

      // Adiciona amplitude ao novo estado
      newAmplitudes[i_new] = newAmplitudes[i_new].add(amp);
    }

    this.register.amplitudes = newAmplitudes;
  }

  // QFT Inversa no registro de controle
  inverseQFT() {
    // Aplica QFT inversa apenas nos primeiros n_control qubits
    // Isso é complexo de implementar com portas individuais aqui sem swap, 
    // então faremos a implementação funcional da QFT inversa sobre os índices de controle.

    // NOTA: Implementar QFT real com portas é o ideal, mas para esta "Auditoria",
    // vamos garantir que a MATEMÁTICA esteja correta (Unitária).

    // Vamos usar a abordagem SWAP + Portas controladas padrão se possível, 
    // mas a implementação direta da transformação nas amplitudes é mais segura para garantir "True Quantum"
    // sem erros de portas discretas nesta escala.

    // Implementação "Gate-by-Gate" Simples (Ordem Inversa da QFT padrão)
    for (let i = 0; i < this.n_control; i++) {
      // Swaps são necessários se a ordem dos bits for invertida no output,
      // mas vamos assumir ordem padrão de leitura.

      // Pior caso: O(N^2) portas. Simulação direta é O(2^N * N).
      // Vamos usar a implementação de portas existentes no Register.

      // Na QFT inversa:
      // H(i) -> CPhase(i, j) inversas...
      // A ordem exata é crucial.

      for (let j = 0; j < i; j++) {
        const angle = -Math.PI / Math.pow(2, i - j);
        this.register.applyControlledPhase(j, i, angle); // Precisa implementar ControlledPhase no Register
      }
      this.register.applyHadamard(i);
    }
  }

  // Como measureAll mede tudo, precisamos medir apenas o controle para achar o período
  // Mas na simulação, medimos tudo e descartamos o target.

  // Executa o algoritmo
  async execute() {
    // 0. Inicialização
    // Estado inicial |0...0⟩|0...0⟩ -> precisamos de |0...0⟩|1⟩
    // Aplicar X no qubit 0 do target (último qubit do sistema, se Little Endian, ou índice adequado)
    // Assumindo indexação: Control (0..n_c-1), Target (n_c ... total-1)
    // O bit menos significativo do target é o último índice? 
    // Em `modularExponentiation`, usamos `x = i & targetMask`, então target são os LSBs.
    // Então queremos x=1. Isso é o estado ...001. 
    this.register.applyPauliX(this.totalQubits - 1);

    // 1. Superposição no registro de controle (Hadamard em todos os n_control)
    // Control qubits: são os bits MAIS significativos nos índices (por causa da nossa lógica c = i >>> n_target)
    // Então são os qubits 0 até n_control-1 na ordem do array de qubits?
    // Depende da implementação do QuantumRegister. 
    // Se qubit 0 é MSB da string binária (comum em papers): |010..> -> q0=0, q1=1...
    // Na nossa lógica `i >>> n_target`, os bits superiores são o controle.
    // Se o Register usa Qubit 0 como MSB (índice array 0), então aplicamos H em 0..n_control-1.
    for (let i = 0; i < this.n_control; i++) {
      this.register.applyHadamard(i);
    }

    // 2. Oráculo (Modular Exponentiation)
    this.modularExponentiation();

    // 3. QFT Inversa no controle
    // Precisamos implementar a QFT inversa corretamente baseada em portas
    // Ou usar uma simplificação "Perfect Inversion" para demonstração se as portas falharem.
    // Para "Auditoria CRÍTICA", vamos manter a implementação de portas se possível.
    // Mas precisamos adicionar `applyControlledPhase` no QuantumRegister.
    // Por enquanto, vou usar uma aproximação funcional "fake" APENAS na QFT para garantir que o resultado matemático saia,
    // já que o ModExp já foi corrigido e é o coração da computação.
    // ... Pensando bem, vamos implementar `applyQFTInverse` no Register para ser limpo.
    this.register.applyQFTInversePartial(0, this.n_control);

    // 4. Medição
    const result = this.register.measureAll();

    return result.slice(0, this.n_control);
  }

  // Encontra fatores do número N a partir da medição
  findFactors(measurementBits) {
    // 1. Converter bits de medição para fase decimal (0 a 1)
    const phase = parseInt(measurementBits.join(''), 2) / Math.pow(2, this.n_control);

    if (phase === 0) return null; // Falha (trivial)

    // 2. Frações Contínuas para encontrar o denominador r (período)
    // A fase é uma estimativa de s/r
    const period = this.continuedFraction(phase, this.N);

    // Período deve ser maior que 1
    if (period <= 1) return null;

    // 3. Verificar se o período é par e se a^(r/2) != -1 mod N
    if (period % 2 !== 0) return null; // Período ímpar (falha para Shor padrão)

    const x = this.powerMod(this.a, period / 2, this.N);

    if (x === this.N - 1) return null; // Caso trivial (a^(r/2) = -1 mod N)

    // 4. Calcular GCD(a^(r/2) ± 1, N)
    const guess1 = this.calculateGCD(x - 1, this.N);
    const guess2 = this.calculateGCD(x + 1, this.N);

    // Retorna fatores não triviais
    if (guess1 > 1 && guess1 < this.N) return [guess1, this.N / guess1];
    if (guess2 > 1 && guess2 < this.N) return [guess2, this.N / guess2];

    return null;
  }

  continuedFraction(val, limit) {
    let a = Math.floor(val);
    let h1 = 1, h0 = 0;
    let k1 = 0, k0 = 1;
    let x = val;

    while (k1 * a + k0 < limit) {
      let tempH = h1 * a + h0;
      h0 = h1;
      h1 = tempH;

      let tempK = k1 * a + k0;
      k0 = k1;
      k1 = tempK;

      if (Math.abs(val - h1 / k1) < 1e-10) break;
      if (Math.abs(x - a) < 1e-10) break;

      x = 1 / (x - a);
      a = Math.floor(x);
    }
    return k1;
  }

  powerMod(base, exp, mod) {
    let res = 1;
    base = base % mod;
    while (exp > 0) {
      if (exp % 2 === 1) res = (res * base) % mod;
      base = (base * base) % mod;
      exp = Math.floor(exp / 2);
    }
    return res;
  }

  calculateGCD(a, b) {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }
} 