import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // AI API Route (Securely accessing Gemini Key on backend)
  app.post("/api/analyze-hook", async (req, res) => {
    try {
      const { youtubeUrl, textDescription } = req.body;
      
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: `Analisis konteks konten ini: ${youtubeUrl || textDescription}. Berikan 3 saran hook video pendek yang menarik (dalam bahasa Indonesia), maksimal 2 kalimat per saran.`
      });

      res.json({ result: response.text });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message || "Terjadi kesalahan pada AI" });
    }
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const { history } = req.body;
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const systemInstruction = "Kamu adalah asisten AI untuk 'Meo Studio', sebuah platform editing dan kliping video AI otomatis. Kamu ramah, profesional, dan selalu menggunakan Bahasa Indonesia. Tugasmu hanya membantu menjawab pertanyaan seputar penggunaan aplikasi, memberikan tips editing, dan bantuan umum. Kamu TIDAK BISA mengedit atau menggenerate video secara langsung. Jangan pernah berhalusinasi fitur yang tidak ada.";
      
      // Convert history to genai format
      // history format from client: [{ role: 'user' | 'ai', content: string }]
      // SDK format: [{ role: 'user' | 'model', parts: [{ text: string }] }]
      const formattedHistory = history.map((msg: any) => ({
        role: msg.role === 'ai' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      // Pop the last user message to send as current message, rest as history
      const lastMessage = formattedHistory.pop();

      const chat = ai.chats.create({
        model: 'gemini-3.5-flash',
        config: {
          systemInstruction
        },
        history: formattedHistory
      });
      
      const response = await chat.sendMessage({
        message: lastMessage.parts[0].text
      });
      
      res.json({ result: response.text });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message || "Terjadi kesalahan pada AI" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
