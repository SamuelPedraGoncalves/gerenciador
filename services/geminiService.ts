import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. Ajuste da Chave: O Vite exige o 'import.meta.env'
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// 2. Inicialização correta do cliente
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateCourseDescription = async (courseName: string) => {
  try {
    // 3. No SDK oficial, primeiro pegamos o modelo
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Gere uma descrição profissional e motivadora de até 3 frases para um curso chamado "${courseName}".`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    // 4. O texto é um método .text()
    return response.text() || "Sem descrição disponível.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Erro ao gerar descrição automática.";
  }
};

export const summarizePatientCase = async (patientName: string, notes: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Resuma brevemente o caso clínico do paciente ${patientName} baseado nestas notas: "${notes}". Foco em pontos chave para o analista.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return response.text() || "Sem resumo disponível.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Erro ao processar resumo.";
  }
};