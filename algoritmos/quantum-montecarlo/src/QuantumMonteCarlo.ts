export class QuantumMonteCarlo {
    private spins: number[][]; // Matriz de spins
    private beta: number; // Inverso da temperatura (1/kT)
    private J: number; // Interação entre spins
    private trotterSlices: number; // Número de slices de Trotter para decomposição de Suzuki-Trotter
    private steps: number;

    constructor(size: number, beta: number, J: number, steps: number, trotterSlices: number) {
        this.spins = Array.from({ length: size }, () => 
            Array.from({ length: size }, () => Math.random() < 0.5 ? 1 : -1) // Inicializa os spins aleatoriamente
        );
        this.beta = beta;
        this.J = J;
        this.steps = steps;
        this.trotterSlices = trotterSlices;
    }

    // 🔥 Função para calcular a energia total do sistema
    private energy(): number {
        let E = 0;
        const size = this.spins.length;

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const right = this.spins[i][(j + 1) % size]; // Vizinho à direita
                const down = this.spins[(i + 1) % size][j]; // Vizinho abaixo
                E -= this.J * this.spins[i][j] * (right + down);
            }
        }
        return E;
    }

    // 🔥 Algoritmo de Metropolis-Hastings com decomposição de Suzuki-Trotter
    public runSimulation(): number {
        let E_total = 0;
        const size = this.spins.length;

        for (let step = 0; step < this.steps; step++) {
            for (let slice = 0; slice < this.trotterSlices; slice++) {
                const i = Math.floor(Math.random() * size);
                const j = Math.floor(Math.random() * size);

                // 🔥 Calcula a variação de energia ao inverter o spin
                const deltaE = 2 * this.J * this.spins[i][j] *
                    (this.spins[i][(j + 1) % size] + this.spins[i][(j - 1 + size) % size] +
                    this.spins[(i + 1) % size][j] + this.spins[(i - 1 + size) % size][j]);

                // 🔥 Critério de Metropolis: Se a energia diminui, aceita; se não, aceita com probabilidade exp(-βΔE)
                if (deltaE < 0 || Math.random() < Math.exp(-this.beta * deltaE / this.trotterSlices)) {
                    this.spins[i][j] *= -1; // Inverte o spin
                }
            }

            E_total += this.energy();
        }
        return E_total / this.steps;
    }

    // 🔥 Função para obter o estado atual dos spins
    public getSpins(): number[][] {
        return this.spins;
    }
}
