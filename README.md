# QubitSim - Unified Physics Quantum Simulator

<div align="center">
  <h1>QubitSim</h1>
  <p><strong>A Quantum Computing Simulator integrated with Unified Physics (ToE) concepts.</strong></p>
  <p>Fundamental Constant: <strong>Ω = 117.038</strong></p>
</div>

<div align="center">
  <img src="https://img.shields.io/badge/JavaScript-ESModules-yellow?style=for-the-badge&logo=javascript" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react" alt="React"/>
  <img src="https://img.shields.io/badge/Physics-Unified-purple?style=for-the-badge" alt="Unified Physics"/>
  <img src="https://img.shields.io/badge/Coverage-80%25-green?style=for-the-badge" alt="Coverage"/>
</div>

---

## 🌌 Project Overview

**QubitSim** goes beyond classical quantum simulation by integrating principles of **Unified Physics**. It simulates quantum logic while accounting for **Entropic Vacuum Fluctuations** and **Holographic Information Density**, governed by the fundamental constant **Ω (117.038)**.

This project serves as both a rigorous educational tool for standard quantum algorithms (Shor, Grover) and a research platform for "New Physics" decoherence models.

### Key Features

* **⚡ Advanced Algorithms**: Full implementation of Shor (Period Finding), Grover (Search), Bernstein-Vazirani, and Deutsch-Jozsa.
* **🌌 Unified Physics Core**:
  * **Entropic Noise**: Qubits naturally interact with the vacuum information substrate.
  * **Ω-Scaling**: Decoherence and gravity operations scale with 117.038.
  * **Holographic Optimization**: "Best-path" finding using entropic gradients.
* **🔒 Quantum Cryptography**: BB84 Protocol implementation for Quantum Key Distribution (QKD) and One-Time Pad encryption.
* **📊 Visualization**: Real-time Bloch Sphere visualization with entropic noise monitoring.

---

## 🛠️ Architecture

The project is modularized into three main layers:

1. **Core (`src/core/`)**:
    * `Qubit.js`: Mathematical model of a qubit (Complex amplitudes).
    * `QuantumRegister.js`: N-qubit system state vector and gate operations.
    * `unified_physics.js`: The engine for Entropic Gravity and Vacuum Fluctuations.
2. **Algorithms (`interface/src/algorithms/`)**:
    * Implementations of Shor, Grover, QFT, etc.
3. **Interface (`interface/src/`)**:
    * React-based frontend for interacting with the simulation.

---

## 🧪 Algorithms Implemented

| Algorithm | Status | Description |
| :--- | :--- | :--- |
| **Shor's Algorithm** | ✅ Active | Factors integers using Quantum Period Finding and Inverse QFT. |
| **Grover's Algorithm** | ✅ Active | Unstructured search with O(√N) complexity. |
| **Bernstein-Vazirani** | ✅ Active | Finds a hidden string in a single query. |
| **Deutsch-Jozsa** | ✅ Active | Determines if a function is constant or balanced. |
| **QFT** | ✅ Active | Quantum Fourier Transform (Standard & Inverse). |
| **BB84 (Crypto)** | ✅ Active | Quantum Key Distribution protocol. |

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v16+)
* npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-repo/qubitsim.git

# Install dependencies
npm install

# Install Interface dependencies
cd interface
npm install
cd ..
```

### Running Tests

We maintain high code coverage (>80%) to ensure mathematical accuracy.

```bash
# Run full test suite with coverage
npm run test:coverage
```

### Running the Simulator (UI)

```bash
# Start the React Interface
npm run dev
```

---

## 🧠 Unified Physics Integration

The simulator uses `src/core/unified_physics.js` to inject realistic noise models:

```javascript
import { OMEGA, calculateVacuumFluctuation } from './core/unified_physics';

// Qubits automatically experience vacuum fluctuations
// Magnitude depends on the 'temperature' of the vacuum and Ω.
qubit.applyVacuumFluctuations(temperature);
```

---

## 🤝 Contributing

Contributions are welcome, especially for optimizing the `QuantumRegister` for larger qubit counts (Product State Optimization).

---

## 📜 License

MIT License.
