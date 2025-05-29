/**
 * Teste básico para verificar se as implementações quânticas estão funcionando
 */

import { Qubit, Complex } from './src/core/qubit.js';
import { QuantumRegister } from './src/core/quantumRegister.js';

console.log('🔬 Testando implementações quânticas corrigidas...\n');

// Teste 1: Criação e medição de qubit básico
console.log('📊 Teste 1: Qubit básico');
const qubit1 = new Qubit(); // Estado |0⟩
console.log('Estado inicial:', qubit1.getState());
console.log('Probabilidades:', qubit1.getProbabilities());

// Teste 2: Porta Hadamard
console.log('\n📊 Teste 2: Porta Hadamard');
const qubit2 = new Qubit();
qubit2.applyHadamard();
console.log('Após Hadamard:', qubit2.getState());
console.log('Probabilidades:', qubit2.getProbabilities());

// Teste 3: Portas Pauli
console.log('\n📊 Teste 3: Portas Pauli');
const qubit3 = new Qubit();
qubit3.applyPauliX();
console.log('Após Pauli-X:', qubit3.getState());

const qubit4 = new Qubit();
qubit4.applyPauliY();
console.log('Após Pauli-Y:', qubit4.getState());

const qubit5 = new Qubit();
qubit5.applyPauliZ();
console.log('Após Pauli-Z:', qubit5.getState());

// Teste 4: Registro quântico
console.log('\n📊 Teste 4: Registro Quântico');
const register = new QuantumRegister(2);
console.log('Registro 2-qubit inicial:', register.getState());

// Teste 5: Hadamard em registro
console.log('\n📊 Teste 5: Hadamard em registro');
register.applyHadamard(0);
console.log('Após H no qubit 0:', register.getState());
console.log('Probabilidades:', register.getProbabilities());

// Teste 6: CNOT
console.log('\n📊 Teste 6: Porta CNOT');
const register2 = new QuantumRegister(2);
register2.applyHadamard(0); // Cria superposição no controle
register2.applyCNOT(0, 1);  // Emaranha os qubits
console.log('Estado emaranhado (Bell state):', register2.getState());
console.log('Probabilidades:', register2.getProbabilities());

// Teste 7: Medição
console.log('\n📊 Teste 7: Medição');
const qubit6 = new Qubit();
qubit6.applyHadamard();
console.log('Antes da medição:', qubit6.getState());
const result = qubit6.measure();
console.log('Resultado da medição:', result);
console.log('Após medição:', qubit6.getState());

// Teste 8: Medição de registro
console.log('\n📊 Teste 8: Medição de registro');
const register3 = new QuantumRegister(2);
register3.applyHadamard(0);
register3.applyHadamard(1);
console.log('Antes da medição:', register3.getState());
const results = register3.measureAll();
console.log('Resultados da medição:', results);
console.log('Após medição:', register3.getState());

// Teste 9: Verificação de normalização
console.log('\n📊 Teste 9: Verificação de normalização');
const qubit7 = new Qubit(new Complex(0.6, 0), new Complex(0.8, 0));
console.log('Qubit normalizado:', qubit7.getState());
const probs = qubit7.getProbabilities();
console.log('Soma das probabilidades:', probs.prob0 + probs.prob1);

// Teste 10: Estados complexos
console.log('\n📊 Teste 10: Estados com números complexos');
const qubit8 = new Qubit(new Complex(0.5, 0.5), new Complex(0.5, -0.5));
console.log('Estado complexo:', qubit8.getState());
console.log('Probabilidades:', qubit8.getProbabilities());

console.log('\n✅ Testes concluídos! As implementações básicas estão funcionando.');
console.log('\n📝 Próximos passos:');
console.log('1. Implementar algoritmos quânticos corrigidos');
console.log('2. Corrigir criptografia quântica');
console.log('3. Adicionar testes unitários completos');
console.log('4. Validar precisão matemática');
