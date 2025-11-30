import { NextRequest, NextResponse } from "next/server";
import { getLlama, LlamaChatSession } from "node-llama-cpp";
import path from "node:path";

const MODEL_PATH = path.join(
  process.cwd(),
  "phi3miniGGUF",
  "phi-3-mini-4k-instruct.Q4_K_M.gguf"
);

let cachedModel: any = null;

async function getModel() {
  if (cachedModel) return cachedModel;

  const llama = await getLlama();
  cachedModel = await llama.loadModel({
    modelPath: MODEL_PATH,
  });
  return cachedModel;
}

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const model = await getModel();

    const context = await model.createContext();
    const session = new LlamaChatSession({
      contextSequence: context.getSequence(),
    });

    const systemMessage = `You are a robot planning assistant. You MUST output a valid JSON plan.
The plan must have a "start" node ID and a list of "steps".
Each step has an "id", "type" (action or decision), "cmd", "params", and "next" (or "true"/"false" for decisions).

Example:
{"start":"1","steps":[{"id":"1","type":"action","cmd":"navigate_to","params":{"target":"Kitchen"},"next":null}]}`;

    const userMessage = `Create a robot action plan for: ${prompt}

Output ONLY the JSON plan, nothing else.`;

    await session.prompt(systemMessage, {
      maxTokens: 1,
    });

    const response = await session.prompt(userMessage, {
      maxTokens: 1024,
      temperature: 0.3,
      topP: 0.9,
      topK: 40,
      repeatPenalty: {
        penalty: 1.15,
        frequencyPenalty: 0.1,
        presencePenalty: 0.1,
        lastTokens: 64,
      },
    });

    await context.dispose();

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error generating response:", error);
    return NextResponse.json(
      {
        error: `Failed to generate response: ${
          error instanceof Error ? error.message : String(error)
        }`,
      },
      { status: 500 }
    );
  }
}
