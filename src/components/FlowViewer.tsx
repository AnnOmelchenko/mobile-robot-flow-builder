import { useCallback, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { FlowData } from '../types/robot';
import { Code } from 'lucide-react';
import CodeEditor from './CodeEditor';

interface FlowViewerProps {
  flow: FlowData;
}

export default function FlowViewer({ flow }: FlowViewerProps) {
  const [nodes, , onNodesChange] = useNodesState(flow.nodes);
  const [edges, , onEdgesChange] = useEdgesState(flow.edges);
  const [showCode, setShowCode] = useState(false);

  const onConnect = useCallback(() => {}, []);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-200">
        <h3 className="font-semibold text-slate-900">{flow.name}</h3>
        <p className="text-sm text-slate-600 mt-1">{flow.description}</p>
      </div>

      <div className="h-[400px] relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          attributionPosition="bottom-right"
        >
          <Background />
          <Controls />
          <MiniMap />
          <Panel position="top-right">
            <button
              onClick={() => setShowCode(!showCode)}
              className="bg-white px-4 py-2 rounded-lg border border-slate-300 shadow-sm hover:bg-slate-50 transition flex items-center gap-2 text-sm font-medium text-slate-700"
            >
              <Code size={16} />
              {showCode ? 'Hide Code' : 'Apply'}
            </button>
          </Panel>
        </ReactFlow>
      </div>

      {showCode && (
        <div className="border-t border-slate-200">
          <CodeEditor code={flow.code} />
        </div>
      )}
    </div>
  );
}
