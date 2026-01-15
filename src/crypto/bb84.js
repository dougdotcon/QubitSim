import { Qubit } from "../core/qubit.js";
import { generateRandomKey } from "./generateKey.js";

/**
 * Simula o procotolo BB84 para Distribuição de Chaves Quânticas (QKD)
 */
export class BB84 {
    /**
     * Simula uma troca completa de chaves BB84
     * @param {number} length - Tamanho desejado da chave (bits)
     * @returns {Object} { key, errorRate }
     */
    static simulateKeyExchange(length) {
        const aliceBits = generateRandomKey(length * 4); // Precisa de mais bits para sifting
        const aliceBases = generateRandomKey(length * 4); // 0 = Z basis (+), 1 = X basis (x)
        const bobBases = generateRandomKey(length * 4);

        // 1. Alice envia qubits
        const qubits = aliceBits.map((bit, i) => {
            const q = new Qubit();

            // Se bit=1, aplica X (|1>)
            if (bit === 1) q.applyPauliX();

            // Se base=1, aplica H (Base X: |+> ou |->)
            if (aliceBases[i] === 1) q.applyHadamard();

            return q;
        });

        // 2. Bob mede qubits
        const bobBits = qubits.map((q, i) => {
            // Se Bob escolhe base X, aplica H antes de medir
            if (bobBases[i] === 1) q.applyHadamard();
            return q.measure();
        });

        // 3. Sifting (Peneira) - Alice e Bob comparam bases (via canal clássico)
        const siftedKeyAlice = [];
        const siftedKeyBob = [];

        for (let i = 0; i < aliceBits.length; i++) {
            if (aliceBases[i] === bobBases[i]) {
                siftedKeyAlice.push(aliceBits[i]);
                siftedKeyBob.push(bobBits[i]);
            }
        }

        // 4. Detecção de Erro (Amostragem)
        // Na simulação ideal sem espião, as chaves devem ser idênticas.
        // Com interferência quântica (ruído Unified Physics), pode haver erros.
        let errors = 0;
        const sampleSize = Math.floor(siftedKeyAlice.length * 0.1); // Usa 10% para teste

        // Descarta bits usados para teste
        const finalKey = [];

        // Comparação de amostra
        for (let i = 0; i < siftedKeyAlice.length; i++) {
            // Simula apenas pegar os bits restantes, na prática faria amostragem aleatória
            if (i < sampleSize) {
                if (siftedKeyAlice[i] !== siftedKeyBob[i]) errors++;
            } else {
                // Em caso real, Privacy Amplification seria aplicada aqui
                finalKey.push(siftedKeyAlice[i]);
            }
        }

        const errorRate = errors / sampleSize;

        // Se a taxa de erro for muito alta, aborta (presença de Eve)
        if (errorRate > 0.11) { // Limite teórico ~11%
            throw new Error("Erro alto detectado! Possível interceptação (Eve presente).");
        }

        // Retorna a chave do tamanho solicitado
        return {
            key: finalKey.slice(0, length),
            totalBitsGenerated: finalKey.length,
            errorRate
        };
    }
}
