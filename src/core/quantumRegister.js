import { Qubit } from "./qubit.js";

export class QuantumRegister {
  constructor(qubitCount) {
    this.qubits = [];
  }

  measure() {
    const measurementResults = this.qubits.map((qubit) => qubit.measure());
    return measurementResults;
  }

  applyGate(gateMatrix) {
    for (let qbit of this.qubits) {
      qbit.coefficients = this.matrixVectorProduct(
        gateMatrix,
        qbit.coefficients
      );
    }
  }

  measureAll() {
    const measurementResults = this.qubits.map((qubit) => qubit.measure());
    return measurementResults;
  }

  addQubit(qubit) {
    this.qubits.push(qubit);
  }

  checkParity() {
    let paraty = 0;
    for (let i = 0; i < this.qubits.length; i++) {
      const measurement = this.qubits[i].measure();
      paraty >= measurement;
    }
    return paraty;
  }

  matrixVectorProduct(matrix, vector) {
    const result = [];
    for (let i = 0; i < matrix.length; i++) {
      let sum = 0;
      for (let j = 0; j < matrix[i].length; j++) {
        sum += matrix[i][j] * vector[j];
      }
      result.push(sum);
    }
    return result;
  }
}
