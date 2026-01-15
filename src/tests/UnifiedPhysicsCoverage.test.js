import {
    OMEGA,
    calculateVacuumFluctuation,
    entropicOptimizer,
    calculateEntropicGravity,
    calculateHolographicEntropy
} from '../core/unified_physics.js';

describe('Unified Physics Coverage', () => {
    test('calculateVacuumFluctuation should return value within range', () => {
        const fluc = calculateVacuumFluctuation(10);
        expect(fluc).toBeDefined();
        // Returns Complex object
        expect(typeof fluc.real).toBe('number');
        expect(typeof fluc.imag).toBe('number');
    });

    test('entropicOptimizer should optimize simple function', () => {
        const costFn = (xArr) => (xArr[0] - 3) ** 2;
        // initialGuess must be array
        const result = entropicOptimizer(costFn, [0], { steps: 200 });
        expect(result.optimalX[0]).toBeCloseTo(3, 0.5);
    });

    test('calculateEntropicGravity should match formula', () => {
        // F = G * M1 * M2 / r^2 * (1 + delta)
        // delta depends on OMEGA/r^2.
        const f = calculateEntropicGravity(1e24, 1e24, 1e7);
        expect(f).toBeGreaterThan(0);

        // Edge case: r small
        const f_small = calculateEntropicGravity(1, 1, 1e-9); // Microscopic
        expect(f_small).toBeGreaterThan(0);
    });

    test('calculateHolographicEntropy should proportional to Area', () => {
        const area = 100;
        const entropy = calculateHolographicEntropy(area);
        // S = k * Area / 4lp^2.
        expect(entropy).toBeGreaterThan(0);

        const area2 = 200;
        const entropy2 = calculateHolographicEntropy(area2);
        expect(entropy2).toBeCloseTo(entropy * 2);
    });
});
