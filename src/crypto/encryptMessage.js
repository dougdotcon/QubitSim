import { QuantumRegister } from "./quantumRegister.js";
import { Qubit } from "./qubit.js";


export function encryptMessage(message) {
  const quantumRegister = new QuantumRegister();

  // Preparação dos qubits com a mensagem
  for (let i = 0; i < message.length; i++) {
    const bit = message[i];
    const qubit = new Qubit([bit, Math.sqrt(1 - bit * bit)]);
    quantumRegister.addQubit(qubit);
  }

  // Detecção de interferência
  const parity = quantumRegister.checkParity();

  // Envio dos qubits para Bob (com paridade)
  const qubits = quantumRegister.qubits;

  return { qubits, parity };
}