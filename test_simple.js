/**
 * Teste simples para verificar imports
 */

console.log('🔬 Testando imports...');

try {
  console.log('Importando QuantumRegister...');
  const { QuantumRegister } = await import('./src/core/quantumRegister.js');
  console.log('✅ QuantumRegister importado com sucesso');
  
  console.log('Criando registro quântico...');
  const register = new QuantumRegister(2);
  console.log('✅ Registro criado:', register.getState());
  
  console.log('Aplicando Hadamard...');
  register.applyHadamard(0);
  console.log('✅ Hadamard aplicado:', register.getState());
  
} catch (error) {
  console.log('❌ Erro:', error.message);
}

try {
  console.log('\nImportando Deutsch-Jozsa...');
  const deutschModule = await import('./interface/src/algorithms/DeutschJozsa.js');
  console.log('✅ Deutsch-Jozsa importado com sucesso');
  console.log('Funções disponíveis:', Object.keys(deutschModule));
  
  if (deutschModule.deutschJozsaAlgorithm) {
    console.log('✅ deutschJozsaAlgorithm encontrado');
    
    // Teste simples
    const result = deutschModule.deutschJozsaAlgorithm(deutschModule.exampleFunctions.constant0, 2);
    console.log('✅ Teste executado:', result);
  } else {
    console.log('❌ deutschJozsaAlgorithm não encontrado');
  }
  
} catch (error) {
  console.log('❌ Erro ao importar Deutsch-Jozsa:', error.message);
}

console.log('\n✅ Teste de imports concluído!');
