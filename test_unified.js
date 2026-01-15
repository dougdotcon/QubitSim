import {
    OMEGA,
    entropicOptimizer,
    calculateVacuumFluctuation,
    calculateEntropicGravity,
    calculateHolographicEntropy
} from './src/core/unified_physics.js';
import { Qubit } from './src/core/qubit.js';
import { QuantumRegister } from './src/core/quantumRegister.js';
import { BB84 } from './src/crypto/bb84.js';

console.log("=== TESTE UNIFIED PHYSICS (ToE) ===");
console.log(`Constante OMEGA: ${OMEGA}`);

console.log("\n1. Teste do Otimizador Entrópico:");
const func = (x) => (x[0] - 3) ** 2 + 10;
const result = entropicOptimizer(func, [0]);
console.log(`Função: f(x) = (x-3)^2 + 10`);
console.log(`Resultado Otimizado: x = ${result.optimalX[0].toFixed(4)} (Esperado: 3.0000)`);
console.log(`Valor Mínimo: ${result.optimalValue.toFixed(4)} (Esperado: 10.0000)`);

console.log("\n2. Teste de Flutuação do Vácuo (Qubit):");
const q = new Qubit();
console.log(`Estado Inicial: ${q.getState()}`);
console.log("Aplicando flutuação do vácuo...");
q.applyVacuumFluctuations();
console.log(`Estado Após Flutuação: ${q.getState()}`);

console.log("\n3. Teste de Decoerência (Quantum Register):");
const reg = new QuantumRegister(2);
console.log(`Estado Inicial: ${reg.getState()}`);
console.log("Aplicando decoerência entrópica...");
reg.applyEntropicDecoherence();
console.log(`Estado Após Decoerência: ${reg.getState()}`);

console.log("\n4. Teste de Gravidade Entrópica:");
const mass = 1000;
const dist = 1e-9; // Escala nano
const gForce = calculateEntropicGravity(mass, dist);
console.log(`Massa: ${mass}, Distância: ${dist}`);
console.log(`Força Gravitacional (com correção): ${gForce.toExponential(4)} N`);

console.log("\n5. Teste de Entropia Holográfica:");
const area = 4 * Math.PI * (10 ** 2);
const entropy = calculateHolographicEntropy(area);
console.log(`Área de superfície: ${area.toFixed(2)}`);
console.log(`Entropia Holográfica (bits): ${entropy.toExponential(4)}`);

console.log("\n6. Teste de Protocolo BB84:");
try {
    const exchange = BB84.simulateKeyExchange(16);
    console.log("Troca de chaves simulada com sucesso!");
    console.log(`Chave gerada (${exchange.totalBitsGenerated} bits):`, exchange.key.join(''));
    console.log(`Taxa de Erro (QBER): ${(exchange.errorRate * 100).toFixed(2)}%`);
} catch (e) {
    console.error("Erro no BB84:", e.message);
}
