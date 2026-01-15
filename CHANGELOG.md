# Changelog - QubitSim

Todas as mudanças e progressos notáveis neste projeto serão documentados neste arquivo.

## [Unreleased]

### Unified Physics (ToE)

- Integração da constante Ômega (Ω = 117.038).
- Implementação de sistema de flutuações de vácuo nos qubits.
- Otimizador Entrópico para escapar de mínimos locais.
- Simulação de ondas gravitacionais entrópicas no vácuo.
- Métodos de "Entropia de Borda" (Holográfico).

### Auditoria de Física & Correção (Phase 0.5)

- **RNG**: `generateKey.js` atualizado para usar medição quântica real em superposição.
- **Grover**: Implementação de Oráculo Cego (Blind Oracle) - corrigido "cheat" anterior.
- **Shor**: Exponenciação Modular Quântica (Unitária) implementada.
- **Crypto**: Novo módulo `src/crypto/bb84.js` implementando protocolo QKD real.
- **Unified Physics**: Adicionados `entropy_gravity` e `holographic_entropy`.

### Algoritmos Avançados (Phase 1)

- **Bernstein-Vazirani**: Implementação correta com oráculo cego e phase kickback.
- **QFT**: Módulo `QFT.js` standalone com portas SWAP e Inverse QFT.
- **Shor**: Refinamento com Frações Contínuas para extração precisa do período.

### Fundamentos Quânticos

- Reimplementação da classe `Qubit` com números complexos reais.
- Representação correta de estados quânticos (|ψ⟩ = α|0⟩ + β|1⟩).
- Suporte a amplitudes complexas e normalização automática.
- Visualização de estados via `getState()` e probabilidades via `getProbabilities()`.
- Implementação da porta Hadamard (H).
- Implementação das portas Pauli (X, Y, Z).
- Implementação das portas de rotação (RX, RY, RZ) e Fase.
- Sistema de medição com colapso de estado real.

### Quantum Register

- Implementação de registro multi-qubit usando produto tensorial.
- Suporte a estados emaranhados e CNOT multi-qubit.
- Correção de bugs em cálculo de paridade.

### Algoritmos

- Algoritmo de Deutsch-Jozsa funcional.
- Implementação de oráculo quântico básico.

### Infraestrutura

- Configuração de ES Modules (`type: module`).
- Estrutura de testes básicos.
