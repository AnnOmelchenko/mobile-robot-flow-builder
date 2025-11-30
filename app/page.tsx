"use client";

import { useState } from "react";
import {
  Container,
  Title,
  Textarea,
  Button,
  Paper,
  Code,
  Stack,
  Box,
  LoadingOverlay,
} from "@mantine/core";
import RobotConfigPanel from "./components/RobotConfigPanel";
import TextType from "./components/TextType";

export default function Home() {
  const [prompt, setPrompt] = useState(
    "Go to the kitchen, but if battery is low, charge first."
  );
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.error) {
        setResponse("Error: " + data.error);
      } else {
        setResponse(data.response);
      }
    } catch (err) {
      setResponse("Error: " + String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p="xl">
      <RobotConfigPanel />
      <Container size="sm" ml={340}>
        <Stack gap="lg">
          <Box>
            <TextType
              text="Welcome to the AI mobile robot flow builder!"
              className="text-2xl font-semibold text-center"
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
            />
          </Box>

          <Paper withBorder p="md" radius="md" pos="relative">
            <LoadingOverlay
              visible={loading}
              overlayProps={{ radius: "sm", blur: 2 }}
            />
            <Stack gap="md">
              <Textarea
                label="Instruction"
                placeholder="Enter instruction..."
                value={prompt}
                onChange={(e) => setPrompt(e.currentTarget.value)}
                minRows={4}
                autosize
              />
              <Button onClick={handleSubmit} loading={loading}>
                Generate Plan
              </Button>
            </Stack>
          </Paper>

          {response && (
            <Paper
              withBorder
              p="md"
              radius="md"
              bg="var(--mantine-color-gray-0)"
            >
              <Title order={3} size="h4" mb="xs">
                Model Output:
              </Title>
              <Code block style={{ whiteSpace: "pre-wrap" }}>
                {response}
              </Code>
            </Paper>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
