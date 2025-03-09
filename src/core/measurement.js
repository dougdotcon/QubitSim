// Importe a classe Qubit
import { Qubit } from './qubit.js';

// Crie dois qubits
const qubit1 = new Qubit([1, 0]); // Estado |0>
const qubit2 = new Qubit([0, 1]); // Estado |1>

// Realize uma rotação em torno do eixo X no primeiro qubit
qubit1.rotateX(Math.PI / 2); // Rotação de 90 graus

// Realize uma rotação em torno do eixo Y no segundo qubit
qubit2.rotateY(Math.PI / 4); // Rotação de 45 graus

// Entrelace os dois qubits
qubit1.entangle(qubit2);

// Realize uma medição em cada qubit
const measurement1 = qubit1.measure();
const measurement2 = qubit2.measure();

// Exiba os resultados
console.log('Medição do qubit 1:', measurement1); // Resultado 0 ou 1
console.log('Medição do qubit 2:', measurement2); // Resultado 0 ou 1
