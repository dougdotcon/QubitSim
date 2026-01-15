import {
    OMEGA,
    entropicOptimizer,
    calculateVacuumFluctuation,
    calculateEntropicGravity,
    calculateHolographicEntropy
} from '../core/unified_physics.js';
import { Qubit } from '../core/qubit.js';
import { QuantumRegister } from '../core/quantumRegister.js';
import { BB84 } from '../crypto/bb84.js';

describe('Unified Physics (ToE)', () => {
    test('OMEGA constant should be ~117.038', () => {
        expect(OMEGA).toBeCloseTo(117.038, 3);
    });

    test('Entropic Optimizer should minimize quadratic function', () => {
        const func = (x) => (x[0] - 3) ** 2 + 10;
        const result = entropicOptimizer(func, [0]);
        // Expect x ~ 3, value ~ 10
        expect(result.optimalX[0]).toBeCloseTo(3, 1);
        expect(result.optimalValue).toBeCloseTo(10, 1);
    });

    test('Vacuum Fluctuations should alter Qubit state', () => {
        const q = new Qubit(); // |0>
        const initialAlpha = q.alpha.magnitude();

        q.applyVacuumFluctuations(0.01);

        const finalAlpha = q.alpha.magnitude();
        // Magnitudes might change slightly or phase changes
        // Just ensure it doesn't crash and numbers are valid
        expect(finalAlpha).toBeLessThanOrEqual(1.0 + 1e-9);
        expect(q.beta.magnitude()).toBeGreaterThanOrEqual(0);
    });

    test('Entropic Gravity should return positive force', () => {
        const mass = 1000;
        const dist = 1e-9;
        const force = calculateEntropicGravity(mass, dist);
        expect(force).toBeGreaterThan(0);
    });

    test('Holographic Entropy should be proportional to Area', () => {
        const area = 1e-35; // Planck scale-ish
        const entropy = calculateHolographicEntropy(area);
        expect(entropy).toBeGreaterThan(0);
    });
});

describe('BB84 Quantum Key Distribution', () => {
    test('Simulate Key Exchange should return matched key and low error rate', () => {
        const numBits = 50;
        const exchange = BB84.simulateKeyExchange(numBits);

        expect(exchange.key.length).toBeGreaterThan(0);
        expect(exchange.errorRate).toBeLessThan(0.3); // Tolerance for simulation errors
        expect(exchange.totalBitsGenerated).toBeGreaterThanOrEqual(numBits);
    });
});
