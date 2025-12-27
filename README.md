# QubitSim

<div align="center">
  <img src="assets/img/LOGOSPNG/logo.png" alt="QubitSim" width="220"/>
  <h1>QubitSim</h1>
  <p><strong>A JavaScript library for simulating quantum computing and post-quantum cryptography</strong></p>
</div>

<div align="center">
  <!-- Core Technologies -->
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/ESModules-007ACC?style=for-the-badge&logo=javascript&logoColor=white" alt="ES Modules"/>
  <!-- Frameworks & Tooling -->
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/JSDoc-008CC1?style=for-the-badge&logo=javascript&logoColor=white" alt="JSDoc"/>
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" alt="Jest"/>
  <!-- Infrastructure -->
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
</div>

---

## 📋 Project Overview

**QubitSim** is a modern JavaScript library implementing fundamental concepts of quantum computing and post-quantum cryptography. Designed to be intuitive and educational, it enables developers and researchers to:

- Simulate qubit operations and quantum registers
- Implement classical quantum algorithms (Grover, Shor, Deutsch-Jozsa, etc.)
- Visualize quantum states and amplitudes
- Explore quantum cryptographic protocols
- Monitor performance via WebAssembly integration

Ideal for students, educators, and enthusiasts exploring the fascinating world of quantum computing without the need for real quantum hardware.

> **Scope Note:**
> This project is a **classical simulator**. It functionally implements qubits, gates, and algorithms to serve as a laboratory for simulation and learning. It is **not** a system for execution on physical quantum hardware, but rather a standard educational and research tool for prototyping quantum logic.

---

## 🚀 Key Features

### ⚛️ Fundamental Quantum Operations
- **Qubit Manipulation**: Creation, transformation, and measurement of quantum states.
- **Quantum Gates**: Implementation of Hadamard (H), Pauli (X, Y, Z), CNOT, and rotation gates.
- **Visualizers**: Tools to visualize the state vector and probability distribution of the system.

### 🔐 Quantum Cryptography
- **Protocol Simulation**: Simulations of Quantum Key Distribution (QKD) protocols.
- **Attack Models**: Implementation of eavesdropping scenarios to demonstrate security.

### ⚡ Performance & Tooling
- **WebAssembly Integration**: Heavy computational tasks are offloaded to WASM for speed.
- **Type-Safe**: Written in TypeScript for robust development.
- **Testing**: Comprehensive unit tests using Jest to ensure algorithmic accuracy.
- **Infrastructure Ready**: Includes Docker configurations for PostgreSQL and Redis for state management or backend scaling.

---

## 🏗️ Architecture

The project is structured into three main layers:

1. **Core Engine**: The mathematical backbone handling linear algebra operations (complex numbers, matrix multiplication).
2. **Simulation Layer**: Logic for specific algorithms and gate operations.
3. **Interface Layer**: React-based UI for visualization and Node.js API for programmatic access.

---

## 🔧 Installation & Usage

### Prerequisites
- Node.js (v16+)
- Docker (optional, for infrastructure)

### Install Dependencies
bash
npm install


### Running the Simulator
bash
# Run core simulation tests
npm test

# Start the development server (React UI)
npm run dev

# Build the library
npm run build


### Example: Creating a Bell State
javascript
import { QubitSim, Gates } from 'qubitsim';

const sim = new QubitSim();
// Apply Hadamard to first qubit
sim.applyGate(Gates.H, 0);
// Apply CNOT (Control: 0, Target: 1)
sim.applyGate(Gates.CNOT, [0, 1]);

console.log(sim.getState());
// Output: Bell State (|00> + |11>) / sqrt(2)


---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.