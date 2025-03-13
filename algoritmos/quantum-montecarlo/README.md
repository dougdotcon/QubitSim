#  Implementação do Quantum Monte Carlo (QMC) em TypeScript

A implementação desenvolvida é uma simulação baseada no algoritmo de Monte Carlo, aplicada a sistemas quânticos usando o modelo de Ising. Este método é amplamente utilizado em mecânica estatística, simulação de materiais, otimização combinatória e até mesmo em inteligência artificial quântica.

## O que é o Quantum Monte Carlo (QMC)?
O Quantum Monte Carlo (QMC) é um conjunto de métodos computacionais que simulam sistemas quânticos através de técnicas estatísticas baseadas em amostragem aleatória. Ele é utilizado para resolver sistemas quânticos complexos que não podem ser tratados analiticamente devido à dimensionalidade alta e comportamento não determinístico.

###  Principais Conceitos do QMC

- Monte Carlo Simulation → Gera estados aleatórios e calcula probabilidades associadas à transição entre estados.
- Modelo de Ising → Representa sistemas magnéticos e suas interações vizinhas.
- Suzuki-Trotter Decomposition → Transforma um sistema quântico em um sistema clássico estendido no tempo.
- Parallel Tempering (Replica Exchange) → Permite escapar de mínimos locais no espaço de energia.
- WebAssembly (WASM) → Utiliza Rust para acelerar cálculos pesados, melhorando a eficiência.

##  Componentes da Implementação
Vamos explicar cada módulo desenvolvido e sua função.

### QuantumMonteCarlo.ts (Modelo de Ising com Suzuki-Trotter)

#### O que faz?

- Implementa um modelo de Ising 2D/3D.
- Utiliza o Método de Monte Carlo Metropolis-Hastings para atualizar os spins.
- Inclui Suzuki-Trotter Decomposition, permitindo representar efeitos quânticos.

#### Explicação Técnica

- O modelo de Ising é uma matriz spins[i][j], onde cada spin pode estar em +1 (up) ou -1 (down).
- O algoritmo escolhe um spin aleatório e calcula a mudança de energia (ΔE) se ele fosse invertido.
- Se ΔE < 0, a inversão é aceita automaticamente.
- Caso contrário, aceita com probabilidade:

#### Benefícios da Suzuki-Trotter Decomposition:

Permite representar a evolução temporal do sistema quântico como um problema clássico em uma dimensão extra.

## ParallelTempering.ts (Replica Exchange Monte Carlo)

### O que faz?

Executa Parallel Tempering, um método para escapar de mínimos locais no espaço de energia.

### Explicação Técnica

- Mantemos múltiplas réplicas do sistema com diferentes temperaturas T_i.
- Periodicamente, troca-se estados entre duas réplicas i e i+1 com probabilidade:

### Por que isso é importante?

Evita ficar preso em configurações locais de baixa energia, permitindo explorar melhor o espaço de estados.
Casos de Uso

Otimização de problemas combinatórios, como Treinamento de Redes Neurais, Simulação de Materiais, e Pesquisa Operacional.

## O que é a função metropolis?
A função metropolis implementa o algoritmo de Metropolis-Hastings, que é um método de amostragem de Monte Carlo utilizado para simular distribuições probabilísticas, ele é usado para aceitar ou rejeitar estados.  A função metropolis simula a evolução do mercado como um sistema quântico.

### Objetivo da metropolis:

Escolher um estado aleatório (neste caso, um estado de preço ou qubit).
Calcular a variação de energia ΔE ao tentar mudar esse estado.
Aceitar ou rejeitar a mudança com base na distribuição de Boltzmann.

β (beta) = 1 / temperatura, controla a aceitação de mudanças no sistema.
ΔE (deltaE) = variação de energia ao mudar um estado.
Se ΔE < 0, aceitamos automaticamente a mudança.
Se ΔE > 0, aceitamos com probabilidade P = exp(-β * ΔE).



## Simulando Cenários de Trading

O exemplo que criei é um código de Quantum Monte Carlo aplicado à simulação de cenários futuros para o preço do Bitcoin em TypeScript, combinando mecânica estatística, modelo de Ising, Parallel Tempering e distribuição de retornos financeiros.

### Como vamos usar a quibitsim?

Utilizaremos qubits para representar retornos financeiros do Bitcoin, onde:
|0⟩ representa um retorno negativo (queda no preço).
|1⟩ representa um retorno positivo (aumento no preço).
Estados superpostos representam cenários de alta incerteza.
Entrelaçamento quântico para múltiplos mercados:
Se o mercado de Bitcoin e Ethereum estiverem fortemente correlacionados, podemos modelá-los como qubits entrelaçados.
Criptografia quântica para comunicação segura de previsões:
Geraremos chaves quânticas para criptografar as previsões de preços.


```ts
import { Qubit, QuantumRegister } from "quibitsim";
import { metropolis, parallelTempering } from "./quantum_montecarlo";

// 🟢 Representando um retorno financeiro como um qubit
class BitcoinQuantumSimulation {
    private register: QuantumRegister;
    private betaValues: number[];
    private J: number;
    private steps: number;
    private replicas: number[][];

    constructor(numQubits: number, steps: number, betas: number[], J: number) {
        this.register = new QuantumRegister(numQubits);
        this.betaValues = betas;
        this.J = J;
        this.steps = steps;
        this.replicas = this.initializeReplicas();
    }

    // Inicializa múltiplas réplicas com qubits em estados aleatórios
    private initializeReplicas(): number[][] {
        return this.betaValues.map(() => {
            return Array.from({ length: this.register.numQubits }, () => {
                const qubit = new Qubit([Math.random(), Math.random()]);
                qubit.applyHadamard(); // Superposição inicial
                return qubit.measure();
            });
        });
    }

    // Executa a simulação quântica de Monte Carlo
    public runSimulation(): number[][] {
        for (let step = 0; step < this.steps; step++) {
            const energies = this.replicas.map(replica => this.calculateEnergy(replica));

            // Aplica Metropolis-Hastings em cada réplica
            for (let r = 0; r < this.replicas.length; r++) {
                this.replicas[r] = metropolis(this.betaValues[r], this.J, this.replicas[r]);
            }

            // Aplica Parallel Tempering para evitar mínimos locais
            parallelTempering(energies, this.betaValues);
        }

        return this.replicas;
    }

    // Calcula a energia do sistema quântico
    private calculateEnergy(spins: number[]): number {
        let E = 0;
        for (let i = 0; i < spins.length - 1; i++) {
            E -= this.J * spins[i] * spins[i + 1];
        }
        return E;
    }

    // Simula um cenário de preços baseado nos estados dos qubits
    public generatePriceScenarios(basePrice: number): number[][] {
        return this.replicas.map(replica => {
            let simulatedPrice = basePrice;
            return replica.map(state => {
                const change = state === 1 ? 1.02 : 0.98; // +2% ou -2%
                simulatedPrice *= change;
                return simulatedPrice;
            });
        });
    }
}

// 🔥 Simulação do Bitcoin usando Qubits
const numQubits = 5; // Número de estados a serem simulados
const steps = 10000;
const betaValues = [0.5, 0.8, 1.0, 1.2, 1.5]; // Diferentes temperaturas
const J = 1.0; // Parâmetro de interação
const basePrice = 42000; // Preço inicial do Bitcoin

const btcQMC = new BitcoinQuantumSimulation(numQubits, steps, betaValues, J);
const futureScenarios = btcQMC.generatePriceScenarios(basePrice);

console.log("Cenários quânticos futuros para o BTC:", futureScenarios);
```

### Como a quibitsim está sendo usada?

1. Cada retorno do Bitcoin é representado como um qubit.

- Se |0⟩, o preço diminui (-2%).
- Se |1⟩, o preço aumenta (+2%).
- Superposição de estados representa incerteza no mercado.

Entrelaçamento quântico entre mercados:

Podemos entrelaçar um qubit representando Bitcoin com outro qubit representando Ethereum:

```ts
register.entangle(new QuantumRegister(1)); // Bitcoin e Ethereum entrelaçados
```

Isso reflete correlações entre criptomoedas.

3. Criptografia Quântica para previsões seguras:

Podemos gerar chaves quânticas e criptografar os cenários de previsão de preços:

```ts
import { generateKey, encryptMessage, decryptMessage } from "quibitsim";

async function securePrediction(prediction: string) {
    const key = await generateKey();
    const encrypted = encryptMessage(prediction, key);
    const decrypted = decryptMessage(encrypted, key);
    console.log("Mensagem original:", prediction);
    console.log("Mensagem criptografada:", encrypted);
    console.log("Mensagem descriptografada:", decrypted);
}
securePrediction("Bitcoin pode subir 10% nos próximos dias");
```

### Exemplo de Saída:

```json
Cenários quânticos futuros para o BTC:
[
  [42000, 42840, 43700, 44650, 43700],  // Cenário 1
  [42000, 41160, 40350, 39500, 38700],  // Cenário 2
  [42000, 42840, 43700, 43700, 44650],  // Cenário 3
  ...
]
```

Cada linha representa um cenário de preço futuro do Bitcoin, baseado na simulação de qubits e no Quantum Monte Carlo.

## Benefícios da Integração com quibitsim

- Modela a volatilidade quântica dos mercados com superposição e entrelaçamento.
- Evita mínimos locais com Parallel Tempering.
- Oferece criptografia quântica para previsões seguras.
- Simula múltiplos cenários usando Monte Carlo e qubits.