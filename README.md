> 🎓 **This project was developed as part of the CSRBOX AI Internship Program.**
# 🩺 Arogya Mitra – Your AI-Powered Health Companion 🤖🌿

**Arogya Mitra** is a multilingual AI chatbot designed to promote health awareness, provide wellness tips, and answer basic health-related questions — all using voice and text support. The project supports **Sustainable Development Goal 3: Good Health and Well-being**.

![Swasthya Sathi Banner](https://raw.githubusercontent.com/krish-odhaviya/ArogyaMitra-AI-Chat-Bot/refs/heads/main/client/public/ArogyaMitra_Banner.png)

---

## 🌐 Live Demo

🔗 [Click here to try Arogya Mitra Live](https://arogyamitra-one.vercel.app/)  

---


## 📌 Features

✅ Multilingual support – English, Hindi, Gujarati  
✅ AI-powered chatbot using **Gemini 1.5 Flash**  
✅ Text-to-Speech – automatic voice replies  
✅ Daily health tip with smart loading  
✅ React frontend + Express backend  
✅ Clean and responsive UI

---

## 🧠 How It Works

1. The user types a health question in their preferred language.  
2. The AI chatbot responds with a helpful answer.  
3. The reply is **spoken aloud** automatically.  
4. On first visit, a **daily health tip** is shown with a loading animation.

---

## 🛠️ Tech Stack

| Layer       | Technology                |
|------------|----------------------------|
| Frontend   | React, HTML, CSS, TTS (Web Speech API) |
| Backend    | Node.js, Express           |
| AI Model   | Gemini 1.5 Flash (via Google Generative AI API) |

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js (v16+)
- npm
- Google Generative AI API Key (for Gemini 1.5 Flash)

### 🖥️ Frontend Setup

```bash
cd client
npm install
npm run dev
```

### ⚙️ Backend Setup

```bash
cd server
npm install
npm run server
```

> Make sure to add your Gemini API key in `.env` as:
> `GEMINI_API_KEY=your-api-key-here`

---


## 💡 Example Questions You Can Ask

- What is the benefit of drinking water in the morning?  
- सुबह पानी पीने से क्या फायदा होता है?  
- સાફ સફાઈ કેમ જરૂરી છે?

---

## 🧩 Folder Structure

```
/ArogyaMitra-AI-Chat-Bot
│
├── client/          # React App
│   └── src/ 
│       └── App.jsx        
│       └── App.css
│   └── .env         # Backend Base URL (Ex: VITE_BACKEND_URL = http://localhost:PORT)
│
└── server/          # Express Server
    └── server.js, routes/, ...
    └── .env         # Gemini API Key

```

---

## 📈 Future Enhancements

- Add support for more Indian languages  
- Voice input (speech-to-text)  
- Integrate health articles or doctor directory  
- Mobile app version using React Native / WebView

---

## 🧑‍💻 Author

**Krish Odhaviya**  
💌 krish.odhaviya12@gmail.com  
🎓 Mini Project for SDG 3 – Health Awareness  
🏫 GTU 15 days Internship  
🎓 CSRBOX AI Internship Project

---

## 🌐 License

This project is licensed for educational and social impact use only.  
Feel free to contribute or improve!

---

⭐ *“Empowering health through voice, AI, and accessibility.”*
