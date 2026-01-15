import { Grover } from '../../interface/src/algorithms/Grover.js';
import { Complex } from '../core/qubit.js';

describe('Grover Algorithm', () => {
    test('Should find target |11> in 2 qubits', async () => {
        const n = 2;
        // Target state |11> -> index 3
        const targetState = 3;

        const oracle = (register) => {
            // Apply phase flip to target state
            register.amplitudes = register.amplitudes.map((amp, idx) => {
                if (idx === targetState) {
                    return new Complex(-amp.real, -amp.imag);
                }
                return amp;
            });
        };

        const grover = new Grover(n, oracle);
        const result = await grover.execute();

        // Result is array of bits. |11> -> [1, 1] (if MSB at 0? check measureAll)
        // QuantumRegister.measureAll: loops i from num-1 down to 0?
        // for (let i = this.numQubits - 1; i >= 0; i--) result.push((measuredState >> i) & 1);
        // So index 0 is MSB.
        // 3 = 11 binary. [1, 1].
        expect(result).toEqual([1, 1]);
    });

    test('Should find target |101> in 3 qubits', async () => {
        const n = 3;
        const targetState = 5; // 101 binary

        const oracle = (register) => {
            register.amplitudes = register.amplitudes.map((amp, idx) => {
                if (idx === targetState) {
                    return new Complex(-amp.real, -amp.imag);
                }
                return amp;
            });
        };

        const grover = new Grover(n, oracle);
        const result = await grover.execute();
        expect(result).toEqual([1, 0, 1]);
    });
});
