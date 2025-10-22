import { RobotGoal } from '../types/robot';
import { Navigation, Package, Eye, Truck } from 'lucide-react';

interface GoalSelectorProps {
  selectedGoal: RobotGoal | null;
  onChange: (goal: RobotGoal) => void;
}

const goals: { value: RobotGoal; label: string; icon: any; description: string }[] = [
  {
    value: 'navigation',
    label: 'Navigation',
    icon: Navigation,
    description: 'Path planning and obstacle avoidance',
  },
  {
    value: 'object-pickup',
    label: 'Object Pickup',
    icon: Package,
    description: 'Vision-based object manipulation',
  },
  {
    value: 'area-surveillance',
    label: 'Area Surveillance',
    icon: Eye,
    description: 'Autonomous patrol and monitoring',
  },
  {
    value: 'delivery',
    label: 'Delivery',
    icon: Truck,
    description: 'Multi-stop package delivery',
  },
];

export default function GoalSelector({ selectedGoal, onChange }: GoalSelectorProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <h2 className="text-xl font-semibold text-slate-900 mb-6">Select Robot Goal</h2>

      <div className="space-y-3">
        {goals.map((goal) => {
          const Icon = goal.icon;
          const isSelected = selectedGoal === goal.value;

          return (
            <button
              key={goal.value}
              onClick={() => onChange(goal.value)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                isSelected
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    isSelected ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Icon size={20} />
                </div>
                <div className="flex-1">
                  <h3
                    className={`font-medium ${
                      isSelected ? 'text-blue-900' : 'text-slate-900'
                    }`}
                  >
                    {goal.label}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">{goal.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selectedGoal && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900 font-medium">
            Goal Selected: {goals.find((g) => g.value === selectedGoal)?.label}
          </p>
        </div>
      )}
    </div>
  );
}
