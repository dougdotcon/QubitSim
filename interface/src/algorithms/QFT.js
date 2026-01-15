import { QuantumRegister } from '../../../src/core/quantumRegister.js';
import { Complex } from '../../../src/core/qubit.js';

export class QFT {
    /**
     * Inicializa a Transformada de Fourier Quântica
     * @param {number} n - Número de qubits
     */
    constructor(n) {
        this.n = n;
        this.register = new QuantumRegister(n);
    }

    /**
     * Aplica a QFT no registro quântico
     * Transforma da base computacional para a base de Fourier
     */
    apply() {
        for (let i = 0; i < this.n; i++) {
            this.register.applyHadamard(i);
            for (let j = i + 1; j < this.n; j++) {
                // R_k onde k = j - i + 1
                // Angle = 2*pi / 2^k = pi / 2^(k-1)
                // Aqui angle = pi / 2^(j-i)
                const angle = Math.PI / Math.pow(2, j - i);
                this.register.applyControlledPhase(j, i, angle);
            }
        }

        // A ordem dos qubits na QFT padrão é invertida no final (SWAP gates)
        // |x1 x2 ... xn> -> |y_n ... y_1> 
        // Precisamos trocar qubit i com n-1-i
        for (let i = 0; i < Math.floor(this.n / 2); i++) {
            this.swap(i, this.n - 1 - i);
        }
    }

    /**
     * Aplica QFT Inversa
     */
    applyInverse() {
        // 1. Desfaz SWAPs
        for (let i = 0; i < Math.floor(this.n / 2); i++) {
            this.swap(i, this.n - 1 - i);
        }

        // 2. Desfaz Rotações e Hadamards na ordem reversa
        for (let i = this.n - 1; i >= 0; i--) {
            for (let j = this.n - 1; j > i; j--) {
                const angle = -Math.PI / Math.pow(2, j - i);
                this.register.applyControlledPhase(j, i, angle);
            }
            this.register.applyHadamard(i);
        }
    }

    /**
     * Helper function: SWAP gate
     * Troca os estados de dois qubits (necessita implementação CNOT-CNOT-CNOT se não nativo)
     * Como QuantumRegister não tem SWAP nativo explícito, implementamos logicamente.
     */
    swap(qubit1, qubit2) {
        // SWAP(a,b) = CNOT(a,b) CNOT(b,a) CNOT(a,b)
        this.register.applyCNOT(qubit1, qubit2);
        this.register.applyCNOT(qubit2, qubit1);
        this.register.applyCNOT(qubit1, qubit2);
    }

    /**
     * Executa uma transformação simples e mede
     * (Útil para testar: QFT(|0>) -> |+>|+>...)
     */
    async execute() {
        // Executa QFT no registro zerado ou pre-carregado
        this.apply();
        return this.register.measureAll();
    }
}
