# 🎨 Guia de Estilo - QubitSim

## 📋 Introdução

Este guia de estilo define os padrões de código para o projeto QubitSim. Seguir estes padrões ajuda a manter o código consistente, legível e manutenível.

## 📝 JavaScript

### Nomenclatura

#### Variáveis
```javascript
// Use camelCase para variáveis
const numQubits = 4;
let currentState = 'initial';

// Use UPPER_SNAKE_CASE para constantes
const MAX_QUBITS = 1000;
const DEFAULT_CONFIG = {
  precision: 0.001,
  maxIterations: 1000
};
```

#### Funções
```javascript
// Use camelCase para funções
function calculateProbability() {}
const applyQuantumGate = () => {};

// Use PascalCase para classes
class QuantumRegister {}
class QuantumAlgorithm {}
```

#### Arquivos
```javascript
// Use PascalCase para componentes React
// QuantumCircuit.jsx
// AlgorithmVisualizer.jsx

// Use camelCase para outros arquivos
// quantumGates.js
// utils.js
```

### Formatação

#### Indentação
```javascript
// Use 2 espaços para indentação
function example() {
  const x = 1;
  if (x === 1) {
    console.log('x é 1');
  }
}
```

#### Linhas
```javascript
// Máximo de 80 caracteres por linha
const longString = 
  'Esta é uma string muito longa que precisa ser quebrada em múltiplas linhas';

// Quebre linhas longas em pontos lógicos
function longFunction(
  param1,
  param2,
  param3
) {
  // ...
}
```

#### Espaçamento
```javascript
// Use espaços ao redor de operadores
const sum = a + b;
const product = x * y;

// Não use espaços em parênteses
if (condition) {
  // ...
}

// Use espaços após vírgulas
const array = [1, 2, 3];
const object = { a: 1, b: 2 };
```

### Estrutura

#### Imports
```javascript
// Agrupe imports por tipo
// 1. Imports de bibliotecas
import React from 'react';
import { useState, useEffect } from 'react';

// 2. Imports de componentes
import { Qubit } from './components';
import { QuantumRegister } from './core';

// 3. Imports de utilitários
import { calculateProbability } from './utils';
import { validateInput } from './validation';
```

#### Classes
```javascript
class QuantumAlgorithm {
  // 1. Propriedades estáticas
  static MAX_QUBITS = 1000;

  // 2. Construtor
  constructor(params) {
    this.params = params;
  }

  // 3. Métodos públicos
  execute() {
    // ...
  }

  // 4. Métodos privados
  _validateParams() {
    // ...
  }
}
```

#### Componentes React
```javascript
// 1. Imports
import React from 'react';
import PropTypes from 'prop-types';

// 2. Componente
const QuantumCircuit = ({ qubits, gates }) => {
  // 3. Hooks
  const [state, setState] = useState(initialState);

  // 4. Funções auxiliares
  const handleGateClick = () => {
    // ...
  };

  // 5. Renderização
  return (
    <div className="circuit">
      {/* ... */}
    </div>
  );
};

// 6. PropTypes
QuantumCircuit.propTypes = {
  qubits: PropTypes.number.isRequired,
  gates: PropTypes.arrayOf(PropTypes.string)
};
```

## 🎨 CSS/SCSS

### Nomenclatura

#### Classes
```css
/* Use kebab-case para classes */
.quantum-circuit {
  /* ... */
}

.algorithm-visualizer {
  /* ... */
}

/* Use BEM para modificadores */
.quantum-circuit--active {
  /* ... */
}

.quantum-circuit__gate {
  /* ... */
}

.quantum-circuit__gate--selected {
  /* ... */
}
```

### Organização

#### Estrutura de Arquivos
```
styles/
├── base/
│   ├── _reset.scss
│   ├── _typography.scss
│   └── _variables.scss
├── components/
│   ├── _circuit.scss
│   ├── _gates.scss
│   └── _visualizer.scss
├── layouts/
│   ├── _header.scss
│   └── _footer.scss
└── main.scss
```

#### Ordem de Propriedades
```scss
.element {
  // 1. Posicionamento
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;

  // 2. Box Model
  display: block;
  float: right;
  width: 100px;
  height: 100px;
  margin: 10px;
  padding: 10px;

  // 3. Tipografia
  font: normal 13px/1.5 sans-serif;
  font-size: 13px;
  line-height: 1.5;
  text-align: center;
  color: #333;

  // 4. Visual
  background-color: #f5f5f5;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  opacity: 1;

  // 5. Misc
  cursor: pointer;
  pointer-events: auto;
}
```

## 📚 Documentação

### JSDoc
```javascript
/**
 * Aplica uma porta quântica ao qubit
 * @param {string} gate - Nome da porta quântica
 * @param {number} [target=0] - Índice do qubit alvo
 * @returns {boolean} - Sucesso da operação
 * @throws {Error} - Se a porta não for válida
 */
function applyGate(gate, target = 0) {
  // ...
}
```

### Comentários
```javascript
// Use comentários para explicar código complexo
// Evite comentários óbvios
const result = complexCalculation(); // Calcula o resultado final
```

## 🧪 Testes

### Nomenclatura
```javascript
describe('QuantumRegister', () => {
  test('deve inicializar com número correto de qubits', () => {
    // ...
  });

  test('deve aplicar porta quântica corretamente', () => {
    // ...
  });
});
```

### Organização
```javascript
describe('Componente', () => {
  // Setup
  beforeEach(() => {
    // ...
  });

  // Testes
  test('caso 1', () => {
    // ...
  });

  test('caso 2', () => {
    // ...
  });

  // Cleanup
  afterEach(() => {
    // ...
  });
});
```

## 🔄 Git

### Commits
```bash
# Formato: tipo(escopo): descrição
feat(core): adiciona suporte a portas quânticas
fix(visualizer): corrige renderização de circuitos
docs(readme): atualiza instruções de instalação
```

### Branches
```bash
# Formato: tipo/descrição
feature/quantum-gates
bugfix/circuit-render
hotfix/security-patch
```

## 📦 Dependências

### package.json
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "complex.js": "^3.0.0"
  },
  "devDependencies": {
    "jest": "^29.0.0",
    "eslint": "^8.0.0"
  }
}
```

## 🎯 Boas Práticas

### 1. Código Limpo
- Funções pequenas e focadas
- Nomes descritivos
- Evite duplicação
- Comente apenas o necessário

### 2. Performance
- Otimize loops
- Use estruturas de dados apropriadas
- Evite cálculos desnecessários
- Implemente cache quando apropriado

### 3. Segurança
- Valide inputs
- Escape outputs
- Use constantes para valores sensíveis
- Mantenha dependências atualizadas

## 📚 Recursos Adicionais

### Links Úteis
- [JavaScript Style Guide](https://github.com/airbnb/javascript)
- [React Style Guide](https://github.com/airbnb/javascript/tree/master/react)
- [CSS Style Guide](https://github.com/airbnb/css)
- [Git Style Guide](https://github.com/agis/git-style-guide)

### Ferramentas
- ESLint
- Prettier
- Stylelint
- Husky 