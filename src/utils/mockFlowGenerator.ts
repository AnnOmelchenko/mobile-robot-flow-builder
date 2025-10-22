import { FlowData, RobotGoal, RobotParams } from '../types/robot';

export const generateMockFlows = (
  goal: RobotGoal,
  params: RobotParams
): FlowData[] => {
  const flows: Record<RobotGoal, FlowData[]> = {
    navigation: [
      {
        id: 'nav-1',
        name: 'Basic Path Planning',
        description: 'Optimal route calculation using A* algorithm',
        nodes: [
          { id: '1', type: 'input', data: { label: 'Start Position' }, position: { x: 50, y: 50 } },
          { id: '2', data: { label: 'Obstacle Detection' }, position: { x: 50, y: 150 } },
          { id: '3', data: { label: 'A* Path Planning' }, position: { x: 50, y: 250 } },
          { id: '4', data: { label: 'Motion Control' }, position: { x: 50, y: 350 } },
          { id: '5', type: 'output', data: { label: 'Target Reached' }, position: { x: 50, y: 450 } },
        ],
        edges: [
          { id: 'e1-2', source: '1', target: '2', animated: true },
          { id: 'e2-3', source: '2', target: '3', animated: true },
          { id: 'e3-4', source: '3', target: '4', animated: true },
          { id: 'e4-5', source: '4', target: '5', animated: true },
        ],
        code: `class NavigationController:
    def __init__(self, speed=${params.speed}, sensor_range=${params.sensorRange}):
        self.speed = speed
        self.sensor_range = sensor_range
        self.path = []

    def plan_path(self, start, goal):
        # A* algorithm implementation
        open_set = [start]
        came_from = {}
        g_score = {start: 0}

        while open_set:
            current = min(open_set, key=lambda x: g_score.get(x, float('inf')))

            if current == goal:
                return self.reconstruct_path(came_from, current)

            open_set.remove(current)

            for neighbor in self.get_neighbors(current):
                tentative_g_score = g_score[current] + self.distance(current, neighbor)

                if tentative_g_score < g_score.get(neighbor, float('inf')):
                    came_from[neighbor] = current
                    g_score[neighbor] = tentative_g_score
                    if neighbor not in open_set:
                        open_set.append(neighbor)

        return None

    def execute(self, target_position):
        path = self.plan_path(self.current_position, target_position)
        for waypoint in path:
            self.move_to(waypoint)
        return True`,
      },
      {
        id: 'nav-2',
        name: 'Dynamic Obstacle Avoidance',
        description: 'Real-time path adjustment with sensor fusion',
        nodes: [
          { id: '1', type: 'input', data: { label: 'Navigation Start' }, position: { x: 50, y: 50 } },
          { id: '2', data: { label: 'Sensor Fusion' }, position: { x: 50, y: 150 } },
          { id: '3', data: { label: 'Dynamic Path Update' }, position: { x: 50, y: 250 } },
          { id: '4', data: { label: 'Velocity Controller' }, position: { x: 50, y: 350 } },
          { id: '5', type: 'output', data: { label: 'Safe Navigation' }, position: { x: 50, y: 450 } },
        ],
        edges: [
          { id: 'e1-2', source: '1', target: '2', animated: true },
          { id: 'e2-3', source: '2', target: '3', animated: true },
          { id: 'e3-4', source: '3', target: '4', animated: true },
          { id: 'e4-5', source: '4', target: '5', animated: true },
        ],
        code: `class DynamicNavigationController:
    def __init__(self, speed=${params.speed}, sensor_range=${params.sensorRange}):
        self.speed = speed
        self.sensor_range = sensor_range
        self.obstacles = []

    def update_sensors(self):
        # Lidar and camera fusion
        lidar_data = self.read_lidar()
        camera_data = self.read_camera()
        self.obstacles = self.fuse_sensor_data(lidar_data, camera_data)

    def compute_velocity(self, target):
        self.update_sensors()

        # Dynamic Window Approach
        velocities = self.generate_velocity_space()
        best_velocity = None
        best_score = float('-inf')

        for v in velocities:
            if self.is_safe_velocity(v):
                score = self.evaluate_velocity(v, target)
                if score > best_score:
                    best_score = score
                    best_velocity = v

        return best_velocity

    def navigate(self, target):
        while not self.reached(target):
            velocity = self.compute_velocity(target)
            self.apply_velocity(velocity)
            time.sleep(0.1)`,
      },
    ],
    'object-pickup': [
      {
        id: 'pickup-1',
        name: 'Vision-Based Grasping',
        description: 'Computer vision guided object manipulation',
        nodes: [
          { id: '1', type: 'input', data: { label: 'Detect Object' }, position: { x: 50, y: 50 } },
          { id: '2', data: { label: 'Object Recognition' }, position: { x: 50, y: 150 } },
          { id: '3', data: { label: 'Approach Planning' }, position: { x: 50, y: 250 } },
          { id: '4', data: { label: 'Grasp Execution' }, position: { x: 50, y: 350 } },
          { id: '5', type: 'output', data: { label: 'Object Secured' }, position: { x: 50, y: 450 } },
        ],
        edges: [
          { id: 'e1-2', source: '1', target: '2', animated: true },
          { id: 'e2-3', source: '2', target: '3', animated: true },
          { id: 'e3-4', source: '3', target: '4', animated: true },
          { id: 'e4-5', source: '4', target: '5', animated: true },
        ],
        code: `class VisionGraspController:
    def __init__(self, weight_capacity=${params.weight}):
        self.weight_capacity = weight_capacity
        self.camera = Camera()
        self.gripper = Gripper()

    def detect_objects(self):
        image = self.camera.capture()
        objects = self.run_object_detection(image)
        return objects

    def calculate_grasp_pose(self, object_info):
        # Calculate optimal grasp position and orientation
        pose = {
            'position': object_info['center'],
            'orientation': self.estimate_orientation(object_info),
            'grip_width': self.calculate_grip_width(object_info)
        }
        return pose

    def execute_pickup(self, object_target):
        objects = self.detect_objects()
        target = self.find_object(objects, object_target)

        if not target:
            return False

        grasp_pose = self.calculate_grasp_pose(target)
        self.move_to_pre_grasp(grasp_pose)
        self.approach_object(grasp_pose)
        self.gripper.close(grasp_pose['grip_width'])
        self.lift_object()

        return self.verify_grasp()`,
      },
    ],
    'area-surveillance': [
      {
        id: 'surv-1',
        name: 'Patrol Route Optimization',
        description: 'Efficient area coverage with anomaly detection',
        nodes: [
          { id: '1', type: 'input', data: { label: 'Define Area' }, position: { x: 50, y: 50 } },
          { id: '2', data: { label: 'Generate Coverage Path' }, position: { x: 50, y: 150 } },
          { id: '3', data: { label: 'Visual Monitoring' }, position: { x: 50, y: 250 } },
          { id: '4', data: { label: 'Anomaly Detection' }, position: { x: 50, y: 350 } },
          { id: '5', type: 'output', data: { label: 'Report Generated' }, position: { x: 50, y: 450 } },
        ],
        edges: [
          { id: 'e1-2', source: '1', target: '2', animated: true },
          { id: 'e2-3', source: '2', target: '3', animated: true },
          { id: 'e3-4', source: '3', target: '4', animated: true },
          { id: 'e4-5', source: '4', target: '5', animated: true },
          { id: 'e4-3', source: '4', target: '3', animated: true, label: 'continue' },
        ],
        code: `class SurveillanceController:
    def __init__(self, battery_capacity=${params.batteryCapacity}, sensor_range=${params.sensorRange}):
        self.battery_capacity = battery_capacity
        self.sensor_range = sensor_range
        self.anomalies = []

    def generate_patrol_path(self, area_bounds):
        # Boustrophedon path planning for complete coverage
        path = []
        x_min, y_min, x_max, y_max = area_bounds

        y = y_min
        direction = 1

        while y <= y_max:
            if direction == 1:
                path.append((x_min, y))
                path.append((x_max, y))
            else:
                path.append((x_max, y))
                path.append((x_min, y))

            y += self.sensor_range
            direction *= -1

        return path

    def monitor_area(self, area_bounds):
        path = self.generate_patrol_path(area_bounds)

        for waypoint in path:
            self.move_to(waypoint)
            image = self.capture_image()

            anomaly = self.detect_anomaly(image)
            if anomaly:
                self.anomalies.append({
                    'location': waypoint,
                    'timestamp': time.time(),
                    'type': anomaly['type'],
                    'confidence': anomaly['confidence']
                })

        return self.generate_report()`,
      },
    ],
    delivery: [
      {
        id: 'del-1',
        name: 'Multi-Stop Delivery Route',
        description: 'Optimized delivery sequence with package tracking',
        nodes: [
          { id: '1', type: 'input', data: { label: 'Load Packages' }, position: { x: 50, y: 50 } },
          { id: '2', data: { label: 'Route Optimization' }, position: { x: 50, y: 150 } },
          { id: '3', data: { label: 'Navigate to Stop' }, position: { x: 50, y: 250 } },
          { id: '4', data: { label: 'Deliver Package' }, position: { x: 50, y: 350 } },
          { id: '5', data: { label: 'More Stops?' }, position: { x: 50, y: 450 } },
          { id: '6', type: 'output', data: { label: 'Return to Base' }, position: { x: 50, y: 550 } },
        ],
        edges: [
          { id: 'e1-2', source: '1', target: '2', animated: true },
          { id: 'e2-3', source: '2', target: '3', animated: true },
          { id: 'e3-4', source: '3', target: '4', animated: true },
          { id: 'e4-5', source: '4', target: '5', animated: true },
          { id: 'e5-3', source: '5', target: '3', animated: true, label: 'yes' },
          { id: 'e5-6', source: '5', target: '6', animated: true, label: 'no' },
        ],
        code: `class DeliveryController:
    def __init__(self, speed=${params.speed}, weight_capacity=${params.weight}):
        self.speed = speed
        self.weight_capacity = weight_capacity
        self.packages = []

    def optimize_route(self, delivery_locations):
        # Traveling Salesman Problem solution
        # Using nearest neighbor heuristic
        route = [self.current_location]
        remaining = set(delivery_locations)

        while remaining:
            nearest = min(remaining,
                         key=lambda loc: self.distance(route[-1], loc))
            route.append(nearest)
            remaining.remove(nearest)

        return route

    def execute_deliveries(self, packages):
        self.packages = packages
        locations = [pkg['destination'] for pkg in packages]
        route = self.optimize_route(locations)

        for location in route:
            self.navigate_to(location)
            package = self.find_package_for_location(location)

            if self.deliver_package(package):
                self.mark_delivered(package)
                self.notify_recipient(package)
            else:
                self.log_delivery_failure(package)

        self.return_to_base()
        return self.generate_delivery_report()`,
      },
    ],
  };

  return flows[goal] || [];
};
