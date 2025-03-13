export function metropolis(beta: number, J: number, spins: number[]): number[] {
  const size = spins.length;
  const newSpins = [...spins]; // Copia dos estados atuais

  for (let step = 0; step < size; step++) {
      const i = Math.floor(Math.random() * size); // Escolhe um estado aleatório

      // Calcula a variação de energia ΔE ao inverter o estado i
      const deltaE = 2 * J * newSpins[i] *
          (newSpins[(i + 1) % size] + newSpins[(i - 1 + size) % size]);

      // Aplica a regra de Metropolis-Hastings
      if (deltaE < 0 || Math.random() < Math.exp(-beta * deltaE)) {
          newSpins[i] *= -1; // Inverte o estado do qubit ou do preço
      }
  }

  return newSpins;
}
