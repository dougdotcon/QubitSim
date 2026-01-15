import { BernsteinVazirani } from './interface/src/algorithms/BernsteinVazirani.js';
import { QuantumRegister } from './src/core/quantumRegister.js';

console.log("=== TESTE FASE 1: ALGORITMOS AVANÇADOS ===\n");

// --- TESTE 1: BERNSTEIN-VAZIRANI ---
console.log("1. Bernstein-Vazirani");
const secretString = "101";
const n = secretString.length;

console.log(`Oráculo Secreto: f(x) = s · x (onde s = "${secretString}")`);

// Definição do Oráculo (o algoritmo não vê 'secretString' diretamente, apenas chama essa função)
const oracleBV = (register) => {
    const ancillaIndex = register.numQubits - 1; // Qubit auxiliar é o último

    for (let i = 0; i < n; i++) {
        if (secretString[i] === '1') {
            // Se o bit da string secreta é 1, aplica CNOT(input_i, ancilla)
            register.applyCNOT(i, ancillaIndex);
        }
    }
};

const bv = new BernsteinVazirani(n, oracleBV);
bv.execute().then((result) => {
    // Nota: O resultado pode vir como array de números [1, 0, 1] ou strings "1", "0".
    // QuantumRegister.measureAll retorna array de bits (números 0/1).
    const measuredString = result.join('');

    console.log(`Resultado medido: "${measuredString}"`);

    if (measuredString === secretString) {
        console.log("✅ SUCESSO: String secreta encontrada com 1 consulta!");
    } else {
        console.log(`❌ FALHA: Esperado "${secretString}", obteve "${measuredString}"`);
    }
});

// --- TESTE 2: QUANTUM FOURIER TRANSFORM (QFT) ---
import { QFT } from './interface/src/algorithms/QFT.js';

console.log("\n2. Quantum Fourier Transform (QFT)");
// Teste: QFT Inverse de uma superposição uniforme deve retornar |000>
// 1. Cria QFT com 3 qubits
const qft = new QFT(3);

// 2. Prepara estado |+++> (que é a QFT de |000>)
// Aplicando H em todos
for (let i = 0; i < 3; i++) qft.register.applyHadamard(i);

console.log(`Estado Inicial (Input da QFT Inversa): ${qft.register.getState().substring(0, 50)}...`);

// 3. Aplica QFT Inversa
console.log("Aplicando QFT Inversa...");
qft.applyInverse();

console.log(`Estado Final: ${qft.register.getState()}`);
// O esperado é 1.000|000> se a matemática for perfeita

const qftResult = qft.register.measureAll();
console.log(`Resultado medido: "${qftResult.join('')}"`);

if (qftResult.join('') === '000') {
    console.log("✅ SUCESSO: QFT Inversa de |+++> retornou |000>");
} else {
    console.log("❌ FALHA: QFT Inversa incorreta.");
}

// --- TESTE 3: SHOR'S ALGORITHM (Simulado) ---
import { Shor } from './interface/src/algorithms/Shor.js';

console.log("\n3. Shor's Algorithm Factory");
// Fatorar 15 (Target = 3 * 5)
// a = 2 (coprimo)
// Período r para a=2, N=15 é 4 (2^1=2, 2^2=4, 2^3=8, 2^4=16=1)
const N = 15;
const a = 2;
console.log(`Fatorando N=${N} com a=${a}...`);

const shor = new Shor(N, a);

// Executamos a simulação quântica
// Nota: Com 15, precisamos de 4 bits para o número. n_target=4.
// n_control = 8. Total = 12 qubits. Simulação pesada.
// Para teste rápido, vamos checar se a lógica de pós-processamento funciona.
// Vamos Mockar o resultado da medição para simular que o PC quântico acertou.
// Se r=4, fase = s/4. Possíveis fases: 0, 1/4, 2/4, 3/4.
// s=1 -> 1/4 = 0.01 (binário) -> Medição no controle (8 bits): 01000000 (0.25 * 2^8 = 64)
console.log("Simulando medição quântica ideal (Mock para teste de lógica)...");
const simulatedPhaseVal = 64; // s=1, r=4 (1/4 de 256)
const measurementBits = simulatedPhaseVal.toString(2).padStart(8, '0').split('').map(Number); // 8 bits de controle

console.log(`Medição Simulada: ${measurementBits.join('')} (Fase ≈ 0.25)`);

const factors = shor.findFactors(measurementBits);

if (factors) {
    console.log(`Fatores Encontrados: ${factors.join(', ')}`);
    if (factors.includes(3) && factors.includes(5)) {
        console.log("✅ SUCESSO: 15 fatorado em 3 e 5 corretamente.");
    } else {
        console.log("❌ FALHA: Fatores incorretos.");
    }
} else {
    console.log("❌ FALHA: Não encontrou fatores (Período ímpar ou falha).");
}
