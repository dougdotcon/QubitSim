// Core Exports
export { Qubit, Complex } from './core/qubit.js';
export { QuantumRegister } from './core/quantumRegister.js';
export { OMEGA, entropicOptimizer, calculateVacuumFluctuation } from './core/unified_physics.js';

// Crypto Exports
export { generateRandomKey } from './crypto/generateKey.js';
export { BB84 } from './crypto/bb84.js';

// Note: encryptMessage and decryptMessage are largely superseded by BB84 but kept for reference if needed
// export { encryptMessage } from './crypto/encryptMessage.js';