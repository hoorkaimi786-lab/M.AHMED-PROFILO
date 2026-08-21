"use client";

import Image from "next/image";
import { useState } from "react";

const profile = {
  name: "Muhammed Ahmed",
  role: "Web Developer",
  tagline: "I build modern, fast and beautiful websites.",
  email: "kaimkhani493@gmail.com",
  phone: "03153269527",
  whatsapp: "https://wa.me/923153269527",
  location: "Khipro, Sindh, Pakistan",
  about:
    "Assalam-o-Alaikum! I am Muhammed Ahmed, a passionate web developer from Khipro, Sindh, Pakistan, who builds modern websites and web applications. My goal is to deliver the best user experience through clean code and stunning design.",
};

const skills = [
  { name: "HTML & CSS", level: "95%" },
  { name: "JavaScript", level: "90%" },
  { name: "React.js", level: "92%" },
  { name: "Next.js", level: "91%" },
  { name: "Tailwind CSS", level: "92%" },
  { name: "Node.js", level: "89%" },
];

const projects = [
  {
    title: "E-Commerce Website",
    desc: "Full featured online store with cart, payments and admin panel.",
    tags: ["Next.js", "Tailwind", "MongoDB"],
    emoji: "🛒",
  },
  {
    title: "Portfolio Website",
    desc: "Modern responsive personal portfolio with smooth animations.",
    tags: ["Next.js", "Tailwind"],
    emoji: "💼",
  },
  {
    title: "Blog Platform",
    desc: "SEO friendly blog with dark mode and markdown support.",
    tags: ["React", "Node.js"],
    emoji: "📝",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [sending, setSending] = useState(false);
  const links = ["Home", "About", "Skills", "Projects", "Contact"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    try {
      const res = await fetch(
        "https://formsubmit.co/ajax/kaimkhani493@gmail.com",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: e.target.name.value,
            email: e.target.email.value,
            message: e.target.message.value,
            _subject: "New Portfolio Message!",
            _template: "table",
            _captcha: "false",
          }),
        }
      );
      if (res.ok) {
        e.target.reset();
        setShowPopup(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="relative overflow-x-hidden">
      <div className="fixed top-0 -left-32 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl animate-blob" />
      <div className="fixed top-1/3 -right-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-blob" />

      <nav className="fixed top-0 left-0 w-full z-50 glass">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <a href="#home" className="text-xl font-bold gradient-text">
            {profile.name}
            <span className="text-cyan-400">.</span>
          </a>
          <div className="hidden md:flex gap-8">
            {links.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="text-sm text-gray-300 hover:text-cyan-400 transition"
              >
                {l}
              </a>
            ))}
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 rounded-lg bg-white/10 border border-white/10 text-xl flex items-center justify-center hover:bg-white/20 transition"
            aria-label="Menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mx-4 mb-4 rounded-2xl bg-[#0d0d24]/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
            {links.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="block px-6 py-4 text-gray-200 font-medium border-b border-white/5 last:border-0 hover:bg-white/5 hover:text-cyan-400 active:bg-white/10 transition"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section
        id="home"
        className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center max-w-6xl mx-auto px-6 pt-28 pb-16 gap-12"
      >
        <div className="text-center md:text-left animate-fadeUp">
          <p className="text-cyan-400 font-medium mb-3">👋 Hello, I&apos;m</p>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4">
            {profile.name}
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold gradient-text mb-6">
            {profile.role}
          </h2>
          <p className="text-gray-400 max-w-md mb-8">{profile.tagline}</p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <a
              href="#contact"
              className="btn-glow px-7 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 font-semibold transition"
            >
              Hire Me
            </a>
            <a
              href="/CV.jpeg"
              target="_blank"
              className="btn-glow px-7 py-3 rounded-full border border-indigo-400/50 font-semibold hover:bg-white/5 transition"
            >
              Download CV ⬇
            </a>
          </div>
        </div>
        <div className="animate-float">
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full p-1 bg-gradient-to-tr from-indigo-500 via-cyan-400 to-purple-500">
            <Image
              src="/profile.jpeg"
              alt={profile.name}
              width={320}
              height={320}
              priority
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </section>

      <section id="about" className="max-w-4xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-center mb-12">
          About <span className="gradient-text">Me</span>
        </h2>
        <div className="glass rounded-3xl p-8 md:p-12 text-center md:text-left">
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            {profile.about}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="glass rounded-xl p-4">
              <span className="text-cyan-400 block mb-1">📧 Email</span>
              <a href={`mailto:${profile.email}`} className="hover:text-cyan-300 break-all">
                {profile.email}
              </a>
            </div>
            <div className="glass rounded-xl p-4">
              <span className="text-cyan-400 block mb-1">📞 Phone</span>
              <a href={`tel:${profile.phone}`} className="hover:text-cyan-300">
                {profile.phone}
              </a>
            </div>
            <div className="glass rounded-xl p-4">
              <span className="text-cyan-400 block mb-1">📍 Location</span>
              {profile.location}
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="max-w-4xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-center mb-12">
          My <span className="gradient-text">Skills</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skills.map((s) => (
            <div key={s.name} className="glass rounded-2xl p-5">
              <div className="flex justify-between mb-2 text-sm font-medium">
                <span>{s.name}</span>
                <span className="text-cyan-400">{s.level}</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                  style={{ width: s.level }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-center mb-12">
          My <span className="gradient-text">Projects</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((p) => (
            <div
              key={p.title}
              className="glass rounded-3xl p-7 hover:-translate-y-2 hover:border-cyan-400/40 transition duration-300"
            >
              <div className="text-5xl mb-4">{p.emoji}</div>
              <h3 className="text-xl font-bold mb-2">{p.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="max-w-3xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-center mb-4">
          Contact <span className="gradient-text">Me</span>
        </h2>
        <p className="text-center text-gray-400 mb-10">
          Have a question or a project in mind? Send me a message — it will go
          straight to my inbox.
        </p>
        <form
          onSubmit={handleSubmit}
          className="glass rounded-3xl p-8 space-y-5"
        >
          <input type="hidden" name="_subject" value="New Portfolio Message!" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input
              type="text"
              name="name"
              required
              placeholder="Your Name"
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400 placeholder:text-gray-500"
            />
            <input
              type="email"
              name="email"
              required
              placeholder="Your Email"
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400 placeholder:text-gray-500"
            />
          </div>
          <textarea
            name="message"
            rows="5"
            required
            placeholder="Your Message..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400 placeholder:text-gray-500"
          />
          <button
            type="submit"
            disabled={sending}
            className="btn-glow w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 font-bold text-lg transition disabled:opacity-60"
          >
            {sending ? "Sending..." : "Send Message 🚀"}
          </button>
          <p className="text-center text-xs text-gray-500">
            After submitting the form for the first time, FormSubmit sends an
            activation email to your Gmail — once activated, every message will
            arrive directly in your inbox.
          </p>
        </form>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <a
            href={profile.whatsapp}
            target="_blank"
            className="btn-glow px-6 py-3 rounded-full bg-green-600 font-semibold transition"
          >
            💬 WhatsApp: {profile.phone}
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="btn-glow px-6 py-3 rounded-full border border-cyan-400/50 font-semibold hover:bg-white/5 transition"
          >
            📧 Direct Email
          </a>
        </div>
      </section>

      <footer className="relative mt-10">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
        <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold gradient-text mb-3">
              {profile.name}
              <span className="text-cyan-400">.</span>
            </h3>
            <p className="text-gray-400 leading-relaxed max-w-sm mb-6">
              Passionate web developer crafting modern, fast and beautiful
              websites &amp; web apps with clean code and stunning design.
            </p>
            <div className="flex gap-3">
              <a
                href={profile.whatsapp}
                target="_blank"
                aria-label="WhatsApp"
                title="WhatsApp"
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-green-500/20 hover:text-green-400 transition"
              >
                💬
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                title="Email"
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-indigo-500/20 hover:text-indigo-300 transition"
              >
                📧
              </a>
              <a
                href={`tel:${profile.phone}`}
                aria-label="Phone"
                title="Phone"
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-cyan-500/20 hover:text-cyan-400 transition"
              >
                📞
              </a>
              <a
                href="#home"
                aria-label="Location"
                title={profile.location}
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-purple-500/20 hover:text-purple-300 transition"
              >
                📍
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-200 mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-gray-400">
              {links.map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase()}`}
                    className="group inline-flex items-center gap-2 hover:text-cyan-400 transition"
                  >
                    <span className="text-cyan-400/0 group-hover:text-cyan-400 transition">
                      ›
                    </span>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-200 mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-2">
                <span>📧</span>
                <a
                  href={`mailto:${profile.email}`}
                  className="hover:text-cyan-400 break-all transition"
                >
                  {profile.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span>📞</span>
                <a href={`tel:${profile.phone}`} className="hover:text-cyan-400 transition">
                  {profile.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span>📍</span>
                {profile.location}
              </li>
              <li>
                <a
                  href={profile.whatsapp}
                  target="_blank"
                  className="inline-flex items-center gap-2 mt-1 px-4 py-2 rounded-full bg-green-600/90 font-semibold text-white hover:bg-green-500 btn-glow transition"
                >
                  💬 WhatsApp Chat
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 py-5 text-center text-gray-500 text-xs space-y-1">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-gray-300 font-medium">{profile.name}</span>.
            All rights reserved.
          </p>
          <p>Built with Next.js &amp; Tailwind CSS</p>
        </div>
      </footer>

      {showPopup && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeUp px-4"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="glass rounded-3xl p-10 max-w-sm w-full text-center border border-cyan-400/40 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-tr from-green-500 to-cyan-400 flex items-center justify-center text-4xl btn-glow">
              ✓
            </div>
            <h3 className="text-2xl font-bold mb-2 gradient-text">
              Message Sent!
            </h3>
            <p className="text-gray-300 mb-6">
              Your message sent successfully. I will get back to you soon! 🚀
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="btn-glow w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 font-bold transition"
            >
              OK, Great!
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
