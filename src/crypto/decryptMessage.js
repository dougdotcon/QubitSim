import { QuantumRegister } from "./quantumRegister.js";
import { Qubit } from "./qubit.js";

export function decryptMessage(qubits, receivedParity) {
  const quantumRegister = new QuantumRegister();
  quantumRegister.qubits = qubits;

  // Detecção de interferência
  const calculatedParity = quantumRegister.checkParity();

  // Verificação de interferência
  if (receivedParity !== calculatedParity) {
    console.log("Interferência detectada durante a transmissão.");
    return null;
  }

  // Medição dos qubits
  const measurementResults = quantumRegister.measureAll();

  // Decodificação da mensagem
  let decryptedMessage = "";
  for (let i = 0; i < measurementResults.length; i++) {
    const bit = measurementResults[i];
    decryptedMessage += bit.toString();
  }

  return decryptedMessage;
}