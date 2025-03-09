import { Qubit } from '../src/core/qubit.js';
import { QuantumRegister } from '../src/core/quantumRegister.js';
import { generateKey } from '../src/crypto/generateKey.js';
import { encryptMessage } from '../src/crypto/encryptMessage.js';
import { decryptMessage } from '../src/crypto/decryptMessage.js';

// Exemplo 1: Manipulação básica de qubits
console.log('Exemplo 1: Manipulação de Qubits');
const qubit = new Qubit();
console.log('Estado inicial:', qubit.getState());
qubit.applyHadamard();
console.log('Após porta Hadamard:', qubit.getState());
const measurement = qubit.measure();
console.log('Resultado da medição:', measurement);

// Exemplo 2: Registro quântico
console.log('\nExemplo 2: Registro Quântico');
const register = new QuantumRegister(2);
console.log('Estado do registro:', register.getState());
register.applyCNOT(0, 1);
console.log('Após CNOT:', register.getState());

// Exemplo 3: Criptografia quântica
console.log('\nExemplo 3: Criptografia Quântica');
async function demonstrateCrypto() {
    const key = await generateKey();
    console.log('Chave gerada:', key);
    
    const message = "Mensagem secreta";
    const encrypted = encryptMessage(message, key);
    console.log('Mensagem criptografada:', encrypted);
    
    const decrypted = decryptMessage(encrypted, key);
    console.log('Mensagem descriptografada:', decrypted);
    console.log('Mensagem original:', message);
}

demonstrateCrypto().catch(console.error); 