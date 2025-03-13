import { QuantumMonteCarlo } from "./QuantumMonteCarlo";

export class ParallelTempering {
    private replicas: QuantumMonteCarlo[];
    private temperatures: number[];

    constructor(numReplicas: number, size: number, J: number, steps: number, trotterSlices: number) {
        this.temperatures = Array.from({ length: numReplicas }, (_, i) => 0.5 + i * 0.1);
        this.replicas = this.temperatures.map(beta => new QuantumMonteCarlo(size, beta, J, steps, trotterSlices));
    }

    public run(): void {
        for (let i = 0; i < this.replicas.length - 1; i++) {
            const E1 = this.replicas[i].runSimulation();
            const E2 = this.replicas[i + 1].runSimulation();

            const dBeta = this.temperatures[i + 1] - this.temperatures[i];
            if (Math.random() < Math.exp(dBeta * (E2 - E1))) {
                [this.replicas[i], this.replicas[i + 1]] = [this.replicas[i + 1], this.replicas[i]];
            }
        }
    }
}

const pt = new ParallelTempering(5, 20, 1.0, 100000, 10);
pt.run();
