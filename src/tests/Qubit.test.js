import { Qubit, Complex } from '../core/qubit.js';

describe('Qubit Class', () => {
    test('Should initialize to |0> by default', () => {
        const q = new Qubit(new Complex(1, 0), new Complex(0, 0));
        const probs = q.getProbabilities();
        expect(probs.prob0).toBeCloseTo(1);
        expect(probs.prob1).toBeCloseTo(0);
    });

    test('Should apply Pauli gates', () => {
        const q = new Qubit(new Complex(1, 0), new Complex(0, 0));

        q.applyPauliX(); // |1>
        expect(q.beta.real).toBeCloseTo(1);

        q.applyPauliZ(); // -|1>
        expect(q.beta.real).toBeCloseTo(-1);

        q.applyPauliY(); // -i|-1> = i|0> ?
        // Y = [[0,-i],[i,0]]
        // Input -|1> = [0, -1].
        // Y * [0, -1] = [(-i)*(-1), 0] = [i, 0].
        // So |0> with Coeff i.
        expect(q.alpha.imag).toBeCloseTo(1);
        expect(q.beta.magnitude()).toBeCloseTo(0);
    });

    test('Should apply Rotations', () => {
        const q = new Qubit(new Complex(1, 0), new Complex(0, 0));
        q.rotateX(Math.PI); // |0> -> -i|1> (Rx(pi) = -iX)
        expect(q.beta.imag).toBeCloseTo(-1); // or similar check

        const q2 = new Qubit(new Complex(1, 0), new Complex(0, 0));
        q2.rotateY(Math.PI); // |0> -> |1> (Ry(pi) = [0, -1; 1, 0] * [1, 0] = [0, 1])
        expect(q2.beta.real).toBeCloseTo(1);

        const q3 = new Qubit(new Complex(1, 0), new Complex(0, 0));
        q3.rotateZ(Math.PI); // |0> -> e^(-i pi/2)|0> = -i|0>
        expect(q3.alpha.imag).toBeCloseTo(-1);
    });

    test('Should clone correctly', () => {
        const q = new Qubit(new Complex(0.6, 0), new Complex(0.8, 0));
        const copy = q.clone();
        expect(copy.alpha.real).toBe(0.6);
        expect(copy.beta.real).toBe(0.8);
        expect(copy).not.toBe(q);
    });

    test('Should get state string', () => {
        const q = new Qubit(new Complex(1, 0), new Complex(0, 0));
        expect(q.getState()).toContain('|0⟩');

        q.applyPauliX();
        expect(q.getState()).toContain('|1⟩');
    });
});
