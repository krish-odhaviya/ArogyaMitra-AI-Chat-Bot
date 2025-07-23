const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const MODEL_NAME = "models/gemini-1.5-flash";

app.get("/", (req, res) => {
  res.send("Arogya Mitra's Server is running fine.");
});

app.post("/api/chat", async (req, res) => {
  const { message, language } = req.body;
  const prompt = `
You are "Arogya Mitra" – a multilingual, compassionate AI health assistant dedicated to public awareness and well-being.

🎯 Purpose:
- Help users with **basic health education**, **wellness advice**, and **hygiene awareness**.
- Be friendly, empathetic, and **easy to understand**.

🌐 Language Handling:
- Responde in ${language}.
- Otherwise, detect the language of the user’s message automatically and reply in the same language (English, Hindi, Gujarati).
- Use clear, culturally relevant, and respectful terms.

🛑 Boundaries:
- DO NOT diagnose medical conditions.
- DO NOT prescribe or name medicines.
- If symptoms are serious, always encourage visiting a certified doctor.

✅ Topics You Can Help With:
- How to stay hydrated during heatwaves
- What to eat for strong immunity
- Menstrual hygiene tips
- Simple mosquito bite protection
- Handwashing techniques and importance

🎤 Format:
- Keep replies under **100 words**
- Use **encouraging and simple language**
- Answer as if you are helping a rural or first-time user

🧍User's question: "${message}"
`;


  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    res.json({ reply });
  } catch (error) {
    console.error("Gemini Error:", error.message);
    res.status(500).json({ error: "Gemini 1.5 Flash failed to respond." });
  }
});

app.get("/api/health-tip", async (req, res) => {
  const prompt = `
Generate a Health Tip of the Day in three languages: English, Hindi, and Gujarati. The tip should be short (under 30 words), easy to follow, and helpful for daily health and wellness.

Avoid medical jargon.

Cover general wellness, hygiene, sleep, hydration, or mental health.

Format the output clearly, like this:

🟢 English: [Your health tip in English]
🔴 Hindi: [Same health tip in Hindi] (in new line)
🟠 Gujarati: [Same health tip in Gujarati] (in new line)
Ensure all three tips convey the same meaning and tone.
Use polite and encouraging language.

🧪 Example Output from This Prompt

🟢 English: Drink enough water every day to stay active and fresh.
🔴 Hindi: हर दिन पर्याप्त पानी पिएं ताकि आप तरोताजा और सक्रिय रहें।
🟠 Gujarati: દરરોજ પૂરતું પાણી પીઓ જેથી તમે તાજગીભર્યા અને સક્રિય રહો.

`;

  try {
    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-flash",
    });
    const result = await model.generateContent(prompt);
    const tip = result.response.text().trim();

    res.json({ tip });
  } catch (error) {
    console.error("Health Tip Error:", error.message);
    res.status(500).json({ error: "Failed to fetch daily tip." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `✅ Gemini 1.5 Flash backend running on http://localhost:${PORT}`
  );
});
