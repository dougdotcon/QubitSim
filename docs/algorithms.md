# Algoritmos Quânticos Implementados

## Algoritmo de Deutsch-Jozsa
O algoritmo de Deutsch-Jozsa é um dos primeiros exemplos de um algoritmo quântico que demonstra uma vantagem exponencial sobre algoritmos clássicos. Ele determina se uma função é constante (retorna o mesmo valor para todas as entradas) ou balanceada (retorna 0 para metade das entradas e 1 para a outra metade).

### Implementação
- Utiliza um registro quântico com n+1 qubits
- Aplica portas Hadamard em todos os qubits
- Implementa um oráculo que codifica a função
- Aplica portas Hadamard novamente
- Mede os qubits para determinar o resultado

## Algoritmo de Grover
O algoritmo de Grover é um algoritmo de busca quântica que oferece uma aceleração quadrática sobre algoritmos clássicos para busca não estruturada.

### Implementação
- Utiliza um registro quântico com n qubits
- Aplica uma superposição uniforme usando portas Hadamard
- Implementa um oráculo que marca o estado alvo
- Aplica a difusão de Grover
- Repete os passos do oráculo e difusão O(√N) vezes

## Algoritmo de Shor
O algoritmo de Shor é um algoritmo quântico para fatoração de números inteiros, que tem implicações significativas para a criptografia.

### Implementação
- Utiliza dois registros quânticos
- Implementa a transformada de Fourier quântica
- Aplica operações modulares
- Realiza medições para encontrar os fatores

## Algoritmo de Bernstein-Vazirani
O algoritmo de Bernstein-Vazirani é um algoritmo quântico que demonstra uma vantagem exponencial sobre algoritmos clássicos para encontrar uma string oculta em uma função linear.

### Implementação
- Utiliza um registro quântico com n+1 qubits
- Aplica portas Hadamard em todos os qubits
- Implementa um oráculo que codifica a função linear
- Aplica portas Hadamard novamente
- Mede os qubits para determinar a string oculta

### Detalhes Técnicos
- A função é da forma f(x) = a·x ⊕ b, onde:
  - a é a string oculta que queremos encontrar
  - b é um bit de paridade
  - ⊕ denota adição módulo 2
- O algoritmo requer apenas uma consulta ao oráculo, enquanto um algoritmo clássico precisaria de n consultas
- A complexidade é O(1) para o algoritmo quântico, comparada a O(n) para o clássico 