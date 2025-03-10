# 🧪 Guia de Testes - QubitSim

## 📋 Introdução

Este guia fornece informações sobre como escrever e executar testes para o QubitSim. Os testes são essenciais para garantir a qualidade e confiabilidade do código.

## 🎯 Tipos de Testes

### 1. Testes Unitários

#### O que Testar
- Classes individuais
- Métodos isolados
- Funções utilitárias
- Componentes React

#### Exemplo
```javascript
describe('Qubit', () => {
  let qubit;

  beforeEach(() => {
    qubit = new Qubit();
  });

  test('deve inicializar no estado |0⟩', () => {
    expect(qubit.measure()).toBe('down');
  });

  test('deve aplicar porta Hadamard corretamente', () => {
    qubit.applyHadamard();
    const result = qubit.measure();
    expect(['up', 'down']).toContain(result);
  });
});
```

### 2. Testes de Integração

#### O que Testar
- Interação entre componentes
- Fluxos de dados
- APIs e endpoints
- Integrações externas

#### Exemplo
```javascript
describe('QuantumRegister', () => {
  let register;

  beforeEach(() => {
    register = new QuantumRegister(2);
  });

  test('deve criar emaranhamento entre qubits', () => {
    register.entangle(0, 1);
    const result1 = register.measure(0);
    const result2 = register.measure(1);
    expect(result1).toBe(result2);
  });
});
```

### 3. Testes de Performance

#### O que Testar
- Tempo de execução
- Uso de memória
- Escalabilidade
- Otimizações

#### Exemplo
```javascript
describe('Performance', () => {
  test('deve executar algoritmo Grover em tempo aceitável', () => {
    const start = performance.now();
    const algorithm = new Grover(4);
    algorithm.execute();
    const end = performance.now();
    expect(end - start).toBeLessThan(1000); // 1 segundo
  });
});
```

### 4. Testes de Visualização

#### O que Testar
- Componentes React
- Renderização
- Interações do usuário
- Estilos e layout

#### Exemplo
```javascript
describe('QuantumCircuit', () => {
  test('deve renderizar circuito corretamente', () => {
    const { container } = render(<QuantumCircuit />);
    expect(container.querySelector('.circuit')).toBeInTheDocument();
  });

  test('deve atualizar ao adicionar porta', () => {
    const { container } = render(<QuantumCircuit />);
    fireEvent.click(container.querySelector('.add-gate'));
    expect(container.querySelectorAll('.gate')).toHaveLength(1);
  });
});
```

## 🛠️ Ferramentas

### Jest
- Framework de teste
- Assertions
- Mocks e spies
- Cobertura de código

### React Testing Library
- Testes de componentes
- Interações do usuário
- Acessibilidade
- Boas práticas

### Cypress
- Testes E2E
- Interface do usuário
- Fluxos completos
- Debugging

## 📝 Padrões de Teste

### Nomenclatura
- Descritiva e clara
- Indica comportamento esperado
- Segue padrão: "deve [comportamento] quando [condição]"

### Organização
- Agrupe testes relacionados
- Use describe para contexto
- Use beforeEach para setup
- Use afterEach para cleanup

### Assertions
- Use expect
- Seja específico
- Evite múltiplas assertions
- Teste casos de erro

## 🔄 Ciclo de Teste

### 1. Setup
```javascript
beforeEach(() => {
  // Configuração
});
```

### 2. Execução
```javascript
test('deve fazer algo', () => {
  // Ação
});
```

### 3. Verificação
```javascript
expect(result).toBe(expected);
```

### 4. Cleanup
```javascript
afterEach(() => {
  // Limpeza
});
```

## 📈 Cobertura de Código

### Requisitos
- Mínimo 80% de cobertura
- Teste todos os caminhos
- Inclua casos de erro
- Teste edge cases

### Relatórios
```bash
npm run test:coverage
```

## 🐛 Debugging

### Ferramentas
- Jest debugger
- Chrome DevTools
- React DevTools
- Cypress debugger

### Logs
```javascript
console.log('debug:', value);
```

## 🔍 Boas Práticas

### 1. Isolamento
- Teste uma coisa por vez
- Evite dependências
- Use mocks quando necessário

### 2. Manutenibilidade
- Código limpo e legível
- Evite duplicação
- Use helpers quando apropriado

### 3. Confiabilidade
- Teste casos reais
- Evite testes frágeis
- Mantenha testes atualizados

## 📚 Documentação

### Testes
- Documente casos especiais
- Explique decisões de design
- Mantenha exemplos atualizados

### Cobertura
- Documente gaps
- Justifique exclusões
- Mantenha relatórios

## 🔄 CI/CD

### Integração Contínua
- Execute testes automaticamente
- Verifique cobertura
- Reporte resultados

### Deploy
- Teste em staging
- Verifique produção
- Monitore performance

## 🎯 Exemplos Práticos

### Teste de Algoritmo
```javascript
describe('Deutsch-Jozsa', () => {
  test('deve identificar função constante', () => {
    const algorithm = new DeutschJozsa(1);
    const result = algorithm.execute();
    expect(result).toBe('constant');
  });
});
```

### Teste de Componente
```javascript
describe('AlgorithmVisualizer', () => {
  test('deve mostrar progresso', () => {
    const { container } = render(<AlgorithmVisualizer />);
    expect(container.querySelector('.progress')).toBeInTheDocument();
  });
});
```

### Teste de Performance
```javascript
describe('QuantumSimulation', () => {
  test('deve simular 1000 qubits', () => {
    const register = new QuantumRegister(1000);
    const start = performance.now();
    register.applyHadamard(0);
    const end = performance.now();
    expect(end - start).toBeLessThan(100);
  });
});
```

## 📚 Recursos Adicionais

### Links Úteis
- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [Cypress Documentation](https://docs.cypress.io/)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

### Exemplos
- [Exemplos de Testes](examples/tests/)
- [Testes de Performance](examples/performance/)
- [Testes de UI](examples/ui/) 