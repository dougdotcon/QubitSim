# ♿ Guia de Acessibilidade - QubitSim

## 📋 Introdução

Este guia fornece diretrizes e boas práticas para garantir que o QubitSim seja acessível a todos os usuários, independentemente de suas necessidades específicas.

## 🎯 Princípios Fundamentais

### 1. Perceptível
- Alternativas textuais para conteúdo não textual
- Legendas para mídia
- Contraste adequado
- Texto redimensionável

### 2. Operável
- Navegação por teclado
- Tempo suficiente para leitura
- Sem conteúdo que cause convulsões
- Navegação clara

### 3. Compreensível
- Texto legível
- Operações previsíveis
- Assistência para erros
- Consistência

### 4. Robusto
- Compatibilidade com tecnologias assistivas
- HTML válido
- ARIA quando necessário
- Testes de acessibilidade

## 🎨 Interface Visual

### 1. Contraste
```css
/* Use contraste adequado (mínimo 4.5:1) */
.text {
  color: #000000; /* Preto sobre branco */
  background-color: #FFFFFF;
}

/* Evite cores que causam problemas */
.problematic {
  color: #FF0000; /* Vermelho puro */
  background-color: #00FF00; /* Verde puro */
}
```

### 2. Tamanho de Texto
```css
/* Use unidades relativas */
body {
  font-size: 16px; /* Tamanho base */
}

h1 {
  font-size: 2rem; /* Relativo ao tamanho base */
}

/* Permita redimensionamento */
html {
  font-size: 16px;
}

@media (max-width: 768px) {
  html {
    font-size: 14px;
  }
}
```

### 3. Espaçamento
```css
/* Use espaçamento adequado */
.element {
  padding: 1rem;
  margin: 1rem;
  line-height: 1.5;
}

/* Evite sobreposição */
.interactive {
  min-height: 44px; /* Área mínima para toque */
  padding: 12px;
}
```

## ⌨️ Navegação por Teclado

### 1. Foco
```css
/* Estilo de foco visível */
:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

/* Não remova o outline */
*:focus {
  outline: none; /* ❌ */
}
```

### 2. Ordem de Tab
```javascript
// Use tabIndex apropriadamente
<div tabIndex="0">Elemento focável</div>
<div tabIndex="-1">Elemento programaticamente focável</div>

// Mantenha ordem lógica
<div role="navigation" aria-label="Menu principal">
  <a href="#home">Início</a>
  <a href="#about">Sobre</a>
  <a href="#contact">Contato</a>
</div>
```

## 🗣️ Tecnologias Assistivas

### 1. ARIA
```javascript
// Use roles apropriados
<div role="button" aria-label="Executar algoritmo">
  Executar
</div>

// Descreva estados
<button
  aria-expanded="false"
  aria-controls="quantum-panel"
>
  Abrir painel
</button>
```

### 2. Textos Alternativos
```javascript
// Imagens
<img
  src="circuit.png"
  alt="Diagrama do circuito quântico mostrando 3 qubits conectados"
/>

// Ícones
<button aria-label="Fechar">
  <span className="icon">×</span>
</button>
```

## 🎮 Interatividade

### 1. Formulários
```javascript
// Labels associados
<label htmlFor="qubit-count">
  Número de Qubits:
  <input
    id="qubit-count"
    type="number"
    min="1"
    max="10"
    aria-describedby="qubit-help"
  />
</label>
<span id="qubit-help">
  Escolha entre 1 e 10 qubits para simulação
</span>
```

### 2. Feedback
```javascript
// Mensagens de erro
<div role="alert" aria-live="polite">
  {error && <p>Erro: {error.message}</p>}
</div>

// Status de carregamento
<div role="status" aria-live="polite">
  {loading && <p>Carregando...</p>}
</div>
```

## 🎯 Componentes React

### 1. Componentes Acessíveis
```javascript
// Botão acessível
const AccessibleButton = ({ onClick, children }) => (
  <button
    onClick={onClick}
    aria-label={children}
    className="accessible-button"
  >
    {children}
  </button>
);

// Input acessível
const AccessibleInput = ({ label, ...props }) => (
  <div className="form-group">
    <label htmlFor={props.id}>{label}</label>
    <input
      id={props.id}
      aria-describedby={`${props.id}-help`}
      {...props}
    />
    <span id={`${props.id}-help`} className="help-text">
      {props.helpText}
    </span>
  </div>
);
```

### 2. Hooks de Acessibilidade
```javascript
// Hook para gerenciar foco
const useFocusTrap = (ref, isOpen) => {
  useEffect(() => {
    if (isOpen) {
      const focusableElements = ref.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusable = focusableElements[0];
      firstFocusable?.focus();
    }
  }, [isOpen, ref]);
};

// Hook para gerenciar teclas
const useKeyboardNavigation = (onKeyPress) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      onKeyPress(event);
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onKeyPress]);
};
```

## 🧪 Testes de Acessibilidade

### 1. Testes Automatizados
```javascript
// Use jest-axe para testes
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('componente não tem violações de acessibilidade', async () => {
  const { container } = render(<QuantumCircuit />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### 2. Testes Manuais
```javascript
// Checklist de testes
const accessibilityChecklist = [
  'Navegação por teclado funciona',
  'Contraste é adequado',
  'Textos alternativos estão presentes',
  'ARIA é usado corretamente',
  'Formulários são acessíveis'
];
```

## 📱 Responsividade

### 1. Layout Adaptativo
```css
/* Use media queries para diferentes tamanhos */
@media (max-width: 768px) {
  .circuit {
    flex-direction: column;
  }
  
  .controls {
    width: 100%;
  }
}

/* Evite overflow horizontal */
.container {
  max-width: 100%;
  overflow-x: hidden;
}
```

### 2. Touch Targets
```css
/* Área mínima para toque */
.interactive {
  min-width: 44px;
  min-height: 44px;
  padding: 12px;
}

/* Espaçamento adequado */
.touch-elements {
  margin: 8px;
  padding: 8px;
}
```

## 🎯 Boas Práticas

### 1. Semântica
```javascript
// Use elementos semânticos
<header>
  <nav>
    <ul>
      <li><a href="#home">Início</a></li>
      <li><a href="#about">Sobre</a></li>
    </ul>
  </nav>
</header>

// Evite divs desnecessários
<div role="button">❌</div>
<button>✅</button>
```

### 2. Performance
```javascript
// Otimize carregamento
const LazyComponent = React.lazy(() => import('./HeavyComponent'));

// Use Suspense
<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>
```

## 📚 Recursos Adicionais

### Links Úteis
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [React Accessibility](https://reactjs.org/docs/accessibility.html)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [A11Y Project](https://www.a11yproject.com/)

### Ferramentas
- axe DevTools
- Lighthouse
- WAVE
- NVDA 