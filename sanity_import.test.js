import { Qubit } from './src/core/qubit.js';

describe('Sanity Import Check', () => {
    test('Qubit instantiates', () => {
        const q = new Qubit();
        expect(q).toBeDefined();
    });
});
