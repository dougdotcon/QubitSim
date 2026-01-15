import { QuantumRegister } from './src/core/quantumRegister.js';

console.log('Starting debug...');
try {
    const reg = new QuantumRegister(2);
    console.log('numQubits:', reg.numQubits);
    console.log('Has applySwap:', typeof reg.applySwap);

    console.log('Calling applySwap(0, 2)...');
    reg.applySwap(0, 2);
    console.log('Did NOT throw!');
} catch (e) {
    console.log('Caught expected error:', e.message);
}
console.log('End debug.');
