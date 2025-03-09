export class Qubit {
  constructor(coefficients) {
    this.coefficients = coefficients;
  }

  measure() {
    const probabilities = this.coefficients.map(
      (coefficient) => Math.pow(Math.abs(coefficient), 2)
    );
    const randomNum = Math.random();
    let cumulativeProb = 0;

    for (let i = 0; i < probabilities.length; i++) {
      cumulativeProb += probabilities[i];
      if (randomNum < cumulativeProb) {
        return i; // Índice do estado medido
      }
    }
  }

  // Rotação de qubit em torno do eixo X
  rotateX(angle) {
    const rotationMatrix = [
      [Math.cos(angle / 2), -1 * Math.sin(angle / 2)],
      [-1 * Math.sin(angle / 2), Math.cos(angle / 2)],
    ];

    this.coefficients = this.applyMatrix(rotationMatrix, this.coefficients);
  }

  // Rotação de qubit em torno do eixo Y
  rotateY(angle) {
    const rotationMatrix = [
      [Math.cos(angle / 2), -Math.sin(angle / 2)],
      [Math.sin(angle / 2), Math.cos(angle / 2)],
    ];

    this.coefficients = this.applyMatrix(rotationMatrix, this.coefficients);
  }

  // Rotação de qubit em torno do eixo Z (inversão de fase)
  rotateZ(angle) {
    const rotationMatrix = [
      [Math.exp(-1 * angle / 2), 0],
      [0, Math.exp(1 * angle / 2)],
    ];

    this.coefficients = this.applyMatrix(rotationMatrix, this.coefficients);
  }

  // Aplicar uma matriz unitária ao vetor de coeficientes do qubit
  applyMatrix(matrix, coefficients) {
    const result = [];
    for (let i = 0; i < matrix.length; i++) {
      let sum = 0;
      for (let j = 0; j < matrix[i].length; j++) {
        sum += matrix[i][j] * coefficients[j];
      }
      result.push(sum);
    }
    return result;
  }

  // Entrelaçar dois qubits
  entangle(qubit) {
    const entangledCoefficients = [];
    for (const coefficient1 of this.coefficients) {
      for (const coefficient2 of qubit.coefficients) {
        entangledCoefficients.push(coefficient1 * coefficient2);
      }
    }
    this.coefficients = entangledCoefficients;
  }
}
