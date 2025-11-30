export interface Coordinates {
  x: number;
  y: number;
  theta?: number;
}

export interface Location {
  id: string;
  name: string;
  coordinates: Coordinates;
}

export interface RobotState {
  batteryLevel: number;
  currentLocationId: string;
  isCharging: boolean;
  carryingObject: string | null;
  detectedObject: string | null;
}

export interface RobotConfig {
  locations: Location[];
  initialState: RobotState;
}

export enum RobotAction {
  // Navigation
  NAVIGATE_TO = "navigate_to",
  MOVE_FORWARD = "move_forward",
  MOVE_BACKWARD = "move_backward",
  ROTATE = "rotate",
  STOP = "stop",

  // Power Management
  CHARGE = "charge",
  GO_TO_DOCK = "go_to_dock",

  // Object Interaction
  PICK_UP = "pick_up",
  DROP = "drop",
  SCAN_OBJECT = "scan_object",

  DETECT_OBJECT = "detect_object",
  SCAN_ENVIRONMENT = "scan_environment",

  // Communication
  SAY = "say",
  PLAY_SOUND = "play_sound",
  DISPLAY_MESSAGE = "display_message",

  // Conditional/Control
  WAIT = "wait",
  CHECK_BATTERY = "check_battery",
  CHECK_LOCATION = "check_location",
}

export type ActionParams =
  | NavigateToParams
  | MoveParams
  | RotateParams
  | ChargeParams
  | ObjectParams
  | SayParams
  | WaitParams
  | CheckParams
  | EmptyParams;

export interface NavigateToParams {
  target: string;
}

export interface MoveParams {
  distance: number;
  speed?: number;
}

export interface RotateParams {
  angle: number;
  direction?: "left" | "right" | "clockwise" | "counterclockwise";
}

export interface ChargeParams {
  targetLevel: number;
}

export interface ObjectParams {
  objectName?: string;
  objectType?: string;
}

export interface SayParams {
  text: string;
  language?: string;
}

export interface WaitParams {
  duration: number;
}

export interface CheckParams {
  condition: string;
  threshold?: number;
}

export interface EmptyParams {}

export interface ActionStep {
  id: string;
  type: "action" | "decision";
  action?: RobotAction;
  condition?: string;
  params: ActionParams;
  next: string | null;
  true?: string;
  false?: string;
}

export interface RobotPlan {
  start: string;
  steps: ActionStep[];
}

export const DEFAULT_LOCATIONS: Location[] = [
  { id: "dock", name: "Dock", coordinates: { x: 0, y: 0 } },
  { id: "kitchen", name: "Kitchen", coordinates: { x: 2.5, y: 1.0 } },
  { id: "living_room", name: "Living Room", coordinates: { x: -1.5, y: 3.0 } },
  { id: "bedroom", name: "Bedroom", coordinates: { x: 3.0, y: -2.0 } },
];

export const DEFAULT_ROBOT_STATE: RobotState = {
  batteryLevel: 100,
  currentLocationId: "dock",
  isCharging: true,
  carryingObject: null,
  detectedObject: null,
};
