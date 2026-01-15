import { Qubit } from "../core/qubit.js";

export function generateRandomKey(length) {
  const key = [];
  for (let i = 0; i < length; i++) {
    // 1. Cria um qubit no estado |0⟩
    const qubit = new Qubit();

    // 2. Coloca em superposição quântica: (|0⟩ + |1⟩)/√2
    qubit.applyHadamard();

    // 3. O colapso da função de onda gera o bit aleatório verdadeiro
    const randomBit = qubit.measure();

    key.push(randomBit);
  }
  return key;
}