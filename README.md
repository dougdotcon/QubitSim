# QubitSim

<div align="center">
  <img src="assets/img/LOGOSPNG/logo.png" alt="QubitSim" width="220"/>
  <h1>QubitSim</h1>
  <p><strong>Uma biblioteca JavaScript para simulação de computação quântica e criptografia quântica</strong></p>
  
<div align="center">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/ESModules-007ACC?style=for-the-badge&logo=javascript&logoColor=white" alt="ES Modules"/>
  <img src="https://img.shields.io/badge/JSDoc-008CC1?style=for-the-badge&logo=javascript&logoColor=white" alt="JSDoc"/>
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" alt="Jest"/>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
</div>


---

## 📋 Sobre o Projeto

**QubitSim** é uma biblioteca JavaScript moderna que implementa conceitos fundamentais de computação quântica e criptografia quântica. Projetada para ser intuitiva e educacional, permite aos desenvolvedores e pesquisadores:

- Simular operações com qubits
- Implementar algoritmos quânticos clássicos
- Explorar protocolos de criptografia quântica
- Visualizar estados quânticos
- Monitorar e otimizar performance
- Desenvolver interfaces acessíveis e internacionalizadas

Ideal para estudantes, educadores e entusiastas que desejam explorar o fascinante mundo da computação quântica sem a necessidade de hardware quântico real.

---

## 🚀 Funcionalidades

### ⚛️ Operações Quânticas Básicas
- **Manipulação de qubits**: Criação, transformação e medição de qubits
- **Portas quânticas**: Implementação de portas fundamentais (H, X, Y, Z, CNOT)
- **Emaranhamento quântico**: Simulação de estados emaranhados
- **Medição quântica**: Colapso de superposições e obtenção de resultados clássicos
- **Visualização avançada**: Interface gráfica interativa para circuitos quânticos

### 🔐 Criptografia Quântica
- **Geração de chaves quânticas**: Criação segura de chaves usando princípios quânticos
- **Protocolo BB84**: Implementação do primeiro protocolo de distribuição quântica de chaves
- **Criptografia e descriptografia**: Proteção de mensagens usando chaves quânticas
- **Detecção de interferência**: Identificação de tentativas de espionagem
- **Autenticação quântica**: Verificação segura de identidades
- **Validação de segurança**: Verificações automáticas de vulnerabilidades

### 🧮 Algoritmos Quânticos
- **Deutsch-Jozsa**: Determinação de propriedades de funções booleanas
- **Grover**: Busca em bases de dados não estruturadas
- **Shor**: Fatoração de números inteiros
- **Bernstein-Vazirani**: Descoberta de strings ocultas
- **Visualização de algoritmos**: Interface interativa para acompanhamento de execução

### 📊 Monitoramento e Performance
- **Métricas em tempo real**: Monitoramento de uso de recursos
- **Profiling**: Análise detalhada de performance
- **Otimização automática**: Cache inteligente e lazy loading
- **Rastreamento**: Logs estruturados e análise de erros
- **Dashboards**: Visualização de métricas e alertas

### 🌐 Interface e Acessibilidade
- **Interface responsiva**: Adaptação a diferentes dispositivos
- **Internacionalização**: Suporte a múltiplos idiomas (pt-BR, en, es)
- **Acessibilidade**: Conformidade com WCAG 2.1
- **Temas personalizáveis**: Suporte a temas claros e escuros
- **Componentes reutilizáveis**: Biblioteca de componentes React

### 🔄 DevOps e CI/CD
- **Pipeline automatizado**: Testes, build e deploy automáticos
- **Controle de qualidade**: Linting e análise estática
- **Monitoramento**: Integração com ferramentas de APM
- **Backup automático**: Rotinas de backup e recuperação
- **Segurança**: Verificações automáticas de vulnerabilidades

---

---

## 📦 Instalação

```bash
# Instalação básica
npm install qubitsim

# Instalação com suporte a internacionalização
npm install qubitsim i18next react-i18next

# Instalação com todas as dependências opcionais
npm install qubitsim i18next react-i18next @sentry/react @sentry/tracing redis
```

---

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
console.log(`Resultado da medição: ${result}`);
```

### Exemplo de Algoritmo Quântico com Visualização

```javascript
import { DeutschJozsa } from 'qubitsim/algorithms';
import { AlgorithmVisualizer } from 'qubitsim/ui';

// Criar uma instância do algoritmo com 3 qubits
const dj = new DeutschJozsa(3);

// Criar visualizador
const visualizer = new AlgorithmVisualizer(dj);

// Executar o algoritmo com visualização
const result = await visualizer.executeWithVisualization();
console.log(`A função é ${result ? 'balanceada' : 'constante'}`);
```

### Exemplo de Internacionalização

```javascript
import { useTranslation } from 'react-i18next';
import { QuantumCircuit } from 'qubitsim/ui';

const QuantumApp = () => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1>{t('quantum.circuit.title')}</h1>
      <QuantumCircuit 
        labels={{
          addQubit: t('quantum.circuit.addQubit'),
          measure: t('quantum.circuit.measure')
        }}
      />
    </div>
  );
};
```

### Exemplo de Monitoramento

```javascript
import { PerformanceMonitor } from 'qubitsim/monitoring';

// Configurar monitoramento
const monitor = new PerformanceMonitor({
  metrics: ['cpu', 'memory', 'qubits'],
  interval: 1000
});

// Iniciar coleta de métricas
monitor.start();

// Executar algoritmo com monitoramento
const algorithm = new QuantumAlgorithm();
const result = await monitor.track(() => algorithm.execute());

// Obter métricas
const metrics = monitor.getMetrics();
console.log('Performance metrics:', metrics);
```

> 📘 **Nota**: Para mais exemplos detalhados, consulte a pasta `examples/`.

---

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
│   ├── algorithms/     # Algoritmos quânticos
│   │   ├── deutschJozsa.js
│   │   ├── grover.js
│   │   ├── shor.js
│   │   └── bernsteinVazirani.js
│   ├── ui/            # Interface do usuário
│   │   ├── components/
│   │   ├── hooks/
│   │   └── themes/
│   ├── monitoring/    # Sistema de monitoramento
│   │   ├── metrics/
│   │   ├── profiling/
│   │   └── alerts/
│   ├── i18n/         # Internacionalização
│   │   ├── locales/
│   │   └── config.js
│   └── index.js
├── tests/              # Testes unitários
├── docs/              # Documentação da API
├── examples/          # Exemplos de uso
└── package.json
```

---

## 📚 Documentação

A documentação completa da API está disponível em `docs/`. Para gerar a documentação localmente:

```bash
npm run docs
```

Após a geração, abra `docs/index.html` no seu navegador para explorar a documentação interativa.

### Guias Disponíveis
- [Visão Geral](docs/OVERVIEW.md)
- [Guia de Início Rápido](docs/quickstart.md)
- [Referência da API](docs/api.md)
- [Guia de Desenvolvimento](docs/development.md)
- [Guia de Segurança](docs/security.md)
- [Guia de Performance](docs/performance.md)
- [Guia de Acessibilidade](docs/accessibility.md)
- [Guia de Internacionalização](docs/i18n.md)
- [Guia de Monitoramento](docs/monitoring.md)
- [Guia de CI/CD](docs/ci-cd.md)
- [FAQ](docs/faq.md)

---

## 🧪 Testes

Para garantir a qualidade e confiabilidade, o QubitSim possui uma suíte abrangente de testes:

```bash
# Executar todos os testes
npm test

# Executar testes com cobertura
npm run test:coverage

# Executar testes específicos
npm test -- --testPathPattern=qubit

# Executar testes de performance
npm run test:performance

# Executar testes de acessibilidade
npm run test:a11y

# Executar testes de integração
npm run test:integration
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas e muito apreciadas! Siga estes passos:

1. 🍴 Faça um fork do projeto
2. 🌿 Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit suas mudanças (`git commit -m 'feat(scope): add some AmazingFeature'`)
4. 📤 Push para a branch (`git push origin feature/AmazingFeature`)
5. 🔍 Abra um Pull Request

Consulte nossos guias detalhados:
- [Guia de Contribuição](CONTRIBUTING.md)
- [Guia de Estilo](docs/style-guide.md)
- [Guia de Desenvolvimento](docs/development.md)
- [Guia de Testes](docs/testing.md)

---

## 🔒 Segurança

O QubitSim leva a segurança a sério. Implementamos:

- Validação rigorosa de inputs
- Criptografia de dados sensíveis
- Proteção contra ataques comuns (XSS, CSRF)
- Auditoria automática de dependências
- Monitoramento de vulnerabilidades

Para reportar vulnerabilidades de segurança, por favor envie um email para security@qubitsim.com.

Consulte nosso [Guia de Segurança](docs/security.md) para mais detalhes.

---

## 📈 Performance

O QubitSim é otimizado para:

- Execução eficiente de algoritmos quânticos
- Renderização rápida de interfaces
- Gerenciamento inteligente de memória
- Cache automático de resultados
- Carregamento lazy de componentes

Recursos de monitoramento incluem:
- Métricas em tempo real
- Profiling detalhado
- Alertas automáticos
- Dashboards personalizáveis
- Logs estruturados

Consulte nosso [Guia de Performance](docs/performance.md) para mais detalhes.

---

## 🌐 Internacionalização

O QubitSim suporta múltiplos idiomas:

- 🇧🇷 Português (Brasil)
- 🇺🇸 English
- 🇪🇸 Español

Para adicionar um novo idioma ou melhorar traduções existentes, consulte nosso [Guia de Internacionalização](docs/i18n.md).

---

## ♿ Acessibilidade

O QubitSim segue as diretrizes WCAG 2.1:

- Navegação por teclado
- Suporte a leitores de tela
- Alto contraste
- Textos redimensionáveis
- Legendas e descrições

Consulte nosso [Guia de Acessibilidade](docs/accessibility.md) para mais detalhes.

---

## 📄 Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE) - veja o arquivo LICENSE para detalhes.

<div align="center">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="MIT License"/>
</div>

A licença MIT é uma licença de software permissiva que coloca poucas restrições de uso, modificação e distribuição. Ela permite:

- ✅ Uso comercial
- ✅ Modificação
- ✅ Distribuição
- ✅ Uso privado

A única exigência é manter o aviso de copyright e a licença em qualquer cópia do software/código fonte.

---

## 👥 Autores

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/maikonweber">
        <img src="https://github.com/maikonweber.png" width="100px;" alt="Maikon Weber"/>
        <br />
        <sub><b>Maikon Weber</b></sub>
      </a>
      <br />
      <sub>Desenvolvimento inicial</sub>
    </td>
    <td align="center">
      <a href="https://github.com/dougdotcon">
        <img src="https://github.com/dougdotcon.png" width="100px;" alt="Douglas Machado"/>
        <br />
        <sub><b>Douglas Machado</b></sub>
      </a>
      <br />
      <sub>Desenvolvimento inicial</sub>
    </td>
    <td align="center">
      <a href="https://github.com/suissa">
        <img src="https://github.com/suissa.png" width="100px;" alt="Jean Suissa"/>
        <br />
        <sub><b>Jean Suissa</b></sub>
      </a>
      <br />
      <sub>Desenvolvimento inicial</sub>
    </td>
  </tr>
</table>


---

## 📝 Notas

Este é um projeto educacional para estudo e simulação de conceitos de computação quântica. Não deve ser usado para criptografia em produção sem uma revisão de segurança adequada.

### Status do Projeto
- **Fase Atual**: 3 - Funcionalidades Core
- **Progresso**: 80%
- **Próximos Passos**:
  1. Implementação do algoritmo de Shor
  2. Melhorias na visualização de circuitos
  3. Otimizações de performance
  4. Expansão da documentação

---

<div align="center">
  <sub>Construído com ❤️ por entusiastas da computação quântica.</sub>
</div> 
