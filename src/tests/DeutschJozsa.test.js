import { deutschJozsaAlgorithm, exampleFunctions } from '../../interface/src/algorithms/DeutschJozsa.js';

describe('Deutsch-Jozsa Algorithm', () => {
    test('Should identify Constant function (Always 0)', () => {
        const result = deutschJozsaAlgorithm(exampleFunctions.constant0, 2);
        expect(result.result).toBe("Constante");
        // For constant function, all measurements should be 0
        expect(result.measurements.every(m => m === 0)).toBe(true);
    });

    test('Should identify Constant function (Always 1)', () => {
        const result = deutschJozsaAlgorithm(exampleFunctions.constant1, 2);
        expect(result.result).toBe("Constante");
        expect(result.measurements.every(m => m === 0)).toBe(true);
        // Note: Even if f(x)=1, interference gives |00...0> at output for constant functions
    });

    test('Should identify Balanced function (First bit)', () => {
        const result = deutschJozsaAlgorithm(exampleFunctions.balancedFirstBit, 2);
        expect(result.result).toBe("Balanceada");
        // For balanced, at least one measurement is 1 (result is NOT |00...0>)
        expect(result.measurements.some(m => m === 1)).toBe(true);
    });

    test('Should identify Balanced function (Parity)', () => {
        const result = deutschJozsaAlgorithm(exampleFunctions.balancedParity, 3);
        expect(result.result).toBe("Balanceada");
        expect(result.measurements.some(m => m === 1)).toBe(true);
    });
});
