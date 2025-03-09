# Guia de Início Rápido - QubitSim

## 🚀 Começando

### Instalação

```bash
# Instalar via npm
npm install qubitsim

# Ou instalar via yarn
yarn add qubitsim
```

### Importação

```javascript
// Importar componentes principais
import { Qubit } from 'qubitsim/core';
import { QuantumRegister } from 'qubitsim/core';

// Importar funcionalidades de criptografia
import { generateKey, encryptMessage, decryptMessage } from 'qubitsim/crypto';
```

## 📝 Exemplos Básicos

### 1. Criando e Manipulando um Qubit

```javascript
// Criar um novo qubit
const qubit = new Qubit();

// Aplicar uma porta Hadamard
qubit.applyHadamard();

// Realizar uma medição
const result = qubit.measure();
console.log('Resultado da medição:', result);
```

### 2. Trabalhando com Registro Quântico

```javascript
// Criar um registro com 2 qubits
const register = new QuantumRegister(2);

// Aplicar uma porta CNOT
register.applyCNOT(0, 1);

// Obter o estado do registro
const state = register.getState();
console.log('Estado do registro:', state);
```

### 3. Criptografia Quântica

```javascript
async function exemploCriptografia() {
    // Gerar uma chave quântica
    const key = await generateKey();
    
    // Mensagem para criptografar
    const mensagem = "Olá, Mundo!";
    
    // Criptografar a mensagem
    const mensagemCriptografada = encryptMessage(mensagem, key);
    
    // Descriptografar a mensagem
    const mensagemDescriptografada = decryptMessage(mensagemCriptografada, key);
    
    console.log('Mensagem original:', mensagem);
    console.log('Mensagem criptografada:', mensagemCriptografada);
    console.log('Mensagem descriptografada:', mensagemDescriptografada);
}
```

## 🎯 Casos de Uso Comuns

### 1. Simulação de Circuito Quântico Simples

```javascript
// Criar um circuito com 3 qubits
const circuito = new QuantumRegister(3);

// Aplicar uma sequência de portas
circuito.applyHadamard(0);
circuito.applyCNOT(0, 1);
circuito.applyPauliX(2);

// Medir todos os qubits
const resultados = circuito.measureAll();
console.log('Resultados das medições:', resultados);
```

### 2. Protocolo BB84 Simplificado

```javascript
async function protocoloBB84() {
    // Alice gera uma chave
    const chaveAlice = await generateKey();
    
    // Bob recebe a chave (simulado)
    const chaveBob = chaveAlice;
    
    // Alice criptografa uma mensagem
    const mensagem = "Dados sensíveis";
    const mensagemCriptografada = encryptMessage(mensagem, chaveAlice);
    
    // Bob descriptografa a mensagem
    const mensagemDescriptografada = decryptMessage(mensagemCriptografada, chaveBob);
    
    console.log('Mensagem original:', mensagem);
    console.log('Mensagem descriptografada:', mensagemDescriptografada);
}
```

## 🔍 Dicas e Boas Práticas

1. **Gerenciamento de Estados**
   - Sempre verifique o estado dos qubits antes e depois das operações
   - Use `getState()` para debug

2. **Tratamento de Erros**
   - Use try/catch para operações assíncronas
   - Verifique os resultados das medições

3. **Performance**
   - Evite criar registros quânticos muito grandes
   - Limpe recursos não utilizados

4. **Segurança**
   - Não use em produção sem revisão de segurança
   - Mantenha as chaves quânticas seguras

## 📚 Próximos Passos

1. Explore os exemplos na pasta `examples/`
2. Leia a [documentação completa da API](api.md)
3. Experimente diferentes combinações de portas quânticas
4. Implemente seus próprios algoritmos quânticos

## ❓ Precisa de Ajuda?

- Consulte o [FAQ](faq.md)
- Abra uma issue no [GitHub](https://github.com/maikonweber/quantum.js/issues)
- Participe das [discussões](https://github.com/maikonweber/quantum.js/discussions) 