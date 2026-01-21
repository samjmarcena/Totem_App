
import { GoogleGenAI } from "@google/genai";
import { Project, AwardType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function askProjectAssistant(query: string, projects: Project[]) {
  const context = projects.map(p => 
    `Project: ${p.title}
     Category: ${p.category}
     Semester: ${p.year}.${p.semester}
     Advisor: ${p.advisor}
     Award: ${p.awardType !== AwardType.NONE ? p.awardType : 'No special award'}
     Summary: ${p.longDescription}`
  ).join('\n\n');

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a helpful Capstone Project Assistant at a university. Use the following context about student projects to answer questions concisely for totem visitors. Use the semester notation YEAR.SEM (e.g. 2024.1) when referring to dates.
      
      CONTEXT:
      ${context}
      
      QUESTION:
      ${query}`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 250,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I'm having trouble connecting to my brain right now. Please try again or explore the projects manually.";
  }
}
