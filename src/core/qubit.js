/**
 * Representa um número complexo para cálculos quânticos
 */
class Complex {
  constructor(real = 0, imag = 0) {
    this.real = real;
    this.imag = imag;
  }

  // Magnitude (módulo) do número complexo
  magnitude() {
    return Math.sqrt(this.real * this.real + this.imag * this.imag);
  }

  // Conjugado complexo
  conjugate() {
    return new Complex(this.real, -this.imag);
  }

  // Multiplicação de números complexos
  multiply(other) {
    const real = this.real * other.real - this.imag * other.imag;
    const imag = this.real * other.imag + this.imag * other.real;
    return new Complex(real, imag);
  }

  // Adição de números complexos
  add(other) {
    return new Complex(this.real + other.real, this.imag + other.imag);
  }

  // Exponencial complexa: e^(i*theta)
  static fromPolar(magnitude, phase) {
    return new Complex(
      magnitude * Math.cos(phase),
      magnitude * Math.sin(phase)
    );
  }
}

/**
 * Classe Qubit - Implementação correta de um qubit quântico
 * Um qubit é representado como |ψ⟩ = α|0⟩ + β|1⟩
 * onde α e β são amplitudes complexas e |α|² + |β|² = 1
 */
export class Qubit {
  /**
   * Cria um novo qubit
   * @param {Complex} alpha - Amplitude do estado |0⟩ (padrão: 1+0i)
   * @param {Complex} beta - Amplitude do estado |1⟩ (padrão: 0+0i)
   */
  constructor(alpha = new Complex(1, 0), beta = new Complex(0, 0)) {
    this.alpha = alpha;
    this.beta = beta;
    this.normalize();
  }

  /**
   * Normaliza o estado quântico para garantir |α|² + |β|² = 1
   */
  normalize() {
    const norm = Math.sqrt(
      this.alpha.magnitude() ** 2 + this.beta.magnitude() ** 2
    );
    if (norm > 0) {
      this.alpha = new Complex(this.alpha.real / norm, this.alpha.imag / norm);
      this.beta = new Complex(this.beta.real / norm, this.beta.imag / norm);
    }
  }

  /**
   * Realiza uma medição quântica no qubit
   * @returns {number} 0 ou 1 baseado nas probabilidades quânticas
   */
  measure() {
    const prob0 = this.alpha.magnitude() ** 2;
    const prob1 = this.beta.magnitude() ** 2;

    const random = Math.random();

    if (random < prob0) {
      // Colapso para |0⟩
      this.alpha = new Complex(1, 0);
      this.beta = new Complex(0, 0);
      return 0;
    } else {
      // Colapso para |1⟩
      this.alpha = new Complex(0, 0);
      this.beta = new Complex(1, 0);
      return 1;
    }
  }

  /**
   * Aplica a porta Hadamard: H = (1/√2)[[1,1],[1,-1]]
   */
  applyHadamard() {
    const sqrt2 = Math.sqrt(2);
    const newAlpha = new Complex(
      (this.alpha.real + this.beta.real) / sqrt2,
      (this.alpha.imag + this.beta.imag) / sqrt2
    );
    const newBeta = new Complex(
      (this.alpha.real - this.beta.real) / sqrt2,
      (this.alpha.imag - this.beta.imag) / sqrt2
    );

    this.alpha = newAlpha;
    this.beta = newBeta;
  }

  /**
   * Aplica a porta Pauli-X (NOT): X = [[0,1],[1,0]]
   */
  applyPauliX() {
    const temp = this.alpha;
    this.alpha = this.beta;
    this.beta = temp;
  }

  /**
   * Aplica a porta Pauli-Y: Y = [[0,-i],[i,0]]
   */
  applyPauliY() {
    const newAlpha = new Complex(this.beta.imag, -this.beta.real);
    const newBeta = new Complex(-this.alpha.imag, this.alpha.real);

    this.alpha = newAlpha;
    this.beta = newBeta;
  }

  /**
   * Aplica a porta Pauli-Z: Z = [[1,0],[0,-1]]
   */
  applyPauliZ() {
    this.beta = new Complex(-this.beta.real, -this.beta.imag);
  }

  /**
   * Rotação em torno do eixo X: RX(θ) = [[cos(θ/2), -i*sin(θ/2)], [-i*sin(θ/2), cos(θ/2)]]
   * @param {number} angle - Ângulo de rotação em radianos
   */
  rotateX(angle) {
    const cos = Math.cos(angle / 2);
    const sin = Math.sin(angle / 2);

    const newAlpha = new Complex(
      cos * this.alpha.real + sin * this.beta.imag,
      cos * this.alpha.imag - sin * this.beta.real
    );
    const newBeta = new Complex(
      cos * this.beta.real + sin * this.alpha.imag,
      cos * this.beta.imag - sin * this.alpha.real
    );

    this.alpha = newAlpha;
    this.beta = newBeta;
  }

  /**
   * Rotação em torno do eixo Y: RY(θ) = [[cos(θ/2), -sin(θ/2)], [sin(θ/2), cos(θ/2)]]
   * @param {number} angle - Ângulo de rotação em radianos
   */
  rotateY(angle) {
    const cos = Math.cos(angle / 2);
    const sin = Math.sin(angle / 2);

    const newAlpha = new Complex(
      cos * this.alpha.real - sin * this.beta.real,
      cos * this.alpha.imag - sin * this.beta.imag
    );
    const newBeta = new Complex(
      sin * this.alpha.real + cos * this.beta.real,
      sin * this.alpha.imag + cos * this.beta.imag
    );

    this.alpha = newAlpha;
    this.beta = newBeta;
  }

  /**
   * Rotação em torno do eixo Z: RZ(θ) = [[e^(-iθ/2), 0], [0, e^(iθ/2)]]
   * @param {number} angle - Ângulo de rotação em radianos
   */
  rotateZ(angle) {
    const phase1 = Complex.fromPolar(1, -angle / 2);
    const phase2 = Complex.fromPolar(1, angle / 2);

    this.alpha = this.alpha.multiply(phase1);
    this.beta = this.beta.multiply(phase2);
  }

  /**
   * Aplica uma porta de fase: P(φ) = [[1, 0], [0, e^(iφ)]]
   * @param {number} phase - Fase em radianos
   */
  applyPhase(phase) {
    const phaseComplex = Complex.fromPolar(1, phase);
    this.beta = this.beta.multiply(phaseComplex);
  }

  /**
   * Retorna o estado atual do qubit como string
   * @returns {string} Representação do estado quântico
   */
  getState() {
    const alpha = this.alpha;
    const beta = this.beta;

    let result = "";

    // Parte |0⟩
    if (Math.abs(alpha.real) > 1e-10 || Math.abs(alpha.imag) > 1e-10) {
      if (Math.abs(alpha.imag) < 1e-10) {
        result += `${alpha.real.toFixed(3)}|0⟩`;
      } else {
        result += `(${alpha.real.toFixed(3)}${alpha.imag >= 0 ? '+' : ''}${alpha.imag.toFixed(3)}i)|0⟩`;
      }
    }

    // Parte |1⟩
    if (Math.abs(beta.real) > 1e-10 || Math.abs(beta.imag) > 1e-10) {
      if (result.length > 0) {
        result += " + ";
      }
      if (Math.abs(beta.imag) < 1e-10) {
        result += `${beta.real.toFixed(3)}|1⟩`;
      } else {
        result += `(${beta.real.toFixed(3)}${beta.imag >= 0 ? '+' : ''}${beta.imag.toFixed(3)}i)|1⟩`;
      }
    }

    return result || "0|0⟩";
  }

  /**
   * Retorna as probabilidades de medição
   * @returns {Object} {prob0: number, prob1: number}
   */
  getProbabilities() {
    return {
      prob0: this.alpha.magnitude() ** 2,
      prob1: this.beta.magnitude() ** 2
    };
  }

  /**
   * Cria uma cópia do qubit
   * @returns {Qubit} Nova instância com o mesmo estado
   */
  clone() {
    return new Qubit(
      new Complex(this.alpha.real, this.alpha.imag),
      new Complex(this.beta.real, this.beta.imag)
    );
  }
}

// Exporta também a classe Complex para uso em outros módulos
export { Complex };
