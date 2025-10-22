import { useState } from 'react';
import { RobotParams, RobotGoal, FlowData } from './types/robot';
import { generateMockFlows } from './utils/mockFlowGenerator';
import RobotParamsForm from './components/RobotParamsForm';
import GoalSelector from './components/GoalSelector';
import FlowViewer from './components/FlowViewer';
import { Bot, Loader2, Zap } from 'lucide-react';

function App() {
  const [params, setParams] = useState<RobotParams>({
    speed: 2.0,
    weight: 10.0,
    batteryCapacity: 5000,
    sensorRange: 5.0,
  });

  const [selectedGoal, setSelectedGoal] = useState<RobotGoal | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedFlows, setGeneratedFlows] = useState<FlowData[]>([]);

  const handleGenerate = () => {
    if (!selectedGoal) return;

    setIsGenerating(true);
    setGeneratedFlows([]);

    setTimeout(() => {
      const flows = generateMockFlows(selectedGoal, params);
      setGeneratedFlows(flows);
      setIsGenerating(false);
    }, 2500);
  };

  const canGenerate = selectedGoal !== null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Bot className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Robot Flow Builder</h1>
              <p className="text-sm text-slate-600">
                Configure parameters and generate optimal control flows
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1800px] mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <RobotParamsForm params={params} onChange={setParams} />
          </div>

          <div className="col-span-6 flex flex-col items-center justify-start">
            <div className="w-full max-w-md">
              <button
                onClick={handleGenerate}
                disabled={!canGenerate || isGenerating}
                className={`w-full py-4 rounded-lg font-semibold text-white text-lg transition-all transform ${
                  canGenerate && !isGenerating
                    ? 'bg-blue-500 hover:bg-blue-600 hover:scale-105 shadow-lg hover:shadow-xl'
                    : 'bg-slate-300 cursor-not-allowed'
                }`}
              >
                {isGenerating ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin" size={24} />
                    Generating Flows...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Zap size={24} />
                    Start Generation
                  </span>
                )}
              </button>

              {!canGenerate && (
                <p className="text-center text-sm text-slate-500 mt-3">
                  Select a goal to begin
                </p>
              )}
            </div>

            {isGenerating && (
              <div className="mt-12 text-center">
                <div className="inline-flex items-center gap-3 bg-white px-6 py-4 rounded-lg shadow-md border border-slate-200">
                  <Loader2 className="animate-spin text-blue-500" size={24} />
                  <div className="text-left">
                    <p className="font-medium text-slate-900">Processing Request</p>
                    <p className="text-sm text-slate-600">Analyzing parameters and optimizing flows</p>
                  </div>
                </div>
              </div>
            )}

            {generatedFlows.length > 0 && !isGenerating && (
              <div className="mt-8 w-full space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <h2 className="text-xl font-semibold text-slate-900">
                      Generated Flow Solutions
                    </h2>
                  </div>
                  <p className="text-sm text-slate-600">
                    {generatedFlows.length} optimal flow{generatedFlows.length > 1 ? 's' : ''} generated
                    for your configuration
                  </p>
                </div>

                {generatedFlows.map((flow) => (
                  <FlowViewer key={flow.id} flow={flow} />
                ))}
              </div>
            )}
          </div>

          <div className="col-span-3">
            <GoalSelector selectedGoal={selectedGoal} onChange={setSelectedGoal} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
