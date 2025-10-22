export interface RobotParams {
  speed: number;
  weight: number;
  batteryCapacity: number;
  sensorRange: number;
}

export interface FlowData {
  id: string;
  name: string;
  description: string;
  nodes: any[];
  edges: any[];
  code: string;
}

export type RobotGoal =
  | 'navigation'
  | 'object-pickup'
  | 'area-surveillance'
  | 'delivery';
