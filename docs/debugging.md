# 🐛 Guia de Depuração - QubitSim

## 📋 Introdução

Este guia fornece diretrizes e boas práticas para depuração do QubitSim, ajudando desenvolvedores a identificar e resolver problemas de forma eficiente.

## 🛠️ Ferramentas

### 1. Chrome DevTools
```javascript
// Console
console.log('Mensagem de debug');
console.error('Erro crítico');
console.warn('Aviso');
console.info('Informação');

// Console com formatação
console.log('%cEstilo', 'color: blue; font-size: 20px;');
console.table([{ id: 1, name: 'Qubit 1' }]);

// Console com grupos
console.group('Operação Quântica');
console.log('Iniciando...');
console.log('Processando...');
console.log('Finalizando...');
console.groupEnd();
```

### 2. React DevTools
```javascript
// Use React.memo para evitar re-renderizações
const QuantumCircuit = React.memo(({ qubits, gates }) => {
  console.log('Renderizando QuantumCircuit');
  return (
    <div className="circuit">
      {/* ... */}
    </div>
  );
});

// Use React.Profiler para medir performance
<React.Profiler id="QuantumCircuit" onRender={onRender}>
  <QuantumCircuit />
</React.Profiler>
```

## 🔍 Técnicas de Depuração

### 1. Breakpoints
```javascript
// Breakpoint condicional
if (numQubits > 10) {
  debugger; // Pausa execução quando numQubits > 10
}

// Breakpoint com condição
console.log('Estado atual:', state);
if (state.error) {
  console.error('Erro encontrado:', state.error);
}
```

### 2. Logging
```javascript
// Logging estruturado
const logState = (state, context) => {
  console.log({
    timestamp: new Date().toISOString(),
    context,
    state: {
      qubits: state.qubits,
      gates: state.gates,
      error: state.error
    }
  });
};

// Logging com níveis
const logger = {
  debug: (msg, data) => console.log(`[DEBUG] ${msg}`, data),
  info: (msg, data) => console.info(`[INFO] ${msg}`, data),
  warn: (msg, data) => console.warn(`[WARN] ${msg}`, data),
  error: (msg, data) => console.error(`[ERROR] ${msg}`, data)
};
```

## 🎯 Depuração de Componentes

### 1. Hooks
```javascript
// Debug de useEffect
useEffect(() => {
  console.log('Effect executado');
  return () => {
    console.log('Cleanup executado');
  };
}, [dependencies]);

// Debug de useState
const [state, setState] = useState(initialState);
useEffect(() => {
  console.log('Estado atualizado:', state);
}, [state]);
```

### 2. Props
```javascript
// Debug de props
const QuantumGate = React.memo(({ type, target, control }) => {
  console.log('Props recebidas:', { type, target, control });
  return (
    <div className={`gate ${type}`}>
      {/* ... */}
    </div>
  );
});
```

## 🔄 Depuração de Estado

### 1. Redux DevTools
```javascript
// Middleware de logging
const logger = store => next => action => {
  console.log('Action:', action);
  const result = next(action);
  console.log('Next State:', store.getState());
  return result;
};

// Uso
const store = createStore(
  rootReducer,
  applyMiddleware(logger)
);
```

### 2. Context API
```javascript
// Debug de Context
const QuantumContext = createContext();

const QuantumProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  useEffect(() => {
    console.log('Context atualizado:', state);
  }, [state]);

  return (
    <QuantumContext.Provider value={{ state, dispatch }}>
      {children}
    </QuantumContext.Provider>
  );
};
```

## 🧪 Testes de Depuração

### 1. Jest
```javascript
// Teste com debug
test('deve executar algoritmo corretamente', () => {
  const algorithm = new QuantumAlgorithm();
  console.log('Estado inicial:', algorithm.state);
  
  algorithm.execute();
  console.log('Estado após execução:', algorithm.state);
  
  expect(algorithm.result).toBeDefined();
});
```

### 2. React Testing Library
```javascript
// Debug de renderização
test('deve renderizar circuito', () => {
  const { container, debug } = render(<QuantumCircuit />);
  
  // Mostra HTML renderizado
  debug();
  
  // Verifica elementos
  expect(container.querySelector('.circuit')).toBeInTheDocument();
});
```

## 🐛 Erros Comuns

### 1. Erros de Estado
```javascript
// Debug de estado inconsistente
const [state, setState] = useState(initialState);

useEffect(() => {
  console.log('Estado antes da atualização:', state);
  setState(newState);
  console.log('Estado após atualização:', newState);
}, []);
```

### 2. Erros de Renderização
```javascript
// Debug de renderização infinita
useEffect(() => {
  console.log('Dependências:', dependencies);
  // Verifica dependências que causam re-renderização
}, [dependencies]);
```

## 📊 Performance

### 1. Profiling
```javascript
// Profiling de componentes
const ProfiledComponent = React.memo(({ data }) => {
  console.time('render');
  const result = expensiveOperation(data);
  console.timeEnd('render');
  return result;
});

// Profiling de funções
function measurePerformance(fn) {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(`Tempo de execução: ${end - start}ms`);
  return result;
}
```

### 2. Memory Leaks
```javascript
// Debug de memory leaks
useEffect(() => {
  const subscription = data.subscribe();
  console.log('Subscription criada');
  
  return () => {
    subscription.unsubscribe();
    console.log('Subscription limpa');
  };
}, []);
```

## 🔍 Network

### 1. Requisições
```javascript
// Debug de requisições
const fetchData = async () => {
  console.log('Iniciando requisição');
  try {
    const response = await fetch('/api/data');
    console.log('Resposta recebida:', response);
    const data = await response.json();
    console.log('Dados processados:', data);
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
};
```

### 2. WebSocket
```javascript
// Debug de WebSocket
const socket = new WebSocket('ws://localhost:8080');

socket.onopen = () => {
  console.log('Conexão estabelecida');
};

socket.onmessage = (event) => {
  console.log('Mensagem recebida:', event.data);
};

socket.onerror = (error) => {
  console.error('Erro no WebSocket:', error);
};
```

## 📚 Recursos Adicionais

### Links Úteis
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [React DevTools](https://reactjs.org/blog/2019/08/15/new-react-devtools.html)
- [Jest Debugging](https://jestjs.io/docs/troubleshooting)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)

### Ferramentas
- Chrome DevTools
- React DevTools
- Jest
- React Testing Library
- Redux DevTools 