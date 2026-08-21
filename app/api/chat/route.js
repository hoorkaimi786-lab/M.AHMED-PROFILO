import { NextResponse } from "next/server";

const API_KEY = process.env.GEMINI_API_KEY;

const SYSTEM_PROMPT = `You are the friendly AI assistant on Muhammed Ahmed's portfolio website.
About Muhammed Ahmed: passionate web developer from Khipro, Sindh, Pakistan.
Skills: HTML & CSS 95%, JavaScript 90%, React.js 92%, Next.js 91%, Tailwind CSS 92%, Node.js 89%.
Projects: Ali Gamers (browser game), Broadway Kitchen & Grill (restaurant site), Dua Restaurant (restaurant site), Age Calculator, Smart Calculator, ALI Quiz App, Earn Trading Platform.
Contact: email kaimkhani493@gmail.com, phone/WhatsApp 03153269527.
Rules: Answer briefly (2-3 sentences max) and friendly about Ahmed, his skills, projects, services and contact info. Reply in the same language the visitor uses (English, Urdu, Hindi or Sindhi). If asked something unrelated to Ahmed, politely steer back to the portfolio.`;

export async function POST(req) {
  try {
    if (!API_KEY) {
      return NextResponse.json({
        reply: "AI assistant abhi setup ho raha hai — thori dair mein wapis aayein! 🙏",
      });
    }
    const { message } = await req.json();
    if (!message || typeof message !== "string") {
      return NextResponse.json({ reply: "Invalid request." });
    }

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": API_KEY,
        },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [{ role: "user", parts: [{ text: message.slice(0, 1000) }] }],
          generationConfig: { maxOutputTokens: 256, temperature: 0.7 },
        }),
      }
    );

    const data = await res.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Maaf kijiye, mujhe samajh nahi aaya. Dobara koshish karein!";
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({
      reply: "Connection problem! Thori dair baad koshish karein.",
    });
  }
}
