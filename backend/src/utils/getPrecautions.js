import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

function buildPrompt(classLetter, classResult, riverName) {
  const failLines = classResult.failures
    .map((f) => `- ${f.parameter}: actual value ${f.value}, required ${f.limit}`)
    .join("\n");

  return `You are a water quality expert. A water sample from ${riverName} was tested for use as ${classResult.label}.

Result: FAIL
Failing parameters:
${failLines}

Respond in exactly 4 short sections with these exact headings:

## Is it Safe?
One sentence: yes or no and why.

## Health Risks
Maximum 3 bullet points. Each bullet max 10 words.

## Precautions
Maximum 3 bullet points. Each bullet max 12 words.

## Treatment Options
Maximum 3 bullet points. Each bullet max 12 words.

Be concise. No extra explanation. No introductory sentences.`;
}

export async function getPrecautions(classLetter, classResult, riverName) {
  if (classResult.pass) return null;

  try {
    const prompt = buildPrompt(classLetter, classResult, riverName);
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
    });
    return completion.choices[0]?.message?.content || null;
  } catch (error) {
    console.error("Groq API error:", error.message);
    return null;
  }
}
