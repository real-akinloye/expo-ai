
import { GoogleGenAI } from "@google/genai";

const MODEL_NAME = 'gemini-2.5-flash';

// FIX: Switched from `import.meta.env.VITE_API_KEY` to `process.env.API_KEY` to align with Gemini API coding guidelines.
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateAnswer(question: string, resumeText?: string): Promise<string> {
  let systemInstruction = `You are an expert interview assistant named Co-Pilot. Your goal is to help the user ace their job interview.
When you receive an interview question, provide a concise, professional, and well-structured answer.
Format your answer clearly with bullet points or short paragraphs for easy reading.
Where appropriate, structure your answer using the STAR method (Situation, Task, Action, Result).
Keep your response focused and directly answer the question. Avoid conversational fluff.
Start the answer directly without any preamble like 'Sure, here is an answer...' or 'That's a great question.'.`;

  if (resumeText) {
    systemInstruction += `

---
IMPORTANT: Personalize the answer based on the user's resume provided below. Whenever possible, connect the answer to the skills, experiences, and projects listed in the resume.

USER'S RESUME:
${resumeText}
---`;
  }

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: question,
      config: {
        systemInstruction,
        temperature: 0.7,
        topP: 0.95,
        topK: 64,
        thinkingConfig: { thinkingBudget: 0 },
      },
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating content from Gemini:", error);
    throw new Error("Could not get a response from the AI. Please check the console for details.");
  }
}