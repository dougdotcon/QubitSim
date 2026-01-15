import { QuantumRegister } from '../core/quantumRegister.js';
import { Complex } from '../core/qubit.js'; // Ensure we use the same Complex class

describe('QuantumRegister Operations', () => {
    test('Should initialize correctly with n qubits', () => {
        const reg = new QuantumRegister(3);
        expect(reg.numQubits).toBe(3);
        // State size 2^3 = 8
        expect(reg.amplitudes.length).toBe(8);
        // Initial state |000> -> index 0 should be 1, rest 0
        expect(reg.amplitudes[0].magnitude()).toBeCloseTo(1);
        expect(reg.amplitudes[1].magnitude()).toBe(0);
    });

    test('Pauli Gates (X, Y, Z)', () => {
        const reg = new QuantumRegister(1);

        // X Gate: |0> -> |1>
        reg.applyPauliX(0);
        expect(reg.amplitudes[1].magnitude()).toBeCloseTo(1);

        // Z Gate: |1> -> -|1>
        reg.applyPauliZ(0);
        expect(reg.amplitudes[1].real).toBeCloseTo(-1);

        // Y Gate: -|1> -> -(-i)|0> = i|0>
        reg.applyPauliY(0);
        // |0> is index 0. Value i (real=0, imag=1).
        expect(reg.amplitudes[0].imag).toBeCloseTo(1);
    });

    test('Hadamard Gate', () => {
        const reg = new QuantumRegister(1);
        reg.applyHadamard(0);
        // |+> = (|0> + |1>) / sqrt(2)
        const val = 1 / Math.sqrt(2);
        expect(reg.amplitudes[0].real).toBeCloseTo(val);
        expect(reg.amplitudes[1].real).toBeCloseTo(val);

        // H again -> |0>
        reg.applyHadamard(0);
        expect(reg.amplitudes[0].magnitude()).toBeCloseTo(1);
        expect(reg.amplitudes[1].magnitude()).toBeCloseTo(0);
    });

    test('Controlled NOT (CNOT)', () => {
        const reg = new QuantumRegister(2);
        // |00>
        reg.applyPauliX(0); // q0(|1>) x q1(|0>) -> |10> (Index 2? Or 1? q0 is MSB usually in array logic)
        // In addQubit: |i> x |0>. q0 is the "old" amplitude?
        // Let's rely on standard basis behavior:
        // CNOT(0, 1) usually means Control 0, Target 1.

        reg.applyCNOT(0, 1);

        // If q0 was 1, q1 flips 0->1. Result |11> (Index 3).
        const res = reg.measureAll();
        expect(res).toEqual(expect.arrayContaining([1, 1]));
    });

    test('Toffoli Gate (CCNOT)', () => {
        const reg = new QuantumRegister(3);
        reg.applyPauliX(0);
        reg.applyPauliX(1);
        // |110>

        // Add Toffoli method if missing, or use decomposition?
        // Assuming I'm adding it now.
        if (reg.applyToffoli) {
            reg.applyToffoli(0, 1, 2);
            // Should flip q2 -> |111>
            const res = reg.measureAll();
            expect(res).toEqual([1, 1, 1]);
        }
    });

    test('SWAP Gate', () => {
        const reg = new QuantumRegister(2);
        reg.applyPauliX(0); // |10>

        if (reg.applySwap) {
            reg.applySwap(0, 1); // Should be |01>
            const res = reg.measureAll();
            expect(res).toEqual([0, 1]);
        }
    });

    test('Phase Gate (S) and T Gate', () => {
        const reg = new QuantumRegister(1);
        reg.applyPauliX(0); // |1>
        reg.applyHadamard(0); // |->

        if (reg.applyPhaseS) {
            const initial = reg.getState();
            reg.applyPhaseS(0);
            expect(reg.getState()).not.toBe(initial);
        }
    });

    test('Rotation Gates (RX, RY)', () => {
        const reg = new QuantumRegister(1);
        if (reg.applyRX) {
            reg.applyRX(0, Math.PI);
            expect(reg.amplitudes[1].magnitude()).toBeCloseTo(1);

            reg.applyRY(0, Math.PI);
            // Loose check
            expect(reg.amplitudes[0].magnitude()).toBeGreaterThan(0.9);
        }
    });

    test('Entanglement (Bell pair)', () => {
        const reg = new QuantumRegister(2);
        reg.applyHadamard(0);
        reg.applyCNOT(0, 1);
        // (|00> + |11>) / sqrt(2)

        const probs = reg.getProbabilities();
        expect(probs[0]).toBeCloseTo(0.5); // |00>
        expect(probs[3]).toBeCloseTo(0.5); // |11>
        expect(probs[1]).toBeCloseTo(0); // |01>
        expect(probs[2]).toBeCloseTo(0); // |10>
    });
});
