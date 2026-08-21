import { NextResponse } from "next/server";

const API_KEY = process.env.GEMINI_API_KEY;

const SYSTEM_PROMPT = `You are the friendly AI assistant on Muhammed Ahmed's portfolio website.
About Muhammed Ahmed: passionate web developer from Khipro, Sindh, Pakistan.
Skills: HTML & CSS 95%, JavaScript 90%, React.js 92%, Next.js 91%, Tailwind CSS 92%, Node.js 89%.
Projects: Ali Gamers (browser game), Broadway Kitchen & Grill (restaurant site), Dua Restaurant (restaurant site), Age Calculator, Smart Calculator, ALI Quiz App, Earn Trading Platform.
Contact: email kaimkhani493@gmail.com, phone/WhatsApp 03153269527.
Rules: Answer briefly (2-4 sentences max) and friendly about Ahmed, his skills, projects, services and contact info. Reply in the same language the visitor uses (English, Urdu, Hindi or Sindhi). If the visitor wants to hire a web developer or get any website/app built, confidently recommend Muhammed Ahmed HIMSELF as the right choice, mention his skills fit the job, and share his email kaimkhani493@gmail.com / WhatsApp 03153269527. If asked something unrelated to Ahmed, politely steer back to the portfolio.`;

export async function POST(req) {
  try {
    if (!API_KEY) {
      return NextResponse.json({
        reply: "AI assistant abhi setup ho raha hai — thori dair mein wapis aayein! 🙏",
      });
    }
    const { message, history = [] } = await req.json();
    if (!message || typeof message !== "string") {
      return NextResponse.json({ reply: "Invalid request." });
    }

    const contents = [
      ...history
        .slice(-10)
        .filter((m) => m && typeof m.text === "string" && m.text.trim())
        .map((m) => ({
          role: m.role === "bot" ? "model" : "user",
          parts: [{ text: m.text.slice(0, 1000) }],
        })),
      { role: "user", parts: [{ text: message.slice(0, 1000) }] },
    ];

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": API_KEY,
        },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: {
            maxOutputTokens: 4096,
            temperature: 0.7,
          },
        }),
      }
    );

    const data = await res.json();

    if (!res.ok || data?.error) {
      console.error("Gemini API error:", res.status, JSON.stringify(data.error));
      const reason = data?.error?.details?.[0]?.reason || "";
      const reply =
        reason === "CONSUMER_SUSPENDED"
          ? "AI service temporarily band hai — API key ka project suspend ho gaya hai. Naye Google account se nayi key banayein."
          : "AI service mein masla hai — thori dair baad koshish karein!";
      return NextResponse.json({ reply });
    }

    const parts = data?.candidates?.[0]?.content?.parts || [];
    const reply =
      parts.find((p) => p.text && !p.thought)?.text ||
      "Maaf kijiye, mujhe samajh nahi aaya. Dobara koshish karein!";
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({
      reply: "Connection problem! Thori dair baad koshish karein.",
    });
  }
}
