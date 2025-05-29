/**
 * Teste do algoritmo Deutsch-Jozsa corrigido
 */

import { deutschJozsaAlgorithm, exampleFunctions, runDeutschJozsaExample } from './interface/src/algorithms/DeutschJozsa.js';

console.log('🔬 Testando Algoritmo Deutsch-Jozsa Corrigido...\n');

// Teste 1: Função constante 0
console.log('📊 Teste 1: Função Constante (sempre 0)');
try {
  const result1 = deutschJozsaAlgorithm(exampleFunctions.constant0, 2);
  console.log(`Resultado: ${result1.result}`);
  console.log(`Medições: [${result1.measurements.join(', ')}]`);
  console.log(`Esperado: Constante - ${result1.result === 'Constante' ? '✅ CORRETO' : '❌ ERRO'}\n`);
} catch (error) {
  console.log(`❌ Erro: ${error.message}\n`);
}

// Teste 2: Função constante 1
console.log('📊 Teste 2: Função Constante (sempre 1)');
try {
  const result2 = deutschJozsaAlgorithm(exampleFunctions.constant1, 2);
  console.log(`Resultado: ${result2.result}`);
  console.log(`Medições: [${result2.measurements.join(', ')}]`);
  console.log(`Esperado: Constante - ${result2.result === 'Constante' ? '✅ CORRETO' : '❌ ERRO'}\n`);
} catch (error) {
  console.log(`❌ Erro: ${error.message}\n`);
}

// Teste 3: Função balanceada (primeiro bit)
console.log('📊 Teste 3: Função Balanceada (primeiro bit)');
try {
  const result3 = deutschJozsaAlgorithm(exampleFunctions.balancedFirstBit, 2);
  console.log(`Resultado: ${result3.result}`);
  console.log(`Medições: [${result3.measurements.join(', ')}]`);
  console.log(`Esperado: Balanceada - ${result3.result === 'Balanceada' ? '✅ CORRETO' : '❌ ERRO'}\n`);
} catch (error) {
  console.log(`❌ Erro: ${error.message}\n`);
}

// Teste 4: Função balanceada (paridade)
console.log('📊 Teste 4: Função Balanceada (paridade)');
try {
  const result4 = deutschJozsaAlgorithm(exampleFunctions.balancedParity, 2);
  console.log(`Resultado: ${result4.result}`);
  console.log(`Medições: [${result4.measurements.join(', ')}]`);
  console.log(`Esperado: Balanceada - ${result4.result === 'Balanceada' ? '✅ CORRETO' : '❌ ERRO'}\n`);
} catch (error) {
  console.log(`❌ Erro: ${error.message}\n`);
}

// Teste 5: Função balanceada (número ímpar de 1s)
console.log('📊 Teste 5: Função Balanceada (número ímpar de 1s)');
try {
  const result5 = deutschJozsaAlgorithm(exampleFunctions.balancedOddOnes, 2);
  console.log(`Resultado: ${result5.result}`);
  console.log(`Medições: [${result5.measurements.join(', ')}]`);
  console.log(`Esperado: Balanceada - ${result5.result === 'Balanceada' ? '✅ CORRETO' : '❌ ERRO'}\n`);
} catch (error) {
  console.log(`❌ Erro: ${error.message}\n`);
}

// Teste 6: Teste com 3 qubits
console.log('📊 Teste 6: Função com 3 qubits');
try {
  const result6 = deutschJozsaAlgorithm(exampleFunctions.constant0, 3);
  console.log(`Resultado: ${result6.result}`);
  console.log(`Medições: [${result6.measurements.join(', ')}]`);
  console.log(`Esperado: Constante - ${result6.result === 'Constante' ? '✅ CORRETO' : '❌ ERRO'}\n`);
} catch (error) {
  console.log(`❌ Erro: ${error.message}\n`);
}

// Teste 7: Verificação manual das funções
console.log('📊 Teste 7: Verificação manual das funções');
console.log('Função constant0:');
console.log(`  f("00") = ${exampleFunctions.constant0("00")}`);
console.log(`  f("01") = ${exampleFunctions.constant0("01")}`);
console.log(`  f("10") = ${exampleFunctions.constant0("10")}`);
console.log(`  f("11") = ${exampleFunctions.constant0("11")}`);

console.log('\nFunção balancedFirstBit:');
console.log(`  f("00") = ${exampleFunctions.balancedFirstBit("00")}`);
console.log(`  f("01") = ${exampleFunctions.balancedFirstBit("01")}`);
console.log(`  f("10") = ${exampleFunctions.balancedFirstBit("10")}`);
console.log(`  f("11") = ${exampleFunctions.balancedFirstBit("11")}`);

console.log('\nFunção balancedParity:');
console.log(`  f("00") = ${exampleFunctions.balancedParity("00")}`);
console.log(`  f("01") = ${exampleFunctions.balancedParity("01")}`);
console.log(`  f("10") = ${exampleFunctions.balancedParity("10")}`);
console.log(`  f("11") = ${exampleFunctions.balancedParity("11")}`);

console.log('\n✅ Testes do Deutsch-Jozsa concluídos!');
console.log('\n📝 Observações:');
console.log('- O algoritmo deve identificar corretamente funções constantes vs balanceadas');
console.log('- Funções constantes sempre resultam em medições [0, 0, ...]');
console.log('- Funções balanceadas resultam em pelo menos um 1 nas medições');
console.log('- O algoritmo é determinístico e sempre correto para este problema');
