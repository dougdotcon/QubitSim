import { QFT } from '../../interface/src/algorithms/QFT.js';
import { Shor } from '../../interface/src/algorithms/Shor.js';
import { encryptMessage } from '../crypto/encryptMessage.js';
import { decryptMessage } from '../crypto/decryptMessage.js';
import { generateRandomKey } from '../crypto/generateKey.js';

describe('Encryption Utilities', () => {
    test('Should encrypt and decrypt a message correctly', () => {
        const message = "HELLO QUANTUM";
        const key = generateRandomKey(message.length * 8); // 8 bits per char

        const encrypted = encryptMessage(message, key);
        expect(encrypted).not.toBe(message);

        const decrypted = decryptMessage(encrypted, key);
        expect(decrypted).toBe(message);
    });
});

describe('Quantum Fourier Transform (QFT)', () => {
    test('Inverse QFT of |+++> should be |000>', () => {
        const qft = new QFT(3);
        // Prepare |+++>
        for (let i = 0; i < 3; i++) qft.register.applyHadamard(i);

        qft.applyInverse();
        const result = qft.register.measureAll();
        // Since it's deterministic inverse QFT of H|0>, should be |0>
        expect(result.join('')).toBe('000');
    });
});

describe('Shor Algorithm', () => {
    test('Should factor 15 correctly (Simulated)', () => {
        const N = 15;
        const a = 2;
        const shor = new Shor(N, a);

        // Mocking finding factors directly to verify logic
        // Because findFactors takes measurement bits
        // Logic: N=15, a=2 => r=4. 
        // s=1 => phase = 1/4 = 0.01_2. If 8 precision bits => 01000000 = 64
        const simulatedMeasurement = [0, 1, 0, 0, 0, 0, 0, 0];

        const factors = shor.findFactors(simulatedMeasurement);
        expect(factors).toContain(3);
        expect(factors).toContain(5);
    });

    test('Should fail for odd period', () => {
        const N = 15;
        const shor = new Shor(N, 2);
        // Simulate a measurement that gives odd period (impossible for this case but testing logic)
        // If phase = 0, r=undef/fail.
        const failMeasurement = [0, 0, 0, 0, 0, 0, 0, 0];
        const factors = shor.findFactors(failMeasurement);
        expect(factors).toBeNull();
    });

    test('Should fail for odd period > 1', () => {
        const N = 15;
        const shor = new Shor(N, 2);
        // Phase ~ 1/3 = 0.333... -> Period 3. 3 is odd.
        // 1/3 * 2^8 = 85.33 -> 85 (01010101)
        const oddPeriodMeasurement = [0, 1, 0, 1, 0, 1, 0, 1];
        // 0.332... Continued fraction of 0.332 with limit 15 might give 3.
        const factors = shor.findFactors(oddPeriodMeasurement);
        expect(factors).toBeNull();
    });

    test('Should fail for trivial factor case (N=5, a=2)', () => {
        const N = 5;
        const a = 2; // Period is 4. r/2 = 2. 2^2 = 4 = -1 mod 5. Trivial.
        const shor = new Shor(N, a);
        // Phase 1/4 -> Period 4. 0.25 * 256 = 64 (0100...).
        // But let's pass a simulated "successful" period finding phase.
        // shor.n_control depends on N=5 -> n_target=3 -> n_control=6.
        // 0.25 * 2^6 = 0.25 * 64 = 16 (010000).
        // 0-0-0-0-1-0? No, MSB first?
        // findFactors parse parseInt(..., 2).
        // [0, 1, 0, 0, 0, 0] -> 16. 16/64 = 0.25.
        // Period 4.
        const measurement = [0, 1, 0, 0, 0, 0];
        const factors = shor.findFactors(measurement);
        expect(factors).toBeNull();
    });
});
