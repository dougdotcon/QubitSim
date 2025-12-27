# QubitSim

<div align="center">
  <img src="assets/img/LOGOSPNG/logo.png" alt="QubitSim" width="220"/>
  <h1>QubitSim</h1>
  <p><strong>Uma biblioteca JavaScript para simulação de computação quântica e criptografia pós-quântica</strong></p>
</div>

<div align="center">
  <!-- Tecnologias Principais -->
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/ESModules-007ACC?style=for-the-badge&logo=javascript&logoColor=white" alt="ES Modules"/>
  <!-- Frameworks & Ferramentas -->
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/JSDoc-008CC1?style=for-the-badge&logo=javascript&logoColor=white" alt="JSDoc"/>
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" alt="Jest"/>
  <!-- Infraestrutura -->
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
</div>

---

## 📋 Visão Geral

**QubitSim** é uma biblioteca JavaScript moderna que implementa conceitos fundamentais de computação quântica e criptografia pós-quântica. Projetada para ser intuitiva e educacional, permite aos desenvolvedores e pesquisadores:

- Simular operações com qubits e registradores quânticos
- Implementar algoritmos clássicos (Grover, Shor, Deutsch-Jozsa, etc.)
- Visualizar estados quânticos e amplitudes
- Explorar protocolos de criptografia quântica
- Monitorar desempenho via integração com WebAssembly

Ideal para estudantes, educadores e entusiastas que desejam explorar o mundo da computação quântica sem a necessidade de hardware físico real.

> **Nota de Escopo:**
> Este projeto é um **simulador clássico**. Ele implementa qubits, portas e algoritmos funcionais para servir como um laboratório de simulação e aprendizado. **Não é um sistema para execução em hardware quântico real**, mas sim uma ferramenta padrão para prototipagem de lógica quântica em ambiente clássico.

---

## 🚀 Funcionalidades Principais

### ⚛️ Operações Quânticas Fundamentais
- **Manipulação de Qubits**: Criação, transformação e medição de estados quânticos.
- **Portas Quânticas**: Implementação de Hadamard (H), Pauli (X, Y, Z), CNOT e portas de rotação.
- **Visualização**: Ferramentas para visualizar o vetor de estado e distribuição de probabilidades do sistema.

### 🔐 Criptografia Quântica
- **Simulação de Protocolos**: Simulações de protocolos de Distribuição de Chaves Quânticas (QKD).
- **Modelos de Ataque**: Implementação de cenários de interceptação para demonstrar segurança.

### ⚡ Desempenho e Ferramentas
- **Integração com WebAssembly**: Tarefas computacionais pesadas são ofloadadas para WASM para maior velocidade.
- **Type-Safe**: Desenvolvido em TypeScript para um código robusto e seguro.
- **Testes Exaustivos**: Utiliza Jest para garantir a precisão matemática dos algoritmos.
- **Pronto para Infraestrutura**: Inclui configurações de Docker para PostgreSQL e Redis para gerenciamento de estado e escalabilidade.

---

## 🏗️ Arquitetura

O projeto é estruturado em três camadas principais:

1. **Núcleo (Core Engine)**: A base matemática que manipula operações lineares (números complexos, multiplicação de matrizes).
2. **Camada de Simulação**: Lógica para algoritmos específicos e operações de portas.
3. **Camada de Interface**: UI em React para visualização e API em Node.js para acesso programático.

---

## 🔧 Instalação e Uso

### Pré-requisitos
- Node.js (v16+)
- Docker (opcional, para infraestrutura)

### Instalar Dependências
bash
npm install


### Executando o Simulador
bash
# Executar testes do núcleo
npm test

# Iniciar o servidor de desenvolvimento (UI React)
npm run dev

# Compilar a biblioteca
npm run build


### Exemplo: Criando um Estado de Bell
javascript
import { QubitSim, Gates } from 'qubitsim';

const sim = new QubitSim();
// Aplica Hadamard no primeiro qubit
sim.applyGate(Gates.H, 0);
// Aplica CNOT (Controle: 0, Alvo: 1)
sim.applyGate(Gates.CNOT, [0, 1]);

console.log(sim.getState());
// Saída: Estado de Bell (|00> + |11>) / sqrt(2)


---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, leia nosso [Guia de Contribuição](CONTRIBUTING.md) para detalhes sobre o nosso código de conduta e o processo de envio de pull requests.

---

## 📜 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.