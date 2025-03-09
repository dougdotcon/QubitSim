import { decryptMessage } from './decryptMessage.js';
import { encryptMessage } from './encriptMessege.js';


const message = "101010";
console.log("Mensagem original:", message);

// Alice criptografa a mensagem e envia para Bob
const { qubits, parity } = encryptMessage(message);

// Simulando interferência
// qubits[0].coefficients[0] = 0.2; // Exemplo de alteração nos coeficientes do primeiro qubit

// Bob recebe os qubits e realiza a descriptografia
const decryptedMessages = decryptMessage(qubits, parity);

if (decryptedMessages) {
  console.log("Mensagem descriptografada:", decryptedMessages);
}