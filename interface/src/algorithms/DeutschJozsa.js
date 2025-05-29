import { QuantumRegister } from '../../../src/core/quantumRegister.js';

/**
 * Implementação correta do Algoritmo Deutsch-Jozsa
 * Determina se uma função booleana é constante ou balanceada com apenas uma consulta
 *
 * @param {Function} oracleFunction - Função que retorna 0 ou 1 para entrada binária
 * @param {number} numQubits - Número de qubits de entrada
 * @returns {Object} Resultado do algoritmo
 */
export function deutschJozsaAlgorithm(oracleFunction, numQubits) {
  // Cria um registro quântico com n+1 qubits (n para entrada, 1 auxiliar)
  const register = new QuantumRegister(numQubits + 1);

  // Passo 1: Inicialização
  // Qubits de entrada começam em |0⟩, qubit auxiliar em |1⟩
  register.applyPauliX(numQubits); // Coloca o último qubit em |1⟩

  // Passo 2: Aplica Hadamard em todos os qubits
  for (let i = 0; i <= numQubits; i++) {
    register.applyHadamard(i);
  }

  // Passo 3: Aplica o oráculo
  applyOracle(register, oracleFunction, numQubits);

  // Passo 4: Aplica Hadamard novamente nos qubits de entrada
  for (let i = 0; i < numQubits; i++) {
    register.applyHadamard(i);
  }

  // Passo 5: Mede os qubits de entrada
  const measurements = [];
  for (let i = 0; i < numQubits; i++) {
    measurements.push(register.measureQubit(i));
  }

  // Se todos os qubits de entrada são 0, a função é constante
  const isConstant = measurements.every(bit => bit === 0);

  return {
    result: isConstant ? "Constante" : "Balanceada",
    measurements: measurements,
    confidence: 1.0 // Algoritmo quântico é determinístico para este problema
  };
}

/**
 * Aplica o oráculo quântico para a função dada
 * O oráculo implementa Uf|x⟩|y⟩ = |x⟩|y ⊕ f(x)⟩
 *
 * @param {QuantumRegister} register - Registro quântico
 * @param {Function} oracleFunction - Função a ser testada
 * @param {number} numQubits - Número de qubits de entrada
 */
function applyOracle(register, oracleFunction, numQubits) {
  // Para cada estado base possível, aplica a função
  const numStates = Math.pow(2, numQubits + 1);

  // Cria uma cópia das amplitudes para modificação
  const newAmplitudes = [...register.amplitudes];

  for (let state = 0; state < numStates; state++) {
    // Extrai os bits de entrada (primeiros numQubits bits)
    const inputBits = [];
    for (let i = 0; i < numQubits; i++) {
      inputBits.push((state >> (numQubits - i)) & 1);
    }

    // Converte para string binária
    const inputString = inputBits.join('');

    // Aplica a função
    const functionOutput = oracleFunction(inputString);

    // Se f(x) = 1, aplica X no qubit auxiliar (inverte o último bit)
    if (functionOutput === 1 || functionOutput === "1") {
      const auxiliarBit = state & 1;
      const flippedState = state ^ 1; // Inverte o último bit

      // Troca as amplitudes
      const temp = newAmplitudes[state];
      newAmplitudes[state] = newAmplitudes[flippedState];
      newAmplitudes[flippedState] = temp;
    }
  }

  register.amplitudes = newAmplitudes;
}

/**
 * Funções de exemplo para teste
 */
export const exampleFunctions = {
  // Função constante que sempre retorna 0
  constant0: (input) => 0,

  // Função constante que sempre retorna 1
  constant1: (input) => 1,

  // Função balanceada: retorna 1 se o primeiro bit é 1
  balancedFirstBit: (input) => parseInt(input[0]),

  // Função balanceada: retorna paridade (XOR de todos os bits)
  balancedParity: (input) => {
    return input.split('').reduce((acc, bit) => acc ^ parseInt(bit), 0);
  },

  // Função balanceada: retorna 1 se número ímpar de 1s
  balancedOddOnes: (input) => {
    const count = input.split('').filter(bit => bit === '1').length;
    return count % 2;
  }
};

/**
 * Executa o algoritmo com uma função de exemplo
 * @param {string} functionName - Nome da função de exemplo
 * @param {number} numQubits - Número de qubits
 * @returns {Object} Resultado do algoritmo
 */
export function runDeutschJozsaExample(functionName, numQubits = 2) {
  const func = exampleFunctions[functionName];
  if (!func) {
    throw new Error(`Função ${functionName} não encontrada`);
  }

  console.log(`🔬 Executando Deutsch-Jozsa com função ${functionName} (${numQubits} qubits)`);

  const result = deutschJozsaAlgorithm(func, numQubits);

  console.log(`📊 Resultado: ${result.result}`);
  console.log(`📏 Medições: [${result.measurements.join(', ')}]`);
  console.log(`🎯 Confiança: ${(result.confidence * 100).toFixed(1)}%`);

  return result;
}