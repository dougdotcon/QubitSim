import { BernsteinVazirani } from '../algorithms/BernsteinVazirani.js';

describe('BernsteinVazirani Algorithm', () => {
  const createOracle = (secretString, startParity = '0') => {
    return (register) => {
      const n = secretString.length;
      const ancillaIndex = register.numQubits - 1;

      for (let i = 0; i < n; i++) {
        if (secretString[i] === '1') {
          register.applyCNOT(i, ancillaIndex);
        }
      }
      if (startParity === '1') {
        register.applyPauliX(ancillaIndex);
      }
    };
  };

  test('deve encontrar a string oculta corretamente', async () => {
    const n = 3;
    const secret = '101';
    const oracle = createOracle(secret);
    const algorithm = new BernsteinVazirani(n, oracle);

    const result = await algorithm.execute();
    expect(result.join('')).toBe(secret);
  });

  test('deve funcionar com diferentes strings ocultas', async () => {
    const n = 4;
    const secret = '1100';
    const oracle = createOracle(secret);
    const algorithm = new BernsteinVazirani(n, oracle);

    const result = await algorithm.execute();
    expect(result.join('')).toBe(secret);
  });

  test('deve funcionar com diferentes números de qubits', async () => {
    const n = 5;
    const secret = '11111';
    const oracle = createOracle(secret);
    const algorithm = new BernsteinVazirani(n, oracle);

    const result = await algorithm.execute();
    expect(result.join('')).toBe(secret);
  });

  test('deve lidar com diferentes bits de paridade', async () => {
    const n = 3;
    const secret = '010';
    const oracle = createOracle(secret, '1');
    const algorithm = new BernsteinVazirani(n, oracle);

    const result = await algorithm.execute();
    expect(result.join('')).toBe(secret);
  });
}); 