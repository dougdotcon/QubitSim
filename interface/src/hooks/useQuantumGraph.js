import { useState, useCallback } from 'react';

export function useQuantumGraph() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  // Adicionar um novo qubit
  const addQubit = useCallback((position) => {
    const newNode = {
      id: `qubit-${nodes.length + 1}`,
      type: 'qubit',
      position,
      data: {
        label: `Q${nodes.length + 1}`,
        state: '|0⟩',
      },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [nodes.length]);

  // Adicionar uma porta quântica
  const addGate = useCallback((gate, position) => {
    const newNode = {
      id: `gate-${nodes.length + 1}`,
      type: 'gate',
      position,
      data: {
        gate: gate.symbol,
        label: gate.label,
      },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [nodes.length]);

  // Remover um nó
  const removeNode = useCallback((nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => 
      edge.source !== nodeId && edge.target !== nodeId
    ));
  }, []);

  // Conectar nós
  const connectNodes = useCallback((sourceId, targetId) => {
    const newEdge = {
      id: `edge-${edges.length + 1}`,
      source: sourceId,
      target: targetId,
      animated: true,
    };
    setEdges((eds) => [...eds, newEdge]);
  }, [edges.length]);

  // Atualizar estado do qubit
  const updateQubitState = useCallback((qubitId, newState) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === qubitId
          ? { ...node, data: { ...node.data, state: newState } }
          : node
      )
    );
  }, []);

  // Simular circuito
  const simulateCircuit = useCallback(async () => {
    // Aqui será implementada a lógica de simulação
    // que se conectará com a biblioteca principal
    console.log('Simulando circuito...');
  }, []);

  return {
    nodes,
    edges,
    selectedNode,
    setSelectedNode,
    addQubit,
    addGate,
    removeNode,
    connectNodes,
    updateQubitState,
    simulateCircuit,
  };
} 