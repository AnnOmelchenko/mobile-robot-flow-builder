import { RobotParams } from '../types/robot';

interface RobotParamsFormProps {
  params: RobotParams;
  onChange: (params: RobotParams) => void;
}

export default function RobotParamsForm({ params, onChange }: RobotParamsFormProps) {
  const handleChange = (field: keyof RobotParams, value: number) => {
    onChange({ ...params, [field]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <h2 className="text-xl font-semibold text-slate-900 mb-6">Robot Parameters</h2>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Speed (m/s)
          </label>
          <input
            type="number"
            step="0.1"
            value={params.speed}
            onChange={(e) => handleChange('speed', parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
          <p className="mt-1 text-xs text-slate-500">Maximum robot velocity</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Weight Capacity (kg)
          </label>
          <input
            type="number"
            step="1"
            value={params.weight}
            onChange={(e) => handleChange('weight', parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
          <p className="mt-1 text-xs text-slate-500">Maximum payload capacity</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Battery Capacity (Wh)
          </label>
          <input
            type="number"
            step="100"
            value={params.batteryCapacity}
            onChange={(e) => handleChange('batteryCapacity', parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
          <p className="mt-1 text-xs text-slate-500">Battery energy capacity</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Sensor Range (m)
          </label>
          <input
            type="number"
            step="0.5"
            value={params.sensorRange}
            onChange={(e) => handleChange('sensorRange', parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
          <p className="mt-1 text-xs text-slate-500">Detection range radius</p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-slate-50 rounded-lg">
        <h3 className="text-sm font-medium text-slate-900 mb-2">Configuration Summary</h3>
        <div className="text-xs text-slate-600 space-y-1">
          <p>Robot configured with {params.speed} m/s speed</p>
          <p>Capable of handling {params.weight} kg payload</p>
          <p>Operating range based on {params.batteryCapacity} Wh battery</p>
        </div>
      </div>
    </div>
  );
}
