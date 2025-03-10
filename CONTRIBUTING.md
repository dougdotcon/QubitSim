# 🤝 Guia de Contribuição

Obrigado pelo interesse em contribuir com o QubitSim! Este documento fornece diretrizes e instruções para contribuir com o projeto.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Posso Contribuir?](#como-posso-contribuir)
  - [Reportando Bugs](#reportando-bugs)
  - [Sugerindo Melhorias](#sugerindo-melhorias)
  - [Contribuindo com Código](#contribuindo-com-código)
- [Estilo de Código](#estilo-de-código)
- [Processo de Pull Request](#processo-de-pull-request)
- [Configuração de Desenvolvimento](#configuração-de-desenvolvimento)

## 📜 Código de Conduta

Este projeto e todos os participantes estão sujeitos a um Código de Conduta. Ao participar, espera-se que você mantenha este código. Por favor, reporte comportamento inaceitável para [contato@qubitsim.com](mailto:contato@qubitsim.com).

## 🚀 Como Posso Contribuir?

### Reportando Bugs

Esta seção orienta você sobre como reportar bugs. Seguir estas diretrizes ajuda os mantenedores a entender seu relatório, reproduzir o comportamento e encontrar relatórios relacionados.

- **Use o rastreador de issues do GitHub** para criar novos relatórios de bugs.
- **Verifique se o bug já foi reportado** pesquisando no GitHub em Issues.
- **Use um título claro e descritivo** para identificar o problema.
- **Descreva os passos exatos para reproduzir o problema** com o máximo de detalhes possível.
- **Forneça exemplos específicos** para demonstrar os passos.
- **Descreva o comportamento que você observou após seguir os passos** e explique qual é o problema com esse comportamento.
- **Explique qual comportamento você esperava ver** e por quê.
- **Inclua capturas de tela ou GIFs animados** que mostrem você seguindo os passos descritos e demonstrem claramente o problema.

### Sugerindo Melhorias

Esta seção orienta você sobre como enviar uma sugestão de melhoria, incluindo recursos completamente novos e melhorias menores para funcionalidades existentes.

- **Use o rastreador de issues do GitHub** para criar sugestões de melhorias.
- **Use um título claro e descritivo** para a issue.
- **Forneça uma descrição detalhada da melhoria sugerida** e por que ela seria útil.
- **Inclua exemplos de código** para demonstrar a ideia, se aplicável.
- **Liste os benefícios e possíveis desvantagens** da implementação sugerida.

### Contribuindo com Código

#### Configuração Local

1. Faça um fork do repositório.
2. Clone seu fork: `git clone https://github.com/seu-username/qubitsim.git`
3. Adicione o upstream: `git remote add upstream https://github.com/original-owner/qubitsim.git`
4. Instale as dependências: `npm install`

#### Processo de Desenvolvimento

1. Crie uma branch para sua feature: `git checkout -b feature/minha-nova-feature`
2. Faça suas alterações e adicione testes quando aplicável
3. Execute os testes: `npm test`
4. Garanta que o código passa no linter: `npm run lint`
5. Commit suas alterações: `git commit -m 'feat: adiciona nova funcionalidade'`
6. Push para a branch: `git push origin feature/minha-nova-feature`
7. Abra um Pull Request

## 💻 Estilo de Código

- Siga o estilo de código existente no projeto
- Use o ESLint para verificar seu código: `npm run lint`
- Escreva comentários JSDoc para todas as funções e classes
- Mantenha o código limpo e bem documentado
- Escreva testes para novas funcionalidades

## 🔄 Processo de Pull Request

1. Atualize sua branch com o upstream: `git pull upstream main`
2. Resolva quaisquer conflitos de merge
3. Certifique-se de que todos os testes passam: `npm test`
4. Certifique-se de que o código passa no linter: `npm run lint`
5. Abra um Pull Request com um título claro e descrição detalhada
6. Aguarde a revisão e feedback

## ⚙️ Configuração de Desenvolvimento

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (versão 6 ou superior)

### Instalação

```bash
# Clone seu fork
git clone https://github.com/seu-username/qubitsim.git

# Entre no diretório
cd qubitsim

# Instale as dependências
npm install

# Execute os testes
npm test
```

### Scripts Disponíveis

- `npm test` - Executa os testes
- `npm run lint` - Verifica o estilo de código
- `npm run docs` - Gera a documentação
- `npm run build` - Compila o código para distribuição

---

Agradecemos suas contribuições para tornar o QubitSim melhor! 🙏 