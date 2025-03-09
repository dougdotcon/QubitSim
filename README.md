<div align="center">
  <img src="assets/img/LOGOSPNG/logo.png" alt="Nexlify" width="220"/>
  
# QubitSim

Uma biblioteca JavaScript para simulação de computação quântica e criptografia quântica.

## 📋 Sobre o Projeto

QubitSim é uma biblioteca que implementa conceitos fundamentais de computação quântica e criptografia quântica em JavaScript. O projeto permite simular operações com qubits, implementar algoritmos quânticos e realizar criptografia quântica.

## 🚀 Funcionalidades

### Operações Quânticas Básicas
- Manipulação de qubits
- Aplicação de portas quânticas (H, X, Y, Z, CNOT)
- Emaranhamento de qubits
- Medição de estados quânticos

### Criptografia Quântica
- Geração de chaves quânticas
- Protocolo BB84
- Criptografia e descriptografia de mensagens
- Detecção de interferência
- Autenticação de participantes

## 🛠️ Tecnologias Utilizadas

- JavaScript (ES Modules)
- Node.js
- JSDoc (para documentação)

## 📦 Instalação

```bash
npm install qubitsim
```

## 💻 Como Usar

### Exemplo Básico de Uso

```javascript
import { Qubit } from 'qubitsim/core';
import { QuantumRegister } from 'qubitsim/core';
import { generateKey, encryptMessage, decryptMessage } from 'qubitsim/crypto';

// Criar um qubit
const qubit = new Qubit();

// Aplicar uma porta Hadamard
qubit.applyHadamard();

// Realizar uma medição
const result = qubit.measure();
```

Para mais exemplos, consulte a pasta `examples/`.

## 📁 Estrutura do Projeto

```
qubitsim/
├── src/
│   ├── core/           # Componentes fundamentais
│   │   ├── qubit.js
│   │   ├── quantumRegister.js
│   │   └── measurement.js
│   ├── crypto/         # Funcionalidades de criptografia
│   │   ├── generateKey.js
│   │   ├── encryptMessage.js
│   │   └── decryptMessage.js
│   ├── gates/          # Portas quânticas
│   │   ├── hadamard.js
│   │   ├── pauli.js
│   │   └── cnot.js
│   └── index.js
├── tests/              # Testes unitários
├── docs/              # Documentação da API
├── examples/          # Exemplos de uso
└── package.json
```

## 📚 Documentação

A documentação completa da API está disponível em `docs/`. Para gerar a documentação localmente:

```bash
npm run docs
```

## 🧪 Testes

Para executar os testes:

```bash
npm test
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo [License.md](License.md) para mais detalhes.

## 👥 Autores

- **Maikon Weber** - *Desenvolvimento inicial*

## 📝 Notas

Este é um projeto educacional para estudo e simulação de conceitos de computação quântica. Não deve ser usado para criptografia em produção sem uma revisão de segurança adequada. 