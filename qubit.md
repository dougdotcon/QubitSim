# 🔬 Qubits: Fundamentos da Computação Quântica

<div align="center">
  <img src="https://img.shields.io/badge/Complexidade-Intermediária-yellow?style=for-the-badge" alt="Complexidade"/>
  <img src="https://img.shields.io/badge/Física_Quântica-Fundamental-blue?style=for-the-badge" alt="Física Quântica"/>
</div>

## 📋 Introdução aos Qubits

Um **qubit** (ou bit quântico) é a unidade fundamental de informação em computação quântica, análogo ao bit clássico. Enquanto um bit clássico pode estar em apenas um de dois estados (0 ou 1), um qubit pode existir em uma **superposição** desses estados.

## 🧮 Representação Matemática

Um qubit é representado matematicamente como um vetor de estado em um espaço de Hilbert bidimensional:

<div align="center">
  <img src="https://latex.codecogs.com/svg.latex?|\psi\rangle%20=%20\alpha|0\rangle%20+%20\beta|1\rangle" alt="Equação do Qubit"/>
</div>

Onde:
- **|ψ⟩** representa o estado quântico
- **α** e **β** são coeficientes complexos
- **|0⟩** e **|1⟩** são os estados da base computacional
- A condição de normalização exige que |α|² + |β|² = 1

## 🔄 Propriedades Fundamentais

### 1. Superposição
Um qubit pode existir simultaneamente em múltiplos estados, permitindo o paralelismo quântico. Por exemplo, um qubit pode estar 30% no estado |0⟩ e 70% no estado |1⟩.

### 2. Medição
Quando um qubit é medido, seu estado colapsa para um dos estados da base:
- Com probabilidade |α|² para o estado |0⟩ (representado como "up")
- Com probabilidade |β|² para o estado |1⟩ (representado como "down")

### 3. Indeterminismo
O resultado da medição é probabilístico. Mesmo com coeficientes idênticos (α=0.3, β=0.95), cada medição pode resultar em valores diferentes.

## 💻 Implementação no QubitSim

Na biblioteca QubitSim, a classe `Qubit` implementa estas propriedades:

```javascript
// Criando um qubit com coeficientes específicos
const qubit = new Qubit(0.3, 0.95);

// Aplicando uma porta Hadamard para criar superposição
qubit.applyHadamard();

// Realizando uma medição
const result = qubit.measure(); // Retorna "up" ou "down"
```

## 🔍 Importância dos Coeficientes Complexos

Os coeficientes complexos α e β são cruciais para:

1. **Interferência quântica**: Permitem que amplitudes de probabilidade se cancelem ou se reforcem
2. **Fase quântica**: A parte imaginária captura informações de fase essenciais para algoritmos quânticos
3. **Emaranhamento**: Possibilitam correlações não-locais entre qubits

## ⚠️ Observações Importantes

- Após a medição, o estado do qubit colapsa permanentemente
- Não é possível determinar os valores de α e β com uma única medição
- Cada medição de um mesmo estado quântico pode resultar em valores diferentes
- A classe `Qubit` no QubitSim retorna resultados como "up" e "down" em vez de 0 e 1 para maior clareza

## 🔗 Conceitos Relacionados

- **Portas Quânticas**: Operações unitárias que transformam estados quânticos
- **Registros Quânticos**: Coleções de múltiplos qubits
- **Emaranhamento Quântico**: Correlação não-local entre qubits
- **Algoritmos Quânticos**: Sequências de operações que exploram propriedades quânticas
