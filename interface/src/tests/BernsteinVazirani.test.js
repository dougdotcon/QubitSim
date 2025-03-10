import { BernsteinVazirani } from '../algorithms/BernsteinVazirani';

describe('BernsteinVazirani Algorithm', () => {
  test('deve encontrar a string oculta corretamente', async () => {
    const n = 3;
    const a = '101';
    const b = '0';
    const algorithm = new BernsteinVazirani(n, a, b);
    
    const result = await algorithm.execute();
    expect(algorithm.isSuccess(result)).toBe(true);
    expect(result.join('')).toBe(a);
  });

  test('deve funcionar com diferentes strings ocultas', async () => {
    const n = 4;
    const a = '1100';
    const b = '1';
    const algorithm = new BernsteinVazirani(n, a, b);
    
    const result = await algorithm.execute();
    expect(algorithm.isSuccess(result)).toBe(true);
    expect(result.join('')).toBe(a);
  });

  test('deve funcionar com diferentes números de qubits', async () => {
    const n = 5;
    const a = '11111';
    const b = '0';
    const algorithm = new BernsteinVazirani(n, a, b);
    
    const result = await algorithm.execute();
    expect(algorithm.isSuccess(result)).toBe(true);
    expect(result.join('')).toBe(a);
  });

  test('deve lidar com diferentes bits de paridade', async () => {
    const n = 3;
    const a = '010';
    const b = '1';
    const algorithm = new BernsteinVazirani(n, a, b);
    
    const result = await algorithm.execute();
    expect(algorithm.isSuccess(result)).toBe(true);
    expect(result.join('')).toBe(a);
  });

  test('deve lançar erro para string alvo inválida', () => {
    const n = 3;
    const a = '102'; // string inválida
    const b = '0';
    
    expect(() => new BernsteinVazirani(n, a, b)).toThrow();
  });

  test('deve lançar erro para bit de paridade inválido', () => {
    const n = 3;
    const a = '101';
    const b = '2'; // bit inválido
    
    expect(() => new BernsteinVazirani(n, a, b)).toThrow();
  });

  test('deve lançar erro para número de qubits inválido', () => {
    const n = 1; // número muito pequeno
    const a = '101';
    const b = '0';
    
    expect(() => new BernsteinVazirani(n, a, b)).toThrow();
  });
}); 