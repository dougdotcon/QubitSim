import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';

// Tipos de nós personalizados
const nodeTypes = {
  qubit: QuantumNode,
  gate: GateNode,
};

// Componente de nó quântico
function QuantumNode({ data }) {
  return (
    <div className="quantum-node">
      <div className="node-content">
        <div className="node-label">{data.label}</div>
        <div className="node-state">{data.state}</div>
      </div>
    </div>
  );
}

// Componente de porta quântica
function GateNode({ data }) {
  return (
    <div className="gate-node">
      <div className="node-content">
        <div className="gate-symbol">{data.gate}</div>
      </div>
    </div>
  );
}

// Componente principal do grafo
export default function QuantumGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
} 