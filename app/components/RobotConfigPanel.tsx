"use client";

import { useRobot } from "../context/RobotContext";
import {
  Paper,
  Title,
  ActionIcon,
  Slider,
  Select,
  Checkbox,
  TextInput,
  NumberInput,
  Stack,
  Group,
  Text,
  Divider,
  Box,
  ScrollArea,
  ThemeIcon,
  Card,
  Badge,
  Transition,
  Container,
} from "@mantine/core";
import {
  IconBattery,
  IconBatteryCharging,
  IconMapPin,
  IconCpu,
  IconWorld,
  IconX,
  IconSettings,
  IconBox,
  IconHandGrab,
} from "@tabler/icons-react";

export default function RobotConfigPanel() {
  const { robotState, locations, updateRobotState, updateLocation } =
    useRobot();

  const batteryColor =
    robotState.batteryLevel < 20
      ? "red"
      : robotState.batteryLevel < 50
      ? "yellow"
      : "green";

  return (
    <Container>
      <Paper
        shadow="xl"
        radius="lg"
        withBorder
        style={{
          position: "fixed",
          left: 20,
          top: 20,
          width: 340,
          zIndex: 40,
          display: "flex",
          flexDirection: "column",
          backdropFilter: "blur(10px)",
          backgroundColor: "var(--mantine-color-body-alpha-9)",
        }}
      >
        <Box
          p="xs"
          style={{
            borderBottom: "1px solid var(--mantine-color-default-border)",
          }}
        >
          <Group justify="space-between" align="center">
            <Group gap="xs">
              <ThemeIcon variant="light" size="lg" radius="md" color="blue">
                <IconSettings size={20} />
              </ThemeIcon>
              <Title order={3} size="h5" fw={700}>
                Robot Control
              </Title>
            </Group>
            <ActionIcon variant="subtle" color="gray" size="lg">
              <IconX size={20} />
            </ActionIcon>
          </Group>
        </Box>

        <ScrollArea style={{ flex: 1 }} p="md" type="auto" offsetScrollbars>
          <Stack gap="md">
            <Card
              withBorder
              radius="md"
              padding="sm"
              bg="var(--mantine-color-default-hover)"
            >
              <Group justify="space-between" mb="xs">
                <Group gap="xs">
                  <ThemeIcon
                    variant="light"
                    color={batteryColor}
                    size="sm"
                    radius="xl"
                  >
                    {robotState.isCharging ? (
                      <IconBatteryCharging size={14} />
                    ) : (
                      <IconBattery size={14} />
                    )}
                  </ThemeIcon>
                  <Text size="sm" fw={600}>
                    Battery Level
                  </Text>
                </Group>
                <Badge color={batteryColor} variant="light">
                  {robotState.batteryLevel}%
                </Badge>
              </Group>
              <Slider
                value={robotState.batteryLevel}
                onChange={(value) => updateRobotState({ batteryLevel: value })}
                min={0}
                max={100}
                color={batteryColor}
                size="sm"
                thumbSize={16}
                styles={{
                  track: { backgroundColor: "var(--mantine-color-gray-2)" },
                }}
              />
            </Card>

            <Box>
              <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb="sm">
                Status & Location
              </Text>
              <Stack gap="sm">
                <Select
                  leftSection={<IconMapPin size={16} />}
                  label="Current Location"
                  value={robotState.currentLocationId}
                  onChange={(value) =>
                    value && updateRobotState({ currentLocationId: value })
                  }
                  data={locations.map((loc) => ({
                    value: loc.id,
                    label: loc.name,
                  }))}
                  checkIconPosition="right"
                  variant="filled"
                />
                <Checkbox
                  label="Charging Mode"
                  checked={robotState.isCharging}
                  onChange={(e) =>
                    updateRobotState({
                      isCharging: e.currentTarget.checked,
                    })
                  }
                  wrapperProps={{
                    style: {
                      padding: "10px",
                      borderRadius: "var(--mantine-radius-md)",
                      border: "1px solid var(--mantine-color-default-border)",
                      backgroundColor: robotState.isCharging
                        ? "var(--mantine-color-blue-light)"
                        : "transparent",
                      transition: "background-color 0.2s ease",
                    },
                  }}
                />
              </Stack>
              <Stack gap="sm">
                <TextInput
                  leftSection={<IconHandGrab size={16} />}
                  label="Carrying Object"
                  placeholder="Hands free"
                  value={robotState.carryingObject || ""}
                  onChange={(e) =>
                    updateRobotState({
                      carryingObject: e.currentTarget.value || null,
                    })
                  }
                  variant="filled"
                />
              </Stack>
            </Box>

            <Divider />

            <Box>
              <Group gap="xs" mb="sm">
                <IconWorld size={16} style={{ opacity: 0.7 }} />
                <Text size="xs" fw={700} c="dimmed" tt="uppercase">
                  World Map
                </Text>
              </Group>
              <Stack gap="sm">
                {locations.map((loc) => (
                  <Card
                    key={loc.id}
                    withBorder
                    padding="sm"
                    radius="md"
                    bg="transparent"
                  >
                    <Group justify="space-between" mb="xs">
                      <Text size="sm" fw={600}>
                        {loc.name}
                      </Text>
                      <Badge size="xs" variant="outline" color="gray">
                        ID: {loc.id}
                      </Badge>
                    </Group>
                    <Group grow>
                      <NumberInput
                        leftSection={
                          <Text size="xs" c="dimmed">
                            X
                          </Text>
                        }
                        size="xs"
                        value={loc.coordinates.x}
                        onChange={(value) =>
                          updateLocation(loc.id, {
                            coordinates: {
                              ...loc.coordinates,
                              x: Number(value),
                            },
                          })
                        }
                        step={0.1}
                        min={0}
                        max={100}
                      />
                      <NumberInput
                        leftSection={
                          <Text size="xs" c="dimmed">
                            Y
                          </Text>
                        }
                        size="xs"
                        value={loc.coordinates.y}
                        onChange={(value) =>
                          updateLocation(loc.id, {
                            coordinates: {
                              ...loc.coordinates,
                              y: Number(value),
                            },
                          })
                        }
                        step={0.1}
                        min={0}
                        max={100}
                      />
                    </Group>
                  </Card>
                ))}
              </Stack>
            </Box>
          </Stack>
        </ScrollArea>
      </Paper>
    </Container>
  );
}
