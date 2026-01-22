import * as GoogleGenAI from "@google/genai";
import { Project, AwardType } from "../types";

// Usando a chave que o seu vite.config.ts configurou
const genAI = new GoogleGenAI.GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function askProjectAssistant(query: string, projects: Project[]) {
  const context = projects.map(p => 
    `Project: ${p.title} | Category: ${p.category} | Summary: ${p.longDescription}`
  ).join('\n\n');

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Você é um assistente de projetos. Use o contexto para responder em Português.\n\nCONTEXTO:\n${context}\n\nPERGUNTA: ${query}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Erro Gemini:", error);
    return "Erro ao conectar com a IA.";
  }
}