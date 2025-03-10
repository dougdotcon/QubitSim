# 📚 Referência da API - QubitSim

## Core

### Qubit

```javascript
class Qubit {
  constructor(alpha = 1, beta = 0)
  applyHadamard()
  applyPauliX()
  applyPauliY()
  applyPauliZ()
  applyPhase(angle)
  measure()
  getState()
}
```

#### Métodos

- **constructor(alpha, beta)**
  - Cria um novo qubit com os coeficientes especificados
  - `alpha`: Coeficiente do estado |0⟩ (padrão: 1)
  - `beta`: Coeficiente do estado |1⟩ (padrão: 0)

- **applyHadamard()**
  - Aplica a porta Hadamard ao qubit
  - Cria uma superposição uniforme dos estados |0⟩ e |1⟩

- **applyPauliX()**
  - Aplica a porta Pauli-X (NOT) ao qubit
  - Inverte o estado do qubit

- **applyPauliY()**
  - Aplica a porta Pauli-Y ao qubit
  - Combina rotação e inversão

- **applyPauliZ()**
  - Aplica a porta Pauli-Z ao qubit
  - Adiciona uma fase de π

- **applyPhase(angle)**
  - Aplica uma rotação de fase ao qubit
  - `angle`: Ângulo de rotação em radianos

- **measure()**
  - Realiza uma medição do qubit
  - Retorna "up" ou "down" com base nas probabilidades

- **getState()**
  - Retorna o estado atual do qubit
  - Retorna um objeto com os coeficientes α e β

### QuantumRegister

```javascript
class QuantumRegister {
  constructor(numQubits)
  applyHadamard(qubitIndex)
  applyPauliX(qubitIndex)
  applyPauliY(qubitIndex)
  applyPauliZ(qubitIndex)
  applyCNOT(controlIndex, targetIndex)
  applyPhase(qubitIndex, angle)
  measure(qubitIndex)
  measureAll()
  getState()
}
```

#### Métodos

- **constructor(numQubits)**
  - Cria um registro quântico com o número especificado de qubits
  - `numQubits`: Número de qubits no registro

- **applyHadamard(qubitIndex)**
  - Aplica a porta Hadamard ao qubit especificado
  - `qubitIndex`: Índice do qubit (0-based)

- **applyPauliX(qubitIndex)**
  - Aplica a porta Pauli-X ao qubit especificado
  - `qubitIndex`: Índice do qubit

- **applyPauliY(qubitIndex)**
  - Aplica a porta Pauli-Y ao qubit especificado
  - `qubitIndex`: Índice do qubit

- **applyPauliZ(qubitIndex)**
  - Aplica a porta Pauli-Z ao qubit especificado
  - `qubitIndex`: Índice do qubit

- **applyCNOT(controlIndex, targetIndex)**
  - Aplica a porta CNOT entre dois qubits
  - `controlIndex`: Índice do qubit de controle
  - `targetIndex`: Índice do qubit alvo

- **applyPhase(qubitIndex, angle)**
  - Aplica uma rotação de fase ao qubit especificado
  - `qubitIndex`: Índice do qubit
  - `angle`: Ângulo de rotação em radianos

- **measure(qubitIndex)**
  - Realiza uma medição do qubit especificado
  - `qubitIndex`: Índice do qubit
  - Retorna "up" ou "down"

- **measureAll()**
  - Realiza uma medição de todos os qubits
  - Retorna um array de resultados ("up" ou "down")

- **getState()**
  - Retorna o estado atual do registro
  - Retorna um objeto com os estados de todos os qubits

## Criptografia

### generateKey

```javascript
async function generateKey(length = 256)
```

- Gera uma chave quântica segura
- `length`: Tamanho da chave em bits (padrão: 256)
- Retorna uma Promise com a chave gerada

### encryptMessage

```javascript
function encryptMessage(message, key)
```

- Criptografa uma mensagem usando uma chave quântica
- `message`: Mensagem a ser criptografada
- `key`: Chave quântica para criptografia
- Retorna a mensagem criptografada

### decryptMessage

```javascript
function decryptMessage(encryptedMessage, key)
```

- Descriptografa uma mensagem usando uma chave quântica
- `encryptedMessage`: Mensagem criptografada
- `key`: Chave quântica para descriptografia
- Retorna a mensagem original

## Algoritmos

### DeutschJozsa

```javascript
class DeutschJozsa {
  constructor(n)
  oracle(f)
  execute()
}
```

#### Métodos

- **constructor(n)**
  - Cria uma instância do algoritmo de Deutsch-Jozsa
  - `n`: Número de qubits

- **oracle(f)**
  - Define a função oráculo para o algoritmo
  - `f`: Função booleana a ser testada

- **execute()**
  - Executa o algoritmo
  - Retorna uma Promise com o resultado

### Grover

```javascript
class Grover {
  constructor(n)
  oracle(target)
  execute()
}
```

#### Métodos

- **constructor(n)**
  - Cria uma instância do algoritmo de Grover
  - `n`: Número de qubits

- **oracle(target)**
  - Define o estado alvo para busca
  - `target`: Estado a ser encontrado

- **execute()**
  - Executa o algoritmo
  - Retorna uma Promise com o resultado

### Shor

```javascript
class Shor {
  constructor(n, N)
  execute()
  findFactors(result)
}
```

#### Métodos

- **constructor(n, N)**
  - Cria uma instância do algoritmo de Shor
  - `n`: Número de qubits para o registro de fase
  - `N`: Número a ser fatorado

- **execute()**
  - Executa o algoritmo
  - Retorna uma Promise com o resultado

- **findFactors(result)**
  - Encontra os fatores do número N
  - `result`: Resultado da execução do algoritmo
  - Retorna os fatores encontrados

### BernsteinVazirani

```javascript
class BernsteinVazirani {
  constructor(n, a, b)
  oracle()
  execute()
  isSuccess(result)
}
```

#### Métodos

- **constructor(n, a, b)**
  - Cria uma instância do algoritmo de Bernstein-Vazirani
  - `n`: Número de qubits
  - `a`: String de bits que representa a função
  - `b`: Bit de paridade

- **oracle()**
  - Implementa o oráculo do algoritmo
  - Aplica as transformações necessárias

- **execute()**
  - Executa o algoritmo
  - Retorna uma Promise com o resultado

- **isSuccess(result)**
  - Verifica se o resultado é correto
  - `result`: Resultado da execução do algoritmo
  - Retorna true se a string foi encontrada 