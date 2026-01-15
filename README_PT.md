# QubitSim

## Simulador Quântico de Física Unificada

[![JavaScript](https://img.shields.io/badge/JavaScript-ESModules-f7df1e?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Física Unificada](https://img.shields.io/badge/Physics-OMG_117.038-purple?style=for-the-badge)](./src/core/unified_physics.js)
[![Cobertura](https://img.shields.io/badge/Coverage-Passing-success?style=for-the-badge)](./coverage/lcov-report/index.html)
[![Licença](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

![QubitSim Banner](./assets/generated/vacuum_fluctuations.svg)

---

## Visão Geral

**QubitSim** é uma biblioteca de simulação que une algoritmos de computação quântica clássica com os princípios da **Física Unificada**. Diferente de simuladores padrão, o QubitSim integra Flutuações de Vácuo Entrópicas e Densidade de Informação Holográfica, governadas pela constante emergente **Omega (117.038)**.

Esta plataforma permite a pesquisadores e desenvolvedores:

1. Estudar algoritmos padrão (Shor, Grover) sob ruído entrópico realista.
2. Visualizar a interação entre estados de qubit e o substrato de vácuo.
3. Simular modelos de decoerência da "Nova Física".

![Convergência do Otimizador](./assets/generated/optimizer_convergence.svg)

*Figura: Caminho de convergência do Otimizador Entrópico minimizando uma função de custo sob restrições holográficas.*

---

## Funcionalidades Principais

### Núcleo de Física Unificada

O motor de simulação (`src/core/unified_physics.js`) introduz:

- **Ruído Entrópico**: Qubits interagem com flutuações de vácuo derivadas de Omega.
- **Otimização Holográfica**: Gradiente descendente modificado pela densidade entrópica.
- **Gravidade Emergente**: Simulação de forças entrópicas em escalas microscópicas.

### Algoritmos Quânticos

Implementações completas de:

- **Algoritmo de Shor**: Fatoração de inteiros.
- **Algoritmo de Grover**: Busca não estruturada.
- **Bernstein-Vazirani**: Busca de string oculta.
- **Deutsch-Jozsa**: Análise de função oráculo.

### Criptografia

- **Protocolo BB84**: Simulação de Distribuição de Chaves Quânticas.
- **One-Time Pad**: Criptografia de mensagens quantum-safe.

---

## Iniciando

### Pré-requisitos

![Node.js](https://img.shields.io/badge/Node.js-v16+-339933?style=flat-square&logo=nodedotjs&logoColor=white)

### Instalação

```bash
git clone https://github.com/seu-repo/qubitsim.git
npm install
```

### Executando a Interface

O projeto inclui uma interface de visualização baseada em React.

```bash
npm run dev
```

### Testes

Mantemos padrões rigorosos de teste localmente.

```bash
npm run test:coverage
```

---

## Arquitetura

| Módulo | Descrição |
| :--- | :--- |
| **Core** | Lógica de `Qubit`, `QuantumRegister` e `UnifiedPhysics`. |
| **Algorithms** | Implementações de alto nível de fluxos lógicos quânticos. |
| **Interface** | Componentes React para visualização de estado em tempo real. |

---

## Licença

Este projeto está licenciado sob a Licença MIT.
