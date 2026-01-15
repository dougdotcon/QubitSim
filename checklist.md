# 🔬 Checklist de Revisão e Correção - QubitSim

## 📊 **STATUS: EM PROGRESSO** 🔄

**Próximo Marco:** Otimização Product State e Documentação Final.

---

## 🎯 **PRIORIDADES IMEDIATAS**

### **FASE 1: ALGORITMOS AVANÇADOS (CONCLUÍDA)** ✅

- [x] **Bernstein-Vazirani**: Implementar oráculo correto e testes.
- [x] **QFT**: Transformada de Fourier Quântica completa e autônoma.
- [x] **Shor**: Refinar period finding (Correção de ModExp e QFT Inversa).
- [x] **Grover**: Implementação e correção do Oráculo.
- [x] **Deutsch-Jozsa**: Algoritmo completo e testado.

### **FASE 2: INTERFACE E VISUALIZAÇÃO (CONCLUÍDA)** ✅

- [x] AuditComponentes React e remoção de código legado.
- [x] Correção de visualizadores (BV, Grover).
- [x] Integração de Física Unificada (Esfera de Bloch com Entropia).
- [x] Visualização de Ruído Entrópico em Tempo Real.

### **FASE 3: QUALIDADE E OTIMIZAÇÃO (EM ANDAMENTO)** 🚧

- [x] Configuração do Jest e Cobertura.
- [x] **Cobertura de Testes**: Atingir > 80% (Qubit, QuantumRegister, Algorithms).
- [x] **Correções Críticas**: Tratamento de índices negativos e validação de parâmetros.
- [ ] ⚠️ **RELEASE**: Otimização "Product State" (Para evitar explosão exponencial).

---

## 📅 **BACKLOG DE DESENVOLVIMENTO**

### **FÍSICA UNIFICADA (TOE)**

- [x] Implementar constante Ω (117.038).
- [x] Simular flutuações de vácuo entrópicas.
- [x] Otimizador Entrópico "Holográfico".
- [x] Integração com classes `Qubit` e `QuantumRegister`.

### **INFRAESTRUTURA**

- [x] Correção de `generateKey.js` (RNG).
- [x] Implementação de Protocolo BB84 (Criptografia Quântica).
- [ ] Dockerização completa (Opcional).

### **DOCUMENTAÇÃO**

- [x] Atualizar `checklist.md`.
- [x] Atualizar `README.md` com conceitos de Física Unificada.
